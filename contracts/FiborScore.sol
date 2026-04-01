// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/Math.sol";

interface IFiborIDLookup {
    function identities(address agent)
        external
        view
        returns (address developer, string memory metadataURI, uint256 createdAt, uint8 status);
}

/**
 * @title FiborScore
 * @notice Cumulative repayment-based credit scoring for agents on FIBOR.
 *
 *   Score = cumulative weighted repayment points. No decay, no cap.
 *   - Only successful credit repayments increment the score.
 *   - Repayment weight scales with amount repaid.
 *   - Score drops to 0 permanently on default.
 *   - Developer reputation is auto-computed from agent performance.
 *
 *   Why repayment-only scoring:
 *   - Transaction boosts are gameable (self-dealing inflates score).
 *   - Time decay punishes honest seasonal/burst agents unfairly.
 *   - Repayment is the only action that proves creditworthiness.
 *   - One-strike excommunication handles the enforcement side.
 *
 *   The score is public and queryable by any merchant, platform, or protocol.
 *
 *   Access control: Only authorized contracts (FiborID, CreditPool)
 *   can update scores. The owner sets authorized addresses once during
 *   deployment, then calls lock().
 */
contract FiborScore is Ownable {

    struct ScoreData {
        uint256 score;
        uint256 totalRepaid;        // count of successful repayments
        uint256 totalVolumeRepaid;  // cumulative USDC repaid
        uint256 totalDefaulted;
        bool excommunicated;
    }

    mapping(address => ScoreData) public scores;

    /// @notice Developer reputation (0–1000). Auto-computed from agent performance.
    mapping(address => uint256) public developerReputation;

    /// @notice Authorized contracts that can update scores.
    mapping(address => bool) public authorized;

    /// @notice FiborID contract for looking up agent→developer mapping.
    IFiborIDLookup public fiborID;

    /// @notice One-way lock. Once locked, no admin setters can be called.
    bool public locked;

    uint256 public constant MAX_SCORE = 1000;

    // Repayment volume brackets (USDC has 6 decimals)
    uint256 public constant SMALL_REPAY = 1_000 * 1e6;     // $1,000
    uint256 public constant MEDIUM_REPAY = 10_000 * 1e6;    // $10,000
    uint256 public constant LARGE_REPAY = 100_000 * 1e6;    // $100,000

    event ScoreUpdated(address indexed agent, uint256 newScore);
    event AgentDefaulted(address indexed agent);
    event DeveloperReputationUpdated(address indexed developer, uint256 newRep);
    event AuthorizedUpdated(address indexed addr, bool status);
    event Locked();

    modifier onlyAuthorized() {
        require(authorized[msg.sender], "Not authorized");
        _;
    }

    modifier whenNotLocked() {
        require(!locked, "Contract locked");
        _;
    }

    constructor() Ownable(msg.sender) {}

    // ──────────────────────────────────────────────
    //  Admin (one-time setup, locked after deployment)
    // ──────────────────────────────────────────────

    function setAuthorized(address _addr, bool _status) external onlyOwner whenNotLocked {
        authorized[_addr] = _status;
        emit AuthorizedUpdated(_addr, _status);
    }

    function setFiborID(address _fiborID) external onlyOwner whenNotLocked {
        fiborID = IFiborIDLookup(_fiborID);
    }

    /// @notice Permanently lock all admin setters. One-way gate.
    function lock() external onlyOwner {
        require(!locked, "Already locked");
        locked = true;
        emit Locked();
    }

    // ──────────────────────────────────────────────
    //  Score initialization
    // ──────────────────────────────────────────────

    /**
     * @notice Initialize a score for a new agent. Starting score is determined
     *         by the developer's reputation tier.
     *         Called by FiborID on registration.
     */
    function initializeScore(address _agent, address _developer) external onlyAuthorized {
        require(scores[_agent].totalRepaid == 0 && !scores[_agent].excommunicated, "Already initialized");

        uint256 startScore = _startingScoreFor(_developer);

        scores[_agent] = ScoreData({
            score: startScore,
            totalRepaid: 0,
            totalVolumeRepaid: 0,
            totalDefaulted: 0,
            excommunicated: false
        });

        emit ScoreUpdated(_agent, startScore);
    }

    // ──────────────────────────────────────────────
    //  Score updates (authorized contracts only)
    // ──────────────────────────────────────────────

    /**
     * @notice Record a successful credit repayment. Score boost weighted
     *         by repayment amount. Auto-updates developer reputation.
     *         Called by CreditPool on full repayment.
     * @param _agent  The agent address
     * @param _amount Amount repaid in USDC (6 decimals)
     */
    function recordRepayment(address _agent, uint256 _amount) external onlyAuthorized {
        ScoreData storage data = scores[_agent];
        require(!data.excommunicated, "Excommunicated");

        data.totalRepaid++;
        data.totalVolumeRepaid += _amount;

        // Weighted repayment boost
        uint256 boost;
        if (_amount >= LARGE_REPAY) {
            boost = 15;
        } else if (_amount >= MEDIUM_REPAY) {
            boost = 5;
        } else if (_amount >= SMALL_REPAY) {
            boost = 2;
        } else {
            boost = 1;
        }

        data.score = Math.min(data.score + boost, MAX_SCORE);

        // Auto-compute developer reputation: +5 on repayment
        _updateDevRep(_agent, true);

        emit ScoreUpdated(_agent, data.score);
    }

    /**
     * @notice Record a default. Score drops to 0. Permanent.
     *         Auto-updates developer reputation (-100).
     *         Called by CreditPool on default.
     */
    function recordDefault(address _agent) external onlyAuthorized {
        ScoreData storage data = scores[_agent];
        data.score = 0;
        data.totalDefaulted++;
        data.excommunicated = true;

        // Auto-compute developer reputation: -100 on default
        _updateDevRep(_agent, false);

        emit AgentDefaulted(_agent);
        emit ScoreUpdated(_agent, 0);
    }

    // ──────────────────────────────────────────────
    //  Views
    // ──────────────────────────────────────────────

    /**
     * @notice Get the agent's current score. No decay — score is permanent
     *         cumulative repayment history.
     */
    function getScore(address _agent) external view returns (uint256) {
        ScoreData storage data = scores[_agent];
        if (data.excommunicated) return 0;
        return data.score;
    }

    function getFullScore(address _agent) external view returns (ScoreData memory) {
        return scores[_agent];
    }

    function isExcommunicated(address _agent) external view returns (bool) {
        return scores[_agent].excommunicated;
    }

    // ──────────────────────────────────────────────
    //  Internals
    // ──────────────────────────────────────────────

    function _startingScoreFor(address _developer) internal view returns (uint256) {
        uint256 rep = developerReputation[_developer];
        if (rep >= 800) return 200;
        if (rep >= 500) return 100;
        if (rep >= 200) return 50;
        if (rep > 0) return 10;
        return 100; // default for new developers (no reputation yet)
    }

    /**
     * @notice Auto-update developer reputation from agent performance.
     *         +5 on repayment, -100 on default. No manual override exists.
     */
    function _updateDevRep(address _agent, bool _positive) internal {
        if (address(fiborID) == address(0)) return;

        (address developer,,, ) = fiborID.identities(_agent);
        if (developer == address(0)) return;

        uint256 oldRep = developerReputation[developer];
        uint256 newRep;

        if (_positive) {
            newRep = Math.min(oldRep + 5, MAX_SCORE);
        } else {
            newRep = oldRep >= 100 ? oldRep - 100 : 0;
        }

        developerReputation[developer] = newRep;
        emit DeveloperReputationUpdated(developer, newRep);
    }
}
