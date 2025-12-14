import * as React from "react";
export type Step = { index: number; title: string; body: string };
export function ProcessSteps({
  steps,
  eyebrow,
  title,
  subtitle,
}: {
  steps: Step[];
  eyebrow?: string;
  title?: string;
  subtitle?: string;
}) {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4">
        {eyebrow ? <p className="text-xs uppercase tracking-wide text-neutral-500">{eyebrow}</p> : null}
        {title ? <h2 className="mt-2 text-2xl md:text-4xl font-bold text-ink">{title}</h2> : null}
        {subtitle ? <p className="mt-3 text-neutral-700">{subtitle}</p> : null}
        <ol className="mt-8 grid gap-6 md:grid-cols-5">
          {steps.map((s) => (
            <li key={s.index} className="rounded-xl border border-neutral-200 bg-white p-5 h-full">
              <div className="w-8 h-8 rounded-full bg-primary/15 text-primary grid place-items-center font-semibold">
                {s.index}
              </div>
              <h3 className="mt-3 font-semibold">{s.title}</h3>
              <p className="mt-2 text-neutral-700">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
