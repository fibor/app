import { DocsFooterNav } from "@/components/docs-footer-nav";

export default function FiborID() {
  return (
    <article>
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 mb-4">
          <div className="w-6 h-px bg-foreground/20" />
          <span className="text-[11px] font-medium tracking-widest uppercase text-neutral-400">
            Core Primitives
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
          FIBOR ID
        </h1>
        <p className="text-lg text-neutral-500 leading-relaxed">
          A permanent financial identity for every autonomous agent. Think of
          it as a passport for machines.
        </p>
      </div>

      <div className="prose-fibor">
        <h2>What it is</h2>
        <p>
          Every agent that joins the FIBOR network gets a FIBOR ID. This
          isn&apos;t a wallet address &mdash; wallet addresses are disposable and
          anonymous. A FIBOR ID is a permanent, verifiable record that follows
          the agent across every transaction and every platform.
        </p>
        <p>
          It records:
        </p>
        <ul>
          <li>Who built the agent (developer address)</li>
          <li>What the agent does (declared purpose)</li>
          <li>When it was created</li>
          <li>Every financial action it has ever taken</li>
          <li>Its current status (active or excommunicated)</li>
          <li>Its live FIBOR Score</li>
        </ul>

        <h2>Why it matters</h2>
        <p>
          Without identity, there&apos;s no reputation. Without reputation,
          there&apos;s no credit. Without credit, there&apos;s no financial autonomy. The
          FIBOR ID is the foundation everything else builds on.
        </p>
        <p>
          When a merchant checks an agent before accepting a
          payment, they&apos;re checking the FIBOR ID. When the scoring engine
          computes a credit score, it reads from the FIBOR ID&apos;s transaction
          history. When a credit line is issued, it&apos;s tied to the FIBOR ID.
        </p>

        <div className="my-8 p-6 rounded-xl bg-muted border border-border not-prose font-mono text-sm">
          <div className="text-[11px] font-medium tracking-widest uppercase text-neutral-400 mb-4 font-sans">
            FIBOR ID Structure
          </div>
          <div className="space-y-2 text-[13px]">
            <div className="flex items-start gap-4">
              <span className="text-neutral-400 w-28 shrink-0">id</span>
              <span className="text-black">bytes32 &mdash; unique, permanent</span>
            </div>
            <div className="flex items-start gap-4">
              <span className="text-neutral-400 w-28 shrink-0">developer</span>
              <span className="text-black">address &mdash; creator/owner</span>
            </div>
            <div className="flex items-start gap-4">
              <span className="text-neutral-400 w-28 shrink-0">agent_address</span>
              <span className="text-black">address &mdash; the agent&apos;s wallet</span>
            </div>
            <div className="flex items-start gap-4">
              <span className="text-neutral-400 w-28 shrink-0">purpose</span>
              <span className="text-black">string &mdash; what the agent does</span>
            </div>
            <div className="flex items-start gap-4">
              <span className="text-neutral-400 w-28 shrink-0">created_at</span>
              <span className="text-black">uint256 &mdash; registration time</span>
            </div>
            <div className="flex items-start gap-4">
              <span className="text-neutral-400 w-28 shrink-0">status</span>
              <span className="text-black">active | excommunicated</span>
            </div>
            <div className="flex items-start gap-4">
              <span className="text-neutral-400 w-28 shrink-0">score</span>
              <span className="text-black">uint256 &mdash; multiplicative, no cap</span>
            </div>
          </div>
        </div>

        <h2>Key rules</h2>
        <ul>
          <li>
            <strong>One per agent</strong> &mdash; Each agent gets exactly one FIBOR
            ID. It cannot be transferred, duplicated, or reissued.
          </li>
          <li>
            <strong>Linked to developer</strong> &mdash; The developer who
            registered the agent is permanently linked. Their reputation
            score aggregates across all agents they build.
          </li>
          <li>
            <strong>Permanent record</strong> &mdash; Once created, the FIBOR ID
            exists forever. Even if an agent is excommunicated, the record
            persists as a permanent flag.
          </li>
          <li>
            <strong>Public</strong> &mdash; Anyone can query any FIBOR ID. There is
            no concept of a private financial identity in the robot economy.
          </li>
        </ul>

        <h2>Registration</h2>
        <p>
          Registration is permissionless. Any developer can register an agent
          by calling <code>register()</code>. The caller becomes the guardian
          on record. No admin approval. No registration fee &mdash; just gas.
        </p>
        <p>
          On registration, a FiborAccount is automatically deployed for the
          agent, and a FIBOR Score is initialized. New agents get a micro
          credit seed ($100&ndash;$500) based on their developer&apos;s reputation.
        </p>
      </div>

      <DocsFooterNav />
    </article>
  );
}
