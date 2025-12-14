"use client";

import Link from "next/link";
import {
  type AppConfig,
} from "@/config/apps_config";
import { getSolutionsByIds } from "@/config/solutions_config";
import { getIndustriesByIds } from "@/config/industries_config";
import { getRelatedAppsForApp } from "@/config/relationships";

type Props = {
  app: AppConfig;
};

export function AppRelationsStrip({ app }: Props) {
  // Use weighted helpers - they handle both new weighted relations and legacy fields
  const pairedApps = getRelatedAppsForApp(app.id);
  
  // For solutions, extract from weighted relations or fall back to legacy
  let pairedSolutions: ReturnType<typeof getSolutionsByIds> = [];
  if (app.solutions && app.solutions.length > 0) {
    const solutionIds = app.solutions.map((rel) => rel.solutionId);
    pairedSolutions = getSolutionsByIds(solutionIds);
  } else if (app.pairsWithSolutions && app.pairsWithSolutions.length > 0) {
    pairedSolutions = getSolutionsByIds(app.pairsWithSolutions);
  } else if (app.recommendedSolutionIds && app.recommendedSolutionIds.length > 0) {
    pairedSolutions = getSolutionsByIds(app.recommendedSolutionIds);
  }
  
  // For industries, extract from weighted relations or fall back to legacy
  let industries: ReturnType<typeof getIndustriesByIds> = [];
  if (app.industries && app.industries.length > 0) {
    const industryIds = app.industries.map((rel) => rel.industryId);
    industries = getIndustriesByIds(industryIds);
  } else if (app.appearsInIndustries && app.appearsInIndustries.length > 0) {
    industries = getIndustriesByIds(app.appearsInIndustries);
  } else if (app.recommendedIndustryIds && app.recommendedIndustryIds.length > 0) {
    industries = getIndustriesByIds(app.recommendedIndustryIds);
  }

  const showAnything =
    pairedApps.length || pairedSolutions.length || industries.length;

  if (!showAnything) return null;

  return (
    <section className="py-10 border-t border-slate-800 bg-slate-950/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Title row */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
          <div>
            <p className="text-xs font-semibold tracking-[0.25em] uppercase text-emerald-400 mb-1">
              Connected Stack
            </p>
            <h2 className="text-lg md:text-xl font-semibold text-slate-50">
              {app.label} pairs best with these apps, solutions, and industries.
            </h2>
          </div>
          <p className="text-xs text-slate-400 max-w-md">
            All relationships come from config, so your stack stays in sync as
            you add new apps and industries.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Pairs with Apps */}
          {pairedApps.length > 0 && (
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 shadow-lg shadow-emerald-500/10">
              <h3 className="text-xs font-semibold tracking-wide text-slate-300 mb-3 flex items-center gap-2">
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/10 text-[0.6rem] text-emerald-300">
                  Apps
                </span>
                Pairs well with these Apps
              </h3>
              <div className="flex flex-wrap gap-2">
                {pairedApps.map((a) => (
                  <Link
                    key={a.id}
                    href={a.href}
                    className="inline-flex items-center rounded-full border border-slate-700 bg-slate-900/80 px-3 py-1 text-xs text-slate-100 hover:border-emerald-400 hover:text-emerald-200 hover:bg-slate-900 transition-colors"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 mr-2" />
                    {a.label}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Pairs with Solutions */}
          {pairedSolutions.length > 0 && (
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 shadow-lg shadow-blue-500/10">
              <h3 className="text-xs font-semibold tracking-wide text-slate-300 mb-3 flex items-center gap-2">
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-sky-500/10 text-[0.6rem] text-sky-300">
                  Solutions
                </span>
                Pairs well with these Solutions
              </h3>
              <div className="flex flex-wrap gap-2">
                {pairedSolutions.map((s) => (
                  <Link
                    key={s.id}
                    href={s.href}
                    className="inline-flex items-center rounded-full border border-slate-700 bg-slate-900/80 px-3 py-1 text-xs text-slate-100 hover:border-sky-400 hover:text-sky-200 hover:bg-slate-900 transition-colors"
                  >
                    {s.label}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Appears in Industries */}
          {industries.length > 0 && (
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 shadow-lg shadow-amber-500/10">
              <h3 className="text-xs font-semibold tracking-wide text-slate-300 mb-3 flex items-center gap-2">
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-amber-500/10 text-[0.6rem] text-amber-300">
                  Industries
                </span>
                Appears in these Industries
              </h3>
              <div className="flex flex-wrap gap-2">
                {industries.map((i) => (
                  <Link
                    key={i.id}
                    href={i.href}
                    className="inline-flex items-center rounded-full border border-slate-700 bg-slate-900/80 px-3 py-1 text-xs text-slate-100 hover:border-amber-400 hover:text-amber-200 hover:bg-slate-900 transition-colors"
                  >
                    {i.label}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

