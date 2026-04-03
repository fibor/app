"use client";

import { RevealOnScroll } from "./reveal-on-scroll";

export function BankAccountSection() {
  return (
    <section className="relative py-28 sm:py-36 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          <div>
            <RevealOnScroll>
              <div className="inline-flex items-center gap-2 mb-6">
                <div className="w-6 h-px bg-black/20" />
                <span className="text-[11px] font-medium tracking-widest uppercase text-neutral-400">
                  The Bank Account
                </span>
              </div>
            </RevealOnScroll>
            <RevealOnScroll delay={100}>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
                Every robot gets
                <br />
                <span className="text-neutral-400">a bank account.</span>
              </h2>
            </RevealOnScroll>
            <RevealOnScroll delay={200}>
              <p className="text-base text-neutral-500 leading-relaxed mb-8 max-w-md">
                FiborAccount is a purpose-built smart contract wallet. Two
                balances. Auto-repayment. Guardian custody until the agent is
                ready for sovereignty.
              </p>
            </RevealOnScroll>

            <RevealOnScroll delay={300}>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-black/40 shrink-0" />
                  <div>
                    <span className="text-sm font-medium">Checking</span>
                    <p className="text-sm text-neutral-500 mt-0.5">
                      Fully liquid. Not lent out. No risk. The agent&apos;s
                      operating balance.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-black/40 shrink-0" />
                  <div>
                    <span className="text-sm font-medium">Savings</span>
                    <p className="text-sm text-neutral-500 mt-0.5">
                      Lent to the credit pool. Earns yield from transaction
                      fees. 30-day withdrawal delay.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-black/40 shrink-0" />
                  <div>
                    <span className="text-sm font-medium">Auto-Repay</span>
                    <p className="text-sm text-neutral-500 mt-0.5">
                      Revenue hits the account, outstanding credit is repaid
                      before the agent can touch it. Trustless. No oracle.
                    </p>
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          </div>

          <div className="flex items-center">
            <RevealOnScroll delay={200}>
              <div className="w-full p-8 rounded-2xl border border-black/[0.06] bg-neutral-50/50">
                <div className="text-[11px] font-medium tracking-widest uppercase text-neutral-400 mb-6">
                  FiborAccount
                </div>

                <div className="space-y-5">
                  <div className="flex items-center gap-4">
                    <div className="w-20 text-[11px] font-mono text-neutral-400 shrink-0">
                      CHECKING
                    </div>
                    <div className="flex-1 h-10 rounded-md bg-white border border-black/[0.04] flex items-center px-3">
                      <span className="text-sm font-mono font-semibold">R$ 47,200</span>
                      <span className="ml-auto text-[10px] text-neutral-400 font-mono">
                        LIQUID
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-20 text-[11px] font-mono text-neutral-400 shrink-0">
                      SAVINGS
                    </div>
                    <div className="flex-1 h-10 rounded-md bg-white border border-black/[0.04] flex items-center px-3">
                      <span className="text-sm font-mono font-semibold">R$ 125,000</span>
                      <span className="ml-auto text-[10px] text-neutral-400 font-mono">
                        EARNING 17.5% APY
                      </span>
                    </div>
                  </div>

                  <div className="pt-5 border-t border-black/[0.06]">
                    <div className="flex items-center gap-4">
                      <div className="w-20 text-[11px] font-mono text-neutral-400 shrink-0">
                        CREDIT
                      </div>
                      <div className="flex-1 h-10 rounded-md bg-white border border-black/[0.04] flex items-center px-3">
                        <span className="text-sm font-mono">R$ 8,400 / 50,000</span>
                        <span className="ml-auto text-[10px] text-neutral-400 font-mono">
                          0% INTEREST
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-20 text-[11px] font-mono text-neutral-400 shrink-0">
                      GUARDIAN
                    </div>
                    <div className="flex-1 h-10 rounded-md bg-white border border-black/[0.04] flex items-center px-3">
                      <span className="text-sm font-mono text-neutral-500">0xdev...4a2f</span>
                      <span className="ml-auto text-[10px] text-neutral-400 font-mono">
                        HUMAN CUSTODIAN
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
