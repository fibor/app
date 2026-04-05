"use client";

import Link from "next/link";
import Image from "next/image";
import { useReadContract } from "wagmi";
import { CONTRACTS } from "@/lib/contracts";
import { formatUSDC, formatUSDCCompact } from "@/lib/format";

function StatCard({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="p-6 rounded-xl border border-border bg-card">
      <div className="text-[10px] text-neutral-400 tracking-widest uppercase mb-2">{label}</div>
      <div className="text-2xl sm:text-3xl font-bold font-mono tracking-tight">{value}</div>
      {sub && <div className="text-[12px] text-neutral-400 mt-1 font-mono">{sub}</div>}
    </div>
  );
}

export default function StatsPage() {
  const { data: totalSavings } = useReadContract({
    ...CONTRACTS.creditPool,
    functionName: "totalSavings",
  });

  const { data: totalLent } = useReadContract({
    ...CONTRACTS.creditPool,
    functionName: "totalLent",
  });

  const { data: totalRegistered } = useReadContract({
    ...CONTRACTS.fiborId,
    functionName: "totalRegistered",
  });

  const { data: nextPactId } = useReadContract({
    ...CONTRACTS.creditPool,
    functionName: "nextPactId",
  });

  const { data: totalProcessed } = useReadContract({
    ...CONTRACTS.paymentGateway,
    functionName: "totalProcessed",
  });

  const { data: totalPayments } = useReadContract({
    ...CONTRACTS.paymentGateway,
    functionName: "totalPayments",
  });

  const { data: totalCollected } = useReadContract({
    ...CONTRACTS.revenueDistributor,
    functionName: "totalCollected",
  });

  const { data: totalToDepositors } = useReadContract({
    ...CONTRACTS.revenueDistributor,
    functionName: "totalToDepositors",
  });

  const { data: totalToTreasury } = useReadContract({
    ...CONTRACTS.revenueDistributor,
    functionName: "totalToTreasury",
  });

  const savings = totalSavings as bigint | undefined;
  const lent = totalLent as bigint | undefined;
  const utilization = savings && lent && savings > 0n
    ? Number((lent * 100n) / savings)
    : 0;
  const pacts = nextPactId ? Number(nextPactId) - 1 : 0;

  return (
    <div className="min-h-screen bg-muted font-sans grid-bg-dense">
      {/* Header */}
      <nav className="h-16 flex items-center justify-between px-6 sm:px-12 border-b border-border">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/fibor-icon.png" alt="" width={24} height={24} className="h-6 w-6 dark:invert" />
          <span className="text-[15px] font-semibold tracking-tight">FIBOR</span>
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/docs" className="text-[13px] text-neutral-400 hover:text-foreground transition-colors">
            Docs
          </Link>
          <Link href="/app" className="text-[13px] text-neutral-400 hover:text-foreground transition-colors">
            Open App
          </Link>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 sm:px-12 py-16">
        {/* Title */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-6 h-px bg-black/20" />
            <span className="text-[11px] font-medium tracking-widest uppercase text-neutral-400">
              Protocol Analytics
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">
            FIBOR Stats
          </h1>
          <p className="text-neutral-500">
            Live protocol data from Base Sepolia. All numbers read directly from smart contracts.
          </p>
        </div>

        {/* Pool Stats */}
        <div className="mb-12">
          <h2 className="text-sm font-semibold mb-4 text-neutral-400 uppercase tracking-widest">Credit Pool</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard label="Total Savings" value={formatUSDCCompact(savings)} sub={formatUSDC(savings)} />
            <StatCard label="Credit Outstanding" value={formatUSDCCompact(lent)} sub={formatUSDC(lent)} />
            <StatCard label="Available Liquidity" value={formatUSDC(savings && lent ? savings - lent : undefined)} />
            <StatCard label="Utilization" value={utilization + "%"} />
          </div>
        </div>

        {/* Identity & Credit */}
        <div className="mb-12">
          <h2 className="text-sm font-semibold mb-4 text-neutral-400 uppercase tracking-widest">Identity & Credit</h2>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            <StatCard label="Total Registered" value={totalRegistered ? Number(totalRegistered).toString() : "0"} sub="agents + humans" />
            <StatCard label="Credit Pacts Issued" value={pacts.toString()} sub="lifetime" />
            <StatCard label="Pact Duration" value="30 days" sub="all pacts" />
          </div>
        </div>

        {/* Transaction Volume */}
        <div className="mb-12">
          <h2 className="text-sm font-semibold mb-4 text-neutral-400 uppercase tracking-widest">Transaction Volume</h2>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            <StatCard label="Total Processed" value={formatUSDCCompact(totalProcessed as bigint)} sub={formatUSDC(totalProcessed as bigint)} />
            <StatCard label="Total Payments" value={totalPayments ? Number(totalPayments).toString() : "0"} />
            <StatCard label="Avg Payment" value={
              totalPayments && totalProcessed && Number(totalPayments) > 0
                ? formatUSDC((totalProcessed as bigint) / BigInt(Number(totalPayments)))
                : "$0.00"
            } />
          </div>
        </div>

        {/* Revenue */}
        <div className="mb-12">
          <h2 className="text-sm font-semibold mb-4 text-neutral-400 uppercase tracking-widest">Revenue</h2>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            <StatCard label="Total Fees Collected" value={formatUSDC(totalCollected as bigint)} sub="2.5% of volume" />
            <StatCard label="To Savings Depositors" value={formatUSDC(totalToDepositors as bigint)} sub="75%" />
            <StatCard label="To Treasury" value={formatUSDC(totalToTreasury as bigint)} sub="25%" />
          </div>
        </div>

        {/* Contract Addresses */}
        <div className="mb-12">
          <h2 className="text-sm font-semibold mb-4 text-neutral-400 uppercase tracking-widest">Contracts (Base Sepolia)</h2>
          <div className="p-6 rounded-xl border border-border bg-card overflow-x-auto">
            <table className="w-full">
              <tbody className="text-[13px] font-mono">
                {[
                  { name: "FiborID", addr: "0xa2dd2c0b37d81915d25601147b5607842ca205bc" },
                  { name: "FiborScore", addr: "0x229e1d18c266216fe5a4d6ec039f35a902368624" },
                  { name: "CreditPool", addr: "0xac8fee7730a72dac5e16e4e9b5f1d31c967c69ed" },
                  { name: "PaymentGateway", addr: "0x1d180da78df91a90e15651141708d4ef66485a57" },
                  { name: "RevenueDistributor", addr: "0x8ce79fb30fb367f00c56b92f633ae6e45396101f" },
                  { name: "FiborAccountFactory", addr: "0x1fe6dca24de196fe4609384ebc1c87fe32daf5fd" },
                  { name: "FIBORToken", addr: "0x28f8050adf4bd1dcde4ea6d0a2252aa18a132f07" },
                  { name: "MockUSDC", addr: "0xa714e359a92716f6c0a4c5031cb9922aa5e64eff" },
                ].map((c) => (
                  <tr key={c.name} className="border-b border-border last:border-0">
                    <td className="py-2.5 pr-4 text-neutral-500 font-sans text-[12px]">{c.name}</td>
                    <td className="py-2.5">
                      <a
                        href={`https://base-sepolia.blockscout.com/address/${c.addr}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-neutral-600 hover:text-foreground transition-colors"
                      >
                        {c.addr}
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center pt-8 border-t border-border">
          <p className="text-[11px] text-neutral-300 font-mono tracking-wider">
            FIBOR PROTOCOL &middot; BASE SEPOLIA &middot; ALL DATA READ FROM SMART CONTRACTS
          </p>
        </div>
      </div>
    </div>
  );
}
