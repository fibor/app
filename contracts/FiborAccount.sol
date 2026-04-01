// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

interface ICreditPoolAccount {
    function getActivePactId(address agent) external view returns (uint256);
    function getOutstanding(address agent) external view returns (uint256);
    function repay(uint256 pactId, uint256 amount) external;
    function issuePact(uint256 limit) external;
    function draw(uint256 pactId, uint256 amount) external;
}

interface IPaymentGatewayAccount {
    function pay(address merchant, uint256 amount) external;
}

interface IRobodollarWrap {
    function wrap(uint256 amount) external;
}

/**
 * @title FiborAccount
 * @notice A bank account for robots.
 *
 *   Every agent on FIBOR gets a FiborAccount — a purpose-built smart
 *   contract wallet with four operations:
 *
 *     1. Receive — deposits land here (rUSD or USDC)
 *     2. Pay — send rUSD to merchants via PaymentGateway
 *     3. Auto-repay — outstanding credit is repaid on every deposit
 *     4. Withdraw — guardian pulls non-credit funds
 *
 *   The account is controlled by a guardian — the human custodian of the
 *   agent. When robots are granted sovereignty (legal personhood, or the
 *   guardian's choice), control transfers to the agent itself via
 *   grantSovereignty(). This is a one-way gate.
 *
 *   Auto-repayment is deterministic. No oracle, no admin, no backend.
 *   The contract checks outstanding credit on every deposit and repays
 *   automatically. This is what makes FIBOR a bank, not just a credit
 *   protocol — and what distinguishes it from Krexa's centralized
 *   Revenue Router.
 */
