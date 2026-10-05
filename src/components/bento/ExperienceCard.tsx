"use client";

interface ExperienceItem {
  role: string;
  company: string;
  year: string;
  mode: string;
  type: string;
}

const EXPERIENCES: ExperienceItem[] = [
  {
    role: "Tech Lead",
    company: "Apple",
    year: "2026",
    mode: "Remote",
    type: "Full time",
  },
  {
    role: "Senior Software Engineer",
    company: "Meta",
    year: "2024",
    mode: "On-site",
    type: "Full time",
  },
  {
    role: "Full-stack Engineer",
    company: "Google",
    year: "2023",
    mode: "Hybrid",
    type: "Part time",
  },
];

export default function ExperienceCard() {
  return (
    <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-[0_4px_24px_rgba(0,0,0,0.03)] border border-slate-200/60 flex flex-col justify-between h-full transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
      <div>
        <h2 className="text-xl font-bold tracking-tight text-slate-900 mb-6">
          My Experience
        </h2>

        {/* Timeline */}
        <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-3 before:w-0.5 before:bg-slate-200">
          {EXPERIENCES.map((exp, index) => (
            <div key={index} className="relative group">
              {/* Dot */}
              <span className="absolute -left-6 top-1.5 w-3 h-3 rounded-full bg-slate-900 ring-4 ring-white group-hover:scale-125 transition-transform" />

              <div>
                <p className="font-bold text-slate-900 text-sm leading-snug">
                  {exp.role} at {exp.company}{" "}
                  <span className="text-slate-400 font-normal">&mdash; {exp.year}</span>
                </p>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  {exp.mode} &bull; {exp.type}
                </p>
              </div>
            </div>
          ))}

          {/* Subtext info */}
          <div className="relative group pt-1">
            <span className="absolute -left-6 top-2.5 w-2 h-2 rounded-full bg-slate-400 ring-4 ring-white" />
            <p className="text-xs text-slate-400 italic">
              (Updated text/dates)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
