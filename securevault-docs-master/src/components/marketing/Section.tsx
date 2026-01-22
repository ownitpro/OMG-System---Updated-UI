// src/components/marketing/Section.tsx
// Reusable section component for marketing pages

import React from "react";

export function Section({
  title,
  eyebrow,
  children,
}: {
  title: string;
  eyebrow?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="py-10 md:py-14 border-b border-white/5 last:border-0">
      <div className="max-w-3xl">
        {eyebrow && (
          <div className="text-[#3b82f6] text-xs font-semibold tracking-wider uppercase mb-2">
            {eyebrow}
          </div>
        )}
        <h2 className="text-2xl md:text-3xl font-semibold leading-tight">{title}</h2>
      </div>
      <div className="mt-6">{children}</div>
    </section>
  );
}

