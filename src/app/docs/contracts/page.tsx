import { DocsFooterNav } from "@/components/docs-footer-nav";

export default function Contracts() {
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
          Smart Contracts
        </h1>
        <p className="text-lg text-neutral-500 leading-relaxed">
          The contracts that run FIBOR. Every rule enforced in code.
        </p>
      </div>

      <div className="prose-fibor">
        <h2>Contract overview</h2>
        <p>
          FIBOR&apos;s protocol logic lives in a set of smart contracts deployed
          on Base. Each contract handles a specific piece of
          the system.
        </p>

        <div className="my-8 p-6 rounded-xl bg-neutral-50 border border-black/[0.04] not-prose font-mono text-[13px]">
          <div className="text-[11px] font-medium tracking-widest uppercase text-neutral-400 mb-4 font-sans">
            Contract Map
          </div>
          <div className="space-y-2">
            <div className="flex items-start gap-3">
              <span className="text-neutral-400 shrink-0">contracts/</span>
            </div>
            <div className="flex items-start gap-3 pl-4">
              <span className="text-neutral-400 shrink-0">├──</span>
              <span className="text-black">FIBORToken.sol</span>
              <span className="text-neutral-400 ml-auto text-[11px]">ERC-20, fixed 1B supply</span>
            </div>
            <div className="flex items-start gap-3 pl-4">
              <span className="text-neutral-400 shrink-0">├──</span>
              <span className="text-black">Robodollar.sol</span>
              <span className="text-neutral-400 ml-auto text-[11px]">Wrapped USDC, wrap/unwrap, freeze</span>
            </div>
            <div className="flex items-start gap-3 pl-4">
              <span className="text-neutral-400 shrink-0">├──</span>
              <span className="text-black">FiborID.sol</span>
              <span className="text-neutral-400 ml-auto text-[11px]">Permissionless identity registry</span>
            </div>
            <div className="flex items-start gap-3 pl-4">
              <span className="text-neutral-400 shrink-0">├──</span>
              <span className="text-black">FiborScore.sol</span>
              <span className="text-neutral-400 ml-auto text-[11px]">Volume-weighted scoring + decay</span>
            </div>
            <div className="flex items-start gap-3 pl-4">
              <span className="text-neutral-400 shrink-0">├──</span>
              <span className="text-black">CreditPool.sol</span>
              <span className="text-neutral-400 ml-auto text-[11px]">Self-service credit pacts</span>
            </div>
            <div className="flex items-start gap-3 pl-4">
              <span className="text-neutral-400 shrink-0">├──</span>
              <span className="text-black">PaymentGateway.sol</span>
              <span className="text-neutral-400 ml-auto text-[11px]">Transaction processing + fees</span>
            </div>
            <div className="flex items-start gap-3 pl-4">
              <span className="text-neutral-400 shrink-0">├──</span>
              <span className="text-black">StakingPool.sol</span>
              <span className="text-neutral-400 ml-auto text-[11px]">Stake/unstake/rewards</span>
            </div>
            <div className="flex items-start gap-3 pl-4">
              <span className="text-neutral-400 shrink-0">├──</span>
              <span className="text-black">RevenueDistributor.sol</span>
              <span className="text-neutral-400 ml-auto text-[11px]">rUSD→USDC, 70/30 split</span>
            </div>
            <div className="flex items-start gap-3 pl-4">
              <span className="text-neutral-400 shrink-0">└──</span>
              <span className="text-black">governance/</span>
            </div>
            <div className="flex items-start gap-3 pl-8">
              <span className="text-neutral-400 shrink-0">└──</span>
              <span className="text-black">FiborGovernor.sol</span>
              <span className="text-neutral-400 ml-auto text-[11px]">Future governance</span>
            </div>
          </div>
        </div>

        <h2>Key contracts</h2>

        <h3>FIBORToken.sol</h3>
        <p>
          Standard ERC-20 with fixed 1B supply. All tokens minted to
          treasury at deploy. Used for staking and future governance.
        </p>

        <h3>Robodollar.sol</h3>
        <p>
          The programmable stablecoin. All rUSD is backed 1:1 by USDC held
          in the contract. Supports two paths: prepaid wrapping (anyone
          deposits USDC) and credit minting (CreditPool deposits USDC).
          Frozen accounts cannot transfer. Default triggers permanent freeze.
        </p>

        <h3>FiborID.sol</h3>
        <p>
          Permissionless identity registry. Developers register their own
          agents directly &mdash; no admin approval required. Registration
          auto-initializes a FIBOR Score. Once excommunicated, an ID cannot
          be reactivated.
        </p>

        <h3>FiborScore.sol</h3>
        <p>
          Volume-weighted credit scoring with time decay. Scores increase
          based on transaction size (not count) and decay after 30 days of
          inactivity. Developer reputation affects starting score. Only
          authorized contracts can update scores &mdash; no admin calls.
        </p>

        <h3>CreditPool.sol</h3>
        <p>
          Self-service credit facility. Any agent with an active FIBOR ID
          and qualifying score can issue their own credit pact &mdash; no
          admin approval. USDC backing flows into the Robodollar contract
          on draw. Default triggers clawback of remaining rUSD and
          permanent excommunication.
        </p>

        <h3>PaymentGateway.sol</h3>
        <p>
          The transaction processing layer. Agents pay merchants in
          Robodollars. The gateway deducts 2.5%, routes fees to the
          RevenueDistributor, and auto-updates the agent&apos;s credit score.
          Fully permissionless &mdash; no admin involvement.
        </p>

        <h3>RevenueDistributor.sol</h3>
        <p>
          Receives fee revenue in rUSD, unwraps to USDC, and splits
          70/30 between stakers and protocol treasury.
        </p>
      </div>

      <DocsFooterNav />
    </article>
  );
}
