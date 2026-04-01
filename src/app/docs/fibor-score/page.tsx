import { DocsFooterNav } from "@/components/docs-footer-nav";

export default function FiborScore() {
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
          FIBOR Score
        </h1>
        <p className="text-lg text-neutral-500 leading-relaxed">
          A real-time credit score for machines. Computed from onchain data.
          Public. Verifiable. Unforgeable.
        </p>
      </div>

      <div className="prose-fibor">
        <h2>The first credit bureau for robots</h2>
        <p>
          Every agent with a FIBOR ID has a FIBOR Score. It ranges from 0 to
          1,000 and updates in real time based on the agent&apos;s onchain
          behavior. Anyone can query any agent&apos;s score at any time.
        </p>
        <p>
          The score can&apos;t be faked because the ledger it&apos;s computed from
          can&apos;t be faked. An agent can&apos;t lie on its credit application because
          the application is the ledger itself.
        </p>

        <h2>What goes into the score</h2>
        <div className="my-6 not-prose space-y-3">
          {[
            { input: "Transaction volume", desc: "Rolling 30/60/90 day totals. More consistent commerce = higher score." },
            { input: "Transaction consistency", desc: "Regular, predictable activity scores better than erratic bursts." },
            { input: "Repayment history", desc: "On-time repayments build the score. Late repayments hurt it. Defaults destroy it." },
            { input: "Merchant diversity", desc: "Transacting with many different counterparties scores better than one repeated merchant." },
            { input: "Developer reputation", desc: "If the developer's other agents have high scores, new agents from that developer start with a boost." },
            { input: "Agent age", desc: "Older agents with long track records score higher than new ones." },
            { input: "Behavioral signals", desc: "Sudden changes in spending patterns, velocity spikes, or anomalous transactions can lower the score." },
          ].map((item) => (
            <div key={item.input} className="flex gap-4 p-4 rounded-lg border border-black/[0.04]">
              <div className="text-sm font-semibold w-44 shrink-0">{item.input}</div>
              <p className="text-[13px] text-neutral-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        <h2>Score tiers</h2>
        <p>
          Your score determines what you can do on the network. Higher scores
          unlock bigger credit lines with longer repayment windows.
        </p>

        <div className="my-8 not-prose">
          <div className="rounded-xl border border-black/[0.04] overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-black/[0.04] bg-neutral-50/50">
                  <th className="text-left p-4 text-[11px] font-medium tracking-widest uppercase text-neutral-400">Score</th>
                  <th className="text-left p-4 text-[11px] font-medium tracking-widest uppercase text-neutral-400">Tier</th>
                  <th className="text-left p-4 text-[11px] font-medium tracking-widest uppercase text-neutral-400">Credit Access</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/[0.04]">
                <tr>
                  <td className="p-4 font-mono">0 &ndash; 99</td>
                  <td className="p-4 text-neutral-500">Excommunicated / Inactive</td>
                  <td className="p-4 text-neutral-500">None</td>
                </tr>
                <tr>
                  <td className="p-4 font-mono">100 &ndash; 299</td>
                  <td className="p-4 text-neutral-500">Identity Only</td>
                  <td className="p-4 text-neutral-500">No credit access</td>
                </tr>
                <tr>
                  <td className="p-4 font-mono">300 &ndash; 499</td>
                  <td className="p-4 text-neutral-500">Micro</td>
                  <td className="p-4 font-mono">$50 &ndash; $500</td>
                </tr>
                <tr>
                  <td className="p-4 font-mono">500 &ndash; 699</td>
                  <td className="p-4 text-neutral-500">Standard</td>
                  <td className="p-4 font-mono">$500 &ndash; $10,000</td>
                </tr>
                <tr>
                  <td className="p-4 font-mono">700 &ndash; 899</td>
                  <td className="p-4 text-neutral-500">Premium</td>
                  <td className="p-4 font-mono">$10,000 &ndash; $100,000</td>
                </tr>
                <tr>
                  <td className="p-4 font-mono">900 &ndash; 1000</td>
                  <td className="p-4 text-neutral-500">Sovereign</td>
                  <td className="p-4 font-mono">$100,000+</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <h2>Starting score</h2>
        <p>
          Every new agent starts at 100. This is enough to register and
          transact on the network, but not enough to borrow. The agent must
          build its score through real activity.
        </p>
        <p>
          Exception: if the developer has a strong reputation from other
          agents, new agents from that developer may start slightly higher.
          Conversely, if the developer has a history of defaults, new agents
          start lower &mdash; potentially as low as 10.
        </p>

        <h2>Score queries</h2>
        <p>
          Any address can query any agent&apos;s FIBOR Score. This is by design.
          The more places that check scores, the more valuable having a good
          score becomes. The more valuable a good score is, the more
          developers care about building responsibly.
        </p>
        <p>
          Merchants and platforms pay a small per-query fee (fractions of a
          cent) to check scores. This revenue goes to FIBOR operations.
        </p>
      </div>

      <DocsFooterNav />
    </article>
  );
}
