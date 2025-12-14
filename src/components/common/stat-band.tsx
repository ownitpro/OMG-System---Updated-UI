import * as React from "react";
export type Stat = { value: string; label: string };

export function StatBand({ stats, footerNote }: { stats: Stat[]; footerNote?: string }) {
  return (
    <section className="py-10 bg-ink text-white">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary">{s.value}</div>
              <div className="mt-2 text-sm opacity-80">{s.label}</div>
            </div>
          ))}
        </div>
        {footerNote ? <p className="mt-4 text-xs opacity-70 text-center">{footerNote}</p> : null}
      </div>
    </section>
  );
}
