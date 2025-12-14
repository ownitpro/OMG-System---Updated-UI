import * as React from "react";
import Link from "next/link";

type DemoLayoutProps = {
  /** Page H1 */
  title: string;
  /** Short supporting line under H1 */
  subtitle?: string;
  /** CTA button label (e.g., "Start Demo") */
  cta?: string;
  /** Optional href for the CTA (if not using onStart) */
  ctaHref?: string;
  /** Optional click handler for CTA (if not linking) */
  onStart?: () => void;
  /** Optional path or URL to an embeddable demo (iframe) */
  appEmbed?: string;
  /** Bullet list of key features to show in the sidebar */
  features?: string[];
  /** Optional small note text under the CTA */
  note?: string;
  /** Optional children to render under the hero (e.g., tabs) */
  children?: React.ReactNode;
};

export function DemoLayout({
  title,
  subtitle,
  cta = "Start Demo",
  ctaHref,
  onStart,
  appEmbed,
  features = [],
  note,
  children,
}: DemoLayoutProps) {
  return (
    <main className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 pb-20">
      {/* Hero */}
      <section className="pt-10 md:pt-14">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-slate-900">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-4 text-slate-600 text-base sm:text-lg">
              {subtitle}
            </p>
          )}
          <div className="mt-6 flex items-center justify-center gap-3">
            {ctaHref ? (
              <Link
                href={ctaHref}
                className="inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
              >
                {cta}
              </Link>
            ) : (
              <button
                type="button"
                onClick={onStart}
                className="inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
              >
                {cta}
              </button>
            )}
          </div>
          {note && <p className="mt-2 text-xs text-slate-500">{note}</p>}
        </div>
      </section>

      {/* Optional slot (tabs, filters, etc.) */}
      {children ? <div className="mt-8">{children}</div> : null}

      {/* Content grid */}
      <section className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Embedded demo / preview */}
        <div className="lg:col-span-8 rounded-2xl border border-slate-200 bg-white shadow-sm">
          {appEmbed ? (
            <div className="aspect-[16/9] w-full overflow-hidden rounded-t-2xl bg-slate-50">
              {/* Iframe container */}
              <iframe
                title="Live Demo"
                src={appEmbed}
                className="h-full w-full border-0"
                allow="clipboard-write; microphone; camera; fullscreen"
              />
            </div>
          ) : (
            <div className="aspect-[16/9] w-full rounded-t-2xl bg-gradient-to-br from-slate-50 to-slate-100 grid place-items-center">
              <div className="text-center px-6">
                <div className="mx-auto mb-3 h-12 w-12 rounded-xl bg-emerald-100 text-emerald-700 grid place-items-center">
                  {/* Simple play icon */}
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path d="M6.5 5.5v9l8-4.5-8-4.5z" />
                  </svg>
                </div>
                <p className="text-slate-700 font-medium">
                  Live demo will appear here.
                </p>
                <p className="text-slate-500 text-sm mt-1">
                  Hook up <code className="px-1 rounded bg-slate-100">appEmbed</code> to an internal demo route or sandbox URL.
                </p>
              </div>
            </div>
          )}

          {/* Helpful hint strip */}
          <div className="border-t border-slate-200 p-4 sm:p-5">
            <p className="text-sm text-slate-600">
              Tip: Use this space to embed a product walkthrough, interactive sandbox, or guided tour. You can swap it later without changing the page layout.
            </p>
          </div>
        </div>

        {/* Right: Feature list / info panel */}
        <aside className="lg:col-span-4 space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-5">
            <h2 className="text-base font-semibold text-slate-900">
              What you can try
            </h2>
            <ul className="mt-3 space-y-2">
              {features.length ? (
                features.map((f, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-slate-700">
                    <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                      ✓
                    </span>
                    <span>{f}</span>
                  </li>
                ))
              ) : (
                <li className="text-sm text-slate-500">
                  Add feature bullets via the <code className="px-1 rounded bg-slate-100">features</code> prop.
                </li>
              )}
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-5">
            <h3 className="text-sm font-semibold text-slate-900">Need help?</h3>
            <p className="mt-2 text-sm text-slate-600">
              Have questions or want a guided tour? Our team can walk you through industry-specific workflows in minutes.
            </p>
            <div className="mt-3">
              <Link
                href="/contact/sales"
                className="inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium text-emerald-700 bg-emerald-50 hover:bg-emerald-100"
              >
                Contact Sales
              </Link>
            </div>
          </div>
        </aside>
      </section>
    </main>
  );
}

export default DemoLayout;
