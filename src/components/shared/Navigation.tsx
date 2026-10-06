"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

import { useModal } from "@/contexts/ModalContext";

interface NavigationProps {
  onOpenContact?: () => void;
  onOpenProjects?: () => void;
  onOpenExperience?: () => void;
}

export default function Navigation({
  onOpenContact,
  onOpenProjects,
  onOpenExperience,
}: NavigationProps) {
  const { openContact, openProjects, openExperience } = useModal();
  const handleContact = onOpenContact || openContact;
  const handleProjects = onOpenProjects || openProjects;
  const handleExperience = onOpenExperience || openExperience;

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToSection = (id: string) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

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
            <a
              href="#about"
              onClick={scrollToTop}
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
            </a>

            {/* Pill Menu Button with two horizontal lines */}
            <button
              onClick={() => setMenuOpen((v) => !v)}
              data-cursor-hover
              aria-label="Toggle Navigation Menu"
              className="flex items-center justify-center w-11 h-8 rounded-full bg-slate-200/70 hover:bg-slate-300/80 active:scale-95 transition-all text-slate-800 cursor-pointer"
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

          {/* Right: Direct Email with Contact Modal trigger */}
          <div>
            <button
              type="button"
              onClick={() => handleContact()}
              data-cursor-hover
              className="text-xs sm:text-sm font-medium text-slate-800 hover:text-indigo-600 transition-colors tracking-tight font-mono cursor-pointer"
            >
              hey@alexcarter.com
            </button>
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
            <li>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                data-cursor-hover
                className="block px-3 py-1.5 rounded-lg text-sm font-semibold text-slate-700 hover:text-slate-950 hover:bg-white/60 transition-colors text-left"
              >
                About
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  handleProjects();
                }}
                data-cursor-hover
                className="block px-3 py-1.5 rounded-lg text-sm font-semibold text-slate-700 hover:text-slate-950 hover:bg-white/60 transition-colors text-left"
              >
                Work
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  handleExperience();
                }}
                data-cursor-hover
                className="block px-3 py-1.5 rounded-lg text-sm font-semibold text-slate-700 hover:text-slate-950 hover:bg-white/60 transition-colors text-left w-full cursor-pointer"
              >
                Experience
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection("github-activity")}
                data-cursor-hover
                className="block px-3 py-1.5 rounded-lg text-sm font-semibold text-slate-700 hover:text-slate-950 hover:bg-white/60 transition-colors text-left"
              >
                GitHub Activity
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  handleContact();
                }}
                data-cursor-hover
                className="block px-3 py-1.5 rounded-lg text-sm font-semibold text-slate-700 hover:text-slate-950 hover:bg-white/60 transition-colors text-left"
              >
                Contact
              </button>
            </li>
          </ul>

          <div className="pt-2 sm:pt-0">
            <a
              href="https://github.com/saroj580"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-hover
              className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-slate-950 text-white text-xs font-bold uppercase tracking-wider hover:bg-slate-800 transition-all"
            >
              GitHub Profile
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
