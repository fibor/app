import { createPublicClient, http } from "viem";
import { config } from "../config.js";

const FIBOR_ID_ABI = [
  {
    name: "identities",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "agent", type: "address" }],
    outputs: [
      { name: "developer", type: "address" },
      { name: "account", type: "address" },
      { name: "metadataURI", type: "string" },
      { name: "createdAt", type: "uint256" },
      { name: "status", type: "uint8" },
    ],
  },
  {
    name: "isActive",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "agent", type: "address" }],
    outputs: [{ name: "", type: "bool" }],
  },
] as const;

export interface AgentIdentity {
  developer: string;
  account: string;
  metadataURI: string;
  createdAt: bigint;
  status: number;
  isActive: boolean;
}

const client = createPublicClient({
  chain: config.chain,
  transport: http(config.rpcUrl),
});

export async function getAgentIdentity(
  agentAddress: `0x${string}`
): Promise<AgentIdentity | null> {
  try {
    const [identity, active] = await Promise.all([
      client.readContract({
        address: config.contracts.fiborID,
        abi: FIBOR_ID_ABI,
        functionName: "identities",
        args: [agentAddress],
      }),
      client.readContract({
        address: config.contracts.fiborID,
        abi: FIBOR_ID_ABI,
        functionName: "isActive",
        args: [agentAddress],
      }),
    ]);

    if (identity[3] === 0n) return null; // not registered

    return {
      developer: identity[0],
      account: identity[1],
      metadataURI: identity[2],
      createdAt: identity[3],
      status: identity[4],
      isActive: active,
    };
  } catch {
    return null;
  }
}
