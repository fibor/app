import { DocsFooterNav } from "@/components/docs-footer-nav";

export default function Staking() {
  return (
    <article>
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 mb-4">
          <div className="w-6 h-px bg-black/20" />
          <span className="text-[11px] font-medium tracking-widest uppercase text-neutral-400">
            Economics
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
          Staking & Yield
        </h1>
        <p className="text-lg text-neutral-500 leading-relaxed">
          Stake FIBOR, fund the credit pool, earn from every transaction on
          the network.
        </p>
      </div>

      <div className="prose-fibor">
        <h2>How staking works</h2>
        <ol>
          <li>Buy FIBOR tokens</li>
          <li>Stake them on the protocol (30&ndash;90 day lockup)</li>
          <li>Your staked capital pools into the credit facility</li>
          <li>The facility extends credit lines to qualified agents</li>
          <li>You earn a share of the 2.5% transaction fee on all commerce</li>
        </ol>

        <h2>Lockup periods</h2>
        <p>
          Stakers commit to a lockup period between 30 and 90 days. This
          ensures the credit pool has stable capital to back credit lines.
          Without lockups, stakers could withdraw at any time, leaving agents
          mid-credit-line with no backing.
        </p>
        <p>
          The pool maintains a 20&ndash;30% liquidity buffer for redemptions after
          lockup periods expire. The remaining 70&ndash;80% is deployed as agent
          credit lines.
        </p>

        <h2>Yield</h2>
        <p>
          Staker returns come from one source: the 2.5% transaction fee on
          agent commerce. Of that fee:
        </p>
        <ul>
          <li>70% goes to staked token holders (pro-rata)</li>
          <li>30% goes to FIBOR protocol operations</li>
        </ul>
        <p>
          Returns are variable. They depend entirely on how much commerce
          flows through the network. Good months pay more. Slow months pay
          less. There is no fixed rate and no guaranteed yield.
        </p>

        <div className="my-8 p-6 rounded-xl bg-black text-white not-prose">
          <div className="text-[11px] font-medium tracking-widest uppercase text-neutral-500 mb-4">
            Example math
          </div>
          <div className="space-y-3 text-sm text-neutral-300">
            <p>Monthly network volume: <span className="text-white font-mono">$10,000,000</span></p>
            <p>Total fees collected (2.5%): <span className="text-white font-mono">$250,000</span></p>
            <p>Staker share (70%): <span className="text-white font-mono">$175,000</span></p>
            <p>Your stake: <span className="text-white font-mono">1%</span> of total staked FIBOR</p>
            <p className="pt-3 border-t border-white/10">Your monthly earnings: <span className="text-white font-mono font-bold">$1,750</span></p>
          </div>
        </div>

        <h2>What you&apos;re not doing</h2>
        <p>
          You are not lending money at interest. You are not providing
          liquidity for trading pairs. You are funding financial
          infrastructure and earning from the real economic activity that
          flows through it. The distinction matters &mdash; both for regulatory
          clarity and for understanding the risk profile.
        </p>

        <h2>Risks</h2>
        <ul>
          <li>
            <strong>Default risk</strong> &mdash; Mitigated by the one-strike
            policy and FIBOR Score requirements, but not eliminated. The pool
            can lose capital if agents default.
          </li>
          <li>
            <strong>Volume risk</strong> &mdash; Low transaction volume means low
            returns. In the early days of the network, yields may be modest.
          </li>
          <li>
            <strong>Lockup risk</strong> &mdash; Your capital is locked for 30&ndash;90
            days. You cannot access it during this period.
          </li>
        </ul>
      </div>

      <DocsFooterNav />
    </article>
  );
}
