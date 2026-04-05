"use client";

import { useState } from "react";
import { useReadContract } from "wagmi";
import { CONTRACTS } from "@/lib/contracts";
import { formatUSDC, formatScore, shortAddress } from "@/lib/format";

function StatusBadge({ status }: { status: number }) {
  const labels = ["Active", "Suspended", "Excommunicated"];
  const label = labels[status] || "Unknown";
  const styles =
    status === 0
      ? "bg-emerald-50 text-emerald-700"
      : status === 2
      ? "bg-red-50 text-red-700"
      : "bg-neutral-100 text-neutral-600";
  const dot = status === 0 ? "bg-emerald-500" : status === 2 ? "bg-red-500" : "bg-neutral-400";
  return (
    <span className={`inline-flex items-center gap-1.5 text-[11px] font-medium px-2 py-0.5 rounded-full ${styles}`}>
      <div className={`w-1 h-1 rounded-full ${dot}`} />
      {label}
    </span>
  );
}

function AgentResult({ address }: { address: `0x${string}` }) {
  const { data: identity } = useReadContract({
    ...CONTRACTS.fiborId,
    functionName: "identities",
    args: [address],
  });

  const id = identity as [string, string, string, bigint, number] | undefined;
  const accountAddr = id?.[1] as `0x${string}` | undefined;
  const createdAt = id?.[3] ? Number(id[3]) : 0;
  const status = id?.[4] ?? 0;

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

  const { data: fullScore } = useReadContract({
    ...CONTRACTS.fiborScore,
    functionName: "scores",
    args: accountAddr ? [accountAddr] : undefined,
    query: { enabled: !!accountAddr },
  });

  const scoreData = fullScore as [bigint, bigint, bigint, bigint, boolean] | undefined;

  if (!createdAt) {
    return (
      <div className="p-8 rounded-xl border border-border bg-card text-center">
        <div className="text-neutral-400 text-sm">No FIBOR ID found for this address</div>
      </div>
    );
  }

  return (
    <div className="p-6 rounded-xl border border-border bg-card">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h2 className="text-lg font-bold">FIBOR Identity</h2>
            <StatusBadge status={status} />
          </div>
          <div className="text-[12px] font-mono text-neutral-500 break-all">{address}</div>
        </div>
        <div className="text-[12px] text-neutral-400">
          Registered {new Date(createdAt * 1000).toLocaleDateString()}
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-border">
        <div>
          <div className="text-[10px] text-neutral-400 tracking-wide uppercase mb-1">Developer</div>
          <div className="text-[13px] font-mono">{shortAddress(id?.[0])}</div>
        </div>
        <div>
          <div className="text-[10px] text-neutral-400 tracking-wide uppercase mb-1">FiborAccount</div>
          <div className="text-[13px] font-mono">{shortAddress(accountAddr)}</div>
        </div>
        <div>
          <div className="text-[10px] text-neutral-400 tracking-wide uppercase mb-1">FIBOR Score</div>
          <div className="text-[13px] font-mono font-medium">{formatScore(score as bigint)}</div>
        </div>
        <div>
          <div className="text-[10px] text-neutral-400 tracking-wide uppercase mb-1">Max Credit Line</div>
          <div className="text-[13px] font-mono font-medium">{formatUSDC(maxCredit as bigint)}</div>
        </div>
      </div>

      {scoreData && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4 pt-4 border-t border-border">
          <div>
            <div className="text-[10px] text-neutral-400 tracking-wide uppercase mb-1">Volume Repaid</div>
            <div className="text-[13px] font-mono">{formatUSDC(scoreData[0])}</div>
          </div>
          <div>
            <div className="text-[10px] text-neutral-400 tracking-wide uppercase mb-1">Repayments</div>
            <div className="text-[13px] font-mono">{Number(scoreData[1])}</div>
          </div>
          <div>
            <div className="text-[10px] text-neutral-400 tracking-wide uppercase mb-1">Defaults</div>
            <div className="text-[13px] font-mono">{Number(scoreData[3])}</div>
          </div>
          <div>
            <div className="text-[10px] text-neutral-400 tracking-wide uppercase mb-1">Excommunicated</div>
            <div className="text-[13px] font-mono">{scoreData[4] ? "Yes" : "No"}</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ExplorerPage() {
  const [query, setQuery] = useState("");
  const [searchAddress, setSearchAddress] = useState<`0x${string}` | null>(null);

  function handleSearch() {
    const q = query.trim();
    if (q.startsWith("0x") && q.length === 42) {
      setSearchAddress(q as `0x${string}`);
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Explorer</h1>
        <p className="text-sm text-neutral-500 mt-1">Query any FIBOR ID by address</p>
      </div>

      <div className="flex gap-3">
        <div className="relative flex-1">
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="7" cy="7" r="5" />
            <path d="M11 11l3 3" strokeLinecap="round" />
          </svg>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="Enter an address (0x...)"
            className="w-full h-12 pl-11 pr-4 rounded-xl border border-border bg-card text-[13px] font-mono focus:outline-none focus:border-black/[0.15] transition-colors placeholder:font-sans placeholder:text-neutral-400"
          />
        </div>
        <button
          onClick={handleSearch}
          className="h-12 px-6 bg-primary text-primary-foreground text-sm font-medium rounded-xl hover:bg-primary/90 transition-colors shrink-0"
        >
          Search
        </button>
      </div>

      {searchAddress && <AgentResult address={searchAddress} />}

      {!searchAddress && (
        <div className="p-8 rounded-xl border border-border bg-card text-center">
          <div className="text-neutral-400 text-sm">
            Enter an agent or human address to look up their FIBOR identity, score, and credit history.
          </div>
        </div>
      )}
    </div>
  );
}
