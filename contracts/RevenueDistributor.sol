// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

interface IStakingPool {
    function distributeRevenue(uint256 amount) external;
}

interface IRobodollarUnwrap {
    function unwrap(uint256 amount) external;
}

/**
 * @title RevenueDistributor
 * @notice Receives fee revenue in Robodollars (rUSD), unwraps to USDC,
 *         and splits between stakers (70%) and treasury (30%).
 *
 *   Flow:
 *   1. PaymentGateway sends rUSD fee here
 *   2. This contract unwraps rUSD → USDC (always safe because all rUSD
 *      is backed 1:1 by USDC in the Robodollar contract)
 *   3. 70% USDC → StakingPool (pro-rata to stakers)
 *   4. 30% USDC → Protocol treasury
 *
 *   Only authorized contracts (PaymentGateway) can trigger distribution.
 */
contract RevenueDistributor is ReentrancyGuard, Ownable {
    using SafeERC20 for IERC20;

    IERC20 public immutable usdc;
    IERC20 public immutable robodollar;
    IRobodollarUnwrap public immutable robodollarUnwrap;
    IStakingPool public stakingPool;
    address public treasury;

    /// @notice Authorized callers (PaymentGateway)
    mapping(address => bool) public authorized;

    uint256 public constant STAKER_SHARE_BPS = 7000; // 70%
    uint256 public constant BPS = 10_000;

    uint256 public totalCollected;
    uint256 public totalToStakers;
    uint256 public totalToTreasury;

    event FeeDistributed(uint256 rUsdReceived, uint256 usdcToStakers, uint256 usdcToTreasury);
    event AuthorizedUpdated(address indexed addr, bool status);

    modifier onlyAuthorized() {
        require(authorized[msg.sender], "Not authorized");
        _;
    }

    constructor(
        address _usdc,
        address _robodollar,
        address _stakingPool,
        address _treasury
    ) Ownable(msg.sender) {
        usdc = IERC20(_usdc);
        robodollar = IERC20(_robodollar);
        robodollarUnwrap = IRobodollarUnwrap(_robodollar);
        stakingPool = IStakingPool(_stakingPool);
        treasury = _treasury;
    }

    // ──────────────────────────────────────────────
    //  Fee distribution
    // ──────────────────────────────────────────────

    /**
     * @notice Distribute accumulated rUSD fees. Called after PaymentGateway
     *         sends rUSD to this contract.
     * @param _rUsdAmount Amount of rUSD to process
     */
    function distributeFees(uint256 _rUsdAmount) external nonReentrant onlyAuthorized {
        require(_rUsdAmount > 0, "Nothing to distribute");

        // Unwrap rUSD → USDC (1:1, always safe)
        robodollarUnwrap.unwrap(_rUsdAmount);

        // Now we have USDC. Split 70/30.
        uint256 stakerPortion = (_rUsdAmount * STAKER_SHARE_BPS) / BPS;
        uint256 treasuryPortion = _rUsdAmount - stakerPortion;

        // Send staker portion to StakingPool
        usdc.safeTransfer(address(stakingPool), stakerPortion);
        stakingPool.distributeRevenue(stakerPortion);

        // Send treasury portion
        usdc.safeTransfer(treasury, treasuryPortion);

        totalCollected += _rUsdAmount;
        totalToStakers += stakerPortion;
        totalToTreasury += treasuryPortion;

        emit FeeDistributed(_rUsdAmount, stakerPortion, treasuryPortion);
    }

    // ──────────────────────────────────────────────
    //  Admin (one-time setup)
    // ──────────────────────────────────────────────

    /// @notice One-way lock. Once locked, no admin setters can be called.
    bool public locked;

    function setAuthorized(address _addr, bool _status) external onlyOwner {
        require(!locked, "Contract locked");
        authorized[_addr] = _status;
        emit AuthorizedUpdated(_addr, _status);
    }

    function setStakingPool(address _pool) external onlyOwner {
        require(!locked, "Contract locked");
        stakingPool = IStakingPool(_pool);
    }

    function setTreasury(address _treasury) external onlyOwner {
        require(!locked, "Contract locked");
        treasury = _treasury;
    }

    /// @notice Permanently lock all admin setters. One-way gate.
    function lock() external onlyOwner {
        require(!locked, "Already locked");
        locked = true;
    }
}
