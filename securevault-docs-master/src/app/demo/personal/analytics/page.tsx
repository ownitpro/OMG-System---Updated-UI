// src/app/demo/personal/analytics/page.tsx
// Personal analytics page with dynamic charts

'use client';

import * as React from 'react';

function generateMonthData(base: number) {
  const days = 30;
  return Array.from({ length: days }).map((_, i) => ({
    day: i + 1,
    value: Math.max(0, Math.round(base + (Math.random() - 0.5) * base * 0.5)),
  }));
}

function LineChart({ data, color = 'emerald' }: { data: Array<{ day: number; value: number }>; color?: string }) {
  if (data.length === 0) return null;
  const max = Math.max(...data.map((d) => d.value));
  const colorClass = color === 'emerald' ? 'text-blue-500' : color === 'blue' ? 'text-blue-500' : color === 'purple' ? 'text-purple-500' : 'text-orange-500';
  const fillColor = color === 'emerald' ? 'rgba(16,185,129,0.2)' : color === 'blue' ? 'rgba(59,130,246,0.2)' : color === 'purple' ? 'rgba(168,85,247,0.2)' : 'rgba(249,115,22,0.2)';
  
  return (
    <div>
      <svg viewBox="0 0 400 150" className="w-full h-48">
        <defs>
          <linearGradient id={`gradient-${color}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={fillColor.replace('0.2', '0.4')} />
            <stop offset="100%" stopColor={fillColor} />
          </linearGradient>
        </defs>
        <polygon
          points={`0,150 ${data.map((p, i) => `${(i / (data.length - 1)) * 400},${150 - (p.value / max) * 130 - 10}`).join(' ')} 400,150`}
          fill={`url(#gradient-${color})`}
        />
        <polyline
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={colorClass}
          points={data.map((p, i) => `${(i / (data.length - 1)) * 400},${150 - (p.value / max) * 130 - 10}`).join(' ')}
        />
        {data.map((p, i) => {
          const x = (i / (data.length - 1)) * 400;
          const y = 150 - (p.value / max) * 130 - 10;
          return <circle key={i} cx={x} cy={y} r={3} fill="currentColor" className={colorClass} />;
        })}
      </svg>
    </div>
  );
}

function BarChart({ data, color = 'emerald' }: { data: Array<{ day: number; value: number }>; color?: string }) {
  if (data.length === 0) return null;
  const max = Math.max(...data.map((d) => d.value));
  const colorClass = color === 'emerald' ? 'fill-blue-500' : color === 'blue' ? 'fill-blue-500' : color === 'purple' ? 'fill-purple-500' : 'fill-orange-500';
  
  return (
    <svg viewBox="0 0 400 150" className="w-full h-48">
      {data.map((p, i) => {
        const barWidth = 380 / data.length;
        const x = 10 + i * (barWidth + 1);
        const height = (p.value / max) * 130;
        const y = 140 - height;
        return (
          <rect
            key={i}
            x={x}
            y={y}
            width={barWidth}
            height={height}
            rx={2}
            className={colorClass}
            opacity={0.8}
          />
        );
      })}
    </svg>
  );
}

function AreaChart({ data, color = 'emerald' }: { data: Array<{ day: number; value: number }>; color?: string }) {
  if (data.length === 0) return null;
  const max = Math.max(...data.map((d) => d.value));
  const colorClass = color === 'emerald' ? 'text-blue-500' : color === 'blue' ? 'text-blue-500' : color === 'purple' ? 'text-purple-500' : 'text-orange-500';
  const fillColor = color === 'emerald' ? 'rgba(16,185,129,0.2)' : color === 'blue' ? 'rgba(59,130,246,0.2)' : color === 'purple' ? 'rgba(168,85,247,0.2)' : 'rgba(249,115,22,0.2)';
  
  const points = data.map((p, i) => `${(i / (data.length - 1)) * 400},${150 - (p.value / max) * 130 - 10}`);
  const areaPoints = `0,150 ${points.join(' ')} 400,150`;
  
  return (
    <svg viewBox="0 0 400 150" className="w-full h-48">
      <defs>
        <linearGradient id={`area-${color}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={fillColor.replace('0.2', '0.4')} />
          <stop offset="100%" stopColor={fillColor} />
        </linearGradient>
      </defs>
      <polygon points={areaPoints} fill={`url(#area-${color})`} />
      <polyline
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className={colorClass}
        points={points.join(' ')}
      />
    </svg>
  );
}

function DonutChart({ value, max, color = 'emerald' }: { value: number; max: number; color?: string }) {
  const percentage = Math.min(100, Math.round((value / max) * 100));
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;
  const colorClass = color === 'emerald' ? 'stroke-blue-500' : color === 'blue' ? 'stroke-blue-500' : color === 'purple' ? 'stroke-purple-500' : 'stroke-orange-500';
  
  return (
    <div className="relative w-40 h-40 mx-auto">
      <svg viewBox="0 0 120 120" className="w-full h-full transform -rotate-90">
        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="10"
          className="text-white/10"
        />
        <circle
          cx="60"
          cy="60"
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
          <div className="text-3xl font-bold text-white">{percentage}%</div>
          <div className="text-xs text-white/60">used</div>
        </div>
      </div>
    </div>
  );
}

export default function AnalyticsPage() {
  const [uploads, setUploads] = React.useState<Array<{ day: number; value: number }>>([]);
  const [ocr, setOcr] = React.useState<Array<{ day: number; value: number }>>([]);
  const [storage, setStorage] = React.useState(320);
  const [shares, setShares] = React.useState(2);

  React.useEffect(() => {
    setUploads(generateMonthData(5));
    setOcr(generateMonthData(15));
  }, []);

  const avgUploads = uploads.length > 0 ? Math.round(uploads.reduce((a, b) => a + b.value, 0) / uploads.length) : 0;
  const avgOcr = ocr.length > 0 ? Math.round(ocr.reduce((a, b) => a + b.value, 0) / ocr.length) : 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Analytics</h1>
        <p className="text-base text-white/60 mt-1">Usage metrics and trends (Last 30 days)</p>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-base font-medium text-white">Uploads / day</div>
              <div className="text-xs text-white/60">Last 30 days</div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-400">{avgUploads}</div>
              <div className="text-xs text-white/60">avg/day</div>
            </div>
          </div>
          {uploads.length > 0 && <LineChart data={uploads} color="emerald" />}
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-base font-medium text-white">OCR pages / day</div>
              <div className="text-xs text-white/60">Last 30 days</div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-400">{avgOcr}</div>
              <div className="text-xs text-white/60">avg/day</div>
            </div>
          </div>
          {ocr.length > 0 && <BarChart data={ocr} color="blue" />}
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-base font-medium text-white">Storage used</div>
              <div className="text-xs text-white/60">Current usage</div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-purple-400">{storage} MB</div>
              <div className="text-xs text-white/60">of 500 MB</div>
            </div>
          </div>
          <DonutChart value={storage} max={500} color="purple" />
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-base font-medium text-white">Active shares</div>
              <div className="text-xs text-white/60">Current count</div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-orange-400">{shares}</div>
              <div className="text-xs text-white/60">of 10</div>
            </div>
          </div>
          <AreaChart data={Array.from({ length: 30 }, (_, i) => ({ day: i + 1, value: shares + Math.floor(Math.random() * 2) }))} color="orange" />
        </div>
      </div>
    </div>
  );
}

