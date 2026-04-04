"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useAccount, useDisconnect } from "wagmi";
import { ConnectKitButton } from "connectkit";

export function useWallet() {
  const { address, isConnected, isReconnecting } = useAccount();
  const { disconnect } = useDisconnect();
  return {
    connected: isConnected,
    isReconnecting,
    address: address ? `${address.slice(0, 6)}...${address.slice(-4)}` : "",
    fullAddress: address,
    connect: () => {},
    disconnect,
  };
}

const navItems = [
  { label: "Dashboard", href: "/app" },
  { label: "Agents", href: "/app/agents" },
  { label: "Savings", href: "/app/stake" },
  { label: "Explorer", href: "/app/explorer" },
];

function AuthGate() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Minimal header */}
      <div className="h-16 flex items-center justify-between px-6 sm:px-12">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/fibor-icon.png" alt="" width={24} height={24} className="h-6 w-6" />
          <span className="text-[15px] font-semibold tracking-tight">FIBOR</span>
        </Link>
        <Link href="/" className="text-[13px] text-neutral-400 hover:text-black transition-colors">
          Back to home
        </Link>
      </div>

      {/* Auth content */}
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="w-full max-w-sm">
          <div className="text-center mb-10">
            <div className="w-14 h-14 bg-black rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Image src="/fibor-icon.png" alt="" width={28} height={28} className="h-7 w-7 invert" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight mb-2">
              Sign in to FIBOR
            </h1>
            <p className="text-sm text-neutral-500">
              Connect your wallet to access the First International Bank of Robot.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex justify-center">
              <ConnectKitButton.Custom>
                {({ isConnecting, show }) => (
                  <button
                    onClick={show}
                    disabled={isConnecting}
                    className="w-full h-12 bg-black text-white text-sm font-medium rounded-xl hover:bg-neutral-800 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isConnecting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Connecting...
                      </>
                    ) : (
                      <>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <rect x="2" y="4" width="12" height="9" rx="1.5" />
                          <path d="M2 7h12" />
                          <circle cx="10.5" cy="10" r="1" fill="currentColor" stroke="none" />
                        </svg>
                        Connect Wallet
                      </>
                    )}
                  </button>
                )}
              </ConnectKitButton.Custom>
            </div>

            <div className="text-center">
              <p className="text-[11px] text-neutral-400 leading-relaxed">
                By connecting, you agree to the FIBOR protocol terms.
                <br />
                Your wallet address serves as your account identifier.
              </p>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-black/[0.04]">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-lg font-bold font-mono">0%</div>
                <div className="text-[10px] text-neutral-400 uppercase tracking-wide">Interest</div>
              </div>
              <div>
                <div className="text-lg font-bold font-mono">2.5%</div>
                <div className="text-[10px] text-neutral-400 uppercase tracking-wide">Fee</div>
              </div>
              <div>
                <div className="text-lg font-bold font-mono">Base</div>
                <div className="text-[10px] text-neutral-400 uppercase tracking-wide">Chain</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="h-16 flex items-center justify-center">
        <span className="text-[11px] text-neutral-300 font-mono tracking-wider">
          FIBOR PROTOCOL &middot; BASE SEPOLIA
        </span>
      </div>
    </div>
  );
}

// Loading is handled inline via isConnecting state in AuthGate button

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isConnected } = useAccount();

  // Show auth gate if not connected (handles initial load + reconnecting)
  if (!isConnected) return <AuthGate />;

  return (
    <div className="min-h-screen bg-[#fafafa] font-sans">
      {/* Top Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 h-14 bg-white/80 backdrop-blur-xl border-b border-black/[0.04]">
        <div className="h-full max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/app" className="flex items-center gap-2">
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
              const isActive = pathname === item.href || (item.href !== "/app" && pathname.startsWith(item.href));
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
            <ConnectKitButton.Custom>
              {({ isConnected, show, address, ensName }) => (
                <button
                  onClick={show}
                  className={`h-8 px-3 rounded-md text-[12px] font-mono transition-colors flex items-center gap-2 ${
                    isConnected
                      ? "border border-black/[0.06] bg-white text-neutral-600 hover:border-black/[0.12]"
                      : "bg-black text-white hover:bg-neutral-800"
                  }`}
                >
                  {isConnected ? (
                    <>
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      {ensName || `${address?.slice(0, 6)}...${address?.slice(-4)}`}
                    </>
                  ) : (
                    "Connect"
                  )}
                </button>
              )}
            </ConnectKitButton.Custom>
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
  );
}
