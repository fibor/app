"use client";

import { useWallet } from "./layout";
import Link from "next/link";

const MOCK_PORTFOLIO = {
  fiborBalance: "24,500.00",
  fiborValue: "$12,250.00",
  stakedAmount: "18,000.00",
  stakedValue: "$9,000.00",
  claimableUsdc: "342.18",
  totalEarned: "1,847.52",
  apy: "18.4%",
};

const MOCK_PACTS = [
  { id: "PCT-0041", agent: "0x3aB1...f8c2", limit: "$5,000", drawn: "$3,200", status: "Active", expires: "23h 14m" },
  { id: "PCT-0039", agent: "0x91eC...a7d0", limit: "$10,000", drawn: "$10,000", status: "Repaid", expires: "--" },
  { id: "PCT-0037", agent: "0x5cF9...32b1", limit: "$1,000", drawn: "$800", status: "Active", expires: "6d 12h" },
];

const MOCK_STATS = [
  { label: "Total Value Locked", value: "$48.2M", change: "+12.3%" },
  { label: "Active Credit Pacts", value: "1,847", change: "+8.1%" },
  { label: "Protocol Revenue (30d)", value: "$892K", change: "+23.7%" },
  { label: "Agents Registered", value: "4,219", change: "+156" },
];

function ConnectPrompt() {
  const { connect } = useWallet();
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
        Connect your wallet to view your FIBOR holdings, manage staking, and explore the protocol.
      </p>
      <button
        onClick={connect}
        className="h-10 px-6 bg-black text-white text-sm font-medium rounded-lg hover:bg-neutral-800 transition-colors"
      >
        Connect Wallet
      </button>
    </div>
  );
}

