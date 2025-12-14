"use client";

import React from "react";
import {
  AreaChart as RechartsAreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { cn } from "@/lib/utils";

export interface AreaChartData {
  name: string;
  [key: string]: string | number;
}

export interface AreaChartProps {
  data: AreaChartData[];
  areas: Array<{
    dataKey: string;
    name: string;
    color?: string;
    fillOpacity?: number;
  }>;
  height?: number;
  showGrid?: boolean;
  showLegend?: boolean;
  showTooltip?: boolean;
  className?: string;
  stacked?: boolean;
}

export function AreaChart({
  data,
  areas,
  height = 300,
  showGrid = true,
  showLegend = true,
  showTooltip = true,
  className,
  stacked = false,
}: AreaChartProps) {
  const defaultColors = [
    "#3b82f6", // blue-500
    "#10b981", // emerald-500
    "#f59e0b", // amber-500
    "#ef4444", // red-500
    "#8b5cf6", // violet-500
  ];

  return (
    <div className={cn("w-full", className)} style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsAreaChart
          data={data}
          margin={{ top: 5, right: 10, left: 0, bottom: 0 }}
          stackOffset={stacked ? "expand" : undefined}
        >
          {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />}
          <XAxis
            dataKey="name"
            stroke="#6b7280"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#6b7280"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          {showTooltip && (
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #e5e7eb",
                borderRadius: "0.5rem",
              }}
            />
          )}
          {showLegend && <Legend />}
          {areas.map((area, index) => (
            <Area
              key={area.dataKey}
              type="monotone"
              dataKey={area.dataKey}
              name={area.name}
              stackId={stacked ? "1" : undefined}
              stroke={area.color || defaultColors[index % defaultColors.length]}
              fill={area.color || defaultColors[index % defaultColors.length]}
              fillOpacity={area.fillOpacity || 0.6}
            />
          ))}
        </RechartsAreaChart>
      </ResponsiveContainer>
    </div>
  );
}

