import * as React from "react";
export type FAQ = { q: string; a: string };

export function FAQBlock({ items }: { items: FAQ[] }) {
  const [open, setOpen] = React.useState<number | null>(0);
  return (
    <section className="py-16">
      <div className="mx-auto max-w-3xl px-4">
        <h2 className="text-2xl md:text-4xl font-bold text-ink text-center">Frequently asked questions</h2>
        <div className="mt-8 divide-y divide-neutral-200 rounded-2xl border border-neutral-200 bg-white">
          {items.map((f, i) => {
            const expanded = open === i;
            return (
              <div key={f.q}>
                <button
                  className="w-full text-left px-5 py-4 flex items-center justify-between"
                  aria-expanded={expanded}
                  onClick={() => setOpen(expanded ? null : i)}
                >
                  <span className="font-medium">{f.q}</span>
                  <span aria-hidden className="ml-4">{expanded ? "−" : "+"}</span>
                </button>
                {expanded ? <div className="px-5 pb-5 text-neutral-700">{f.a}</div> : null}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
