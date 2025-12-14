"use client";

import * as React from "react";
import type { CTA } from "./hero";

export function CTASection({
  title,
  subtitle,
  primaryCta,
  secondaryCta,
}: {
  title: string;
  subtitle?: string;
  primaryCta: CTA;
  secondaryCta?: CTA;
}) {
  return (
    <section className="py-16 bg-gradient-to-b from-primary/10 to-white">
      <div className="mx-auto max-w-4xl px-4 text-center">
        <h2 className="text-2xl md:text-4xl font-bold text-ink">{title}</h2>
        {subtitle ? <p className="mt-3 text-neutral-700">{subtitle}</p> : null}
        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href={primaryCta.href}
            className="btn btn-primary"
            aria-label={primaryCta.label}
            onClick={() => window.dispatchEvent(new CustomEvent(primaryCta.id || "cta_primary_click"))}
          >
            {primaryCta.label}
          </a>
          {secondaryCta ? (
            <a
              href={secondaryCta.href}
              className="btn btn-outline"
              aria-label={secondaryCta.label}
              onClick={() => window.dispatchEvent(new CustomEvent(secondaryCta.id || "cta_secondary_click"))}
            >
              {secondaryCta.label}
            </a>
          ) : null}
        </div>
      </div>
    </section>
  );
}
