// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./FiborAccount.sol";

/**
 * @title FiborAccountFactory
 * @notice Deploys FiborAccount contracts for new agents.
 *
 *   Called by FiborID.register() during agent registration.
 *   Uses CREATE2 for deterministic addresses — given the same salt
 *   (agent logical address), the FiborAccount address is predictable.
 *
 *   The factory stores protocol addresses so each FiborAccount is
 *   deployed with the correct references.
 */
contract FiborAccountFactory {

    address public immutable robodollar;
    address public immutable usdc;
    address public immutable creditPool;
    address public immutable paymentGateway;

    event AccountCreated(address indexed account, address indexed guardian);

    constructor(
        address _robodollar,
        address _usdc,
        address _creditPool,
        address _paymentGateway
    ) {
        robodollar = _robodollar;
        usdc = _usdc;
        creditPool = _creditPool;
        paymentGateway = _paymentGateway;
    }

    /**
     * @notice Deploy a new FiborAccount.
     * @param _guardian   The human custodian (developer) of the agent
     * @param _salt       Unique salt for CREATE2 (typically the agent's logical address)
     * @return account    The deployed FiborAccount address
     */
    function createAccount(address _guardian, bytes32 _salt) external returns (address account) {
        FiborAccount a = new FiborAccount{salt: _salt}(
            _guardian,
            robodollar,
            usdc,
            creditPool,
            paymentGateway
        );
        account = address(a);
        emit AccountCreated(account, _guardian);
    }

    /**
     * @notice Predict the address of a FiborAccount before deployment.
     */
    function predictAddress(address _guardian, bytes32 _salt) external view returns (address) {
        bytes32 hash = keccak256(
            abi.encodePacked(
                bytes1(0xff),
                address(this),
                _salt,
                keccak256(
                    abi.encodePacked(
                        type(FiborAccount).creationCode,
                        abi.encode(_guardian, robodollar, usdc, creditPool, paymentGateway)
                    )
                )
            )
        );
        return address(uint160(uint256(hash)));
    }
}
