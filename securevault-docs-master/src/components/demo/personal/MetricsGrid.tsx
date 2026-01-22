// src/components/demo/personal/MetricsGrid.tsx
// Metrics grid component for personal demo

"use client";

import * as React from "react";

export function MetricsGrid({
  items,
}: {
  items: { label: string; value: string; trend?: string }[];
}) {
  return (
    <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
      <div className="mb-4 text-sm font-medium text-white">Metrics</div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {items.map((m, i) => (
          <div key={i} className="rounded-xl bg-blue-600/20 border-2 border-blue-500/50 p-4 hover:bg-blue-600/30 hover:border-blue-500 transition-all duration-300">
            <div className="text-xs text-blue-200 font-medium mb-1">{m.label}</div>
            <div className="text-2xl font-bold text-blue-50">{m.value}</div>
            {m.trend && <div className="text-xs text-blue-300 mt-1">{m.trend}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}

