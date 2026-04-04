"use client";

import { useWallet } from "./layout";
import { usePoolStats } from "@/hooks/use-pool-stats";
import { useFiborAccount } from "@/hooks/use-fibor-account";
import { useFiborScore } from "@/hooks/use-fibor-score";
import { useReadContract } from "wagmi";
import { CONTRACTS } from "@/lib/contracts";
import { formatUSDC, formatUSDCCompact, formatScore, shortAddress } from "@/lib/format";
import Link from "next/link";
import { ConnectKitButton } from "connectkit";

function ConnectPrompt() {
  return (
    <div className="flex flex-col items-center justify-center py-32">
      <div className="w-12 h-12 bg-black/[0.03] rounded-xl flex items-center justify-center mb-6">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="2" y="6" width="20" height="14" rx="2" />
          <path d="M2 10h20" />
          <circle cx="17" cy="15" r="1.5" fill="currentColor" stroke="none" />
        </svg>
      </div>
      <h2 className="text-xl font-semibold tracking-tight mb-2">Connect your wallet</h2>
      <p className="text-sm text-neutral-500 mb-6 max-w-sm text-center">
        Connect your wallet to view your FiborAccount, manage savings, and explore the protocol.
      </p>
      <ConnectKitButton />
    </div>
  );
}

export default function Dashboard() {
  const { connected, fullAddress } = useWallet();
  const poolStats = usePoolStats();
  const identity = useFiborAccount(fullAddress as `0x${string}` | undefined);
  const score = useFiborScore(identity.accountAddress);

  const { data: usdcBalance } = useReadContract({
    ...CONTRACTS.mockUsdc,
    functionName: "balanceOf",
    args: identity.accountAddress ? [identity.accountAddress] : undefined,
    query: { enabled: !!identity.accountAddress },
  });

  const { data: savingsData } = useReadContract({
    ...CONTRACTS.creditPool,
    functionName: "savings",
    args: identity.accountAddress ? [identity.accountAddress] : undefined,
    query: { enabled: !!identity.accountAddress },
  });

  const savingsBalance = (savingsData as [bigint, bigint, bigint] | undefined)?.[0];

  if (!connected) return <ConnectPrompt />;

  const stats = [
    { label: "Total Savings (Pool)", value: formatUSDCCompact(poolStats.totalSavings) },
    { label: "Credit Outstanding", value: formatUSDCCompact(poolStats.totalLent) },
    { label: "Agents Registered", value: poolStats.totalRegistered.toString() },
    { label: "Credit Pacts Issued", value: poolStats.activePacts.toString() },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-sm text-neutral-500 mt-1">Overview of your FIBOR protocol activity</p>
      </div>

      {/* Protocol stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {stats.map((stat) => (
          <div key={stat.label} className="p-4 rounded-xl border border-black/[0.04] bg-white">
            <div className="text-[11px] text-neutral-400 tracking-wide uppercase mb-2">{stat.label}</div>
            <div className="text-xl font-bold font-mono tracking-tight">{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Account status */}
      {!identity.isRegistered ? (
        <div className="p-8 rounded-xl border border-black/[0.04] bg-white text-center">
          <h2 className="text-lg font-semibold mb-2">No FiborAccount found</h2>
          <p className="text-sm text-neutral-500 mb-4">
            Register as a human (savings account) or register an agent to get started.
          </p>
          <Link
            href="/app/register"
            className="inline-flex h-10 px-6 bg-black text-white text-sm font-medium rounded-lg hover:bg-neutral-800 transition-colors items-center"
          >
            Register
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Account info */}
          <div className="lg:col-span-2 p-6 rounded-xl border border-black/[0.04] bg-white">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-sm font-semibold">Your FiborAccount</h2>
              <span className="text-[11px] text-neutral-400 font-mono">{shortAddress(identity.accountAddress)}</span>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <div className="text-[11px] text-neutral-400 tracking-wide uppercase mb-1">Checking (R$)</div>
                <div className="text-2xl font-bold font-mono tracking-tight">{formatUSDC(usdcBalance as bigint)}</div>
              </div>
              <div>
                <div className="text-[11px] text-neutral-400 tracking-wide uppercase mb-1">Savings (R$)</div>
                <div className="text-2xl font-bold font-mono tracking-tight">{formatUSDC(savingsBalance)}</div>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-black/[0.04] grid grid-cols-3 gap-4">
              <div>
                <div className="text-[11px] text-neutral-400 tracking-wide uppercase mb-1">FIBOR Score</div>
                <div className="text-lg font-bold font-mono">{formatScore(score.score)}</div>
              </div>
              <div>
                <div className="text-[11px] text-neutral-400 tracking-wide uppercase mb-1">Max Credit Line</div>
                <div className="text-lg font-bold font-mono">{formatUSDC(score.maxCreditLine)}</div>
              </div>
              <div>
                <div className="text-[11px] text-neutral-400 tracking-wide uppercase mb-1">Status</div>
                <div className="text-lg font-bold">
                  <span className="inline-flex items-center gap-1.5 text-[12px] font-medium px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700">
                    <div className="w-1 h-1 rounded-full bg-emerald-500" />
                    Active
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick actions */}
          <div className="p-6 rounded-xl border border-black/[0.04] bg-white">
            <h2 className="text-sm font-semibold mb-4">Quick Actions</h2>
            <div className="space-y-2.5">
              <Link
                href="/app/stake"
                className="flex items-center gap-3 p-3 rounded-lg border border-black/[0.04] hover:border-black/[0.08] hover:bg-black/[0.01] transition-all"
              >
                <div className="w-8 h-8 rounded-md bg-black/[0.03] flex items-center justify-center shrink-0">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M7 2v10M2 7h10" strokeLinecap="round" />
                  </svg>
                </div>
                <div>
                  <div className="text-[13px] font-medium">Deposit to Savings</div>
                  <div className="text-[11px] text-neutral-400">Earn yield from agent commerce</div>
                </div>
              </Link>
              <Link
                href="/app/register"
                className="flex items-center gap-3 p-3 rounded-lg border border-black/[0.04] hover:border-black/[0.08] hover:bg-black/[0.01] transition-all"
              >
                <div className="w-8 h-8 rounded-md bg-black/[0.03] flex items-center justify-center shrink-0">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="1.5" y="1.5" width="11" height="11" rx="2.5" />
                    <circle cx="7" cy="5.5" r="1.5" />
                    <path d="M4 10c0-1.657 1.343-3 3-3s3 1.343 3 3" strokeLinecap="round" />
                  </svg>
                </div>
                <div>
                  <div className="text-[13px] font-medium">Register Agent</div>
                  <div className="text-[11px] text-neutral-400">Open a FiborAccount for your agent</div>
                </div>
              </Link>
              <Link
                href="/app/explorer"
                className="flex items-center gap-3 p-3 rounded-lg border border-black/[0.04] hover:border-black/[0.08] hover:bg-black/[0.01] transition-all"
              >
                <div className="w-8 h-8 rounded-md bg-black/[0.03] flex items-center justify-center shrink-0">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="6" cy="6" r="4" />
                    <path d="M9 9l3 3" strokeLinecap="round" />
                  </svg>
                </div>
                <div>
                  <div className="text-[13px] font-medium">Explorer</div>
                  <div className="text-[11px] text-neutral-400">Query IDs and pacts</div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
