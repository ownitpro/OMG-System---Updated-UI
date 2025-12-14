"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";

export interface MetricCardProps {
  title: string;
  value: string | number;
  change?: number; // Percentage change
  changeLabel?: string; // e.g., "vs last month"
  icon?: React.ComponentType<{ className?: string }>;
  type?: "revenue" | "users" | "growth" | "warning" | "success" | "default";
  trend?: "up" | "down" | "neutral";
  loading?: boolean;
  className?: string;
  onClick?: () => void;
  sparkline?: React.ReactNode; // Optional sparkline chart
}

const typeColors = {
  revenue: {
    bg: "bg-blue-50",
    icon: "text-blue-600",
    value: "text-blue-900",
    border: "border-blue-200",
  },
  users: {
    bg: "bg-green-50",
    icon: "text-green-600",
    value: "text-green-900",
    border: "border-green-200",
  },
  growth: {
    bg: "bg-purple-50",
    icon: "text-purple-600",
    value: "text-purple-900",
    border: "border-purple-200",
  },
  warning: {
    bg: "bg-amber-50",
    icon: "text-amber-600",
    value: "text-amber-900",
    border: "border-amber-200",
  },
  success: {
    bg: "bg-emerald-50",
    icon: "text-emerald-600",
    value: "text-emerald-900",
    border: "border-emerald-200",
  },
  default: {
    bg: "bg-gray-50",
    icon: "text-gray-600",
    value: "text-gray-900",
    border: "border-gray-200",
  },
};

export function MetricCard({
  title,
  value,
  change,
  changeLabel = "vs last period",
  icon: Icon,
  type = "default",
  trend,
  loading = false,
  className,
  onClick,
  sparkline,
}: MetricCardProps) {
  const colors = typeColors[type];
  const isPositive = change !== undefined ? change > 0 : trend === "up";
  const isNegative = change !== undefined ? change < 0 : trend === "down";

  // Format value
  const formatValue = (val: string | number): string => {
    if (typeof val === "number") {
      if (val >= 1000000) {
        return `$${(val / 1000000).toFixed(1)}M`;
      }
      if (val >= 1000) {
        return `$${(val / 1000).toFixed(1)}K`;
      }
      return val.toLocaleString();
    }
    return val;
  };

  if (loading) {
    return (
      <Card variant="stat" className={cn("animate-pulse", className)}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="h-4 bg-gray-200 rounded w-24"></div>
          {Icon && <div className="h-5 w-5 bg-gray-200 rounded"></div>}
        </CardHeader>
        <CardContent>
          <div className="h-8 bg-gray-200 rounded w-32 mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-20"></div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      variant="stat"
      className={cn(
        "relative overflow-hidden admin-card transition-all duration-300 hover:shadow-lg",
        onClick && "cursor-pointer hover:scale-[1.02] hover:-translate-y-1",
        className
      )}
      onClick={onClick}
    >
      {/* Gradient accent bar */}
      <div className={cn("absolute top-0 left-0 right-0 h-1 transition-all duration-300", colors.bg)}></div>

      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-600 transition-colors">{title}</CardTitle>
        {Icon && (
          <div className={cn("p-2.5 rounded-lg transition-all duration-300", colors.bg, onClick && "group-hover:scale-110")}>
            <Icon className={cn("h-5 w-5 transition-colors", colors.icon)} />
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {/* Main value */}
          <div className={cn("text-3xl font-bold transition-all duration-300", colors.value)}>
            {formatValue(value)}
          </div>

          {/* Change indicator */}
          {(change !== undefined || trend) && (
            <div className="flex items-center space-x-1 text-sm">
              {isPositive && (
                <ArrowTrendingUpIcon className="h-4 w-4 text-success-600" />
              )}
              {isNegative && (
                <ArrowTrendingDownIcon className="h-4 w-4 text-error-600" />
              )}
              {change !== undefined && (
                <span
                  className={cn(
                    "font-semibold",
                    isPositive ? "text-success-600" : isNegative ? "text-error-600" : "text-gray-600"
                  )}
                >
                  {isPositive ? "+" : ""}
                  {change.toFixed(1)}%
                </span>
              )}
              {changeLabel && (
                <span className="text-gray-500 ml-1">{changeLabel}</span>
              )}
            </div>
          )}

          {/* Sparkline */}
          {sparkline && (
            <div className="mt-3 h-12 w-full">{sparkline}</div>
          )}
        </div>
      </CardContent>

      {/* Hover indicator */}
      {onClick && (
        <div className="absolute bottom-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <ArrowRightIcon className="h-4 w-4 text-gray-400" />
        </div>
      )}
    </Card>
  );
}

