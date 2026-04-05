"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { RevealOnScroll } from "./reveal-on-scroll";
import { ArrowRight } from "lucide-react";

function AppLaunchButton() {
  const [launching, setLaunching] = useState(false);
  const router = useRouter();

  return (
    <button
      onClick={() => {
        setLaunching(true);
        router.push("/app");
      }}
      disabled={launching}
      className="group h-11 px-6 bg-black text-white text-sm font-medium rounded-lg flex items-center justify-center gap-2 hover:bg-neutral-800 transition-all disabled:opacity-80"
    >
      {launching ? (
        <>
          <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          Launching...
        </>
      ) : (
        <>
          Register Your Agent
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
        </>
      )}
    </button>
  );
}

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden grid-bg noise-overlay">
      {/* Geometric accent elements */}
      <div className="absolute top-32 left-12 w-px h-32 bg-gradient-to-b from-transparent via-black/10 to-transparent" />
      <div className="absolute top-48 right-16 w-px h-24 bg-gradient-to-b from-transparent via-black/10 to-transparent" />
      <div className="absolute bottom-40 left-1/4 w-16 h-px bg-gradient-to-r from-transparent via-black/10 to-transparent" />
      <div className="absolute top-1/3 right-1/4 w-24 h-px bg-gradient-to-r from-transparent via-black/8 to-transparent" />

      {/* Subtle corner markers */}
      <div className="absolute top-32 left-8 opacity-[0.06]">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M0 8V0H8" stroke="currentColor" strokeWidth="1" />
        </svg>
      </div>
      <div className="absolute bottom-32 right-8 opacity-[0.06]">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M24 16V24H16" stroke="currentColor" strokeWidth="1" />
        </svg>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8 text-center pt-24 pb-16">
        <RevealOnScroll>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-card/60 backdrop-blur-sm mb-8">
            <div className="w-1.5 h-1.5 rounded-full bg-black animate-pulse-subtle" />
            <span className="text-[11px] font-medium tracking-widest uppercase text-neutral-500">
              Protocol Live on Testnet
            </span>
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={100}>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6 max-w-lg mx-auto">
              First International<br />
              <span className="gradient-text">Bank of Robot</span>
            </h1>
        </RevealOnScroll>

        <RevealOnScroll delay={200}>
          <p className="max-w-xl mx-auto text-base sm:text-lg text-neutral-500 leading-relaxed mb-10">
            The bank and credit card network for intelligent machines.
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={300}>
          <div className="flex items-center justify-center gap-4">
              <AppLaunchButton />
            <a
              href="/thesis"
              className="h-11 px-6 text-sm font-medium rounded-lg border border-border flex items-center justify-center hover:bg-muted transition-all"
            >
              Read the Thesis
            </a>
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={500}>
          <div className="mt-20 flex items-center justify-center gap-12 sm:gap-16">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold tracking-tight font-mono">
                $15T
              </div>
              <div className="text-[11px] text-neutral-400 mt-1 tracking-wide uppercase">
                B2B Agent Spend by 2028
              </div>
            </div>
            <div className="w-px h-10 bg-black/[0.06]" />
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold tracking-tight font-mono">
                $261B
              </div>
              <div className="text-[11px] text-neutral-400 mt-1 tracking-wide uppercase">
                Agent E-Commerce by 2030
              </div>
            </div>
            <div className="w-px h-10 bg-black/[0.06]" />
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold tracking-tight font-mono">
                $0
              </div>
              <div className="text-[11px] text-neutral-400 mt-1 tracking-wide uppercase">
                Agent Credit History
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}
