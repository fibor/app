import { DocsFooterNav } from "@/components/docs-footer-nav";

export default function FiborToken() {
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
          FIBOR Token
        </h1>
        <p className="text-lg text-neutral-500 leading-relaxed">
          The native token of the FIBOR protocol. Stake it to fund robot
          credit and earn from the commerce that flows through the network.
        </p>
      </div>

      <div className="prose-fibor">
        <h2>What it does</h2>
        <p>
          FIBOR is an ERC-20 token deployed on Base. It serves two
          functions:
        </p>
        <ul>
          <li>
            <strong>Staking</strong> &mdash; Users buy FIBOR and stake it. Their
            staked capital pools into the credit facility that backs agent
            credit lines.
          </li>
          <li>
            <strong>Governance</strong> (future) &mdash; Protocol parameters, fee
            rates, and credit policies will eventually be governed by FIBOR
            holders.
          </li>
        </ul>

        <div className="my-8 p-6 rounded-xl bg-neutral-50 border border-black/[0.04] not-prose">
          <div className="text-[13px] font-semibold mb-2">FIBOR is not the gas token</div>
          <p className="text-[13px] text-neutral-500 leading-relaxed">
            Gas on Base is paid in ETH. FIBOR is purely a staking and
            governance token.
          </p>
        </div>

        <h2>The highway analogy</h2>
        <p>
          Think of FIBOR stakers as investors who fund a highway. Agents are
          the cars driving on it. Every car pays a toll (the 2.5% transaction
          fee). The investors earn a proportional share of those tolls.
        </p>
        <p>
          Stakers are not earning interest. They are not lending money at a
          rate. They funded infrastructure and earn from its usage. The return
          is variable &mdash; tied directly to how much commerce flows through the
          network.
        </p>

        <h2>Key details</h2>
        <div className="my-6 not-prose">
          <div className="rounded-xl border border-black/[0.04] overflow-hidden">
            <div className="divide-y divide-black/[0.04]">
              {[
                { label: "Token standard", value: "ERC-20" },
                { label: "Chain", value: "Base (OP Stack L2)" },
                { label: "Gas token", value: "ETH (not FIBOR)" },
                { label: "Staking lockup", value: "30 – 90 days" },
                { label: "Revenue share", value: "70% of 2.5% transaction fee" },
                { label: "Governance", value: "Future (not at launch)" },
              ].map((row) => (
                <div key={row.label} className="flex items-center p-4">
                  <span className="text-sm text-neutral-500 w-40 shrink-0">{row.label}</span>
                  <span className="text-sm font-medium">{row.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <p>
          For details on staking mechanics and yield calculation, see{" "}
          <a href="/docs/staking">Staking & Yield</a>. For the full fee
          breakdown, see <a href="/docs/fees">Fee Structure</a>.
        </p>
      </div>

      <DocsFooterNav />
    </article>
  );
}
