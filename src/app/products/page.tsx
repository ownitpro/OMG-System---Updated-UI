import Link from "next/link";
import { STRIPE_LINKS } from "@/config/stripeLinks";
import { PRODUCT_PRICING } from "@/config/pricing";

type ProductCard = {
  key:
    | "securevault_docs"
    | "omg_crm"
    | "omg_leads"
    | "omg_iq"
    | "omg_ai_mastery"
    | "omg_build"
    | "timeguard_ai"
    | "automations"
    | "custom_solutions";
  name: string;
  description: string;
  detailsHref?: string; // internal product page
  badge?: string; // Popular / Coming soon
  comingSoon?: boolean;
};

const PRODUCTS: ProductCard[] = [
  {
    key: "securevault_docs",
    name: "SecureVault Docs",
    description: "Secure storage for your most important business documents.",
    detailsHref: "/products/securevault-docs",
    badge: "Popular",
  },
  {
    key: "omg_crm",
    name: "OMG-CRM",
    description: "Track leads, clients, and follow-ups in one clean system.",
    detailsHref: "/products/omg-crm",
  },
  {
    key: "omg_leads",
    name: "OMG-Leads",
    description: "Capture leads and track what's driving growth.",
    detailsHref: "/products/omg-leads",
  },
  {
    key: "omg_iq",
    name: "OMG-IQ",
    description: "Daily business updates—quick scan, better decisions.",
    detailsHref: "/products/omg-iq",
  },
  {
    key: "omg_ai_mastery",
    name: "OMG-AI-Mastery",
    description: "Learn AI step-by-step and actually use it daily.",
    detailsHref: "/products/omg-ai-mastery",
  },

  // Coming soon
  {
    key: "omg_build",
    name: "OMG Build",
    description: "Build workflows and AI tools for your business.",
    badge: "Coming soon",
    comingSoon: true,
  },
  {
    key: "timeguard_ai",
    name: "Timeguard-AI",
    description: "AI time tracking and focus support for your team.",
    badge: "Coming soon",
    comingSoon: true,
  },
  {
    key: "automations",
    name: "Automations",
    description: "Automations that save you hours every week.",
    badge: "Coming soon",
    comingSoon: true,
  },
  {
    key: "custom_solutions",
    name: "Custom Solutions",
    description: "Done-for-you builds customized to your workflow.",
    badge: "Coming soon",
    comingSoon: true,
  },
];

function getPriceLine(productName: string) {
  const p = (PRODUCT_PRICING as any)[productName];
  if (!p) return null;
  return `${p.price} • ${p.note || "Cancel anytime"}`;
}

function getBuyNowLink(key: ProductCard["key"]) {
  // Map products to checkout start page (with coupon support)
  const map: Partial<Record<ProductCard["key"], string>> = {
    securevault_docs: "/checkout/start?product=securevault-docs",
    omg_crm: "/checkout/start?product=omg-crm",
    omg_leads: "/checkout/start?product=omg-leads",
    omg_iq: "/checkout/start?product=omg-iq",
    omg_ai_mastery: "/checkout/start?product=omg-ai-mastery",
  };
  return map[key];
}

export default function ProductsHubPage() {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      {/* Top bar */}
      <header className="sticky top-0 z-30 border-b border-zinc-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div className="flex flex-col">
            <div className="text-sm text-zinc-500">OMG Systems</div>
            <div className="text-xl font-semibold">Products</div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/products/plans"
              className="rounded-xl bg-zinc-900 px-4 py-2 text-sm font-semibold text-white hover:bg-zinc-800"
            >
              View Plans
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
          <div className="text-3xl font-semibold">Everything in one ecosystem.</div>
          <div className="mt-2 text-sm text-zinc-600">
            Browse tools. Buy in one click. Add more when you're ready.
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            <span className="rounded-full bg-zinc-100 px-3 py-1 text-sm text-zinc-700">
              ✅ Cancel anytime
            </span>
            <span className="rounded-full bg-zinc-100 px-3 py-1 text-sm text-zinc-700">
              🔒 Secure checkout
            </span>
            <span className="rounded-full bg-zinc-100 px-3 py-1 text-sm text-zinc-700">
              ⚡ Instant access after purchase
            </span>
          </div>
        </div>

        {/* Grid */}
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {PRODUCTS.map((p) => {
            const priceLine = getPriceLine(p.name);
            const buyNow = !p.comingSoon ? getBuyNowLink(p.key) : undefined;

            return (
              <div
                key={p.key}
                className="relative rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm"
              >
                {p.badge ? (
                  <div className="absolute right-4 top-4 rounded-full bg-zinc-100 px-3 py-1 text-xs font-semibold text-zinc-700">
                    {p.badge}
                  </div>
                ) : null}

                <div className="text-lg font-semibold">{p.name}</div>
                <div className="mt-2 text-sm text-zinc-600">{p.description}</div>

                {priceLine ? (
                  <div className="mt-4 inline-flex rounded-full bg-zinc-900 px-3 py-1 text-sm font-semibold text-white">
                    {priceLine}
                  </div>
                ) : (
                  <div className="mt-4 inline-flex rounded-full bg-zinc-100 px-3 py-1 text-sm text-zinc-700">
                    Pricing coming soon
                  </div>
                )}

                <div className="mt-6 flex flex-wrap gap-2">
                  {p.comingSoon ? (
                    <button
                      disabled
                      className="rounded-xl bg-zinc-200 px-4 py-2 text-sm font-semibold text-zinc-500"
                    >
                      Coming Soon
                    </button>
                  ) : buyNow ? (
                    <a
                      href={buyNow}
                      className="rounded-xl bg-zinc-900 px-4 py-2 text-sm font-semibold text-white hover:bg-zinc-800"
                    >
                      Buy Now
                    </a>
                  ) : (
                    <button
                      disabled
                      className="rounded-xl bg-zinc-200 px-4 py-2 text-sm font-semibold text-zinc-500"
                    >
                      Buy Now
                    </button>
                  )}

                  {p.detailsHref ? (
                    <Link
                      href={p.detailsHref}
                      className="rounded-xl border border-zinc-200 bg-white px-4 py-2 text-sm font-semibold hover:bg-zinc-50"
                    >
                      View details
                    </Link>
                  ) : (
                    <button
                      disabled
                      className="rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-2 text-sm font-semibold text-zinc-400"
                    >
                      View details
                    </button>
                  )}
                </div>

                <div className="mt-4 text-xs text-zinc-500">
                  Week 1: mock Stripe links for full testing. Swap to real checkout URLs later.
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-8 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
          <div className="text-xl font-semibold">Want the fastest wins?</div>
          <div className="mt-2 text-sm text-zinc-600">
            Start with SecureVault Docs + OMG-CRM. That gives you organization + follow-up in the same week.
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            <Link
              href="/products/plans"
              className="rounded-xl bg-zinc-900 px-4 py-2 text-sm font-semibold text-white hover:bg-zinc-800"
            >
              View Plans
            </Link>
            <Link
              href="/portal/client"
              className="rounded-xl border border-zinc-200 bg-white px-4 py-2 text-sm font-semibold hover:bg-zinc-50"
            >
              Back to Portal
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
