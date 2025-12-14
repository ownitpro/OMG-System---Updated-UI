import * as React from "react";
export type TileItem = { title: string; body: string; href: string; bullets?: string[]; icon?: string };

export function Tiles3({ items }: { items: TileItem[] }) {
  return (
    <section className="py-12 bg-off">
      <div className="mx-auto max-w-7xl px-4 grid gap-6 md:grid-cols-3">
        {items.map((it) => (
          <a key={it.title} href={it.href} className="group rounded-2xl border border-neutral-200 bg-white p-6 hover:shadow-sm">
            <div className="flex items-start gap-3">
              {it.icon ? <img src={it.icon} alt="" aria-hidden className="w-6 h-6 opacity-70" /> : null}
              <h3 className="font-semibold text-lg text-ink">{it.title}</h3>
            </div>
            <p className="mt-3 text-neutral-700">{it.body}</p>
            {it.bullets?.length ? (
              <ul className="mt-3 list-disc pl-5 text-neutral-700 space-y-1">
                {it.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            ) : null}
            <span className="mt-4 inline-block text-primary group-hover:translate-x-0.5 transition">
              Explore →
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
