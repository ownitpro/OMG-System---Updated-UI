import * as React from "react";
export type IndustryItem = { title: string; blurb: string; href: string };

export function IndustryGrid({ items, title, subtitle }: { items: IndustryItem[]; title: string; subtitle?: string }) {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="text-2xl md:text-4xl font-bold text-ink">{title}</h2>
        {subtitle ? <p className="mt-2 text-neutral-700">{subtitle}</p> : null}
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((it) => (
            <a key={it.title} href={it.href} className="rounded-2xl border border-neutral-200 bg-white p-6 hover:shadow-sm">
              <h3 className="font-semibold text-lg">{it.title}</h3>
              <p className="mt-2 text-neutral-700">{it.blurb}</p>
              <span className="mt-4 inline-block text-primary">Explore →</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
