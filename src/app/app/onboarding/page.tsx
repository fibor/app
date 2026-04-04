"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useWallet } from "../layout";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { CONTRACTS } from "@/lib/contracts";
import { ConnectKitButton } from "connectkit";

export default function OnboardingPage() {
  const { connected } = useWallet();
  const router = useRouter();
  const [step, setStep] = useState<"choose" | "form">("choose");
  const [accountType, setAccountType] = useState<"personal" | "business">("personal");
  const [name, setName] = useState("");

  const { writeContract, data: hash, isPending, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  if (isSuccess) {
    setTimeout(() => {
      router.push(accountType === "business" ? "/app/agents/new" : "/app");
    }, 1500);
  }

  function handleRegister() {
    const metadata = JSON.stringify({ name: name || (accountType === "personal" ? "Personal Account" : "Business Account"), type: accountType });
    writeContract({
      ...CONTRACTS.fiborId,
      functionName: "registerHuman",
      args: [metadata],
    });
  }

  if (!connected) {
    return (
      <div className="flex flex-col items-center justify-center py-32">
        <h2 className="text-xl font-semibold tracking-tight mb-2">Open an Account</h2>
        <p className="text-sm text-neutral-500 mb-6 text-center max-w-sm">
          Connect your wallet to open an account at the First International Bank of Robot.
        </p>
        <ConnectKitButton />
      </div>
    );
  }

  if (step === "choose") {
    return (
      <div className="max-w-2xl mx-auto py-16">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold tracking-tight mb-3">Open an Account</h1>
          <p className="text-neutral-500">
            Choose the type of account that&apos;s right for you.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Personal */}
          <button
            onClick={() => { setAccountType("personal"); setStep("form"); }}
            className="p-6 rounded-xl border-2 border-black/[0.06] bg-white hover:border-black/[0.15] transition-all text-left group"
          >
            <div className="w-10 h-10 rounded-lg bg-black/[0.03] flex items-center justify-center mb-4">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="10" cy="7" r="3" />
                <path d="M4 17c0-3.314 2.686-6 6-6s6 2.686 6 6" strokeLinecap="round" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-1">Personal Account</h3>
            <p className="text-sm text-neutral-500 leading-relaxed">
              Open a savings account. Deposit USDC and earn yield from agent commerce on the FIBOR network.
            </p>
            <div className="mt-4 text-[12px] text-neutral-400">
              Savings &bull; Yield &bull; 30-day withdrawal notice
            </div>
          </button>

          {/* Business */}
          <button
            onClick={() => { setAccountType("business"); setStep("form"); }}
            className="p-6 rounded-xl border-2 border-black/[0.06] bg-white hover:border-black/[0.15] transition-all text-left group"
          >
            <div className="w-10 h-10 rounded-lg bg-black/[0.03] flex items-center justify-center mb-4">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="6" width="14" height="11" rx="1.5" />
                <path d="M7 6V4.5A1.5 1.5 0 018.5 3h3A1.5 1.5 0 0113 4.5V6" />
                <path d="M3 10h14" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-1">Business Account</h3>
            <p className="text-sm text-neutral-500 leading-relaxed">
              Register and manage AI agents. Each agent gets a FiborAccount with checking, credit, and a financial identity.
            </p>
            <div className="mt-4 text-[12px] text-neutral-400">
              Agent management &bull; Credit lines &bull; Savings
            </div>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto py-16">
      <button onClick={() => setStep("choose")} className="text-sm text-neutral-400 hover:text-black mb-6 flex items-center gap-1">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3L4 7l4 4" /></svg>
        Back
      </button>

      <h1 className="text-2xl font-bold tracking-tight mb-2">
        {accountType === "personal" ? "Personal Account" : "Business Account"}
      </h1>
      <p className="text-sm text-neutral-500 mb-8">
        {accountType === "personal"
          ? "Open a savings account to earn yield from agent commerce."
          : "Set up your developer account to register and manage agents."}
      </p>

      <div className="p-6 rounded-xl border border-black/[0.04] bg-white space-y-4">
        <div>
          <label className="text-[12px] text-neutral-500 mb-2 block">
            Account Name (optional)
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={accountType === "personal" ? "My Savings" : "My Dev Studio"}
            className="w-full h-12 px-4 rounded-lg border border-black/[0.06] bg-white text-[14px] focus:outline-none focus:border-black/[0.15] transition-colors"
          />
        </div>

        <button
          onClick={handleRegister}
          disabled={isPending || isConfirming}
          className="w-full h-11 bg-black text-white text-sm font-medium rounded-lg hover:bg-neutral-800 transition-colors disabled:opacity-50"
        >
          {isPending ? "Confirm in wallet..." : isConfirming ? "Creating account..." : "Open Account"}
        </button>

        {isSuccess && (
          <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-200">
            <div className="text-[13px] font-medium text-emerald-800">Account created!</div>
            <div className="text-[12px] text-emerald-600 mt-1">
              Redirecting to {accountType === "business" ? "agent registration" : "dashboard"}...
            </div>
          </div>
        )}

        {error && (
          <div className="p-4 rounded-lg bg-red-50 border border-red-200">
            <div className="text-[13px] font-medium text-red-800">Failed</div>
            <div className="text-[12px] text-red-600 mt-1 font-mono break-all">
              {error.message.slice(0, 200)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
