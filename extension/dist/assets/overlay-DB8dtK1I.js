import { r as reactExports, j as jsxRuntimeExports, c as clientExports } from "./client-BzjKTWx6.js";
/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const toKebabCase = (string) => string.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
const mergeClasses = (...classes) => classes.filter((className, index, array) => {
  return Boolean(className) && className.trim() !== "" && array.indexOf(className) === index;
}).join(" ").trim();
/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var defaultAttributes = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Icon = reactExports.forwardRef(
  ({
    color = "currentColor",
    size = 24,
    strokeWidth = 2,
    absoluteStrokeWidth,
    className = "",
    children,
    iconNode,
    ...rest
  }, ref) => {
    return reactExports.createElement(
      "svg",
      {
        ref,
        ...defaultAttributes,
        width: size,
        height: size,
        stroke: color,
        strokeWidth: absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size) : strokeWidth,
        className: mergeClasses("lucide", className),
        ...rest
      },
      [
        ...iconNode.map(([tag, attrs]) => reactExports.createElement(tag, attrs)),
        ...Array.isArray(children) ? children : [children]
      ]
    );
  }
);
/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const createLucideIcon = (iconName, iconNode) => {
  const Component = reactExports.forwardRef(
    ({ className, ...props }, ref) => reactExports.createElement(Icon, {
      ref,
      iconNode,
      className: mergeClasses(`lucide-${toKebabCase(iconName)}`, className),
      ...props
    })
  );
  Component.displayName = `${iconName}`;
  return Component;
};
/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["rect", { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2", key: "17jyea" }],
  ["path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2", key: "zix9uf" }]
];
const Copy = createLucideIcon("Copy", __iconNode$1);
/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["rect", { width: "18", height: "11", x: "3", y: "11", rx: "2", ry: "2", key: "1w4ew1" }],
  ["path", { d: "M7 11V7a5 5 0 0 1 10 0v4", key: "fwvmzm" }]
];
const Lock = createLucideIcon("Lock", __iconNode);
const spinner = "_spinner_1wvju_1";
const styles$1 = {
  spinner
};
function Spinner({ size = 40 }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: styles$1.spinner,
      style: { width: size, height: size },
      role: "status",
      "aria-label": "Loading"
    }
  );
}
const page = "_page_1tc90_1";
const merchantName = "_merchantName_1tc90_12";
const merchant = "_merchant_1tc90_12";
const poweredBy = "_poweredBy_1tc90_24";
const troyInline = "_troyInline_1tc90_33";
const card = "_card_1tc90_39";
const amountBlock = "_amountBlock_1tc90_48";
const amountLabel = "_amountLabel_1tc90_53";
const amountTRY = "_amountTRY_1tc90_59";
const amountUSD = "_amountUSD_1tc90_67";
const divider = "_divider_1tc90_72";
const field = "_field_1tc90_79";
const label = "_label_1tc90_86";
const input = "_input_1tc90_93";
const cardInputWrap = "_cardInputWrap_1tc90_113";
const cardInput = "_cardInput_1tc90_113";
const cardBadge = "_cardBadge_1tc90_141";
const row2 = "_row2_1tc90_149";
const payBtn = "_payBtn_1tc90_156";
const payAmount = "_payAmount_1tc90_178";
const secureNote = "_secureNote_1tc90_182";
const cancelLink = "_cancelLink_1tc90_192";
const otpWrap = "_otpWrap_1tc90_210";
const otpTitle = "_otpTitle_1tc90_218";
const otpDesc = "_otpDesc_1tc90_223";
const maskedPhone = "_maskedPhone_1tc90_229";
const otpInput = "_otpInput_1tc90_235";
const resend = "_resend_1tc90_252";
const otpTimer = "_otpTimer_1tc90_257";
const processingWrap = "_processingWrap_1tc90_263";
const processingTitle = "_processingTitle_1tc90_271";
const stepDivider = "_stepDivider_1tc90_277";
const stepRow = "_stepRow_1tc90_284";
const stepIcon = "_stepIcon_1tc90_292";
const stepDone = "_stepDone_1tc90_300";
const stepActive = "_stepActive_1tc90_304";
const stepLabel = "_stepLabel_1tc90_314";
const stepLabelDone = "_stepLabelDone_1tc90_319";
const stepLabelActive = "_stepLabelActive_1tc90_323";
const stepLabelEn = "_stepLabelEn_1tc90_328";
const dontClose = "_dontClose_1tc90_333";
const resultWrap = "_resultWrap_1tc90_340";
const circle = "_circle_1tc90_348";
const circleSuccess = "_circleSuccess_1tc90_359";
const circleFailure = "_circleFailure_1tc90_363";
const resultTitle = "_resultTitle_1tc90_371";
const resultAmount = "_resultAmount_1tc90_378";
const resultAmountUSD = "_resultAmountUSD_1tc90_383";
const resultDesc = "_resultDesc_1tc90_389";
const txHash = "_txHash_1tc90_395";
const copyBtn = "_copyBtn_1tc90_407";
const redirectNote = "_redirectNote_1tc90_420";
const introWrap = "_introWrap_1tc90_427";
const introBadge = "_introBadge_1tc90_433";
const introHeadline = "_introHeadline_1tc90_444";
const introSub = "_introSub_1tc90_451";
const introAmount = "_introAmount_1tc90_457";
const introAmountLabel = "_introAmountLabel_1tc90_465";
const introAmountValue = "_introAmountValue_1tc90_472";
const introAmountUsd = "_introAmountUsd_1tc90_478";
const introRateNote = "_introRateNote_1tc90_483";
const introSteps = "_introSteps_1tc90_488";
const introStep = "_introStep_1tc90_488";
const introStepNum = "_introStepNum_1tc90_502";
const amountEntry = "_amountEntry_1tc90_529";
const amountEntryLabel = "_amountEntryLabel_1tc90_533";
const amountEntryInput = "_amountEntryInput_1tc90_539";
const styles = {
  page,
  merchantName,
  merchant,
  poweredBy,
  troyInline,
  card,
  amountBlock,
  amountLabel,
  amountTRY,
  amountUSD,
  divider,
  field,
  label,
  input,
  cardInputWrap,
  cardInput,
  cardBadge,
  row2,
  payBtn,
  payAmount,
  secureNote,
  cancelLink,
  otpWrap,
  otpTitle,
  otpDesc,
  maskedPhone,
  otpInput,
  resend,
  otpTimer,
  processingWrap,
  processingTitle,
  stepDivider,
  stepRow,
  stepIcon,
  stepDone,
  stepActive,
  stepLabel,
  stepLabelDone,
  stepLabelActive,
  stepLabelEn,
  dontClose,
  resultWrap,
  circle,
  circleSuccess,
  circleFailure,
  resultTitle,
  resultAmount,
  resultAmountUSD,
  resultDesc,
  txHash,
  copyBtn,
  redirectNote,
  introWrap,
  introBadge,
  introHeadline,
  introSub,
  introAmount,
  introAmountLabel,
  introAmountValue,
  introAmountUsd,
  introRateNote,
  introSteps,
  introStep,
  introStepNum,
  amountEntry,
  amountEntryLabel,
  amountEntryInput
};
function StepRow({
  done,
  active,
  trLabel,
  enLabel
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles.stepRow, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "span",
      {
        className: `${styles.stepIcon} ${done ? styles.stepDone : ""} ${active && !done ? styles.stepActive : ""}`,
        children: done ? "✓" : "○"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "p",
        {
          className: `${styles.stepLabel} ${done ? styles.stepLabelDone : ""} ${active && !done ? styles.stepLabelActive : ""}`,
          children: trLabel
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: styles.stepLabelEn, children: enLabel })
    ] })
  ] });
}
const tryFormatter = new Intl.NumberFormat("tr-TR", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
});
function formatTRY(amount) {
  return tryFormatter.format(amount);
}
function usdToTRY(usd, rate) {
  return usd * rate;
}
function TroyGateway({ usdTotal, merchantName: merchantName2, onClose }) {
  const [state, setState] = reactExports.useState("intro");
  const [resolvedUsd, setResolvedUsd] = reactExports.useState(usdTotal);
  const [tryRate, setTryRate] = reactExports.useState(null);
  const [cardNumber, setCardNumber] = reactExports.useState("");
  const [expiry, setExpiry] = reactExports.useState("");
  const [cvv, setCvv] = reactExports.useState("");
  const [name, setName] = reactExports.useState("");
  const [otp, setOtp] = reactExports.useState("");
  const [otpCountdown, setOtpCountdown] = reactExports.useState(60);
  const [processingStep, setProcessingStep] = reactExports.useState(0);
  const [payTxHash, setPayTxHash] = reactExports.useState(null);
  const [copied, setCopied] = reactExports.useState(false);
  const [redirectCountdown, setRedirectCountdown] = reactExports.useState(5);
  const [errorMsg, setErrorMsg] = reactExports.useState(null);
  const txIdRef = reactExports.useRef(`TXN-${Date.now()}`);
  reactExports.useEffect(() => {
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
    }, 1e3);
    return () => clearInterval(t);
  }, [state]);
  reactExports.useEffect(() => {
    chrome.runtime.sendMessage({ type: "TROY_RATE_REQUEST" }, (resp) => {
      if (resp == null ? void 0 : resp.tryPerUsd) setTryRate(resp.tryPerUsd);
    });
  }, []);
  const effectiveRate = tryRate ?? 38.5;
  const tryAmount = usdToTRY(resolvedUsd, effectiveRate);
  function getBinBadge() {
    const first = cardNumber.replace(/\s/g, "")[0] ?? "";
    if (first === "9") return "TROY";
    if (first === "4") return "VISA";
    if (first === "5") return "MC";
    if (first === "3") return "AMEX";
    return "TROY";
  }
  function formatCardNumber(val) {
    return val.replace(/\D/g, "").slice(0, 16).replace(/(\d{4})(?=\d)/g, "$1 ");
  }
  function formatExpiry(val) {
    const digits = val.replace(/\D/g, "").slice(0, 4);
    if (digits.length <= 2) return digits;
    return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  }
  function handlePay(e) {
    e.preventDefault();
    setState("otp");
  }
  reactExports.useEffect(() => {
    if (state !== "otp") return;
    const t = setInterval(() => setOtpCountdown((c) => Math.max(0, c - 1)), 1e3);
    return () => clearInterval(t);
  }, [state]);
  reactExports.useEffect(() => {
    if (state === "otp" && otp.length === 6) {
      setState("processing");
    }
  }, [otp, state]);
  reactExports.useEffect(() => {
    if (state !== "processing") return;
    const steps = [800, 1800, 3200];
    const timers = steps.map(
      (delay, i) => setTimeout(() => setProcessingStep(i + 1), delay)
    );
    let cancelled = false;
    chrome.runtime.sendMessage(
      { type: "TROY_PAY_REQUEST", txId: txIdRef.current, usdTotal: resolvedUsd },
      (data) => {
        if (cancelled) return;
        if (!(data == null ? void 0 : data.success)) {
          timers.forEach(clearTimeout);
          setErrorMsg((data == null ? void 0 : data.error) ?? "Payment failed");
          setState("failure");
          return;
        }
        if (data.payTxHash) setPayTxHash(data.payTxHash);
        setTimeout(() => {
          if (!cancelled) setState("success");
        }, 4500);
      }
    );
    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, [state, resolvedUsd]);
  const troyLogoUrl = chrome.runtime.getURL("troy-logo.png");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles.page, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles.merchantName, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: styles.merchant, children: merchantName2.toUpperCase() }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: styles.poweredBy, children: [
        "powered by",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: troyLogoUrl, alt: "TROY", width: 48, height: 20, className: styles.troyInline })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles.card, children: [
      state === "intro" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles.introWrap, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles.introBadge, children: "TROY × TroyLayer" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: styles.introHeadline, children: "Pay this order in Turkish Lira" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: styles.introSub, children: [
          "Skip the crypto step. Use your Troy card to pay in TRY — we convert and settle with ",
          merchantName2,
          " in USDC instantly, on Base."
        ] }),
        resolvedUsd > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles.introAmount, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: styles.introAmountLabel, children: "Order total" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: styles.introAmountValue, children: [
            formatTRY(usdToTRY(resolvedUsd, effectiveRate)),
            " TRY"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: styles.introAmountUsd, children: [
            "≈ ",
            resolvedUsd.toLocaleString("en-US", { style: "currency", currency: "USD" })
          ] }),
          tryRate === null && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: styles.introRateNote, children: "Fetching live rate…" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles.introSteps, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles.introStep, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: styles.introStepNum, children: "1" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Enter your Troy card" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Card number, expiry, CVV and name — same as any online purchase." })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles.introStep, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: styles.introStepNum, children: "2" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Verify with SMS OTP" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "A 6-digit code is sent to the phone linked to your Troy card." })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles.introStep, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: styles.introStepNum, children: "3" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Done — no crypto needed" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                "TroyLayer converts TRY to USDC on Base and settles with ",
                merchantName2,
                " in seconds."
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: styles.payBtn, onClick: () => setState("card"), children: "Pay with Troy Card →" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: styles.cancelLink, onClick: onClose, children: "Continue with crypto / İptal" })
      ] }),
      state === "card" && /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handlePay, children: [
        resolvedUsd === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles.amountEntry, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: styles.amountEntryLabel, children: "Enter order total (USD)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              className: styles.amountEntryInput,
              type: "number",
              min: "0.01",
              step: "0.01",
              placeholder: "0.00",
              value: resolvedUsd || "",
              onChange: (e) => setResolvedUsd(Number(e.target.value)),
              required: true
            }
          )
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles.amountBlock, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: styles.amountLabel, children: "Ödenecek Tutar / Amount to be paid" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: styles.amountTRY, children: [
            formatTRY(tryAmount),
            " TRY"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: styles.amountUSD, children: [
            "≈ USD ",
            resolvedUsd.toLocaleString("en-US", { minimumFractionDigits: 2 })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles.divider }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles.field, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: styles.label, children: "Kart Numarası / Card Number" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles.cardInputWrap, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                className: styles.cardInput,
                placeholder: "0000  0000  0000  0000",
                value: cardNumber,
                onChange: (e) => setCardNumber(formatCardNumber(e.target.value)),
                maxLength: 19,
                required: true,
                autoComplete: "cc-number"
              }
            ),
            getBinBadge() === "TROY" ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: troyLogoUrl, alt: "TROY", width: 40, height: 16, className: styles.cardBadge }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: styles.cardBadge, children: getBinBadge() })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles.row2, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles.field, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: styles.label, children: "Son Kullanma / Expiry" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                className: styles.input,
                placeholder: "AA / YY",
                value: expiry,
                onChange: (e) => setExpiry(formatExpiry(e.target.value)),
                maxLength: 5,
                required: true,
                autoComplete: "cc-exp"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles.field, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: styles.label, children: "CVV / CVC" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                className: styles.input,
                placeholder: "•••",
                type: "password",
                value: cvv,
                onChange: (e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 4)),
                required: true,
                autoComplete: "cc-csc"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles.field, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: styles.label, children: "Kart Üzerindeki Ad / Name on Card" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              className: styles.input,
              value: name,
              onChange: (e) => setName(e.target.value),
              required: true,
              autoComplete: "cc-name"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "submit", className: styles.payBtn, disabled: resolvedUsd === 0, children: [
          "Ödeme Yap / Pay",
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: styles.payAmount, children: [
            formatTRY(tryAmount),
            " TRY"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: styles.secureNote, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { size: 12 }),
          " Güvenli ödeme — Troy × TroyLayer"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", className: styles.cancelLink, onClick: onClose, children: "İptal et / Cancel" })
      ] }),
      state === "otp" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles.otpWrap, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: styles.otpTitle, children: "🔐 SMS Doğrulama / SMS Verification" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: styles.otpDesc, children: [
          "Kartınıza bağlı telefon numarasına bir doğrulama kodu gönderdik.",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          "We sent a verification code to the phone number linked to your card."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: styles.maskedPhone, children: "+90 538 *** ** 67" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            className: styles.otpInput,
            placeholder: "_ _ _ _ _ _",
            value: otp,
            maxLength: 6,
            onChange: (e) => setOtp(e.target.value.replace(/\D/g, "")),
            autoFocus: true
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: styles.resend, children: [
          "Kodu tekrar gönder / Resend code",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: styles.otpTimer, children: [
            "(",
            Math.floor(otpCountdown / 60),
            ":",
            String(otpCountdown % 60).padStart(2, "0"),
            ")"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: styles.payBtn, onClick: () => setState("processing"), children: "Doğrula / Verify" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: styles.cancelLink, onClick: () => setState("card"), children: "İptal et / Cancel" })
      ] }),
      state === "processing" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles.processingWrap, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Spinner, { size: 48 }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: styles.processingTitle, children: [
          "İşleminiz işleniyor...",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          "Processing your payment..."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles.stepDivider }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          StepRow,
          {
            done: processingStep >= 1,
            active: processingStep === 0,
            trLabel: "Troy kartınız doğrulandı",
            enLabel: "Troy card verified"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          StepRow,
          {
            done: processingStep >= 2,
            active: processingStep === 1,
            trLabel: "Döviz kuruna göre çeviriliyor",
            enLabel: "Converting TRY to USDC"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          StepRow,
          {
            done: processingStep >= 3,
            active: processingStep === 2,
            trLabel: "Satıcıya gönderiliyor",
            enLabel: `Settling with ${merchantName2}`
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: styles.dontClose, children: [
          "Lütfen bu sayfayı kapatmayın.",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          "Please do not close this page."
        ] })
      ] }),
      state === "success" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles.resultWrap, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `${styles.circle} ${styles.circleSuccess}`, children: "✓" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: styles.resultTitle, children: "Ödeme Başarılı! / Payment Successful" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: styles.resultAmount, children: [
          formatTRY(tryAmount),
          " TRY"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: styles.resultAmountUSD, children: [
          "≈ USD ",
          resolvedUsd.toLocaleString("en-US", { minimumFractionDigits: 2 })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles.stepDivider }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: styles.resultDesc, children: [
          "Siparişiniz onaylandı.",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          "Your order has been confirmed."
        ] }),
        payTxHash && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: styles.txHash, children: [
          "Tx: ",
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            payTxHash.slice(0, 10),
            "…",
            payTxHash.slice(-8)
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              className: styles.copyBtn,
              onClick: async () => {
                try {
                  await navigator.clipboard.writeText(payTxHash);
                } catch {
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
                setTimeout(() => setCopied(false), 2e3);
              },
              title: "Copy full tx hash",
              children: copied ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: "1.1rem", color: "var(--success)" }, children: "✓" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { size: 13 })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: styles.redirectNote, children: [
          "Returning to home in ",
          redirectCountdown,
          "s…"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: styles.cancelLink, onClick: () => window.parent.postMessage({ type: "TROY_NAVIGATE_HOME" }, "*"), children: "Go now →" })
      ] }),
      state === "failure" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles.resultWrap, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `${styles.circle} ${styles.circleFailure}`, children: "✕" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: styles.resultTitle, children: [
          "Ödeme Tamamlanamadı",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          "Payment Could Not Be Completed"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles.stepDivider }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: styles.resultDesc, children: [
          "İşleminiz tamamlanamadı. Tutarınız iade edilecektir.",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          "Your payment could not be processed. Any charge will be refunded.",
          errorMsg && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: "1.1rem", color: "var(--error)" }, children: errorMsg })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: styles.payBtn, onClick: () => {
          setErrorMsg(null);
          setState("card");
        }, children: "Tekrar Dene / Retry" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: styles.cancelLink, onClick: onClose, children: "İptal et / Cancel" })
      ] })
    ] })
  ] });
}
function App() {
  const params = new URLSearchParams(window.location.search);
  const usdTotal = Number(params.get("usdTotal") ?? "0");
  const merchantName2 = params.get("merchantName") ?? "Merchant";
  function handleClose() {
    window.parent.postMessage({ type: "TROY_CLOSE" }, "*");
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    TroyGateway,
    {
      usdTotal,
      merchantName: merchantName2,
      onClose: handleClose
    }
  );
}
const root = document.getElementById("root");
if (root) {
  clientExports.createRoot(root).render(
    /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.StrictMode, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(App, {}) })
  );
}
//# sourceMappingURL=overlay-DB8dtK1I.js.map
