import TroyGateway from "./components/TroyGateway";
import "./styles/global.css";

export default function App() {
  const params = new URLSearchParams(window.location.search);
  const usdTotal = Number(params.get("usdTotal") ?? "0");
  const merchantName = params.get("merchantName") ?? "Merchant";

  function handleClose() {
    window.parent.postMessage({ type: "TROY_CLOSE" }, "*");
  }

  return (
    <TroyGateway
      usdTotal={usdTotal}
      merchantName={merchantName}
      onClose={handleClose}
    />
  );
}
