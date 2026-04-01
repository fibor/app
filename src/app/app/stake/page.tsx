"use client";

import { useState } from "react";
import { useWallet } from "../layout";

const POOL_STATS = {
  totalStaked: "12,450,000",
  totalStakers: "2,847",
  apy: "18.4%",
  cooldown: "7 days",
  revenueDistributed30d: "$892,340",
  poolUtilization: "73%",
};

const MY_STAKE = {
  staked: "18,000.00",
  shares: "17,842.31",
  claimable: "342.18",
  totalEarned: "1,847.52",
  stakeSince: "Jan 12, 2026",
  nextDistribution: "2h 14m",
};

const REVENUE_HISTORY = [
  { date: "Feb 28", amount: "$48.21", cumulative: "$1,847.52" },
  { date: "Feb 21", amount: "$52.08", cumulative: "$1,799.31" },
  { date: "Feb 14", amount: "$44.93", cumulative: "$1,747.23" },
  { date: "Feb 7", amount: "$51.17", cumulative: "$1,702.30" },
  { date: "Jan 31", amount: "$47.62", cumulative: "$1,651.13" },
  { date: "Jan 24", amount: "$39.88", cumulative: "$1,603.51" },
];

function ConnectPrompt() {
  const { connect } = useWallet();
  return (
    <div className="flex flex-col items-center justify-center py-32">
      <div className="w-12 h-12 bg-black/[0.03] rounded-xl flex items-center justify-center mb-6">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" strokeLinecap="round" />
        </svg>
      </div>
      <h2 className="text-xl font-semibold tracking-tight mb-2">Connect to stake</h2>
      <p className="text-sm text-neutral-500 mb-6 text-center max-w-sm">
        Connect your wallet to stake FIBOR tokens and earn protocol revenue.
      </p>
      <button onClick={connect} className="h-10 px-6 bg-black text-white text-sm font-medium rounded-lg hover:bg-neutral-800 transition-colors">
        Connect Wallet
      </button>
    </div>
  );
}

