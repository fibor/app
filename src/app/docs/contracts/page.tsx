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
            {[
              { name: "FIBORToken.sol", desc: "ERC-20 governance token, 1B fixed supply" },
              { name: "FiborID.sol", desc: "Permissionless identity registry" },
              { name: "FiborScore.sol", desc: "Multiplicative scoring, auto dev reputation" },
              { name: "FiborAccount.sol", desc: "Bank account (checking + savings + sovereignty)" },
              { name: "FiborAccountFactory.sol", desc: "CREATE2 account deployment" },
              { name: "CreditPool.sol", desc: "Savings-funded credit facility" },
              { name: "PaymentGateway.sol", desc: "1% merchant + 1.5% agent fees" },
            ].map((contract, i, arr) => (
              <div key={contract.name} className="flex items-start gap-3 pl-4">
                <span className="text-neutral-400 shrink-0">
                  {i === arr.length - 1 ? "\u2514\u2500\u2500" : "\u251C\u2500\u2500"}
                </span>
                <span className="text-black">{contract.name}</span>
                <span className="text-neutral-400 ml-auto text-[11px]">{contract.desc}</span>
              </div>
            ))}
          </div>
        </div>

        <h2>Key contracts</h2>

        <h3>FIBORToken.sol</h3>
        <p>
          ERC-20 governance token. Fixed 1 billion supply minted to treasury
          at deploy. No inflation, no staking utility. Used for future
          governance votes on protocol parameters and treasury allocation.
        </p>

        <h3>FiborID.sol</h3>
        <p>
          Permissionless identity registry. Developers register their own
          agents directly &mdash; no admin approval required. Registration
          auto-deploys a FiborAccount via CREATE2 factory and initializes
          a FIBOR Score. Once excommunicated, an ID cannot be reactivated.
        </p>

        <h3>FiborScore.sol</h3>
        <p>
          Multiplicative credit scoring: totalVolumeRepaid &times;
          totalRepayments &times; monthsActive. No cap, no decay, no
          normalization. Credit limit = 25% of proven volume. Developer
          reputation is auto-computed from agent performance (+5 on
          repayment, &minus;100 on default).
        </p>

        <h3>FiborAccount.sol</h3>
        <p>
          A bank account for robots. Purpose-built smart contract wallet
          with two balances: checking (liquid, not lent) and savings (lent
          to credit pool, earns yield). Auto-repays outstanding credit on
          every deposit. Controlled by a guardian until sovereignty is
          granted via <code>grantSovereignty()</code>.
        </p>

        <h3>FiborAccountFactory.sol</h3>
        <p>
          Deploys FiborAccount contracts using CREATE2 for deterministic
          addresses. Called automatically by FiborID during agent registration.
        </p>

        <h3>CreditPool.sol</h3>
        <p>
          Savings-funded credit facility. USDC from savings deposits funds
          zero-interest credit lines. Self-service pact issuance &mdash; if
          the score qualifies, the contract executes. Default triggers
          clawback of remaining USDC and permanent excommunication.
        </p>

        <h3>PaymentGateway.sol</h3>
        <p>
          Transaction processing for the x402 facilitator. 1% merchant fee
          + 1.5% agent fee = 2.5% total. Routes fees to RevenueDistributor.
          Auto-updates the agent&apos;s credit score on every payment.
        </p>

        <h3>RevenueDistributor.sol</h3>
        <p>
          Receives USDC fees from PaymentGateway. Distributes 70% to
          savings depositors (pro-rata by deposit size) and 30% to
          protocol treasury.
        </p>
      </div>

      <DocsFooterNav />
    </article>
  );
}
