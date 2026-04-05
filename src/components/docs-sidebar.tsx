"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { sections } from "@/lib/docs-sections";

export function DocsSidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="lg:hidden fixed bottom-6 right-6 z-50 w-12 h-12 bg-black text-white rounded-full flex items-center justify-center shadow-lg"
        aria-label="Toggle navigation"
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          {mobileOpen ? (
            <path d="M5 5l8 8M13 5l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          ) : (
            <>
              <path d="M3 5h12M3 9h12M3 13h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </>
          )}
        </svg>
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-16 bottom-0 w-72 border-r border-border bg-card z-40 overflow-y-auto transition-transform duration-300 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <nav className="p-6 pb-20">
          {sections.map((section) => (
            <div key={section.title} className="mb-6">
              <div className="text-[11px] font-medium tracking-widest uppercase text-neutral-400 mb-2.5 px-3">
                {section.title}
              </div>
              <ul className="space-y-0.5">
                {section.items.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className={`block px-3 py-1.5 rounded-md text-[13px] transition-colors ${
                          isActive
                            ? "bg-black/[0.04] text-foreground font-medium"
                            : "text-neutral-500 hover:text-foreground hover:bg-muted"
                        }`}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
}
