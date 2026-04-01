// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title StakingPool
 * @notice Stake FIBOR tokens to fund the credit facility and earn protocol
 *         revenue.
 *
 *   Mechanics
 *   ---------
 *   1. A user calls `stake(amount)` to lock FIBOR tokens in the pool.
 *   2. The staker receives an internal share balance proportional to the
 *      pool size at time of deposit (virtual-share model).
 *   3. Protocol fees (in USDC) are sent to this contract via
 *      `distributeRevenue()`. Revenue accrues to all stakers pro-rata.
 *   4. A staker calls `unstake(shares)` to burn shares and receive their
 *      proportional FIBOR + any unclaimed USDC revenue.
 *   5. There is a configurable cooldown period (default 7 days) between
 *      requesting unstake and actually withdrawing.
 *
 *   The staked FIBOR balance is also reported to the CreditPool so it
 *   knows how much capital backs the credit facility.
 */
contract StakingPool is ReentrancyGuard, Ownable {
    using SafeERC20 for IERC20;

    // ──────────────────────────────────────────────
    //  State
    // ──────────────────────────────────────────────

    IERC20 public immutable fiborToken;
    IERC20 public immutable usdc;
    address public revenueDistributor;

    /// @notice One-way lock. Once locked, no admin setters can be called.
    bool public locked;

    uint256 public totalShares;
    uint256 public totalStaked;

    /// @notice Accumulated USDC revenue per share (scaled by 1e18).
    uint256 public revenuePerShare;

    uint256 public constant COOLDOWN_SECONDS = 30 days;

    struct StakerInfo {
        uint256 shares;
        uint256 revenueDebt;       // snapshot of revenuePerShare at last action
        uint256 pendingRevenue;    // USDC claimable
        uint256 unstakeRequestTime;
        uint256 unstakeShareAmount;
    }

    mapping(address => StakerInfo) public stakers;

    // ──────────────────────────────────────────────
    //  Events
    // ──────────────────────────────────────────────

    event Staked(address indexed user, uint256 amount, uint256 shares);
    event UnstakeRequested(address indexed user, uint256 shares);
    event Unstaked(address indexed user, uint256 fiborAmount, uint256 usdcRevenue);
    event RevenueDistributed(uint256 amount);
    event RevenueClaimed(address indexed user, uint256 amount);

    // ──────────────────────────────────────────────
    //  Constructor
    // ──────────────────────────────────────────────

    constructor(address _fiborToken, address _usdc) Ownable(msg.sender) {
        fiborToken = IERC20(_fiborToken);
        usdc = IERC20(_usdc);
    }

    // ──────────────────────────────────────────────
    //  Staking
    // ──────────────────────────────────────────────

    function stake(uint256 _amount) external nonReentrant {
        require(_amount > 0, "Cannot stake 0");

        _settleRevenue(msg.sender);

        // Calculate shares. First staker gets 1:1 shares.
        uint256 shares;
        if (totalShares == 0) {
            shares = _amount;
        } else {
            shares = (_amount * totalShares) / totalStaked;
        }

        fiborToken.safeTransferFrom(msg.sender, address(this), _amount);

        stakers[msg.sender].shares += shares;
        stakers[msg.sender].revenueDebt = revenuePerShare;
        totalShares += shares;
        totalStaked += _amount;

        emit Staked(msg.sender, _amount, shares);
    }

    // ──────────────────────────────────────────────
    //  Unstaking (with cooldown)
    // ──────────────────────────────────────────────

    function requestUnstake(uint256 _shares) external nonReentrant {
        require(_shares > 0, "Cannot unstake 0");
        StakerInfo storage info = stakers[msg.sender];
        require(info.shares >= _shares, "Insufficient shares");

        _settleRevenue(msg.sender);

        info.unstakeRequestTime = block.timestamp;
        info.unstakeShareAmount = _shares;

        emit UnstakeRequested(msg.sender, _shares);
    }

    function unstake() external nonReentrant {
        StakerInfo storage info = stakers[msg.sender];
        require(info.unstakeShareAmount > 0, "No pending unstake");
        require(
            block.timestamp >= info.unstakeRequestTime + COOLDOWN_SECONDS,
            "Cooldown not elapsed"
        );

        uint256 shares = info.unstakeShareAmount;
        uint256 fiborAmount = (shares * totalStaked) / totalShares;

        _settleRevenue(msg.sender);

        info.shares -= shares;
        totalShares -= shares;
        totalStaked -= fiborAmount;
        info.unstakeShareAmount = 0;
        info.unstakeRequestTime = 0;

        // Transfer FIBOR back
        fiborToken.safeTransfer(msg.sender, fiborAmount);

        // Transfer any accrued USDC revenue
        uint256 usdcRevenue = info.pendingRevenue;
        if (usdcRevenue > 0) {
            info.pendingRevenue = 0;
            usdc.safeTransfer(msg.sender, usdcRevenue);
        }

        emit Unstaked(msg.sender, fiborAmount, usdcRevenue);
    }

    // ──────────────────────────────────────────────
    //  Revenue distribution
    // ──────────────────────────────────────────────

    /**
     * @notice Called by the RevenueDistributor after it has already
     *         transferred USDC to this contract. Updates the per-share
     *         accumulator so stakers can claim their portion.
     */
    function distributeRevenue(uint256 _amount) external nonReentrant {
        require(msg.sender == revenueDistributor, "Not authorized");
        require(totalShares > 0, "No stakers");
        revenuePerShare += (_amount * 1e18) / totalShares;
        emit RevenueDistributed(_amount);
    }

    function claimRevenue() external nonReentrant {
        _settleRevenue(msg.sender);
        uint256 amount = stakers[msg.sender].pendingRevenue;
        require(amount > 0, "Nothing to claim");
        stakers[msg.sender].pendingRevenue = 0;
        usdc.safeTransfer(msg.sender, amount);
        emit RevenueClaimed(msg.sender, amount);
    }

    // ──────────────────────────────────────────────
    //  Views
    // ──────────────────────────────────────────────

    function getStakerInfo(address _user)
        external
        view
        returns (
            uint256 shares,
            uint256 stakedFibor,
            uint256 claimableUsdc,
            uint256 unstakeRequestTime,
            uint256 unstakeShareAmount
        )
    {
        StakerInfo storage info = stakers[_user];
        shares = info.shares;
        stakedFibor = totalShares > 0
            ? (info.shares * totalStaked) / totalShares
            : 0;
        claimableUsdc = info.pendingRevenue +
            ((info.shares * (revenuePerShare - info.revenueDebt)) / 1e18);
        unstakeRequestTime = info.unstakeRequestTime;
        unstakeShareAmount = info.unstakeShareAmount;
    }

    function getPoolStats()
        external
        view
        returns (uint256 _totalStaked, uint256 _totalShares, uint256 _revenuePerShare)
    {
        return (totalStaked, totalShares, revenuePerShare);
    }

    // ──────────────────────────────────────────────
    //  Admin
    // ──────────────────────────────────────────────

    function setRevenueDistributor(address _distributor) external onlyOwner {
        require(!locked, "Contract locked");
        revenueDistributor = _distributor;
    }

    /// @notice Permanently lock all admin setters. One-way gate.
    function lock() external onlyOwner {
        require(!locked, "Already locked");
        locked = true;
    }

    // ──────────────────────────────────────────────
    //  Internals
    // ──────────────────────────────────────────────

    function _settleRevenue(address _user) internal {
        StakerInfo storage info = stakers[_user];
        if (info.shares > 0) {
            uint256 owed = (info.shares * (revenuePerShare - info.revenueDebt)) / 1e18;
            info.pendingRevenue += owed;
        }
        info.revenueDebt = revenuePerShare;
    }
}
