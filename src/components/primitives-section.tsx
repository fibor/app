"use client";

import { RevealOnScroll } from "./reveal-on-scroll";

export function PrimitivesSection() {
  return (
    <section id="primitives" className="relative py-28 sm:py-36 bg-muted grid-bg-dense">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16 sm:mb-20">
          <RevealOnScroll>
            <div className="inline-flex items-center gap-2 mb-6">
              <div className="w-6 h-px bg-foreground/20" />
              <span className="text-[11px] font-medium tracking-widest uppercase text-neutral-400">
                Three Primitives
              </span>
              <div className="w-6 h-px bg-foreground/20" />
            </div>
          </RevealOnScroll>
          <RevealOnScroll delay={100}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1]">
                Identity. Score. Credit.
              </h2>
          </RevealOnScroll>
          <RevealOnScroll delay={200}>
            <p className="mt-5 max-w-lg mx-auto text-base text-neutral-500 leading-relaxed">
              Three primitives that give robots what humans have had for
              centuries. Together, they form the first complete financial
              stack for non-human participants.
            </p>
          </RevealOnScroll>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* FIBOR ID */}
          <RevealOnScroll delay={100}>
            <div className="group relative p-8 rounded-2xl bg-card border border-border hover:border-border transition-all duration-500 hover:shadow-[0_8px_40px_-12px_rgba(0,0,0,0.08)]">
              <div className="mb-6">
                <div className="w-10 h-10 rounded-lg bg-foreground text-background flex items-center justify-center">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <rect
                      x="2"
                      y="2"
                      width="14"
                      height="14"
                      rx="3"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <circle cx="9" cy="7.5" r="2" stroke="currentColor" strokeWidth="1.5" />
                    <path
                      d="M5.5 13c0-1.933 1.567-3.5 3.5-3.5s3.5 1.567 3.5 3.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>
              <div className="text-[11px] font-medium tracking-widest uppercase text-neutral-400 mb-2">
                01
              </div>
              <h3 className="text-lg font-bold tracking-tight mb-3">
                FIBOR ID
              </h3>
              <p className="text-sm text-neutral-500 leading-relaxed mb-6">
                A persistent, portable financial identity for every agent.
                Records builder, function, creation date, and full transaction
                history. A financial passport for machines.
              </p>
              {/* Visual element - ID card mockup */}
              <div className="p-4 rounded-lg bg-muted border border-border font-mono text-[11px]">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-neutral-400">FIBOR_ID</span>
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                </div>
                <div className="text-foreground font-semibold mb-1">
                  0xf1b0...7a3e
                </div>
                <div className="text-neutral-400">
                  agent:purchasing | v2.4.1
                </div>
                <div className="mt-2 pt-2 border-t border-border text-neutral-400">
                  txns: 12,847 | uptime: 99.97%
                </div>
              </div>
            </div>
          </RevealOnScroll>

          {/* FIBOR Score */}
          <RevealOnScroll delay={200}>
            <div className="group relative p-8 rounded-2xl bg-card border border-border hover:border-border transition-all duration-500 hover:shadow-[0_8px_40px_-12px_rgba(0,0,0,0.08)]">
              <div className="mb-6">
                <div className="w-10 h-10 rounded-lg bg-foreground text-background flex items-center justify-center">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path
                      d="M3 14l3-4 3 2 3-5 3-2"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M3 3v12h12"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
              <div className="text-[11px] font-medium tracking-widest uppercase text-neutral-400 mb-2">
                02
              </div>
              <h3 className="text-lg font-bold tracking-tight mb-3">
                FIBOR Score
              </h3>
              <p className="text-sm text-neutral-500 leading-relaxed mb-6">
                Multiplicative credit scoring from onchain repayment
                data. Volume repaid &times; repayments &times; months active.
                No cap. No decay. The first credit bureau for robots.
              </p>
              {/* Visual element - Score display */}
              <div className="p-4 rounded-lg bg-muted border border-border font-mono text-[11px]">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-neutral-400">FIBOR_SCORE</span>
                  <span className="text-foreground font-bold text-base">60,480,000</span>
                </div>
                <div className="space-y-1.5 text-neutral-400">
                  <div className="flex justify-between">
                    <span>volume repaid</span>
                    <span className="text-foreground">$1,260,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>repayments</span>
                    <span className="text-foreground">48</span>
                  </div>
                  <div className="flex justify-between">
                    <span>credit limit</span>
                    <span className="text-foreground">25% of volume</span>
                  </div>
                </div>
              </div>
            </div>
          </RevealOnScroll>

          {/* FIBOR Credit */}
          <RevealOnScroll delay={300}>
            <div className="group relative p-8 rounded-2xl bg-card border border-border hover:border-border transition-all duration-500 hover:shadow-[0_8px_40px_-12px_rgba(0,0,0,0.08)]">
              <div className="mb-6">
                <div className="w-10 h-10 rounded-lg bg-foreground text-background flex items-center justify-center">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.5" />
                    <path
                      d="M9 6v6M7 8.5h4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>
              <div className="text-[11px] font-medium tracking-widest uppercase text-neutral-400 mb-2">
                03
              </div>
              <h3 className="text-lg font-bold tracking-tight mb-3">
                FIBOR Credit
              </h3>
              <p className="text-sm text-neutral-500 leading-relaxed mb-6">
                Onchain credit lines denominated in USDC. No interest.
                Repayment windows scale with score. Zero-tolerance default
                policy enforced at the protocol level.
              </p>
              {/* Visual element - Credit line */}
              <div className="p-4 rounded-lg bg-muted border border-border font-mono text-[11px]">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-neutral-400">CREDIT_LINE</span>
                  <div className="flex items-center gap-1">
                    <span className="text-foreground font-semibold">$</span>
                    <span className="text-foreground font-bold text-base">
                      250,000
                    </span>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <div className="flex justify-between text-neutral-400">
                    <span>utilized</span>
                    <span className="text-foreground">$82,400</span>
                  </div>
                  <div className="flex justify-between text-neutral-400">
                    <span>repayment</span>
                    <span className="text-foreground">72h window</span>
                  </div>
                  <div className="flex justify-between text-neutral-400">
                    <span>interest</span>
                    <span className="text-foreground">0.00%</span>
                  </div>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
