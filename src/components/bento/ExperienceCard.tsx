"use client";

import { useState } from "react";
import { useModal } from "@/contexts/ModalContext";
import { EXPERIENCES } from "@/data/experiences";
import { ChevronRight, Sparkles } from "lucide-react";
import ExperienceModal, { type ExperienceDetail } from "@/components/shared/ExperienceModal";

export default function ExperienceCard() {
  const { openExperience } = useModal();
  const [localOpen, setLocalOpen] = useState(false);
  const [selectedExp, setSelectedExp] = useState<ExperienceDetail | null>(null);

  const handleOpen = (exp?: ExperienceDetail) => {
    console.log("[ExperienceCard] Clicked! Triggering experience modal...", exp);
    setSelectedExp(exp || EXPERIENCES[0]);
    setLocalOpen(true);
    if (openExperience) {
      openExperience(exp || EXPERIENCES[0]);
    }
  };

  return (
    <>
      <div
        onClick={() => handleOpen()}
        data-cursor-hover
        className="bg-white rounded-3xl p-6 sm:p-7 shadow-[0_4px_24px_rgba(0,0,0,0.03)] border border-slate-200/60 flex flex-col justify-between h-full transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:border-slate-300 cursor-pointer group select-none"
      >
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors">
              My Experience
            </h2>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleOpen();
              }}
              data-cursor-hover
              className="text-[11px] font-semibold text-indigo-600 hover:text-indigo-700 bg-indigo-50 hover:bg-indigo-100 px-3 py-1 rounded-full transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span>View details</span>
              <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Timeline */}
          <div className="relative pl-6 space-y-4 before:absolute before:left-2 before:top-2 before:bottom-3 before:w-0.5 before:bg-slate-200">
            {EXPERIENCES.map((exp, index) => (
              <div
                key={exp.id || index}
                onClick={(e) => {
                  e.stopPropagation();
                  handleOpen(exp);
                }}
                data-cursor-hover
                className="relative group/item cursor-pointer p-2.5 -ml-2 rounded-xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-200/60"
              >
                {/* Dot */}
                <span className="absolute -left-4 top-4 w-3 h-3 rounded-full bg-slate-900 ring-4 ring-white group-hover/item:scale-125 group-hover/item:bg-indigo-600 transition-all" />

                <div className="flex items-center justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <p className="font-bold text-slate-900 text-sm leading-snug group-hover/item:text-indigo-600 transition-colors">
                        {exp.role} at {exp.company}
                      </p>
                      {exp.isCurrent !== false && (
                        <span
                          className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"
                          title="Active role"
                        />
                      )}
                    </div>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">
                      {exp.year} &bull; {exp.mode} &bull; {exp.type}
                    </p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-300 group-hover/item:text-slate-700 group-hover/item:translate-x-0.5 transition-all shrink-0" />
                </div>
              </div>
            ))}

            {/* Subtext info for future milestones */}
            <div className="relative pl-2 pt-2">
              <span className="absolute -left-4 top-3.5 w-2 h-2 rounded-full bg-slate-300 ring-4 ring-white" />
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <Sparkles className="w-3 h-3 text-slate-400" />
                <span>Future milestones will be updated here</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Local fallback modal */}
      {localOpen && (
        <ExperienceModal
          isOpen={localOpen}
          onClose={() => setLocalOpen(false)}
          experience={selectedExp}
        />
      )}
    </>
  );
}