contract FiborAccount {
    using SafeERC20 for IERC20;

    // ──────────────────────────────────────────────
    //  State
    // ──────────────────────────────────────────────

    address public guardian;
    bool public sovereign;

    IERC20 public immutable robodollar;
    IERC20 public immutable usdc;
    ICreditPoolAccount public immutable creditPool;
    IPaymentGatewayAccount public immutable paymentGateway;
    IRobodollarWrap public immutable robodollarWrap;

    // ──────────────────────────────────────────────
    //  Events
    // ──────────────────────────────────────────────

    event Deposited(address indexed token, uint256 amount);
    event AutoRepaid(uint256 indexed pactId, uint256 amount);
    event Paid(address indexed merchant, uint256 amount);
    event Withdrawn(address indexed token, address indexed to, uint256 amount);
    event SovereigntyGranted(address indexed newGuardian);

    // ──────────────────────────────────────────────
    //  Modifiers
    // ──────────────────────────────────────────────

    modifier onlyGuardian() {
        require(msg.sender == guardian, "Not guardian");
        _;
    }

    // ──────────────────────────────────────────────
    //  Constructor
    // ──────────────────────────────────────────────

    constructor(
        address _guardian,
        address _robodollar,
        address _usdc,
        address _creditPool,
        address _paymentGateway
    ) {
        guardian = _guardian;
        robodollar = IERC20(_robodollar);
        usdc = IERC20(_usdc);
        creditPool = ICreditPoolAccount(_creditPool);
        paymentGateway = IPaymentGatewayAccount(_paymentGateway);
        robodollarWrap = IRobodollarWrap(_robodollar);
    }

    // ──────────────────────────────────────────────
    //  Deposit + Auto-Repay
    // ──────────────────────────────────────────────

    /**
     * @notice Deposit rUSD into this account. Triggers auto-repay if
     *         there is outstanding credit.
     */
    function depositRUSD(uint256 _amount) external {
        robodollar.safeTransferFrom(msg.sender, address(this), _amount);
        emit Deposited(address(robodollar), _amount);
        _autoRepay();
    }

    /**
     * @notice Deposit USDC into this account. If there is outstanding
     *         credit, auto-wraps USDC to rUSD and repays.
     */
    function depositUSDC(uint256 _amount) external {
        usdc.safeTransferFrom(msg.sender, address(this), _amount);
        emit Deposited(address(usdc), _amount);

        // If outstanding credit, wrap USDC → rUSD and auto-repay
        uint256 outstanding = creditPool.getOutstanding(address(this));
        if (outstanding > 0) {
            uint256 toWrap = _amount > outstanding ? outstanding : _amount;
            usdc.approve(address(robodollarWrap), toWrap);
            robodollarWrap.wrap(toWrap);
            _autoRepay();
        }
    }

    // ──────────────────────────────────────────────
    //  Pay Merchants
    // ──────────────────────────────────────────────

    /**
     * @notice Pay a merchant in rUSD via PaymentGateway.
     *         Guardian only (or agent if sovereign).
     */
    function pay(address _merchant, uint256 _amount) external onlyGuardian {
        robodollar.approve(address(paymentGateway), _amount);
        paymentGateway.pay(_merchant, _amount);
        emit Paid(_merchant, _amount);
    }

    // ──────────────────────────────────────────────
    //  Credit Operations
    // ──────────────────────────────────────────────

    /**
     * @notice Request a credit pact from CreditPool.
     *         Guardian only. Score must qualify.
     */
    function requestCredit(uint256 _limit) external onlyGuardian {
        creditPool.issuePact(_limit);
    }

    /**
     * @notice Draw rUSD from an active credit pact.
     */
    function drawCredit(uint256 _pactId, uint256 _amount) external onlyGuardian {
        creditPool.draw(_pactId, _amount);
    }

    // ──────────────────────────────────────────────
    //  Withdraw
    // ──────────────────────────────────────────────

    /**
     * @notice Withdraw funds. Guardian only. Cannot withdraw more than
     *         available balance (total minus outstanding credit).
     */
    function withdraw(address _token, uint256 _amount) external onlyGuardian {
        require(_amount <= availableBalance(_token), "Exceeds available balance");

        IERC20(_token).safeTransfer(guardian, _amount);
        emit Withdrawn(_token, guardian, _amount);
    }

    // ──────────────────────────────────────────────
    //  Sovereignty
    // ──────────────────────────────────────────────

    /**
     * @notice Transfer control to the agent itself. One-way gate.
     *         Until robots are granted sovereignty and personhood,
     *         their guardian proxies as custodian. This function
     *         formalizes the transition.
     */
    function grantSovereignty(address _agentSelf) external onlyGuardian {
        require(_agentSelf != address(0), "Invalid address");
        guardian = _agentSelf;
        sovereign = true;
        emit SovereigntyGranted(_agentSelf);
    }

    // ──────────────────────────────────────────────
    //  Views
    // ──────────────────────────────────────────────

    /**
     * @notice Available balance = total balance minus outstanding credit.
     *         This is what the guardian can withdraw.
     */
    function availableBalance(address _token) public view returns (uint256) {
        uint256 total = IERC20(_token).balanceOf(address(this));
        uint256 outstanding = creditPool.getOutstanding(address(this));

        // Only rUSD is used for credit obligations
        if (_token == address(robodollar)) {
            return total > outstanding ? total - outstanding : 0;
        }
        return total;
    }

    /**
     * @notice Total balance of a token held in this account.
     */
    function balance(address _token) external view returns (uint256) {
        return IERC20(_token).balanceOf(address(this));
    }

    // ──────────────────────────────────────────────
    //  Internal
    // ──────────────────────────────────────────────

    /**
     * @notice Auto-repay outstanding credit from rUSD balance.
     *         Called after every deposit.
     */
    function _autoRepay() internal {
        uint256 pactId = creditPool.getActivePactId(address(this));
        if (pactId == 0) return; // no active pact

        uint256 outstanding = creditPool.getOutstanding(address(this));
        if (outstanding == 0) return;

        uint256 rUsdBalance = robodollar.balanceOf(address(this));
        if (rUsdBalance == 0) return;

        uint256 repayAmount = rUsdBalance > outstanding ? outstanding : rUsdBalance;

        robodollar.approve(address(creditPool), repayAmount);
        creditPool.repay(pactId, repayAmount);

        emit AutoRepaid(pactId, repayAmount);
    }
}
