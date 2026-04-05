"use client";

import { useState } from "react";
import { useWallet } from "../layout";

type FilterType = "all" | "stake" | "unstake" | "claim" | "revenue";

const HISTORY = [
  { id: "TX-0092", type: "revenue" as const, action: "Revenue Distribution", amount: "+$48.21", token: "USDC", date: "Feb 28, 2026", time: "12:00 UTC", hash: "0xa1b2...c3d4" },
  { id: "TX-0089", type: "claim" as const, action: "Revenue Claimed", amount: "-$296.14", token: "USDC", date: "Feb 25, 2026", time: "09:18 UTC", hash: "0xd5e6...f7a8" },
  { id: "TX-0085", type: "revenue" as const, action: "Revenue Distribution", amount: "+$52.08", token: "USDC", date: "Feb 21, 2026", time: "12:00 UTC", hash: "0xb9c0...d1e2" },
  { id: "TX-0081", type: "stake" as const, action: "Staked FIBOR", amount: "+5,000.00", token: "FIBOR", date: "Feb 18, 2026", time: "14:42 UTC", hash: "0xf3a4...b5c6" },
  { id: "TX-0078", type: "revenue" as const, action: "Revenue Distribution", amount: "+$44.93", token: "USDC", date: "Feb 14, 2026", time: "12:00 UTC", hash: "0xd7e8...f9a0" },
  { id: "TX-0075", type: "revenue" as const, action: "Revenue Distribution", amount: "+$51.17", token: "USDC", date: "Feb 7, 2026", time: "12:00 UTC", hash: "0xa1b2...c3d4" },
  { id: "TX-0071", type: "claim" as const, action: "Revenue Claimed", amount: "-$412.30", token: "USDC", date: "Feb 3, 2026", time: "16:21 UTC", hash: "0xe5f6...a7b8" },
  { id: "TX-0068", type: "revenue" as const, action: "Revenue Distribution", amount: "+$47.62", token: "USDC", date: "Jan 31, 2026", time: "12:00 UTC", hash: "0xc9d0...e1f2" },
  { id: "TX-0064", type: "stake" as const, action: "Staked FIBOR", amount: "+8,000.00", token: "FIBOR", date: "Jan 28, 2026", time: "10:05 UTC", hash: "0xa3b4...c5d6" },
  { id: "TX-0060", type: "revenue" as const, action: "Revenue Distribution", amount: "+$39.88", token: "USDC", date: "Jan 24, 2026", time: "12:00 UTC", hash: "0xe7f8...a9b0" },
  { id: "TX-0055", type: "revenue" as const, action: "Revenue Distribution", amount: "+$42.15", token: "USDC", date: "Jan 17, 2026", time: "12:00 UTC", hash: "0xc1d2...e3f4" },
  { id: "TX-0050", type: "stake" as const, action: "Staked FIBOR", amount: "+5,000.00", token: "FIBOR", date: "Jan 12, 2026", time: "08:33 UTC", hash: "0xa5b6...c7d8" },
];

const SUMMARY = {
  totalStaked: "18,000.00 FIBOR",
  totalClaimed: "$708.44 USDC",
  totalRevenue: "$1,847.52 USDC",
  transactions: "12",
};

function ConnectPrompt() {
  const { connect } = useWallet();
  return (
    <div className="flex flex-col items-center justify-center py-32">
      <div className="w-12 h-12 bg-muted rounded-xl flex items-center justify-center mb-6">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 8v8M8 12h8" strokeLinecap="round" />
          <rect x="3" y="3" width="18" height="18" rx="3" />
        </svg>
      </div>
      <h2 className="text-xl font-semibold tracking-tight mb-2">Connect to view history</h2>
      <p className="text-sm text-neutral-500 mb-6 text-center max-w-sm">
        Connect your wallet to view your transaction history and revenue disbursements.
      </p>
      <button onClick={connect} className="h-10 px-6 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors">
        Connect Wallet
      </button>
    </div>
  );
}

