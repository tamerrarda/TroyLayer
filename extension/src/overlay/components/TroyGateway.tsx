import { useState, useEffect, useRef } from "react";
import { Lock, Copy } from "lucide-react";
import Spinner from "./Spinner";
import StepRow from "./StepRow";
import { formatTRY, usdToTRY } from "../lib/format";
import styles from "../styles/gateway.module.css";

interface TroyGatewayProps {
  usdTotal: number;
  merchantName: string;
  onClose: () => void;
}

type GatewayState = "intro" | "card" | "otp" | "processing" | "success" | "failure";

export default function TroyGateway({ usdTotal, merchantName, onClose }: TroyGatewayProps) {
  const [state, setState] = useState<GatewayState>("intro");
  const [resolvedUsd, setResolvedUsd] = useState(usdTotal);
  const [tryRate, setTryRate] = useState<number | null>(null);

  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [name, setName] = useState("");
  const [otp, setOtp] = useState("");
  const [otpCountdown, setOtpCountdown] = useState(60);
  const [processingStep, setProcessingStep] = useState(0);
  const [payTxHash, setPayTxHash] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [redirectCountdown, setRedirectCountdown] = useState(5);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const txIdRef = useRef(`TXN-${Date.now()}`);

  // Auto-redirect home after success
  useEffect(() => {
    if (state !== "success") return;
    setRedirectCountdown(5);
    const t = setInterval(() => {
      setRedirectCountdown((c) => {
        if (c <= 1) {
          clearInterval(t);
          window.parent.postMessage({ type: "TROY_NAVIGATE_HOME" }, "*");
          return 0;
        }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [state]);

  // Fetch live TRY rate from service worker on mount
  useEffect(() => {
    chrome.runtime.sendMessage({ type: "TROY_RATE_REQUEST" }, (resp: { tryPerUsd?: number; error?: string }) => {
      if (resp?.tryPerUsd) setTryRate(resp.tryPerUsd);
    });
  }, []);

  const effectiveRate = tryRate ?? 38.5;
  const tryAmount = usdToTRY(resolvedUsd, effectiveRate);

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

  // OTP countdown
  useEffect(() => {
    if (state !== "otp") return;
    const t = setInterval(() => setOtpCountdown((c) => Math.max(0, c - 1)), 1000);
    return () => clearInterval(t);
  }, [state]);

  // OTP auto-submit
  useEffect(() => {
    if (state === "otp" && otp.length === 6) {
      setState("processing");
    }
  }, [otp, state]);

  // Processing: animate steps + fire payment via service worker
  useEffect(() => {
    if (state !== "processing") return;

    const steps = [800, 1800, 3200];
    const timers = steps.map((delay, i) =>
      setTimeout(() => setProcessingStep(i + 1), delay)
    );

    let cancelled = false;

    chrome.runtime.sendMessage(
      { type: "TROY_PAY_REQUEST", txId: txIdRef.current, usdTotal: resolvedUsd },
      (data: { success?: boolean; payTxHash?: string; error?: string }) => {
        if (cancelled) return;
        if (!data?.success) {
          timers.forEach(clearTimeout);
          setErrorMsg(data?.error ?? "Payment failed");
          setState("failure");
          return;
        }
        if (data.payTxHash) setPayTxHash(data.payTxHash);
        setTimeout(() => { if (!cancelled) setState("success"); }, 4500);
      }
    );

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, [state, resolvedUsd]);

  const troyLogoUrl = chrome.runtime.getURL("troy-logo.png");

  return (
    <div className={styles.page}>
      <div className={styles.merchantName}>
        <p className={styles.merchant}>{merchantName.toUpperCase()}</p>
        <p className={styles.poweredBy}>
          powered by{" "}
          <img src={troyLogoUrl} alt="TROY" width={48} height={20} className={styles.troyInline} />
        </p>
      </div>

      <div className={styles.card}>
        {/* Intro / instructions */}
        {state === "intro" && (
          <div className={styles.introWrap}>
            <div className={styles.introBadge}>TROY × TroyLayer</div>
            <p className={styles.introHeadline}>
              Pay this order in Turkish Lira
            </p>
            <p className={styles.introSub}>
              Skip the crypto step. Use your Troy card to pay in TRY — we convert
              and settle with {merchantName} in USDC instantly, on Base.
            </p>

            {resolvedUsd > 0 && (
              <div className={styles.introAmount}>
                <span className={styles.introAmountLabel}>Order total</span>
                <span className={styles.introAmountValue}>
                  {formatTRY(usdToTRY(resolvedUsd, effectiveRate))} TRY
                </span>
                <span className={styles.introAmountUsd}>
                  ≈ {resolvedUsd.toLocaleString("en-US", { style: "currency", currency: "USD" })}
                </span>
                {tryRate === null && (
                  <span className={styles.introRateNote}>Fetching live rate…</span>
                )}
              </div>
            )}

            <div className={styles.introSteps}>
              <div className={styles.introStep}>
                <span className={styles.introStepNum}>1</span>
                <div>
                  <strong>Enter your Troy card</strong>
                  <p>Card number, expiry, CVV and name — same as any online purchase.</p>
                </div>
              </div>
              <div className={styles.introStep}>
                <span className={styles.introStepNum}>2</span>
                <div>
                  <strong>Verify with SMS OTP</strong>
                  <p>A 6-digit code is sent to the phone linked to your Troy card.</p>
                </div>
              </div>
              <div className={styles.introStep}>
                <span className={styles.introStepNum}>3</span>
                <div>
                  <strong>Done — no crypto needed</strong>
                  <p>TroyLayer converts TRY to USDC on Base and settles with {merchantName} in seconds.</p>
                </div>
              </div>
            </div>

            <button className={styles.payBtn} onClick={() => setState("card")}>
              Pay with Troy Card →
            </button>
            <button className={styles.cancelLink} onClick={onClose}>
              Continue with crypto / İptal
            </button>
          </div>
        )}

        {/* Card entry */}
        {state === "card" && (
          <form onSubmit={handlePay}>
            {resolvedUsd === 0 ? (
              <div className={styles.amountEntry}>
                <p className={styles.amountEntryLabel}>Enter order total (USD)</p>
                <input
                  className={styles.amountEntryInput}
                  type="number"
                  min="0.01"
                  step="0.01"
                  placeholder="0.00"
                  value={resolvedUsd || ""}
                  onChange={(e) => setResolvedUsd(Number(e.target.value))}
                  required
                />
              </div>
            ) : (
              <div className={styles.amountBlock}>
                <p className={styles.amountLabel}>Ödenecek Tutar / Amount to be paid</p>
                <p className={styles.amountTRY}>{formatTRY(tryAmount)} TRY</p>
                <p className={styles.amountUSD}>
                  ≈ USD {resolvedUsd.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                </p>
              </div>
            )}

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
                {getBinBadge() === "TROY" ? (
                  <img src={troyLogoUrl} alt="TROY" width={40} height={16} className={styles.cardBadge} />
                ) : (
                  <span className={styles.cardBadge}>{getBinBadge()}</span>
                )}
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

            <button type="submit" className={styles.payBtn} disabled={resolvedUsd === 0}>
              Ödeme Yap / Pay
              <span className={styles.payAmount}>{formatTRY(tryAmount)} TRY</span>
            </button>

            <p className={styles.secureNote}>
              <Lock size={12} /> Güvenli ödeme — Troy × TroyLayer
            </p>
            <button type="button" className={styles.cancelLink} onClick={onClose}>
              İptal et / Cancel
            </button>
          </form>
        )}

        {/* OTP */}
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

        {/* Processing */}
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
              trLabel="Satıcıya gönderiliyor"
              enLabel={`Settling with ${merchantName}`}
            />
            <p className={styles.dontClose}>
              Lütfen bu sayfayı kapatmayın.<br />Please do not close this page.
            </p>
          </div>
        )}

        {/* Success */}
        {state === "success" && (
          <div className={styles.resultWrap}>
            <div className={`${styles.circle} ${styles.circleSuccess}`}>✓</div>
            <p className={styles.resultTitle}>Ödeme Başarılı! / Payment Successful</p>
            <p className={styles.resultAmount}>{formatTRY(tryAmount)} TRY</p>
            <p className={styles.resultAmountUSD}>
              ≈ USD {resolvedUsd.toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </p>
            <div className={styles.stepDivider} />
            <p className={styles.resultDesc}>
              Siparişiniz onaylandı.<br />Your order has been confirmed.
            </p>
            {payTxHash && (
              <p className={styles.txHash}>
                Tx: <span>{payTxHash.slice(0, 10)}…{payTxHash.slice(-8)}</span>
                <button
                  className={styles.copyBtn}
                  onClick={async () => {
                    try {
                      await navigator.clipboard.writeText(payTxHash);
                    } catch {
                      // fallback for non-secure or focused-document issues
                      const el = document.createElement("textarea");
                      el.value = payTxHash;
                      el.style.cssText = "position:fixed;opacity:0";
                      document.body.appendChild(el);
                      el.focus();
                      el.select();
                      document.execCommand("copy");
                      document.body.removeChild(el);
                    }
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                  }}
                  title="Copy full tx hash"
                >
                  {copied ? <span style={{ fontSize: "1.1rem", color: "var(--success)" }}>✓</span> : <Copy size={13} />}
                </button>
              </p>
            )}
            <p className={styles.redirectNote}>
              Returning to home in {redirectCountdown}s…
            </p>
            <button className={styles.cancelLink} onClick={() => window.parent.postMessage({ type: "TROY_NAVIGATE_HOME" }, "*")}>
              Go now →
            </button>
          </div>
        )}

        {/* Failure */}
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
              {errorMsg && <><br /><span style={{ fontSize: "1.1rem", color: "var(--error)" }}>{errorMsg}</span></>}
            </p>
            <button className={styles.payBtn} onClick={() => { setErrorMsg(null); setState("card"); }}>
              Tekrar Dene / Retry
            </button>
            <button className={styles.cancelLink} onClick={onClose}>
              İptal et / Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
