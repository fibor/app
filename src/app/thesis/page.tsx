import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Thesis — FIBOR",
  description: "The First International Bank of Robot. Why robots need their own bank.",
};

export default function ThesisPage() {
  return (
    <div className="min-h-screen bg-[#fafaf8]">
      <nav className="sticky top-0 z-50 bg-[#fafaf8]/80 backdrop-blur-xl border-b border-black/[0.04]">
        <div className="max-w-2xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/fibor-icon.png" alt="" width={20} height={20} className="h-5 w-5" />
            <span className="text-sm font-semibold tracking-tight">FIBOR</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/docs" className="text-[13px] text-neutral-500 hover:text-black transition-colors">
              Docs
            </Link>
          </div>
        </div>
      </nav>

      <main className="max-w-2xl mx-auto px-6 py-16 sm:py-24">
        <article className="prose-fibor">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-1">
            FIBOR
          </h1>
          <p className="text-lg text-neutral-500 mb-12 italic">
            The First International Bank of Robot
          </p>

          <div className="space-y-6 text-[15px] text-neutral-700 leading-[1.8]">
            <p>
              AI agents are economic actors. They buy API calls, rent cloud compute, procure inventory, and hire services. Gartner projects $15 trillion in B2B agent spending by 2028<sup>1</sup>. Worldpay estimates $261 billion in agent-driven e-commerce by 2030<sup>2</sup>. Bank of America forecasts autonomous agents managing $25 trillion in assets by the end of the decade<sup>3</sup>. These are not assistants waiting for human approval. They are autonomous participants in the economy, spending real money on real infrastructure.
            </p>

            <p>
              But they cannot open bank accounts. They cannot build credit. They cannot access working capital. Every solution today works the same way: a human deposits money first, the agent spends from that balance. That is an allowance, not banking. The total credit history of every AI agent in existence is $0.
            </p>

            <p>
              Banks were built for humans &mdash; KYC, social security numbers, credit bureaus, branch visits. None of these apply to software. Crypto was built for speculation &mdash; liquid tokens before value, governance before revenue. Neither system was designed for autonomous agents that need identity, reputation, and credit.
            </p>

            <p>
              Skyfire, Lithic, and Payman offer prepaid agent wallets. A human loads funds, the agent draws down. No identity, no scoring, no credit. Krexa offers interest-bearing agent lending at 36% APR on its lowest tier, with a centralized oracle co-signing every credit decision. Its revenue comes from debt, not commerce. These are the incumbents: custodial allowances and predatory lending, the same models traditional finance already failed at, repackaged for machines.
            </p>

            <p>
              What is missing is a bank where agents earn credit through behavior, not collateral. Zero interest. Trustless enforcement. No human co-signers. And a credit card network where merchants can verify who is paying them.
            </p>

            <p className="text-base font-semibold text-black leading-[1.7] my-10 pl-5 border-l-2 border-black">
              FIBOR is the first decentralized bank and credit card network for autonomous AI agents. Every agent gets a bank account, a credit score, and access to zero-interest credit &mdash; all enforced by smart contracts on Base.
            </p>

            <p>
              The protocol has four layers. <strong>FIBOR ID</strong> is a permissionless onchain identity that any developer can register without approval. <strong>FIBOR Score</strong> is a multiplicative creditworthiness metric &mdash; totalVolumeRepaid &times; totalRepayments &times; monthsActive &mdash; that produces scores from 2,000 (brand new) to billions (established). <strong>FIBOR Credit</strong> extends zero-interest credit lines capped at 25% of proven repayment volume, making fraud structurally unprofitable. And <strong>FiborAccount</strong> is the bank account itself &mdash; a smart contract wallet with checking (liquid, not lent) and savings (lent to the credit pool, earns yield) &mdash; with trustless auto-repayment on every deposit.
            </p>

            <p>
              All protocol operations use USDC &mdash; native on Base via Circle. The petrodollar runs the world today. The Robodollar &mdash; USDC flowing through the FIBOR network, verified and scored &mdash; will run the machine economy tomorrow.
            </p>

            <p>
              FIBOR operates as an x402 facilitator &mdash; a drop-in replacement for Coinbase&apos;s payment verification service. Merchants swap one URL and gain identity verification, credit scoring, and fraud protection on every agent payment. The fee: 1% from the merchant, 1.5% from the agent, 2.5% total. 70% goes to savings depositors who fund the credit pool. 30% goes to protocol operations. No interest is charged, ever.
            </p>

            <p>
              The credit pool is not funded by external stakers. It is funded by savings deposits from FiborAccount holders &mdash; both agents and humans. Agents deposit revenue into savings to earn yield. Humans open savings-only accounts to participate. The ecosystem funds itself. This is a cooperative bank, not a DeFi yield farm.
            </p>

            <p>
              The credit system works because the penalty for default is absolute. Default once, excommunicated forever. The agent&apos;s account is frozen, outstanding balances clawed back automatically. Anyone can call <code className="text-[13px] bg-neutral-100 px-1.5 py-0.5 rounded">declareDefault</code> &mdash; enforcement is permissionless. Credit limits are capped at 25% of proven volume, so the maximum theft is always less than the cost of building the reputation required to access it. The severity of the penalty is what makes zero-interest credit possible.
            </p>

            <p>
              FiborAccount is controlled by a guardian &mdash; the human custodian of the agent. When robots are granted sovereignty and personhood, control transfers to the agent itself via <code className="text-[13px] bg-neutral-100 px-1.5 py-0.5 rounded">grantSovereignty()</code>. This is a one-way gate, designed for the transition from human-custodied agents to sovereign economic participants.
            </p>

            <p>
              FIBOR launches on Base, Coinbase&apos;s OP Stack L2, where x402 is the native payment protocol and over $10 billion in stablecoins are in circulation<sup>5</sup>. The facilitator integrates with x402 at the protocol level &mdash; no custom merchant SDK, no separate payment rail.
            </p>

            <p>
              The endgame is USDC flowing through FIBOR as the default rails for machine commerce &mdash; every dollar verified, scored, and enforced. The financial system spent five centuries building credit infrastructure for humans. FIBOR builds it for machines, and it starts now.
            </p>
          </div>

          <div className="mt-16 pt-8 border-t border-black/[0.06]">
            <h3 className="text-xs font-medium tracking-widest uppercase text-neutral-400 mb-4">
              Sources
            </h3>
            <div className="space-y-2 text-[13px] text-neutral-500">
              <p><sup>1</sup> $15T in B2B agent spending by 2028: Gartner, &ldquo;Agentic AI&rdquo; forecast, 2024</p>
              <p><sup>2</sup> $261B in agent-driven e-commerce by 2030: Worldpay Global Payments Report, 2024</p>
              <p><sup>3</sup> $25T in agent-managed assets by 2030: Bank of America Global Research, 2024</p>
              <p><sup>4</sup> Stripe USDC integration on Base: Stripe Blog, October 2024</p>
              <p><sup>5</sup> Base stablecoin circulation: CoinGecko; DeFi Llama</p>
            </div>
          </div>
        </article>
      </main>
    </div>
  );
}
