import { r as reactExports, j as jsxRuntimeExports, c as clientExports } from "./client-BzjKTWx6.js";
const ANVIL_DEFAULT_KEY = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
const DEFAULT_MERCHANT = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8";
function Options() {
  const [config, setConfig] = reactExports.useState({
    rpcUrl: "http://192.168.1.52:8545",
    aggregatorUrl: "http://192.168.1.52:8000",
    privateKey: ANVIL_DEFAULT_KEY,
    merchantAddress: DEFAULT_MERCHANT
  });
  const [saved, setSaved] = reactExports.useState(false);
  reactExports.useEffect(() => {
    chrome.storage.local.get(
      ["rpcUrl", "aggregatorUrl", "privateKey", "merchantAddress"],
      (stored) => {
        setConfig((prev) => ({
          rpcUrl: stored["rpcUrl"] ?? prev.rpcUrl,
          aggregatorUrl: stored["aggregatorUrl"] ?? prev.aggregatorUrl,
          privateKey: stored["privateKey"] ?? prev.privateKey,
          merchantAddress: stored["merchantAddress"] ?? prev.merchantAddress
        }));
      }
    );
  }, []);
  function handleSave(e) {
    e.preventDefault();
    chrome.storage.local.set(config, () => {
      setSaved(true);
      setTimeout(() => setSaved(false), 2e3);
    });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { fontFamily: "'Helvetica Neue', Arial, sans-serif", maxWidth: 560, margin: "40px auto", padding: "0 24px", color: "#222" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 12, marginBottom: 32 }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: chrome.runtime.getURL("troy-logo.png"), alt: "TroyLayer", height: 28 }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { style: { fontSize: 22, fontWeight: 400, margin: 0, letterSpacing: "0.05em" }, children: "TroyLayer Options" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { fontSize: 13, color: "#727272", marginBottom: 28, lineHeight: 1.6 }, children: "This extension connects to your local Anvil node and aggregator. Configure the endpoints below. The private key is stored locally in your browser and is never sent anywhere except your RPC endpoint." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSave, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Field,
        {
          label: "RPC URL (Anvil)",
          id: "rpcUrl",
          value: config.rpcUrl,
          onChange: (v) => setConfig((c) => ({ ...c, rpcUrl: v })),
          placeholder: "http://localhost:8545"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Field,
        {
          label: "Aggregator URL",
          id: "aggregatorUrl",
          value: config.aggregatorUrl,
          onChange: (v) => setConfig((c) => ({ ...c, aggregatorUrl: v })),
          placeholder: "http://localhost:8000"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Field,
        {
          label: "Private Key (Deployer)",
          id: "privateKey",
          value: config.privateKey,
          onChange: (v) => setConfig((c) => ({ ...c, privateKey: v })),
          placeholder: "0x...",
          type: "password",
          hint: "Defaults to Anvil's well-known test key. Only use on a local test node."
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Field,
        {
          label: "Merchant Address",
          id: "merchantAddress",
          value: config.merchantAddress,
          onChange: (v) => setConfig((c) => ({ ...c, merchantAddress: v })),
          placeholder: "0x..."
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "submit",
          style: {
            marginTop: 24,
            padding: "12px 32px",
            background: "#222",
            color: "#fff",
            border: "none",
            fontSize: 14,
            cursor: "pointer",
            letterSpacing: "0.05em"
          },
          children: saved ? "Saved ✓" : "Save Settings"
        }
      )
    ] })
  ] });
}
function Field({
  label,
  id,
  value,
  onChange,
  placeholder,
  type = "text",
  hint
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginBottom: 20 }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: id, style: { display: "block", fontSize: 11, color: "#727272", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 6 }, children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        id,
        type,
        value,
        onChange: (e) => onChange(e.target.value),
        placeholder,
        style: {
          width: "100%",
          height: 44,
          border: "1px solid #e6e6e6",
          padding: "0 12px",
          fontSize: 14,
          color: "#222",
          background: "#fff",
          boxSizing: "border-box",
          fontFamily: type === "password" ? "monospace" : "inherit"
        }
      }
    ),
    hint && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { margin: "4px 0 0", fontSize: 11, color: "#b6b6b6" }, children: hint })
  ] });
}
const root = document.getElementById("root");
if (root) {
  clientExports.createRoot(root).render(
    /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.StrictMode, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Options, {}) })
  );
}
//# sourceMappingURL=index.html-C7OMS4sa.js.map
