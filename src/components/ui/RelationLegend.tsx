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
        "flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm text-white/50 w-full",
        variant === "default" && "mt-4",
        className
      )}
    >
      {/* Title (only on default) */}
      {!isCompact && (
        <span className="font-medium text-white/60 mr-1">Legend:</span>
      )}

      {/* Primary */}
      <span className="inline-flex items-center gap-1">
        <span className="text-base">{getRoleIcon("primary")}</span>
        <span className="font-medium text-white/80">Primary</span>
        {!isCompact && (
          <span className="hidden sm:inline text-white/50">
            = {getRoleDescription("primary")}
          </span>
        )}
      </span>

      {/* Divider dot */}
      <span className="text-white/30">•</span>

      {/* Secondary */}
      <span className="inline-flex items-center gap-1">
        <span className="text-base">{getRoleIcon("secondary")}</span>
        <span className="font-medium text-white/80">Secondary</span>
        {!isCompact && (
          <span className="hidden sm:inline text-white/50">
            = {getRoleDescription("secondary")}
          </span>
        )}
      </span>
    </div>
  );
}

