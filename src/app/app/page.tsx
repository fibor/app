"use client";

import { useWallet } from "./layout";
import { usePoolStats } from "@/hooks/use-pool-stats";
import { useFiborAccount } from "@/hooks/use-fibor-account";
import { useReadContract } from "wagmi";
import { CONTRACTS } from "@/lib/contracts";
import { formatUSDC, formatUSDCCompact, formatScore } from "@/lib/format";
import Link from "next/link";

function LoadingSkeleton() {
  return (
    <div className="flex flex-col items-center justify-center py-32">
      <div className="w-10 h-10 border-2 border-black/10 border-t-black rounded-full animate-spin mb-4" />
      <p className="text-sm text-neutral-400">Loading your account...</p>
    </div>
  );
}

export default function Dashboard() {
  const { fullAddress } = useWallet();
  const poolStats = usePoolStats();
  const identity = useFiborAccount(fullAddress as `0x${string}` | undefined);

  const { data: savingsData } = useReadContract({
    ...CONTRACTS.creditPool,
    functionName: "savings",
    args: identity.accountAddress ? [identity.accountAddress] : undefined,
    query: { enabled: !!identity.accountAddress },
  });

  const { data: agentList } = useReadContract({
    ...CONTRACTS.fiborId,
    functionName: "getDeveloperAgents",
    args: fullAddress ? [fullAddress as `0x${string}`] : undefined,
    query: { enabled: !!fullAddress },
  });

  const savingsBalance = (savingsData as [bigint, bigint, bigint] | undefined)?.[0];
  const agents = (agentList as `0x${string}`[] | undefined) || [];

  // Show skeleton during loading
  if (identity.isLoading) return <LoadingSkeleton />;

  // Not registered — send to onboarding
  if (!identity.isLoading && !identity.isRegistered) {
    return (
      <div className="flex flex-col items-center justify-center py-32">
        <div className="w-12 h-12 bg-muted rounded-xl flex items-center justify-center mb-6">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83" strokeLinecap="round" />
          </svg>
        </div>
        <h2 className="text-xl font-semibold tracking-tight mb-2">Open an Account</h2>
        <p className="text-sm text-neutral-500 mb-6 max-w-sm text-center">
          You don&apos;t have a FIBOR account yet. Open a personal or business account to get started.
        </p>
        <Link
          href="/app/onboarding"
          className="h-10 px-6 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors flex items-center"
        >
          Open Account
        </Link>
      </div>
    );
  }

  const stats = [
    { label: "Total Deposits", value: formatUSDCCompact(poolStats.totalSavings) },
    { label: "Credit Outstanding", value: formatUSDCCompact(poolStats.totalLent) },
    { label: "Agents Registered", value: poolStats.totalRegistered.toString() },
    { label: "Credit Pacts Issued", value: poolStats.activePacts.toString() },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-sm text-neutral-500 mt-1">Your FIBOR overview</p>
      </div>

      {/* Protocol stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {stats.map((stat) => (
          <div key={stat.label} className="p-4 rounded-xl border border-border bg-card">
            <div className="text-[11px] text-neutral-400 tracking-wide uppercase mb-2">{stat.label}</div>
            <div className="text-xl font-bold font-mono tracking-tight">{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Two-card layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Savings Account */}
        <div className="p-6 rounded-xl border border-border bg-card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold">Savings Account</h2>
            <Link href="/app/stake" className="text-[12px] text-neutral-400 hover:text-foreground transition-colors">
              Manage &rarr;
            </Link>
          </div>
          <div className="mb-4">
            <div className="text-[11px] text-neutral-400 tracking-wide uppercase mb-1">Balance (USDC)</div>
            <div className="text-3xl font-bold font-mono tracking-tight">{formatUSDC(savingsBalance)}</div>
          </div>
          <div className="flex gap-2">
            <Link
              href="/app/stake"
              className="flex-1 h-9 bg-primary text-primary-foreground text-[13px] font-medium rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center"
            >
              Deposit
            </Link>
            <Link
              href="/app/stake"
              className="flex-1 h-9 border border-black/[0.08] text-[13px] font-medium rounded-lg hover:bg-muted transition-colors flex items-center justify-center"
            >
              Withdraw
            </Link>
          </div>
        </div>

        {/* Your Agents */}
        <div className="p-6 rounded-xl border border-border bg-card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold">Your Agents</h2>
            <Link href="/app/agents" className="text-[12px] text-neutral-400 hover:text-foreground transition-colors">
              View All &rarr;
            </Link>
          </div>
          {agents.length === 0 ? (
            <div className="text-center py-6">
              <p className="text-sm text-neutral-400 mb-4">No agents registered yet</p>
              <Link
                href="/app/agents/new"
                className="inline-flex h-9 px-4 bg-primary text-primary-foreground text-[13px] font-medium rounded-lg hover:bg-primary/90 transition-colors items-center gap-1.5"
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M6 2v8M2 6h8" strokeLinecap="round" />
                </svg>
                Register Agent
              </Link>
            </div>
          ) : (
            <div className="space-y-2">
              {agents.slice(0, 3).map((addr) => (
                <div key={addr} className="flex items-center justify-between p-2.5 rounded-lg bg-muted">
                  <span className="text-[13px] font-mono">{`${addr.slice(0, 8)}...${addr.slice(-4)}`}</span>
                  <span className="text-[11px] text-emerald-600 font-medium">Active</span>
                </div>
              ))}
              {agents.length > 3 && (
                <Link href="/app/agents" className="block text-center text-[12px] text-neutral-400 hover:text-foreground pt-1">
                  +{agents.length - 3} more
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
