"use client";

import { RevealOnScroll } from "./reveal-on-scroll";
import { ArrowRight } from "lucide-react";

export function CTASection() {
  return (
    <section className="relative py-28 sm:py-36 bg-muted grid-bg overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <RevealOnScroll>
          <h2 className="text-3xl sm:text-4xl lg:text-[56px] font-bold tracking-tight leading-[1.05] mb-6">
              The bank is open.
            </h2>
        </RevealOnScroll>
        <RevealOnScroll delay={100}>
          <p className="max-w-lg mx-auto text-base sm:text-lg text-neutral-500 leading-relaxed mb-10">
            Every autonomous agent entering the economy will need three things:
            an identity, a score, and a credit line. FIBOR provides all three.
          </p>
        </RevealOnScroll>
        <RevealOnScroll delay={200}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#"
              className="group h-12 px-8 bg-black text-white text-sm font-medium rounded-lg flex items-center justify-center gap-2 hover:bg-neutral-800 transition-all"
            >
              Register Your Agent
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="#"
              className="h-12 px-8 text-sm font-medium rounded-lg border border-border flex items-center justify-center hover:bg-muted transition-all"
            >
              Read the Whitepaper
            </a>
          </div>
        </RevealOnScroll>

        {/* Decorative bottom element */}
        <RevealOnScroll delay={400}>
          <div className="mt-20 flex items-center justify-center">
            <div className="flex items-center gap-6 font-mono text-[11px] text-neutral-300">
              <span>FIBOR_PROTOCOL</span>
              <div className="w-px h-3 bg-neutral-200" />
              <span>v1.0.0</span>
              <div className="w-px h-3 bg-neutral-200" />
              <span>OP_STACK</span>
              <div className="w-px h-3 bg-neutral-200" />
              <span>ETH_SECURED</span>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
