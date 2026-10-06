"use client";

import Link from "next/link";

import { useModal } from "@/contexts/ModalContext";

interface FooterSectionProps {
  onOpenContact?: (serviceName?: string) => void;
  onOpenProjects?: () => void;
}

const SERVICES = [
  "Web Development",
  "API Integration",
  "Database Design",
  "Tech Consulting",
];

export default function FooterSection({
  onOpenContact,
  onOpenProjects,
}: FooterSectionProps) {
  const { openContact, openProjects } = useModal();
  const handleContact = onOpenContact || openContact;
  const handleProjects = onOpenProjects || openProjects;

  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="contact" className="bg-[#070d19] text-white pt-16 pb-12 mt-16 border-t border-slate-800/60">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Column 1: Brand & Tagline */}
          <div className="md:col-span-5 space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
              <a
                href="#about"
                onClick={scrollToTop}
                data-cursor-hover
                className="hover:opacity-90 transition-opacity"
              >
                <span className="text-[#3b82f6]">Alex Carter</span>{" "}
                <span className="text-white">| Software Developer</span>
              </a>
            </h2>
            <p className="text-slate-400 text-sm max-w-sm leading-relaxed">
              Crafting powerful, scalable digital solutions.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="md:col-span-3">
            <h3 className="text-white font-bold text-sm tracking-wide mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              <li>
                <a
                  href="#about"
                  onClick={scrollToTop}
                  data-cursor-hover
                  className="text-slate-400 hover:text-white text-sm transition-colors block"
                >
                  About
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={handleProjects}
                  data-cursor-hover
                  className="text-slate-400 hover:text-white text-sm transition-colors block text-left cursor-pointer"
                >
                  Work
                </button>
              </li>
              <li>
                <a
                  href="#about"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  data-cursor-hover
                  className="text-slate-400 hover:text-white text-sm transition-colors block"
                >
                  Experience
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleContact("General Inquiry")}
                  data-cursor-hover
                  className="text-slate-400 hover:text-white text-sm transition-colors block text-left cursor-pointer"
                >
                  Contact
                </button>
              </li>
              <li>
                <a
                  href="https://github.com/saroj580"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor-hover
                  className="text-slate-400 hover:text-white text-sm transition-colors block"
                >
                  Blogs
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Developer Services */}
          <div className="md:col-span-3">
            <h3 className="text-white font-bold text-sm tracking-wide mb-4">
              Developer Services
            </h3>
            <ul className="space-y-2.5">
              {SERVICES.map((service) => (
                <li key={service}>
                  <button
                    type="button"
                    onClick={() => handleContact(`Inquiry regarding ${service} Services`)}
                    data-cursor-hover
                    className="text-slate-400 hover:text-white hover:translate-x-1 transition-all text-sm block text-left cursor-pointer"
                  >
                    {service}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Sparkle Vector Icon (Far Right) */}
          <div className="md:col-span-1 hidden md:flex justify-end pt-2">
            <svg
              className="w-12 h-12 text-slate-400/80 drop-shadow-[0_0_12px_rgba(255,255,255,0.15)] animate-pulse"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 0L14.6 9.4L24 12L14.6 14.6L12 24L9.4 14.6L0 12L9.4 9.4L12 0Z" />
            </svg>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-800/80 my-10" />

        {/* Copyright */}
        <div className="text-center">
          <p className="text-slate-400 text-xs sm:text-sm font-medium">
            &copy; 2026 Alex Carter Portfolio. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
