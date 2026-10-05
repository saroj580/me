"use client";

import Image from "next/image";
import { MapPin } from "lucide-react";

export default function MapCard() {
  return (
    <div className="relative h-full min-h-[170px] rounded-3xl overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.03)] border border-slate-200/60 bg-slate-100 group transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
      {/* Background Map Graphic */}
      <Image
        src="/images/map.jpg"
        alt="Montreal City Map"
        fill
        sizes="(max-width: 768px) 100vw, 300px"
        className="object-cover object-center grayscale contrast-125 group-hover:scale-105 transition-transform duration-700"
      />

      {/* Subtle overlay */}
      <div className="absolute inset-0 bg-slate-900/5 group-hover:bg-transparent transition-colors" />

      {/* Floating "Map" pill in top-left */}
      <div className="absolute top-4 left-4 z-10">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/95 backdrop-blur-md text-slate-800 shadow-sm border border-slate-200/50">
          Map
        </span>
      </div>

      {/* Pulsing Pin Marker */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center pointer-events-none">
        <div className="relative flex items-center justify-center">
          <span className="absolute w-8 h-8 rounded-full bg-indigo-500/20 animate-ping" />
          <span className="absolute w-5 h-5 rounded-full bg-indigo-500/40" />
          <div className="w-3.5 h-3.5 rounded-full bg-slate-950 border-2 border-white shadow-md" />
        </div>
        <div className="mt-1 px-2 py-0.5 rounded-md bg-slate-950/80 backdrop-blur-sm text-white text-[10px] font-medium tracking-tight shadow-sm">
          Montreal, QC
        </div>
      </div>
    </div>
  );
}
