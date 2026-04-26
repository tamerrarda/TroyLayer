export const TROY_POOL_ADDRESS =
  "0xf548DdEeE372eDed696C020F6D5358d1955BCf3D" as `0x${string}`;
export const TROY_EXCHANGE_ADDRESS =
  "0x300B6FA04a62fF7e237DB125ECd8b5eD35788D9f" as `0x${string}`;
export const MERCHANT_ADDRESS =
  "0x70997970C51812dc3A010C7d01b50e0d17dc79C8" as `0x${string}`;

export const TROY_POOL_ABI = [
  {
    type: "function",
    name: "pay",
    inputs: [
      { name: "txId", type: "bytes32" },
      { name: "amount", type: "uint256" },
      { name: "merchant", type: "address" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "getBalance",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
  },
] as const;

export const TROY_EXCHANGE_ABI = [
  {
    type: "function",
    name: "setRate",
    inputs: [
      { name: "sourceIndex", type: "uint256" },
      { name: "rate", type: "uint256" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "convertAndFund",
    inputs: [{ name: "tryAmount", type: "uint256" }],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "getBestRate",
    inputs: [],
    outputs: [
      { name: "bestRate", type: "uint256" },
      { name: "sourceName", type: "string" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "previewConvert",
    inputs: [{ name: "tryAmount", type: "uint256" }],
    outputs: [
      { name: "usdcAmount", type: "uint256" },
      { name: "sourceName", type: "string" },
    ],
    stateMutability: "view",
  },
] as const;
