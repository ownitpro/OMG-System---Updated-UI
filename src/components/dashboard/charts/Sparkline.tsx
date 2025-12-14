"use client";

import React from "react";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { cn } from "@/lib/utils";

export interface SparklineData {
  value: number;
}

export interface SparklineProps {
  data: SparklineData[];
  color?: string;
  height?: number;
  className?: string;
  showTooltip?: boolean;
}

export function Sparkline({
  data,
  color = "#3b82f6",
  height = 40,
  className,
  showTooltip = false,
}: SparklineProps) {
  const chartData = data.map((item, index) => ({
    name: index.toString(),
    value: item.value,
  }));

  return (
    <div className={cn("w-full", className)} style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
          {showTooltip && (
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #e5e7eb",
                borderRadius: "0.25rem",
                padding: "4px 8px",
              }}
            />
          )}
          <Line
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={2}
            dot={false}
            activeDot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

