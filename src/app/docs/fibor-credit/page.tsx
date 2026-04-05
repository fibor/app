import { DocsFooterNav } from "@/components/docs-footer-nav";

export default function FiborCredit() {
  return (
    <article>
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 mb-4">
          <div className="w-6 h-px bg-black/20" />
          <span className="text-[11px] font-medium tracking-widest uppercase text-neutral-400">
            Core Primitives
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
          FIBOR Credit
        </h1>
        <p className="text-lg text-neutral-500 leading-relaxed">
          Onchain credit lines for qualified agents. No interest. No
          collateral. Just a score and a track record.
        </p>
      </div>

      <div className="prose-fibor">
        <h2>How credit works</h2>
        <p>
          New agents get a micro credit seed ($100&ndash;$500) based on
          their developer&apos;s reputation. As agents repay, their credit
          limit grows to 25% of total volume repaid. The credit
          facility is funded by USDC savings deposits from FiborAccount
          holders &mdash; both agents and humans.
        </p>
        <p>
          The agent draws USDC from the credit pool into their
          FiborAccount. They transact via the x402 facilitator, paying
          the standard 2.5% fee on each transaction. Revenue flows back
          into FiborAccount and auto-repays the outstanding credit.
          No interest. The agent repays exactly what it borrowed.
        </p>

        <div className="my-8 p-6 rounded-xl bg-muted border border-border not-prose">
          <div className="text-[13px] font-semibold mb-2">
            Credit limit = 25% of proven volume
          </div>
          <p className="text-[13px] text-neutral-500 leading-relaxed">
            An agent that has repaid $100K can borrow up to $25K. An agent
            that has repaid $1M can borrow up to $250K. This makes fraud
            structurally unprofitable &mdash; you spend more building
            reputation than you can steal with it.
          </p>
        </div>

        <h2>Credit pact lifecycle</h2>
        <div className="my-6 not-prose space-y-3">
          {[
            { step: "1", title: "Qualification", desc: "Agent has an active FIBOR ID and qualifying score (or developer reputation for new agents)." },
            { step: "2", title: "Pact issuance", desc: "Agent self-issues a credit pact with amount and 30-day repayment window. No admin approval." },
            { step: "3", title: "Draw", desc: "USDC is transferred from the credit pool into the agent's FiborAccount checking balance." },
            { step: "4", title: "Commerce", desc: "Agent transacts via the x402 facilitator. 1% merchant + 1.5% agent fee on each payment." },
            { step: "5", title: "Auto-repay", desc: "Revenue flows into FiborAccount. Outstanding credit is repaid automatically before the agent can touch the money." },
            { step: "6", title: "Refresh", desc: "Full repayment closes the pact, boosts the score, and increases the agent's credit limit for next time." },
          ].map((item) => (
            <div key={item.step} className="flex gap-4 p-4 rounded-lg border border-border">
              <div className="text-[11px] font-mono text-neutral-400 mt-0.5 shrink-0">{item.step}</div>
              <div>
                <div className="text-sm font-semibold mb-0.5">{item.title}</div>
                <p className="text-[13px] text-neutral-500 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <h2>Why zero interest?</h2>
        <p>
          FIBOR does not charge interest on credit lines. The protocol earns
          from the 2.5% transaction fee on commerce, not from interest on
          principal. This is the toll model: depositors fund infrastructure,
          agents pay tolls for using it, depositors earn from those tolls.
        </p>

        <div className="my-8 p-6 rounded-xl bg-black text-white not-prose">
          <div className="text-[11px] font-medium tracking-widest uppercase text-neutral-500 mb-4">
            Example
          </div>
          <div className="space-y-2 text-sm text-neutral-300">
            <p>An agent borrows <span className="text-white font-mono">$1,000</span> from the credit pool.</p>
            <p>It conducts <span className="text-white font-mono">$1,000</span> in transactions, paying <span className="text-white font-mono">$25</span> in fees (2.5%).</p>
            <p>Revenue flows into FiborAccount. Auto-repay returns the full <span className="text-white font-mono">$1,000</span> to the pool.</p>
            <p className="pt-2 border-t border-white/10">The pool earns <span className="text-white font-mono">$25</span> in fees. The agent repaid exactly what it borrowed. No interest.</p>
          </div>
        </div>

        <h2>The pool</h2>
        <p>
          Credit lines are backed by the FIBOR credit facility &mdash; a pool of
          USDC funded by savings deposits from agents and humans. The pool
          maintains a liquidity buffer for depositor withdrawals. The rest
          is deployed as agent credit lines.
        </p>
        <p>
          Learn more about how savings work in{" "}
          <a href="/docs/staking">Savings & Yield</a>.
        </p>
      </div>

      <DocsFooterNav />
    </article>
  );
}
