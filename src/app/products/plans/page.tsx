import Link from "next/link";
import { PRODUCT_PRICING } from "@/config/pricing";

type Plan = {
  name: string;
  description: string;
  price: string;
  bullets: string[];
  cta: { label: string; href: string; disabled?: boolean };
  badge?: string;
};

const PLANS: Plan[] = [
  {
    name: "SecureVault Docs",
    description: "Secure document storage for your business.",
    price: PRODUCT_PRICING["SecureVault Docs"].price,
    bullets: [
      "Upload and organize documents",
      "Fast search and tagging",
      "Client-friendly sharing (later)",
      "Simple vault structure",
    ],
    cta: { label: "View details", href: "/products/securevault-docs" },
    badge: "Popular",
  },
  {
    name: "OMG-CRM",
    description: "Manage leads and clients in one place.",
    price: PRODUCT_PRICING["OMG-CRM"].price,
    bullets: [
      "Track leads and follow-ups",
      "Simple pipeline stages",
      "Notes and tasks",
      "Cleaner client management",
    ],
    cta: { label: "View details", href: "/products/omg-crm" },
  },
  {
    name: "OMG-Leads",
    description: "Capture leads and keep the pipeline moving.",
    price: PRODUCT_PRICING["OMG-Leads"].price,
    bullets: [
      "Lead capture + tracking",
      "Basic workflows (later)",
      "Source tracking",
      "Team-ready structure",
    ],
    cta: { label: "View details", href: "/products/omg-leads" },
  },
  {
    name: "OMG-IQ",
    description: "Daily updates that tell you what matters today.",
    price: PRODUCT_PRICING["OMG-IQ"].price,
    bullets: [
      "Daily brief in one place",
      "Industry filters (later)",
      "Save what matters",
      "Share with your team (later)",
    ],
    cta: { label: "View details", href: "/products/omg-iq" },
  },
  {
    name: "OMG-AI-Mastery",
    description: "Learn AI step-by-step for real business results.",
    price: PRODUCT_PRICING["OMG-AI-Mastery"].price,
    bullets: [
      "Simple lessons",
      "Real business examples",
      "Templates and prompts",
      "Weekly practice plan",
    ],
    cta: { label: "View details", href: "/products/omg-ai-mastery" },
  },
];

export default function PlansPage() {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      <header className="border-b border-zinc-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5">
          <div>
            <div className="text-sm text-zinc-500">OMG Systems</div>
            <div className="text-2xl font-semibold">Plans</div>
          </div>

          <Link
            href="/portal/client"
            className="rounded-xl border border-zinc-200 bg-white px-4 py-2 text-sm font-semibold hover:bg-zinc-50"
          >
            Back to Portal
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8">
        <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
          <div className="text-3xl font-semibold">Pick what you need.</div>
          <div className="mt-2 text-sm text-zinc-600">
            Monthly pricing for Week 1. Simple and clean. (Annual comes next.)
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            <span className="rounded-full bg-zinc-100 px-3 py-1 text-sm text-zinc-700">
              ✅ Cancel anytime
            </span>
            <span className="rounded-full bg-zinc-100 px-3 py-1 text-sm text-zinc-700">
              🔒 Secure payments
            </span>
            <span className="rounded-full bg-zinc-100 px-3 py-1 text-sm text-zinc-700">
              ⚡ Instant access after purchase
            </span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {PLANS.map((p) => (
            <div
              key={p.name}
              className="relative rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm"
            >
              {p.badge ? (
                <div className="absolute right-4 top-4 rounded-full bg-zinc-900 px-3 py-1 text-xs font-semibold text-white">
                  {p.badge}
                </div>
              ) : null}

              <div className="text-lg font-semibold">{p.name}</div>
              <div className="mt-1 text-sm text-zinc-600">{p.description}</div>

              <div className="mt-4 text-3xl font-semibold">{p.price}</div>
              <div className="mt-1 text-sm text-zinc-500">
                You can change plans later.
              </div>

              <ul className="mt-5 space-y-2 text-sm text-zinc-700">
                {p.bullets.map((b) => (
                  <li key={b} className="flex gap-2">
                    <span>•</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex gap-2">
                <Link
                  href={p.cta.href}
                  className="inline-flex w-full items-center justify-center rounded-xl bg-zinc-900 px-4 py-2 text-sm font-semibold text-white hover:bg-zinc-800"
                >
                  {p.cta.label}
                </Link>
              </div>

              <div className="mt-3 text-xs text-zinc-500">
                Week 1 note: add Stripe checkout links later.
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
