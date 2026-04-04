"use client";

import { RevealOnScroll } from "./reveal-on-scroll";

export function FacilitatorSection() {
  return (
    <section id="network" className="relative py-28 sm:py-36 bg-neutral-950 text-white overflow-hidden noise-overlay">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16 sm:mb-20">
          <RevealOnScroll>
            <div className="inline-flex items-center gap-2 mb-6">
              <div className="w-6 h-px bg-white/20" />
              <span className="text-[11px] font-medium tracking-widest uppercase text-neutral-500">
                The Network
              </span>
              <div className="w-6 h-px bg-white/20" />
            </div>
          </RevealOnScroll>
          <RevealOnScroll delay={100}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1]">
              Visa for robots.
            </h2>
          </RevealOnScroll>
          <RevealOnScroll delay={200}>
            <p className="mt-5 max-w-lg mx-auto text-base text-neutral-400 leading-relaxed">
              FIBOR operates as an x402 facilitator. Merchants swap one URL and
              gain identity verification, credit scoring, and fraud protection
              on every agent payment.
            </p>
          </RevealOnScroll>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Merchant integration */}
          <RevealOnScroll delay={100}>
            <div className="p-6 rounded-2xl border border-white/[0.06] bg-white/[0.02]">
              <div className="text-[11px] font-medium tracking-widest uppercase text-neutral-500 mb-4">
                Merchant Integration
              </div>
              <div className="font-mono text-[13px] space-y-2">
                <div className="text-red-400/70">
                  - facilitator = &quot;https://x402.coinbase.com&quot;
                </div>
                <div className="text-green-400/70">
                  + facilitator = &quot;https://api.fibor.xyz&quot;
                </div>
              </div>
              <p className="mt-4 text-sm text-neutral-500">
                One URL change. No custom SDK. Same x402 protocol.
              </p>
            </div>
          </RevealOnScroll>

          {/* Facilitator response */}
          <RevealOnScroll delay={200}>
            <div className="p-6 rounded-2xl border border-white/[0.06] bg-white/[0.02]">
              <div className="text-[11px] font-medium tracking-widest uppercase text-neutral-500 mb-4">
                What Merchants See
              </div>
              <div className="font-mono text-[12px] text-neutral-400 space-y-1">
                <div>{`{`}</div>
                <div className="pl-4">
                  <span className="text-neutral-500">&quot;status&quot;</span>: <span className="text-green-400/70">&quot;paid&quot;</span>,
                </div>
                <div className="pl-4">
                  <span className="text-neutral-500">&quot;amount&quot;</span>: <span className="text-white">&quot;99.00&quot;</span>,
                </div>
                <div className="pl-4">
                  <span className="text-neutral-500">&quot;fibor&quot;</span>: {`{`}
                </div>
                <div className="pl-8">
                  <span className="text-neutral-500">&quot;agent_id&quot;</span>: <span className="text-white">&quot;0xabc...&quot;</span>,
                </div>
                <div className="pl-8">
                  <span className="text-neutral-500">&quot;score&quot;</span>: <span className="text-white">60480000</span>,
                </div>
                <div className="pl-8">
                  <span className="text-neutral-500">&quot;developer&quot;</span>: <span className="text-white">&quot;0xdef...&quot;</span>,
                </div>
                <div className="pl-8">
                  <span className="text-neutral-500">&quot;status&quot;</span>: <span className="text-green-400/70">&quot;active&quot;</span>
                </div>
                <div className="pl-4">{`}`}</div>
                <div>{`}`}</div>
              </div>
            </div>
          </RevealOnScroll>
        </div>

        {/* What merchants get */}
        <RevealOnScroll delay={300}>
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: "Identity", desc: "Verified FIBOR ID on every payment" },
              { label: "Credit Score", desc: "Real-time agent creditworthiness" },
              { label: "Fraud Protection", desc: "Excommunicated agents auto-blocked" },
              { label: "1% Fee", desc: "Less than half what Stripe charges" },
            ].map((item) => (
              <div key={item.label} className="p-4 rounded-xl border border-white/[0.06] bg-white/[0.02]">
                <div className="text-sm font-semibold mb-1">{item.label}</div>
                <p className="text-[12px] text-neutral-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
