"use client";

import clsx from "clsx";

type RelationPriority = "primary" | "secondary" | undefined;

type RelationBadgeProps = {
  label: string;
  priority?: RelationPriority;
  className?: string;
};

export function RelationBadge({ label, priority, className }: RelationBadgeProps) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold",
        "border border-transparent",
        priority === "primary" &&
          "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
        priority === "secondary" &&
          "bg-slate-700/50 text-slate-300 border-slate-600",
        !priority && "bg-slate-700/50 text-slate-300",
        className
      )}
    >
      {label}
    </span>
  );
}

