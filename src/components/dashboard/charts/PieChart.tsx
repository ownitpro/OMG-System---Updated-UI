"use client";

import React from "react";
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { cn } from "@/lib/utils";

export interface PieChartData {
  name: string;
  value: number;
  [key: string]: string | number;
}

export interface PieChartProps {
  data: PieChartData[];
  height?: number;
  showLegend?: boolean;
  showTooltip?: boolean;
  className?: string;
  colors?: string[];
  innerRadius?: number;
  outerRadius?: number;
}

const defaultColors = [
  "#3b82f6", // blue-500
  "#10b981", // emerald-500
  "#f59e0b", // amber-500
  "#ef4444", // red-500
  "#8b5cf6", // violet-500
  "#ec4899", // pink-500
  "#06b6d4", // cyan-500
  "#84cc16", // lime-500
];

export function PieChart({
  data,
  height = 300,
  showLegend = true,
  showTooltip = true,
  className,
  colors = defaultColors,
  innerRadius = 0,
  outerRadius = 80,
}: PieChartProps) {
  return (
    <div className={cn("w-full", className)} style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsPieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={(entry: any) => {
              const percent = entry.percent || 0;
              return `${entry.name}: ${(percent * 100).toFixed(0)}%`;
            }}
            outerRadius={outerRadius}
            innerRadius={innerRadius}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
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
        </RechartsPieChart>
      </ResponsiveContainer>
    </div>
  );
}

