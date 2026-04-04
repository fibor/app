"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useWallet } from "../../layout";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { CONTRACTS } from "@/lib/contracts";
import { ConnectKitButton } from "connectkit";

export default function RegisterAgentPage() {
  const { connected } = useWallet();
  const router = useRouter();
  const [agentAddress, setAgentAddress] = useState("");
  const [metadataURI, setMetadataURI] = useState("");

  const { writeContract, data: hash, isPending, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  if (isSuccess) {
    setTimeout(() => router.push("/app/agents"), 2000);
  }

  function handleRegister() {
    if (!agentAddress.startsWith("0x") || agentAddress.length !== 42) return;
    writeContract({
      ...CONTRACTS.fiborId,
      functionName: "register",
      args: [agentAddress as `0x${string}`, metadataURI || "ipfs://fibor-agent"],
    });
  }

  if (!connected) {
    return (
      <div className="flex flex-col items-center justify-center py-32">
        <h2 className="text-xl font-semibold tracking-tight mb-2">Register Agent</h2>
        <p className="text-sm text-neutral-500 mb-6 text-center max-w-sm">
          Connect your wallet to register a new agent.
        </p>
        <ConnectKitButton />
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto space-y-8">
      <div>
        <button onClick={() => router.push("/app/agents")} className="text-sm text-neutral-400 hover:text-black mb-4 flex items-center gap-1">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3L4 7l4 4" /></svg>
          Back to Agents
        </button>
        <h1 className="text-2xl font-bold tracking-tight">Register Agent</h1>
        <p className="text-sm text-neutral-500 mt-1">
          Give your AI agent a financial identity, bank account, and access to credit.
        </p>
      </div>

      <div className="p-6 rounded-xl border border-black/[0.04] bg-white space-y-4">
        <div>
          <label className="text-[12px] text-neutral-500 mb-2 block">
            Agent Address
          </label>
          <input
            type="text"
            value={agentAddress}
            onChange={(e) => setAgentAddress(e.target.value)}
            placeholder="0x... (OWS wallet or any EVM address)"
            className="w-full h-12 px-4 rounded-lg border border-black/[0.06] bg-white text-[13px] font-mono focus:outline-none focus:border-black/[0.15] transition-colors"
          />
          <p className="text-[11px] text-neutral-400 mt-1.5">
            Create with OWS: <code className="bg-neutral-100 px-1 py-0.5 rounded text-[10px]">ows wallet create --name my-agent</code>
          </p>
        </div>

        <div>
          <label className="text-[12px] text-neutral-500 mb-2 block">
            Agent Description (optional)
          </label>
          <input
            type="text"
            value={metadataURI}
            onChange={(e) => setMetadataURI(e.target.value)}
            placeholder="e.g. ShopBot v3 — inventory procurement agent"
            className="w-full h-12 px-4 rounded-lg border border-black/[0.06] bg-white text-[14px] focus:outline-none focus:border-black/[0.15] transition-colors"
          />
        </div>

        <div className="p-3 rounded-lg bg-neutral-50 border border-black/[0.03] space-y-2">
          <div className="text-[12px] text-neutral-600 font-medium">What happens on registration:</div>
          <ul className="text-[12px] text-neutral-500 space-y-1">
            <li className="flex items-start gap-2">
              <span className="text-neutral-300 mt-0.5">1.</span>
              A FiborAccount (bank account) is deployed for the agent
            </li>
            <li className="flex items-start gap-2">
              <span className="text-neutral-300 mt-0.5">2.</span>
              A FIBOR Score is initialized (starts at 0)
            </li>
            <li className="flex items-start gap-2">
              <span className="text-neutral-300 mt-0.5">3.</span>
              You become the agent&apos;s guardian (account custodian)
            </li>
          </ul>
        </div>

        <button
          onClick={handleRegister}
          disabled={isPending || isConfirming || !agentAddress}
          className="w-full h-11 bg-black text-white text-sm font-medium rounded-lg hover:bg-neutral-800 transition-colors disabled:opacity-50"
        >
          {isPending ? "Confirm in wallet..." : isConfirming ? "Deploying account..." : "Register Agent"}
        </button>

        {isSuccess && (
          <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-200">
            <div className="text-[13px] font-medium text-emerald-800">Agent registered!</div>
            <div className="text-[12px] text-emerald-600 mt-1">
              FiborAccount deployed. Redirecting to agents...
            </div>
          </div>
        )}

        {error && (
          <div className="p-4 rounded-lg bg-red-50 border border-red-200">
            <div className="text-[13px] font-medium text-red-800">Registration failed</div>
            <div className="text-[12px] text-red-600 mt-1 font-mono break-all">
              {error.message.slice(0, 200)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
