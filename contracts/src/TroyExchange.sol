// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/// @notice Holds mock USDC and simulates a TRY→USDC FX aggregator.
///         The owner pushes updated rates from off-chain sources .
///         On demand, it picks the best rate and funds TroyPool with the equivalent USDC.
///
/// Rate math:
///   rate   = USDC per 1 TRY * 1e6   (e.g. 26500 → 0.026500 USDC/TRY)
///   usdc   = tryAmount (whole TRY) * rate  →  result has 6-decimal USDC precision
///   example: 1000 TRY * 26500 = 26_500_000 = 26.5 USDC ✓
contract TroyExchange is Ownable, ReentrancyGuard {
    using SafeERC20 for IERC20;

    /// @dev Denominator that makes `rate` produce 6-decimal USDC output.
    uint256 public constant RATE_SCALE = 1e6;

    struct AggregatorSource {
        string name;
        uint256 rate; // USDC per 1 TRY * RATE_SCALE
    }

    IERC20 public immutable usdc;
    address public pool;

    /// @dev Index: 0 = Binance TR, 1 = Bybit, 2 = OKX
    AggregatorSource[3] public sources;

    event RateSet(uint256 indexed sourceIndex, string sourceName, uint256 rate);
    event Converted(
        uint256 tryAmount,
        uint256 usdcAmount,
        uint256 bestRate,
        string sourceName,
        address indexed pool
    );
    event PoolUpdated(address indexed oldPool, address indexed newPool);

    error ZeroAmount();
    error ZeroRate();
    error ZeroAddress();
    error InvalidSourceIndex();
    error NoValidRate();
    error InsufficientBalance(uint256 available, uint256 required);

    constructor(address _usdc, address _pool, address _owner) Ownable(_owner) {
        if (_usdc == address(0) || _pool == address(0)) revert ZeroAddress();
        usdc = IERC20(_usdc);
        pool = _pool;
        // Default rates seeded from realistic 2025 TRY/USDC range (~0.026 USDC/TRY)
        sources[0] = AggregatorSource("Binance", 26500);
        sources[1] = AggregatorSource("Bybit",   26300);
        sources[2] = AggregatorSource("OKX",     26400);
    }

    /// @notice Push a new rate from an off-chain aggregator source.
    /// @param sourceIndex 0 = Binance TR, 1 = Bybit, 2 = OKX.
    /// @param rate        USDC per 1 TRY multiplied by 1e6.
    function setRate(uint256 sourceIndex, uint256 rate) external onlyOwner {
        if (sourceIndex >= 3) revert InvalidSourceIndex();
        if (rate == 0) revert ZeroRate();
        sources[sourceIndex].rate = rate;
        emit RateSet(sourceIndex, sources[sourceIndex].name, rate);
    }

    /// @notice Returns the highest rate across all mock aggregator sources.
    function getBestRate() public view returns (uint256 bestRate, string memory sourceName) {
        for (uint256 i = 0; i < 3; i++) {
            if (sources[i].rate > bestRate) {
                bestRate = sources[i].rate;
                sourceName = sources[i].name;
            }
        }
        if (bestRate == 0) revert NoValidRate();
    }

    /// @notice Update pool contract address.
    function setPool(address newPool) external onlyOwner {
        if (newPool == address(0)) revert ZeroAddress();
        emit PoolUpdated(pool, newPool);
        pool = newPool;
    }

    /// @notice Convert tryAmount (whole TRY, no decimals) to USDC using the best
    ///         aggregator rate, then transfer the USDC directly to TroyPool.
    /// @param tryAmount TRY amount as a whole number (e.g. 1000 for 1000 TRY).
    function convertAndFund(uint256 tryAmount) external nonReentrant onlyOwner {
        if (tryAmount == 0) revert ZeroAmount();

        (uint256 bestRate, string memory sourceName) = getBestRate();

        // usdcAmount carries 6-decimal precision matching USDC
        uint256 usdcAmount = tryAmount * bestRate;

        uint256 balance = usdc.balanceOf(address(this));
        if (balance < usdcAmount) revert InsufficientBalance(balance, usdcAmount);

        usdc.safeTransfer(pool, usdcAmount);
        emit Converted(tryAmount, usdcAmount, bestRate, sourceName, pool);
    }

    /// @notice Preview USDC output for a given TRY amount without executing.
    function previewConvert(uint256 tryAmount)
        external
        view
        returns (uint256 usdcAmount, string memory sourceName)
    {
        (uint256 bestRate, string memory name) = getBestRate();
        return (tryAmount * bestRate, name);
    }

    /// @notice USDC balance currently held by this contract.
    function getBalance() external view returns (uint256) {
        return usdc.balanceOf(address(this));
    }
}
