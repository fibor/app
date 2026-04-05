"use client";

import Link from "next/link";
import { useWallet } from "../layout";
import { useReadContract } from "wagmi";
import { CONTRACTS } from "@/lib/contracts";
import { formatScore, formatUSDC, shortAddress } from "@/lib/format";
import { ConnectKitButton } from "connectkit";

function AgentCard({ address }: { address: `0x${string}` }) {
  const { data: identity } = useReadContract({
    ...CONTRACTS.fiborId,
    functionName: "identities",
    args: [address],
  });

  const id = identity as [string, string, string, bigint, number] | undefined;
  const accountAddr = id?.[1] as `0x${string}` | undefined;
  const status = id?.[4] ?? 0;
  const statusLabels = ["Active", "Suspended", "Excommunicated"];

  const { data: score } = useReadContract({
    ...CONTRACTS.fiborScore,
    functionName: "getScore",
    args: accountAddr ? [accountAddr] : undefined,
    query: { enabled: !!accountAddr },
  });

  const { data: maxCredit } = useReadContract({
    ...CONTRACTS.fiborScore,
    functionName: "getMaxCreditLine",
    args: accountAddr ? [accountAddr] : undefined,
    query: { enabled: !!accountAddr },
  });

  const { data: outstanding } = useReadContract({
    ...CONTRACTS.creditPool,
    functionName: "getOutstanding",
    args: accountAddr ? [accountAddr] : undefined,
    query: { enabled: !!accountAddr },
  });

  return (
    <Link
      href={`/app/explorer?q=${address}`}
      className="p-5 rounded-xl border border-border bg-card hover:border-border transition-all block"
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-[13px] font-mono font-medium">{shortAddress(address)}</span>
        <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${
          status === 0 ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"
        }`}>
          {statusLabels[status]}
        </span>
      </div>
      <div className="grid grid-cols-3 gap-3">
        <div>
          <div className="text-[10px] text-neutral-400 uppercase mb-0.5">Score</div>
          <div className="text-sm font-mono font-medium">{formatScore(score as bigint)}</div>
        </div>
        <div>
          <div className="text-[10px] text-neutral-400 uppercase mb-0.5">Max Credit</div>
          <div className="text-sm font-mono">{formatUSDC(maxCredit as bigint)}</div>
        </div>
        <div>
          <div className="text-[10px] text-neutral-400 uppercase mb-0.5">Outstanding</div>
          <div className="text-sm font-mono">{formatUSDC(outstanding as bigint)}</div>
        </div>
      </div>
      {accountAddr && (
        <div className="mt-3 pt-3 border-t border-border">
          <div className="text-[10px] text-neutral-400">FiborAccount: <span className="font-mono">{shortAddress(accountAddr)}</span></div>
        </div>
      )}
    </Link>
  );
}

export default function AgentsPage() {
  const { connected, fullAddress } = useWallet();

  const { data: agentList } = useReadContract({
    ...CONTRACTS.fiborId,
    functionName: "getDeveloperAgents",
    args: fullAddress ? [fullAddress as `0x${string}`] : undefined,
    query: { enabled: !!fullAddress },
  });

  const agents = (agentList as `0x${string}`[] | undefined) || [];

  if (!connected) {
    return (
      <div className="flex flex-col items-center justify-center py-32">
        <h2 className="text-xl font-semibold tracking-tight mb-2">Manage Agents</h2>
        <p className="text-sm text-neutral-500 mb-6 text-center max-w-sm">
          Connect your wallet to view and manage your registered agents.
        </p>
        <ConnectKitButton />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Agents</h1>
          <p className="text-sm text-neutral-500 mt-1">
            {agents.length} agent{agents.length !== 1 ? "s" : ""} registered under your account
          </p>
        </div>
        <Link
          href="/app/agents/new"
          className="h-10 px-5 bg-black text-white text-sm font-medium rounded-lg hover:bg-neutral-800 transition-colors flex items-center gap-2"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M7 2v10M2 7h10" strokeLinecap="round" />
          </svg>
          Register Agent
        </Link>
      </div>

      {agents.length === 0 ? (
        <div className="p-12 rounded-xl border-2 border-dashed border-border text-center">
          <div className="w-12 h-12 bg-muted rounded-xl flex items-center justify-center mb-4 mx-auto">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="3" y="6" width="18" height="15" rx="2" />
              <path d="M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2" />
              <path d="M12 11v4M10 13h4" strokeLinecap="round" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold mb-2">No agents yet</h3>
          <p className="text-sm text-neutral-500 mb-6 max-w-sm mx-auto">
            Register your first AI agent to give it a financial identity, bank account, and access to zero-interest credit.
          </p>
          <Link
            href="/app/agents/new"
            className="inline-flex h-10 px-6 bg-black text-white text-sm font-medium rounded-lg hover:bg-neutral-800 transition-colors items-center gap-2"
          >
            Register Your First Agent
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {agents.map((addr) => (
            <AgentCard key={addr} address={addr} />
          ))}
        </div>
      )}
    </div>
  );
}
