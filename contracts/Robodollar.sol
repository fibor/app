// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title Robodollar
 * @notice A programmable stablecoin pegged 1:1 to USDC.
 *
 *   ALL rUSD is backed 1:1 by USDC held in this contract.
 *
 *   Two paths to get Robodollars:
 *   1. Prepaid: Anyone wraps USDC → receives rUSD via wrap()
 *   2. Credit: CreditPool deposits USDC here, then mints rUSD to agent
 *
 *   This means unwrap() is always safe — every rUSD in circulation
 *   has a corresponding USDC sitting in this contract.
 */
contract Robodollar is ERC20, Ownable {
    using SafeERC20 for IERC20;

    IERC20 public immutable usdc;
    address public creditPool;

    mapping(address => bool) public frozen;

    event CreditPoolUpdated(address indexed newPool);
    event AgentFrozen(address indexed agent);
    event Wrapped(address indexed user, uint256 amount);
    event Unwrapped(address indexed user, uint256 amount);

    modifier onlyCreditPool() {
        require(msg.sender == creditPool, "Only CreditPool");
        _;
    }

    constructor(address _usdc) ERC20("Robodollar", "rUSD") Ownable(msg.sender) {
        usdc = IERC20(_usdc);
    }

    /// @notice One-way lock. Once locked, no admin setters can be called.
    bool public locked;

    function setCreditPool(address _pool) external onlyOwner {
        require(!locked, "Contract locked");
        creditPool = _pool;
        emit CreditPoolUpdated(_pool);
    }

    /// @notice Permanently lock all admin setters. One-way gate.
    function lock() external onlyOwner {
        require(!locked, "Already locked");
        locked = true;
    }

    // ──────────────────────────────────────────────
    //  Prepaid wrapping (anyone)
    // ──────────────────────────────────────────────

    /**
     * @notice Deposit USDC and receive rUSD 1:1.
     */
    function wrap(uint256 _amount) external {
        require(!frozen[msg.sender], "Agent frozen");
        require(_amount > 0, "Amount must be > 0");
        usdc.safeTransferFrom(msg.sender, address(this), _amount);
        _mint(msg.sender, _amount);
        emit Wrapped(msg.sender, _amount);
    }

    /**
     * @notice Burn rUSD and receive USDC 1:1.
     *         Safe because all rUSD is backed by USDC in this contract.
     */
    function unwrap(uint256 _amount) external {
        require(!frozen[msg.sender], "Agent frozen");
        require(_amount > 0, "Amount must be > 0");
        _burn(msg.sender, _amount);
        usdc.safeTransfer(msg.sender, _amount);
        emit Unwrapped(msg.sender, _amount);
    }

    // ──────────────────────────────────────────────
    //  Credit operations (CreditPool only)
    // ──────────────────────────────────────────────

    /**
     * @notice Mint rUSD backed by USDC that CreditPool has already
     *         transferred to this contract. CreditPool calls this after
     *         sending USDC here.
     */
    function mint(address _to, uint256 _amount) external onlyCreditPool {
        require(!frozen[_to], "Agent frozen");
        _mint(_to, _amount);
    }

    /**
     * @notice Burn rUSD and return the backing USDC to a specified address.
     *         Used by CreditPool for repayments and clawbacks.
     * @param _from    Address whose rUSD is burned
     * @param _amount  Amount to burn
     * @param _returnTo Address to receive the backing USDC
     */
    function burnAndReturn(address _from, uint256 _amount, address _returnTo) external onlyCreditPool {
        _burn(_from, _amount);
        usdc.safeTransfer(_returnTo, _amount);
    }

    /**
     * @notice Freeze an agent on default. Prevents all transfers.
     */
    function freezeAgent(address _agent) external onlyCreditPool {
        frozen[_agent] = true;
        emit AgentFrozen(_agent);
    }

    // ──────────────────────────────────────────────
    //  Transfer restrictions
    // ──────────────────────────────────────────────

    function _update(address from, address to, uint256 value) internal override {
        if (from != address(0)) {
            require(!frozen[from], "Sender frozen");
        }
        if (to != address(0)) {
            require(!frozen[to], "Recipient frozen");
        }
        super._update(from, to, value);
    }
}
