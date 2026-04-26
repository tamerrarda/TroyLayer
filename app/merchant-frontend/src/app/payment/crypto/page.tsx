"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import styles from "./page.module.css";

const MOCK_USDC_ADDRESS = "0xd408688850e5a235910689CB449c17F02A72Cd08";

function CryptoPayment() {
  const params = useSearchParams();
  const amount = Number(params.get("amount") ?? "0");
  const amountUsdc = amount.toFixed(6);

  return (
    <div className={styles.page}>
      <h1 className={styles.merchant}>FARFETCH</h1>

      <div className={styles.card}>
        <div className={styles.orderDetails}>
          <p className={styles.detailLabel}>Amount to be paid</p>
          <p className={styles.detailAmount}>${amount.toLocaleString("en-US", { minimumFractionDigits: 2 })} <span>USD</span></p>
          <p className={styles.detailUsdc}>{amountUsdc} <span>USDC</span></p>
        </div>

        <div className={styles.divider} />

        <div className={styles.section}>
          <p className={styles.sectionLabel}>Select a cryptocurrency</p>
          {[
            { name: "USDC (Circle)",  color: "#2775ca", recommended: true },
            { name: "USDT (Tether)",  color: "#26a17b", recommended: false },
            { name: "ETH (Ethereum)", color: "#627eea", recommended: false },
            { name: "BTC (Bitcoin)",  color: "#f7931a", recommended: false },
          ].map((coin) => (
            <div key={coin.name} className={styles.coinRow}>
              <div className={styles.coinDot} style={{ background: coin.color }} />
              <span>{coin.name}</span>
              {coin.recommended && <span className={styles.recommended}>Recommended</span>}
              <span className={styles.chevron}>›</span>
            </div>
          ))}
        </div>

        <div className={styles.divider} />

        <div className={styles.section}>
          <p className={styles.sectionLabel}>Amount due</p>
          <p className={styles.usdcAmount}>{amountUsdc} <span>USDC</span></p>
        </div>

        <div className={styles.section}>
          <p className={styles.sectionLabel}>Please send to address:</p>
          <div className={styles.networkBadge}>Base Network only</div>
          <div className={styles.addressBox}>
            <code className={styles.address}>{MOCK_USDC_ADDRESS}</code>
          </div>
          <p className={styles.warning}>
            Only send USDC on Base network. Using other networks will result in a loss of your funds.
          </p>
        </div>

        <p className={styles.waiting}>⏳ Waiting for payment…</p>
      </div>
    </div>
  );
}

export default function CryptoPaymentPage() {
  return (
    <Suspense>
      <CryptoPayment />
    </Suspense>
  );
}
