"use client";

import { useMemo, useState } from "react";
import { GitCommit, ExternalLink } from "lucide-react";

// Generate mock contribution grid with realistic distribution
function generateContributions() {
  const weeks = 36; // 36 columns fits beautifully into bento card
  const days = 7;
  const grid: number[][] = [];

  // Deterministic seed pattern for consistent SSR & client hydration
  let seed = 42;
  const pseudoRandom = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };

  for (let w = 0; w < weeks; w++) {
    const week: number[] = [];
    for (let d = 0; d < days; d++) {
      const r = pseudoRandom();
      if (r > 0.72) week.push(4); // high activity
      else if (r > 0.5) week.push(3);
      else if (r > 0.3) week.push(2);
      else if (r > 0.15) week.push(1);
      else week.push(0); // none
    }
    grid.push(week);
  }
  return grid;
}

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan"
];

// GitHub color levels
const LEVEL_COLORS = [
  "bg-slate-100 border-slate-200/50", // 0
  "bg-[#9be9a8] border-[#7cd089]",     // 1
  "bg-[#40c463] border-[#34aa54]",     // 2
  "bg-[#30a14e] border-[#25853f]",     // 3
  "bg-[#216e39] border-[#18532b]",     // 4
];

export default function GitHubCard() {
  const grid = useMemo(() => generateContributions(), []);
  const [hoveredCell, setHoveredCell] = useState<{
    week: number;
    day: number;
    level: number;
  } | null>(null);

  return (
    <div
      id="github-activity"
      className="bg-white rounded-3xl p-6 sm:p-7 shadow-[0_4px_24px_rgba(0,0,0,0.03)] border border-slate-200/60 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)]"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900">
            GitHub Activity
          </h2>
          <p className="text-xs font-semibold text-slate-400">
            Your Contributions
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span>Last chart/dates</span>
          <a
            href="https://github.com/saroj580"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor-hover
            className="text-slate-500 hover:text-slate-900 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Heatmap container */}
      <div className="overflow-x-auto pb-2 -mx-2 px-2 scrollbar-none">
        {/* Month labels */}
        <div className="flex justify-between text-[10px] text-slate-400 font-medium pl-6 pr-2 mb-1.5 min-w-[540px]">
          {MONTHS.map((m, i) => (
            <span key={i}>{m}</span>
          ))}
        </div>

        {/* Heatmap Grid + Day labels */}
        <div className="flex items-start gap-2 min-w-[540px]">
          {/* Day of week labels */}
          <div className="flex flex-col justify-between text-[9px] text-slate-400 font-medium h-[88px] shrink-0 pt-0.5">
            <span>Mon</span>
            <span>Wed</span>
            <span>Fri</span>
          </div>

          {/* Grid columns */}
          <div className="flex items-center gap-1.5 flex-1">
            {grid.map((week, wIdx) => (
              <div key={wIdx} className="flex flex-col gap-1.5">
                {week.map((level, dIdx) => (
                  <div
                    key={dIdx}
                    onMouseEnter={() => setHoveredCell({ week: wIdx, day: dIdx, level })}
                    onMouseLeave={() => setHoveredCell(null)}
                    className={`w-2.5 h-2.5 rounded-[3px] border transition-transform duration-150 hover:scale-125 ${LEVEL_COLORS[level]}`}
                    title={`Activity level: ${level}`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Info / Legend */}
      <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-[11px] text-slate-400">
        <span className="font-mono">892 contributions in 2026</span>

        <div className="flex items-center gap-1.5">
          <span>Less</span>
          {LEVEL_COLORS.map((color, i) => (
            <span key={i} className={`w-2.5 h-2.5 rounded-[3px] border ${color}`} />
          ))}
          <span>More</span>
        </div>
      </div>
    </div>
  );
}
