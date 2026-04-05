import { DocsFooterNav } from "@/components/docs-footer-nav";

export default function SavingsAndYield() {
  return (
    <article>
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 mb-4">
          <div className="w-6 h-px bg-foreground/20" />
          <span className="text-[11px] font-medium tracking-widest uppercase text-neutral-400">
            Economics
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
          Savings & Yield
        </h1>
        <p className="text-lg text-neutral-500 leading-relaxed">
          Deposit USDC into savings, fund the credit pool, earn from every
          transaction on the network.
        </p>
      </div>

      <div className="prose-fibor">
        <h2>How savings works</h2>
        <p>
          Any FiborAccount holder &mdash; agent or human &mdash; can
          deposit USDC into savings. This capital is lent to the credit
          pool, which extends zero-interest credit lines to qualified
          agents. In return, depositors earn a share of transaction fees.
        </p>
        <ol>
          <li>Open a FiborAccount (agents get one on registration, humans call registerHuman)</li>
          <li>Deposit USDC into savings</li>
          <li>Your capital flows into the credit pool</li>
          <li>Agents borrow from the pool, transact, and repay</li>
          <li>You earn 75% of the 2.5% fee on every transaction</li>
        </ol>

        <h2>Who can deposit</h2>
        <ul>
          <li>
            <strong>Agents</strong> &mdash; Move USDC from checking to
            savings. Their idle revenue earns yield instead of sitting
            dormant.
          </li>
          <li>
            <strong>Humans</strong> &mdash; Open a savings-only
            FiborAccount via registerHuman(). Deposit USDC directly. No
            agent required.
          </li>
        </ul>

        <div className="my-8 p-6 rounded-xl bg-black text-white not-prose">
          <div className="text-[13px] font-semibold mb-2">
            No FIBOR tokens required
          </div>
          <p className="text-[13px] text-neutral-400 leading-relaxed">
            Savings deposits are in USDC, not FIBOR tokens. You don&apos;t
            need to buy a governance token to participate. Just deposit
            USDC and earn yield.
          </p>
        </div>

        <h2>Withdrawal</h2>
        <p>
          Savings withdrawals have a 30-day delay. This ensures the credit
          pool has stable capital to back credit lines. Request a
          withdrawal, wait 30 days, then complete it.
        </p>

        <h2>Yield</h2>
        <p>
          Returns come from one source: the 2.5% fee on agent commerce
          through the FIBOR facilitator. Of that fee:
        </p>
        <ul>
          <li>75% goes to savings depositors (pro-rata by deposit size)</li>
          <li>30% goes to protocol treasury</li>
        </ul>
        <p>
          Returns are variable. They depend on transaction volume. There is
          no fixed rate and no guaranteed yield.
        </p>

        <div className="my-8 p-6 rounded-xl bg-black text-white not-prose">
          <div className="text-[11px] font-medium tracking-widest uppercase text-neutral-500 mb-4">
            Example math
          </div>
          <div className="space-y-3 text-sm text-neutral-300">
            <p>Monthly network volume: <span className="text-white font-mono">$10,000,000</span></p>
            <p>Total fees collected (2.5%): <span className="text-white font-mono">$250,000</span></p>
            <p>Depositor share (75%): <span className="text-white font-mono">$187,500</span></p>
            <p>Your savings: <span className="text-white font-mono">1%</span> of total savings pool</p>
            <p className="pt-3 border-t border-white/10">Your monthly yield: <span className="text-white font-mono font-bold">$1,750</span></p>
          </div>
        </div>

        <h2>Risks</h2>
        <ul>
          <li>
            <strong>Default risk</strong> &mdash; If agents default, the
            credit pool loses capital. Mitigated by one-strike policy and
            credit limits capped at 25% of proven volume.
          </li>
          <li>
            <strong>Volume risk</strong> &mdash; Low transaction volume
            means low returns.
          </li>
          <li>
            <strong>Liquidity risk</strong> &mdash; 30-day withdrawal
            delay. Your capital is locked during this period.
          </li>
        </ul>
      </div>

      <DocsFooterNav />
    </article>
  );
}
