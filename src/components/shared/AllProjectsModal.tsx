"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { X, ExternalLink, Code2, Layers, Sparkles } from "lucide-react";
import { getAllProjects } from "@/actions/projects";
import type { Project } from "@/types";

interface AllProjectsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AllProjectsModal({ isOpen, onClose }: AllProjectsModalProps) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedTag, setSelectedTag] = useState<string>("All");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      getAllProjects()
        .then((res) => {
          if (res.success && res.data) {
            setProjects(res.data);
          }
        })
        .finally(() => setLoading(false));
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Extract all unique tags
  const allTags = ["All", ...Array.from(new Set(projects.flatMap((p) => p.techStack)))];

  const filteredProjects =
    selectedTag === "All"
      ? projects
      : projects.filter((p) => p.techStack.includes(selectedTag));

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[85vh] bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-500" />
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
                All Projects & Repositories
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Explore open-source software, production applications, and ML models.
            </p>
          </div>

          <button
            onClick={onClose}
            aria-label="Close"
            className="p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Tags */}
        <div className="py-3 flex items-center gap-2 overflow-x-auto scrollbar-none shrink-0">
          {allTags.slice(0, 8).map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                selectedTag === tag
                  ? "bg-slate-950 text-white shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Projects Grid Container */}
        <div className="overflow-y-auto flex-1 pr-1 space-y-4 pt-2">
          {loading ? (
            <div className="py-16 text-center text-slate-400 text-sm">
              Loading projects from database...
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="py-16 text-center text-slate-400 text-sm">
              No projects found for category &ldquo;{selectedTag}&rdquo;.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  className="rounded-2xl border border-slate-200/80 p-5 bg-slate-50/50 hover:bg-white hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-slate-100 border border-slate-200/60">
                      <Image
                        src={project.imageUrl || "/images/projects/health-ai.jpg"}
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 400px"
                        className="object-cover"
                      />
                    </div>

                    <div>
                      <h3 className="font-bold text-slate-900 text-base">
                        {project.title}
                      </h3>
                      <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                        {project.description}
                      </p>
                    </div>

                    {/* Tech stack badges */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-[11px] font-medium text-slate-700"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Links */}
                  <div className="flex items-center gap-3 pt-4 mt-3 border-t border-slate-200/60">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        Live Demo
                      </a>
                    )}
                    {project.repoUrl && (
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-slate-950 transition-colors"
                      >
                        <Code2 className="w-3.5 h-3.5" />
                        Source Code
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
