const BACKDROP_ID = "troy-overlay-backdrop";
const FRAME_ID = "troy-overlay-frame";

let overlayFrame: HTMLIFrameElement | null = null;
let messageListener: ((e: MessageEvent) => void) | null = null;

export function openOverlay(usdTotal: number, merchantName: string) {
  if (document.getElementById(FRAME_ID)) return;

  const backdrop = document.createElement("div");
  backdrop.id = BACKDROP_ID;
  backdrop.style.cssText = [
    "position:fixed",
    "inset:0",
    "z-index:2147483646",
    "background:rgba(34,34,34,0.5)",
  ].join(";");
  backdrop.addEventListener("click", closeOverlay);

  const params = new URLSearchParams({
    usdTotal: String(usdTotal),
    merchantName,
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
    "background:transparent",
  ].join(";");

  // Fallback: if iframe is blocked by frame-ancestors CSP, open in new tab
  overlayFrame.addEventListener("error", () => {
    closeOverlay();
    chrome.runtime.sendMessage({ type: "TROY_OPEN_TAB", params: params.toString() });
  });

  document.body.appendChild(backdrop);
  document.body.appendChild(overlayFrame);

  // Listen for messages from the overlay iframe
  messageListener = (e: MessageEvent) => {
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

    // Forward payment requests from overlay → service worker
    if (e.data.type === "TROY_PAY_REQUEST") {
      chrome.runtime.sendMessage(
        { type: "TROY_PAY_REQUEST", txId: e.data.txId, usdTotal: e.data.usdTotal },
        (result: unknown) => {
          overlayFrame?.contentWindow?.postMessage(
            { type: "TROY_PAY_RESULT", ...( result as object) },
            "*"
          );
        }
      );
    }
  };

  window.addEventListener("message", messageListener);
}

export function closeOverlay() {
  document.getElementById(BACKDROP_ID)?.remove();
  document.getElementById(FRAME_ID)?.remove();
  overlayFrame = null;
  if (messageListener) {
    window.removeEventListener("message", messageListener);
    messageListener = null;
  }
}
