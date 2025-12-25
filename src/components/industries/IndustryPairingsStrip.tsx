// src/components/industries/IndustryPairingsStrip.tsx
"use client";

import Link from "next/link";
import type { IndustryConfig } from "@/config/industries_config";
import { getAppsByIds } from "@/config/apps_config";
import { getSolutionsByIds } from "@/config/solutions_config";

type Props = {
  industry: IndustryConfig;
};

export function IndustryPairingsStrip({ industry }: Props) {
  // Extract appIds from apps array (each item has appId property)
  const appRelations = industry.apps ?? industry.recommendedApps ?? [];
  const appIds = appRelations.map((rel) => rel.appId);

  // Extract solutionIds from recommendedSolutions array (each item has solutionId property)
  const solutionRelations = industry.recommendedSolutions ?? industry.solutions ?? [];
  const solutionIds = solutionRelations.map((rel) => rel.solutionId);

  if (appIds.length === 0 && solutionIds.length === 0) {
    return null;
  }

  const apps = appIds.length ? getAppsByIds(appIds) : [];
  const solutions = solutionIds.length ? getSolutionsByIds(solutionIds) : [];

  return (
    <section className="py-10 bg-slate-950 border-y border-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
          {/* Intro column */}
          <div className="max-w-sm">
            <p className="text-[11px] uppercase tracking-[0.22em] text-emerald-400 mb-2">
              Recommended stack
            </p>
            <h3 className="text-lg md:text-xl font-semibold text-white mb-2">
              How {industry.label} teams usually run OMGsystems
            </h3>
            <p className="text-sm text-slate-400">
              These are the apps and solutions we normally pair together for{" "}
              {industry.label.toLowerCase()} so your leads, documents, and
              workflows all move in one flow.
            </p>
          </div>

          {/* Apps + Solutions columns */}
          <div className="flex-1 grid md:grid-cols-2 gap-6">
            {/* Apps column */}
            {apps.length > 0 && (
              <div>
                <h4 className="text-xs font-semibold text-slate-200 mb-3 flex items-center gap-2">
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-violet-500/10 border border-violet-400/60 text-[10px] text-violet-300">
                    1
                  </span>
                  Recommended Apps
                </h4>
                <div className="flex flex-wrap gap-2">
                  {apps.map((app) => (
                    <Link
                      key={app.id}
                      href={app.href}
                      className="group inline-flex flex-col items-start justify-between rounded-2xl border border-slate-800 bg-slate-900/80 px-3 py-2 hover:border-violet-400/70 hover:bg-slate-900 transition-colors min-w-[9rem]"
                    >
                      <span className="text-[11px] font-semibold text-slate-100">
                        {app.label}
                      </span>
                      <span className="text-[11px] text-slate-400 group-hover:text-violet-200 line-clamp-2">
                        {app.tagline}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Solutions column */}
            {solutions.length > 0 && (
              <div>
                <h4 className="text-xs font-semibold text-slate-200 mb-3 flex items-center gap-2">
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-400/60 text-[10px] text-emerald-300">
                    2
                  </span>
                  Recommended Solutions
                </h4>
                <div className="flex flex-wrap gap-2">
                  {solutions.map((solution) => (
                    <Link
                      key={solution.id}
                      href={solution.href}
                      className="group inline-flex flex-col items-start justify-between rounded-2xl border border-slate-800 bg-slate-900/80 px-3 py-2 hover:border-emerald-400/70 hover:bg-slate-900 transition-colors min-w-[9rem]"
                    >
                      <span className="text-[11px] font-semibold text-slate-100">
                        {solution.label}
                      </span>
                      <span className="text-[11px] text-slate-400 group-hover:text-emerald-200 line-clamp-2">
                        {solution.shortTagline}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

