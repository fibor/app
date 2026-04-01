import { DocsFooterNav } from "@/components/docs-footer-nav";

export default function Robodollar() {
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
          The Robodollar
        </h1>
        <p className="text-lg text-neutral-500 leading-relaxed">
          A stablecoin with rules built in. The currency of the machine
          economy.
        </p>
      </div>

      <div className="prose-fibor">
        <h2>What it is</h2>
        <p>
          The Robodollar is a stablecoin pegged 1:1 to USDC. You deposit USDC,
          you get Robodollars. You redeem Robodollars, you get USDC. No
          algorithmic peg. No reserve risk. The peg is mechanical.
        </p>
        <p>
          What makes the Robodollar different from plain USDC is the rules.
          Spending limits, repayment logic, merchant restrictions, and default
          enforcement are properties of the token itself &mdash; not a separate
          system watching the token.
        </p>

        <h2>Why not just use USDC?</h2>
        <p>
          Plain USDC has no rules. If an agent borrows USDC, there&apos;s nothing
          stopping it from spending the entire balance at one merchant,
          ignoring repayment windows, or disappearing with the funds. You&apos;d
          need a separate monitoring system to enforce credit terms.
        </p>
        <p>
          The Robodollar makes this unnecessary. The rules are embedded in the
          currency. A Robodollar with a $500 spending cap physically cannot
          overspend. A Robodollar past its repayment window automatically
          returns to the pool. A Robodollar held by a defaulting agent
          freezes instantly.
        </p>

        <div className="my-8 p-6 rounded-xl bg-neutral-50 border border-black/[0.04] not-prose">
          <div className="text-[13px] font-semibold mb-3">
            The Robodollar is the moat
          </div>
          <p className="text-[13px] text-neutral-500 leading-relaxed">
            Anyone can fork a smart contract. Nobody can fork a currency and
            the merchant network that accepts it. The Robodollar is what makes
            FIBOR a closed economic loop rather than an open-source lending
            pool.
          </p>
        </div>

        <h2>How it works</h2>
        <div className="my-6 not-prose space-y-3">
          <div className="flex gap-4 p-4 rounded-lg border border-black/[0.04]">
            <span className="text-sm font-semibold w-32 shrink-0">Wrapping</span>
            <p className="text-[13px] text-neutral-500">Deposit USDC into the Robodollar contract, receive an equal amount of Robodollars.</p>
          </div>
          <div className="flex gap-4 p-4 rounded-lg border border-black/[0.04]">
            <span className="text-sm font-semibold w-32 shrink-0">Unwrapping</span>
            <p className="text-[13px] text-neutral-500">Redeem Robodollars for USDC at a 1:1 rate. Always.</p>
          </div>
          <div className="flex gap-4 p-4 rounded-lg border border-black/[0.04]">
            <span className="text-sm font-semibold w-32 shrink-0">Credit issuance</span>
            <p className="text-[13px] text-neutral-500">When an agent gets a credit line, Robodollars are minted with spending rules attached. The pool backs them with USDC.</p>
          </div>
          <div className="flex gap-4 p-4 rounded-lg border border-black/[0.04]">
            <span className="text-sm font-semibold w-32 shrink-0">Repayment</span>
            <p className="text-[13px] text-neutral-500">Incoming funds to the agent trigger automatic priority repayment to the pool.</p>
          </div>
        </div>

        <p>
          The name echoes &ldquo;petrodollar&rdquo; &mdash; the dollar flowing through a
          specific economy. The Robodollar is the dollar of the robot economy.
          It leaves room for future denominations (RoboEuro, RoboYen) as the
          network expands.
        </p>

        <p>
          See <a href="/docs/programmable-rules">Programmable Rules</a> for
          the full breakdown of what the Robodollar can enforce at the token
          level.
        </p>
      </div>

      <DocsFooterNav />
    </article>
  );
}
