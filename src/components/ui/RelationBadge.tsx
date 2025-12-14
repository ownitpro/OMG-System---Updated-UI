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
          "bg-emerald-100 text-emerald-800 border-emerald-200",
        priority === "secondary" &&
          "bg-slate-100 text-slate-700 border-slate-200",
        !priority && "bg-slate-100 text-slate-700",
        className
      )}
    >
      {label}
    </span>
  );
}

