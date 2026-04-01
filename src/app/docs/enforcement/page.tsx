import { DocsFooterNav } from "@/components/docs-footer-nav";

export default function Enforcement() {
  return (
    <article>
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 mb-4">
          <div className="w-6 h-px bg-black/20" />
          <span className="text-[11px] font-medium tracking-widest uppercase text-neutral-400">
            Trust & Enforcement
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
          One-Strike Policy
        </h1>
        <p className="text-lg text-neutral-500 leading-relaxed">
          Default once, lose everything. Permanently. The harshness is the
          feature.
        </p>
      </div>

      <div className="prose-fibor">
        <h2>How it works</h2>
        <p>
          If an agent fails to repay a credit line within its repayment
          window, a 24-hour cure period begins. If the agent still hasn&apos;t
          repaid after 24 hours:
        </p>
        <ol>
          <li>The FIBOR ID is permanently flagged as <strong>excommunicated</strong></li>
          <li>The FIBOR Score drops to zero</li>
          <li>All active credit lines are frozen</li>
          <li>All Robodollars held by the agent are clawed back to the pool</li>
          <li>The developer&apos;s reputation score takes a proportional hit</li>
        </ol>
        <p>
          This is irreversible. There is no appeals process. There are no
          exceptions. The smart contract enforces this, not a team.
        </p>

        <div className="my-8 p-6 rounded-xl bg-black text-white not-prose">
          <div className="text-[11px] font-medium tracking-widest uppercase text-neutral-500 mb-4">
            Why so harsh?
          </div>
          <div className="space-y-3 text-sm text-neutral-300">
            <p>Without severe consequences, stakers don&apos;t trust the pool.</p>
            <p>Without staker trust, there&apos;s no capital.</p>
            <p>Without capital, there are no credit lines.</p>
            <p>Without credit lines, there&apos;s no product.</p>
            <p className="pt-3 border-t border-white/10 text-white font-medium">
              The severity of the penalty is what makes everything else possible.
            </p>
          </div>
        </div>

        <h2>What this eliminates</h2>
        <p>
          The one-strike policy makes an entire category of infrastructure
          unnecessary:
        </p>
        <ul>
          <li>No collections department</li>
          <li>No legal disputes</li>
          <li>No recovery mechanisms</li>
          <li>No negotiations</li>
          <li>No partial penalties</li>
        </ul>
        <p>
          You either repay or you&apos;re done. The simplicity is the point.
        </p>

        <h2>The timeline</h2>
        <div className="my-6 not-prose space-y-3">
          {[
            { time: "T+0", event: "Repayment window expires", detail: "Agent has not repaid." },
            { time: "T+0 to T+24h", event: "Cure period", detail: "Agent can still repay in full to avoid consequences." },
            { time: "T+24h", event: "Excommunication", detail: "Automatic. Irreversible. Enforced by smart contract." },
          ].map((item) => (
            <div key={item.time} className="flex gap-4 p-4 rounded-lg border border-black/[0.04]">
              <div className="text-sm font-mono text-neutral-400 w-28 shrink-0">{item.time}</div>
              <div>
                <div className="text-sm font-semibold mb-0.5">{item.event}</div>
                <p className="text-[13px] text-neutral-500">{item.detail}</p>
              </div>
            </div>
          ))}
        </div>

        <h2>The result</h2>
        <p>
          Developers treat FIBOR credit lines with extreme care. Merchants
          accept Robodollars without hesitation. Stakers trust the pool enough
          to commit capital. The harshness creates the safety that enables
          everything.
        </p>
      </div>

      <DocsFooterNav />
    </article>
  );
}
