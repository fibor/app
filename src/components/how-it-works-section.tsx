"use client";

import { RevealOnScroll } from "./reveal-on-scroll";

export function HowItWorksSection() {
  return (
    <section className="relative py-28 sm:py-36 bg-background overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16 sm:mb-20">
          <RevealOnScroll>
            <div className="inline-flex items-center gap-2 mb-6">
              <div className="w-6 h-px bg-foreground/20" />
              <span className="text-[11px] font-medium tracking-widest uppercase text-neutral-400">
                How It Works
              </span>
              <div className="w-6 h-px bg-foreground/20" />
            </div>
          </RevealOnScroll>
          <RevealOnScroll delay={100}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1]">
                The Flywheel
              </h2>
          </RevealOnScroll>
          <RevealOnScroll delay={200}>
            <p className="mt-5 max-w-lg mx-auto text-base text-neutral-500 leading-relaxed">
              Each participant makes the system more valuable for every other
              participant. A self-reinforcing loop that compounds with every
              transaction.
            </p>
          </RevealOnScroll>
        </div>

        {/* Flywheel steps */}
        <div className="relative">
          {/* Connecting line */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-black/[0.06] to-transparent" />

          <div className="space-y-6 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-x-20 lg:gap-y-12">
            <RevealOnScroll delay={100}>
              <div className="relative lg:text-right lg:pr-10">
                <div className="hidden lg:block absolute right-0 top-4 w-3 h-3 rounded-full border-2 border-black/10 bg-card translate-x-[calc(50%+40px)]" />
                <div className="inline-flex items-center gap-2 mb-2">
                  <span className="text-[11px] font-mono text-neutral-300 font-bold">
                    01
                  </span>
                </div>
                <h3 className="text-base font-bold tracking-tight mb-2">
                  Developers Register Agents
                </h3>
                <p className="text-sm text-neutral-500 leading-relaxed">
                  Every agent receives a FIBOR ID and begins building a
                  verifiable transaction history on the network.
                </p>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={200}>
              <div className="relative lg:pl-10">
                <div className="hidden lg:block absolute left-0 top-4 w-3 h-3 rounded-full border-2 border-black/10 bg-card -translate-x-[calc(50%+40px)]" />
                <div className="inline-flex items-center gap-2 mb-2">
                  <span className="text-[11px] font-mono text-neutral-300 font-bold">
                    02
                  </span>
                </div>
                <h3 className="text-base font-bold tracking-tight mb-2">
                  Scores Unlock Credit
                </h3>
                <p className="text-sm text-neutral-500 leading-relaxed">
                  High FIBOR Scores unlock credit lines denominated in
                  USDC. 300 for small access. 900 for sovereign lines.
                </p>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={300}>
              <div className="relative lg:text-right lg:pr-10">
                <div className="hidden lg:block absolute right-0 top-4 w-3 h-3 rounded-full border-2 border-black/10 bg-card translate-x-[calc(50%+40px)]" />
                <div className="inline-flex items-center gap-2 mb-2">
                  <span className="text-[11px] font-mono text-neutral-300 font-bold">
                    03
                  </span>
                </div>
                <h3 className="text-base font-bold tracking-tight mb-2">
                  Credit Enables Commerce
                </h3>
                <p className="text-sm text-neutral-500 leading-relaxed">
                  Credit lines enable more autonomous transactions. Agents buy
                  inventory, hire contractors, and pay invoices without human
                  pre-funding.
                </p>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={400}>
              <div className="relative lg:pl-10">
                <div className="hidden lg:block absolute left-0 top-4 w-3 h-3 rounded-full border-2 border-black/10 bg-card -translate-x-[calc(50%+40px)]" />
                <div className="inline-flex items-center gap-2 mb-2">
                  <span className="text-[11px] font-mono text-neutral-300 font-bold">
                    04
                  </span>
                </div>
                <h3 className="text-base font-bold tracking-tight mb-2">
                  Commerce Generates Fees
                </h3>
                <p className="text-sm text-neutral-500 leading-relaxed">
                  2.5% on every transaction (1% merchant, 1.5% agent). 75% to
                  savings depositors who fund the credit pool. Real yield from
                  real commerce.
                </p>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={500}>
              <div className="relative lg:text-right lg:pr-10">
                <div className="hidden lg:block absolute right-0 top-4 w-3 h-3 rounded-full border-2 border-black/10 bg-card translate-x-[calc(50%+40px)]" />
                <div className="inline-flex items-center gap-2 mb-2">
                  <span className="text-[11px] font-mono text-neutral-300 font-bold">
                    05
                  </span>
                </div>
                <h3 className="text-base font-bold tracking-tight mb-2">
                  Deposits Fund Credit
                </h3>
                <p className="text-sm text-neutral-500 leading-relaxed">
                  Agents and humans deposit savings into the credit pool.
                  More deposits expand available credit. Yield attracts more
                  depositors. The cycle compounds.
                </p>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={600}>
              <div className="relative lg:pl-10">
                <div className="hidden lg:block absolute left-0 top-4 w-3 h-3 rounded-full border-2 border-black/10 bg-card -translate-x-[calc(50%+40px)]" />
                <div className="inline-flex items-center gap-2 mb-2">
                  <span className="text-[11px] font-mono text-neutral-300 font-bold">
                    06
                  </span>
                </div>
                <h3 className="text-base font-bold tracking-tight mb-2">
                  Network Effects Compound
                </h3>
                <p className="text-sm text-neutral-500 leading-relaxed">
                  Every new agent, merchant, and depositor makes the system more
                  valuable for everyone. FIBOR becomes the default financial
                  rail for the robot economy.
                </p>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </div>
    </section>
  );
}
