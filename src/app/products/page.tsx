"use client";

import Link from "next/link";
import { PRODUCT_PRICING } from "@/config/pricing";
import {
  DocumentTextIcon,
  UserGroupIcon,
  ChartBarIcon,
  LightBulbIcon,
  AcademicCapIcon,
  CubeIcon,
  ClockIcon,
  BoltIcon,
  WrenchScrewdriverIcon,
  CheckIcon,
  SparklesIcon,
  ShieldCheckIcon,
  RocketLaunchIcon,
} from "@heroicons/react/24/outline";

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
  detailsHref?: string;
  badge?: string;
  comingSoon?: boolean;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
};

const PRODUCTS: ProductCard[] = [
  {
    key: "securevault_docs",
    name: "SecureVault Docs",
    description: "Secure storage for your most important business documents.",
    detailsHref: "/products/securevault-docs",
    badge: "Popular",
    icon: DocumentTextIcon,
    color: "#47BD79",
  },
  {
    key: "omg_crm",
    name: "OMG-CRM",
    description: "Track leads, clients, and follow-ups in one clean system.",
    detailsHref: "/products/omg-crm",
    icon: UserGroupIcon,
    color: "#3B82F6",
  },
  {
    key: "omg_leads",
    name: "OMG-Leads",
    description: "Capture leads and track what's driving growth.",
    detailsHref: "/products/omg-leads",
    icon: ChartBarIcon,
    color: "#A855F7",
  },
  {
    key: "omg_iq",
    name: "OMG-IQ",
    description: "Daily business updates—quick scan, better decisions.",
    detailsHref: "/products/omg-iq",
    icon: LightBulbIcon,
    color: "#F59E0B",
  },
  {
    key: "omg_ai_mastery",
    name: "OMG-AI-Mastery",
    description: "Learn AI step-by-step and actually use it daily.",
    detailsHref: "/products/omg-ai-mastery",
    icon: AcademicCapIcon,
    color: "#EC4899",
  },
  {
    key: "omg_build",
    name: "OMG Build",
    description: "Build workflows and AI tools for your business.",
    detailsHref: "/products/omg-build",
    icon: CubeIcon,
    color: "#06B6D4",
  },
  {
    key: "timeguard_ai",
    name: "Timeguard-AI",
    description: "AI time tracking and focus support for your team.",
    detailsHref: "/products/timeguard-ai",
    icon: ClockIcon,
    color: "#8B5CF6",
  },
  {
    key: "automations",
    name: "Automations",
    description: "Automations that save you hours every week.",
    detailsHref: "/products/automations",
    icon: BoltIcon,
    color: "#10B981",
  },
  {
    key: "custom_solutions",
    name: "Custom Solutions",
    description: "Done-for-you builds customized to your workflow.",
    detailsHref: "/products/custom-solutions",
    icon: WrenchScrewdriverIcon,
    color: "#F97316",
  },
];

function getPriceLine(productName: string) {
  const p = (PRODUCT_PRICING as any)[productName];
  if (!p) return null;
  return `${p.price} • ${p.note || "Cancel anytime"}`;
}

function getBuyNowLink(key: ProductCard["key"]) {
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
    <div className="min-h-screen bg-black text-white">
      {/* Top bar */}
      <header className="sticky top-0 z-30 border-b border-white/10 bg-black/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div className="flex flex-col">
            <div className="text-sm text-white/50">OMG Systems</div>
            <div className="text-xl font-semibold text-white">Products</div>
          </div>

          <div className="flex items-center gap-3">
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
          style={{ boxShadow: "0 0 40px rgba(71, 189, 121, 0.1)" }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-[#47BD79]/20 flex items-center justify-center">
              <SparklesIcon className="w-6 h-6 text-[#47BD79]" />
            </div>
            <div>
              <div className="text-3xl font-bold text-white">Everything in one ecosystem.</div>
            </div>
          </div>
          <div className="text-white/60">
            Browse tools. Buy in one click. Add more when you're ready.
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/10 px-4 py-2 text-sm text-white">
              <CheckIcon className="w-4 h-4 text-[#47BD79]" />
              Cancel anytime
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/10 px-4 py-2 text-sm text-white">
              <ShieldCheckIcon className="w-4 h-4 text-[#3B82F6]" />
              Secure checkout
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/10 px-4 py-2 text-sm text-white">
              <RocketLaunchIcon className="w-4 h-4 text-[#A855F7]" />
              Instant access after purchase
            </span>
          </div>
        </div>

        {/* Grid */}
        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {PRODUCTS.map((p) => {
            const priceLine = getPriceLine(p.name);
            const buyNow = getBuyNowLink(p.key);
            const IconComponent = p.icon;

            return (
              <div
                key={p.key}
                className="group relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 hover:border-white/20 transition-all"
                style={{ boxShadow: `0 0 20px ${p.color}10` }}
              >
                {p.badge && (
                  <div
                    className="absolute right-4 top-4 rounded-full px-3 py-1 text-xs font-semibold"
                    style={{
                      backgroundColor: p.badge === "Popular" ? `${p.color}20` : "rgba(255,255,255,0.1)",
                      color: p.badge === "Popular" ? p.color : "rgba(255,255,255,0.6)",
                      border: `1px solid ${p.badge === "Popular" ? `${p.color}30` : "rgba(255,255,255,0.1)"}`,
                    }}
                  >
                    {p.badge}
                  </div>
                )}

                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${p.color}20` }}
                >
                  <IconComponent className="w-6 h-6" style={{ color: p.color }} />
                </div>

                <div className="text-lg font-semibold text-white">{p.name}</div>
                <div className="mt-2 text-sm text-white/60">{p.description}</div>

                {priceLine ? (
                  <div
                    className="mt-4 inline-flex rounded-full px-4 py-1.5 text-sm font-semibold"
                    style={{ backgroundColor: `${p.color}20`, color: p.color }}
                  >
                    {priceLine}
                  </div>
                ) : (
                  <div className="mt-4 inline-flex rounded-full bg-white/10 px-4 py-1.5 text-sm text-white/60">
                    Contact for pricing
                  </div>
                )}

                <div className="mt-6 flex flex-wrap gap-2">
                  {buyNow ? (
                    <a
                      href={buyNow}
                      className="rounded-xl px-4 py-2 text-sm font-semibold text-white transition-colors"
                      style={{ backgroundColor: p.color }}
                    >
                      Buy Now
                    </a>
                  ) : (
                    <Link
                      href={p.detailsHref || "#"}
                      className="rounded-xl px-4 py-2 text-sm font-semibold text-white transition-colors"
                      style={{ backgroundColor: p.color }}
                    >
                      Learn More
                    </Link>
                  )}

                  {p.detailsHref && (
                    <Link
                      href={p.detailsHref}
                      className="rounded-xl border border-white/20 bg-white/5 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
                    >
                      View details
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div
          className="mt-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8"
          style={{ boxShadow: "0 0 30px rgba(71, 189, 121, 0.08)" }}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-[#A855F7]/20 flex items-center justify-center">
              <RocketLaunchIcon className="w-5 h-5 text-[#A855F7]" />
            </div>
            <div className="text-xl font-semibold text-white">Want the fastest wins?</div>
          </div>
          <div className="text-white/60">
            Start with SecureVault Docs + OMG-CRM. That gives you organization + follow-up in the same week.
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/products/plans"
              className="rounded-xl bg-[#47BD79] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#3da968] transition-colors"
            >
              View Plans
            </Link>
            <Link
              href="/portal/client"
              className="rounded-xl border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
            >
              Back to Portal
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
