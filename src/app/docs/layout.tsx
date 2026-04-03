import { DocsSidebar } from "@/components/docs-sidebar";
import Image from "next/image";

export const metadata = {
  title: "Documentation - FIBOR",
  description: "FIBOR protocol documentation. Learn about financial identity, credit scoring, and onchain credit for autonomous AI agents.",
};

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Docs Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 h-16 bg-white/80 backdrop-blur-xl border-b border-black/[0.04]">
        <div className="h-full px-6 flex items-center justify-between">
          <div className="flex items-center gap-6">
              <a href="/" className="flex items-center gap-2">
                <Image src="/fibor-icon.png" alt="" width={24} height={24} className="h-6 w-6" />
                <span className="text-[15px] font-semibold tracking-tight">FIBOR</span>
              </a>
            <div className="hidden sm:flex items-center gap-1.5">
              <div className="w-px h-4 bg-black/[0.08]" />
              <span className="text-[13px] text-neutral-400 ml-1.5">Documentation</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="/"
              className="text-[13px] text-neutral-500 hover:text-black transition-colors"
            >
              Home
            </a>
            <a
              href="#"
              className="text-[13px] text-neutral-500 hover:text-black transition-colors hidden sm:block"
            >
              GitHub
            </a>
              <a
                href="/app"
                className="h-8 px-4 bg-black text-white text-[13px] font-medium rounded-md flex items-center justify-center hover:bg-neutral-800 transition-colors"
              >
                Launch App
              </a>
          </div>
        </div>
      </nav>

      <DocsSidebar />

      {/* Main content */}
      <main className="lg:pl-72 pt-16">
        <div className="max-w-3xl px-6 lg:px-16 py-12 sm:py-16">
          {children}
        </div>
      </main>
    </div>
  );
}
