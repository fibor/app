import { DocsFooterNav } from "@/components/docs-footer-nav";

export default function FiborToken() {
  return (
    <article>
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 mb-4">
          <div className="w-6 h-px bg-foreground/20" />
          <span className="text-[11px] font-medium tracking-widest uppercase text-neutral-400">
            Economics
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
          FIBOR Token
        </h1>
        <p className="text-lg text-neutral-500 leading-relaxed">
          The governance token of the FIBOR protocol. Vote on parameters,
          fees, and treasury allocation.
        </p>
      </div>

      <div className="prose-fibor">
        <h2>What it does</h2>
        <p>
          FIBOR is an ERC-20 governance token deployed on Base. It serves
          one function: governance of the protocol.
        </p>
        <ul>
          <li>
            <strong>Governance</strong> &mdash; FIBOR holders vote on
            protocol parameters: fee rates, credit limits, treasury
            allocation, and protocol upgrades.
          </li>
        </ul>

        <div className="my-8 p-6 rounded-xl bg-black text-white not-prose">
          <div className="text-[13px] font-semibold mb-2">
            FIBOR is not for staking or savings
          </div>
          <p className="text-[13px] text-neutral-400 leading-relaxed">
            The credit pool is funded by USDC savings deposits in
            FiborAccounts, not by staking FIBOR tokens. You do not need
            FIBOR tokens to earn yield &mdash; just deposit USDC into
            savings. FIBOR is purely a governance token.
          </p>
        </div>

        <h2>Key details</h2>
        <div className="my-6 not-prose">
          <div className="rounded-xl border border-border overflow-hidden">
            <div className="divide-y divide-border">
              {[
                { label: "Token standard", value: "ERC-20" },
                { label: "Chain", value: "Base (OP Stack L2)" },
                { label: "Total supply", value: "1,000,000,000 (fixed, no inflation)" },
                { label: "Gas token", value: "ETH (not FIBOR)" },
                { label: "Utility", value: "Governance (parameter votes, treasury)" },
                { label: "Staking", value: "Not applicable — savings deposits are in USDC" },
              ].map((row) => (
                <div key={row.label} className="flex items-center p-4">
                  <span className="text-sm text-neutral-500 w-40 shrink-0">{row.label}</span>
                  <span className="text-sm font-medium">{row.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <DocsFooterNav />
    </article>
  );
}
