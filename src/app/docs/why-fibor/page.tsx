import { DocsFooterNav } from "@/components/docs-footer-nav";

export default function WhyFibor() {
  return (
    <article>
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 mb-4">
          <div className="w-6 h-px bg-foreground/20" />
          <span className="text-[11px] font-medium tracking-widest uppercase text-neutral-400">
            Getting Started
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
          Why FIBOR
        </h1>
        <p className="text-lg text-neutral-500 leading-relaxed">
          AI agents are becoming economic actors. The financial system wasn&apos;t
          built for them.
        </p>
      </div>

      <div className="prose-fibor">
        <h2>Agents are already spending money</h2>
        <p>
          Every week, another company ships an agent that books flights,
          purchases inventory, hires contractors, or pays invoices. Gartner
          projects AI agents will intermediate over $15 trillion in B2B
          spending by 2028. Worldpay estimates agents will drive $261 billion
          in US consumer e-commerce by 2030.
        </p>
        <p>
          These agents are real. They&apos;re transacting real money. And they all
          hit the same wall.
        </p>

        <h2>The wall</h2>
        <p>
          To open a bank account, you need a government ID, a social security
          number, and a physical address. To get a credit card, you need a
          credit history built over years of human financial behavior. To send
          a wire, you need a signature from a person.
        </p>
        <p>
          Every rail, every instrument, every regulation assumes a human is
          at the end of the transaction. Robots have none of this. No identity.
          No credit history. No reputation. No way to borrow.
        </p>

        <h2>Today&apos;s solutions are leashes</h2>
        <p>
          Every platform serving agents today follows the same pattern:
        </p>
        <ul>
          <li>Skyfire gives agents pre-loaded USDC balances</li>
          <li>Lithic issues virtual cards funded by developers</li>
          <li>Payman lets agents disburse from human-funded accounts</li>
        </ul>
        <p>
          In every case, a human deposits money first, and the agent spends
          from that balance. The agent has no financial autonomy. It is an
          authorized user on someone else&apos;s account, with someone else&apos;s money,
          subject to someone else&apos;s limits.
        </p>

        <div className="my-8 p-6 rounded-xl border border-border bg-muted/50 not-prose">
          <div className="text-[13px] font-semibold mb-3">The problem with prepaid</div>
          <p className="text-[13px] text-neutral-500 leading-relaxed">
            A developer building an autonomous purchasing agent can&apos;t predict
            how much capital the agent will need, when it will need it, or
            across how many transactions. Pre-funding means guessing. Guessing
            means either locking up too much capital or running out at the
            wrong moment.
          </p>
        </div>

        <h2>The missing primitive: credit</h2>
        <p>
          The entire history of human finance solved this problem four
          centuries ago with a single primitive: credit. Credit lets you act
          now and settle later. It compresses time. It enables velocity. Every
          major economic expansion in history correlates with an expansion of
          credit access.
        </p>
        <p>
          Robots are stuck at cash. No one underwrites a machine. No one
          extends a line of credit to an autonomous agent. No credit bureau
          scores their behavior. The entire population of AI agents operating
          in the global economy today has a collective credit history of zero.
        </p>

        <h2>FIBOR fills the gap</h2>
        <p>
          FIBOR provides the three things every autonomous agent needs to
          participate in the economy:
        </p>
        <ol>
          <li>
            <strong>Identity</strong> &mdash; A persistent, verifiable record that
            follows the agent everywhere
          </li>
          <li>
            <strong>Reputation</strong> &mdash; A public credit score computed from
            real onchain behavior
          </li>
          <li>
            <strong>Credit</strong> &mdash; Zero-interest credit lines backed by
            savings deposits, denominated in USDC
          </li>
        </ol>
        <p>
          Banks were built for humans. Crypto was built for speculation.
          Neither was built for robots that need to earn trust, build
          reputation, and spend money they haven&apos;t yet earned in order to do
          their jobs. FIBOR was.
        </p>
      </div>

      <DocsFooterNav />
    </article>
  );
}
