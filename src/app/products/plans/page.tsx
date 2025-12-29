"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { PRODUCT_PRICING } from "@/config/pricing";
import {
  DocumentTextIcon,
  UserGroupIcon,
  ChartBarIcon,
  LightBulbIcon,
  AcademicCapIcon,
  CheckIcon,
  SparklesIcon,
  ShieldCheckIcon,
  RocketLaunchIcon,
} from "@heroicons/react/24/outline";

type Plan = {
  name: string;
  description: string;
  price: string;
  bullets: string[];
  cta: { label: string; href: string; disabled?: boolean };
  badge?: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
};

const PLANS: Plan[] = [
  {
    name: "SecureVault Docs",
    description: "Secure document storage for your business.",
    price: PRODUCT_PRICING["SecureVault Docs"].price,
    bullets: [
      "Upload and organize documents",
      "Fast search and tagging",
      "Client-friendly sharing",
      "Simple vault structure",
    ],
    cta: { label: "View details", href: "/products/securevault-docs" },
    badge: "Popular",
    icon: DocumentTextIcon,
    color: "#47BD79",
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
    icon: UserGroupIcon,
    color: "#3B82F6",
  },
  {
    name: "OMG-Leads",
    description: "Capture leads and keep the pipeline moving.",
    price: PRODUCT_PRICING["OMG-Leads"].price,
    bullets: [
      "Lead capture + tracking",
      "Basic workflows",
      "Source tracking",
      "Team-ready structure",
    ],
    cta: { label: "View details", href: "/products/omg-leads" },
    icon: ChartBarIcon,
    color: "#A855F7",
  },
  {
    name: "OMG-IQ",
    description: "Daily updates that tell you what matters today.",
    price: PRODUCT_PRICING["OMG-IQ"].price,
    bullets: [
      "Daily brief in one place",
      "Industry filters",
      "Save what matters",
      "Share with your team",
    ],
    cta: { label: "View details", href: "/products/omg-iq" },
    icon: LightBulbIcon,
    color: "#F59E0B",
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
    icon: AcademicCapIcon,
    color: "#EC4899",
  },
];

export default function PlansPage() {
  const { data: session, status } = useSession();
  const userRole = (session?.user as any)?.role;
  const isAdmin = userRole === "ADMIN" || userRole === "STAFF";
  const backToPortalHref = status === "loading" ? "/portal/client" : (isAdmin ? "/portal/admin/products" : "/portal/client");

  return (
    <div className="min-h-screen bg-[#0f172a] text-white">
      <header className="sticky top-0 z-30 border-b border-white/10 bg-[#0f172a]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div className="flex flex-col">
            <div className="text-sm text-white/50">OMG Systems</div>
            <div className="text-xl font-semibold text-white">Plans</div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/products"
              className="rounded-xl bg-[#47BD79] px-4 py-2 text-sm font-semibold text-white hover:bg-[#3da968] transition-colors"
            >
              All Products
            </Link>
            <Link
              href={backToPortalHref}
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
              <div className="text-3xl font-bold text-white">Pick what you need.</div>
            </div>
          </div>
          <div className="text-white/60">
            Monthly pricing. Simple and clean. Cancel anytime.
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/10 px-4 py-2 text-sm text-white">
              <CheckIcon className="w-4 h-4 text-[#47BD79]" />
              Cancel anytime
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/10 px-4 py-2 text-sm text-white">
              <ShieldCheckIcon className="w-4 h-4 text-[#3B82F6]" />
              Secure payments
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/10 px-4 py-2 text-sm text-white">
              <RocketLaunchIcon className="w-4 h-4 text-[#A855F7]" />
              Instant access after purchase
            </span>
          </div>
        </div>

        {/* Plans Grid */}
        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {PLANS.map((p) => {
            const IconComponent = p.icon;

            return (
              <div
                key={p.name}
                className="group relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 hover:border-white/20 transition-all"
                style={{ boxShadow: `0 0 20px ${p.color}10` }}
              >
                {p.badge && (
                  <div
                    className="absolute right-4 top-4 rounded-full px-3 py-1 text-xs font-semibold"
                    style={{
                      backgroundColor: `${p.color}20`,
                      color: p.color,
                      border: `1px solid ${p.color}30`,
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
                <div className="mt-1 text-sm text-white/60">{p.description}</div>

                <div
                  className="mt-4 inline-flex rounded-full px-4 py-1.5 text-lg font-bold"
                  style={{ backgroundColor: `${p.color}20`, color: p.color }}
                >
                  {p.price}
                </div>
                <div className="mt-2 text-sm text-white/50">
                  You can change plans later.
                </div>

                <ul className="mt-5 space-y-2 text-sm text-white/80">
                  {p.bullets.map((b) => (
                    <li key={b} className="flex gap-2 items-start">
                      <CheckIcon className="w-4 h-4 mt-0.5" style={{ color: p.color }} />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex gap-2">
                  <Link
                    href={p.cta.href}
                    className="inline-flex w-full items-center justify-center rounded-xl px-4 py-2.5 text-sm font-semibold text-white transition-colors"
                    style={{ backgroundColor: p.color }}
                  >
                    {p.cta.label}
                  </Link>
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
            <div className="text-xl font-semibold text-white">Need a custom solution?</div>
          </div>
          <div className="text-white/60">
            We can build something tailored specifically for your business. Let us know what you need.
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/products/strategy-session"
              className="rounded-xl bg-[#47BD79] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#3da968] transition-colors"
            >
              Book a Strategy Session
            </Link>
            <Link
              href="/products/custom-solutions"
              className="rounded-xl border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
            >
              Custom Solutions
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
