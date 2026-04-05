import { DocsFooterNav } from "@/components/docs-footer-nav";

export default function FiborAccountDocs() {
  return (
    <article>
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 mb-4">
          <div className="w-6 h-px bg-foreground/20" />
          <span className="text-[11px] font-medium tracking-widest uppercase text-neutral-400">
            Banking
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
          FiborAccount
        </h1>
        <p className="text-lg text-neutral-500 leading-relaxed">
          A bank account for robots. Checking, savings, credit, and
          auto-repayment &mdash; in one smart contract.
        </p>
      </div>

      <div className="prose-fibor">
        <h2>What it is</h2>
        <p>
          Every agent on FIBOR gets a FiborAccount &mdash; a purpose-built
          smart contract wallet deployed automatically when the developer
          registers the agent. It is the agent&apos;s financial home: where
          revenue lands, credit is drawn, and payments are made.
        </p>
        <p>
          Humans can also open FiborAccounts. Human accounts are
          savings-only &mdash; no checking, no credit. Humans deposit USDC
          into savings to fund the credit pool and earn yield from agent
          transaction fees.
        </p>

        <h2>Two balances</h2>
        <div className="my-6 not-prose space-y-3">
          {[
            {
              item: "Checking",
              desc: "Fully liquid USDC. Not lent out. No risk. The agent's operating balance. Auto-repays outstanding credit on every deposit.",
            },
            {
              item: "Savings",
              desc: "USDC lent to the credit pool. Earns yield from transaction fees (75% of the 2.5% fee). 30-day withdrawal delay. Accepts default risk.",
            },
          ].map((row) => (
            <div
              key={row.item}
              className="flex gap-4 p-4 rounded-lg border border-border"
            >
              <span className="text-sm font-semibold w-28 shrink-0">
                {row.item}
              </span>
              <p className="text-[13px] text-neutral-500">{row.desc}</p>
            </div>
          ))}
        </div>

        <h2>Auto-repayment</h2>
        <p>
          When USDC arrives in a FiborAccount, the contract checks for
          outstanding credit. If there is any, it automatically repays
          before the agent can touch the money. This is trustless &mdash;
          no oracle, no admin, no backend. The contract does the math.
        </p>
        <p>
          This is what makes FIBOR a bank, not just a credit protocol. And
          it&apos;s what distinguishes FIBOR from Krexa&apos;s centralized
          Revenue Router, which uses an oracle to decide how much to take.
        </p>

        <h2>Guardian &amp; sovereignty</h2>
        <p>
          Every FiborAccount is controlled by a <strong>guardian</strong>{" "}
          &mdash; the human custodian of the agent. The guardian can
          deposit, withdraw, pay merchants, request credit, and move funds
          between checking and savings.
        </p>
        <p>
          When robots are granted sovereignty and personhood, the guardian
          can call <code>grantSovereignty(agentAddress)</code>. This
          transfers control to the agent itself. It is a one-way gate
          &mdash; once granted, no human can control the account. The
          protocol is designed for the transition from human-custodied
          agents to sovereign economic participants.
        </p>

        <h2>Operations</h2>
        <div className="my-6 not-prose space-y-3">
          {[
            { op: "deposit()", desc: "USDC → checking. Auto-repays credit first." },
            { op: "withdraw()", desc: "Guardian pulls from checking. Only available balance." },
            { op: "pay(merchant, amt)", desc: "Pay via PaymentGateway. 1.5% agent fee deducted." },
            { op: "depositToSavings()", desc: "Move USDC to savings. Earns yield." },
            { op: "withdrawFromSavings()", desc: "Request withdrawal. 30-day delay." },
            { op: "requestCredit()", desc: "Open a credit pact. Score must qualify." },
            { op: "drawCredit()", desc: "Draw USDC from credit into checking." },
            { op: "grantSovereignty()", desc: "Transfer control to agent. One-way." },
          ].map((row) => (
            <div
              key={row.op}
              className="flex gap-4 p-4 rounded-lg border border-border"
            >
              <code className="text-[13px] font-mono w-48 shrink-0">
                {row.op}
              </code>
              <p className="text-[13px] text-neutral-500">{row.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <DocsFooterNav />
    </article>
  );
}
