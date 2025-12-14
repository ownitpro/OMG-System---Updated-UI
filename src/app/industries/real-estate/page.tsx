// app/industries/real-estate/page.tsx

import { Metadata } from "next";
import Link from "next/link";
import { getIndustryById } from "@/config/industries_config";
import { getAppsByIds } from "@/config/apps_config";
import { IndustryPairingsStrip } from "@/components/industries/IndustryPairingsStrip";

const industry = getIndustryById("re");

export const metadata: Metadata = {
  title: "Real Estate Systems That Keep Every Lead, Client & Document on Track | OMGsystems",
  description: industry.summary,
  keywords: "real estate automation, real estate CRM, lead management, property management, real estate document management",
  openGraph: {
    title: "Real Estate Systems That Keep Every Lead, Client & Document on Track | OMGsystems",
    description: industry.summary,
    type: "website",
  },
  robots: "index, follow",
  alternates: {
    canonical: "https://www.omgsystems.com/industries/real-estate",
  },
};

export default function RealEstateIndustryPage() {
  const featuredApps = getAppsByIds(industry.recommendedAppIds ?? []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-50">
      <section className="mx-auto flex max-w-5xl flex-col gap-10 px-4 py-16 sm:px-6 lg:px-8">
        {/* HERO */}
        <header className="max-w-3xl space-y-4">
          <p className="inline-flex items-center rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-200">
            Industry Focused · {industry.label}
          </p>
          <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
            Real Estate Systems That Keep Every Lead, Client & Document on Track
          </h1>
          <p className="text-sm text-slate-300 sm:text-base">
            {industry.summary}
          </p>
        </header>

        {/* PRIMARY USE CASES */}
        <section className="grid gap-6 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur md:grid-cols-[1.3fr,1fr]">
          <div>
            <h2 className="text-lg font-semibold sm:text-xl">
              What we help real estate teams fix
            </h2>
            <p className="mt-1 text-sm text-slate-300">
              From first contact to closing, your systems should support you,
              not slow you down.
            </p>
          </div>
          <div className="flex flex-col justify-between rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-xs text-emerald-50">
            <p className="font-medium">
              Real story, real impact (typical outcome)
            </p>
            <p className="mt-2 text-emerald-100/90">
              A small team moved from scattered spreadsheets and WhatsApp chats
              to one system for leads, deals, and documents. Within 90 days:
            </p>
            <ul className="mt-3 space-y-1.5">
              <li>• 7× faster follow-up on new inquiries</li>
              <li>• 40–60% less admin time per agent</li>
              <li>• Cleaner pipeline and clearer monthly revenue picture</li>
            </ul>
            <p className="mt-3 text-emerald-100/80">
              Same humans. Better systems.
            </p>
          </div>
        </section>

        {/* 🔹 NEW: "Recommended Apps + Solutions" strip */}
        <IndustryPairingsStrip industry={industry} />

        {/* FEATURED APPS FOR REAL ESTATE */}
        {featuredApps.length > 0 && (
          <section className="space-y-4">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-lg font-semibold sm:text-xl">
                  Apps we plug into your real estate workflows
                </h2>
                <p className="text-sm text-slate-300">
                  These apps are already wired to work together for real estate
                  teams. You choose where to start; we connect the rest.
                </p>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {featuredApps.map((app) => (
                <Link
                  key={app.id}
                  href={app.href}
                  className="group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-white/5 p-5 shadow-lg shadow-emerald-500/10 backdrop-blur transition hover:-translate-y-1 hover:border-emerald-400/70 hover:bg-white/10"
                >
                  {/* Label + status */}
                  <div className="mb-3 flex items-center justify-between gap-2 text-xs">
                    <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 font-medium text-slate-100">
                      {app.label}
                    </span>
                    <span className="text-[11px] uppercase tracking-wide text-slate-400">
                      {app.status === "live" ? "Live" : "Coming Soon"}
                    </span>
                  </div>

                  {/* Tagline + summary */}
                  <div>
                    <p className="text-xs font-medium text-emerald-300">
                      {app.tagline}
                    </p>
                    <p className="mt-2 text-sm text-slate-200">
                      {app.summary}
                    </p>
                  </div>

                  {/* Real estate–specific angle */}
                  <div className="mt-4 text-xs text-slate-300">
                    {app.id === "crm" && (
                      <p>
                        Use OMGCRM to track buyers, sellers, showings, offers, and
                        conditions in one pipeline—with automated reminders.
                      </p>
                    )}
                    {app.id === "svd" && (
                      <p>
                        Use SecureVault Docs for offer docs, conditions,
                        mortgage letters, IDs, and closing packages with
                        PIN-protected portals.
                      </p>
                    )}
                    {app.id === "leads" && (
                      <p>
                        Use OMG Leads to turn portal leads, social ads, and
                        website forms into a predictable flow of qualified
                        buyers and sellers.
                      </p>
                    )}
                    {app.id === "iq" && (
                      <p>
                        Use OMG IQ to watch your pipeline, conversion rates, and
                        market trends so you&apos;re always a step ahead.
                      </p>
                    )}
                  </div>

                  {/* CTA pill */}
                  <div className="mt-5 flex items-center justify-between gap-3 text-xs">
                    <span className="text-slate-400">
                      Open {app.label} page
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 px-3 py-1 font-medium text-emerald-100 group-hover:bg-emerald-400/40">
                      Learn more
                      <span aria-hidden>↗</span>
                    </span>
                  </div>

                  {/* Glow */}
                  <div className="pointer-events-none absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br from-emerald-500/0 via-emerald-500/10 to-emerald-500/0 opacity-0 blur-2xl transition group-hover:opacity-100" />
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* FINAL CTA */}
        <section className="mt-4 rounded-2xl border border-white/10 bg-white/5 px-5 py-6 text-sm text-slate-200">
          <h3 className="text-base font-semibold">
            Want this wired into your brokerage or team?
          </h3>
          <p className="mt-2 text-sm text-slate-300">
            We&apos;ll map your current lead sources, processes, and
            bottlenecks, then plug in OMGCRM, SecureVault Docs, OMG Leads, and
            OMG IQ where they make the biggest impact.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/solutions/custom-solutions"
              className="inline-flex items-center rounded-full bg-emerald-500 px-4 py-2 text-xs font-medium text-slate-950 hover:bg-emerald-400"
            >
              Talk about my real estate systems
            </Link>
            <Link
              href="/try-live-demo"
              className="inline-flex items-center rounded-full border border-emerald-400/60 px-4 py-2 text-xs font-medium text-emerald-200 hover:bg-emerald-500/10"
            >
              Try CRM + SVD demos
            </Link>
          </div>
        </section>
      </section>
    </main>
  );
}
