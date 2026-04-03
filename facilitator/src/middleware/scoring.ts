import { createPublicClient, http } from "viem";
import { config } from "../config.js";

const FIBOR_SCORE_ABI = [
  {
    name: "getScore",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "agent", type: "address" }],
    outputs: [{ name: "", type: "uint256" }],
  },
  {
    name: "getMaxCreditLine",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "agent", type: "address" }],
    outputs: [{ name: "", type: "uint256" }],
  },
  {
    name: "scores",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "agent", type: "address" }],
    outputs: [
      { name: "totalVolumeRepaid", type: "uint256" },
      { name: "totalRepayments", type: "uint256" },
      { name: "registeredAt", type: "uint256" },
      { name: "totalDefaulted", type: "uint256" },
      { name: "excommunicated", type: "bool" },
    ],
  },
  {
    name: "isExcommunicated",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "agent", type: "address" }],
    outputs: [{ name: "", type: "bool" }],
  },
] as const;

export interface AgentScore {
  compositeScore: bigint;
  maxCreditLine: bigint;
  totalVolumeRepaid: bigint;
  totalRepayments: bigint;
  registeredAt: bigint;
  excommunicated: boolean;
}

const client = createPublicClient({
  chain: config.chain,
  transport: http(config.rpcUrl),
});

export async function getAgentScore(
  agentAddress: `0x${string}`
): Promise<AgentScore | null> {
  try {
    const [score, maxCredit, fullScore, excomm] = await Promise.all([
      client.readContract({
        address: config.contracts.fiborScore,
        abi: FIBOR_SCORE_ABI,
        functionName: "getScore",
        args: [agentAddress],
      }),
      client.readContract({
        address: config.contracts.fiborScore,
        abi: FIBOR_SCORE_ABI,
        functionName: "getMaxCreditLine",
        args: [agentAddress],
      }),
      client.readContract({
        address: config.contracts.fiborScore,
        abi: FIBOR_SCORE_ABI,
        functionName: "scores",
        args: [agentAddress],
      }),
      client.readContract({
        address: config.contracts.fiborScore,
        abi: FIBOR_SCORE_ABI,
        functionName: "isExcommunicated",
        args: [agentAddress],
      }),
    ]);

    return {
      compositeScore: score,
      maxCreditLine: maxCredit,
      totalVolumeRepaid: fullScore[0],
      totalRepayments: fullScore[1],
      registeredAt: fullScore[2],
      excommunicated: excomm,
    };
  } catch {
    return null;
  }
}
