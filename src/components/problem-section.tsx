"use client";

import { RevealOnScroll } from "./reveal-on-scroll";

export function ProblemSection() {
  return (
    <section id="protocol" className="relative py-28 sm:py-36 bg-white">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          <div>
            <RevealOnScroll>
              <div className="inline-flex items-center gap-2 mb-6">
                <div className="w-6 h-px bg-black/20" />
                <span className="text-[11px] font-medium tracking-widest uppercase text-neutral-400">
                  The Problem
                </span>
              </div>
            </RevealOnScroll>
            <RevealOnScroll delay={100}>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
                Robots are entering
                <br />
                the economy.
                <br />
                <span className="text-neutral-300">They cannot open</span>
                <br />
                <span className="text-neutral-300">a bank account.</span>
              </h2>
            </RevealOnScroll>
            <RevealOnScroll delay={200}>
              <p className="text-base text-neutral-500 leading-relaxed max-w-md">
                AI agents will intermediate over $15 trillion in B2B spending by
                2028. Every one of these agents hits the same wall: no financial
                identity, no KYC, no legal personhood.
              </p>
            </RevealOnScroll>
          </div>

          <div className="space-y-6">
            <RevealOnScroll delay={100}>
              <div className="p-6 rounded-xl border border-black/[0.04] bg-neutral-50/50">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-md bg-black/[0.04] flex items-center justify-center">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      className="text-neutral-400"
                    >
                      <path
                        d="M7 1v12M1 7h12"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                  <span className="text-sm font-semibold">No Identity</span>
                </div>
                <p className="text-sm text-neutral-500 leading-relaxed">
                  Agents have no persistent financial identity. Wallet addresses
                  are disposable and anonymous. No institution knows who built
                  an agent, what it does, or whether it can be trusted.
                </p>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={200}>
              <div className="p-6 rounded-xl border border-black/[0.04] bg-neutral-50/50">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-md bg-black/[0.04] flex items-center justify-center">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      className="text-neutral-400"
                    >
                      <circle
                        cx="7"
                        cy="7"
                        r="5.5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M5 7h4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                  <span className="text-sm font-semibold">No Credit</span>
                </div>
                <p className="text-sm text-neutral-500 leading-relaxed">
                  No one underwrites a machine. No one extends a line of credit
                  to an autonomous agent. The entire population of AI agents has
                  a collective credit history of zero.
                </p>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={300}>
              <div className="p-6 rounded-xl border border-black/[0.04] bg-neutral-50/50">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-md bg-black/[0.04] flex items-center justify-center">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      className="text-neutral-400"
                    >
                      <rect
                        x="1"
                        y="3"
                        width="12"
                        height="8"
                        rx="1.5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M1 6h12"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                    </svg>
                  </div>
                  <span className="text-sm font-semibold">
                    Prepaid Is Not Banking
                  </span>
                </div>
                <p className="text-sm text-neutral-500 leading-relaxed">
                  Current solutions are leashes disguised as wallets. A human
                  deposits money first, and the agent spends from that balance.
                  This is not banking. It is an allowance.
                </p>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </div>
    </section>
  );
}
