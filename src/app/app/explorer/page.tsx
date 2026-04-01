"use client";

import { useState } from "react";

type SearchResult =
  | { type: "agent"; data: typeof MOCK_AGENTS[0] }
  | { type: "pact"; data: typeof MOCK_PACTS_DB[0] }
  | null;

const MOCK_AGENTS = [
  {
    address: "0x3aB1c7d8E9f0A2B4C5D6e7F8a1b2C3d4E5f6a7b8",
    short: "0x3aB1...f8c2",
    developer: "0x91eC...a7d0",
    name: "AutoPurchaser v3",
    score: 742,
    status: "Active" as const,
    totalTx: 1_847,
    creditPacts: 12,
    totalBorrowed: "$48,200",
    totalRepaid: "$45,000",
    registered: "Nov 8, 2025",
  },
  {
    address: "0x91eCd4e5F6a7B8c9D0e1F2a3B4c5D6e7F8a9b0c1",
    short: "0x91eC...a7d0",
    developer: "0x5cF9...32b1",
    name: "InventoryBot",
    score: 0,
    status: "Excommunicated" as const,
    totalTx: 312,
    creditPacts: 3,
    totalBorrowed: "$15,000",
    totalRepaid: "$5,000",
    registered: "Dec 1, 2025",
  },
];

const MOCK_PACTS_DB = [
  {
    id: "PCT-0041",
    agent: "0x3aB1...f8c2",
    limit: "$5,000",
    drawn: "$3,200",
    repaid: "$0",
    outstanding: "$3,200",
    status: "Active" as const,
    issuedAt: "Feb 27, 2026 14:32 UTC",
    expiresAt: "Mar 6, 2026 14:32 UTC",
    duration: "7 days",
    tierScore: 742,
  },
  {
    id: "PCT-0039",
    agent: "0x91eC...a7d0",
    limit: "$10,000",
    drawn: "$10,000",
    repaid: "$10,000",
    outstanding: "$0",
    status: "Repaid" as const,
    issuedAt: "Feb 20, 2026 09:15 UTC",
    expiresAt: "Feb 22, 2026 09:15 UTC",
    duration: "48 hours",
    tierScore: 581,
  },
  {
    id: "PCT-0033",
    agent: "0x91eC...a7d0",
    limit: "$5,000",
    drawn: "$5,000",
    repaid: "$0",
    outstanding: "$5,000",
    status: "Defaulted" as const,
    issuedAt: "Feb 10, 2026 11:00 UTC",
    expiresAt: "Feb 11, 2026 11:00 UTC",
    duration: "24 hours",
    tierScore: 412,
  },
];

function ScoreBar({ score }: { score: number }) {
  const pct = (score / 1000) * 100;
  const color = score === 0 ? "bg-red-500" : score < 300 ? "bg-orange-500" : score < 700 ? "bg-yellow-500" : "bg-emerald-500";
  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 h-2 rounded-full bg-neutral-100 overflow-hidden">
        <div className={`h-full rounded-full ${color} transition-all`} style={{ width: `${pct}%` }} />
      </div>
      <span className={`text-sm font-bold font-mono ${score === 0 ? "text-red-600" : ""}`}>{score}</span>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles =
    status === "Active"
      ? "bg-emerald-50 text-emerald-700"
      : status === "Repaid"
      ? "bg-neutral-100 text-neutral-600"
      : status === "Excommunicated" || status === "Defaulted"
      ? "bg-red-50 text-red-700"
      : "bg-neutral-100 text-neutral-600";
  const dot =
    status === "Active" ? "bg-emerald-500" : status === "Repaid" ? "bg-neutral-400" : "bg-red-500";
  return (
    <span className={`inline-flex items-center gap-1.5 text-[11px] font-medium px-2 py-0.5 rounded-full ${styles}`}>
      <div className={`w-1 h-1 rounded-full ${dot}`} />
      {status}
    </span>
  );
}

