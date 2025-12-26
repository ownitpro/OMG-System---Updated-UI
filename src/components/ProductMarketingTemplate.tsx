import Link from "next/link";
import { PRODUCT_PRICING } from "@/config/pricing";
import { PricingStrip } from "@/components/PricingStrip";
import { TrustRow } from "@/components/TrustRow";
import {
  CheckIcon,
  SparklesIcon,
  QuestionMarkCircleIcon,
  RocketLaunchIcon,
} from "@heroicons/react/24/outline";

type FAQ = { q: string; a: string };

export type ProductMarketingProps = {
  brand: string;
  productName: string;
  tagline: string;
  color?: string;
  icon?: React.ComponentType<{ className?: string }>;

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

export function ProductMarketingTemplate(p: ProductMarketingProps) {
  const productColor = p.color || "#47BD79";
  const IconComponent = p.icon || SparklesIcon;

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Top bar */}
      <header className="sticky top-0 z-30 border-b border-white/10 bg-black/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: `${productColor}20` }}
            >
              <IconComponent className="w-5 h-5" style={{ color: productColor }} />
            </div>
            <div className="flex flex-col">
              <div className="text-sm text-white/50">{p.brand}</div>
              <div className="text-xl font-semibold text-white">{p.productName}</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/products/plans"
              className="rounded-xl bg-[#47BD79] px-4 py-2 text-sm font-semibold text-white hover:bg-[#3da968] transition-colors"
            >
              View Plans
            </Link>
            <Link
              href="/portal/client"
              className="rounded-xl border border-white/20 bg-white/5 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
            >
              Back to Portal
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8">
        {/* Hero */}
        <div
          className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8"
          style={{ boxShadow: `0 0 40px ${productColor}10` }}
        >
          <div className="text-3xl font-bold text-white">{p.tagline}</div>

          {PRODUCT_PRICING[p.productName as keyof typeof PRODUCT_PRICING] ? (
            <PricingStrip
              price={PRODUCT_PRICING[p.productName as keyof typeof PRODUCT_PRICING].price}
              note={PRODUCT_PRICING[p.productName as keyof typeof PRODUCT_PRICING].note}
              color={productColor}
            />
          ) : null}

          <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-3">
            {p.heroBullets.slice(0, 6).map((b) => (
              <div
                key={b}
                className="rounded-xl border border-white/10 bg-white/5 p-4"
              >
                <div className="flex items-start gap-2">
                  <span className="mt-0.5" style={{ color: productColor }}>
                    <CheckIcon className="w-5 h-5" />
                  </span>
                  <div className="text-sm font-medium text-white">{b}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            {p.buyNow ? (
              <a
                href={p.buyNow.href}
                className="rounded-xl px-5 py-2.5 text-sm font-semibold text-white transition-colors"
                style={{ backgroundColor: productColor }}
              >
                {p.buyNow.label}
              </a>
            ) : null}

            <Link
              href={p.primaryCta.href}
              className="rounded-xl border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
            >
              {p.primaryCta.label}
            </Link>

            {p.secondaryCta ? (
              <Link
                href={p.secondaryCta.href}
                className="rounded-xl border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
              >
                {p.secondaryCta.label}
              </Link>
            ) : null}
          </div>

          {p.primaryCta.note && (
            <div className="mt-3 text-xs text-white/50">
              {p.primaryCta.note}
            </div>
          )}

          <TrustRow />
        </div>

        {/* Screenshot placeholder */}
        <div
          className="mt-6 rounded-2xl border border-dashed border-white/20 bg-white/5 backdrop-blur-xl p-10 text-center"
          style={{ boxShadow: `0 0 20px ${productColor}05` }}
        >
          <div className="flex justify-center mb-3">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: `${productColor}20` }}
            >
              <IconComponent className="w-6 h-6" style={{ color: productColor }} />
            </div>
          </div>
          <div className="text-lg font-semibold text-white">Product Preview</div>
          <div className="mt-2 text-sm text-white/60">
            Screenshots and demos coming soon.
          </div>
        </div>

        {/* Value sections */}
        <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
          {p.sections.map((s, idx) => (
            <div
              key={s.title}
              className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6"
              style={{ boxShadow: `0 0 20px ${productColor}05` }}
            >
              <div className="text-lg font-semibold text-white">{s.title}</div>
              <div className="mt-2 text-sm text-white/60">{s.text}</div>

              {s.bullets?.length ? (
                <ul className="mt-4 space-y-2 text-sm text-white/80">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2">
                      <span className="mt-0.5" style={{ color: productColor }}>
                        <CheckIcon className="w-4 h-4" />
                      </span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          ))}
        </div>

        {/* Highlights */}
        <div
          className="mt-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6"
          style={{ boxShadow: `0 0 20px ${productColor}05` }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: `${productColor}20` }}
            >
              <SparklesIcon className="w-5 h-5" style={{ color: productColor }} />
            </div>
            <div className="text-xl font-semibold text-white">{p.highlights.title}</div>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {p.highlights.items.map((i) => (
              <div
                key={i.title}
                className="rounded-xl border border-white/10 bg-white/5 p-5"
              >
                <div className="font-semibold text-white">{i.title}</div>
                <div className="mt-2 text-sm text-white/60">{i.text}</div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div
          className="mt-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6"
          style={{ boxShadow: `0 0 20px ${productColor}05` }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-[#3B82F6]/20 flex items-center justify-center">
              <QuestionMarkCircleIcon className="w-5 h-5 text-[#3B82F6]" />
            </div>
            <div className="text-xl font-semibold text-white">FAQ</div>
          </div>
          <div className="space-y-4">
            {p.faqs.map((f) => (
              <div key={f.q} className="rounded-xl border border-white/10 bg-white/5 p-5">
                <div className="font-semibold text-white">{f.q}</div>
                <div className="mt-2 text-sm text-white/60">{f.a}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer CTA */}
        <div
          className="mt-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8"
          style={{ boxShadow: `0 0 30px ${productColor}08` }}
        >
          <div className="flex items-center gap-3 mb-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: `${productColor}20` }}
            >
              <RocketLaunchIcon className="w-5 h-5" style={{ color: productColor }} />
            </div>
            <div className="text-2xl font-semibold text-white">{p.footerCta.title}</div>
          </div>
          <div className="text-white/60">{p.footerCta.text}</div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href={p.footerCta.primary.href}
              className="rounded-xl px-5 py-2.5 text-sm font-semibold text-white transition-colors"
              style={{ backgroundColor: productColor }}
            >
              {p.footerCta.primary.label}
            </Link>

            {p.footerCta.secondary ? (
              <Link
                href={p.footerCta.secondary.href}
                className="rounded-xl border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
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
