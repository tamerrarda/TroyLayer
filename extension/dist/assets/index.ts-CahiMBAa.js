(function(){const CRYPTO_PATTERN = /pay\s+with\s+crypto|pay\s+in\s+crypto|\bcryptocurrency\b|pay\s+with\s+bitcoin|pay\s+with\s+eth(ereum)?|pay\s+with\s+usdc|pay\s+with\s+wallet|metamask|walletconnect|coinbase\s+pay|connect\s+wallet/i;
const CHECKOUT_URL_PATTERN = /checkout|payment|pay|cart|basket|order/i;
const CRYPTO_PROCESSOR_DOMAINS = [
  /triple-a\.io/,
  /coinbase\.com\/pay/,
  /transak\.com/,
  /moonpay\.com/,
  /ramp\.network/,
  /wyre\.com/,
  /nowpayments\.io/,
  /bitpay\.com/,
  /crypto\.com\/pay/,
  /metamask\.io/
];
const KNOWN_PROVIDER_PATTERNS = [
  /walletconnect/i,
  /coinbase.*pay/i,
  /transak\.com/i,
  /moonpay\.com/i,
  /ramp\.network/i,
  /nowpayments\.io/i,
  /bitpay\.com/i
];
function isOnCheckoutPage() {
  return CHECKOUT_URL_PATTERN.test(window.location.pathname + window.location.search);
}
function isOnProcessorPage() {
  const full = window.location.hostname + window.location.pathname;
  if (CRYPTO_PROCESSOR_DOMAINS.some((p) => p.test(full))) return true;
  return /\/payment\/crypto/.test(window.location.pathname);
}
function hasCryptoText() {
  if (isOnProcessorPage()) return false;
  if (!isOnCheckoutPage()) return false;
  const candidates = document.querySelectorAll(
    "button, a, label, [role='button'], [role='radio'], [role='option'], [type='submit']"
  );
  for (const el of candidates) {
    const text = el.textContent ?? "";
    if (CRYPTO_PATTERN.test(text)) return true;
    const ariaLabel = el.getAttribute("aria-label") ?? "";
    if (CRYPTO_PATTERN.test(ariaLabel)) return true;
  }
  return false;
}
function hasEthereumOnCheckout() {
  if (isOnProcessorPage()) return false;
  if (!("ethereum" in window)) return false;
  return isOnCheckoutPage();
}
function hasKnownProviderAssets() {
  if (isOnProcessorPage()) return false;
  const scripts = document.querySelectorAll("script[src]");
  for (const s of scripts) {
    if (KNOWN_PROVIDER_PATTERNS.some((p) => p.test(s.src))) return true;
  }
  const iframes = document.querySelectorAll("iframe[src]");
  for (const f of iframes) {
    if (KNOWN_PROVIDER_PATTERNS.some((p) => p.test(f.src))) return true;
  }
  return false;
}
function detectPageAmount() {
  const TOTAL_LABEL = /total|subtotal|order total|grand total|amount (to be paid|due)/i;
  const ANY_AMOUNT = /(?:\$|£|€|USD|GBP|EUR)\s*([\d,]+(?:\.\d{1,2})?)|(\d{1,6}(?:\.\d{1,2})?)\s*(?:USD|GBP|EUR)/g;
  let best = 0;
  const elements = document.querySelectorAll(
    "td, th, span, p, div, strong, b"
  );
  for (const el of elements) {
    const text = el.textContent ?? "";
    if (TOTAL_LABEL.test(text)) {
      const parent = el.parentElement;
      if (!parent) continue;
      const parentText = parent.textContent ?? "";
      ANY_AMOUNT.lastIndex = 0;
      let match;
      while ((match = ANY_AMOUNT.exec(parentText)) !== null) {
        const raw = match[1] ?? match[2];
        if (!raw) continue;
        const val = parseFloat(raw.replace(/,/g, ""));
        if (val > best && val < 99999) best = val;
      }
    }
  }
  if (best === 0) {
    const bodyText = document.body.innerText ?? "";
    ANY_AMOUNT.lastIndex = 0;
    let match;
    while ((match = ANY_AMOUNT.exec(bodyText)) !== null) {
      const raw = match[1] ?? match[2];
      if (!raw) continue;
      const val = parseFloat(raw.replace(/,/g, ""));
      if (val > best && val < 99999) best = val;
    }
  }
  return Math.round(best * 100) / 100;
}
function detectMerchantName() {
  const ogSite = document.querySelector('meta[property="og:site_name"]');
  if (ogSite == null ? void 0 : ogSite.content) return ogSite.content;
  const title = document.title.split(/[|\-–]/)[0].trim();
  if (title) return title;
  return window.location.hostname.replace(/^www\./, "");
}
const BANNER_ID = "troy-extension-banner";
function injectBanner() {
  if (document.getElementById(BANNER_ID)) return;
  const logoUrl = chrome.runtime.getURL("troy-logo.png");
  const banner = document.createElement("div");
  banner.id = BANNER_ID;
  banner.style.cssText = [
    "position: fixed",
    "bottom: 0",
    "left: 0",
    "right: 0",
    "padding: 0 20px",
    "height: 52px",
    "background: #c8102e",
    "color: white",
    "display: flex",
    "align-items: center",
    "justify-content: center",
    "gap: 10px",
    "font-family: -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Arial, sans-serif",
    "font-size: 13px",
    "font-weight: 400",
    "z-index: 2147483645",
    "cursor: default",
    "box-shadow: 0 -2px 12px rgba(0,0,0,0.2)",
    "letter-spacing: 0.02em"
  ].join(";");
  banner.innerHTML = `
    <img src="${logoUrl}" height="18" alt="Troy" style="display:block;flex-shrink:0" />
    <span style="pointer-events:none">
      <strong style="font-weight:600">Troy Card (TRY) available</strong>
      &nbsp;&mdash;&nbsp;Select the cryptocurrency option above and proceed. TroyLayer will take over.
    </span>
    <button id="troy-banner-close" style="
      position:absolute;right:16px;top:50%;transform:translateY(-50%);
      background:none;border:none;color:white;font-size:20px;cursor:pointer;
      line-height:1;padding:4px 8px;opacity:0.8
    " title="Dismiss">&#x2715;</button>
  `;
  banner.addEventListener("click", (e) => {
    if (e.target.id === "troy-banner-close") {
      banner.remove();
    }
  });
  document.body.appendChild(banner);
}
function removeBanner() {
  var _a;
  (_a = document.getElementById(BANNER_ID)) == null ? void 0 : _a.remove();
}
const BACKDROP_ID = "troy-overlay-backdrop";
const FRAME_ID = "troy-overlay-frame";
let overlayFrame = null;
let messageListener = null;
function openOverlay(usdTotal, merchantName) {
  if (document.getElementById(FRAME_ID)) return;
  const backdrop = document.createElement("div");
  backdrop.id = BACKDROP_ID;
  backdrop.style.cssText = [
    "position:fixed",
    "inset:0",
    "z-index:2147483646",
    "background:rgba(34,34,34,0.5)"
  ].join(";");
  backdrop.addEventListener("click", closeOverlay);
  const params = new URLSearchParams({
    usdTotal: String(usdTotal),
    merchantName
  });
  overlayFrame = document.createElement("iframe");
  overlayFrame.id = FRAME_ID;
  overlayFrame.src = chrome.runtime.getURL(`src/overlay/index.html?${params}`);
  overlayFrame.style.cssText = [
    "position:fixed",
    "top:50%",
    "left:50%",
    "transform:translate(-50%,-50%)",
    "width:560px",
    "height:90vh",
    "max-height:800px",
    "border:none",
    "z-index:2147483647",
    "background:transparent"
  ].join(";");
  overlayFrame.addEventListener("error", () => {
    closeOverlay();
    chrome.runtime.sendMessage({ type: "TROY_OPEN_TAB", params: params.toString() });
  });
  document.body.appendChild(backdrop);
  document.body.appendChild(overlayFrame);
  messageListener = (e) => {
    if (!e.data || typeof e.data !== "object") return;
    if (e.data.type === "TROY_CLOSE") {
      closeOverlay();
      return;
    }
    if (e.data.type === "TROY_NAVIGATE_HOME") {
      closeOverlay();
      window.location.href = "/";
      return;
    }
    if (e.data.type === "TROY_PAY_REQUEST") {
      chrome.runtime.sendMessage(
        { type: "TROY_PAY_REQUEST", txId: e.data.txId, usdTotal: e.data.usdTotal },
        (result) => {
          var _a;
          (_a = overlayFrame == null ? void 0 : overlayFrame.contentWindow) == null ? void 0 : _a.postMessage(
            { type: "TROY_PAY_RESULT", ...result },
            "*"
          );
        }
      );
    }
  };
  window.addEventListener("message", messageListener);
}
function closeOverlay() {
  var _a, _b;
  (_a = document.getElementById(BACKDROP_ID)) == null ? void 0 : _a.remove();
  (_b = document.getElementById(FRAME_ID)) == null ? void 0 : _b.remove();
  overlayFrame = null;
  if (messageListener) {
    window.removeEventListener("message", messageListener);
    messageListener = null;
  }
}
let detected = false;
function debounce(fn, ms) {
  let timer;
  return () => {
    clearTimeout(timer);
    timer = setTimeout(fn, ms);
  };
}
function runDetection() {
  if (detected) return;
  if (isOnProcessorPage()) {
    detected = true;
    openOverlay(detectPageAmount(), detectMerchantName());
    return;
  }
  if (hasCryptoText() || hasEthereumOnCheckout() || hasKnownProviderAssets()) {
    detected = true;
    injectBanner();
  }
}
runDetection();
let currentHref = location.href;
function onUrlChange() {
  if (location.href !== currentHref) {
    currentHref = location.href;
    detected = false;
    removeBanner();
    setTimeout(runDetection, 400);
  }
}
const observer = new MutationObserver(debounce(() => {
  onUrlChange();
  runDetection();
}, 400));
observer.observe(document.body, { childList: true, subtree: true });
const _push = history.pushState.bind(history);
const _replace = history.replaceState.bind(history);
history.pushState = function(...args) {
  _push(...args);
  onUrlChange();
};
history.replaceState = function(...args) {
  _replace(...args);
  onUrlChange();
};
window.addEventListener("popstate", onUrlChange);
//# sourceMappingURL=index.ts-CahiMBAa.js.map
})()
