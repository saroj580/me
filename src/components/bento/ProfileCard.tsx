"use client";

import Image from "next/image";
import { ArrowUpRight, Sparkles } from "lucide-react";

interface ProfileCardProps {
  onBookCall?: () => void;
}

export default function ProfileCard({ onBookCall }: ProfileCardProps) {
  return (
    <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-[0_4px_24px_rgba(0,0,0,0.03)] border border-slate-200/60 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
      {/* Top row: Avatar + Name & Status */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden shrink-0 border-2 border-slate-100 shadow-inner bg-slate-100">
          <Image
            src="/images/avatar.jpg"
            alt="Alex Carter"
            fill
            sizes="96px"
            className="object-cover"
            priority
          />
        </div>

        <div className="flex-1 space-y-1.5">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
              Alex Carter
            </h1>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              OPEN TO WORK
            </span>
          </div>

          <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
            SOFTWARE DEVELOPER &bull; APPLE, MONTREAL
          </p>
        </div>
      </div>

      {/* Bottom row: Call to action + Short bio */}
      <div className="mt-6 pt-5 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <button
          type="button"
          onClick={onBookCall}
          data-cursor-hover
          className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-slate-950 text-white text-sm font-semibold hover:bg-slate-800 active:scale-95 transition-all shadow-sm shrink-0"
        >
          Book a call
        </button>

        <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
          Feel free to explore my portfolio and reach out as a software developer and digital experiences — I&apos;d love to connect!
        </p>
      </div>
    </div>
  );
}
