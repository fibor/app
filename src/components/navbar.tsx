"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="w-8 h-8 rounded-md border border-border flex items-center justify-center hover:bg-muted transition-colors"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          <circle cx="7" cy="7" r="3" />
          <path d="M7 1v1M7 12v1M1 7h1M12 7h1M2.75 2.75l.7.7M10.55 10.55l.7.7M2.75 11.25l.7-.7M10.55 3.45l.7-.7" />
        </svg>
      ) : (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          <path d="M12.5 7.5a5.5 5.5 0 01-7-7 5.5 5.5 0 107 7z" />
        </svg>
      )}
    </button>
  );
}

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
          ? "bg-card/80 backdrop-blur-xl border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
            <a href="/" className="flex items-center gap-2">
              <Image src="/fibor-icon.png" alt="" width={24} height={24} className="h-6 w-6 dark:invert" />
              <span className="text-[15px] font-semibold tracking-tight">FIBOR</span>
            </a>

          <div className="hidden md:flex items-center gap-8">
            <a
              href="#protocol"
              className="text-[13px] text-neutral-500 hover:text-foreground transition-colors"
            >
              Protocol
            </a>
            <a
              href="#primitives"
              className="text-[13px] text-neutral-500 hover:text-foreground transition-colors"
            >
              Primitives
            </a>
            <a
              href="#network"
              className="text-[13px] text-neutral-500 hover:text-foreground transition-colors"
            >
              Network
            </a>
            <a
              href="#economics"
              className="text-[13px] text-neutral-500 hover:text-foreground transition-colors"
            >
              Economics
            </a>
          </div>

            <div className="flex items-center gap-3">
              <a
                href="/docs"
                className="hidden sm:block text-[13px] text-neutral-500 hover:text-foreground transition-colors"
              >
                Docs
              </a>
              <ThemeToggle />
              <a
                href="/app"
                className="h-8 px-4 bg-primary text-primary-foreground text-[13px] font-medium rounded-md flex items-center justify-center hover:bg-primary/90 transition-colors"
              >
                Launch App
              </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
