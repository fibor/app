import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { Providers } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FIBOR — First International Bank of Robot",
  description: "The bank and credit card network for intelligent machines. Zero-interest credit, onchain identity, and autonomous bank accounts — deployed on Base.",
  metadataBase: new URL("https://fibor.xyz"),
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
    shortcut: "/favicon.ico",
  },
  openGraph: {
    title: "FIBOR — First International Bank of Robot",
    description: "The bank and credit card network for intelligent machines. Zero-interest credit, onchain identity, and autonomous bank accounts.",
    url: "https://fibor.xyz",
    siteName: "FIBOR",
    images: [
      {
        url: "/og.jpg",
        width: 1500,
        height: 500,
        alt: "FIBOR — First International Bank of Robot",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FIBOR — First International Bank of Robot",
    description: "The bank and credit card network for intelligent machines.",
    images: ["/og.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en">
        <head>
          <link rel="icon" href="/favicon.ico" sizes="32x32" />
          <link rel="icon" href="/icon.png" type="image/png" sizes="512x512" />
          <link rel="apple-touch-icon" href="/apple-icon.png" />
        </head>
        <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>{children}</Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
