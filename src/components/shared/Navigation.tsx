"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Menu, X, Sparkles } from "lucide-react";

const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#work", label: "Work" },
  { href: "#github", label: "GitHub" },
  { href: "#contact", label: "Contact" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  // Sticky nav shadow on scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Intersection observer for active section highlighting
  useEffect(() => {
    const sections = NAV_LINKS.map(({ href }) =>
      document.querySelector(href)
    ).filter(Boolean) as Element[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px" }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const handleNavClick = () => setMobileOpen(false);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/80 backdrop-blur-xl border-b border-slate-200/60 shadow-sm"
          : "bg-transparent"
      )}
    >
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 group"
            data-cursor-hover
          >
            <div className="relative w-8 h-8">
              <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 opacity-90 group-hover:opacity-100 transition-opacity" />
              <Sparkles className="absolute inset-0 m-auto w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-lg tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors">
              saroj<span className="text-indigo-500">.</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  data-cursor-hover
                  className={cn(
                    "relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200",
                    "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80",
                    activeSection === href &&
                      "text-indigo-600 bg-indigo-50 hover:bg-indigo-50 hover:text-indigo-600"
                  )}
                >
                  {activeSection === href && (
                    <span className="absolute inset-x-3 -bottom-px h-px bg-gradient-to-r from-indigo-500/0 via-indigo-500 to-indigo-500/0" />
                  )}
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({ size: "sm" }),
                "bg-gradient-to-r from-indigo-500 to-violet-600 text-white border-none hover:from-indigo-600 hover:to-violet-700 shadow-sm hover:shadow-indigo-200/60 hover:shadow-md transition-all"
              )}
              data-cursor-hover
            >
              Resume
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div
        className={cn(
          "md:hidden overflow-hidden transition-all duration-300 ease-in-out",
          mobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="bg-white/95 backdrop-blur-xl border-b border-slate-200/60 px-4 pb-6 pt-2">
          <ul className="flex flex-col gap-1">
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  onClick={handleNavClick}
                  className={cn(
                    "block px-4 py-3 text-sm font-medium rounded-lg transition-colors",
                    "text-slate-700 hover:text-slate-900 hover:bg-slate-100",
                    activeSection === href && "text-indigo-600 bg-indigo-50"
                  )}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-4 pt-4 border-t border-slate-100">
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({ size: "default" }),
                "w-full bg-gradient-to-r from-indigo-500 to-violet-600 text-white border-none justify-center"
              )}
            >
              Download Resume
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
