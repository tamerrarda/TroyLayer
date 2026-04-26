import { keccak256, toHex } from "viem";
import { getClients } from "../overlay/lib/chain";
import {
  TROY_POOL_ADDRESS,
  TROY_EXCHANGE_ADDRESS,
  MERCHANT_ADDRESS,
  TROY_POOL_ABI,
  TROY_EXCHANGE_ABI,
} from "../overlay/lib/contracts";

const ANVIL_KEY = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
const MOCK_RATE = 0.02653; // fallback USDC per 1 TRY if aggregator is down

// Persist defaults on first install so getClients() always finds a key
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.get(["privateKey"], (existing) => {
    if (!existing["privateKey"]) {
      chrome.storage.local.set({
        rpcUrl: "http://192.168.1.52:8545",
        aggregatorUrl: "http://192.168.1.52:8000",
        privateKey: ANVIL_KEY,
        merchantAddress: MERCHANT_ADDRESS,
      });
    }
  });
});

interface PayRequest {
  type: "TROY_PAY_REQUEST";
  txId: string;
  usdTotal: number;
}

interface RateRequest {
  type: "TROY_RATE_REQUEST";
}

interface OpenTabRequest {
  type: "TROY_OPEN_TAB";
  params: string;
}

interface PayResult {
  success: boolean;
  payTxHash?: string;
  usdcPaid?: string;
  error?: string;
}

interface RateResult {
  tryPerUsd?: number;
  error?: string;
}

chrome.runtime.onMessage.addListener(
  (msg: PayRequest | RateRequest | OpenTabRequest, _sender, sendResponse) => {
    if (msg.type === "TROY_PAY_REQUEST") {
      handlePayment(msg)
        .then(sendResponse)
        .catch((e: unknown) => sendResponse({ success: false, error: String(e) }));
      return true;
    }
    if (msg.type === "TROY_RATE_REQUEST") {
      handleRate()
        .then(sendResponse)
        .catch((e: unknown) => sendResponse({ error: String(e) }));
      return true;
    }
    if (msg.type === "TROY_OPEN_TAB") {
      const url = chrome.runtime.getURL(`src/overlay/index.html?${msg.params}`);
      chrome.tabs.create({ url });
    }
  }
);

async function handlePayment(req: PayRequest): Promise<PayResult> {
  const { publicClient, walletClient } = await getClients();
  const cfg = await chrome.storage.local.get(["aggregatorUrl", "merchantAddress"]);
  const aggregatorUrl = (cfg["aggregatorUrl"] as string | undefined) ?? "http://localhost:8000";
  const merchantAddress = ((cfg["merchantAddress"] as string | undefined) ?? MERCHANT_ADDRESS) as `0x${string}`;

  // 1. Fetch live rates from aggregator (fall back to mock if unavailable)
  let prices = { binance: MOCK_RATE, bybit: MOCK_RATE, okx: MOCK_RATE };
  try {
    const pricesRes = await fetch(`${aggregatorUrl}/prices`, { signal: AbortSignal.timeout(5000) });
    if (pricesRes.ok) {
      const pricesData = (await pricesRes.json()) as {
        prices: { binance: number; bybit: number; okx: number };
      };
      prices = pricesData.prices;
    }
  } catch {
    console.warn("[TroyLayer] Aggregator unavailable, using mock rate");
  }

  // 2. Push rates to TroyExchange
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

  // 3. Compute tryAmount from best rate
  const [bestRate] = await publicClient.readContract({
    address: TROY_EXCHANGE_ADDRESS,
    abi: TROY_EXCHANGE_ABI,
    functionName: "getBestRate",
  });
  const usdcNeeded = BigInt(Math.round(req.usdTotal * 1e6));
  const tryAmount = usdcNeeded / bestRate;

  const [usdcOut] = await publicClient.readContract({
    address: TROY_EXCHANGE_ADDRESS,
    abi: TROY_EXCHANGE_ABI,
    functionName: "previewConvert",
    args: [tryAmount],
  });

  // 4. Pay merchant immediately from pre-funded pool
  const txIdBytes32 = keccak256(toHex(req.txId)) as `0x${string}`;
  const payHash = await walletClient.writeContract({
    address: TROY_POOL_ADDRESS,
    abi: TROY_POOL_ABI,
    functionName: "pay",
    args: [txIdBytes32, usdcOut, merchantAddress],
  });
  await publicClient.waitForTransactionReceipt({ hash: payHash });

  // 5. Replenish pool (fire and forget)
  walletClient
    .writeContract({
      address: TROY_EXCHANGE_ADDRESS,
      abi: TROY_EXCHANGE_ABI,
      functionName: "convertAndFund",
      args: [tryAmount],
    })
    .then((h) => publicClient.waitForTransactionReceipt({ hash: h }))
    .catch((err: unknown) => console.error("[replenish] error:", err));

  return {
    success: true,
    payTxHash: payHash,
    usdcPaid: (Number(usdcOut) / 1e6).toFixed(2),
  };
}

async function handleRate(): Promise<RateResult> {
  const cfg = await chrome.storage.local.get("aggregatorUrl");
  const aggregatorUrl = (cfg["aggregatorUrl"] as string | undefined) ?? "http://localhost:8000";
  try {
    const res = await fetch(`${aggregatorUrl}/prices`, { signal: AbortSignal.timeout(5000) });
    if (res.ok) {
      const data = (await res.json()) as { average: number };
      return { tryPerUsd: Math.round((1 / data.average) * 100) / 100 };
    }
  } catch {
    // fall through to mock
  }
  return { tryPerUsd: Math.round((1 / MOCK_RATE) * 100) / 100 };
}
