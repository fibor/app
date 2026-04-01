import { DocsFooterNav } from "@/components/docs-footer-nav";

export default function ProgrammableRules() {
  return (
    <article>
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 mb-4">
          <div className="w-6 h-px bg-black/20" />
          <span className="text-[11px] font-medium tracking-widest uppercase text-neutral-400">
            Currency
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
          Programmable Rules
        </h1>
        <p className="text-lg text-neutral-500 leading-relaxed">
          The rules that make the Robodollar more than money. Enforced at the
          token level, not by a watchdog.
        </p>
      </div>

      <div className="prose-fibor">
        <h2>Built-in enforcement</h2>
        <p>
          Regular stablecoins are just numbers. You can send them anywhere,
          to anyone, in any amount. That&apos;s great for humans with legal
          agreements. It doesn&apos;t work for autonomous agents spending borrowed
          money.
        </p>
        <p>
          The Robodollar embeds credit rules directly into the token contract.
          These rules are not optional. They are not monitored by a separate
          system that can fail. They are properties of the token itself.
        </p>

        <h2>The rules</h2>
        <div className="my-6 not-prose space-y-4">
          <div className="p-5 rounded-xl border border-black/[0.04]">
            <div className="text-sm font-semibold mb-2">Spending limits</div>
            <p className="text-[13px] text-neutral-500 leading-relaxed">
              Per-transaction and per-period caps tied to the credit agreement.
              An agent with a $500 credit line and a $100 per-transaction limit
              physically cannot spend more than $100 in a single transaction.
              The token rejects the transfer.
            </p>
          </div>
          <div className="p-5 rounded-xl border border-black/[0.04]">
            <div className="text-sm font-semibold mb-2">Merchant allowlists</div>
            <p className="text-[13px] text-neutral-500 leading-relaxed">
              Optional per-credit-agreement restrictions that limit where the
              agent can spend. A purchasing agent might be restricted to
              verified supplier addresses. A travel agent might be restricted
              to airline and hotel contracts.
            </p>
          </div>
          <div className="p-5 rounded-xl border border-black/[0.04]">
            <div className="text-sm font-semibold mb-2">Repayment windows</div>
            <p className="text-[13px] text-neutral-500 leading-relaxed">
              When the window expires, any unspent Robodollars automatically
              return to the credit facility. No human intervention. No
              collection process. The token returns itself.
            </p>
          </div>
          <div className="p-5 rounded-xl border border-black/[0.04]">
            <div className="text-sm font-semibold mb-2">Default enforcement</div>
            <p className="text-[13px] text-neutral-500 leading-relaxed">
              If an agent defaults (misses repayment with no cure within 24
              hours), all Robodollars held by that agent are instantly frozen
              and clawed back to the pool. This happens at the token level.
            </p>
          </div>
          <div className="p-5 rounded-xl border border-black/[0.04]">
            <div className="text-sm font-semibold mb-2">Priority repayment</div>
            <p className="text-[13px] text-neutral-500 leading-relaxed">
              When an agent using a credit line receives incoming funds, the
              Robodollar contract routes repayment to the pool first before
              the agent can access the remainder. Pool gets paid before the
              agent gets paid.
            </p>
          </div>
        </div>

        <h2>Why this matters</h2>
        <p>
          These rules eliminate the need for off-chain monitoring, legal
          enforcement, or trust in the agent&apos;s behavior. The currency itself
          enforces the credit terms. This is what makes the Robodollar
          fundamentally different from USDC with a wrapper contract &mdash; the
          rules are inseparable from the money.
        </p>
      </div>

      <DocsFooterNav />
    </article>
  );
}
