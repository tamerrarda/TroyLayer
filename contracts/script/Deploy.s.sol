// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Script, console} from "forge-std/Script.sol";
import {StdCheats} from "forge-std/StdCheats.sol";
import {TroyPool} from "../src/TroyPool.sol";
import {TroyExchange} from "../src/TroyExchange.sol";

contract DeployScript is Script, StdCheats {
    // Real USDC on Base mainnet (available on the Anvil fork)
    address constant USDC = 0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913;

    // 100,000 USDC pre-funded to TroyExchange at deploy (6 decimals)
    uint256 constant INITIAL_EXCHANGE_USDC = 100_000 * 1e6;
    // Pool emits PoolBelowThreshold when balance drops below 2,000 USDC
    uint256 constant POOL_THRESHOLD = 2_000 * 1e6;

    function run() external {
        uint256 deployerKey = vm.envUint("DEPLOYER_PRIVATE_KEY");
        address deployer    = vm.addr(deployerKey);

        // Optional: separate wallets; fallback to deployer for hackathon
        address facilitator = vm.envOr("FACILITATOR_ADDRESS", deployer);
        address poolManager  = vm.envOr("POOL_MANAGER_ADDRESS", deployer);

        vm.startBroadcast(deployerKey);

        TroyPool pool = new TroyPool(USDC, POOL_THRESHOLD, deployer);
        console.log("TroyPool    :", address(pool));

        TroyExchange exchange = new TroyExchange(USDC, address(pool), deployer);
        console.log("TroyExchange:", address(exchange));

        // Grant roles on TroyPool
        pool.grantRole(pool.FACILITATOR_ROLE(), facilitator);
        pool.grantRole(pool.POOL_MANAGER_ROLE(), poolManager);

        vm.stopBroadcast();

        // Fund TroyExchange via Anvil storage manipulation (works on fork, no real transfer needed)
        deal(USDC, address(exchange), INITIAL_EXCHANGE_USDC);
        console.log("Funded", INITIAL_EXCHANGE_USDC / 1e6, "USDC -> TroyExchange");

        console.log("\n=== Deployment complete ===");
        console.log("USDC        :", USDC);
        console.log("TroyPool    :", address(pool));
        console.log("TroyExchange:", address(exchange));
        console.log("Facilitator :", facilitator);
        console.log("PoolManager :", poolManager);
    }
}
