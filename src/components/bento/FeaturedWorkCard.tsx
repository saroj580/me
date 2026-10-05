"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  image: string;
  liveUrl?: string;
}

const PROJECTS: ProjectItem[] = [
  {
    id: "health-ai",
    title: "Health AI Predictor",
    subtitle: "AI/ML health assessment model",
    category: "AI/ML & Healthcare",
    image: "/images/projects/health-ai.jpg",
    liveUrl: "https://github.com/saroj580",
  },
  {
    id: "fintech-core",
    title: "PulseFlow Analytics",
    subtitle: "Real-time financial telemetry dashboard",
    category: "Fintech & Data",
    image: "/images/projects/health-ai.jpg",
    liveUrl: "https://github.com/saroj580",
  },
  {
    id: "cloud-sentinel",
    title: "Sentinel Cloud OS",
    subtitle: "Distributed infrastructure monitor",
    category: "DevOps & Cloud",
    image: "/images/projects/health-ai.jpg",
    liveUrl: "https://github.com/saroj580",
  },
];

export default function FeaturedWorkCard() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevProject = () => {
    setCurrentIndex((prev) => (prev === 0 ? PROJECTS.length - 1 : prev - 1));
  };

  const nextProject = () => {
    setCurrentIndex((prev) => (prev === PROJECTS.length - 1 ? 0 : prev + 1));
  };

  const current = PROJECTS[currentIndex];

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-[0_4px_24px_rgba(0,0,0,0.03)] border border-slate-200/60 flex flex-col justify-between h-full transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold tracking-tight text-slate-900">
          Featured Work
        </h2>
        <span className="text-xs font-mono font-medium text-slate-400">
          0{currentIndex + 1} / 0{PROJECTS.length}
        </span>
      </div>

      {/* Project Mockup Container */}
      <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-slate-50 border border-slate-100 shadow-sm mb-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.3 }}
            className="relative w-full h-full"
          >
            <Image
              src={current.image}
              alt={current.title}
              fill
              sizes="(max-width: 768px) 100vw, 400px"
              className="object-cover object-top hover:scale-105 transition-transform duration-500"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Project Details */}
      <div className="mb-4">
        <h3 className="font-bold text-slate-900 text-base leading-snug">
          {current.title}
          <span className="font-normal text-slate-500"> — {current.subtitle}</span>
        </h3>
      </div>

      {/* Carousel Controls */}
      <div className="flex items-center justify-between py-2 border-t border-slate-100">
        {/* Pagination Dots */}
        <div className="flex items-center gap-1.5">
          {PROJECTS.map((p, idx) => (
            <button
              key={p.id}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === currentIndex
                  ? "w-6 bg-slate-900"
                  : "w-2 bg-slate-200 hover:bg-slate-300"
              }`}
            />
          ))}
        </div>

        {/* Arrow Buttons */}
        <div className="flex items-center gap-1">
          <button
            onClick={prevProject}
            data-cursor-hover
            aria-label="Previous project"
            className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-100 active:scale-90 transition-all"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={nextProject}
            data-cursor-hover
            aria-label="Next project"
            className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-100 active:scale-90 transition-all"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Bottom CTA */}
      <a
        href="#work"
        data-cursor-hover
        className="mt-3 w-full py-3 rounded-full bg-slate-950 text-white text-xs font-bold uppercase tracking-wider text-center hover:bg-slate-800 active:scale-98 transition-all block shadow-sm"
      >
        VIEW ALL PROJECTS
      </a>
    </div>
  );
}
