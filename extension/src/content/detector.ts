// Explicit crypto payment actions or UI — only match when it's an offered choice
const CRYPTO_PATTERN =
  /pay\s+with\s+crypto|pay\s+in\s+crypto|\bcryptocurrency\b|pay\s+with\s+bitcoin|pay\s+with\s+eth(ereum)?|pay\s+with\s+usdc|pay\s+with\s+wallet|metamask|walletconnect|coinbase\s+pay|connect\s+wallet/i;

const CHECKOUT_URL_PATTERN = /checkout|payment|pay|cart|basket|order/i;

// Domains where the user has already committed to crypto — auto-open Troy overlay here
export const CRYPTO_PROCESSOR_DOMAINS = [
  /triple-a\.io/,
  /coinbase\.com\/pay/,
  /transak\.com/,
  /moonpay\.com/,
  /ramp\.network/,
  /wyre\.com/,
  /nowpayments\.io/,
  /bitpay\.com/,
  /crypto\.com\/pay/,
  /metamask\.io/,
];

// Scripts/iframes on merchant checkout pages that indicate crypto is being offered
const KNOWN_PROVIDER_PATTERNS = [
  /walletconnect/i,
  /coinbase.*pay/i,
  /transak\.com/i,
  /moonpay\.com/i,
  /ramp\.network/i,
  /nowpayments\.io/i,
  /bitpay\.com/i,
];

function isOnCheckoutPage(): boolean {
  return CHECKOUT_URL_PATTERN.test(window.location.pathname + window.location.search);
}

export function isOnProcessorPage(): boolean {
  const full = window.location.hostname + window.location.pathname;
  if (CRYPTO_PROCESSOR_DOMAINS.some((p) => p.test(full))) return true;
  // Also catch local mock crypto payment page
  return /\/payment\/crypto/.test(window.location.pathname);
}

export function hasCryptoText(): boolean {
  if (isOnProcessorPage()) return false;
  // Only scan for crypto payment actions on checkout-like pages
  if (!isOnCheckoutPage()) return false;

  // Focus on interactive elements only — buttons, links, payment option labels
  const candidates = document.querySelectorAll<HTMLElement>(
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

export function hasEthereumOnCheckout(): boolean {
  if (isOnProcessorPage()) return false;
  if (!("ethereum" in window)) return false;
  return isOnCheckoutPage();
}

export function hasKnownProviderAssets(): boolean {
  if (isOnProcessorPage()) return false;
  const scripts = document.querySelectorAll<HTMLScriptElement>("script[src]");
  for (const s of scripts) {
    if (KNOWN_PROVIDER_PATTERNS.some((p) => p.test(s.src))) return true;
  }
  const iframes = document.querySelectorAll<HTMLIFrameElement>("iframe[src]");
  for (const f of iframes) {
    if (KNOWN_PROVIDER_PATTERNS.some((p) => p.test(f.src))) return true;
  }
  return false;
}

export function detectPageAmount(): number {
  // Scan for any currency amount near total labels (USD, GBP, EUR, etc.)
  const TOTAL_LABEL = /total|subtotal|order total|grand total|amount (to be paid|due)/i;
  const ANY_AMOUNT = /(?:\$|£|€|USD|GBP|EUR)\s*([\d,]+(?:\.\d{1,2})?)|(\d{1,6}(?:\.\d{1,2})?)\s*(?:USD|GBP|EUR)/g;

  let best = 0;
  const elements = document.querySelectorAll<HTMLElement>(
    "td, th, span, p, div, strong, b"
  );

  for (const el of elements) {
    const text = el.textContent ?? "";
    if (TOTAL_LABEL.test(text)) {
      const parent = el.parentElement;
      if (!parent) continue;
      const parentText = parent.textContent ?? "";
      ANY_AMOUNT.lastIndex = 0;
      let match: RegExpExecArray | null;
      while ((match = ANY_AMOUNT.exec(parentText)) !== null) {
        const raw = match[1] ?? match[2];
        if (!raw) continue;
        const val = parseFloat(raw.replace(/,/g, ""));
        if (val > best && val < 99999) best = val;
      }
    }
  }

  // Fallback: find the largest currency amount on the page
  if (best === 0) {
    const bodyText = document.body.innerText ?? "";
    ANY_AMOUNT.lastIndex = 0;
    let match: RegExpExecArray | null;
    while ((match = ANY_AMOUNT.exec(bodyText)) !== null) {
      const raw = match[1] ?? match[2];
      if (!raw) continue;
      const val = parseFloat(raw.replace(/,/g, ""));
      if (val > best && val < 99999) best = val;
    }
  }

  return Math.round(best * 100) / 100;
}

export function detectMerchantName(): string {
  // Try og:site_name, then document.title, then hostname
  const ogSite = document.querySelector<HTMLMetaElement>('meta[property="og:site_name"]');
  if (ogSite?.content) return ogSite.content;
  const title = document.title.split(/[|\-–]/)[0].trim();
  if (title) return title;
  return window.location.hostname.replace(/^www\./, "");
}
