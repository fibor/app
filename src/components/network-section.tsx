"use client";

import { RevealOnScroll } from "./reveal-on-scroll";

export function NetworkSection() {
  return (
    <section id="market" className="relative py-28 sm:py-36 bg-white">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16 sm:mb-20">
          <RevealOnScroll>
            <div className="inline-flex items-center gap-2 mb-6">
              <div className="w-6 h-px bg-black/20" />
              <span className="text-[11px] font-medium tracking-widest uppercase text-neutral-400">
                Market Opportunity
              </span>
              <div className="w-6 h-px bg-black/20" />
            </div>
          </RevealOnScroll>
          <RevealOnScroll delay={100}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1]">
              The infrastructure
              <br />
              <span className="text-neutral-300">does not exist yet.</span>
            </h2>
          </RevealOnScroll>
          <RevealOnScroll delay={200}>
            <p className="mt-5 max-w-lg mx-auto text-base text-neutral-500 leading-relaxed">
              Banks were built for humans. Crypto was built for speculation.
              Neither was built for robots that need to earn trust, build
              reputation, and access credit to do their jobs.
            </p>
          </RevealOnScroll>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <RevealOnScroll delay={100}>
            <div className="p-6 rounded-xl border border-black/[0.04] bg-neutral-50/30 text-center">
              <div className="text-3xl sm:text-4xl font-bold font-mono tracking-tight mb-2">
                $196B
              </div>
              <div className="text-[11px] font-medium tracking-widest uppercase text-neutral-400">
                Agentic AI Market by 2034
              </div>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={200}>
            <div className="p-6 rounded-xl border border-black/[0.04] bg-neutral-50/30 text-center">
              <div className="text-3xl sm:text-4xl font-bold font-mono tracking-tight mb-2">
                15%
              </div>
              <div className="text-[11px] font-medium tracking-widest uppercase text-neutral-400">
                Work Decisions by Agents 2028
              </div>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={300}>
            <div className="p-6 rounded-xl border border-black/[0.04] bg-neutral-50/30 text-center">
              <div className="text-3xl sm:text-4xl font-bold font-mono tracking-tight mb-2">
                20%
              </div>
              <div className="text-[11px] font-medium tracking-widest uppercase text-neutral-400">
                Programmable Transactions 2030
              </div>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={400}>
            <div className="p-6 rounded-xl border border-black/[0.04] bg-neutral-50/30 text-center">
              <div className="text-3xl sm:text-4xl font-bold font-mono tracking-tight mb-2">
                90%
              </div>
              <div className="text-[11px] font-medium tracking-widest uppercase text-neutral-400">
                B2B via Agent Exchanges 2028
              </div>
            </div>
          </RevealOnScroll>
        </div>

        {/* Comparison table */}
        <RevealOnScroll delay={200}>
          <div className="mt-16 sm:mt-20 overflow-hidden rounded-2xl border border-black/[0.04]">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-black/[0.04]">
                  <th className="p-5 text-left text-[11px] font-medium tracking-widest uppercase text-neutral-400 bg-neutral-50/50">
                    Capability
                  </th>
                  <th className="p-5 text-center text-[11px] font-medium tracking-widest uppercase text-neutral-400 bg-neutral-50/50">
                    Traditional Banks
                  </th>
                  <th className="p-5 text-center text-[11px] font-medium tracking-widest uppercase text-neutral-400 bg-neutral-50/50">
                    Crypto Wallets
                  </th>
                  <th className="p-5 text-center text-[11px] font-medium tracking-widest uppercase text-neutral-400 bg-neutral-50/50">
                    Prepaid Solutions
                  </th>
                  <th className="p-5 text-center text-[11px] font-medium tracking-widest uppercase text-neutral-400 bg-black text-white">
                    FIBOR
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Agent Identity", false, false, false, true],
                  ["Credit Scoring", false, false, false, true],
                  ["Credit Lines", false, false, false, true],
                  ["No Pre-funding", false, false, false, true],
                  ["Onchain Settlement", false, true, true, true],
                  ["Programmable Rules", false, false, false, true],
                ].map(([label, ...vals], i) => (
                  <tr
                    key={i}
                    className="border-b border-black/[0.03] last:border-0"
                  >
                    <td className="p-5 font-medium text-sm">{label as string}</td>
                    {(vals as boolean[]).map((v, j) => (
                      <td key={j} className={`p-5 text-center ${j === 3 ? "bg-black/[0.01]" : ""}`}>
                        {v ? (
                          <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-black">
                            <svg
                              width="10"
                              height="10"
                              viewBox="0 0 10 10"
                              fill="none"
                            >
                              <path
                                d="M2 5l2.5 2.5L8 3"
                                stroke="white"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </span>
                        ) : (
                          <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-neutral-100">
                            <svg
                              width="8"
                              height="8"
                              viewBox="0 0 8 8"
                              fill="none"
                            >
                              <path
                                d="M2 2l4 4M6 2L2 6"
                                stroke="#ccc"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                              />
                            </svg>
                          </span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
