"use client";

import { useState, createContext, useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

type WalletContextType = {
  connected: boolean;
  address: string;
  connect: () => void;
  disconnect: () => void;
};

const WalletContext = createContext<WalletContextType>({
  connected: false,
  address: "",
  connect: () => {},
  disconnect: () => {},
});

export function useWallet() {
  return useContext(WalletContext);
}

const navItems = [
  { label: "Dashboard", href: "/app" },
  { label: "Stake", href: "/app/stake" },
  { label: "Explorer", href: "/app/explorer" },
  { label: "History", href: "/app/history" },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [connected, setConnected] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const address = "0x7a3F...c92E";

  return (
    <WalletContext.Provider
      value={{
        connected,
        address,
        connect: () => setConnected(true),
        disconnect: () => setConnected(false),
      }}
    >
      <div className="min-h-screen bg-[#fafafa] font-sans">
        {/* Top Nav */}
        <nav className="fixed top-0 left-0 right-0 z-50 h-14 bg-white/80 backdrop-blur-xl border-b border-black/[0.04]">
          <div className="h-full max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
            <div className="flex items-center gap-6">
                <Link href="/" className="flex items-center gap-2">
                  <Image src="/fibor-icon.png" alt="" width={24} height={24} className="h-6 w-6" />
                  <span className="text-[15px] font-semibold tracking-tight">FIBOR</span>
                </Link>
              <div className="hidden sm:flex items-center gap-1">
                <div className="w-px h-4 bg-black/[0.06]" />
                <span className="text-[12px] text-neutral-400 ml-1.5 font-mono">Protocol</span>
              </div>
            </div>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`px-3 py-1.5 rounded-md text-[13px] transition-colors ${
                      isActive
                        ? "bg-black/[0.04] text-black font-medium"
                        : "text-neutral-500 hover:text-black hover:bg-black/[0.02]"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>

            <div className="flex items-center gap-3">
              {connected ? (
                <button
                  onClick={() => setConnected(false)}
                  className="h-8 px-3 rounded-md border border-black/[0.06] bg-white text-[12px] font-mono text-neutral-600 hover:border-black/[0.12] transition-colors flex items-center gap-2"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  {address}
                </button>
              ) : (
                <button
                  onClick={() => setConnected(true)}
                  className="h-8 px-4 bg-black text-white text-[13px] font-medium rounded-md hover:bg-neutral-800 transition-colors"
                >
                  Connect Wallet
                </button>
              )}
              {/* Mobile hamburger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden w-8 h-8 flex items-center justify-center"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  {mobileMenuOpen ? (
                    <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  ) : (
                    <path d="M2 4h12M2 8h12M2 12h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile nav dropdown */}
        {mobileMenuOpen && (
          <>
            <div className="fixed inset-0 z-40 bg-black/10 backdrop-blur-sm md:hidden" onClick={() => setMobileMenuOpen(false)} />
            <div className="fixed top-14 left-0 right-0 z-40 bg-white border-b border-black/[0.04] md:hidden">
              <div className="p-3 space-y-1">
                {navItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`block px-3 py-2 rounded-md text-[13px] transition-colors ${
                        isActive
                          ? "bg-black/[0.04] text-black font-medium"
                          : "text-neutral-500 hover:text-black"
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          </>
        )}

        {/* Main content */}
        <main className="pt-14">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
            {children}
          </div>
        </main>
      </div>
    </WalletContext.Provider>
  );
}
