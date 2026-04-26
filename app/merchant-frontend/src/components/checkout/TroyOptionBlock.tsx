"use client";

import { useState, useEffect, useCallback } from "react";
import { RefreshCw } from "lucide-react";
import { formatTRY, formatRate } from "@/lib/format";
import styles from "./TroyOptionBlock.module.css";

interface Props {
  total: number;
  tryRate?: number;
}

interface Toast {
  msg: string;
  key: number;
}

export default function TroyOptionBlock({ total }: Props) {
  const [rate, setRate] = useState<number | null>(null);
  const [countdown, setCountdown] = useState(30);
  const [toast, setToast] = useState<Toast | null>(null);

  const refreshRate = useCallback(async () => {
    try {
      const res = await fetch("/api/payment/rate");
      if (!res.ok) throw new Error("fetch failed");
      const data = await res.json() as { tryPerUsd: number };
      const newRate = data.tryPerUsd;
      setRate((prev) => {
        if (prev !== null) {
          const change = Math.abs((newRate - prev) / prev);
          if (change > 0.005) {
            setToast({ msg: `Rate updated: ${formatRate(newRate)}`, key: Date.now() });
            setTimeout(() => setToast(null), 3000);
          }
        }
        return newRate;
      });
    } catch {
      // keep previous rate on error
    }
    setCountdown(30);
  }, []);

  useEffect(() => {
    refreshRate();
  }, [refreshRate]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) {
          refreshRate();
          return 30;
        }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [refreshRate]);

  const tryAmount = rate !== null ? total * rate : null;
  const mins = Math.floor(countdown / 60);
  const secs = String(countdown % 60).padStart(2, "0");

  return (
    <div className={styles.block}>
      <p className={styles.infoText}>
        Pay in Turkish Lira with your Troy card. Your order total of{" "}
        <strong>USD {total.toLocaleString("en-US", { minimumFractionDigits: 2 })}</strong> will
        be charged as{" "}
        <strong>{tryAmount !== null ? `${formatTRY(tryAmount)} TRY` : "…"}</strong> at today&apos;s exchange rate.
      </p>

      <div className={styles.rateLine}>
        <span className={styles.rateText}>{rate !== null ? formatRate(rate) : "Loading…"}</span>
        <span className={styles.countdown}>
          Rate is valid for 30 seconds
          <span className={styles.timer}>
            <RefreshCw size={12} />
            {mins}:{secs}
          </span>
        </span>
      </div>

      <p className={styles.redirectNote}>
        You will be redirected to a secure Troy payment page to enter your card details.
      </p>

      {toast && (
        <div key={toast.key} className={styles.toast}>
          {toast.msg}
        </div>
      )}
    </div>
  );
}
