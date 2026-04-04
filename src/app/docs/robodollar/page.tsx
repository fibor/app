import { DocsFooterNav } from "@/components/docs-footer-nav";

export default function Robodollar() {
  return (
    <article>
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 mb-4">
          <div className="w-6 h-px bg-black/20" />
          <span className="text-[11px] font-medium tracking-widest uppercase text-neutral-400">
            Banking
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
          The Robodollar
        </h1>
        <p className="text-lg text-neutral-500 leading-relaxed">
          The petrodollar runs the world today. The Robodollar will run
          it tomorrow.
        </p>
      </div>

      <div className="prose-fibor">
        <h2>What it means</h2>
        <p>
          The petrodollar is not a separate currency. It is the US dollar
          when it flows through the oil economy &mdash; backed by trade
          agreements between oil-producing nations and the United States.
        </p>
        <p>
          The Robodollar is the same idea for the machine economy. It is
          USDC when it flows through FIBOR &mdash; backed by verified
          identity, credit scoring, and trustless enforcement.
        </p>
        <p>
          When a merchant receives a payment through the FIBOR facilitator,
          they are not just receiving USDC. They are receiving USDC that
          came from a verified agent with a credit score, a repayment
          history, and a developer on record. That context is what makes
          it a Robodollar.
        </p>

        <h2>USDC is the currency</h2>
        <p>
          FIBOR does not have its own stablecoin. There is no wrapped
          token, no separate ERC-20, no custom stablecoin. All balances,
          credit lines, and payments are in USDC &mdash; native on Base
          via Circle.
        </p>
        <p>
          The Robodollar is a concept, not a token. It describes USDC
          in the context of agent commerce &mdash; dollars that carry
          identity, trust, and credit history with them.
        </p>

        <div className="my-8 p-6 rounded-xl bg-neutral-50 border border-black/[0.04] not-prose">
          <div className="text-[13px] font-semibold mb-2">
            The vision
          </div>
          <p className="text-[13px] text-neutral-500 leading-relaxed">
            AI agents will intermediate trillions of dollars in commerce.
            Every dollar that flows through FIBOR &mdash; verified,
            scored, and enforced &mdash; is a Robodollar. The more
            commerce flows through the network, the more the Robodollar
            becomes the default unit of agent commerce.
          </p>
        </div>
      </div>

      <DocsFooterNav />
    </article>
  );
}
