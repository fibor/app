"use client";

import { useState } from "react";
import { useWallet } from "../layout";
import { usePoolStats } from "@/hooks/use-pool-stats";
import { useFiborAccount } from "@/hooks/use-fibor-account";
import { useReadContract, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { CONTRACTS, FIBOR_ACCOUNT_ABI } from "@/lib/contracts";
import { formatUSDC, formatUSDCCompact } from "@/lib/format";
import { ConnectKitButton } from "connectkit";

function ConnectPrompt() {
  return (
    <div className="flex flex-col items-center justify-center py-32">
      <h2 className="text-xl font-semibold tracking-tight mb-2">Connect to deposit</h2>
      <p className="text-sm text-neutral-500 mb-6 text-center max-w-sm">
        Connect your wallet to deposit USDC into savings and earn yield from agent commerce.
      </p>
      <ConnectKitButton />
    </div>
  );
}

export default function SavingsPage() {
  const { connected, fullAddress } = useWallet();
  const [amount, setAmount] = useState("");
  const poolStats = usePoolStats();
  const identity = useFiborAccount(fullAddress as `0x${string}` | undefined);

  const { data: savingsData } = useReadContract({
    ...CONTRACTS.creditPool,
    functionName: "savings",
    args: identity.accountAddress ? [identity.accountAddress] : undefined,
    query: { enabled: !!identity.accountAddress },
  });

  const { data: usdcBalance } = useReadContract({
    ...CONTRACTS.mockUsdc,
    functionName: "balanceOf",
    args: fullAddress ? [fullAddress as `0x${string}`] : undefined,
    query: { enabled: !!fullAddress },
  });

  const savingsBalance = (savingsData as [bigint, bigint, bigint] | undefined)?.[0];
  const utilization = poolStats.totalSavings && poolStats.totalLent
    ? Number((poolStats.totalLent * 100n) / poolStats.totalSavings)
    : 0;

  const { writeContract, data: hash, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  function handleDeposit() {
    if (!amount || !identity.accountAddress) return;
    const amountUsdc = BigInt(Math.floor(parseFloat(amount) * 1e6));
    // First approve USDC to the FiborAccount
    writeContract({
      ...CONTRACTS.mockUsdc,
      functionName: "approve",
      args: [identity.accountAddress, amountUsdc],
    });
  }

  if (!connected) return <ConnectPrompt />;

  const stats = [
    { label: "Total Savings Pool", value: formatUSDCCompact(poolStats.totalSavings) },
    { label: "Credit Outstanding", value: formatUSDCCompact(poolStats.totalLent) },
    { label: "Utilization", value: utilization + "%" },
    { label: "Withdrawal Cooldown", value: "30 days" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Savings</h1>
        <p className="text-sm text-neutral-500 mt-1">
          Deposit USDC to fund the credit pool and earn 75% of transaction fees
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {stats.map((stat) => (
          <div key={stat.label} className="p-4 rounded-xl border border-border bg-card">
            <div className="text-[10px] text-neutral-400 tracking-wide uppercase mb-1.5">{stat.label}</div>
            <div className="text-base font-bold font-mono tracking-tight">{stat.value}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Deposit form */}
        <div className="lg:col-span-2 p-6 rounded-xl border border-border bg-card">
          <h2 className="text-sm font-semibold mb-6">Deposit to Savings</h2>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-[12px] text-neutral-500">Amount (USDC)</label>
                <span className="text-[11px] text-neutral-400 font-mono">
                  Wallet: {formatUSDC(usdcBalance as bigint)}
                </span>
              </div>
              <div className="relative">
                <input
                  type="text"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full h-12 px-4 pr-20 rounded-lg border border-border bg-card text-base font-mono focus:outline-none focus:border-black/[0.15] transition-colors"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[12px] text-neutral-400 font-mono">USDC</span>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-muted border border-border">
              <div className="text-[12px] text-neutral-500">
                Savings deposits are lent to the credit pool. You earn 75% of the 2.5% fee on all agent transactions. 30-day withdrawal delay applies.
              </div>
            </div>

            {!identity.isRegistered ? (
              <div className="p-3 rounded-lg bg-yellow-50 border border-yellow-200 text-[12px] text-yellow-800">
                You need a FiborAccount first.{" "}
                <a href="/app/register" className="underline font-medium">Register here</a>.
              </div>
            ) : (
              <button
                onClick={handleDeposit}
                disabled={isPending || isConfirming || !amount}
                className="w-full h-11 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
              >
                {isPending ? "Confirm in wallet..." : isConfirming ? "Confirming..." : "Deposit USDC"}
              </button>
            )}

            {isSuccess && (
              <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-[12px] text-emerald-800">
                USDC approved. Now deposit to savings via your FiborAccount.
              </div>
            )}
          </div>
        </div>

        {/* Position */}
        <div className="lg:col-span-3 p-6 rounded-xl border border-border bg-card">
          <h2 className="text-sm font-semibold mb-4">Your Savings Position</h2>
          {identity.isRegistered ? (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-[10px] text-neutral-400 tracking-wide uppercase mb-1">Savings Balance</div>
                <div className="text-2xl font-bold font-mono">{formatUSDC(savingsBalance)}</div>
              </div>
              <div>
                <div className="text-[10px] text-neutral-400 tracking-wide uppercase mb-1">Pending Yield</div>
                <div className="text-2xl font-bold font-mono text-emerald-600">$0.00</div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-sm text-neutral-400">
              Register a FiborAccount to start earning yield.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
