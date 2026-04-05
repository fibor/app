"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { sections } from "@/lib/docs-sections";

function getAllPages() {
  const pages: { label: string; href: string }[] = [];
  sections.forEach((s) => s.items.forEach((item) => pages.push(item)));
  return pages;
}

export function DocsFooterNav() {
  const pathname = usePathname();
  const pages = getAllPages();
  const currentIndex = pages.findIndex((p) => p.href === pathname);
  const prev = currentIndex > 0 ? pages[currentIndex - 1] : null;
  const next = currentIndex < pages.length - 1 ? pages[currentIndex + 1] : null;

  return (
    <div className="mt-16 pt-8 border-t border-border flex items-center justify-between">
      {prev ? (
        <Link
          href={prev.href}
          className="group flex items-center gap-2 text-sm text-neutral-500 hover:text-black transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="transition-transform group-hover:-translate-x-0.5">
            <path d="M8 3L4 7l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {prev.label}
        </Link>
      ) : (
        <div />
      )}
      {next ? (
        <Link
          href={next.href}
          className="group flex items-center gap-2 text-sm text-neutral-500 hover:text-black transition-colors"
        >
          {next.label}
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="transition-transform group-hover:translate-x-0.5">
            <path d="M6 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      ) : (
        <div />
      )}
    </div>
  );
}
