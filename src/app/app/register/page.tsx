"use client";

import { useState } from "react";
import { useWallet } from "../layout";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { CONTRACTS } from "@/lib/contracts";
import { ConnectKitButton } from "connectkit";

export default function RegisterPage() {
  const { connected } = useWallet();
  const [mode, setMode] = useState<"human" | "agent">("human");
  const [agentAddress, setAgentAddress] = useState("");
  const [metadataURI, setMetadataURI] = useState("");

  const { writeContract, data: hash, isPending, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  function handleRegister() {
    if (mode === "human") {
      writeContract({
        ...CONTRACTS.fiborId,
        functionName: "registerHuman",
        args: [metadataURI || "ipfs://fibor-human"],
      });
    } else {
      if (!agentAddress.startsWith("0x") || agentAddress.length !== 42) return;
      writeContract({
        ...CONTRACTS.fiborId,
        functionName: "register",
        args: [agentAddress as `0x${string}`, metadataURI || "ipfs://fibor-agent"],
      });
    }
  }

  if (!connected) {
    return (
      <div className="flex flex-col items-center justify-center py-32">
        <h2 className="text-xl font-semibold tracking-tight mb-2">Connect to register</h2>
        <p className="text-sm text-neutral-500 mb-6 text-center max-w-sm">
          Connect your wallet to register a human savings account or an agent.
        </p>
        <ConnectKitButton />
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Register</h1>
        <p className="text-sm text-neutral-500 mt-1">
          Open a FiborAccount — the bank account for the FIBOR network.
        </p>
      </div>

      {/* Mode toggle */}
      <div className="flex border-b border-black/[0.04]">
        {(["human", "agent"] as const).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`pb-3 px-4 text-[13px] font-medium border-b-2 transition-colors capitalize ${
              mode === m
                ? "border-black text-black"
                : "border-transparent text-neutral-400 hover:text-neutral-600"
            }`}
          >
            {m === "human" ? "Human (Savings)" : "Agent (Full Account)"}
          </button>
        ))}
      </div>

      <div className="p-6 rounded-xl border border-black/[0.04] bg-white space-y-4">
        {mode === "agent" && (
          <div>
            <label className="text-[12px] text-neutral-500 mb-2 block">
              Agent Address (OWS wallet or any EVM address)
            </label>
            <input
              type="text"
              value={agentAddress}
              onChange={(e) => setAgentAddress(e.target.value)}
              placeholder="0x..."
              className="w-full h-12 px-4 rounded-lg border border-black/[0.06] bg-white text-[13px] font-mono focus:outline-none focus:border-black/[0.15] transition-colors"
            />
          </div>
        )}

        <div>
          <label className="text-[12px] text-neutral-500 mb-2 block">
            Metadata URI (optional — IPFS or HTTPS link to JSON)
          </label>
          <input
            type="text"
            value={metadataURI}
            onChange={(e) => setMetadataURI(e.target.value)}
            placeholder="ipfs://... or https://..."
            className="w-full h-12 px-4 rounded-lg border border-black/[0.06] bg-white text-[13px] font-mono focus:outline-none focus:border-black/[0.15] transition-colors"
          />
        </div>

        <div className="p-3 rounded-lg bg-neutral-50 border border-black/[0.03]">
          <div className="text-[12px] text-neutral-500">
            {mode === "human" ? (
              <>
                A <strong>savings-only</strong> FiborAccount will be created.
                You can deposit USDC to earn yield from agent transaction fees.
                No credit access.
              </>
            ) : (
              <>
                A <strong>full FiborAccount</strong> will be created for your agent
                with checking, savings, and credit access. You (the developer) become
                the guardian.
              </>
            )}
          </div>
        </div>

        <button
          onClick={handleRegister}
          disabled={isPending || isConfirming}
          className="w-full h-11 bg-black text-white text-sm font-medium rounded-lg hover:bg-neutral-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending
            ? "Confirm in wallet..."
            : isConfirming
            ? "Confirming..."
            : mode === "human"
            ? "Register Human Account"
            : "Register Agent"}
        </button>

        {isSuccess && (
          <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-200">
            <div className="text-[13px] font-medium text-emerald-800">
              Registration successful!
            </div>
            <div className="text-[12px] text-emerald-600 mt-1">
              Your FiborAccount has been deployed. View it on the{" "}
              <a href="/app" className="underline">
                dashboard
              </a>.
            </div>
          </div>
        )}

        {error && (
          <div className="p-4 rounded-lg bg-red-50 border border-red-200">
            <div className="text-[13px] font-medium text-red-800">
              Registration failed
            </div>
            <div className="text-[12px] text-red-600 mt-1 font-mono break-all">
              {error.message.slice(0, 200)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
