import { DocsFooterNav } from "@/components/docs-footer-nav";

export default function Market() {
  return (
    <article>
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 mb-4">
          <div className="w-6 h-px bg-black/20" />
          <span className="text-[11px] font-medium tracking-widest uppercase text-neutral-400">
            Ecosystem
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
          Market Opportunity
        </h1>
        <p className="text-lg text-neutral-500 leading-relaxed">
          The numbers behind the machine economy. Every one of them points
          in the same direction.
        </p>
      </div>

      <div className="prose-fibor">
        <h2>The projections</h2>
        <div className="my-8 not-prose grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            {
              value: "$15T",
              label: "B2B agent spending by 2028",
              source: "Gartner, 2025",
            },
            {
              value: "$261B",
              label: "US agent e-commerce by 2030",
              source: "Worldpay, 2025",
            },
            {
              value: "$155B",
              label: "Agentic AI spending by 2030",
              source: "Bank of America, 2025",
            },
            {
              value: "$196B",
              label: "Agentic AI market by 2034",
              source: "Market.us, 2025",
            },
          ].map((stat) => (
            <div key={stat.label} className="p-5 rounded-xl border border-black/[0.04]">
              <div className="text-2xl font-bold font-mono tracking-tight mb-1">{stat.value}</div>
              <div className="text-sm text-neutral-500 mb-2">{stat.label}</div>
              <div className="text-[11px] text-neutral-400">{stat.source}</div>
            </div>
          ))}
        </div>

        <h2>The trends</h2>
        <ul>
          <li>
            <strong>33% of enterprise software</strong> interactions will be
            handled by autonomous agents by 2028 (Gartner)
          </li>
          <li>
            <strong>90% of B2B buying</strong> will flow through agent
            exchanges by 2028 (Gartner)
          </li>
          <li>
            <strong>15% of day-to-day work decisions</strong> will be made
            autonomously by 2028 (Gartner)
          </li>
          <li>
            <strong>20% of monetary transactions</strong> will be programmable
            by 2030 (Gartner)
          </li>
        </ul>

        <h2>The gap</h2>
        <p>
          Banks were built for humans. Crypto was built for speculation.
          Neither was built for robots that need to earn trust, build
          reputation, and spend money they haven&apos;t yet earned in order to do
          their jobs.
        </p>
        <p>
          Every autonomous agent entering the economy will need three things:
          an identity, a score, and a credit line. The infrastructure for this
          does not exist yet. FIBOR is building it.
        </p>

        <h2>FIBOR&apos;s defensibility</h2>
        <p>
          Three moats that compound over time:
        </p>
        <div className="my-6 not-prose space-y-3">
          <div className="p-5 rounded-xl border border-black/[0.04]">
            <div className="text-sm font-semibold mb-2">The data moat</div>
            <p className="text-[13px] text-neutral-500 leading-relaxed">
              Every transaction makes the scoring model more accurate. A
              competitor launching later has no transaction history to score
              against. Credit bureaus can&apos;t be bootstrapped overnight. This
              is why Equifax, founded in 1899, still dominates.
            </p>
          </div>
          <div className="p-5 rounded-xl border border-black/[0.04]">
            <div className="text-sm font-semibold mb-2">The network effect</div>
            <p className="text-[13px] text-neutral-500 leading-relaxed">
              More merchants checking FIBOR Scores makes a FIBOR ID more
              valuable. More valuable IDs attract more developers. More
              developers attract more merchants. Two-sided network effects
              in financial infrastructure are among the most durable moats
              in technology.
            </p>
          </div>
          <div className="p-5 rounded-xl border border-black/[0.04]">
            <div className="text-sm font-semibold mb-2">The Robodollar</div>
            <p className="text-[13px] text-neutral-500 leading-relaxed">
              Anyone can fork a smart contract. No one can fork a currency
              and the merchant network that accepts it. The Robodollar creates
              a closed economic loop that can&apos;t be replicated by copying code.
            </p>
          </div>
        </div>

        <h2>Sources</h2>
        <div className="my-6 not-prose text-[13px] text-neutral-500 space-y-2">
          <p>[1] Gartner, &ldquo;AI agents will intermediate over $15 trillion in B2B spending by 2028,&rdquo; Digital Commerce 360 (November 2025).</p>
          <p>[2] Worldpay, &ldquo;AI Agents Set to Transform How Americans Shop &mdash; $261 Billion Predicted in Online Spend&rdquo; (2025).</p>
          <p>[3] Bank of America Global Research, &ldquo;Agentic AI spending could reach $155 billion by 2030,&rdquo; Fortune (June 2025).</p>
          <p>[4] Market.us, &ldquo;Agentic AI Market Size&rdquo; (2025).</p>
          <p>[5] Gartner, &ldquo;33% of enterprise software applications will include agentic AI by 2028&rdquo; (2025).</p>
          <p>[6] Gartner via Digital Commerce 360, &ldquo;20% of monetary transactions will be programmable by 2030&rdquo; (November 2025).</p>
        </div>
      </div>

      <DocsFooterNav />
    </article>
  );
}
