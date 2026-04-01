// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

interface IRobodollar {
    function mint(address to, uint256 amount) external;
    function burnAndReturn(address from, uint256 amount, address returnTo) external;
    function freezeAgent(address agent) external;
    function balanceOf(address account) external view returns (uint256);
}

interface IFiborScore {
    function getScore(address agent) external view returns (uint256);
    function recordDefault(address agent) external;
    function recordRepayment(address agent) external;
}

interface IFiborID {
    function isActive(address agent) external view returns (bool);
    function excommunicate(address agent) external;
}

/**
 * @title CreditPool
 * @notice The credit facility that backs agent credit lines.
 *
 *   Flow
 *   ----
 *   1. USDC is deposited by the StakingPool (staker capital).
 *   2. An agent with an active FIBOR ID and qualifying score self-issues
 *      a CreditPact — no admin approval required.
 *   3. The agent draws Robodollars up to the approved limit.
 *   4. The agent repays within the pact window. No interest.
 *   5. If the agent defaults, it is frozen, remaining rUSD is clawed back,
 *      and the agent is excommunicated.
 *
 *   Credit terms are short by default:
 *     Score 300–499  →  24 hours  /  up to $1,000
 *     Score 500–699  →  48 hours  /  up to $10,000
 *     Score 700–849  →  7 days    /  up to $100,000
 *     Score 850–999  →  30 days   /  up to $500,000
 *     Score 1000     →  custom    /  committee review
 */
