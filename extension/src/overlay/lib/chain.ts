import { createPublicClient, createWalletClient, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { base } from "viem/chains";

const localChain = { ...base, id: 3133 };

export async function getClients() {
  const cfg = await chrome.storage.local.get(["rpcUrl", "privateKey"]);
  const rpcUrl = (cfg["rpcUrl"] as string | undefined) ?? "http://192.168.1.52:8545";
  const privateKey = cfg["privateKey"] as `0x${string}` | undefined;
  if (!privateKey) throw new Error("Private key not configured — open TroyLayer Options");
  return {
    publicClient: createPublicClient({ chain: localChain, transport: http(rpcUrl) }),
    walletClient: createWalletClient({
      account: privateKeyToAccount(privateKey),
      chain: localChain,
      transport: http(rpcUrl),
    }),
  };
}
