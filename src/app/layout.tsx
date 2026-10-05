import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/components/providers";
import Navigation from "@/components/shared/Navigation";
import GlitterCursor from "@/components/cursor/GlitterCursor";

// ─── Fonts ────────────────────────────────────────────────────────────────────
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500", "600"],
});

// ─── SEO Metadata ─────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: {
    default: "Saroj | Full-Stack Developer",
    template: "%s | Saroj",
  },
  description:
    "Full-Stack Developer specializing in modern web apps with Next.js, React, TypeScript, and Node.js. Open to exciting opportunities.",
  keywords: [
    "Full-Stack Developer",
    "Next.js",
    "React",
    "TypeScript",
    "Node.js",
    "Web Developer",
    "Portfolio",
  ],
  authors: [{ name: "Saroj" }],
  creator: "Saroj",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Saroj — Developer Portfolio",
    title: "Saroj | Full-Stack Developer",
    description:
      "Full-Stack Developer specializing in modern web apps with Next.js, React, and TypeScript.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Saroj | Full-Stack Developer",
    description:
      "Full-Stack Developer specializing in modern web apps with Next.js, React, and TypeScript.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export const viewport: Viewport = {
  themeColor: "#6366f1",
  width: "device-width",
  initialScale: 1,
};

// ─── Root Layout ──────────────────────────────────────────────────────────────
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-background text-foreground antialiased overflow-x-hidden">
        <Providers>
          {/* 3D cursor overlay — loaded client-side only */}
          <GlitterCursor />

          {/* Sticky navigation */}
          <Navigation />

          {/* Page content */}
          <main className="relative">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