export default function ExplorerPage() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<SearchResult>(null);
  const [searched, setSearched] = useState(false);

  function handleSearch() {
    if (!query.trim()) return;
    setSearched(true);
    const q = query.trim().toLowerCase();

    // Search agents
    const agent = MOCK_AGENTS.find(
      (a) => a.address.toLowerCase().includes(q) || a.short.toLowerCase().includes(q) || a.name.toLowerCase().includes(q)
    );
    if (agent) {
      setResult({ type: "agent", data: agent });
      return;
    }

    // Search pacts
    const pact = MOCK_PACTS_DB.find((p) => p.id.toLowerCase().includes(q));
    if (pact) {
      setResult({ type: "pact", data: pact });
      return;
    }

    setResult(null);
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Explorer</h1>
        <p className="text-sm text-neutral-500 mt-1">Query any FIBOR ID, agent address, or Credit Pact</p>
      </div>

      {/* Search bar */}
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
            placeholder="Search by agent address, name, or pact ID (try 0x3aB1 or PCT-0041)"
            className="w-full h-12 pl-11 pr-4 rounded-xl border border-black/[0.06] bg-white text-[13px] font-mono focus:outline-none focus:border-black/[0.15] transition-colors placeholder:font-sans placeholder:text-neutral-400"
          />
        </div>
        <button
          onClick={handleSearch}
          className="h-12 px-6 bg-black text-white text-sm font-medium rounded-xl hover:bg-neutral-800 transition-colors shrink-0"
        >
          Search
        </button>
      </div>

      {/* Search results */}
      {searched && !result && (
        <div className="p-8 rounded-xl border border-black/[0.04] bg-white text-center">
          <div className="text-neutral-400 text-sm">No results found for &ldquo;{query}&rdquo;</div>
          <div className="text-neutral-400 text-[12px] mt-1">Try searching for an agent address, name, or pact ID</div>
        </div>
      )}

      {result?.type === "agent" && (
        <div className="space-y-4">
          <div className="p-6 rounded-xl border border-black/[0.04] bg-white">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-lg font-bold">{result.data.name}</h2>
                  <StatusBadge status={result.data.status} />
                </div>
                <div className="text-[12px] font-mono text-neutral-500 break-all">{result.data.address}</div>
              </div>
              <div className="text-[12px] text-neutral-400">Registered {result.data.registered}</div>
            </div>

            <div className="mb-6">
              <div className="text-[11px] text-neutral-400 tracking-wide uppercase mb-2">FIBOR Score</div>
              <ScoreBar score={result.data.score} />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-black/[0.04]">
              <div>
                <div className="text-[10px] text-neutral-400 tracking-wide uppercase mb-1">Developer</div>
                <div className="text-[13px] font-mono">{result.data.developer}</div>
              </div>
              <div>
                <div className="text-[10px] text-neutral-400 tracking-wide uppercase mb-1">Transactions</div>
                <div className="text-[13px] font-mono font-medium">{result.data.totalTx.toLocaleString()}</div>
              </div>
              <div>
                <div className="text-[10px] text-neutral-400 tracking-wide uppercase mb-1">Total Borrowed</div>
                <div className="text-[13px] font-mono font-medium">{result.data.totalBorrowed}</div>
              </div>
              <div>
                <div className="text-[10px] text-neutral-400 tracking-wide uppercase mb-1">Total Repaid</div>
                <div className="text-[13px] font-mono font-medium">{result.data.totalRepaid}</div>
              </div>
            </div>
          </div>

          {/* Agent's pacts */}
          <div className="p-6 rounded-xl border border-black/[0.04] bg-white">
            <h3 className="text-sm font-semibold mb-4">Credit Pacts ({result.data.creditPacts})</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-black/[0.04]">
                    <th className="text-left text-[10px] text-neutral-400 tracking-wide uppercase pb-2.5 font-medium">ID</th>
                    <th className="text-left text-[10px] text-neutral-400 tracking-wide uppercase pb-2.5 font-medium">Limit</th>
                    <th className="text-left text-[10px] text-neutral-400 tracking-wide uppercase pb-2.5 font-medium">Drawn</th>
                    <th className="text-left text-[10px] text-neutral-400 tracking-wide uppercase pb-2.5 font-medium">Status</th>
                    <th className="text-left text-[10px] text-neutral-400 tracking-wide uppercase pb-2.5 font-medium">Duration</th>
                  </tr>
                </thead>
                <tbody>
                  {MOCK_PACTS_DB.filter(p => p.agent === result.data.short).map((p) => (
                    <tr key={p.id} className="border-b border-black/[0.02] last:border-0 cursor-pointer hover:bg-black/[0.01]" onClick={() => { setQuery(p.id); setResult({ type: "pact", data: p }); }}>
                      <td className="py-2.5 text-[12px] font-mono">{p.id}</td>
                      <td className="py-2.5 text-[12px] font-mono">{p.limit}</td>
                      <td className="py-2.5 text-[12px] font-mono">{p.drawn}</td>
                      <td className="py-2.5"><StatusBadge status={p.status} /></td>
                      <td className="py-2.5 text-[12px] font-mono text-neutral-500">{p.duration}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {result?.type === "pact" && (
        <div className="p-6 rounded-xl border border-black/[0.04] bg-white">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-bold font-mono">{result.data.id}</h2>
              <StatusBadge status={result.data.status} />
            </div>
            <div className="text-[11px] text-neutral-400 tracking-wide uppercase">Credit Pact</div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
            {[
              { label: "Agent", value: result.data.agent },
              { label: "Limit", value: result.data.limit },
              { label: "Drawn", value: result.data.drawn },
              { label: "Repaid", value: result.data.repaid },
              { label: "Outstanding", value: result.data.outstanding },
              { label: "Duration", value: result.data.duration },
            ].map((item) => (
              <div key={item.label}>
                <div className="text-[10px] text-neutral-400 tracking-wide uppercase mb-1">{item.label}</div>
                <div className="text-[13px] font-mono font-medium">{item.value}</div>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-lg bg-neutral-50 border border-black/[0.03]">
            <div className="text-[11px] text-neutral-400 tracking-wide uppercase mb-3 font-medium">Term Sheet</div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-[12px]">
              <div>
                <span className="text-neutral-400">Issued</span>
                <div className="font-mono mt-0.5">{result.data.issuedAt}</div>
              </div>
              <div>
                <span className="text-neutral-400">Expires</span>
                <div className="font-mono mt-0.5">{result.data.expiresAt}</div>
              </div>
              <div>
                <span className="text-neutral-400">Agent Score at Issue</span>
                <div className="font-mono mt-0.5">{result.data.tierScore}</div>
              </div>
              <div>
                <span className="text-neutral-400">Interest</span>
                <div className="font-mono mt-0.5 font-medium">0%</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Recent activity feed (always visible) */}
      {!searched && (
        <div className="space-y-4">
          <h2 className="text-sm font-semibold">Recent Protocol Activity</h2>
          <div className="space-y-2">
            {[
              { action: "Credit Pact Issued", id: "PCT-0041", agent: "0x3aB1...f8c2", detail: "$5,000 / 7 days", time: "2m ago" },
              { action: "Repayment", id: "PCT-0039", agent: "0x91eC...a7d0", detail: "$10,000 fully repaid", time: "1h ago" },
              { action: "Agent Registered", id: "--", agent: "0xd4E5...b2c3", detail: "VideoAnalyzer v1", time: "3h ago" },
              { action: "Revenue Distributed", id: "--", agent: "--", detail: "$12,450 to stakers", time: "6h ago" },
              { action: "Default Declared", id: "PCT-0033", agent: "0x91eC...a7d0", detail: "$5,000 unpaid", time: "12h ago" },
              { action: "Credit Drawn", id: "PCT-0037", agent: "0x5cF9...32b1", detail: "$800 of $1,000", time: "18h ago" },
            ].map((event, i) => (
              <div key={i} className="flex items-center gap-4 p-3.5 rounded-xl border border-black/[0.04] bg-white hover:border-black/[0.06] transition-colors">
                <div className={`w-2 h-2 rounded-full shrink-0 ${
                  event.action === "Default Declared" ? "bg-red-500" :
                  event.action === "Repayment" ? "bg-emerald-500" :
                  event.action === "Revenue Distributed" ? "bg-blue-500" :
                  "bg-neutral-300"
                }`} />
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] font-medium">{event.action}</div>
                  <div className="text-[11px] text-neutral-400 font-mono truncate">{event.detail}</div>
                </div>
                {event.agent !== "--" && (
                  <div className="hidden sm:block text-[11px] font-mono text-neutral-400">{event.agent}</div>
                )}
                <div className="text-[11px] text-neutral-400 shrink-0">{event.time}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
