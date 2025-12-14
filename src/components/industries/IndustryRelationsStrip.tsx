"use client";

import Link from "next/link";
import type { IndustryConfig } from "@/config/industries_config";
import type { AppConfig } from "@/config/apps_config";
import type { SolutionConfig } from "@/config/solutions_config";

type Props = {
  industry: IndustryConfig;
  apps: AppConfig[];
  solutions: SolutionConfig[];
};

export function IndustryRelationsStrip({ industry, apps, solutions }: Props) {
  if (!apps.length && !solutions.length) return null;

  return (
    <section className="py-14 bg-slate-900 border-t border-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-emerald-400 mb-2">
              Recommended Stack
            </p>
            <h2 className="text-xl md:text-2xl font-semibold text-slate-50">
              Best stack for {industry.label}.
            </h2>
          </div>
          <p className="text-xs text-slate-400 max-w-md">
            These apps and solutions are derived directly from your OMGsystems
            config, so the stack updates automatically as you evolve.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Recommended Apps */}
          {apps.length > 0 && (
            <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-5 shadow-lg shadow-emerald-500/10">
              <h3 className="text-sm font-semibold text-slate-200 mb-3">
                Recommended Apps
              </h3>
              <div className="flex flex-wrap gap-2">
                {apps.map((app) => (
                  <Link
                    key={app.id}
                    href={app.href}
                    className="inline-flex items-center rounded-full border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs text-slate-100 hover:border-emerald-400 hover:text-emerald-200 transition-colors"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 mr-2" />
                    {app.label}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Recommended Solutions */}
          {solutions.length > 0 && (
            <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-5 shadow-lg shadow-sky-500/10">
              <h3 className="text-sm font-semibold text-slate-200 mb-3">
                Recommended Solutions
              </h3>
              <div className="flex flex-wrap gap-2">
                {solutions.map((sol) => (
                  <Link
                    key={sol.id}
                    href={sol.href}
                    className="inline-flex items-center rounded-full border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs text-slate-100 hover:border-sky-400 hover:text-sky-200 transition-colors"
                  >
                    {sol.label}
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

