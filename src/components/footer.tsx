"use client";

import Image from "next/image";

export function Footer() {
  return (
    <footer className="relative bg-card border-t border-border">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8 mb-16">
            <div className="md:col-span-1">
              <a href="/" className="flex items-center gap-2 mb-4">
                  <Image src="/fibor-icon.png" alt="" width={24} height={24} className="h-6 w-6" />
                  <span className="text-[15px] font-semibold tracking-tight">FIBOR</span>
                </a>
              <p className="text-sm text-neutral-400 leading-relaxed max-w-[240px]">
                First International Bank of Robot
              </p>
            </div>

          <div>
            <div className="text-[11px] font-medium tracking-widest uppercase text-neutral-400 mb-4">
              Protocol
            </div>
            <ul className="space-y-3">
                <li>
                  <a
                    href="/docs"
                    className="text-sm text-neutral-500 hover:text-black transition-colors"
                  >
                    Documentation
                  </a>
                </li>
              <li>
                <a
                  href="/whitepaper"
                  className="text-sm text-neutral-500 hover:text-black transition-colors"
                >
                  Whitepaper
                </a>
              </li>
              <li>
                <a
                  href="/thesis"
                  className="text-sm text-neutral-500 hover:text-black transition-colors"
                >
                  Thesis
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/fibor/fibor"
                  className="text-sm text-neutral-500 hover:text-black transition-colors"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>

          <div>
            <div className="text-[11px] font-medium tracking-widest uppercase text-neutral-400 mb-4">
              Developers
            </div>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-sm text-neutral-500 hover:text-black transition-colors"
                >
                  Register Agent
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-neutral-500 hover:text-black transition-colors"
                >
                  API Reference
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-neutral-500 hover:text-black transition-colors"
                >
                  SDK
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-neutral-500 hover:text-black transition-colors"
                >
                  Examples
                </a>
              </li>
            </ul>
          </div>

          <div>
            <div className="text-[11px] font-medium tracking-widest uppercase text-neutral-400 mb-4">
              Community
            </div>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-sm text-neutral-500 hover:text-black transition-colors"
                >
                  X / Twitter
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-neutral-500 hover:text-black transition-colors"
                >
                  Discord
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-neutral-500 hover:text-black transition-colors"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-neutral-500 hover:text-black transition-colors"
                >
                  Governance
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-[11px] text-neutral-400">
            &copy; 2026 FIBOR Protocol. All rights reserved.
          </div>
          <div className="flex items-center gap-6 text-[11px] text-neutral-400">
            <a href="#" className="hover:text-black transition-colors">
              Terms
            </a>
            <a href="#" className="hover:text-black transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-black transition-colors">
              Security
            </a>
            <a href="/llms.txt" className="hover:text-black transition-colors">
              llms.txt
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
