// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Test} from "forge-std/Test.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {TroyExchange} from "../src/TroyExchange.sol";
import {TroyPool} from "../src/TroyPool.sol";

contract TroyExchangeTest is Test {
    // Real Base USDC — available via Anvil fork
    address constant USDC_ADDR = 0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913;

    IERC20      usdc;
    TroyExchange exchange;
    TroyPool     pool;

    address owner    = address(1);
    address attacker = address(2);

    uint256 constant INITIAL_EXCHANGE_USDC = 100_000 * 1e6;
    uint256 constant POOL_THRESHOLD        = 2_000  * 1e6;

    function setUp() public {
        usdc = IERC20(USDC_ADDR);

        vm.startPrank(owner);
        pool     = new TroyPool(USDC_ADDR, POOL_THRESHOLD, owner);
        exchange = new TroyExchange(USDC_ADDR, address(pool), owner);
        vm.stopPrank();

        // Seed exchange with USDC using Anvil deal
        deal(USDC_ADDR, address(exchange), INITIAL_EXCHANGE_USDC);
    }

    // ── getBestRate ───────────────────────────────────────────────────────────

    function test_getBestRate_picksHighestDefaultRate() public view {
        // Defaults: Binance=26500, Bybit=26300, OKX=26400 → Binance wins
        (uint256 bestRate, string memory sourceName) = exchange.getBestRate();
        assertEq(bestRate, 26500);
        assertEq(keccak256(bytes(sourceName)), keccak256("Binance"));
    }

    function test_getBestRate_updatesAfterSetRate() public {
        vm.prank(owner);
        exchange.setRate(1, 27000); // Bybit overtakes Binance

        (uint256 bestRate, string memory sourceName) = exchange.getBestRate();
        assertEq(bestRate, 27000);
        assertEq(keccak256(bytes(sourceName)), keccak256("Bybit"));
    }

    // ── setRate ───────────────────────────────────────────────────────────────

    function test_setRate_revertsForNonOwner() public {
        vm.prank(attacker);
        vm.expectRevert();
        exchange.setRate(0, 27000);
    }

    function test_setRate_revertsOnZeroRate() public {
        vm.prank(owner);
        vm.expectRevert(TroyExchange.ZeroRate.selector);
        exchange.setRate(0, 0);
    }

    function test_setRate_revertsOnInvalidSourceIndex() public {
        vm.prank(owner);
        vm.expectRevert(TroyExchange.InvalidSourceIndex.selector);
        exchange.setRate(3, 26500);
    }

    function test_setRate_emitsEvent() public {
        vm.expectEmit(true, false, false, true, address(exchange));
        emit TroyExchange.RateSet(2, "OKX", 27100);

        vm.prank(owner);
        exchange.setRate(2, 27100);
    }

    // ── convertAndFund ────────────────────────────────────────────────────────

    function test_convertAndFund_transfersCorrectUsdcToPool() public {
        uint256 tryAmount    = 1000; // 1000 TRY
        uint256 expectedUsdc = 1000 * 26500; // 26.5 USDC (Binance is best by default)

        vm.prank(owner);
        exchange.convertAndFund(tryAmount);

        assertEq(pool.getBalance(), expectedUsdc);
        assertEq(exchange.getBalance(), INITIAL_EXCHANGE_USDC - expectedUsdc);
    }

    function test_convertAndFund_usesBestRateNotAny() public {
        vm.prank(owner);
        exchange.setRate(2, 27500); // OKX becomes best

        uint256 tryAmount    = 1000;
        uint256 expectedUsdc = tryAmount * 27500;

        vm.prank(owner);
        exchange.convertAndFund(tryAmount);

        assertEq(pool.getBalance(), expectedUsdc);
    }

    function test_convertAndFund_emitsConvertedEvent() public {
        uint256 tryAmount    = 500;
        uint256 expectedUsdc = tryAmount * 26500;

        vm.expectEmit(false, false, false, true, address(exchange));
        emit TroyExchange.Converted(tryAmount, expectedUsdc, 26500, "Binance", address(pool));

        vm.prank(owner);
        exchange.convertAndFund(tryAmount);
    }

    function test_convertAndFund_revertsOnZeroAmount() public {
        vm.prank(owner);
        vm.expectRevert(TroyExchange.ZeroAmount.selector);
        exchange.convertAndFund(0);
    }

    function test_convertAndFund_revertsWhenInsufficientBalance() public {
        // 10M TRY * 26500 = 265B units >> 100k USDC held
        vm.prank(owner);
        vm.expectRevert();
        exchange.convertAndFund(10_000_000);
    }

    function test_convertAndFund_revertsForNonOwner() public {
        vm.prank(attacker);
        vm.expectRevert();
        exchange.convertAndFund(1000);
    }

    // ── previewConvert ────────────────────────────────────────────────────────

    function test_previewConvert_matchesActualOutput() public {
        uint256 tryAmount = 750;
        (uint256 preview,) = exchange.previewConvert(tryAmount);

        vm.prank(owner);
        exchange.convertAndFund(tryAmount);

        assertEq(pool.getBalance(), preview);
    }

    // ── setPool ───────────────────────────────────────────────────────────────

    function test_setPool_updatesPoolAddress() public {
        address newPool = address(99);
        vm.prank(owner);
        exchange.setPool(newPool);
        assertEq(exchange.pool(), newPool);
    }

    function test_setPool_revertsOnZeroAddress() public {
        vm.prank(owner);
        vm.expectRevert(TroyExchange.ZeroAddress.selector);
        exchange.setPool(address(0));
    }

    function test_setPool_revertsForNonOwner() public {
        vm.prank(attacker);
        vm.expectRevert();
        exchange.setPool(address(99));
    }

    // ── getBalance ────────────────────────────────────────────────────────────

    function test_getBalance_returnsSeededAmount() public view {
        assertEq(exchange.getBalance(), INITIAL_EXCHANGE_USDC);
    }

    function test_getBalance_decreasesAfterConvert() public {
        uint256 tryAmount    = 2000;
        uint256 expectedUsdc = tryAmount * 26500;

        vm.prank(owner);
        exchange.convertAndFund(tryAmount);

        assertEq(exchange.getBalance(), INITIAL_EXCHANGE_USDC - expectedUsdc);
    }
}
