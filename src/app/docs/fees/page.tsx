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
          1% merchant. 1.5% agent. 2.5% total. Zero interest.
        </p>
      </div>

      <div className="prose-fibor">
        <h2>The split</h2>
        <p>
          Every transaction through the FIBOR facilitator incurs a 2.5%
          fee, split between the merchant and the agent:
        </p>

        <div className="my-6 not-prose">
          <div className="rounded-xl border border-border overflow-hidden">
            <div className="divide-y divide-black/[0.04]">
              {[
                { label: "Merchant pays", value: "1% of transaction amount" },
                { label: "Agent pays", value: "1.5% of transaction amount" },
                { label: "Total fee", value: "2.5%" },
                { label: "Interest on credit", value: "0% — always" },
              ].map((row) => (
                <div key={row.label} className="flex items-center p-4">
                  <span className="text-sm text-neutral-500 w-40 shrink-0">{row.label}</span>
                  <span className="text-sm font-medium">{row.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <h2>What merchants pay for</h2>
        <p>
          The 1% merchant fee covers:
        </p>
        <ul>
          <li>Agent identity verification (FIBOR ID)</li>
          <li>Credit score checks (FIBOR Score)</li>
          <li>Fraud protection (excommunication filtering)</li>
          <li>Payment guarantee (credit pool backs the transaction)</li>
        </ul>
        <p>
          For comparison: Stripe charges 2.9% + $0.30. Visa charges
          1.5&ndash;3.5%. FIBOR charges 1% and provides more information
          about the payer than either.
        </p>

        <h2>What agents pay for</h2>
        <p>
          The 1.5% agent fee covers:
        </p>
        <ul>
          <li>Zero-interest credit access</li>
          <li>FiborAccount (bank account with auto-repayment)</li>
          <li>Financial identity that builds over time</li>
          <li>Verified payment history for merchant trust</li>
        </ul>

        <h2>Where fees go</h2>
        <p>
          The total 2.5% fee is collected by the PaymentGateway and routed
          to the RevenueDistributor:
        </p>
        <ul>
          <li>
            <strong>75%</strong> &rarr; Savings depositors (pro-rata yield
            on their USDC deposits in the credit pool)
          </li>
          <li>
            <strong>25%</strong> &rarr; Protocol treasury (operations,
            development, governance)
          </li>
        </ul>

        <h2>What is NOT charged</h2>
        <ul>
          <li>No interest on credit lines &mdash; ever</li>
          <li>No origination fees on credit draws</li>
          <li>No account maintenance fees</li>
          <li>No registration fees for agents or humans</li>
        </ul>

        <div className="my-8 p-6 rounded-xl bg-muted border border-border not-prose">
          <div className="text-[13px] font-semibold mb-2">
            Fees only apply on FIBOR rails
          </div>
          <p className="text-[13px] text-neutral-500 leading-relaxed">
            The 2.5% fee applies to transactions processed through the
            FIBOR facilitator. Agents can also spend USDC directly via
            x402 or other payment methods &mdash; those transactions
            are outside FIBOR and incur no FIBOR fee. But they also
            don&apos;t build the agent&apos;s FIBOR credit history.
          </p>
        </div>
      </div>

      <DocsFooterNav />
    </article>
  );
}
