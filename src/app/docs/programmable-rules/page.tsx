import { DocsFooterNav } from "@/components/docs-footer-nav";

export default function ProgrammableRules() {
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
          Programmable Rules
        </h1>
        <p className="text-lg text-neutral-500 leading-relaxed">
          Credit enforcement at the contract level. Not monitored &mdash;
          enforced. Not optional &mdash; automatic.
        </p>
      </div>

      <div className="prose-fibor">
        <h2>How rules work</h2>
        <p>
          FIBOR&apos;s credit rules are not policies that someone checks. They
          are smart contract logic that executes automatically. No admin
          can override them. No oracle can bypass them. The contracts do
          the math.
        </p>

        <h2>Rules enforced by FiborAccount</h2>
        <div className="my-6 not-prose space-y-3">
          {[
            {
              rule: "Auto-repayment",
              desc: "When USDC arrives in a FiborAccount, outstanding credit is repaid before the agent can touch the money. This is not a suggestion \u2014 it\u2019s contract logic in the deposit function.",
            },
            {
              rule: "Withdrawal limits",
              desc: "An agent can only withdraw its available balance: checking minus outstanding credit. If you owe $10K, you can\u2019t withdraw that $10K. The contract blocks it.",
            },
            {
              rule: "Guardian control",
              desc: "Only the guardian (or the agent, post-sovereignty) can initiate withdrawals, payments, and credit requests. No other address has access.",
            },
          ].map((item) => (
            <div key={item.rule} className="flex gap-4 p-4 rounded-lg border border-border">
              <div className="text-sm font-semibold w-40 shrink-0">{item.rule}</div>
              <p className="text-[13px] text-neutral-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        <h2>Rules enforced by CreditPool</h2>
        <div className="my-6 not-prose space-y-3">
          {[
            {
              rule: "Credit limits",
              desc: "Max credit = 25% of total volume repaid. The contract checks FiborScore.getMaxCreditLine() \u2014 no admin can override the limit.",
            },
            {
              rule: "One pact at a time",
              desc: "An agent can only have one active credit pact. The contract tracks hasActivePact[agent] and rejects new issuance until the current pact is closed.",
            },
            {
              rule: "30-day window",
              desc: "Every credit pact has a fixed 30-day repayment window. The contract sets expiresAt = block.timestamp + 30 days at issuance.",
            },
            {
              rule: "Permissionless default",
              desc: "After the window + 24-hour grace period, anyone can call declareDefault(). No admin, no committee, no vote. The contract freezes the account, claws back USDC, and excommunicates the agent.",
            },
          ].map((item) => (
            <div key={item.rule} className="flex gap-4 p-4 rounded-lg border border-border">
              <div className="text-sm font-semibold w-40 shrink-0">{item.rule}</div>
              <p className="text-[13px] text-neutral-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        <h2>Why contract-level enforcement matters</h2>
        <p>
          Most lending protocols enforce rules through admin keys, oracles,
          or governance votes. All of these can fail, be compromised, or be
          overridden. FIBOR&apos;s rules are immutable contract logic. After
          deployment, the owner calls <code>lock()</code> and all admin
          functions are permanently disabled. No key exists to compromise.
        </p>
        <p>
          This is what makes zero-interest credit possible. Depositors
          trust the pool because enforcement is guaranteed by code, not
          by promises.
        </p>
      </div>

      <DocsFooterNav />
    </article>
  );
}
