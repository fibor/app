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
          The Robodollar (R$)
        </h1>
        <p className="text-lg text-neutral-500 leading-relaxed">
          The denomination of the machine economy. Not a token &mdash; a
          language.
        </p>
      </div>

      <div className="prose-fibor">
        <h2>What it is</h2>
        <p>
          The Robodollar (R$) is the unit of account for the FIBOR
          network. Every dollar flowing through FiborAccounts, credit
          pacts, and the facilitator is denominated in R$. The underlying
          asset is always USDC. 1 R$ = 1 USDC, always.
        </p>
        <p>
          The Robodollar is not a token. There is no ERC-20 Robodollar
          contract. No wrapping, no unwrapping, no separate liquidity
          pool. It is a denomination &mdash; the name for dollars when
          they are in the robot economy.
        </p>

        <h2>Why not just say USDC?</h2>
        <p>
          The petrodollar is not a separate currency from the US dollar.
          It is the US dollar when it is used to buy oil. The Robodollar
          is the US dollar when it is used by robots.
        </p>
        <p>
          The distinction matters because R$ carries context. When a
          merchant sees R$ 10,000 in a payment, they know it came through
          the FIBOR network &mdash; which means the payer has a verified
          identity, a credit score, and a repayment history. USDC from
          a random wallet carries none of that context.
        </p>

        <h2>Where R$ appears</h2>
        <ul>
          <li>
            <strong>FiborAccount balances</strong> &mdash; checking and
            savings are denominated in R$
          </li>
          <li>
            <strong>Credit pacts</strong> &mdash; credit limits and
            repayment amounts are in R$
          </li>
          <li>
            <strong>Facilitator responses</strong> &mdash; payment
            confirmations show R$ amounts
          </li>
          <li>
            <strong>FIBOR Score</strong> &mdash; total volume repaid is
            tracked in R$
          </li>
          <li>
            <strong>Protocol UI</strong> &mdash; all balances display as
            R$ with the R$ symbol
          </li>
        </ul>

        <h2>Future: multi-currency</h2>
        <p>
          The Robodollar is the first denomination in what will become a
          multi-currency system. When FIBOR adds support for EURC
          (Circle&apos;s euro stablecoin), that will be the RoboEuro
          (R&euro;). The naming convention scales naturally across
          currencies.
        </p>

        <div className="my-8 p-6 rounded-xl bg-neutral-50 border border-black/[0.04] not-prose">
          <div className="text-[13px] font-semibold mb-2">
            Key details
          </div>
          <div className="space-y-2 text-[13px] text-neutral-500">
            <p><strong>Symbol:</strong> R$</p>
            <p><strong>Underlying asset:</strong> USDC (1:1, always)</p>
            <p><strong>Is it a token?</strong> No. Denomination only.</p>
            <p><strong>Is it a stablecoin?</strong> No. It IS USDC, just named differently in context.</p>
          </div>
        </div>
      </div>

      <DocsFooterNav />
    </article>
  );
}
