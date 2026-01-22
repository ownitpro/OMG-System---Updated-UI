// src/app/demo/business/analytics/page.tsx
// Analytics page with dynamic charts

'use client';

import * as React from 'react';

function series(n = 14, base = 10) {
  const now = Date.now();
  return Array.from({ length: n }).map((_, i) => ({
    t: new Date(now - (n - 1 - i) * 86400000).toISOString().slice(0, 10),
    v: Math.max(0, Math.round(base + (Math.random() - 0.5) * base)),
  }));
}

// Area chart with gradient fill and day labels
function AreaChart({ data, color = 'emerald' }: { data: Array<{ t: string; v: number }>; color?: string }) {
  if (data.length === 0) return null;
  const max = Math.max(...data.map((d) => d.v));
  const points = data.map((p, i) => {
    const x = (i / (data.length - 1)) * 600;
    const y = 200 - (p.v / max) * 180 - 10;
    return `${x},${y}`;
  });
  const areaPoints = `${points[0].split(',')[0]},200 ${points.join(' ')} ${points[points.length - 1].split(',')[0]},200`;
  const colorClass = color === 'emerald' ? 'text-blue-500' : color === 'blue' ? 'text-blue-500' : 'text-purple-500';
  const fillColor = color === 'emerald' ? 'rgba(16,185,129,0.2)' : color === 'blue' ? 'rgba(59,130,246,0.2)' : 'rgba(168,85,247,0.2)';
  
  return (
    <div>
      <svg viewBox="0 0 600 200" className="w-full h-64">
        <defs>
          <linearGradient id={`gradient-${color}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={fillColor.replace('0.2', '0.4')} />
            <stop offset="100%" stopColor={fillColor} />
          </linearGradient>
        </defs>
        <polygon points={areaPoints} fill={`url(#gradient-${color})`} />
        <polyline
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          className={colorClass}
          points={points.join(' ')}
        />
        {data.map((p, i) => {
          const x = (i / (data.length - 1)) * 600;
          const y = 200 - (p.v / max) * 180 - 10;
          return <circle key={i} cx={x} cy={y} r={4} fill="currentColor" className={colorClass} />;
        })}
      </svg>
      {/* Day labels */}
      <div className="flex justify-between mt-2 px-2">
        {data.map((_, i) => (
          <span key={i} className="text-[10px] text-zinc-500 font-medium">
            {i + 1}
          </span>
        ))}
      </div>
    </div>
  );
}

// Bar chart with day labels
function BarChart({ data, color = 'emerald' }: { data: Array<{ t: string; v: number }>; color?: string }) {
  if (data.length === 0) return null;
  const max = Math.max(...data.map((d) => d.v));
  const colorClass = color === 'emerald' ? 'fill-blue-500' : color === 'blue' ? 'fill-blue-500' : 'fill-purple-500';
  
  return (
    <div>
      <svg viewBox="0 0 600 200" className="w-full h-64">
        {data.map((p, i) => {
          const barWidth = 560 / data.length;
          const x = 20 + i * (barWidth + 2);
          const height = (p.v / max) * 170;
          const y = 190 - height;
          return (
            <rect
              key={i}
              x={x}
              y={y}
              width={barWidth}
              height={height}
              rx={3}
              className={colorClass}
              opacity={0.8}
            />
          );
        })}
      </svg>
      {/* Day labels */}
      <div className="flex justify-between mt-2 px-2">
        {data.map((_, i) => (
          <span key={i} className="text-[10px] text-zinc-500 font-medium">
            {i + 1}
          </span>
        ))}
      </div>
    </div>
  );
}

// Donut chart (kept same size but in larger container)
function DonutChart({ value, max, color = 'emerald' }: { value: number; max: number; color?: string }) {
  const percentage = Math.min(100, Math.round((value / max) * 100));
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;
  const colorClass = color === 'emerald' ? 'stroke-blue-500' : color === 'blue' ? 'stroke-blue-500' : 'stroke-purple-500';
  
  return (
    <div className="relative w-64 h-64 mx-auto">
      <svg viewBox="0 0 150 150" className="w-full h-full transform -rotate-90">
        <circle
          cx="75"
          cy="75"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="10"
          className="text-zinc-800"
        />
        <circle
          cx="75"
          cy="75"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="10"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className={colorClass}
          style={{ transition: 'stroke-dashoffset 0.5s ease' }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl font-bold text-zinc-100">{percentage}%</div>
          <div className="text-sm text-zinc-400">used</div>
        </div>
      </div>
    </div>
  );
}

export default function AnalyticsPage() {
  const [uploads, setUploads] = React.useState<Array<{ t: string; v: number }>>([]);
  const [ocr, setOcr] = React.useState<Array<{ t: string; v: number }>>([]);
  const [egress, setEgress] = React.useState<Array<{ t: string; v: number }>>([]);

  React.useEffect(() => {
    setUploads(series(14, 22));
    setOcr(series(14, 85));
    setEgress(series(14, 3));
  }, []);

  const totalUploads = uploads.reduce((a, b) => a + b.v, 0);
  const totalOcr = ocr.reduce((a, b) => a + b.v, 0);
  const totalEgress = egress.reduce((a, b) => a + b.v, 0);
  const avgUploads = uploads.length > 0 ? Math.round(totalUploads / uploads.length) : 0;
  const avgOcr = ocr.length > 0 ? Math.round(totalOcr / ocr.length) : 0;
  const avgEgress = egress.length > 0 ? Math.round((totalEgress / egress.length) * 10) / 10 : 0;

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold text-zinc-100">Analytics</h1>
      <div className="grid md:grid-cols-3 gap-6">
        {/* Uploads - Area Chart */}
        <div className="rounded-2xl border border-zinc-800 p-8 bg-zinc-900 hover:border-blue-500/50 transition-all">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-base font-medium text-zinc-100">Uploads/day</div>
              <div className="text-sm text-zinc-400">Last 14 days</div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-blue-400">{avgUploads}</div>
              <div className="text-sm text-zinc-400">avg/day</div>
            </div>
          </div>
          {uploads.length > 0 ? (
            <>
              <AreaChart data={uploads} color="emerald" />
              <div className="mt-4 flex items-center justify-between text-sm">
                <span className="text-zinc-400">Total: {totalUploads} files</span>
                <span className="text-blue-400 font-medium">+12% vs last period</span>
              </div>
            </>
          ) : (
            <div className="h-64 flex items-center justify-center text-sm text-zinc-400">Loading...</div>
          )}
        </div>

        {/* OCR Pages - Bar Chart */}
        <div className="rounded-2xl border border-zinc-800 p-8 bg-zinc-900 hover:border-blue-500/50 transition-all">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-base font-medium text-zinc-100">OCR pages</div>
              <div className="text-sm text-zinc-400">Last 14 days</div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-blue-400">{avgOcr}</div>
              <div className="text-sm text-zinc-400">avg/day</div>
            </div>
          </div>
          {ocr.length > 0 ? (
            <>
              <BarChart data={ocr} color="blue" />
              <div className="mt-4 flex items-center justify-between text-sm">
                <span className="text-zinc-400">Total: {totalOcr.toLocaleString()} pages</span>
                <span className="text-blue-400 font-medium">+7% vs last period</span>
              </div>
            </>
          ) : (
            <div className="h-64 flex items-center justify-center text-sm text-zinc-400">Loading...</div>
          )}
        </div>

        {/* Egress - Donut Chart */}
        <div className="rounded-2xl border border-zinc-800 p-8 bg-zinc-900 hover:border-purple-500/50 transition-all">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-base font-medium text-zinc-100">Data Transfer</div>
              <div className="text-sm text-zinc-400">Last 14 days</div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-purple-400">{avgEgress}</div>
              <div className="text-sm text-zinc-400">GB/day</div>
            </div>
          </div>
          {egress.length > 0 ? (
            <>
              <DonutChart value={totalEgress} max={50} color="purple" />
              <div className="mt-4 flex items-center justify-between text-sm">
                <span className="text-zinc-400">Total: {totalEgress.toFixed(1)} GB</span>
                <span className="text-purple-400 font-medium">-4% vs last period</span>
              </div>
            </>
          ) : (
            <div className="h-64 flex items-center justify-center text-sm text-zinc-400">Loading...</div>
          )}
        </div>
      </div>
    </div>
  );
}
