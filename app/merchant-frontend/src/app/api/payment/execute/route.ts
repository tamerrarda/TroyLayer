import { NextRequest, NextResponse } from "next/server";
import { keccak256, toHex } from "viem";
import { publicClient, walletClient } from "@/lib/chain";
import {
  TROY_POOL_ADDRESS,
  TROY_EXCHANGE_ADDRESS,
  MERCHANT_ADDRESS,
  TROY_POOL_ABI,
  TROY_EXCHANGE_ABI,
} from "@/lib/contracts";

const AGGREGATOR_URL = process.env.AGGREGATOR_URL ?? "http://localhost:8000";

export async function POST(req: NextRequest) {
  try {
    const { txId, usdTotal } = (await req.json()) as {
      txId: string;
      usdTotal: number;
    };

    // 1. Fetch live rates and push to TroyExchange
    const pricesRes = await fetch(`${AGGREGATOR_URL}/prices`, { cache: "no-store" });
    const pricesData = await pricesRes.json() as { prices: Record<string, number> };
    const prices = pricesData.prices;

    for (const [exchange, idx] of [["binance", 0], ["bybit", 1], ["okx", 2]] as const) {
      const rate = BigInt(Math.round(prices[exchange] * 1e6));
      const hash = await walletClient.writeContract({
        address: TROY_EXCHANGE_ADDRESS,
        abi: TROY_EXCHANGE_ABI,
        functionName: "setRate",
        args: [BigInt(idx), rate],
      });
      await publicClient.waitForTransactionReceipt({ hash });
    }

    // 2. Compute tryAmount from best rate
    const [bestRate] = await publicClient.readContract({
      address: TROY_EXCHANGE_ADDRESS,
      abi: TROY_EXCHANGE_ABI,
      functionName: "getBestRate",
    });
    const usdcNeeded = BigInt(Math.round(usdTotal * 1e6));
    const tryAmount = usdcNeeded / bestRate;

    const [usdcOut] = await publicClient.readContract({
      address: TROY_EXCHANGE_ADDRESS,
      abi: TROY_EXCHANGE_ABI,
      functionName: "previewConvert",
      args: [tryAmount],
    });

    // 3. Pay merchant immediately from the pre-funded pool
    const txIdBytes32 = keccak256(toHex(txId)) as `0x${string}`;
    const payHash = await walletClient.writeContract({
      address: TROY_POOL_ADDRESS,
      abi: TROY_POOL_ABI,
      functionName: "pay",
      args: [txIdBytes32, usdcOut, MERCHANT_ADDRESS],
    });
    await publicClient.waitForTransactionReceipt({ hash: payHash });

    // 4. Replenish pool from TroyExchange in the background (fire and forget)
    walletClient.writeContract({
      address: TROY_EXCHANGE_ADDRESS,
      abi: TROY_EXCHANGE_ABI,
      functionName: "convertAndFund",
      args: [tryAmount],
    }).then((hash) => publicClient.waitForTransactionReceipt({ hash }))
      .catch((err) => console.error("[replenish] error:", err));

    return NextResponse.json({
      success: true,
      payTxHash: payHash,
      usdcPaid: (Number(usdcOut) / 1e6).toFixed(2),
      tryAmount: tryAmount.toString(),
    });
  } catch (err) {
    console.error("[execute] error:", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
