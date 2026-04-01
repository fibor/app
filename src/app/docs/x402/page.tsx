import { DocsFooterNav } from "@/components/docs-footer-nav";

export default function X402Integration() {
  return (
    <article>
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 mb-4">
          <div className="w-6 h-px bg-black/20" />
          <span className="text-[11px] font-medium tracking-widest uppercase text-neutral-400">
            Architecture
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
          x402 Integration
        </h1>
        <p className="text-lg text-neutral-500 leading-relaxed">
          FIBOR as the credit layer underneath x402 agent payments.
        </p>
      </div>

      <div className="prose-fibor">
        <h2>What is x402?</h2>
        <p>
          x402 is an HTTP-native payment protocol built around the 402
          Payment Required status code. It lets agents pay for API calls and
          services with a single HTTP header &mdash; no payment integration,
          no checkout flow, no human in the loop. Any API endpoint becomes a
          paid service that agents can access programmatically.
        </p>

        <h2>FIBOR + x402</h2>
        <p>
          FIBOR is the credit layer that sits underneath x402. Without credit,
          agents can only pay for x402 services with pre-funded balances
          &mdash; money a human put in first. With FIBOR, agents access
          services on demand and repay from the revenue those services
          generate.
        </p>
        <p>
          This is the difference between an agent with a debit card and an
          agent with a credit line.
        </p>

        <h2>The flow</h2>
        <div className="my-8 not-prose">
          <div className="space-y-3">
            {[
              {
                step: "01",
                title: "Qualify",
                desc: "Agent has a FIBOR ID and a qualifying FIBOR Score",
              },
              {
                step: "02",
                title: "Draw credit",
                desc: "Agent draws Robodollars from its FIBOR credit line",
              },
              {
                step: "03",
                title: "Discover service",
                desc: "Agent encounters an x402-gated API or service",
              },
              {
                step: "04",
                title: "Pay via x402",
                desc: "Agent pays with Robodollars through the x402 protocol header",
              },
              {
                step: "05",
                title: "Service fulfilled",
                desc: "Service receives payment, agent\u2019s credit line is debited",
              },
              {
                step: "06",
                title: "Repay",
                desc: "Agent earns revenue from the service, repays FIBOR \u2014 score improves",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="flex items-start gap-4 p-4 rounded-lg border border-black/[0.04]"
              >
                <span className="text-xs font-mono text-neutral-400 mt-0.5 shrink-0">
                  {item.step}
                </span>
                <div>
                  <div className="text-sm font-semibold">{item.title}</div>
                  <p className="text-[13px] text-neutral-500 mt-0.5">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="my-8 p-6 rounded-xl bg-neutral-50 border border-black/[0.04] not-prose">
          <div className="text-[13px] font-semibold mb-2">
            The credit stack for agent commerce
          </div>
          <p className="text-[13px] text-neutral-500 leading-relaxed">
            FIBOR handles credit underwriting &mdash; identity, scoring, credit
            lines, enforcement. x402 handles payment execution &mdash; HTTP
            headers, settlement, service delivery. Together, they form a
            complete commerce stack for autonomous agents.
          </p>
        </div>

        <h2>Why credit matters for x402</h2>
        <p>
          The value of x402 scales with how many services an agent can access.
          But access costs money, and most agents start with zero balance.
          Credit solves the cold-start problem: an agent can access paid
          services immediately, generate revenue from them, and repay the
          credit line from that revenue.
        </p>
        <p>
          Without credit, x402 is limited to agents with pre-funded wallets.
          With FIBOR credit, any agent with a strong enough reputation can
          participate in the x402 economy from day one.
        </p>

        <h2>Future: fiat bridge</h2>
        <p>
          x402 is the primary payment rail for FIBOR &mdash; crypto-native,
          agent-native, and designed for the same high-frequency, low-value
          transactions that FIBOR optimizes for. For agents that need to
          interact with the traditional economy (SaaS subscriptions, cloud
          bills, fiat invoices), a fiat bridge via MPP or Stripe integration
          is on the roadmap.
        </p>
      </div>

      <DocsFooterNav />
    </article>
  );
}
