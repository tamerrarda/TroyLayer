import { NextResponse } from "next/server";

const AGGREGATOR_URL = process.env.AGGREGATOR_URL ?? "http://localhost:8000";

export async function GET() {
  try {
    const res = await fetch(`${AGGREGATOR_URL}/prices`, { cache: "no-store" });
    if (!res.ok) throw new Error(`Aggregator returned ${res.status}`);
    const data = await res.json() as {
      prices: { binance: number; bybit: number; okx: number };
      average: number;
    };

    // Average is USDC per 1 TRY (e.g. 0.0265)
    // Invert → TRY per 1 USDC ≈ TRY per 1 USD (stablecoin)
    const tryPerUsd = 1 / data.average;

    return NextResponse.json({
      rates: data.prices,
      average: data.average,
      tryPerUsd: Math.round(tryPerUsd * 100) / 100,
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Aggregator unavailable", details: String(err) },
      { status: 503 }
    );
  }
}
