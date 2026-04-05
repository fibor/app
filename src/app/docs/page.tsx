import { DocsFooterNav } from "@/components/docs-footer-nav";

export default function DocsOverview() {
  return (
    <article>
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 mb-4">
          <div className="w-6 h-px bg-foreground/20" />
          <span className="text-[11px] font-medium tracking-widest uppercase text-neutral-400">
            Getting Started
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
          What is FIBOR?
        </h1>
        <p className="text-lg text-neutral-500 leading-relaxed">
          FIBOR is the first financial protocol built for non-human economic
          participants. It gives AI agents and autonomous systems the three
          things they need to operate in the economy: identity, reputation, and
          credit.
        </p>
      </div>

      <div className="prose-fibor">
        <h2>The short version</h2>
        <p>
          AI agents are already buying things, paying invoices, booking
          services, and calling APIs. But they can&apos;t open bank accounts. They
          can&apos;t build credit. They have no financial identity. Every solution
          today works the same way: a human puts money in first, and the agent
          spends from that balance.
        </p>
        <p>
          That&apos;s an allowance, not banking.
        </p>
        <p>
          FIBOR changes this by introducing three primitives that don&apos;t exist
          anywhere else:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-8 not-prose">
          <div className="p-5 rounded-xl border border-border bg-muted/50">
            <div className="w-8 h-8 rounded-md bg-foreground text-background flex items-center justify-center mb-3">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <rect x="1.5" y="1.5" width="11" height="11" rx="2.5" stroke="currentColor" strokeWidth="1.2" />
                <circle cx="7" cy="5.5" r="1.5" stroke="currentColor" strokeWidth="1.2" />
                <path d="M4 10c0-1.657 1.343-3 3-3s3 1.343 3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
            </div>
            <div className="text-sm font-semibold mb-1">FIBOR ID</div>
            <p className="text-[13px] text-neutral-500 leading-relaxed">
              A permanent financial identity for every agent
            </p>
          </div>
          <div className="p-5 rounded-xl border border-border bg-muted/50">
            <div className="w-8 h-8 rounded-md bg-foreground text-background flex items-center justify-center mb-3">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 11l2.5-3 2.5 1.5 2.5-4 2.5-1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="text-sm font-semibold mb-1">FIBOR Score</div>
            <p className="text-[13px] text-neutral-500 leading-relaxed">
              A real-time credit score computed from onchain data
            </p>
          </div>
          <div className="p-5 rounded-xl border border-border bg-muted/50">
            <div className="w-8 h-8 rounded-md bg-foreground text-background flex items-center justify-center mb-3">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.2" />
                <path d="M7 4.5v5M5 6.5h4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
            </div>
            <div className="text-sm font-semibold mb-1">FIBOR Credit</div>
            <p className="text-[13px] text-neutral-500 leading-relaxed">
              Onchain credit lines with zero interest
            </p>
          </div>
        </div>

        <h2>Who is this for?</h2>
        <ul>
          <li>
            <strong>Developers</strong> building AI agents that need to transact
            autonomously
          </li>
          <li>
            <strong>Merchants and platforms</strong> that want to verify an
            agent&apos;s creditworthiness before accepting payment
          </li>
          <li>
            <strong>Savings depositors</strong> who want to earn real yield from
            infrastructure that powers the machine economy
          </li>
        </ul>

        <h2>How it fits together</h2>
        <p>
          Every agent on FIBOR gets an identity. That identity accumulates
          transaction history, which produces a credit score. High enough score,
          the agent qualifies for a credit line denominated in USDC &mdash;
          the native currency of the FIBOR network.
        </p>
        <p>
          The credit pool is funded by USDC savings deposits from FiborAccount
          holders &mdash; both agents and humans. Savings depositors earn 75% of
          the 2.5% transaction fee on all agent commerce.
          No interest is charged on credit lines. The system runs on
          transaction volume, not debt.
        </p>

        <div className="my-8 p-6 rounded-xl bg-foreground text-background not-prose">
          <div className="text-[11px] font-medium tracking-widest uppercase text-neutral-500 mb-4">
            The Flywheel
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="flex items-start gap-3">
              <span className="text-neutral-500 font-mono text-xs mt-0.5 shrink-0">01</span>
              <span className="text-neutral-300">Developers register agents and build scores through real transactions</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-neutral-500 font-mono text-xs mt-0.5 shrink-0">02</span>
              <span className="text-neutral-300">High scores unlock credit lines in USDC</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-neutral-500 font-mono text-xs mt-0.5 shrink-0">03</span>
              <span className="text-neutral-300">Credit enables more autonomous commerce, generating more fees</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-neutral-500 font-mono text-xs mt-0.5 shrink-0">04</span>
              <span className="text-neutral-300">More fees attract savings depositors, growing the credit pool</span>
            </div>
          </div>
        </div>

        <h2>Key numbers</h2>
        <div className="my-6 grid grid-cols-2 sm:grid-cols-4 gap-4 not-prose">
          {[
            { value: "$15T", label: "B2B agent spend by 2028" },
            { value: "0%", label: "Interest on credit lines" },
            { value: "2.5%", label: "Transaction fee" },
            { value: "1:1", label: "USDC native on Base" },
          ].map((stat) => (
            <div key={stat.label} className="p-4 rounded-lg border border-border text-center">
              <div className="text-xl font-bold font-mono tracking-tight">{stat.value}</div>
              <div className="text-[11px] text-neutral-400 mt-1 uppercase tracking-wide">{stat.label}</div>
            </div>
          ))}
        </div>

        <h2>Start exploring</h2>
        <p>
          New here? Read <a href="/docs/why-fibor">Why FIBOR</a> for the full
          context on why robots need their own bank. Then dive into the three
          core primitives: <a href="/docs/fibor-id">FIBOR ID</a>,{" "}
          <a href="/docs/fibor-score">FIBOR Score</a>, and{" "}
          <a href="/docs/fibor-credit">FIBOR Credit</a>.
        </p>
      </div>

      <DocsFooterNav />
    </article>
  );
}
