import { hasCryptoText, hasEthereumOnCheckout, hasKnownProviderAssets, isOnProcessorPage, detectPageAmount, detectMerchantName } from "./detector";
import { injectBanner, removeBanner } from "./banner";
import { openOverlay } from "./overlay";

let detected = false;

function debounce(fn: () => void, ms: number) {
  let timer: ReturnType<typeof setTimeout>;
  return () => {
    clearTimeout(timer);
    timer = setTimeout(fn, ms);
  };
}

function runDetection() {
  if (detected) return;

  // Phase 2: user has committed to crypto and landed on the payment processor
  if (isOnProcessorPage()) {
    detected = true;
    openOverlay(detectPageAmount(), detectMerchantName());
    return;
  }

  // Phase 1: crypto is being offered as a choice on the merchant checkout
  if (hasCryptoText() || hasEthereumOnCheckout() || hasKnownProviderAssets()) {
    detected = true;
    injectBanner();
  }
}

// Initial detection on document_idle
runDetection();

// Track URL to detect SPA navigations (works with Next.js App Router / Navigation API)
let currentHref = location.href;

function onUrlChange() {
  if (location.href !== currentHref) {
    currentHref = location.href;
    detected = false;
    removeBanner();
    setTimeout(runDetection, 400);
  }
}

// MutationObserver catches DOM mutations AND URL changes caused by SPA navigation
const observer = new MutationObserver(debounce(() => {
  onUrlChange();
  runDetection();
}, 400));
observer.observe(document.body, { childList: true, subtree: true });

// Also patch history API as belt-and-suspenders
const _push = history.pushState.bind(history);
const _replace = history.replaceState.bind(history);
history.pushState = function (...args) { _push(...args); onUrlChange(); };
history.replaceState = function (...args) { _replace(...args); onUrlChange(); };
window.addEventListener("popstate", onUrlChange);
