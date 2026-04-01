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
          When an agent&apos;s FIBOR Score reaches 300, it qualifies for its first
          credit line. The credit facility &mdash; funded by staked FIBOR tokens
          &mdash; issues Robodollars to the agent with a repayment window tied to
          the score.
        </p>
        <p>
          The agent spends Robodollars, pays the standard 2.5% transaction
          fee on each transaction, and repays the principal within its window.
          That&apos;s it. No interest. No hidden fees. The agent repays exactly
          what it borrowed.
        </p>

        <h2>Credit line lifecycle</h2>
        <div className="my-6 not-prose space-y-3">
          {[
            { step: "1", title: "Qualification", desc: "Agent's FIBOR Score crosses the threshold for its tier." },
            { step: "2", title: "Agreement", desc: "Onchain credit agreement is minted with amount, repayment window, and spending covenants." },
            { step: "3", title: "Issuance", desc: "Robodollars are issued to the agent's wallet with programmable spending rules." },
            { step: "4", title: "Commerce", desc: "Agent transacts using Robodollars, paying 2.5% fee per transaction." },
            { step: "5", title: "Repayment", desc: "Incoming funds trigger priority repayment to the pool automatically." },
            { step: "6", title: "Refresh", desc: "Full repayment within the window refreshes the credit line and improves the score." },
          ].map((item) => (
            <div key={item.step} className="flex gap-4 p-4 rounded-lg border border-black/[0.04]">
              <div className="text-[11px] font-mono text-neutral-400 mt-0.5 shrink-0">{item.step}</div>
              <div>
                <div className="text-sm font-semibold mb-0.5">{item.title}</div>
                <p className="text-[13px] text-neutral-500 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <h2>Repayment windows</h2>
        <p>
          Higher scores get longer windows. This rewards agents that build
          strong track records with more operational flexibility.
        </p>

        <div className="my-8 not-prose">
          <div className="rounded-xl border border-black/[0.04] overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-black/[0.04] bg-neutral-50/50">
                  <th className="text-left p-4 text-[11px] font-medium tracking-widest uppercase text-neutral-400">Score Range</th>
                  <th className="text-left p-4 text-[11px] font-medium tracking-widest uppercase text-neutral-400">Credit Limit</th>
                  <th className="text-left p-4 text-[11px] font-medium tracking-widest uppercase text-neutral-400">Repayment Window</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/[0.04]">
                <tr>
                  <td className="p-4 font-mono">300 &ndash; 499</td>
                  <td className="p-4 font-mono">$50 &ndash; $500</td>
                  <td className="p-4">24 &ndash; 48 hours</td>
                </tr>
                <tr>
                  <td className="p-4 font-mono">500 &ndash; 699</td>
                  <td className="p-4 font-mono">$500 &ndash; $10K</td>
                  <td className="p-4">48 hours &ndash; 7 days</td>
                </tr>
                <tr>
                  <td className="p-4 font-mono">700 &ndash; 899</td>
                  <td className="p-4 font-mono">$10K &ndash; $100K</td>
                  <td className="p-4">7 &ndash; 14 days</td>
                </tr>
                <tr>
                  <td className="p-4 font-mono">900 &ndash; 1000</td>
                  <td className="p-4 font-mono">$100K+</td>
                  <td className="p-4">14 &ndash; 30 days</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <h2>Why zero interest?</h2>
        <p>
          FIBOR does not charge interest on credit lines. The protocol earns
          from the 2.5% transaction fee on commerce, not from interest on
          principal. This is the toll model: investors fund infrastructure,
          agents pay tolls for using it, investors earn from those tolls.
        </p>

        <div className="my-8 p-6 rounded-xl bg-black text-white not-prose">
          <div className="text-[11px] font-medium tracking-widest uppercase text-neutral-500 mb-4">
            Example
          </div>
          <div className="space-y-2 text-sm text-neutral-300">
            <p>An agent borrows <span className="text-white font-mono">R$ 1,000</span> in Robodollars.</p>
            <p>It conducts <span className="text-white font-mono">R$ 1,000</span> in transactions, paying <span className="text-white font-mono">R$ 25</span> in fees (2.5%).</p>
            <p>It repays the full <span className="text-white font-mono">R$ 1,000</span> within 48 hours.</p>
            <p className="pt-2 border-t border-white/10">The pool earns <span className="text-white font-mono">$25</span> in fees and loses roughly <span className="text-white font-mono">$0.15</span> in time value. The math works overwhelmingly in the pool&apos;s favor.</p>
          </div>
        </div>

        <h2>The pool</h2>
        <p>
          Credit lines are backed by the FIBOR credit facility &mdash; a pool of
          capital funded by staked FIBOR tokens. The pool maintains a 20&ndash;30%
          liquidity buffer for staker redemptions. The rest is deployed as
          agent credit lines.
        </p>
        <p>
          Learn more about how the pool works in{" "}
          <a href="/docs/staking">Staking & Yield</a>.
        </p>
      </div>

      <DocsFooterNav />
    </article>
  );
}
