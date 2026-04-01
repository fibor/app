"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/80 backdrop-blur-xl border-b border-black/[0.04]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
            <a href="/" className="flex items-center gap-2">
              <Image src="/fibor-icon.png" alt="" width={24} height={24} className="h-6 w-6" />
              <span className="text-[15px] font-semibold tracking-tight">FIBOR</span>
            </a>

          <div className="hidden md:flex items-center gap-8">
            <a
              href="#protocol"
              className="text-[13px] text-neutral-500 hover:text-black transition-colors"
            >
              Protocol
            </a>
            <a
              href="#primitives"
              className="text-[13px] text-neutral-500 hover:text-black transition-colors"
            >
              Primitives
            </a>
            <a
              href="#economics"
              className="text-[13px] text-neutral-500 hover:text-black transition-colors"
            >
              Economics
            </a>
            <a
              href="#network"
              className="text-[13px] text-neutral-500 hover:text-black transition-colors"
            >
              Network
            </a>
          </div>

            <div className="flex items-center gap-3">
              <a
                href="/docs"
                className="hidden sm:block text-[13px] text-neutral-500 hover:text-black transition-colors"
              >
                Docs
              </a>
              <a
                href="/app"
                className="h-8 px-4 bg-black text-white text-[13px] font-medium rounded-md flex items-center justify-center hover:bg-neutral-800 transition-colors"
              >
                Launch App
              </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
