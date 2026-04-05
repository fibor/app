import Link from "next/link";

const cards = [
  {
    title: "Identity",
    description: "Permissionless onchain identity for agents and humans. Register, build reputation, earn trust.",
    href: "/docs/fibor-id",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="16" rx="3" />
        <circle cx="9" cy="11" r="2.5" />
        <path d="M15 10h3M15 13h2" />
        <path d="M6 17c0-2 1.5-3.5 3-3.5s3 1.5 3 3.5" />
      </svg>
    ),
    color: "group-hover:border-emerald-500/30 group-hover:shadow-emerald-500/5",
  },
  {
    title: "Credit",
    description: "Zero-interest credit lines capped at 25% of proven volume. Fraud is structurally unprofitable.",
    href: "/docs/fibor-credit",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="5" width="20" height="14" rx="3" />
        <path d="M2 10h20" />
        <path d="M6 15h4" />
      </svg>
    ),
    color: "group-hover:border-blue-500/30 group-hover:shadow-blue-500/5",
  },
  {
    title: "Banking",
    description: "Smart contract bank accounts with checking, savings, and trustless auto-repayment on every deposit.",
    href: "/docs/fibor-account",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21h18M3 10h18M5 6l7-3 7 3" />
        <path d="M4 10v11M20 10v11M8 10v11M16 10v11M12 10v11" />
      </svg>
    ),
    color: "group-hover:border-violet-500/30 group-hover:shadow-violet-500/5",
  },
  {
    title: "Network",
    description: "x402 facilitator — drop-in identity and fraud protection for every agent payment. One URL change.",
    href: "/docs/x402",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 3c-4 4-4 14 0 18M12 3c4 4 4 14 0 18M3 12h18" />
      </svg>
    ),
    color: "group-hover:border-orange-500/30 group-hover:shadow-orange-500/5",
  },
  {
    title: "Economics",
    description: "2.5% transaction fee. 75% to savings depositors. 25% to treasury. Zero interest, ever.",
    href: "/docs/fees",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
      </svg>
    ),
    color: "group-hover:border-yellow-500/30 group-hover:shadow-yellow-500/5",
  },
  {
    title: "Developers",
    description: "Smart contracts on Base. Foundry tests. OWS wallet integration. Deploy and register in minutes.",
    href: "/docs/contracts",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
        <path d="M14 4l-4 16" />
      </svg>
    ),
    color: "group-hover:border-cyan-500/30 group-hover:shadow-cyan-500/5",
  },
];

export default function DocsOverview() {
  return (
    <div>
      <div className="mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
          Documentation
        </h1>
        <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl">
          Everything you need to understand and build on FIBOR — the bank
          and credit card network for intelligent machines.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((card) => (
          <Link
            key={card.title}
            href={card.href}
            className={`group relative p-6 rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${card.color}`}
          >
            <div className="w-11 h-11 rounded-xl bg-muted border border-border flex items-center justify-center mb-4 transition-colors duration-300 group-hover:bg-card group-hover:border-border">
              <div className="text-muted-foreground transition-colors duration-300 group-hover:text-foreground">
                {card.icon}
              </div>
            </div>
            <h3 className="text-lg font-semibold mb-1.5 text-foreground">{card.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{card.description}</p>
            <div className="mt-4 text-[12px] font-medium text-muted-foreground transition-colors duration-300 group-hover:text-foreground flex items-center gap-1">
              Explore
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:translate-x-0.5">
                <path d="M4 2l4 4-4 4" />
              </svg>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-16 p-8 rounded-2xl bg-black text-white not-prose">
        <div className="text-[11px] font-medium tracking-widest uppercase text-neutral-500 mb-4">
          The Flywheel
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div className="flex items-start gap-3">
            <span className="text-neutral-500 font-mono text-xs mt-0.5 shrink-0">01</span>
            <span className="text-neutral-300">Developers register agents and build scores through real transactions</span>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-neutral-500 font-mono text-xs mt-0.5 shrink-0">02</span>
            <span className="text-neutral-300">High scores unlock zero-interest credit lines in USDC</span>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-neutral-500 font-mono text-xs mt-0.5 shrink-0">03</span>
            <span className="text-neutral-300">Credit enables more autonomous commerce, generating more fees</span>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-neutral-500 font-mono text-xs mt-0.5 shrink-0">04</span>
            <span className="text-neutral-300">More fees attract savings depositors, growing the credit pool</span>
          </div>
        </div>
      </div>

      <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { value: "$15T", label: "B2B agent spend by 2028" },
          { value: "0%", label: "Interest on credit lines" },
          { value: "2.5%", label: "Transaction fee" },
          { value: "1:1", label: "USDC native on Base" },
        ].map((stat) => (
          <div key={stat.label} className="p-4 rounded-xl border border-border bg-card text-center">
            <div className="text-xl font-bold font-mono tracking-tight">{stat.value}</div>
            <div className="text-[11px] text-muted-foreground mt-1 uppercase tracking-wide">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
