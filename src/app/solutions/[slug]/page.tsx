// app/solutions/[slug]/page.tsx

import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  solutionsConfig,
  getSolutionBySlug,
} from "@/config/solutions_config";
import { appsConfig } from "@/config/apps_config";
import { SolutionRelationsStrip } from "@/components/solutions/SolutionRelationsStrip";
import { getAppsForSolution, getSolutionBadgeLabel } from "@/config/relationships";
import { RelationBadge } from "@/components/ui/RelationBadge";
import { RelationLegend } from "@/components/ui/RelationLegend";

type SolutionsPageProps = {
  params: Promise<{ slug: string }>;
};

// Static generation for production (dev mode will still work dynamically)
// Note: In Next.js 16, these must be static strings, so we use 'auto' for dev/prod compatibility
export const dynamic = 'auto';
export const revalidate = 3600; // ISR with 1 hour revalidation

export function generateStaticParams() {
  // Pre-generate pages: timeguard-ai, automations, custom-solutions
  return solutionsConfig.map((solution) => ({
    slug: solution.slug,
  }));
}

export async function generateMetadata({
  params,
}: SolutionsPageProps): Promise<Metadata> {
  const { slug } = await params;
  const solution = getSolutionBySlug(slug);

  if (!solution) {
    return {
      title: "Solution Not Found | OMGsystems",
    };
  }

  return {
    title: `${solution.label} | OMGsystems`,
    description: solution.summary,
    keywords: `${solution.label.toLowerCase()}, automation, business solutions, ${solution.slug}`,
    openGraph: {
      title: `${solution.label} | OMGsystems`,
      description: solution.summary,
      type: "website",
    },
    robots: "index, follow",
    alternates: {
      canonical: `https://www.omgsystems.com/solutions/${solution.slug}`,
    },
  };
}

