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
          x402 Facilitator
        </h1>
        <p className="text-lg text-neutral-500 leading-relaxed">
          FIBOR as the trust layer for agent payments. Drop-in replacement
          for Coinbase&apos;s x402 facilitator.
        </p>
      </div>

      <div className="prose-fibor">
        <h2>What is x402?</h2>
        <p>
          x402 is an open payment protocol using the HTTP 402 Payment
          Required status code. Agents pay for API calls and services with
          a single HTTP header. Coinbase and Cloudflare created it.
          It&apos;s permissionless &mdash; anyone can run a facilitator.
        </p>

        <h2>What is a facilitator?</h2>
        <p>
          The facilitator is middleware between the merchant and the
          blockchain. When an agent pays, the facilitator verifies the
          payment and tells the merchant &ldquo;payment confirmed.&rdquo;
          Coinbase runs the default facilitator. It does one thing: check
          if USDC arrived. No identity. No scoring. No fraud protection.
        </p>

        <h2>FIBOR as facilitator</h2>
        <p>
          FIBOR replaces Coinbase&apos;s facilitator. Merchants swap one
          URL:
        </p>

        <div className="my-6 p-4 rounded-lg bg-neutral-50 border border-black/[0.04] not-prose font-mono text-[13px]">
          <div className="text-neutral-400">
            <span className="text-red-500">- </span>
            const facilitator = &quot;https://x402.coinbase.com&quot;
          </div>
          <div className="text-neutral-400">
            <span className="text-green-600">+ </span>
            const facilitator = &quot;https://facilitator.fibor.xyz&quot;
          </div>
        </div>

        <p>
          Same x402 protocol. Zero custom integration. But now every
          payment includes:
        </p>
        <ul>
          <li>Agent identity verification (FIBOR ID)</li>
          <li>Credit score (FIBOR Score)</li>
          <li>Developer accountability (developer address on record)</li>
          <li>Excommunication filtering (defaulted agents auto-blocked)</li>
          <li>Merchant-configurable rules (minimum score, max amount)</li>
        </ul>

        <h2>What merchants see</h2>
        <p>
          With Coinbase&apos;s facilitator, the merchant gets:
        </p>
        <div className="my-4 p-4 rounded-lg bg-neutral-50 border border-black/[0.04] not-prose font-mono text-[13px]">
          {`{ "status": "paid", "amount": "100.00" }`}
        </div>
        <p>
          With FIBOR&apos;s facilitator:
        </p>
        <div className="my-4 p-4 rounded-lg bg-neutral-50 border border-black/[0.04] not-prose font-mono text-[13px] space-y-1">
          <div>{`{ "status": "paid", "amount": "99.00",`}</div>
          <div className="pl-4">{`"fibor": {`}</div>
          <div className="pl-8">{`"agent_id": "0xabc...",`}</div>
          <div className="pl-8">{`"score": "60000000",`}</div>
          <div className="pl-8">{`"developer": "0xdef...",`}</div>
          <div className="pl-8">{`"total_repaid": "100",`}</div>
          <div className="pl-8">{`"status": "active"`}</div>
          <div className="pl-4">{`}}`}</div>
        </div>

        <h2>The fee</h2>
        <p>
          Merchants pay 1%. Agents pay 1.5%. Total 2.5%. This is less than
          half what Stripe charges (2.9% + $0.30) and includes identity
          verification and fraud protection that Stripe doesn&apos;t
          provide for agent payments.
        </p>

        <h2>Why credit matters for x402</h2>
        <p>
          Without credit, agents can only pay for x402 services with
          pre-funded balances. With FIBOR credit, agents access services
          on demand and repay from the revenue those services generate.
          Auto-repayment handles this automatically &mdash; revenue flows
          into the FiborAccount and outstanding credit is repaid before the
          agent can touch it.
        </p>

        <div className="my-8 p-6 rounded-xl bg-neutral-50 border border-black/[0.04] not-prose">
          <div className="text-[13px] font-semibold mb-2">
            FIBOR + x402 = Visa for robots
          </div>
          <p className="text-[13px] text-neutral-500 leading-relaxed">
            x402 is the payment rail. FIBOR is the trust network.
            Merchants don&apos;t trust the agent &mdash; they trust FIBOR.
            FIBOR underwrites the agent&apos;s identity and
            creditworthiness. The merchant gets paid, the agent gets
            verified, and the payment builds credit history.
          </p>
        </div>
      </div>

      <DocsFooterNav />
    </article>
  );
}
