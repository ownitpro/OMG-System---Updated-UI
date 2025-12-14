// app/industries/[slug]/page.tsx

import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  industriesConfig,
  getIndustryBySlug,
} from "@/config/industries_config";
import { getSolutionsByIds } from "@/config/solutions_config";
import { getAppsByIds } from "@/config/apps_config";
import { IndustryPairingsStrip } from "@/components/industries/IndustryPairingsStrip";
import { IndustryRecommendedStack } from "@/components/industries/IndustryRecommendedStack";

type IndustryPageProps = {
  params: Promise<{ slug: string }>;
};

// Static generation for production (dev mode will still work dynamically)
// Note: In Next.js 16, these must be static strings, so we use 'auto' for dev/prod compatibility
export const dynamic = 'auto';
export const revalidate = 3600; // ISR with 1 hour revalidation

export function generateStaticParams() {
  return industriesConfig.map((industry) => ({
    slug: industry.slug,
  }));
}

export async function generateMetadata({
  params,
}: IndustryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const industry = getIndustryBySlug(slug);

  if (!industry) {
    return {
      title: "Industry Not Found | OMGsystems",
    };
  }

  return {
    title: `${industry.heroTitle} | OMGsystems`,
    description: industry.description,
    keywords: `${industry.label.toLowerCase()} automation, ${industry.label.toLowerCase()} CRM, ${industry.label.toLowerCase()} software`,
    openGraph: {
      title: `${industry.heroTitle} | OMGsystems`,
      description: industry.description,
      type: "website",
    },
    robots: "index, follow",
    alternates: {
      canonical: `https://www.omgsystems.com/industries/${industry.slug}`,
    },
  };
}

export default async function IndustryPage({ params }: IndustryPageProps) {
  const { slug } = await params;

  const industry = getIndustryBySlug(slug);

  if (!industry) {
    return notFound();
  }

  const recommendedSolutions = getSolutionsByIds(industry.recommendedSolutionIds ?? []);
  const recommendedApps = getAppsByIds(industry.recommendedAppIds ?? []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-50">
      <section className="mx-auto flex max-w-5xl flex-col gap-10 px-4 py-16 sm:px-6 lg:px-8">
        {/* HERO */}
        <header className="space-y-4">
          <p className="inline-flex items-center rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-emerald-300">
            Industry Focused · {industry.label}
          </p>
          <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
            {industry.heroTitle}
          </h1>
          <p className="max-w-3xl text-sm text-slate-300 sm:text-base">
            {industry.heroSubtitle}
          </p>

          <div className="mt-4 flex flex-wrap gap-3 text-xs">
            <Link
              href="/solutions/custom-solutions"
              className="inline-flex items-center rounded-full bg-emerald-500 px-4 py-2 font-semibold text-slate-950 hover:bg-emerald-400"
            >
              Talk about my systems
            </Link>
            <Link
              href="/try-live-demo"
              className="inline-flex items-center rounded-full border border-emerald-400/70 px-4 py-2 font-medium text-emerald-200 hover:bg-emerald-500/10"
            >
              Explore live demos
            </Link>
          </div>
        </header>

        {/* SUMMARY BLOCK */}
        <section className="rounded-2xl border border-white/10 bg-white/5 p-6 text-sm text-slate-200 backdrop-blur">
          <h2 className="text-base font-semibold text-slate-50">
            How we help {industry.label} teams
          </h2>
          <p className="mt-2 text-sm text-slate-300">{industry.description}</p>
        </section>

        {/* 🔹 NEW: "Recommended Apps + Solutions" strip */}
        <IndustryPairingsStrip industry={industry} />

        {/* Recommended Apps & Solutions with badges */}
        <IndustryRecommendedStack industry={industry} />

        {/* RECOMMENDED SOLUTIONS */}
        {recommendedSolutions.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-lg font-semibold sm:text-xl">
              Recommended Solutions for {industry.label}
            </h2>
            <p className="text-sm text-slate-300 max-w-3xl">
              These solutions are the fastest way to automate busywork and
              create a smoother experience for your {industry.label.toLowerCase()} clients.
            </p>

            <div className="grid gap-6 md:grid-cols-3">
              {recommendedSolutions.map((solution) => (
                <Link
                  key={solution.id}
                  href={solution.href}
                  className="group block bg-slate-900/70 border border-slate-800 rounded-2xl p-6 hover:border-emerald-400/70 hover:-translate-y-1 hover:shadow-lg hover:shadow-emerald-500/10 transition-all duration-200"
                >
                  <p className="text-xs uppercase tracking-[0.2em] text-emerald-400 mb-2">
                    Solution
                  </p>
                  <h3 className="text-lg font-semibold mb-1">
                    {solution.label}
                  </h3>
                  <p className="text-emerald-300 text-sm mb-3">
                    {solution.shortTagline}
                  </p>
                  <p className="text-slate-400 text-sm mb-4 line-clamp-3">
                    {solution.summary}
                  </p>
                  <span className="inline-flex items-center text-emerald-400 text-sm font-medium group-hover:gap-2 transition-all">
                    Learn more
                    <span aria-hidden>→</span>
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* RECOMMENDED APPS */}
        {recommendedApps.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-lg font-semibold sm:text-xl">
              Recommended Apps for {industry.label}
            </h2>
            <p className="text-sm text-slate-300 max-w-3xl">
              These OMGsystems apps plug directly into your workflows so your
              team spends more time serving clients and less time chasing
              details.
            </p>

            <div className="grid gap-6 md:grid-cols-3">
              {recommendedApps.map((app) => (
                <Link
                  key={app.id}
                  href={app.href}
                  className="group block bg-slate-900/70 border border-slate-800 rounded-2xl p-6 hover:border-lime-400/70 hover:-translate-y-1 hover:shadow-lg hover:shadow-lime-400/10 transition-all duration-200"
                >
                  <p className="text-xs uppercase tracking-[0.2em] text-lime-300 mb-2">
                    App
                  </p>
                  <h3 className="text-lg font-semibold mb-1">
                    {app.label}
                  </h3>
                  <p className="text-lime-300 text-sm mb-3">
                    {app.tagline}
                  </p>
                  <p className="text-slate-400 text-sm mb-4 line-clamp-3">
                    {app.summary}
                  </p>
                  <span className="inline-flex items-center text-lime-300 text-sm font-medium group-hover:gap-2 transition-all">
                    View app
                    <span aria-hidden>→</span>
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* FINAL CTA */}
        <section className="mt-4 rounded-2xl border border-white/10 bg-white/5 px-5 py-6 text-sm text-slate-200">
          <h3 className="text-base font-semibold">
            Ready to see this working in your {industry.label} business?
          </h3>
          <p className="mt-2 text-sm text-slate-300">
            We&apos;ll map your current tools, find the bottlenecks, and plug
            in the right apps, solutions, and automations so your operations run
            smoother with less effort.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/solutions/custom-solutions"
              className="inline-flex items-center rounded-full bg-emerald-500 px-4 py-2 text-xs font-medium text-slate-950 hover:bg-emerald-400"
            >
              Book a systems review
            </Link>
            <Link
              href="/try-live-demo"
              className="inline-flex items-center rounded-full border border-emerald-400/60 px-4 py-2 text-xs font-medium text-emerald-200 hover:bg-emerald-500/10"
            >
              Explore live demos
            </Link>
          </div>
        </section>
      </section>
    </main>
  );
}
