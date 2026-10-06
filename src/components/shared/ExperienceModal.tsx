"use client";

import { X, Briefcase, Calendar, MapPin, CheckCircle2 } from "lucide-react";

export interface ExperienceDetail {
  role: string;
  company: string;
  year: string;
  mode: string;
  type: string;
  location: string;
  summary: string;
  highlights: string[];
  skills: string[];
}

interface ExperienceModalProps {
  isOpen: boolean;
  onClose: () => void;
  experience: ExperienceDetail | null;
}

export default function ExperienceModal({
  isOpen,
  onClose,
  experience,
}: ExperienceModalProps) {
  if (!isOpen || !experience) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
            <Briefcase className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 leading-tight">
              {experience.role}
            </h2>
            <p className="text-sm font-semibold text-slate-600">
              {experience.company}
            </p>
          </div>
        </div>

        {/* Metadata pills */}
        <div className="flex flex-wrap items-center gap-2 py-3 text-xs text-slate-500 border-b border-slate-100">
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            {experience.year}
          </span>
          <span>&bull;</span>
          <span className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5" />
            {experience.location} ({experience.mode})
          </span>
          <span>&bull;</span>
          <span className="px-2 py-0.5 rounded-full bg-slate-100 font-medium text-slate-700">
            {experience.type}
          </span>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 mt-4 leading-relaxed">
          {experience.summary}
        </p>

        {/* Key Highlights */}
        <div className="mt-4 space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Key Contributions
          </h3>
          <ul className="space-y-1.5">
            {experience.highlights.map((h, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-slate-700">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>{h}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Skills */}
        <div className="mt-5 pt-4 border-t border-slate-100">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
            Technologies & Tools
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {experience.skills.map((s) => (
              <span
                key={s}
                className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 text-[11px] font-semibold"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
