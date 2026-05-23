"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useAccount, useDisconnect } from "wagmi";
import { ConnectKitButton } from "connectkit";
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

function AuthGate({ onConnect }: { onConnect?: () => void } = {}) {
  // Clear any stale WalletConnect sessions that cause popup on load
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        Object.keys(localStorage).forEach((key) => {
          if (key.startsWith("wc@") || key.includes("walletconnect")) {
            localStorage.removeItem(key);
          }
        });
        indexedDB.deleteDatabase("WALLET_CONNECT_V2_INDEXED_DB");
      } catch {}
    }
  }, []);

  return (
    <div className="min-h-screen bg-muted flex flex-col">
      {/* Minimal header */}
      <div className="h-16 flex items-center justify-between px-6 sm:px-12">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/fibor-icon.png" alt="" width={24} height={24} className="h-6 w-6 dark:invert" />
          <span className="text-[15px] font-semibold tracking-tight">FIBOR</span>
        </Link>
        <Link href="/" className="text-[13px] text-neutral-400 hover:text-foreground transition-colors">
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
                    onClick={() => {
                      onConnect?.();
                      show?.();
                    }}
                    disabled={isConnecting}
                    className="w-full h-12 bg-primary text-primary-foreground text-sm font-medium rounded-xl hover:bg-primary/90 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
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

          <div className="mt-12 pt-8 border-t border-border">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-lg font-bold font-mono">0%</div>
                <div className="text-[10px] text-neutral-400 uppercase tracking-wide">Interest</div>
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

function NavWalletButton({ onLogout }: { onLogout: () => void }) {
  const { address, isConnected } = useAccount();
  const { disconnectAsync } = useDisconnect();
  const [open, setOpen] = useState(false);

  if (isConnected) {
    return (
      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="h-8 px-3 rounded-md text-[12px] font-mono transition-colors flex items-center gap-2 border border-border bg-card text-neutral-600 hover:border-border"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : ""}
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <path d="M3 4l2 2 2-2" />
          </svg>
        </button>
        {open && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
            <div className="absolute right-0 top-full mt-1.5 z-50 w-48 py-1 bg-card rounded-lg border border-border shadow-lg">
              <div className="px-3 py-2 border-b border-border">
                <div className="text-[10px] text-neutral-400 uppercase tracking-wide">Connected</div>
                <div className="text-[11px] font-mono text-neutral-600 mt-0.5 truncate">{address}</div>
              </div>
              <button
                onClick={async () => {
                  setOpen(false);
                  onLogout();
                  await disconnectAsync();
                }}
                className="w-full px-3 py-2 text-left text-[12px] text-red-600 hover:bg-red-50 transition-colors"
              >
                Disconnect
              </button>
            </div>
          </>
        )}
      </div>
    );
  }

  return (
    <ConnectKitButton.Custom>
      {({ show }) => (
        <button
          onClick={show}
          className="h-8 px-4 rounded-md text-[12px] font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          Connect
        </button>
      )}
    </ConnectKitButton.Custom>
  );
}

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isConnected, isReconnecting } = useAccount();
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);

  // Read logout flag synchronously from sessionStorage to prevent dashboard flash
  const [loggedOut, setLoggedOutState] = useState(() => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("fibor-logged-out") === "true";
    }
    return false;
  });

  // Wrapper that persists to sessionStorage
  const setLoggedOut = (val: boolean) => {
    setLoggedOutState(val);
    if (typeof window !== "undefined") {
      if (val) {
        sessionStorage.setItem("fibor-logged-out", "true");
      } else {
        sessionStorage.removeItem("fibor-logged-out");
      }
    }
  };

  // While wagmi is reconnecting from cached session, show nothing (prevents auth flash)
  if (!hydrated || isReconnecting) {
    return (
      <div className="min-h-screen bg-muted flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-neutral-200 border-t-neutral-800 rounded-full animate-spin" />
      </div>
    );
  }

  // If user is not connected OR they explicitly logged out, show auth gate
  if (!isConnected || loggedOut) return <AuthGate onConnect={() => setLoggedOut(false)} />;

  return (
    <div className="min-h-screen bg-muted font-sans grid-bg-dense">
      {/* Top Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 h-14 bg-card/80 backdrop-blur-xl border-b border-border">
        <div className="h-full max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/app" className="flex items-center gap-2">
              <Image src="/fibor-icon.png" alt="" width={24} height={24} className="h-6 w-6 dark:invert" />
              <span className="text-[15px] font-semibold tracking-tight">FIBOR</span>
            </Link>
            <div className="hidden sm:flex items-center gap-1">
              <div className="w-px h-4 bg-border" />
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
                      ? "bg-muted text-foreground font-medium"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <NavWalletButton onLogout={() => setLoggedOut(true)} />
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
          <div className="fixed inset-0 z-40 bg-muted backdrop-blur-sm md:hidden" onClick={() => setMobileMenuOpen(false)} />
          <div className="fixed top-14 left-0 right-0 z-40 bg-card border-b border-border md:hidden">
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
                        ? "bg-muted text-foreground font-medium"
                        : "text-neutral-500 hover:text-foreground"
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