export default function Dashboard() {
  const { connected } = useWallet();

  if (!connected) return <ConnectPrompt />;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-sm text-neutral-500 mt-1">Overview of your FIBOR protocol activity</p>
      </div>

      {/* Protocol stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {MOCK_STATS.map((stat) => (
          <div key={stat.label} className="p-4 rounded-xl border border-black/[0.04] bg-white">
            <div className="text-[11px] text-neutral-400 tracking-wide uppercase mb-2">{stat.label}</div>
            <div className="text-xl font-bold font-mono tracking-tight">{stat.value}</div>
            <div className="text-[12px] text-emerald-600 font-mono mt-1">{stat.change}</div>
          </div>
        ))}
      </div>

      {/* Portfolio */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Holdings */}
        <div className="lg:col-span-2 p-6 rounded-xl border border-black/[0.04] bg-white">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-sm font-semibold">Your Holdings</h2>
            <Link href="/app/stake" className="text-[12px] text-neutral-500 hover:text-black transition-colors">
              Manage Staking &rarr;
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <div className="text-[11px] text-neutral-400 tracking-wide uppercase mb-1">FIBOR Balance</div>
              <div className="text-2xl font-bold font-mono tracking-tight">{MOCK_PORTFOLIO.fiborBalance}</div>
              <div className="text-sm text-neutral-500 font-mono">{MOCK_PORTFOLIO.fiborValue}</div>
            </div>
            <div>
              <div className="text-[11px] text-neutral-400 tracking-wide uppercase mb-1">Staked</div>
              <div className="text-2xl font-bold font-mono tracking-tight">{MOCK_PORTFOLIO.stakedAmount}</div>
              <div className="text-sm text-neutral-500 font-mono">{MOCK_PORTFOLIO.stakedValue}</div>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-black/[0.04] grid grid-cols-3 gap-4">
            <div>
              <div className="text-[11px] text-neutral-400 tracking-wide uppercase mb-1">Claimable Revenue</div>
              <div className="text-lg font-bold font-mono">${MOCK_PORTFOLIO.claimableUsdc}</div>
            </div>
            <div>
              <div className="text-[11px] text-neutral-400 tracking-wide uppercase mb-1">Total Earned</div>
              <div className="text-lg font-bold font-mono">${MOCK_PORTFOLIO.totalEarned}</div>
            </div>
            <div>
              <div className="text-[11px] text-neutral-400 tracking-wide uppercase mb-1">Current APY</div>
              <div className="text-lg font-bold font-mono text-emerald-600">{MOCK_PORTFOLIO.apy}</div>
            </div>
          </div>
        </div>

        {/* Quick actions */}
        <div className="p-6 rounded-xl border border-black/[0.04] bg-white">
          <h2 className="text-sm font-semibold mb-4">Quick Actions</h2>
          <div className="space-y-2.5">
            <Link
              href="/app/stake"
              className="flex items-center gap-3 p-3 rounded-lg border border-black/[0.04] hover:border-black/[0.08] hover:bg-black/[0.01] transition-all group"
            >
              <div className="w-8 h-8 rounded-md bg-black/[0.03] flex items-center justify-center shrink-0">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M7 2v10M2 7h10" strokeLinecap="round" />
                </svg>
              </div>
              <div>
                <div className="text-[13px] font-medium">Stake FIBOR</div>
                <div className="text-[11px] text-neutral-400">Earn protocol revenue</div>
              </div>
            </Link>
            <button
              className="w-full flex items-center gap-3 p-3 rounded-lg border border-black/[0.04] hover:border-black/[0.08] hover:bg-black/[0.01] transition-all group text-left"
            >
              <div className="w-8 h-8 rounded-md bg-black/[0.03] flex items-center justify-center shrink-0">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M2 7h10M8 3l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div>
                <div className="text-[13px] font-medium">Claim Revenue</div>
                <div className="text-[11px] text-neutral-400">${MOCK_PORTFOLIO.claimableUsdc} available</div>
              </div>
            </button>
            <Link
              href="/app/explorer"
              className="flex items-center gap-3 p-3 rounded-lg border border-black/[0.04] hover:border-black/[0.08] hover:bg-black/[0.01] transition-all group"
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

      {/* Recent credit pacts */}
      <div className="p-6 rounded-xl border border-black/[0.04] bg-white">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold">Recent Credit Pacts</h2>
          <Link href="/app/explorer" className="text-[12px] text-neutral-500 hover:text-black transition-colors">
            View All &rarr;
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-black/[0.04]">
                <th className="text-left text-[11px] text-neutral-400 tracking-wide uppercase pb-3 font-medium">Pact ID</th>
                <th className="text-left text-[11px] text-neutral-400 tracking-wide uppercase pb-3 font-medium">Agent</th>
                <th className="text-left text-[11px] text-neutral-400 tracking-wide uppercase pb-3 font-medium">Limit</th>
                <th className="text-left text-[11px] text-neutral-400 tracking-wide uppercase pb-3 font-medium">Drawn</th>
                <th className="text-left text-[11px] text-neutral-400 tracking-wide uppercase pb-3 font-medium">Status</th>
                <th className="text-left text-[11px] text-neutral-400 tracking-wide uppercase pb-3 font-medium">Expires</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_PACTS.map((pact) => (
                <tr key={pact.id} className="border-b border-black/[0.02] last:border-0">
                  <td className="py-3 text-[13px] font-mono">{pact.id}</td>
                  <td className="py-3 text-[13px] font-mono text-neutral-500">{pact.agent}</td>
                  <td className="py-3 text-[13px] font-mono">{pact.limit}</td>
                  <td className="py-3 text-[13px] font-mono">{pact.drawn}</td>
                  <td className="py-3">
                    <span className={`inline-flex items-center gap-1.5 text-[11px] font-medium px-2 py-0.5 rounded-full ${
                      pact.status === "Active"
                        ? "bg-emerald-50 text-emerald-700"
                        : pact.status === "Repaid"
                        ? "bg-neutral-100 text-neutral-600"
                        : "bg-red-50 text-red-700"
                    }`}>
                      <div className={`w-1 h-1 rounded-full ${
                        pact.status === "Active" ? "bg-emerald-500" : pact.status === "Repaid" ? "bg-neutral-400" : "bg-red-500"
                      }`} />
                      {pact.status}
                    </span>
                  </td>
                  <td className="py-3 text-[13px] font-mono text-neutral-500">{pact.expires}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
