'use client';

import { useMemo, useState, useEffect } from 'react';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';

interface StorageUsageChartProps {
  data: Array<{ label: string; storageGb: number }>;
  isDarkMode: boolean;
  storageLimit: number;
}

export default function StorageUsageChart({ data, isDarkMode, storageLimit }: StorageUsageChartProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Determine if we should display in MB or GB based on max value
  const { chartData, unit, yAxisMax, formatValue } = useMemo(() => {
    const maxStorageGb = Math.max(...data.map(d => d.storageGb), 0.001);

    // Use MB if max storage is less than 0.1 GB (100 MB)
    const useMb = maxStorageGb < 0.1;

    if (useMb) {
      // Convert to MB for display
      const mbData = data.map(d => ({
        label: d.label,
        storage: d.storageGb * 1024 // Convert GB to MB
      }));
      const maxMb = Math.max(...mbData.map(d => d.storage), 1); // At least 1 MB for scale
      const yMax = Math.max(maxMb * 1.5, 10); // At least 10 MB for readable scale

      return {
        chartData: mbData,
        unit: 'MB',
        yAxisMax: yMax,
        formatValue: (value: number) => {
          if (value < 1) return `${(value * 1024).toFixed(0)} KB`;
          return `${value.toFixed(1)} MB`;
        }
      };
    } else {
      // Use GB
      const gbData = data.map(d => ({
        label: d.label,
        storage: d.storageGb
      }));
      const maxGb = Math.max(...gbData.map(d => d.storage), storageLimit * 0.1);
      const yMax = Math.max(maxGb * 1.2, storageLimit);

      return {
        chartData: gbData,
        unit: 'GB',
        yAxisMax: yMax,
        formatValue: (value: number) => `${value.toFixed(2)} GB`
      };
    }
  }, [data, storageLimit]);

  // Calculate tick interval based on data length
  const tickInterval = chartData.length > 12 ? Math.floor(chartData.length / 6) : 0;

  // Don't render until mounted (client-side only)
  if (!mounted) {
    return (
      <div className="h-[250px] animate-pulse bg-slate-700/30 rounded-xl" />
    );
  }

  // Don't render if no data
  if (!chartData || chartData.length === 0) {
    return (
      <div className="h-[250px] flex items-center justify-center text-slate-500">
        No data available
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={250}>
      <AreaChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 20 }}>
        <defs>
          <linearGradient id="storageGradient2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#f59e0b" stopOpacity={isDarkMode ? 0.4 : 0.3}/>
            <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
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
          width={50}
          domain={[0, yAxisMax]}
          tickFormatter={(value) => `${value.toFixed(unit === 'MB' ? 0 : 1)}`}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: isDarkMode ? 'rgba(30,41,59,0.95)' : 'rgba(255,255,255,0.95)',
            border: 'none',
            borderRadius: '12px',
            boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
            color: isDarkMode ? '#fff' : '#000'
          }}
          formatter={(value: number) => [formatValue(value), 'Storage']}
          labelStyle={{ color: isDarkMode ? '#94a3b8' : '#64748b', marginBottom: 4 }}
        />
        <Area
          type="monotone"
          dataKey="storage"
          stroke="#f59e0b"
          strokeWidth={2}
          fill="url(#storageGradient2)"
          dot={{ r: 3, fill: '#f59e0b', strokeWidth: 0 }}
          activeDot={{ r: 6, fill: '#f59e0b', stroke: isDarkMode ? '#1e293b' : '#fff', strokeWidth: 2 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
