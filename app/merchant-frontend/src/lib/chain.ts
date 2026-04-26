import { createPublicClient, createWalletClient, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { base } from "viem/chains";

const rpcUrl = process.env.BASE_RPC_URL ?? "http://192.168.1.52:8545";
const privateKey = (
  process.env.DEPLOYER_PRIVATE_KEY ??
  "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"
) as `0x${string}`;

const localChain = { ...base, id: 3133 };

export const publicClient = createPublicClient({
  chain: localChain,
  transport: http(rpcUrl),
});

export const walletClient = createWalletClient({
  account: privateKeyToAccount(privateKey),
  chain: localChain,
  transport: http(rpcUrl),
});