export default function StakePage() {
  const { connected } = useWallet();
  const [tab, setTab] = useState<"stake" | "unstake">("stake");
  const [amount, setAmount] = useState("");

  if (!connected) return <ConnectPrompt />;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Staking</h1>
        <p className="text-sm text-neutral-500 mt-1">Stake FIBOR to fund the credit facility and earn revenue</p>
      </div>

      {/* Pool stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {[
          { label: "Total Staked", value: POOL_STATS.totalStaked, suffix: " FIBOR" },
          { label: "Stakers", value: POOL_STATS.totalStakers },
          { label: "Current APY", value: POOL_STATS.apy, highlight: true },
          { label: "Cooldown", value: POOL_STATS.cooldown },
          { label: "Revenue (30d)", value: POOL_STATS.revenueDistributed30d },
          { label: "Utilization", value: POOL_STATS.poolUtilization },
        ].map((stat) => (
          <div key={stat.label} className="p-4 rounded-xl border border-black/[0.04] bg-white">
            <div className="text-[10px] text-neutral-400 tracking-wide uppercase mb-1.5">{stat.label}</div>
            <div className={`text-base font-bold font-mono tracking-tight ${stat.highlight ? "text-emerald-600" : ""}`}>
              {stat.value}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Staking form */}
        <div className="lg:col-span-2 p-6 rounded-xl border border-black/[0.04] bg-white">
          {/* Tabs */}
          <div className="flex mb-6 border-b border-black/[0.04]">
            {(["stake", "unstake"] as const).map((t) => (
              <button
                key={t}
                onClick={() => { setTab(t); setAmount(""); }}
                className={`pb-3 px-4 text-[13px] font-medium border-b-2 transition-colors capitalize ${
                  tab === t ? "border-black text-black" : "border-transparent text-neutral-400 hover:text-neutral-600"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-[12px] text-neutral-500">Amount</label>
                <button
                  onClick={() => setAmount(tab === "stake" ? "6,500.00" : "18,000.00")}
                  className="text-[11px] text-neutral-400 hover:text-black transition-colors"
                >
                  Max: {tab === "stake" ? "6,500.00" : "18,000.00"} FIBOR
                </button>
              </div>
              <div className="relative">
                <input
                  type="text"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full h-12 px-4 pr-20 rounded-lg border border-black/[0.06] bg-white text-base font-mono focus:outline-none focus:border-black/[0.15] transition-colors"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[12px] text-neutral-400 font-mono">FIBOR</span>
              </div>
            </div>

            {tab === "unstake" && (
              <div className="p-3 rounded-lg bg-neutral-50 border border-black/[0.03]">
                <div className="flex items-center gap-2 text-[12px] text-neutral-500">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="6" cy="6" r="5" />
                    <path d="M6 4v3l2 1" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  7-day cooldown period applies after requesting unstake
                </div>
              </div>
            )}

            <button className="w-full h-11 bg-black text-white text-sm font-medium rounded-lg hover:bg-neutral-800 transition-colors capitalize">
              {tab === "stake" ? "Stake FIBOR" : "Request Unstake"}
            </button>

            {tab === "stake" && (
              <p className="text-[11px] text-neutral-400 text-center">
                Staked FIBOR funds the credit pool. You earn 70% of protocol fees proportional to your share.
              </p>
            )}
          </div>
        </div>

        {/* Your position + revenue history */}
        <div className="lg:col-span-3 space-y-4">
          {/* Position */}
          <div className="p-6 rounded-xl border border-black/[0.04] bg-white">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold">Your Position</h2>
              <span className="text-[11px] text-neutral-400 font-mono">Since {MY_STAKE.stakeSince}</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <div className="text-[10px] text-neutral-400 tracking-wide uppercase mb-1">Staked</div>
                <div className="text-lg font-bold font-mono">{MY_STAKE.staked}</div>
              </div>
              <div>
                <div className="text-[10px] text-neutral-400 tracking-wide uppercase mb-1">Shares</div>
                <div className="text-lg font-bold font-mono">{MY_STAKE.shares}</div>
              </div>
              <div>
                <div className="text-[10px] text-neutral-400 tracking-wide uppercase mb-1">Claimable</div>
                <div className="text-lg font-bold font-mono text-emerald-600">${MY_STAKE.claimable}</div>
              </div>
              <div>
                <div className="text-[10px] text-neutral-400 tracking-wide uppercase mb-1">Total Earned</div>
                <div className="text-lg font-bold font-mono">${MY_STAKE.totalEarned}</div>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-black/[0.04] flex items-center justify-between">
              <span className="text-[12px] text-neutral-500">Next distribution in <span className="font-mono font-medium text-black">{MY_STAKE.nextDistribution}</span></span>
              <button className="h-8 px-4 bg-black text-white text-[12px] font-medium rounded-md hover:bg-neutral-800 transition-colors">
                Claim ${MY_STAKE.claimable}
              </button>
            </div>
          </div>

          {/* Revenue history */}
          <div className="p-6 rounded-xl border border-black/[0.04] bg-white">
            <h2 className="text-sm font-semibold mb-4">Revenue History</h2>
            <table className="w-full">
              <thead>
                <tr className="border-b border-black/[0.04]">
                  <th className="text-left text-[10px] text-neutral-400 tracking-wide uppercase pb-2.5 font-medium">Date</th>
                  <th className="text-left text-[10px] text-neutral-400 tracking-wide uppercase pb-2.5 font-medium">Distribution</th>
                  <th className="text-left text-[10px] text-neutral-400 tracking-wide uppercase pb-2.5 font-medium">Cumulative</th>
                </tr>
              </thead>
              <tbody>
                {REVENUE_HISTORY.map((row) => (
                  <tr key={row.date} className="border-b border-black/[0.02] last:border-0">
                    <td className="py-2.5 text-[12px] text-neutral-500">{row.date}</td>
                    <td className="py-2.5 text-[12px] font-mono font-medium text-emerald-600">{row.amount}</td>
                    <td className="py-2.5 text-[12px] font-mono text-neutral-500">{row.cumulative}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
