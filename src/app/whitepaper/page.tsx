import Image from "next/image";
import Link from "next/link";
import fs from "fs";
import path from "path";

export const metadata = {
  title: "Whitepaper — FIBOR",
  description: "FIBOR Protocol Whitepaper. The First International Bank of Robots.",
};

function parseMarkdown(md: string): string {
  return md
    // Remove the title lines (we render them separately)
    .replace(/^# .*\n/m, "")
    .replace(/^\*\*.*\*\*\n/m, "")
    .replace(/^\*Version.*\*\n/m, "")
    .replace(/^---\n/gm, "")
    // Headers
    .replace(/^## (.*$)/gm, '<h2 class="text-xl font-bold tracking-tight mt-14 mb-4">$1</h2>')
    .replace(/^### (.*$)/gm, '<h3 class="text-base font-semibold mt-8 mb-3">$1</h3>')
    // Bold
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    // Italic
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    // Inline code
    .replace(/`(.*?)`/g, '<code class="text-[13px] bg-neutral-100 px-1.5 py-0.5 rounded font-mono">$1</code>')
    // Code blocks
    .replace(/```(\w*)\n([\s\S]*?)```/g, '<pre class="my-6 p-5 rounded-xl bg-neutral-100 border border-black/[0.04] overflow-x-auto font-mono text-[13px] leading-relaxed whitespace-pre-wrap">$2</pre>')
    // Tables
    .replace(/\|(.+)\|\n\|[-| ]+\|\n((?:\|.+\|\n?)*)/g, (_, header, body) => {
      const headers = header.split("|").map((h: string) => h.trim()).filter(Boolean);
      const rows = body.trim().split("\n").map((row: string) =>
        row.split("|").map((c: string) => c.trim()).filter(Boolean)
      );
      return `<div class="my-6 overflow-x-auto"><table class="w-full text-[13px] border-collapse">
        <thead><tr>${headers.map((h: string) => `<th class="text-left p-3 border-b border-black/[0.06] font-semibold text-neutral-500">${h}</th>`).join("")}</tr></thead>
        <tbody>${rows.map((row: string[]) => `<tr>${row.map((c: string) => `<td class="p-3 border-b border-black/[0.03] text-neutral-600">${c}</td>`).join("")}</tr>`).join("")}</tbody>
      </table></div>`;
    })
    // Unordered lists
    .replace(/^- (.*)$/gm, '<li class="ml-5 mb-1.5 text-neutral-700 list-disc">$1</li>')
    // Ordered lists
    .replace(/^\d+\. (.*)$/gm, '<li class="ml-5 mb-1.5 text-neutral-700 list-decimal">$1</li>')
    // Wrap consecutive li's in ul
    .replace(/((?:<li class="ml-5 mb-1.5 text-neutral-700 list-disc">.*<\/li>\n?)+)/g, '<ul class="my-4 space-y-0.5">$1</ul>')
    .replace(/((?:<li class="ml-5 mb-1.5 text-neutral-700 list-decimal">.*<\/li>\n?)+)/g, '<ol class="my-4 space-y-0.5">$1</ol>')
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="underline underline-offset-2 hover:text-black transition-colors">$1</a>')
    // Paragraphs (lines that aren't already HTML)
    .replace(/^(?!<[hupoltd])((?!<).+)$/gm, '<p class="mb-5">$1</p>')
    // Diff blocks
    .replace(/```diff\n([\s\S]*?)```/g, '<pre class="my-6 p-5 rounded-xl bg-neutral-100 border border-black/[0.04] overflow-x-auto font-mono text-[13px] leading-relaxed whitespace-pre-wrap">$1</pre>')
    // Clean up empty paragraphs
    .replace(/<p class="mb-5"><\/p>/g, "")
    .replace(/<p class="mb-5">\s*<\/p>/g, "");
}

export default function WhitepaperPage() {
  const filePath = path.join(process.cwd(), "WHITEPAPER.md");
  const content = fs.readFileSync(filePath, "utf-8");
  const html = parseMarkdown(content);

  return (
    <div className="min-h-screen bg-[#fafaf8]">
      <nav className="sticky top-0 z-50 bg-[#fafaf8]/80 backdrop-blur-xl border-b border-black/[0.04]">
        <div className="max-w-2xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/fibor-icon.png" alt="" width={20} height={20} className="h-5 w-5" />
            <span className="text-sm font-semibold tracking-tight">FIBOR</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/docs" className="text-[13px] text-neutral-500 hover:text-black transition-colors">
              Docs
            </Link>
            <Link href="/thesis" className="text-[13px] text-neutral-500 hover:text-black transition-colors">
              Thesis
            </Link>
          </div>
        </div>
      </nav>

      <main className="max-w-2xl mx-auto px-6 py-16 sm:py-24">
        <article>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-1">
            FIBOR Protocol Whitepaper
          </h1>
          <p className="text-lg text-neutral-500 mb-2 italic">
            The First International Bank of Robots
          </p>
          <p className="text-sm text-neutral-400 mb-12">
            Version 1.0 &mdash; April 2026
          </p>

          <div
            className="text-[15px] text-neutral-700 leading-[1.8]"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </article>
      </main>
    </div>
  );
}
