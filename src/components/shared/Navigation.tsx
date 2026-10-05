"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#work", label: "Work" },
  { href: "#github", label: "GitHub Activity" },
  { href: "#contact", label: "Contact" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-[#edf0f4]/80 backdrop-blur-xl border-b border-slate-300/40 shadow-xs"
          : "bg-transparent"
      )}
    >
      <nav className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Left: Triangle Icon + Pill Menu Toggle (matching Screenshot 1) */}
          <div className="flex items-center gap-3">
            {/* Minimal Rounded Triangle Glyph */}
            <Link
              href="/"
              data-cursor-hover
              aria-label="Home"
              className="p-1 rounded-xl hover:bg-slate-200/50 transition-colors"
            >
              <svg
                className="w-7 h-7 text-slate-900"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              </svg>
            </Link>

            {/* Pill Menu Button with two horizontal lines */}
            <button
              onClick={() => setMenuOpen((v) => !v)}
              data-cursor-hover
              aria-label="Toggle Navigation Menu"
              className="flex items-center justify-center w-11 h-8 rounded-full bg-slate-200/70 hover:bg-slate-300/80 active:scale-95 transition-all text-slate-800"
            >
              {menuOpen ? (
                <X className="w-4 h-4" />
              ) : (
                <div className="flex flex-col gap-1 items-center justify-center w-4">
                  <span className="w-4 h-0.5 bg-slate-800 rounded-full" />
                  <span className="w-4 h-0.5 bg-slate-800 rounded-full" />
                </div>
              )}
            </button>
          </div>

          {/* Right: Direct Email (matching Screenshot 1) */}
          <div>
            <a
              href="mailto:hey@alexcarter.com"
              data-cursor-hover
              className="text-xs sm:text-sm font-medium text-slate-800 hover:text-indigo-600 transition-colors tracking-tight font-mono"
            >
              hey@alexcarter.com
            </a>
          </div>
        </div>
      </nav>

      {/* Slide-down Glassmorphic Navigation Menu */}
      <div
        className={cn(
          "overflow-hidden transition-all duration-300 ease-in-out border-b border-slate-300/40",
          menuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0 pointer-events-none"
        )}
      >
        <div className="bg-[#edf0f4]/95 backdrop-blur-2xl max-w-7xl mx-auto px-6 py-4 sm:px-12 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <ul className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  data-cursor-hover
                  className="block px-3 py-1.5 rounded-lg text-sm font-semibold text-slate-700 hover:text-slate-950 hover:bg-white/60 transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="pt-2 sm:pt-0">
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-hover
              className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-slate-950 text-white text-xs font-bold uppercase tracking-wider hover:bg-slate-800 transition-all"
            >
              Download CV
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
