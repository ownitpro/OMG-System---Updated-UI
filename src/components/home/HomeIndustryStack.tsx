"use client";

import Link from "next/link";
import { industriesConfig } from "@/config/industries_config";
import {
  getAppsForIndustry,
  getSolutionsForIndustry,
  topN,
} from "@/config/relationships";

export function HomeIndustryStack() {
  return (
    <section className="py-20 bg-slate-950 border-t border-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-emerald-400 mb-2">
              Recommended Stacks
            </p>
            <h2 className="text-2xl md:text-3xl font-semibold text-slate-50">
              Recommended OMGsystems stack by industry.
            </h2>
          </div>
          <p className="text-sm text-slate-400 max-w-md">
            Powered entirely by your app relationships. Update{" "}
            <code className="text-emerald-300">apps_config.ts</code> and this
            section updates automatically.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {industriesConfig.map((industry) => {
            const apps = topN(getAppsForIndustry(industry.id), 3);
            const solutions = topN(
              getSolutionsForIndustry(industry.id),
              2,
            );

            return (
              <div
                key={industry.id}
                className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-lg shadow-emerald-500/5"
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-50">
                      {industry.label}
                    </h3>
                    <p className="text-xs text-slate-400">
                      Suggested starting stack.
                    </p>
                  </div>
                  <Link
                    href={industry.href}
                    className="text-xs text-emerald-300 hover:text-emerald-200"
                  >
                    View details →
                  </Link>
                </div>

                {/* Apps */}
                {apps.length > 0 && (
                  <div className="mb-3">
                    <p className="text-xs font-semibold text-slate-300 mb-2">
                      Recommended Apps
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {apps.map((app) => (
                        <Link
                          key={app.id}
                          href={app.href}
                          className="inline-flex items-center rounded-full border border-slate-700 bg-slate-950 px-3 py-1.5 text-xs text-slate-100 hover:border-emerald-400 hover:text-emerald-200 transition-colors"
                        >
                          {app.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Solutions */}
                {solutions.length > 0 && (
                  <div>
                    <p className="text-xs font-semibold text-slate-300 mb-2">
                      Recommended Solutions
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {solutions.map((sol) => (
                        <Link
                          key={sol.id}
                          href={sol.href}
                          className="inline-flex items-center rounded-full border border-slate-700 bg-slate-950 px-3 py-1.5 text-xs text-slate-100 hover:border-sky-400 hover:text-sky-200 transition-colors"
                        >
                          {sol.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

