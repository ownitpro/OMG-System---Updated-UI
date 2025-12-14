"use client";

import clsx from "clsx";
import { getRoleIcon, getRoleDescription } from "@/lib/relationsHelpers";

type RelationLegendProps = {
  className?: string;
  variant?: "default" | "compact";
};

export function RelationLegend({
  className,
  variant = "default",
}: RelationLegendProps) {
  const isCompact = variant === "compact";

  return (
    <div
      className={clsx(
        "inline-flex flex-wrap items-center gap-3 text-xs sm:text-sm text-slate-500",
        variant === "default" && "mt-4",
        className
      )}
    >
      {/* Title (only on default) */}
      {!isCompact && (
        <span className="font-medium text-slate-600 mr-1">Legend:</span>
      )}

      {/* Primary */}
      <span className="inline-flex items-center gap-1">
        <span className="text-base">{getRoleIcon("primary")}</span>
        <span className="font-medium text-slate-700">Primary</span>
        {!isCompact && (
          <span className="hidden sm:inline">
            = {getRoleDescription("primary")}
          </span>
        )}
      </span>

      {/* Divider dot */}
      <span className="text-slate-300">•</span>

      {/* Secondary */}
      <span className="inline-flex items-center gap-1">
        <span className="text-base">{getRoleIcon("secondary")}</span>
        <span className="font-medium text-slate-700">Secondary</span>
        {!isCompact && (
          <span className="hidden sm:inline">
            = {getRoleDescription("secondary")}
          </span>
        )}
      </span>
    </div>
  );
}

