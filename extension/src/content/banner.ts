const BANNER_ID = "troy-extension-banner";

export function injectBanner() {
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
    "letter-spacing: 0.02em",
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
    if ((e.target as HTMLElement).id === "troy-banner-close") {
      banner.remove();
    }
  });

  document.body.appendChild(banner);
}

export function removeBanner() {
  document.getElementById(BANNER_ID)?.remove();
}
