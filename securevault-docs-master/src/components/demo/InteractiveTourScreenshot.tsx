// src/components/demo/InteractiveTourScreenshot.tsx
// Screenshot mockup of interactive tour interface

"use client";

import React from "react";

export function InteractiveTourScreenshot() {
  return (
    <div className="rounded-2xl border border-white/10 p-4 bg-white/5">
      <div className="rounded-xl bg-zinc-900 p-4 shadow-2xl overflow-hidden relative border border-zinc-800">
        {/* Browser chrome */}
        <div className="flex items-center gap-2 mb-3 pb-2 border-b border-zinc-800">
          <div className="flex gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-red-500/70"></div>
            <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/70"></div>
            <div className="h-2.5 w-2.5 rounded-full bg-green-500/70"></div>
          </div>
          <div className="flex-1 h-1.5 rounded bg-zinc-800 ml-2"></div>
        </div>

        {/* Screenshot mockup - Interactive Tour Interface */}
        <div className="space-y-3 relative">
          {/* App header */}
          <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded bg-[#3b82f6] flex items-center justify-center">
                <span className="text-[8px] font-bold text-black">SVD</span>
              </div>
              <div className="h-3 w-24 rounded bg-zinc-800"></div>
            </div>
            <div className="h-6 w-16 rounded bg-blue-600/40"></div>
          </div>

          {/* Tour sidebar */}
          <div className="flex gap-3">
            <div className="w-1/3 space-y-2">
              <div className="h-4 w-full rounded bg-blue-600/30 border border-blue-500/40"></div>
              <div className="h-3 w-full rounded bg-zinc-800"></div>
              <div className="h-3 w-full rounded bg-zinc-800"></div>
              <div className="h-3 w-4/5 rounded bg-zinc-800"></div>
            </div>

            {/* Main content area with highlighted step */}
            <div className="flex-1 space-y-2">
              <div className="rounded-lg border-2 border-blue-500/60 bg-blue-500/10 p-3 space-y-2 relative">
                <div className="absolute -top-2 left-3 bg-blue-500 text-black text-[10px] px-2 py-0.5 rounded">
                  Step 2: Create Share Link
                </div>
                <div className="h-3 w-32 rounded bg-blue-400/30 mt-2"></div>
                <div className="h-2 w-full rounded bg-blue-400/20"></div>
                <div className="h-2 w-3/4 rounded bg-blue-400/20"></div>
                <div className="flex gap-2 mt-2">
                  <div className="h-5 w-16 rounded bg-blue-600/40"></div>
                  <div className="h-5 w-16 rounded bg-zinc-800"></div>
                </div>
              </div>

              <div className="rounded-lg border border-zinc-800 bg-zinc-950/50 p-2 space-y-1.5">
                <div className="h-2.5 w-24 rounded bg-zinc-800"></div>
                <div className="h-2 w-full rounded bg-zinc-800/50"></div>
                <div className="h-2 w-2/3 rounded bg-zinc-800/50"></div>
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="flex items-center gap-2 pt-2 border-t border-zinc-800">
            <div className="h-1.5 w-1.5 rounded-full bg-blue-500"></div>
            <div className="flex-1 h-1 rounded-full bg-zinc-800">
              <div className="h-1 rounded-full bg-blue-500 w-1/3"></div>
            </div>
            <div className="text-[10px] text-zinc-500">2/6</div>
          </div>

          {/* Tooltip arrow pointing to active step */}
          <div className="absolute top-16 right-8 w-0 h-0 border-l-[8px] border-l-blue-500 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent"></div>
        </div>
      </div>
    </div>
  );
}

