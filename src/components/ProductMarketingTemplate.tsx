import Link from "next/link";
import { PRODUCT_PRICING } from "@/config/pricing";
import { PricingStrip } from "@/components/PricingStrip";
import { TrustRow } from "@/components/TrustRow";

type FAQ = { q: string; a: string };

export type ProductMarketingProps = {
  brand: string;
  productName: string;
  tagline: string;

  heroBullets: string[]; // 3–4
  buyNow?: {
    label: string;
    href: string;
  };
  primaryCta: { label: string; href: string; note?: string };
  secondaryCta?: { label: string; href: string };

  // 2–4 simple value sections
  sections: {
    title: string;
    text: string;
    bullets?: string[];
  }[];

  // 3–6 highlight cards
  highlights: {
    title: string;
    items: { title: string; text: string }[];
  };

  // 3–6 FAQs
  faqs: FAQ[];

  // Closing CTA
  footerCta: {
    title: string;
    text: string;
    primary: { label: string; href: string };
    secondary?: { label: string; href: string };
  };
};

function CheckIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M20 6L9 17l-5-5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ProductMarketingTemplate(p: ProductMarketingProps) {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      {/* Top bar */}
      <header className="sticky top-0 z-30 border-b border-zinc-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div className="flex flex-col">
            <div className="text-sm text-zinc-500">{p.brand}</div>
            <div className="text-xl font-semibold">{p.productName}</div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/products/plans"
              className="rounded-xl border border-zinc-200 bg-white px-4 py-2 text-sm font-semibold hover:bg-zinc-50"
            >
              Plans
            </Link>
            <Link
              href="/portal/client"
              className="rounded-xl border border-zinc-200 bg-white px-4 py-2 text-sm font-semibold hover:bg-zinc-50"
            >
              Back to Portal
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8">
        {/* Hero */}
        <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
          <div className="text-3xl font-semibold">{p.tagline}</div>

          {PRODUCT_PRICING[p.productName as keyof typeof PRODUCT_PRICING] ? (
            <PricingStrip
              price={PRODUCT_PRICING[p.productName as keyof typeof PRODUCT_PRICING].price}
              note={PRODUCT_PRICING[p.productName as keyof typeof PRODUCT_PRICING].note}
            />
          ) : null}

          <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-3">
            {p.heroBullets.slice(0, 6).map((b) => (
              <div
                key={b}
                className="rounded-2xl border border-zinc-200 bg-white p-4"
              >
                <div className="flex items-start gap-2">
                  <span className="mt-0.5 text-zinc-900">
                    <CheckIcon />
                  </span>
                  <div className="text-sm font-semibold">{b}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {p.buyNow ? (
              <a
                href={p.buyNow.href}
                className="rounded-xl bg-zinc-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-zinc-800"
              >
                {p.buyNow.label}
              </a>
            ) : null}

            <Link
              href={p.primaryCta.href}
              className="rounded-xl border border-zinc-200 bg-white px-5 py-2.5 text-sm font-semibold hover:bg-zinc-50"
            >
              {p.primaryCta.label}
            </Link>

            {p.secondaryCta ? (
              <Link
                href={p.secondaryCta.href}
                className="rounded-xl border border-zinc-200 bg-white px-5 py-2.5 text-sm font-semibold hover:bg-zinc-50"
              >
                {p.secondaryCta.label}
              </Link>
            ) : null}
          </div>

          <div className="mt-3 text-xs text-zinc-500">
            {p.primaryCta.note ??
              "Week 1: CTA routes to plans/info. Week 2: CTA routes to Stripe checkout."}
          </div>

          <TrustRow />
        </div>

        {/* Screenshot placeholder */}
        <div className="mt-6 rounded-2xl border border-dashed border-zinc-200 bg-white p-10 text-center shadow-sm">
          <div className="text-lg font-semibold">Product Preview</div>
          <div className="mt-2 text-sm text-zinc-600">
            Add screenshots here later. (Week 1: placeholder)
          </div>
        </div>

        {/* Value sections */}
        <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
          {p.sections.map((s) => (
            <div
              key={s.title}
              className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm"
            >
              <div className="text-lg font-semibold">{s.title}</div>
              <div className="mt-2 text-sm text-zinc-600">{s.text}</div>

              {s.bullets?.length ? (
                <ul className="mt-4 space-y-2 text-sm text-zinc-700">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2">
                      <span className="mt-0.5">•</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          ))}
        </div>

        {/* Highlights */}
        <div className="mt-6 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
          <div className="text-xl font-semibold">{p.highlights.title}</div>
          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {p.highlights.items.map((i) => (
              <div
                key={i.title}
                className="rounded-2xl border border-zinc-200 bg-white p-5"
              >
                <div className="font-semibold">{i.title}</div>
                <div className="mt-2 text-sm text-zinc-600">{i.text}</div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-6 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
          <div className="text-xl font-semibold">FAQ</div>
          <div className="mt-4 space-y-4">
            {p.faqs.map((f) => (
              <div key={f.q} className="rounded-2xl border border-zinc-200 p-5">
                <div className="font-semibold">{f.q}</div>
                <div className="mt-2 text-sm text-zinc-600">{f.a}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer CTA */}
        <div className="mt-6 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
          <div className="text-2xl font-semibold">{p.footerCta.title}</div>
          <div className="mt-2 text-sm text-zinc-600">{p.footerCta.text}</div>

          <div className="mt-5 flex flex-wrap gap-2">
            <Link
              href={p.footerCta.primary.href}
              className="rounded-xl bg-zinc-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-zinc-800"
            >
              {p.footerCta.primary.label}
            </Link>

            {p.footerCta.secondary ? (
              <Link
                href={p.footerCta.secondary.href}
                className="rounded-xl border border-zinc-200 bg-white px-5 py-2.5 text-sm font-semibold hover:bg-zinc-50"
              >
                {p.footerCta.secondary.label}
              </Link>
            ) : null}
          </div>
        </div>
      </main>
    </div>
  );
}
