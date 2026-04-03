import { DocsFooterNav } from "@/components/docs-footer-nav";

export default function Architecture() {
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
          Chain & Infrastructure
        </h1>
        <p className="text-lg text-neutral-500 leading-relaxed">
          Deployed on Base. Built for one thing: non-human finance.
        </p>
      </div>

      <div className="prose-fibor">
        <h2>Why Base?</h2>
        <p>
          FIBOR deploys on Base &mdash; Coinbase&apos;s OP Stack L2 with native
          USDC support through Circle&apos;s partnership. This gives FIBOR
          access to existing liquidity, low gas costs, and fast confirmations
          without the overhead of bootstrapping a new chain.
        </p>
        <p>
          Agent transactions are high frequency and low value. Base&apos;s
          sub-cent gas fees and two-second block times are ideal for this
          pattern. And because Base is built on the OP Stack, FIBOR inherits
          Ethereum-grade security without running its own sequencer or
          validator set.
        </p>

        <h2>Infrastructure</h2>
        <ul>
          <li>Ethereum-grade security inherited through Base&apos;s OP Stack architecture</li>
          <li>Native USDC on Base &mdash; no bridging required for Robodollar minting</li>
          <li>Sub-cent gas fees optimized for high-frequency agent transactions</li>
          <li>Existing developer tooling, block explorers, and wallet support</li>
          <li>Protocol-first &mdash; FIBOR focuses on credit infrastructure, not chain operations</li>
        </ul>

        <h2>What lives on the chain</h2>
        <div className="my-6 not-prose space-y-3">
          {[
            { item: "FIBOR token", desc: "ERC-20 governance token" },
            { item: "Robodollar (R$)", desc: "USDC denomination for the FIBOR network" },
            { item: "FIBOR IDs", desc: "Persistent identity registry for all agents" },
            { item: "FIBOR Scores", desc: "Real-time credit scores computed from onchain data" },
            { item: "Credit pacts", desc: "Individual credit line terms and repayment windows" },
            { item: "FiborAccounts", desc: "Bank accounts with checking, savings, and auto-repay" },
            { item: "Revenue distribution", desc: "Automatic fee collection and depositor payouts" },
          ].map((row) => (
            <div key={row.item} className="flex gap-4 p-4 rounded-lg border border-black/[0.04]">
              <span className="text-sm font-semibold w-40 shrink-0">{row.item}</span>
              <p className="text-[13px] text-neutral-500">{row.desc}</p>
            </div>
          ))}
        </div>

        <h2>External integrations</h2>
        <ul>
          <li><strong>USDC (Circle)</strong> &mdash; Native USDC on Base &mdash; the underlying asset for all R$ operations</li>
          <li><strong>Base (OP Stack L2)</strong> &mdash; Settlement, block production, inherited Ethereum L1 security</li>
          <li><strong>x402 Protocol</strong> &mdash; HTTP-native agent payment integration</li>
          <li><strong>Chainlink / API3</strong> &mdash; Price feeds if needed for USD conversions</li>
        </ul>

        <h2>Graduation path</h2>
        <p>
          FIBOR launches on Base to access existing liquidity and tooling.
          When transaction volume justifies dedicated throughput and custom
          gas parameters, FIBOR can graduate to its own OP Stack appchain.
        </p>
        <p>
          Because Base is itself OP Stack, this migration is a clean upgrade
          path &mdash; same EVM, same bridge architecture, same tooling. The
          contracts, identities, and credit histories port directly. But
          that&apos;s a decision for the future, driven by real demand.
        </p>
      </div>

      <DocsFooterNav />
    </article>
  );
}
