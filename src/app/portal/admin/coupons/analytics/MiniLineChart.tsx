"use client";

import * as React from "react";

type Point = { x: number; y: number };

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function pathFromPoints(points: Point[]) {
  if (points.length === 0) return "";
  const [first, ...rest] = points;
  return `M ${first.x} ${first.y} ` + rest.map((p) => `L ${p.x} ${p.y}`).join(" ");
}

function formatLabel(d: Date) {
  // short: Dec 13
  return d.toLocaleDateString(undefined, { month: "short", day: "2-digit" });
}

export default function MiniLineChart({
  title,
  seriesA,
  seriesB,
  labels,
  height = 80,
  focusCode,
}: {
  title: string;
  // arrays should be same length as labels
  seriesA: number[];
  seriesB: number[];
  labels: string[];
  height?: number;
  focusCode?: string;
}) {
  const width = 520;
  const pad = 10;

  const maxVal = Math.max(1, ...seriesA, ...seriesB);
  const n = Math.max(labels.length, 2);

  function toPoints(vals: number[]) {
    return vals.map((v, i) => {
      const x = pad + (i * (width - pad * 2)) / (n - 1);
      const y = pad + (1 - v / maxVal) * (height - pad * 2);
      return { x, y };
    });
  }

  const ptsA = toPoints(seriesA);
  const ptsB = toPoints(seriesB);

  const pathA = pathFromPoints(ptsA);
  const pathB = pathFromPoints(ptsB);

  // Tooltip-ish hover: show last point values (simple, "good enough")
  const lastA = seriesA[seriesA.length - 1] ?? 0;
  const lastB = seriesB[seriesB.length - 1] ?? 0;
  const lastLabel = labels[labels.length - 1] ?? "";

  const totalA = seriesA.reduce((s, n) => s + n, 0);
  const totalB = seriesB.reduce((s, n) => s + n, 0);
  const conversion = totalA > 0 ? Math.round((totalB / totalA) * 100) : 0;

  const hotThreshold = 35;
  const coldThreshold = 10;

  const isHot = conversion >= hotThreshold;
  const isCold = totalA > 0 && conversion < coldThreshold && !!focusCode;

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-sm font-semibold text-white">{title}</div>
          <div className="mt-1 text-xs text-white/60">
            Total: Applies {totalA} • Successes {totalB}
            <span className="mx-2">•</span>

            <span className="inline-flex items-center">
              <span className="text-white/60">Conv {conversion}%</span>

              <span className="ml-2 h-5">
                {/* Hot pill */}
                <span
                  className={[
                    "inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-medium transition-opacity",
                    isHot
                      ? "opacity-100 bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                      : "opacity-0 pointer-events-none",
                  ].join(" ")}
                  title={`Hot when ≥ ${hotThreshold}%`}
                >
                  Hot: {conversion}%
                </span>

                {/* Cold pill (gentle) */}
                <a
                  href={`/portal/admin/coupons?edit=${encodeURIComponent(focusCode ?? "")}&suggest=+5`}
                  className={[
                    "ml-2 inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-medium transition-opacity",
                    isCold
                      ? "opacity-100 bg-white/10 text-white/60 border-white/20 hover:bg-white/20"
                      : "opacity-0 pointer-events-none",
                  ].join(" ")}
                  title="Opportunity: tweak offer or placement"
                >
                  Cold: {conversion}%
                </a>
              </span>
            </span>

            <span className="mx-2">•</span>
            Latest ({lastLabel}): Applies {lastA} • Successes {lastB}
          </div>
        </div>

        <div className="text-xs text-white/60">
          Max: <span className="font-medium text-white">{maxVal}</span>
        </div>
      </div>

      <div className="mt-3 w-full">
        <svg
          viewBox={`0 0 ${width} ${height - 15}`}
          className="h-[100px] w-full text-white"
          preserveAspectRatio="none"
          role="img"
          aria-label="Coupon activity chart"
        >
          {/* grid lines */}
          {[0.25, 0.5, 0.75].map((t) => {
            const y = pad + t * (height - 15 - pad * 2);
            return <line key={t} x1={0} x2={width} y1={y} y2={y} stroke="currentColor" opacity="0.1" />;
          })}

          {/* series B (success) */}
          <path d={pathB} fill="none" stroke="#47BD79" opacity="0.6" strokeWidth="2" vectorEffect="non-scaling-stroke" />

          {/* series A (apply) */}
          <path d={pathA} fill="none" stroke="#47BD79" opacity="1" strokeWidth="2" vectorEffect="non-scaling-stroke" />

          {/* last dots */}
          {ptsA.length ? (
            <circle cx={ptsA[ptsA.length - 1].x} cy={ptsA[ptsA.length - 1].y} r="4" fill="#47BD79" />
          ) : null}
          {ptsB.length ? (
            <circle cx={ptsB[ptsB.length - 1].x} cy={ptsB[ptsB.length - 1].y} r="4" fill="#47BD79" opacity="0.6" />
          ) : null}
        </svg>

        {/* x-axis labels outside SVG to prevent stretching */}
        <div className="flex justify-between px-1 mt-1">
          {(() => {
            const idxs = [0, Math.floor((n - 1) / 2), n - 1].map((i) => clamp(i, 0, n - 1));
            const unique = Array.from(new Set(idxs));
            return unique.map((i) => (
              <span key={i} className="text-[10px] text-white/50">
                {labels[i]}
              </span>
            ));
          })()}
        </div>
      </div>

      <div className="mt-2 flex items-center gap-3 text-xs text-white/60">
        <span className="inline-flex items-center gap-2">
          <span className="inline-block h-2 w-2 rounded-full bg-[#47BD79]" />
          Applies
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="inline-block h-2 w-2 rounded-full bg-[#47BD79] opacity-60" />
          Successes
        </span>
      </div>
    </div>
  );
}

