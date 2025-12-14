import * as React from "react";
export type Quote = { quote: string; cite?: string };

export function QuoteWall({ quotes, logos }: { quotes: Quote[]; logos?: string[] }) {
  return (
    <section className="py-12 bg-off">
      <div className="mx-auto max-w-7xl px-4 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-5">
          {quotes.map((q, i) => (
            <blockquote key={i} className="rounded-2xl border border-neutral-200 bg-white p-6">
              <p className="text-neutral-900 text-lg">"{q.quote}"</p>
              {q.cite ? <footer className="mt-2 text-sm text-neutral-500">— {q.cite}</footer> : null}
            </blockquote>
          ))}
        </div>
        <div className="rounded-2xl border border-neutral-200 bg-white p-6 grid grid-cols-2 gap-4 place-content-center">
          {logos?.map((src) => <img key={src} src={src} alt="" className="h-8 object-contain opacity-70" />)}
        </div>
      </div>
    </section>
  );
}
