// src/components/apps/AppPairingsStrip.tsx
"use client";

import Link from "next/link";
import type { AppConfig } from "@/config/apps_config";
import { getSolutionsByIds } from "@/config/solutions_config";
import { getIndustriesByIds } from "@/config/industries_config";

type Props = {
  app: AppConfig;
};

export function AppPairingsStrip({ app }: Props) {
  const solutionIds = app.recommendedSolutionIds ?? [];
  const industryIds = app.recommendedIndustryIds ?? [];

  if (solutionIds.length === 0 && industryIds.length === 0) {
    return null; // nothing to show for this app yet
  }

  const solutions =
    solutionIds.length > 0 ? getSolutionsByIds(solutionIds) : [];
  const industries =
    industryIds.length > 0 ? getIndustriesByIds(industryIds) : [];

  return (
    <section className="py-10 bg-slate-950 border-y border-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
          {/* Left intro */}
          <div className="max-w-sm">
            <p className="text-[11px] uppercase tracking-[0.22em] text-emerald-400 mb-2">
              Plays nicely with others
            </p>
            <h3 className="text-lg md:text-xl font-semibold text-white mb-2">
              How teams usually run {app.label}
            </h3>
            <p className="text-sm text-slate-400">
              Most setups pair this app with a few key solutions and industries.
              That way it&apos;s not just a tool—it becomes part of a complete
              system.
            </p>
          </div>

          {/* Right columns */}
          <div className="flex-1 grid md:grid-cols-2 gap-6">
            {/* Solutions column */}
            {solutions.length > 0 && (
              <div>
                <h4 className="text-xs font-semibold text-slate-200 mb-3 flex items-center gap-2">
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-400/60 text-[10px] text-emerald-300">
                    1
                  </span>
                  Pairs well with these Solutions
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
                      <span className="text-[11px] text-slate-400 group-hover:text-emerald-300 line-clamp-2">
                        {solution.shortTagline}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Industries column */}
            {industries.length > 0 && (
              <div>
                <h4 className="text-xs font-semibold text-slate-200 mb-3 flex items-center gap-2">
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-cyan-500/10 border border-cyan-400/60 text-[10px] text-cyan-300">
                    2
                  </span>
                  Most common industries
                </h4>
                <div className="flex flex-wrap gap-2">
                  {industries.map((industry) => (
                    <Link
                      key={industry.id}
                      href={industry.href}
                      className="group inline-flex flex-col items-start justify-between rounded-2xl border border-slate-800 bg-slate-900/80 px-3 py-2 hover:border-cyan-400/70 hover:bg-slate-900 transition-colors min-w-[9rem]"
                    >
                      <span className="text-[11px] font-semibold text-slate-100">
                        {industry.label}
                      </span>
                      <span className="text-[11px] text-slate-400 group-hover:text-cyan-300 line-clamp-2">
                        {industry.description}
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