contract CreditPool is ReentrancyGuard, Ownable {
    using SafeERC20 for IERC20;

    // ──────────────────────────────────────────────
    //  Types
    // ──────────────────────────────────────────────

    enum PactStatus { Active, Repaid, Defaulted }

    struct CreditPact {
        address agent;
        uint256 limit;           // max Robodollars the agent can draw
        uint256 drawn;           // how much has been drawn
        uint256 repaid;          // how much has been repaid
        uint256 issuedAt;        // block.timestamp at creation
        uint256 expiresAt;       // repayment deadline
        PactStatus status;
    }

    // ──────────────────────────────────────────────
    //  State
    // ──────────────────────────────────────────────

    IERC20 public immutable usdc;
    IRobodollar public immutable robodollar;
    IFiborScore public fiborScore;
    IFiborID public fiborID;

    uint256 public totalDeposited;   // USDC in the pool
    uint256 public totalLent;        // USDC currently out as credit

    uint256 public nextPactId = 1;
    mapping(uint256 => CreditPact) public pacts;
    mapping(address => uint256[]) public agentPacts;

    /// @notice Only one active pact per agent at a time.
    mapping(address => bool) public hasActivePact;

    uint256 public constant GRACE_PERIOD = 24 hours;

    // Score → term parameters
    struct Tier {
        uint256 minScore;
        uint256 maxLimit;        // in USDC units (6 decimals)
        uint256 duration;        // seconds
    }

    Tier[] public tiers;

    // ──────────────────────────────────────────────
    //  Events
    // ──────────────────────────────────────────────

    event Deposited(uint256 amount);
    event PactCreated(uint256 indexed pactId, address indexed agent, uint256 limit, uint256 expiresAt);
    event CreditDrawn(uint256 indexed pactId, uint256 amount);
    event CreditRepaid(uint256 indexed pactId, uint256 amount);
    event PactClosed(uint256 indexed pactId, PactStatus status);
    event DefaultDeclared(uint256 indexed pactId, address indexed agent, uint256 recovered);

    // ──────────────────────────────────────────────
    //  Constructor
    // ──────────────────────────────────────────────

    constructor(
        address _usdc,
        address _robodollar,
        address _fiborScore,
        address _fiborID
    ) Ownable(msg.sender) {
        usdc = IERC20(_usdc);
        robodollar = IRobodollar(_robodollar);
        fiborScore = IFiborScore(_fiborScore);
        fiborID = IFiborID(_fiborID);

        // Default tiers (USDC has 6 decimals)
        tiers.push(Tier(300,     1_000 * 1e6,   24 hours));
        tiers.push(Tier(500,    10_000 * 1e6,   48 hours));
        tiers.push(Tier(700,   100_000 * 1e6,    7 days));
        tiers.push(Tier(850,   500_000 * 1e6,   30 days));
    }

    // ──────────────────────────────────────────────
    //  Pool funding
    // ──────────────────────────────────────────────

    /**
     * @notice Deposit USDC into the credit facility.
     *         Called by the StakingPool or the protocol treasury.
     */
    function deposit(uint256 _amount) external nonReentrant {
        usdc.safeTransferFrom(msg.sender, address(this), _amount);
        totalDeposited += _amount;
        emit Deposited(_amount);
    }

    // ──────────────────────────────────────────────
    //  Credit issuance (self-service, permissionless)
    // ──────────────────────────────────────────────

    /**
     * @notice Request a credit pact. Any agent with an active FIBOR ID and
     *         qualifying score can self-issue. No admin approval.
     * @param _limit Requested credit limit (cannot exceed tier max)
     */
    function issuePact(uint256 _limit) external nonReentrant {
        address agent = msg.sender;

        // Must have an active FIBOR ID
        require(fiborID.isActive(agent), "No active FIBOR ID");

        // Only one active pact at a time
        require(!hasActivePact[agent], "Active pact exists");

        uint256 score = fiborScore.getScore(agent);
        (uint256 maxLimit, uint256 duration) = _tierFor(score);
        require(_limit <= maxLimit, "Limit exceeds tier allowance");
        require(_limit <= availableLiquidity(), "Insufficient pool liquidity");

        uint256 pactId = nextPactId++;
        pacts[pactId] = CreditPact({
            agent: agent,
            limit: _limit,
            drawn: 0,
            repaid: 0,
            issuedAt: block.timestamp,
            expiresAt: block.timestamp + duration,
            status: PactStatus.Active
        });
        agentPacts[agent].push(pactId);
        hasActivePact[agent] = true;

        emit PactCreated(pactId, agent, _limit, block.timestamp + duration);
    }

    /**
     * @notice The agent draws Robodollars against its pact.
     */
    function draw(uint256 _pactId, uint256 _amount) external nonReentrant {
        CreditPact storage pact = pacts[_pactId];
        require(msg.sender == pact.agent, "Not your pact");
        require(pact.status == PactStatus.Active, "Pact not active");
        require(block.timestamp < pact.expiresAt, "Pact expired");
        require(pact.drawn + _amount <= pact.limit, "Exceeds limit");
        require(_amount <= availableLiquidity(), "Insufficient liquidity");

        pact.drawn += _amount;
        totalLent += _amount;

        // Transfer USDC to Robodollar contract for backing, then mint rUSD
        usdc.safeTransfer(address(robodollar), _amount);
        robodollar.mint(pact.agent, _amount);

        emit CreditDrawn(_pactId, _amount);
    }

    /**
     * @notice The agent repays Robodollars. No interest — just the principal.
     *         Automatically updates the agent's FIBOR Score on full repayment.
     */
    function repay(uint256 _pactId, uint256 _amount) external nonReentrant {
        CreditPact storage pact = pacts[_pactId];
        require(msg.sender == pact.agent, "Not your pact");
        require(pact.status == PactStatus.Active, "Pact not active");

        uint256 outstanding = pact.drawn - pact.repaid;
        uint256 payment = _amount > outstanding ? outstanding : _amount;

        pact.repaid += payment;
        totalLent -= payment;

        // Burn rUSD and return backing USDC to this pool
        robodollar.burnAndReturn(pact.agent, payment, address(this));

        // If fully repaid, close the pact and boost score
        if (pact.repaid >= pact.drawn) {
            pact.status = PactStatus.Repaid;
            hasActivePact[pact.agent] = false;

            // Record successful repayment in score
            fiborScore.recordRepayment(pact.agent);

            emit PactClosed(_pactId, PactStatus.Repaid);
        }

        emit CreditRepaid(_pactId, payment);
    }

    // ──────────────────────────────────────────────
    //  Default enforcement
    // ──────────────────────────────────────────────

    /**
     * @notice Anyone can call this after the grace period has expired.
     *         If the pact is not fully repaid, the agent is frozen,
     *         remaining rUSD is clawed back, and the agent is excommunicated.
     */
    function declareDefault(uint256 _pactId) external nonReentrant {
        CreditPact storage pact = pacts[_pactId];
        require(pact.status == PactStatus.Active, "Pact not active");
        require(
            block.timestamp >= pact.expiresAt + GRACE_PERIOD,
            "Grace period not elapsed"
        );
        require(pact.repaid < pact.drawn, "Pact is repaid");

        pact.status = PactStatus.Defaulted;
        hasActivePact[pact.agent] = false;

        // Clawback FIRST (before freezing — _burn reverts on frozen accounts)
        uint256 agentBalance = robodollar.balanceOf(pact.agent);
        uint256 recovered = 0;
        if (agentBalance > 0) {
            robodollar.burnAndReturn(pact.agent, agentBalance, address(this));
            recovered = agentBalance;
            totalLent -= recovered;
        }

        // THEN freeze the agent's Robodollar balance
        robodollar.freezeAgent(pact.agent);

        // Record the default on the agent's score and excommunicate
        fiborScore.recordDefault(pact.agent);
        fiborID.excommunicate(pact.agent);

        emit DefaultDeclared(_pactId, pact.agent, recovered);
        emit PactClosed(_pactId, PactStatus.Defaulted);
    }

    // ──────────────────────────────────────────────
    //  Views
    // ──────────────────────────────────────────────

    function availableLiquidity() public view returns (uint256) {
        return totalDeposited - totalLent;
    }

    function getPact(uint256 _pactId)
        external
        view
        returns (CreditPact memory)
    {
        return pacts[_pactId];
    }

    function getAgentPacts(address _agent)
        external
        view
        returns (uint256[] memory)
    {
        return agentPacts[_agent];
    }

    function getPactStatus(uint256 _pactId)
        external
        view
        returns (
            address agent,
            uint256 limit,
            uint256 drawn,
            uint256 repaid,
            uint256 outstanding,
            uint256 expiresAt,
            PactStatus status
        )
    {
        CreditPact storage pact = pacts[_pactId];
        return (
            pact.agent,
            pact.limit,
            pact.drawn,
            pact.repaid,
            pact.drawn - pact.repaid,
            pact.expiresAt,
            pact.status
        );
    }

    // ──────────────────────────────────────────────
    //  Admin
    // ──────────────────────────────────────────────

    /// @notice One-way lock. Once locked, no admin setters can be called.
    bool public locked;

    function setFiborScore(address _fiborScore) external onlyOwner {
        require(!locked, "Contract locked");
        fiborScore = IFiborScore(_fiborScore);
    }

    function setFiborID(address _fiborID) external onlyOwner {
        require(!locked, "Contract locked");
        fiborID = IFiborID(_fiborID);
    }

    /// @notice Permanently lock all admin setters. One-way gate.
    function lock() external onlyOwner {
        require(!locked, "Already locked");
        locked = true;
    }

    // ──────────────────────────────────────────────
    //  Internal
    // ──────────────────────────────────────────────

    function _tierFor(uint256 _score)
        internal
        view
        returns (uint256 maxLimit, uint256 duration)
    {
        require(tiers.length > 0, "No tiers configured");
        // Walk tiers from highest to lowest to find the best match.
        for (uint256 i = tiers.length; i > 0; i--) {
            Tier storage t = tiers[i - 1];
            if (_score >= t.minScore) {
                return (t.maxLimit, t.duration);
            }
        }
        revert("Score too low for credit");
    }
}