export default function HistoryPage() {
  const { connected } = useWallet();
  const [filter, setFilter] = useState<FilterType>("all");

  if (!connected) return <ConnectPrompt />;

  const filtered = filter === "all" ? HISTORY : HISTORY.filter((tx) => tx.type === filter);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">History</h1>
        <p className="text-sm text-neutral-500 mt-1">Your complete transaction and revenue history</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: "Total Staked", value: SUMMARY.totalStaked },
          { label: "Total Revenue", value: SUMMARY.totalRevenue },
          { label: "Total Claimed", value: SUMMARY.totalClaimed },
          { label: "Transactions", value: SUMMARY.transactions },
        ].map((stat) => (
          <div key={stat.label} className="p-4 rounded-xl border border-black/[0.04] bg-white">
            <div className="text-[10px] text-neutral-400 tracking-wide uppercase mb-1.5">{stat.label}</div>
            <div className="text-base font-bold font-mono tracking-tight">{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 flex-wrap">
        {([
          { key: "all", label: "All" },
          { key: "revenue", label: "Revenue" },
          { key: "stake", label: "Staking" },
          { key: "claim", label: "Claims" },
          { key: "unstake", label: "Unstaking" },
        ] as { key: FilterType; label: string }[]).map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={`px-3 py-1.5 rounded-md text-[12px] font-medium transition-colors ${
              filter === key
                ? "bg-primary text-primary-foreground"
                : "bg-card text-neutral-500 border border-border hover:text-foreground"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Transaction list */}
      <div className="rounded-xl border border-black/[0.04] bg-white overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-black/[0.04] bg-neutral-50/50">
                <th className="text-left text-[10px] text-neutral-400 tracking-wide uppercase p-4 font-medium">TX</th>
                <th className="text-left text-[10px] text-neutral-400 tracking-wide uppercase p-4 font-medium">Action</th>
                <th className="text-left text-[10px] text-neutral-400 tracking-wide uppercase p-4 font-medium">Amount</th>
                <th className="text-left text-[10px] text-neutral-400 tracking-wide uppercase p-4 font-medium">Token</th>
                <th className="text-left text-[10px] text-neutral-400 tracking-wide uppercase p-4 font-medium">Date</th>
                <th className="text-left text-[10px] text-neutral-400 tracking-wide uppercase p-4 font-medium">Hash</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((tx) => (
                <tr key={tx.id} className="border-b border-border last:border-0 hover:bg-muted transition-colors">
                  <td className="p-4 text-[12px] font-mono">{tx.id}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-1.5 h-1.5 rounded-full ${
                        tx.type === "revenue" ? "bg-blue-500" :
                        tx.type === "stake" ? "bg-emerald-500" :
                        tx.type === "claim" ? "bg-amber-500" :
                        "bg-neutral-400"
                      }`} />
                      <span className="text-[13px]">{tx.action}</span>
                    </div>
                  </td>
                  <td className={`p-4 text-[13px] font-mono font-medium ${
                    tx.amount.startsWith("+") && tx.type === "revenue" ? "text-emerald-600" :
                    tx.amount.startsWith("-") ? "text-neutral-600" : ""
                  }`}>
                    {tx.amount}
                  </td>
                  <td className="p-4 text-[12px] font-mono text-neutral-500">{tx.token}</td>
                  <td className="p-4">
                    <div className="text-[12px]">{tx.date}</div>
                    <div className="text-[11px] text-neutral-400">{tx.time}</div>
                  </td>
                  <td className="p-4">
                    <span className="text-[12px] font-mono text-neutral-400 hover:text-foreground cursor-pointer transition-colors">
                      {tx.hash}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div className="p-8 text-center text-sm text-neutral-400">
            No transactions matching this filter
          </div>
        )}
      </div>
    </div>
  );
}
