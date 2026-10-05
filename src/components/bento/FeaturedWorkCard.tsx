"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getFeaturedProjects } from "@/actions/projects";
import type { Project } from "@/types";

const FALLBACK_PROJECTS = [
  {
    id: "health-ai",
    title: "Health AI Predictor",
    description: "AI/ML health assessment model",
    techStack: ["Next.js", "Python", "FastAPI", "Tailwind CSS", "PyTorch"],
    imageUrl: "/images/projects/health-ai.jpg",
    liveUrl: "https://github.com/saroj580",
    repoUrl: "https://github.com/saroj580",
    featured: true,
    order: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "fintech-core",
    title: "PulseFlow Analytics",
    description: "Real-time financial telemetry dashboard",
    techStack: ["React", "TypeScript", "WebSocket", "Apache Kafka", "PostgreSQL"],
    imageUrl: "/images/projects/health-ai.jpg",
    liveUrl: "https://github.com/saroj580",
    repoUrl: "https://github.com/saroj580",
    featured: true,
    order: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "cloud-sentinel",
    title: "Sentinel Cloud OS",
    description: "Distributed infrastructure orchestration platform",
    techStack: ["Docker", "Kubernetes", "Next.js", "Go", "Prometheus"],
    imageUrl: "/images/projects/health-ai.jpg",
    liveUrl: "https://github.com/saroj580",
    repoUrl: "https://github.com/saroj580",
    featured: true,
    order: 3,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export default function FeaturedWorkCard() {
  const [projects, setProjects] = useState<Project[]>(FALLBACK_PROJECTS);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Dynamic fetch from Neon PostgreSQL via Server Action
    getFeaturedProjects()
      .then((res) => {
        if (res.success && res.data && res.data.length > 0) {
          setProjects(res.data);
        }
      })
      .catch((err) => {
        console.warn("[FeaturedWorkCard] Fetching projects failed, using fallback:", err);
      });
  }, []);

  const prevProject = () => {
    setCurrentIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
  };

  const nextProject = () => {
    setCurrentIndex((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
  };

  const current = projects[currentIndex] || FALLBACK_PROJECTS[0];

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-[0_4px_24px_rgba(0,0,0,0.03)] border border-slate-200/60 flex flex-col justify-between h-full transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold tracking-tight text-slate-900">
          Featured Work
        </h2>
        <span className="text-xs font-mono font-medium text-slate-400">
          0{currentIndex + 1} / 0{projects.length}
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
              src={current.imageUrl || "/images/projects/health-ai.jpg"}
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
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-slate-900 text-base leading-snug">
            {current.title}
            <span className="font-normal text-slate-500"> — {current.description}</span>
          </h3>
          {current.liveUrl && (
            <a
              href={current.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-hover
              className="p-1 rounded-md text-slate-400 hover:text-slate-900 transition-colors"
              title="View repository / live demo"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>

      {/* Carousel Controls */}
      <div className="flex items-center justify-between py-2 border-t border-slate-100">
        {/* Pagination Dots */}
        <div className="flex items-center gap-1.5">
          {projects.map((p, idx) => (
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
        href="https://github.com/saroj580"
        target="_blank"
        rel="noopener noreferrer"
        data-cursor-hover
        className="mt-3 w-full py-3 rounded-full bg-slate-950 text-white text-xs font-bold uppercase tracking-wider text-center hover:bg-slate-800 active:scale-98 transition-all block shadow-sm"
      >
        VIEW ALL PROJECTS
      </a>
    </div>
  );
}
