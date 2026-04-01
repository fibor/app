// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

interface IRevenueDistributor {
    function distributeFees(uint256 rUsdAmount) external;
}

/**
 * @title PaymentGateway
 * @notice The transaction processing layer for FIBOR. Connects agent
 *         payments to fee collection.
 *
 *   Flow:
 *   1. Agent calls pay(merchant, amount) with Robodollars
 *   2. 2.5% fee is deducted, sent to RevenueDistributor (which unwraps
 *      to USDC and distributes to stakers/treasury)
 *   3. 97.5% rUSD goes to the merchant
 *
 *   Score is NOT updated on transactions — only repayments affect score.
 *   This prevents score gaming via self-dealing or wash transactions.
 *
 *   Permissionless — any agent with rUSD can pay any merchant.
 */
contract PaymentGateway is ReentrancyGuard, Ownable {
    using SafeERC20 for IERC20;

    IERC20 public immutable robodollar;
    IRevenueDistributor public revenueDistributor;

    uint256 public constant FEE_BPS = 250; // 2.5%
    uint256 public constant BPS = 10_000;

    uint256 public totalProcessed;
    uint256 public totalPayments;

    /// @notice One-way lock. Once locked, no admin setters can be called.
    bool public locked;

    event PaymentProcessed(
        address indexed agent,
        address indexed merchant,
        uint256 amount,
        uint256 fee,
        uint256 merchantReceived
    );

    constructor(
        address _robodollar,
        address _revenueDistributor
    ) Ownable(msg.sender) {
        robodollar = IERC20(_robodollar);
        revenueDistributor = IRevenueDistributor(_revenueDistributor);
    }

    // ──────────────────────────────────────────────
    //  Payment processing (permissionless)
    // ──────────────────────────────────────────────

    /**
     * @notice Process a payment from an agent to a merchant.
     *         Agent must approve this contract to spend rUSD before calling.
     * @param _merchant Recipient address
     * @param _amount   Gross payment amount in Robodollars
     */
    function pay(address _merchant, uint256 _amount) external nonReentrant {
        require(_merchant != address(0), "Invalid merchant");
        require(_amount > 0, "Amount must be > 0");

        address agent = msg.sender;

        // Calculate fee and merchant amount
        uint256 fee = (_amount * FEE_BPS) / BPS;
        uint256 merchantAmount = _amount - fee;

        // Pull rUSD from agent
        robodollar.safeTransferFrom(agent, address(this), _amount);

        // Send merchant portion in rUSD
        robodollar.safeTransfer(_merchant, merchantAmount);

        // Send fee to RevenueDistributor and trigger distribution
        robodollar.safeTransfer(address(revenueDistributor), fee);
        revenueDistributor.distributeFees(fee);

        totalProcessed += _amount;
        totalPayments++;

        emit PaymentProcessed(agent, _merchant, _amount, fee, merchantAmount);
    }

    // ──────────────────────────────────────────────
    //  Admin (one-time setup)
    // ──────────────────────────────────────────────

    function setRevenueDistributor(address _distributor) external onlyOwner {
        require(!locked, "Contract locked");
        revenueDistributor = IRevenueDistributor(_distributor);
    }

    /// @notice Permanently lock all admin setters. One-way gate.
    function lock() external onlyOwner {
        require(!locked, "Already locked");
        locked = true;
    }
}
