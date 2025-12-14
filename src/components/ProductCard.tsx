"use client";

import React from "react";

type Status = "active" | "locked" | "coming_soon";

function badgeText(status: Status) {
  if (status === "active") return "✅ Active";
  if (status === "locked") return "🔒 Locked";
  return "⏳ Coming soon";
}

export function ProductCard({
  name,
  description,
  status,
  primaryLabel,
  href,
  secondaryLabel,
  onSecondary,
}: {
  name: string;
  description: string;
  status: Status;
  primaryLabel: string;
  href?: string; // Launch URL (same tab)
  secondaryLabel?: string;
  onSecondary?: () => void;
}) {
  const disabled = status === "coming_soon";

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-lg font-semibold">{name}</div>
          <div className="mt-1 text-sm text-zinc-600">{description}</div>
        </div>

        <div className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-700">
          {badgeText(status)}
        </div>
      </div>

      <div className="mt-5 flex items-center gap-2">
        {href && !disabled ? (
          <a
            href={href}
            className="inline-flex items-center justify-center rounded-xl bg-zinc-900 px-4 py-2 text-sm font-semibold text-white hover:bg-zinc-800"
          >
            {primaryLabel}
          </a>
        ) : (
          <button
            disabled
            className="inline-flex items-center justify-center rounded-xl bg-zinc-200 px-4 py-2 text-sm font-semibold text-zinc-500"
          >
            {primaryLabel}
          </button>
        )}

        {secondaryLabel ? (
          <button
            onClick={onSecondary}
            className="rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm hover:bg-zinc-50"
          >
            {secondaryLabel}
          </button>
        ) : null}
      </div>
    </div>
  );
}
