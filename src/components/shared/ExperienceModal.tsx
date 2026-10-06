"use client";

import { useEffect, useState } from "react";
import {
  X,
  Briefcase,
  Calendar,
  MapPin,
  CheckCircle2,
  Building2,
  Clock,
  Sparkles,
  Loader2,
} from "lucide-react";
import { EXPERIENCES } from "@/data/experiences";
import { getExperiences } from "@/actions/experience";

export interface ExperienceDetail {
  id?: string;
  role: string;
  company: string;
  year: string;
  period?: string;
  mode: string;
  type: string;
  location: string;
  summary: string;
  highlights: string[];
  skills: string[];
  isCurrent?: boolean;
}

interface ExperienceModalProps {
  isOpen: boolean;
  onClose: () => void;
  experience?: ExperienceDetail | null;
  experiences?: ExperienceDetail[];
}

export default function ExperienceModal({
  isOpen,
  onClose,
  experience = null,
  experiences = EXPERIENCES,
}: ExperienceModalProps) {
  const [experienceList, setExperienceList] = useState<ExperienceDetail[]>(
    experiences.length > 0 ? experiences : EXPERIENCES
  );
  const [loading, setLoading] = useState(false);

  // Active selected experience
  const [activeExp, setActiveExp] = useState<ExperienceDetail>(
    experience || experienceList[0] || EXPERIENCES[0]
  );

  // When modal opens, fire server action getExperiences (visible in Network tab)
  useEffect(() => {
    if (isOpen) {
      console.log("[ExperienceModal] Opened. Fetching experiences from server action...");
      setLoading(true);
      getExperiences()
        .then((res) => {
          if (res.success && res.data && res.data.length > 0) {
            setExperienceList(res.data);
            if (!experience) {
              setActiveExp(res.data[0]);
            }
          }
        })
        .catch((err) => {
          console.error("[ExperienceModal] Server action error:", err);
        })
        .finally(() => {
          setLoading(false);
        });

      if (experience) {
        setActiveExp(experience);
      } else if (experienceList.length > 0) {
        setActiveExp(experienceList[0]);
      }
    }
  }, [isOpen, experience]);

  // ESC key to close & body scroll lock
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const currentItem = activeExp || experienceList[0] || EXPERIENCES[0];
  const hasMultiple = experienceList.length > 1;

  return (
    <div
      className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-5 bg-slate-950/75 backdrop-blur-md"
      style={{ isolation: "isolate" }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl max-h-[90vh] bg-white rounded-3xl shadow-2xl border border-slate-200/80 flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-slate-100 bg-slate-50/60 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shadow-xs">
              <Briefcase className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold tracking-tight text-slate-900 leading-tight">
                  Career Experience
                </h2>
                {loading && (
                  <Loader2 className="w-3.5 h-3.5 text-indigo-500 animate-spin" />
                )}
              </div>
              <p className="text-[11px] sm:text-xs text-slate-500">
                Professional roles & technical milestones
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close"
            className="p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Multi-experience tabs (when multiple experiences exist in future) */}
        {hasMultiple && (
          <div className="flex items-center gap-2 px-6 py-2.5 border-b border-slate-100 bg-white overflow-x-auto shrink-0">
            {experienceList.map((exp, idx) => {
              const isSelected =
                (currentItem.id && exp.id === currentItem.id) ||
                (exp.role === currentItem.role && exp.company === currentItem.company);

              return (
                <button
                  key={exp.id || idx}
                  onClick={() => setActiveExp(exp)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    isSelected
                      ? "bg-slate-900 text-white shadow-sm"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
                  }`}
                >
                  <span>{exp.company}</span>
                  <span className="text-[10px] opacity-75">({exp.year})</span>
                </button>
              );
            })}
          </div>
        )}

        {/* Modal Body (Scrollable) */}
        <div className="p-6 sm:p-7 overflow-y-auto space-y-6">
          {/* Main Role Card Header */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 p-5 rounded-2xl bg-gradient-to-br from-indigo-50/70 via-slate-50/80 to-white border border-indigo-100/70">
            <div className="flex items-start gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-indigo-600/20">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-tight">
                    {currentItem.role}
                  </h3>
                  {currentItem.isCurrent !== false && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                      Current Role
                    </span>
                  )}
                </div>
                <p className="text-sm font-semibold text-indigo-700 mt-0.5">
                  {currentItem.company}
                </p>
              </div>
            </div>

            {/* Mode & Type pill */}
            <div className="flex sm:flex-col items-center sm:items-end gap-1.5 self-start">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-slate-700 shadow-xs">
                <Clock className="w-3.5 h-3.5 text-slate-500" />
                {currentItem.type}
              </span>
              <span className="text-[11px] text-slate-500 font-medium">
                {currentItem.mode}
              </span>
            </div>
          </div>

          {/* Meta Details Pills */}
          <div className="flex flex-wrap items-center gap-3 py-1 text-xs text-slate-600">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 font-medium">
              <Calendar className="w-3.5 h-3.5 text-slate-500" />
              {currentItem.period || currentItem.year}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 font-medium">
              <MapPin className="w-3.5 h-3.5 text-slate-500" />
              {currentItem.location}
            </span>
          </div>

          {/* Role Summary */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Overview
            </h4>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50/70 p-4 rounded-xl border border-slate-100">
              {currentItem.summary}
            </p>
          </div>

          {/* Key Highlights / Contributions */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Key Responsibilities & Impact
            </h4>
            <div className="space-y-2">
              {currentItem.highlights.map((highlight, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-3 rounded-xl bg-slate-50/50 hover:bg-slate-50 border border-slate-100 transition-colors"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-slate-700 leading-normal">
                    {highlight}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Technologies & Tools */}
          <div className="pt-1">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">
              Technologies & Tools
            </h4>
            <div className="flex flex-wrap gap-2">
              {currentItem.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 rounded-xl bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 text-slate-800 text-xs font-medium border border-slate-200/60 transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Future Experiences / Career Path Note */}
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-dashed border-slate-200 flex items-center justify-between text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-500 shrink-0" />
              <span>
                {hasMultiple
                  ? "All career milestones are documented above."
                  : "Future roles & career milestones will automatically appear here as they are added."}
              </span>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-end px-6 py-4 border-t border-slate-100 bg-slate-50/60 shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
