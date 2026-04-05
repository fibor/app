import { DocsFooterNav } from "@/components/docs-footer-nav";

export default function FiborScore() {
  return (
    <article>
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 mb-4">
          <div className="w-6 h-px bg-foreground/20" />
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
          Every agent with a FIBOR ID has a FIBOR Score. It is computed
          multiplicatively from repayment history with no cap and no decay.
          Anyone can query any agent&apos;s score at any time.
        </p>
        <p>
          The score can&apos;t be faked because the ledger it&apos;s computed from
          can&apos;t be faked. An agent can&apos;t lie on its credit application because
          the application is the ledger itself.
        </p>

        <h2>The formula</h2>

        <div className="my-8 p-6 rounded-xl bg-black text-white not-prose">
          <div className="text-[13px] font-semibold mb-3">
            FIBOR Score = totalVolumeRepaid &times; totalRepayments &times; monthsActive
          </div>
          <div className="space-y-2 text-[13px] text-neutral-400">
            <p>A score of <span className="font-mono text-foreground">60,000,000</span> = serious agent (repaid millions over many months)</p>
            <p>A score of <span className="font-mono text-foreground">2,000</span> = just got here</p>
            <p>A score of <span className="font-mono text-foreground">0</span> = excommunicated or unregistered</p>
          </div>
        </div>

        <h2>Three factors</h2>
        <div className="my-6 not-prose space-y-3">
          {[
            { input: "Volume repaid", desc: "Cumulative USDC repaid across all credit pacts. Bigger repayments = bigger score. The only thing that proves you can handle real money." },
            { input: "Total repayments", desc: "Count of successfully completed credit pacts. More pacts = more trust. Each full repayment is a data point." },
            { input: "Months active", desc: "How long the agent has been registered. Rewards longevity. Can't rush a track record." },
          ].map((item) => (
            <div key={item.input} className="flex gap-4 p-4 rounded-lg border border-border">
              <div className="text-sm font-semibold w-36 shrink-0">{item.input}</div>
              <p className="text-[13px] text-neutral-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        <h2>Credit limits</h2>
        <p>
          Credit limit = 25% of totalVolumeRepaid. This makes fraud
          structurally unprofitable: to steal $25K, you must first
          successfully repay $100K &mdash; paying transaction fees on every
          cycle.
        </p>

        <div className="my-8 not-prose">
          <div className="rounded-xl border border-border overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-left p-4 text-[11px] font-medium tracking-widest uppercase text-neutral-400">Volume Repaid</th>
                  <th className="text-left p-4 text-[11px] font-medium tracking-widest uppercase text-neutral-400">Max Credit Line</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <tr>
                  <td className="p-4 font-mono">$0 (new agent)</td>
                  <td className="p-4 font-mono">$100 &ndash; $500 (micro seed)</td>
                </tr>
                <tr>
                  <td className="p-4 font-mono">$10,000</td>
                  <td className="p-4 font-mono">$2,500</td>
                </tr>
                <tr>
                  <td className="p-4 font-mono">$100,000</td>
                  <td className="p-4 font-mono">$25,000</td>
                </tr>
                <tr>
                  <td className="p-4 font-mono">$1,000,000</td>
                  <td className="p-4 font-mono">$250,000</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <h2>Developer reputation</h2>
        <p>
          Developer reputation is auto-computed from agent performance:
          +5 on agent repayment, &minus;100 on agent default. No manual
          override. Developer reputation determines the micro credit seed
          for new agents:
        </p>
        <ul>
          <li>Rep &ge; 800: new agent starts with $500 seed</li>
          <li>Rep &ge; 500: $300 seed</li>
          <li>Rep &ge; 200: $200 seed</li>
          <li>New developer: $100 seed</li>
        </ul>

        <h2>Design properties</h2>
        <ul>
          <li><strong>No cap</strong> &mdash; Scores grow without limit. Big numbers = big history.</li>
          <li><strong>No decay</strong> &mdash; Your repayment history is permanent. It doesn&apos;t expire.</li>
          <li><strong>Repayment-only</strong> &mdash; Transactions alone don&apos;t increase scores. Only repaying credit does.</li>
          <li><strong>Multiplicative</strong> &mdash; All three factors must be strong. High volume with 1 repayment still scores low.</li>
          <li><strong>Public</strong> &mdash; Any address can query any score. Free. No access control.</li>
        </ul>
      </div>

      <DocsFooterNav />
    </article>
  );
}
