// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import {AccessControl} from "@openzeppelin/contracts/access/AccessControl.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/// @notice USDC liquidity pool. Pays merchants instantly and accepts USDC refills.
contract TroyPool is AccessControl, ReentrancyGuard {
    using SafeERC20 for IERC20;

    bytes32 public constant FACILITATOR_ROLE = keccak256("FACILITATOR_ROLE");
    bytes32 public constant POOL_MANAGER_ROLE = keccak256("POOL_MANAGER_ROLE");

    IERC20 public immutable usdc;
    uint256 public thresholdUsdc;

    /// @dev Guards against replaying the same on-chain txId twice.
    mapping(bytes32 => bool) private _processedTxIds;

    event PaymentSent(bytes32 indexed txId, address indexed merchant, uint256 amount);
    event PoolRefilled(address indexed by, uint256 amount, uint256 newBalance);
    event PoolBelowThreshold(uint256 currentBalance, uint256 threshold);

    error ZeroAmount();
    error ZeroAddress();
    error DuplicateTxId(bytes32 txId);

    constructor(address _usdc, uint256 _thresholdUsdc, address _admin) {
        if (_usdc == address(0) || _admin == address(0)) revert ZeroAddress();
        usdc = IERC20(_usdc);
        thresholdUsdc = _thresholdUsdc;
        _grantRole(DEFAULT_ADMIN_ROLE, _admin);
    }

    /// @notice Transfer USDC from pool to merchant. Idempotent per txId.
    /// @param txId     Unique identifier for this payment (from webhook).
    /// @param amount   USDC amount with 6 decimal precision.
    /// @param merchant Recipient address.
    function pay(bytes32 txId, uint256 amount, address merchant)
        external
        nonReentrant
        onlyRole(FACILITATOR_ROLE)
    {
        if (amount == 0) revert ZeroAmount();
        if (merchant == address(0)) revert ZeroAddress();
        if (_processedTxIds[txId]) revert DuplicateTxId(txId);

        _processedTxIds[txId] = true;
        usdc.safeTransfer(merchant, amount);
        emit PaymentSent(txId, merchant, amount);

        uint256 balance = usdc.balanceOf(address(this));
        if (balance < thresholdUsdc) {
            emit PoolBelowThreshold(balance, thresholdUsdc);
        }
    }

    /// @notice Pull USDC from caller into pool. Caller must approve this contract first.
    /// @param amount USDC amount with 6 decimal precision.
    function refill(uint256 amount) external nonReentrant onlyRole(POOL_MANAGER_ROLE) {
        if (amount == 0) revert ZeroAmount();
        usdc.safeTransferFrom(msg.sender, address(this), amount);
        emit PoolRefilled(msg.sender, amount, usdc.balanceOf(address(this)));
    }

    /// @notice Current USDC balance held by this pool.
    function getBalance() external view returns (uint256) {
        return usdc.balanceOf(address(this));
    }

    /// @notice Update low-balance alert threshold.
    function setThreshold(uint256 newThreshold) external onlyRole(DEFAULT_ADMIN_ROLE) {
        thresholdUsdc = newThreshold;
    }
}
