"use client";

import { useState } from "react";
import ExperienceModal, { type ExperienceDetail } from "@/components/shared/ExperienceModal";
import { ChevronRight } from "lucide-react";

const EXPERIENCES: ExperienceDetail[] = [
  {
    role: "Backend-Developer",
    company: "Drongo AI",
    year: "2026",
    mode: "On-Site",
    type: "Full-Time",
    location: "Bengaluru, India",
    summary:
      "Contributed to developer platform tooling, cloud console UX enhancements, and API integration testing.",
    highlights: [
      "Delivered interactive cloud performance dashboards used by 50,000+ developers.",
      "Built automated integration test suites increasing CI pipeline reliability to 99.4%.",
    ],
    skills: ["Go", "Python", "GCP", "Angular", "Docker", "PostgreSQL"],
  },
];

export default function ExperienceCard() {
  const [selectedExp, setSelectedExp] = useState<ExperienceDetail | null>(null);

  return (
    <>
      <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-[0_4px_24px_rgba(0,0,0,0.03)] border border-slate-200/60 flex flex-col justify-between h-full transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold tracking-tight text-slate-900">
              My Experience
            </h2>
            <span className="text-[11px] font-medium text-slate-400">
              Click role for details
            </span>
          </div>

          {/* Timeline */}
          <div className="relative pl-6 space-y-5 before:absolute before:left-2 before:top-2 before:bottom-3 before:w-0.5 before:bg-slate-200">
            {EXPERIENCES.map((exp, index) => (
              <div
                key={index}
                onClick={() => setSelectedExp(exp)}
                data-cursor-hover
                className="relative group cursor-pointer p-2 -ml-2 rounded-xl hover:bg-slate-50 transition-colors"
              >
                {/* Dot */}
                <span className="absolute -left-4 top-3.5 w-3 h-3 rounded-full bg-slate-900 ring-4 ring-white group-hover:scale-125 group-hover:bg-indigo-600 transition-all" />

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold text-slate-900 text-sm leading-snug group-hover:text-indigo-600 transition-colors">
                      {exp.role} at {exp.company}{" "}
                      <span className="text-slate-400 font-normal">&mdash; {exp.year}</span>
                    </p>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">
                      {exp.mode} &bull; {exp.type}
                    </p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-700 group-hover:translate-x-0.5 transition-all shrink-0" />
                </div>
              </div>
            ))}

            {/* Subtext info */}
            <div className="relative pl-2 pt-1">
              <span className="absolute -left-4 top-2.5 w-2 h-2 rounded-full bg-slate-400 ring-4 ring-white" />
              <p className="text-xs text-slate-400 italic">
                (Updated text/dates)
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Experience Details Modal */}
      <ExperienceModal
        isOpen={Boolean(selectedExp)}
        onClose={() => setSelectedExp(null)}
        experience={selectedExp}
      />
    </>
  );
}
