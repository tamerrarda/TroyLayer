// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Test} from "forge-std/Test.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {TroyPool} from "../src/TroyPool.sol";

contract TroyPoolTest is Test {
    // Real Base USDC — available via Anvil fork
    address constant USDC_ADDR = 0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913;

    IERC20   usdc;
    TroyPool pool;

    address admin       = address(1);
    address facilitator = address(2);
    address poolManager = address(3);
    address merchant    = address(4);
    address attacker    = address(5);

    uint256 constant THRESHOLD    = 2_000 * 1e6;
    uint256 constant INITIAL_POOL = 10_000 * 1e6;

    function setUp() public {
        usdc = IERC20(USDC_ADDR);
        pool = new TroyPool(USDC_ADDR, THRESHOLD, admin);

        vm.startPrank(admin);
        pool.grantRole(pool.FACILITATOR_ROLE(), facilitator);
        pool.grantRole(pool.POOL_MANAGER_ROLE(), poolManager);
        vm.stopPrank();

        // Seed pool with USDC using Anvil deal
        deal(USDC_ADDR, address(pool), INITIAL_POOL);
    }

    // ── getBalance ────────────────────────────────────────────────────────────

    function test_getBalance_returnsCorrectBalance() public view {
        assertEq(pool.getBalance(), INITIAL_POOL);
    }

    // ── pay ───────────────────────────────────────────────────────────────────

    function test_pay_transfersUsdcToMerchant() public {
        uint256 amount = 100 * 1e6;
        bytes32 txId   = keccak256("tx1");

        vm.prank(facilitator);
        pool.pay(txId, amount, merchant);

        assertEq(usdc.balanceOf(merchant), amount);
        assertEq(pool.getBalance(), INITIAL_POOL - amount);
    }

    function test_pay_emitsPaymentSentEvent() public {
        bytes32 txId  = keccak256("tx1");
        uint256 amount = 50 * 1e6;

        vm.expectEmit(true, true, false, true, address(pool));
        emit TroyPool.PaymentSent(txId, merchant, amount);

        vm.prank(facilitator);
        pool.pay(txId, amount, merchant);
    }

    function test_pay_revertsOnDuplicateTxId() public {
        bytes32 txId  = keccak256("tx1");
        uint256 amount = 100 * 1e6;

        vm.startPrank(facilitator);
        pool.pay(txId, amount, merchant);

        vm.expectRevert(abi.encodeWithSelector(TroyPool.DuplicateTxId.selector, txId));
        pool.pay(txId, amount, merchant);
        vm.stopPrank();
    }

    function test_pay_revertsWithoutFacilitatorRole() public {
        vm.prank(attacker);
        vm.expectRevert();
        pool.pay(keccak256("tx1"), 100 * 1e6, merchant);
    }

    function test_pay_revertsOnZeroAmount() public {
        vm.prank(facilitator);
        vm.expectRevert(TroyPool.ZeroAmount.selector);
        pool.pay(keccak256("tx1"), 0, merchant);
    }

    function test_pay_revertsOnZeroMerchantAddress() public {
        vm.prank(facilitator);
        vm.expectRevert(TroyPool.ZeroAddress.selector);
        pool.pay(keccak256("tx1"), 100 * 1e6, address(0));
    }

    function test_pay_emitsBelowThresholdWhenPoolDropsLow() public {
        uint256 bigPayment   = INITIAL_POOL - (THRESHOLD / 2);
        uint256 expectedLeft = INITIAL_POOL - bigPayment;

        vm.expectEmit(false, false, false, true, address(pool));
        emit TroyPool.PoolBelowThreshold(expectedLeft, THRESHOLD);

        vm.prank(facilitator);
        pool.pay(keccak256("big"), bigPayment, merchant);
    }

    // ── refill ────────────────────────────────────────────────────────────────

    function test_refill_increasesPoolBalance() public {
        uint256 refillAmount = 5_000 * 1e6;
        deal(USDC_ADDR, poolManager, refillAmount);

        vm.startPrank(poolManager);
        usdc.approve(address(pool), refillAmount);
        pool.refill(refillAmount);
        vm.stopPrank();

        assertEq(pool.getBalance(), INITIAL_POOL + refillAmount);
    }

    function test_refill_emitsPoolRefilledEvent() public {
        uint256 refillAmount = 3_000 * 1e6;
        deal(USDC_ADDR, poolManager, refillAmount);

        vm.expectEmit(true, false, false, true, address(pool));
        emit TroyPool.PoolRefilled(poolManager, refillAmount, INITIAL_POOL + refillAmount);

        vm.startPrank(poolManager);
        usdc.approve(address(pool), refillAmount);
        pool.refill(refillAmount);
        vm.stopPrank();
    }

    function test_refill_revertsWithoutPoolManagerRole() public {
        vm.prank(attacker);
        vm.expectRevert();
        pool.refill(1_000 * 1e6);
    }

    function test_refill_revertsOnZeroAmount() public {
        vm.prank(poolManager);
        vm.expectRevert(TroyPool.ZeroAmount.selector);
        pool.refill(0);
    }

    // ── multiple payments ─────────────────────────────────────────────────────

    function test_pay_multipleDistinctTxIds_allSucceed() public {
        uint256 amount = 10 * 1e6;
        vm.startPrank(facilitator);
        for (uint256 i = 0; i < 5; i++) {
            pool.pay(bytes32(i + 1), amount, merchant);
        }
        vm.stopPrank();

        assertEq(usdc.balanceOf(merchant), 5 * amount);
        assertEq(pool.getBalance(), INITIAL_POOL - 5 * amount);
    }
}
