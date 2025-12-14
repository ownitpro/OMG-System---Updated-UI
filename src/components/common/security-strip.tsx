import * as React from "react";
import type { CTA } from "./hero";

export function SecurityStrip({ badges, copy, cta }: { badges: string[]; copy: string; cta?: CTA }) {
  return (
    <section className="py-10 bg-ink text-white">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex flex-wrap items-center gap-3">
          {badges.map((b) => (
            <span key={b} className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs">
              {b}
            </span>
          ))}
        </div>
        <p className="mt-4 text-sm md:text-base opacity-90">{copy}</p>
        {cta ? (
          <a href={cta.href} className="mt-4 inline-block btn btn-outline" onClick={() => window.dispatchEvent(new CustomEvent(cta.id || "security_cta_click"))}>
            {cta.label}
          </a>
        ) : null}
      </div>
    </section>
  );
}
