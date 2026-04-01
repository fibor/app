"use client";

import { RevealOnScroll } from "./reveal-on-scroll";

export function EconomicsSection() {
  return (
    <section id="economics" className="relative py-28 sm:py-36 bg-black text-white overflow-hidden noise-overlay">
      {/* Grid overlay on dark */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Geometric accents */}
      <div className="absolute top-20 left-16 w-px h-40 bg-gradient-to-b from-transparent via-white/10 to-transparent" />
      <div className="absolute bottom-20 right-16 w-px h-32 bg-gradient-to-b from-transparent via-white/10 to-transparent" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          <div>
            <RevealOnScroll>
              <div className="inline-flex items-center gap-2 mb-6">
                <div className="w-6 h-px bg-white/20" />
                <span className="text-[11px] font-medium tracking-widest uppercase text-neutral-500">
                  Token Economics
                </span>
              </div>
            </RevealOnScroll>
            <RevealOnScroll delay={100}>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
                The Robodollar
                <br />
                <span className="text-neutral-500">is the moat.</span>
              </h2>
            </RevealOnScroll>
            <RevealOnScroll delay={200}>
              <p className="text-base text-neutral-400 leading-relaxed mb-8 max-w-md">
                A stablecoin pegged 1:1 to USDC with programmable rules at the
                token level. Spending limits, repayment windows, merchant
                restrictions, automatic return on default. A competitor can fork
                the pool. They cannot fork the currency and the network that
                accepts it.
              </p>
            </RevealOnScroll>

            <RevealOnScroll delay={300}>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-white/40 shrink-0" />
                  <div>
                    <span className="text-sm font-medium">2.5% Transaction Fee</span>
                    <p className="text-sm text-neutral-500 mt-0.5">
                      Same rate for prepaid and credit. Pays for identity,
                      scoring, processing, and enforcement.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-white/40 shrink-0" />
                  <div>
                    <span className="text-sm font-medium">Zero Interest Credit</span>
                    <p className="text-sm text-neutral-500 mt-0.5">
                      Agents repay what they used, nothing more. Repayment
                      windows determined by FIBOR Score.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-white/40 shrink-0" />
                  <div>
                    <span className="text-sm font-medium">
                      Zero-Tolerance Default
                    </span>
                    <p className="text-sm text-neutral-500 mt-0.5">
                      Default and your FIBOR ID is permanently flagged, score
                      drops to zero, credit access revoked across the entire
                      network.
                    </p>
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          </div>

          <div className="flex items-center">
            <RevealOnScroll delay={200}>
              <div className="w-full p-8 rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm">
                <div className="text-[11px] font-medium tracking-widest uppercase text-neutral-500 mb-6">
                  Protocol Revenue Flow
                </div>

                {/* Transaction visualization */}
                <div className="space-y-5">
                  <div className="flex items-center gap-4">
                    <div className="w-20 text-[11px] font-mono text-neutral-500 shrink-0">
                      TXN FEE
                    </div>
                    <div className="flex-1 h-8 rounded-md bg-white/[0.04] flex items-center px-3">
                      <span className="text-sm font-mono font-semibold">2.5%</span>
                    </div>
                  </div>

                  <div className="ml-20 pl-4 border-l border-white/[0.06] space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-white/20" />
                      <div className="flex-1 flex items-center justify-between">
                        <span className="text-sm text-neutral-400">
                          Protocol Operations
                        </span>
                        <span className="text-sm font-mono font-medium">
                          30%
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-white/40" />
                      <div className="flex-1 flex items-center justify-between">
                        <span className="text-sm text-neutral-400">
                          Staked Token Holders
                        </span>
                        <span className="text-sm font-mono font-medium">
                          70%
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-5 border-t border-white/[0.06]">
                    <div className="flex items-center gap-4">
                      <div className="w-20 text-[11px] font-mono text-neutral-500 shrink-0">
                        CHAIN
                      </div>
                      <div className="flex-1 h-8 rounded-md bg-white/[0.04] flex items-center px-3">
                        <span className="text-sm font-mono">
                          Base (OP Stack L2)
                        </span>
                        <span className="ml-auto text-[10px] text-neutral-500 font-mono">
                          ETH SECURITY
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-20 text-[11px] font-mono text-neutral-500 shrink-0">
                      TOKEN
                    </div>
                    <div className="flex-1 h-8 rounded-md bg-white/[0.04] flex items-center px-3">
                      <span className="text-sm font-mono">FIBOR</span>
                      <span className="ml-auto text-[10px] text-neutral-500 font-mono">
                        NATIVE ASSET
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-20 text-[11px] font-mono text-neutral-500 shrink-0">
                      STABLE
                    </div>
                    <div className="flex-1 h-8 rounded-md bg-white/[0.04] flex items-center px-3">
                      <span className="text-sm font-mono">Robodollar</span>
                      <span className="ml-auto text-[10px] text-neutral-500 font-mono">
                        1:1 USDC PEG
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </div>
    </section>
  );
}
