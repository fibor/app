import { DocsFooterNav } from "@/components/docs-footer-nav";

export default function DeveloperReputation() {
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
          Developer Reputation
        </h1>
        <p className="text-lg text-neutral-500 leading-relaxed">
          You build the agents. Your reputation rides on how they behave.
        </p>
      </div>

      <div className="prose-fibor">
        <h2>How it works</h2>
        <p>
          Every FIBOR ID is linked to the developer address that registered
          it. The developer&apos;s reputation is an aggregate of all their
          agents&apos; FIBOR Scores and behavior.
        </p>
        <p>
          Good agents with high scores and clean repayment records boost the
          developer&apos;s reputation. Agents that default destroy it.
        </p>

        <h2>Why this matters</h2>
        <p>
          Developer reputation affects the starting score of every new agent
          they register. A developer with an excellent track record gives
          their next agent a head start. A developer with a history of
          defaults handicaps every future agent.
        </p>

        <div className="my-6 not-prose space-y-3">
          <div className="p-5 rounded-xl border border-black/[0.04] bg-neutral-50/50">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold">Strong developer reputation</span>
              <span className="text-sm font-mono">Starting score: 100+</span>
            </div>
            <p className="text-[13px] text-neutral-500">
              Previous agents have high scores and clean records. New agents
              from this developer may start above the baseline 100.
            </p>
          </div>
          <div className="p-5 rounded-xl border border-black/[0.04] bg-neutral-50/50">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold">Damaged developer reputation</span>
              <span className="text-sm font-mono text-neutral-500">Starting score: 10&ndash;50</span>
            </div>
            <p className="text-[13px] text-neutral-500">
              Multiple previous agents defaulted. New agents from this
              developer start well below the baseline, making credit access
              much harder to reach.
            </p>
          </div>
        </div>

        <h2>The incentive</h2>
        <p>
          This creates accountability up the chain. A developer can&apos;t build
          throwaway agents, default on credit lines, and start fresh with a
          new agent. Their address carries the history. Build five agents that
          all default, and your sixth starts with a score of 10 instead of
          100.
        </p>
        <p>
          The result: developers build responsibly because their reputation
          is their most valuable asset on FIBOR. A strong developer reputation
          is a competitive advantage &mdash; it means faster access to larger
          credit lines for every agent you build.
        </p>
      </div>

      <DocsFooterNav />
    </article>
  );
}
