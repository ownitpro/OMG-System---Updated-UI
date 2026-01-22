'use client';

import { useMemo, useState, useEffect } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';

// Chart color palette
const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

interface UploadActivityChartProps {
  data: Array<{ label: string; uploads: number }>;
  isDarkMode: boolean;
}

export function UploadActivityChart({ data, isDarkMode }: UploadActivityChartProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Calculate Y-axis max for better scaling when uploads are low
  const yAxisMax = useMemo(() => {
    const maxUploads = Math.max(...data.map(d => d.uploads), 0);
    // Ensure minimum scale of 5 for visibility, otherwise scale based on data
    if (maxUploads === 0) return 5;
    if (maxUploads <= 5) return Math.max(maxUploads * 2, 5);
    return Math.ceil(maxUploads * 1.2);
  }, [data]);

  // Calculate tick interval based on data length
  const tickInterval = data.length > 12 ? Math.floor(data.length / 6) : 0;

  // Don't render until mounted (client-side only)
  if (!mounted) {
    return (
      <div className="h-[250px] animate-pulse bg-slate-700/30 rounded-xl" />
    );
  }

  // Don't render if no data
  if (!data || data.length === 0) {
    return (
      <div className="h-[250px] flex items-center justify-center text-slate-500">
        No data available
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={250}>
      <AreaChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 20 }}>
        <defs>
          <linearGradient id="uploadGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3b82f6" stopOpacity={isDarkMode ? 0.4 : 0.3}/>
            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#334155' : '#e5e7eb'} vertical={false} />
        <XAxis
          dataKey="label"
          stroke={isDarkMode ? '#64748b' : '#9ca3af'}
          fontSize={11}
          tickLine={false}
          axisLine={false}
          interval={tickInterval}
          dy={10}
        />
        <YAxis
          stroke={isDarkMode ? '#64748b' : '#9ca3af'}
          fontSize={11}
          tickLine={false}
          axisLine={false}
          width={30}
          domain={[0, yAxisMax]}
          allowDecimals={false}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: isDarkMode ? 'rgba(30,41,59,0.95)' : 'rgba(255,255,255,0.95)',
            border: 'none',
            borderRadius: '12px',
            boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
            color: isDarkMode ? '#fff' : '#000'
          }}
          formatter={(value: number) => [`${value} upload${value !== 1 ? 's' : ''}`, 'Activity']}
          labelStyle={{ color: isDarkMode ? '#94a3b8' : '#64748b', marginBottom: 4 }}
        />
        <Area
          type="monotone"
          dataKey="uploads"
          stroke="#3b82f6"
          strokeWidth={2}
          fill="url(#uploadGradient)"
          dot={{ r: 3, fill: '#3b82f6', strokeWidth: 0 }}
          activeDot={{ r: 6, fill: '#3b82f6', stroke: isDarkMode ? '#1e293b' : '#fff', strokeWidth: 2 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

interface FileTypeChartProps {
  data: Array<{ name: string; value: number }>;
  isDarkMode: boolean;
}

export function FileTypeChart({ data, isDarkMode }: FileTypeChartProps) {
  return (
    <ResponsiveContainer width={200} height={200}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={50}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            backgroundColor: isDarkMode ? 'rgba(30,41,59,0.95)' : 'rgba(255,255,255,0.95)',
            border: 'none',
            borderRadius: '12px',
            boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
            color: isDarkMode ? '#fff' : '#000'
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}

interface FileTypeLegendProps {
  data: Array<{ name: string; value: number }>;
  isDarkMode: boolean;
}

export function FileTypeLegend({ data, isDarkMode }: FileTypeLegendProps) {
  const theme = {
    text: isDarkMode ? 'text-white' : 'text-gray-900',
    textSecondary: isDarkMode ? 'text-slate-300' : 'text-gray-600',
  };

  return (
    <div className="flex-1 space-y-4">
      {data.map((entry, index) => (
        <div key={entry.name} className="flex items-center gap-4">
          <div
            className="w-4 h-4 rounded-full"
            style={{ backgroundColor: COLORS[index % COLORS.length] }}
          ></div>
          <span className={`text-sm ${theme.textSecondary} flex-1 transition-colors duration-500`}>{entry.name}</span>
          <span className={`text-lg font-bold ${theme.text} transition-colors duration-500`}>{entry.value}</span>
        </div>
      ))}
    </div>
  );
}

interface StorageUsageChartProps {
  data: Array<{ label: string; storageGb: number }>;
  isDarkMode: boolean;
  storageLimit: number;
}

export function StorageUsageChart({ data, isDarkMode, storageLimit }: StorageUsageChartProps) {
  // Calculate max Y value for better scaling
  const maxStorage = Math.max(...data.map(d => d.storageGb), storageLimit * 0.1);
  const yAxisMax = Math.max(maxStorage * 1.2, storageLimit);

  return (
    <ResponsiveContainer width="100%" height={250}>
      <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="storageGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#f59e0b" stopOpacity={isDarkMode ? 0.4 : 0.3}/>
            <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#334155' : '#e5e7eb'} vertical={false} />
        <XAxis dataKey="label" stroke={isDarkMode ? '#64748b' : '#9ca3af'} fontSize={11} tickLine={false} axisLine={false} />
        <YAxis
          stroke={isDarkMode ? '#64748b' : '#9ca3af'}
          fontSize={11}
          tickLine={false}
          axisLine={false}
          width={40}
          domain={[0, yAxisMax]}
          tickFormatter={(value) => `${value.toFixed(1)}`}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: isDarkMode ? 'rgba(30,41,59,0.95)' : 'rgba(255,255,255,0.95)',
            border: 'none',
            borderRadius: '12px',
            boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
            color: isDarkMode ? '#fff' : '#000'
          }}
          formatter={(value: number) => [`${value.toFixed(2)} GB`, 'Storage']}
        />
        <Area
          type="monotone"
          dataKey="storageGb"
          stroke="#f59e0b"
          strokeWidth={3}
          fill="url(#storageGradient)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export { COLORS };
