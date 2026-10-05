"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { RotateCw, Sparkles, Layers } from "lucide-react";

export default function TechStackCard() {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="relative h-full min-h-[200px] [perspective:1000px] cursor-pointer group"
      onClick={() => setIsFlipped((prev) => !prev)}
      data-cursor-hover
    >
      <motion.div
        className="w-full h-full relative [transform-style:preserve-3d] transition-all duration-500 rounded-3xl"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      >
        {/* ─── FRONT SIDE ─────────────────────────────────────────── */}
        <div className="absolute inset-0 [backface-visibility:hidden] bg-white rounded-3xl p-6 sm:p-7 shadow-[0_4px_24px_rgba(0,0,0,0.03)] border border-slate-200/60 flex flex-col justify-between group-hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-shadow">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold tracking-tight text-slate-900">
              Tech Stack
            </h2>
            <button
              type="button"
              className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
              title="Click to flip card"
              onClick={(e) => {
                e.stopPropagation();
                setIsFlipped((v) => !v);
              }}
            >
              <RotateCw className="w-4 h-4 transition-transform group-hover:rotate-45" />
            </button>
          </div>

          <p className="text-xs text-slate-400 font-medium -mt-2">
            Click to explore full stack
          </p>

          {/* Overlapping Tech Badges as in Screenshot */}
          <div className="flex items-center -space-x-4 py-4 overflow-visible">
            {/* JavaScript Logo */}
            <div className="relative z-10 w-16 h-16 rounded-2xl bg-[#F7DF1E] flex items-center justify-center shadow-md font-black text-black text-2xl select-none transform hover:-translate-y-2 hover:z-50 transition-all duration-300">
              JS
            </div>

            {/* React Logo */}
            <div className="relative z-20 w-16 h-16 rounded-full bg-[#20232A] flex items-center justify-center shadow-lg border-2 border-slate-900 transform hover:-translate-y-2 hover:z-50 transition-all duration-300">
              <svg className="w-10 h-10 text-[#61DAFB] animate-[spin_12s_linear_infinite]" viewBox="0 0 115.3 100">
                <circle cx="57.6" cy="50" r="8.4" fill="currentColor" />
                <g fill="none" stroke="currentColor" strokeWidth="4.2">
                  <ellipse cx="57.6" cy="50" rx="52.5" ry="20.5" />
                  <ellipse cx="57.6" cy="50" rx="52.5" ry="20.5" transform="rotate(60 57.6 50)" />
                  <ellipse cx="57.6" cy="50" rx="52.5" ry="20.5" transform="rotate(120 57.6 50)" />
                </g>
              </svg>
            </div>

            {/* Python Logo */}
            <div className="relative z-30 w-16 h-16 rounded-2xl bg-white border border-slate-200 flex items-center justify-center shadow-lg p-2.5 transform hover:-translate-y-2 hover:z-50 transition-all duration-300">
              <svg className="w-11 h-11" viewBox="0 0 128 128">
                <path fill="#387EB8" d="M63.6 5.8c-15.8 0-26.6 6.8-26.6 20.3v15h27.1v3.8H23.9C10.7 44.9 0 54.3 0 70.8c0 16.5 9 26.3 23.9 26.3h7.9V83.6c0-9.6 8.3-17.7 18.2-17.7h27.1c8 0 14.8-6.6 14.8-14.8V26.1c0-13.5-12.5-20.3-28.3-20.3zm-14.3 9.4c3.4 0 6.2 2.8 6.2 6.2s-2.8 6.2-6.2 6.2-6.2-2.8-6.2-6.2 2.8-6.2 6.2-6.2z" />
                <path fill="#FFE052" d="M64.4 122.2c15.8 0 26.6-6.8 26.6-20.3v-15H63.9v-3.8h40.2c13.2 0 23.9-9.4 23.9-25.9 0-16.5-9-26.3-23.9-26.3h-7.9v13.5c0 9.6-8.3 17.7-18.2 17.7H50.9c-8 0-14.8 6.6-14.8 14.8v24.9c0 13.5 12.5 20.3 28.3 20.3zm14.3-9.4c-3.4 0-6.2-2.8-6.2-6.2s2.8-6.2 6.2-6.2 6.2 2.8 6.2 6.2-2.8 6.2-6.2 6.2z" />
              </svg>
            </div>

            {/* Docker Logo */}
            <div className="relative z-40 w-16 h-16 rounded-2xl bg-[#0db7ed] flex items-center justify-center shadow-lg transform hover:-translate-y-2 hover:z-50 transition-all duration-300">
              <svg className="w-10 h-10 text-white fill-current" viewBox="0 0 24 24">
                <path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185zm0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.186.185.186zm-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.186.185.186zm-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.186.186.186zm5.893 2.714h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.186.186 0 00-.185.185v1.888c0 .102.082.185.185.185zm-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186H8.1a.185.185 0 00-.185.186v1.888c0 .102.083.185.185.185zm-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.185-.186H5.136a.186.186 0 00-.186.186v1.888c0 .102.084.185.186.185zm-2.928 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.185-.186H2.208a.185.185 0 00-.185.186v1.888c0 .102.082.185.185.185m21.758-1.503c-.27-.193-.822-.387-1.644-.24-.26-.816-.838-1.428-1.523-1.745-.333-.153-.787-.22-1.332-.2-.047-.563-.264-1.408-.857-2.09-.768-.885-1.92-1.378-3.33-1.424l-.382-.012-.224.31c-.604.834-.848 1.963-.687 3.167-.54.24-1.077.585-1.58 1.03-.35-.26-.74-.46-1.157-.59-.012-.004-.025-.008-.037-.012V7.12a.185.185 0 00-.185-.185H13.98a.185.185 0 00-.185.185v3.774H.186A.186.186 0 000 11.08c0 .878.077 1.83.25 2.766.72 3.86 3.01 6.94 6.8 9.17 2.19 1.29 4.7 1.94 7.45 1.94 2.87 0 5.48-.68 7.78-2.02 3.49-2.04 5.56-4.99 6.16-8.77.1-.64.15-1.3.15-1.96 0-.3-.02-.6-.05-.89-.1-.8-.4-1.5-.8-2.1" />
              </svg>
            </div>
          </div>
        </div>

        {/* ─── BACK SIDE ──────────────────────────────────────────── */}
        <div className="absolute inset-0 [transform:rotateY(180deg)] [backface-visibility:hidden] bg-slate-950 text-white rounded-3xl p-6 sm:p-7 shadow-xl border border-slate-800 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-400" />
              <h3 className="font-bold text-sm tracking-wide">Skills & Proficiencies</h3>
            </div>
            <button
              type="button"
              className="p-1 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                setIsFlipped(false);
              }}
            >
              <RotateCw className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs py-2">
            {[
              "Next.js / React 19",
              "TypeScript / Node",
              "Tailwind / CSS3",
              "PostgreSQL / Prisma",
              "Docker / Cloud",
              "GraphQL / REST",
            ].map((skill) => (
              <div
                key={skill}
                className="px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 font-medium"
              >
                {skill}
              </div>
            ))}
          </div>

          <p className="text-[11px] text-slate-400 text-center">
            Click to flip back
          </p>
        </div>
      </motion.div>
    </div>
  );
}