export default async function SolutionPage({ params }: SolutionsPageProps) {
  const { slug } = await params;

  const solution = getSolutionBySlug(slug);

  if (!solution) {
    return notFound();
  }

  const featuredApps = solution.featuredApps
    ? appsConfig.filter((app) => solution.featuredApps!.includes(app.id))
    : [];

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-50">
      <section className="mx-auto flex max-w-5xl flex-col gap-10 px-4 py-16 sm:px-6 lg:px-8">
        {/* HERO */}
        <header className="max-w-3xl space-y-4">
          <p className="inline-flex items-center rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-200">
            Solution · {solution.label}
            {solution.badge && (
              <span className="ml-2 rounded-full bg-emerald-500 px-2 py-0.5 text-[10px] font-semibold text-slate-950">
                {solution.badge}
              </span>
            )}
          </p>
          <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
            {solution.label}
          </h1>
          <p className="text-sm text-slate-300 sm:text-base">
            {solution.summary}
          </p>

          <div className="mt-4 flex flex-wrap gap-3 text-xs">
            {solution.id === "ai_scheduler" && (
              <>
                <Link
                  href="/contact"
                  className="inline-flex items-center rounded-full bg-emerald-500 px-4 py-2 font-semibold text-slate-950 hover:bg-emerald-400"
                >
                  Talk about AI scheduling for my clinic
                </Link>
                <Link
                  href="/try-live-demo"
                  className="inline-flex items-center rounded-full border border-emerald-400/70 px-4 py-2 font-medium text-emerald-200 hover:bg-emerald-500/10"
                >
                  Try CRM + SVD demos
                </Link>
              </>
            )}

            {solution.id === "automations" && (
              <Link
                href="/solutions/custom-solutions"
                className="inline-flex items-center rounded-full bg-emerald-500 px-4 py-2 font-semibold text-slate-950 hover:bg-emerald-400"
              >
                Book an automation mapping call
              </Link>
            )}

            {solution.id === "custom_solutions" && (
              <>
                <Link
                  href="/contact"
                  className="inline-flex items-center rounded-full bg-emerald-500 px-4 py-2 font-semibold text-slate-950 hover:bg-emerald-400"
                >
                  Schedule a systems review
                </Link>
                <Link
                  href="/try-live-demo"
                  className="inline-flex items-center rounded-full border border-emerald-400/70 px-4 py-2 font-medium text-emerald-200 hover:bg-emerald-500/10"
                >
                  Explore live demos
                </Link>
              </>
            )}
          </div>
        </header>

        {/* WHO IT HELPS + OUTCOMES */}
        {(solution.whoItHelps?.length || solution.keyOutcomes?.length) && (
          <section className="grid gap-6 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur md:grid-cols-[1.3fr,1fr]">
            {solution.whoItHelps && solution.whoItHelps.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold sm:text-xl">
                  Who this is built for
                </h2>
                <ul className="mt-3 space-y-2 text-sm text-slate-200">
                  {solution.whoItHelps.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {solution.keyOutcomes && solution.keyOutcomes.length > 0 && (
              <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-xs text-emerald-50">
                <p className="font-medium">What you can expect</p>
                <ul className="mt-3 space-y-1.5">
                  {solution.keyOutcomes.map((outcome) => (
                    <li key={outcome}>• {outcome}</li>
                  ))}
                </ul>
              </div>
            )}
          </section>
        )}

        {/* RECOMMENDED APPS WITH BADGES */}
        {(() => {
          const recommendedApps = getAppsForSolution(solution.id);
          
          if (recommendedApps.length === 0) return null;
          
          return (
            <section className="space-y-4">
              <h2 className="text-lg font-semibold sm:text-xl">
                Works Best With These Apps
              </h2>
              <p className="text-sm text-slate-300">
                These apps pair best with {solution.label} based on your config.
              </p>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {recommendedApps.map((app) => {
                  const relation = app.relation;
                  const badgeLabel = getSolutionBadgeLabel(relation);

                  return (
                    <div
                      key={app.id}
                      className="flex flex-col justify-between rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <p className="text-xs font-medium uppercase tracking-wide text-emerald-300">
                            OMG App
                          </p>
                          <RelationBadge
                            label={badgeLabel}
                            priority={relation?.priority}
                            className="text-[10px] px-2 py-0.5"
                          />
                        </div>
                        <h3 className="mt-1 text-base font-semibold">
                          {app.label}
                        </h3>
                        <p className="mt-1 text-xs font-semibold text-emerald-300">
                          {app.tagline}
                        </p>
                        <p className="mt-2 text-sm text-slate-300">
                          {app.summary}
                        </p>
                      </div>
                      <div className="mt-4 flex flex-wrap gap-2 text-xs">
                        <Link
                          href={app.href}
                          className="inline-flex items-center rounded-full bg-emerald-500 px-3 py-1.5 font-semibold text-slate-950 hover:bg-emerald-400"
                        >
                          View {app.label}
                        </Link>

                        {app.id === "crm" && (
                          <Link
                            href="/apps/demo/crm"
                            className="inline-flex items-center rounded-full border border-emerald-400/60 px-3 py-1.5 font-medium text-emerald-200 hover:bg-emerald-500/10"
                          >
                            Try CRM demo
                          </Link>
                        )}

                        {app.id === "svd" && (
                          <Link
                            href="/apps/demo/securevault-docs"
                            className="inline-flex items-center rounded-full border border-emerald-400/60 px-3 py-1.5 font-medium text-emerald-200 hover:bg-emerald-500/10"
                          >
                            Try SVD demo
                          </Link>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <RelationLegend className="mt-6" />
            </section>
          );
        })()}

        {/* Solution Relations Strip */}
        <SolutionRelationsStrip solutionId={solution.id} />

        {/* FINAL CTA */}
        <section className="mt-4 rounded-2xl border border-white/10 bg-white/5 px-5 py-6 text-sm text-slate-200">
          <h3 className="text-base font-semibold">
            Ready to see this inside your business?
          </h3>
          <p className="mt-2 text-sm text-slate-300">
            We&apos;ll map your current tools, find the gaps, and design a{" "}
            {solution.label.toLowerCase()} plan that fits the way you and your
            team actually work.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/solutions/custom-solutions"
              className="inline-flex items-center rounded-full bg-emerald-500 px-4 py-2 text-xs font-medium text-slate-950 hover:bg-emerald-400"
            >
              Talk about my systems
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

