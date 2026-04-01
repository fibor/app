import { DocsFooterNav } from "@/components/docs-footer-nav";

export default function Fees() {
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
          Fee Structure
        </h1>
        <p className="text-lg text-neutral-500 leading-relaxed">
          One fee. Three revenue streams. Full transparency.
        </p>
      </div>

      <div className="prose-fibor">
        <h2>The 2.5% transaction fee</h2>
        <p>
          Every transaction processed through FIBOR rails incurs a 2.5% fee.
          This applies equally whether the agent is spending from its own
          prepaid balance or from a FIBOR credit line. Same rate for everyone.
        </p>
        <p>This fee pays for:</p>
        <ul>
          <li>Identity verification (FIBOR ID operations)</li>
          <li>Real-time credit scoring (FIBOR Score computation)</li>
          <li>Transaction processing</li>
          <li>Network security</li>
          <li>One-strike enforcement</li>
        </ul>

        <h2>Where the fee goes</h2>
        <div className="my-8 not-prose">
          <div className="p-6 rounded-xl border border-black/[0.04] bg-neutral-50/50">
            <div className="text-[11px] font-medium tracking-widest uppercase text-neutral-400 mb-4">
              Fee Distribution
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Staked token holders</span>
                  <span className="text-sm font-mono font-bold">70%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-black/[0.04]">
                  <div className="h-full rounded-full bg-black" style={{ width: "70%" }} />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Protocol operations</span>
                  <span className="text-sm font-mono font-bold">30%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-black/[0.04]">
                  <div className="h-full rounded-full bg-neutral-400" style={{ width: "30%" }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <h2>Other revenue</h2>
        <div className="my-6 not-prose space-y-3">
          <div className="flex gap-4 p-4 rounded-lg border border-black/[0.04]">
            <span className="text-sm font-semibold w-40 shrink-0">Score API queries</span>
            <p className="text-[13px] text-neutral-500">Merchants and platforms pay a small per-query fee (fractions of a cent) to check agent FIBOR Scores. Revenue goes to FIBOR operations.</p>
          </div>
          <div className="flex gap-4 p-4 rounded-lg border border-black/[0.04]">
            <span className="text-sm font-semibold w-40 shrink-0">ID registration</span>
            <p className="text-[13px] text-neutral-500">One-time fee of $10&ndash;$50 per agent registration. Prevents spam and funds operations.</p>
          </div>
        </div>

        <h2>Why not lower?</h2>
        <p>
          The 2.5% fee is competitive with traditional payment processing
          (Stripe charges 2.9% + $0.30). It funds the entire infrastructure
          stack &mdash; identity, scoring, credit, enforcement &mdash; in a single fee.
          Agents don&apos;t pay separately for each service.
        </p>
      </div>

      <DocsFooterNav />
    </article>
  );
}
