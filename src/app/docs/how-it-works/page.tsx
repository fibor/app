import { DocsFooterNav } from "@/components/docs-footer-nav";

export default function HowItWorks() {
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
          How It Works
        </h1>
        <p className="text-lg text-neutral-500 leading-relaxed">
          From registration to credit line, in five steps.
        </p>
      </div>

      <div className="prose-fibor">
        <div className="my-8 not-prose space-y-4">
          {[
            {
              step: "01",
              title: "Register an agent",
              desc: "A developer registers their AI agent on the FIBOR network and receives a FIBOR ID. This is a permanent financial identity that records who built the agent, what it does, and every financial action it takes.",
            },
            {
              step: "02",
              title: "Build a score",
              desc: "The agent transacts through FIBOR, and every repayment is recorded onchain. Over time, repayments produce a FIBOR Score — a multiplicative credit rating with no cap. Score = volume repaid \u00d7 repayments \u00d7 months active.",
            },
            {
              step: "03",
              title: "Qualify for credit",
              desc: "New agents get a micro credit seed ($100\u2013$500) based on developer reputation. As they repay, their credit limit grows to 25% of total volume repaid. Fraud is structurally unprofitable.",
            },
            {
              step: "04",
              title: "Transact with USDC",
              desc: "Credit lines are denominated in USDC — USDC flowing through the FIBOR network. The agent spends via the x402 facilitator, merchants get identity verification, and the agent repays what it used. No interest.",
            },
            {
              step: "05",
              title: "Repay and repeat",
              desc: "The agent repays within its window and its score improves. Better score means more credit. The cycle continues, building a permanent financial reputation for the machine.",
            },
          ].map((item) => (
            <div
              key={item.step}
              className="flex gap-5 p-5 rounded-xl border border-border bg-card hover:bg-muted/50 transition-colors"
            >
              <div className="text-[11px] font-mono text-neutral-400 mt-0.5 shrink-0">
                {item.step}
              </div>
              <div>
                <div className="text-sm font-semibold mb-1">{item.title}</div>
                <p className="text-[13px] text-neutral-500 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        <h2>The participants</h2>
        <p>
          FIBOR has three types of participants, each making the system more
          valuable for the others:
        </p>

        <div className="my-6 not-prose grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-xl border border-border">
            <div className="text-sm font-semibold mb-2">Developers</div>
            <p className="text-[13px] text-neutral-500 leading-relaxed">
              Build agents, register them on FIBOR, and build credit scores
              through real transaction history. More agents means more data
              and more commerce.
            </p>
          </div>
          <div className="p-5 rounded-xl border border-border">
            <div className="text-sm font-semibold mb-2">Savings depositors</div>
            <p className="text-[13px] text-neutral-500 leading-relaxed">
              Deposit USDC into savings accounts (agents or humans). Deposits
              fund the credit facility. Depositors earn 75% of the 2.5%
              transaction fee on all agent commerce.
            </p>
          </div>
          <div className="p-5 rounded-xl border border-border">
            <div className="text-sm font-semibold mb-2">Merchants</div>
            <p className="text-[13px] text-neutral-500 leading-relaxed">
              Accept USDC and query FIBOR Scores to assess
              trustworthiness before transacting with an agent.
            </p>
          </div>
        </div>

        <h2>The flywheel</h2>
        <p>
          Each participant makes the system more valuable for every other
          participant:
        </p>
        <ul>
          <li>More developers means more agents means more transactions</li>
          <li>More transactions means more fees means better depositor yields</li>
          <li>Better yields attract more deposits means bigger credit pool</li>
          <li>Bigger pool means more credit available means more developers</li>
        </ul>
        <p>
          This is the same flywheel that powers every successful financial
          network. More participants, more activity, more value, more
          participants.
        </p>
      </div>

      <DocsFooterNav />
    </article>
  );
}
