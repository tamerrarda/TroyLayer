"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Lock, Copy } from "lucide-react";
import Image from "next/image";
import Spinner from "@/components/ui/Spinner";
import { formatTRY, usdToTRY } from "@/lib/format";
import { TRY_RATE_BASE } from "@/data/products";
import styles from "./page.module.css";

const TOTAL_USD = 4673;
const TRY_AMOUNT = usdToTRY(TOTAL_USD, TRY_RATE_BASE);

type GatewayState =
  | "card"
  | "otp"
  | "processing"
  | "success"
  | "failure"
  | "refund";

function TroyGateway() {
  const router = useRouter();
  const params = useSearchParams();

  const [state, setState] = useState<GatewayState>("card");

  useEffect(() => {
    if (params.get("fail")) setState("failure");
    else if (params.get("refund")) setState("refund");
  }, [params]);
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [name, setName] = useState("");
  const [otp, setOtp] = useState("");
  const [otpCountdown, setOtpCountdown] = useState(60);
  const [processingStep, setProcessingStep] = useState(0);
  const [payTxHash, setPayTxHash] = useState<string | null>(null);
  const txIdRef = useRef(`TXN-${Date.now()}`);

  function getBinBadge(): string {
    const first = cardNumber.replace(/\s/g, "")[0] ?? "";
    if (first === "9") return "TROY";
    if (first === "4") return "VISA";
    if (first === "5") return "MC";
    if (first === "3") return "AMEX";
    return "TROY";
  }

  function formatCardNumber(val: string): string {
    return val
      .replace(/\D/g, "")
      .slice(0, 16)
      .replace(/(\d{4})(?=\d)/g, "$1 ");
  }

  function formatExpiry(val: string): string {
    const digits = val.replace(/\D/g, "").slice(0, 4);
    if (digits.length <= 2) return digits;
    return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  }

  function handlePay(e: React.FormEvent) {
    e.preventDefault();
    setState("otp");
  }

  /* OTP countdown */
  useEffect(() => {
    if (state !== "otp") return;
    const t = setInterval(() => setOtpCountdown((c) => Math.max(0, c - 1)), 1000);
    return () => clearInterval(t);
  }, [state]);

  /* OTP auto-submit */
  useEffect(() => {
    if (state === "otp" && otp.length === 6) {
      setState("processing");
    }
  }, [otp, state]);

  /* Processing: animate steps + fire on-chain payment */
  useEffect(() => {
    if (state !== "processing") return;

    const steps = [800, 1800, 3200];
    const timers = steps.map((delay, i) =>
      setTimeout(() => setProcessingStep(i + 1), delay)
    );

    let cancelled = false;
    fetch("/api/payment/execute", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ txId: txIdRef.current, usdTotal: TOTAL_USD }),
    })
      .then((r) => r.json())
      .then((data: { success?: boolean; payTxHash?: string; error?: string }) => {
        if (cancelled) return;
        if (!data.success) {
          timers.forEach(clearTimeout);
          setState("failure");
          return;
        }
        if (data.payTxHash) setPayTxHash(data.payTxHash);
        setTimeout(() => { if (!cancelled) setState("success"); }, 4500);
      })
      .catch(() => {
        if (cancelled) return;
        timers.forEach(clearTimeout);
        setState("failure");
      });

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, [state]);


  return (
    <div className={styles.page}>
      <div className={styles.merchantName}>
        <p className={styles.merchant}>FARFETCH</p>
        <p className={styles.poweredBy}>
          powered by <Image src="/troy-logo.png" alt="TROY" width={48} height={20} className={styles.troyInline} />
        </p>
      </div>

      <div className={styles.card}>
        {/* ── Card entry ── */}
        {state === "card" && (
          <form onSubmit={handlePay}>
            <div className={styles.amountBlock}>
              <p className={styles.amountLabel}>Ödenecek Tutar / Amount to be paid</p>
              <p className={styles.amountTRY}>{formatTRY(TRY_AMOUNT)} TRY</p>
              <p className={styles.amountUSD}>≈ USD {TOTAL_USD.toLocaleString("en-US", { minimumFractionDigits: 2 })}</p>
            </div>

            <div className={styles.divider} />

            <div className={styles.field}>
              <label className={styles.label}>Kart Numarası / Card Number</label>
              <div className={styles.cardInputWrap}>
                <input
                  className={styles.cardInput}
                  placeholder="0000  0000  0000  0000"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                  maxLength={19}
                  required
                  autoComplete="cc-number"
                />
                {getBinBadge() === "TROY"
                  ? <Image src="/troy-logo.png" alt="TROY" width={40} height={16} className={styles.cardBadge} />
                  : <span className={styles.cardBadge}>{getBinBadge()}</span>
                }
              </div>
            </div>

            <div className={styles.row2}>
              <div className={styles.field}>
                <label className={styles.label}>Son Kullanma / Expiry</label>
                <input
                  className={styles.input}
                  placeholder="AA / YY"
                  value={expiry}
                  onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                  maxLength={5}
                  required
                  autoComplete="cc-exp"
                />
              </div>
              <div className={styles.field}>
                <label className={styles.label}>CVV / CVC</label>
                <input
                  className={styles.input}
                  placeholder="•••"
                  type="password"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 4))}
                  required
                  autoComplete="cc-csc"
                />
              </div>
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Kart Üzerindeki Ad / Name on Card</label>
              <input
                className={styles.input}
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                autoComplete="cc-name"
              />
            </div>

            <button type="submit" className={styles.payBtn}>
              Ödeme Yap / Pay<br />
              <span className={styles.payAmount}>{formatTRY(TRY_AMOUNT)} TRY</span>
            </button>

            <p className={styles.secureNote}>
              <Lock size={12} /> Güvenli ödeme — Troy × x402
            </p>
            <button
              type="button"
              className={styles.cancelLink}
              onClick={() => router.push("/checkout")}
            >
              İptal et / Cancel
            </button>
          </form>
        )}

        {/* ── OTP ── */}
        {state === "otp" && (
          <div className={styles.otpWrap}>
            <p className={styles.otpTitle}>🔐 SMS Doğrulama / SMS Verification</p>
            <p className={styles.otpDesc}>
              Kartınıza bağlı telefon numarasına bir doğrulama kodu gönderdik.<br />
              We sent a verification code to the phone number linked to your card.
            </p>
            <p className={styles.maskedPhone}>+90 538 *** ** 67</p>
            <input
              className={styles.otpInput}
              placeholder="_ _ _ _ _ _"
              value={otp}
              maxLength={6}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
              autoFocus
            />
            <p className={styles.resend}>
              Kodu tekrar gönder / Resend code{" "}
              <span className={styles.otpTimer}>
                ({Math.floor(otpCountdown / 60)}:{String(otpCountdown % 60).padStart(2, "0")})
              </span>
            </p>
            <button className={styles.payBtn} onClick={() => setState("processing")}>
              Doğrula / Verify
            </button>
            <button className={styles.cancelLink} onClick={() => setState("card")}>
              İptal et / Cancel
            </button>
          </div>
        )}

        {/* ── Processing ── */}
        {state === "processing" && (
          <div className={styles.processingWrap}>
            <Spinner size={48} />
            <p className={styles.processingTitle}>
              İşleminiz işleniyor...<br />Processing your payment...
            </p>
            <div className={styles.stepDivider} />

            <StepRow
              done={processingStep >= 1}
              active={processingStep === 0}
              trLabel="Troy kartınız doğrulandı"
              enLabel="Troy card verified"
            />
            <StepRow
              done={processingStep >= 2}
              active={processingStep === 1}
              trLabel="Döviz kuruna göre çeviriliyor"
              enLabel="Converting TRY to USDC"
            />
            <StepRow
              done={processingStep >= 3}
              active={processingStep === 2}
              trLabel="FARFETCH'e gönderiliyor"
              enLabel="Settling with FARFETCH"
            />

            <p className={styles.dontClose}>
              Lütfen bu sayfayı kapatmayın.<br />Please do not close this page.
            </p>
          </div>
        )}

        {/* ── Success ── */}
        {state === "success" && (
          <div className={styles.resultWrap}>
            <div className={`${styles.circle} ${styles.circleSuccess}`}>✓</div>
            <p className={styles.resultTitle}>Ödeme Başarılı! / Payment Successful</p>
            <p className={styles.resultAmount}>{formatTRY(TRY_AMOUNT)} TRY</p>
            <p className={styles.resultAmountUSD}>≈ USD {TOTAL_USD.toLocaleString("en-US", { minimumFractionDigits: 2 })}</p>
            <div className={styles.stepDivider} />
            <p className={styles.resultDesc}>
              Siparişiniz onaylandı.<br />Your order has been confirmed.<br />
              A confirmation email has been sent.
            </p>
            {payTxHash && (
              <p className={styles.txHash}>
                Tx: <span>{payTxHash.slice(0, 10)}…{payTxHash.slice(-8)}</span>
                <button
                  className={styles.copyBtn}
                  onClick={() => {
                    if (navigator.clipboard) {
                      navigator.clipboard.writeText(payTxHash);
                    } else {
                      const el = document.createElement("textarea");
                      el.value = payTxHash;
                      document.body.appendChild(el);
                      el.select();
                      document.execCommand("copy");
                      document.body.removeChild(el);
                    }
                  }}
                  title="Copy full tx hash"
                >
                  <Copy size={13} />
                </button>
              </p>
            )}
            <button className={styles.payBtn} onClick={() => router.push("/")}>
              FARFETCH&apos;e Dön / Return to FARFETCH
            </button>
          </div>
        )}

        {/* ── Failure ── */}
        {state === "failure" && (
          <div className={styles.resultWrap}>
            <div className={`${styles.circle} ${styles.circleFailure}`}>✕</div>
            <p className={styles.resultTitle}>
              Ödeme Tamamlanamadı<br />Payment Could Not Be Completed
            </p>
            <div className={styles.stepDivider} />
            <p className={styles.resultDesc}>
              İşleminiz tamamlanamadı. Tutarınız iade edilecektir.<br />
              Your payment could not be processed. Any charge will be refunded.
            </p>
            <button className={styles.payBtn} onClick={() => setState("card")}>
              Tekrar Dene / Retry
            </button>
            <button className={styles.cancelLink} onClick={() => router.push("/checkout")}>
              FARFETCH&apos;e Dön / Return
            </button>
          </div>
        )}

        {/* ── Refund in progress ── */}
        {state === "refund" && (
          <div className={styles.resultWrap}>
            <div className={`${styles.circle} ${styles.circleRefund}`}>↩</div>
            <p className={styles.resultTitle}>
              İade İşleniyor<br />Refund In Progress
            </p>
            <div className={styles.stepDivider} />
            <p className={styles.resultDesc}>
              Ödemeniz iade ediliyor. Tutarınız kartınıza en geç 3–5 iş günü içinde yansıyacaktır.<br /><br />
              Your payment is being refunded. The amount will appear on your card within 3–5 business days.
            </p>
            <button className={styles.payBtn} onClick={() => router.push("/")}>
              FARFETCH&apos;e Dön / Return
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function StepRow({
  done,
  active,
  trLabel,
  enLabel,
}: {
  done: boolean;
  active: boolean;
  trLabel: string;
  enLabel: string;
}) {
  return (
    <div className={styles.stepRow}>
      <span
        className={`${styles.stepIcon} ${done ? styles.stepDone : ""} ${active && !done ? styles.stepActive : ""}`}
      >
        {done ? "✓" : "○"}
      </span>
      <div>
        <p className={`${styles.stepLabel} ${done ? styles.stepLabelDone : ""} ${active && !done ? styles.stepLabelActive : ""}`}>
          {trLabel}
        </p>
        <p className={styles.stepLabelEn}>{enLabel}</p>
      </div>
    </div>
  );
}

export default function TroyGatewayPage() {
  return (
    <Suspense>
      <TroyGateway />
    </Suspense>
  );
}
