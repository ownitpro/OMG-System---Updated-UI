import * as React from "react";

export type CTA = { label: string; href: string; id?: string };
export type HeroProps = {
  eyebrow?: string;
  title: string;
  subtitle: string;
  primaryCta?: CTA;
  secondaryCta?: CTA;
  badges?: string[];
};

export function Hero({ eyebrow, title, subtitle, primaryCta, secondaryCta, badges }: HeroProps) {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 text-center">
        {eyebrow ? <p className="text-xs uppercase tracking-wide text-neutral-500">{eyebrow}</p> : null}
        <h1 className="mt-2 text-3xl md:text-5xl font-bold text-ink">{title}</h1>
        <p className="mt-4 text-lg md:text-xl text-neutral-700">{subtitle}</p>
        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
          {primaryCta ? (
            <a
              href={primaryCta.href}
              className="btn btn-primary"
              aria-label={primaryCta.label}
              onClick={() => window.dispatchEvent(new CustomEvent(primaryCta.id || "hero_primary_click"))}
            >
              {primaryCta.label}
            </a>
          ) : null}
          {secondaryCta ? (
            <a
              href={secondaryCta.href}
              className="btn btn-outline"
              aria-label={secondaryCta.label}
              onClick={() => window.dispatchEvent(new CustomEvent(secondaryCta.id || "hero_secondary_click"))}
            >
              {secondaryCta.label}
            </a>
          ) : null}
        </div>
        {badges?.length ? (
          <div className="mt-6 flex flex-wrap justify-center gap-2 text-xs text-neutral-600">
            {badges.map((b) => (
              <span key={b} className="px-2 py-1 rounded-full border border-neutral-200">
                {b}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
