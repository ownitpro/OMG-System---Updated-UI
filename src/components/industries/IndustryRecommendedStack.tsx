"use client";

import Link from "next/link";
import type { IndustryConfig } from "@/config/industries_config";
import {
  getAppsForIndustry,
  getSolutionsForIndustry,
  getIndustryBadgeLabel,
  getSolutionBadgeLabel,
} from "@/config/relationships";
import { RelationBadge } from "@/components/ui/RelationBadge";
import { RelationLegend } from "@/components/ui/RelationLegend";

export function IndustryRecommendedStack({
  industry,
}: {
  industry: IndustryConfig;
}) {
  const apps = getAppsForIndustry(industry.id);
  const solutions = getSolutionsForIndustry(industry.id);

  if (!apps.length && !solutions.length) return null;

  return (
    <section className="py-16 bg-slate-50 border-t border-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Recommended Apps & Solutions for {industry.label}
        </h2>
        <p className="text-gray-600 mb-8 max-w-2xl">
          This is the stack we recommend most often for {industry.label} teams
          so you can launch fast and scale without chaos.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Apps column */}
          {apps.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Apps
              </h3>
              <div className="space-y-3">
                {apps.map((app) => {
                  const relation = app.relation;
                  const badgeLabel = getIndustryBadgeLabel(relation);
                  
                  return (
                    <div
                      key={app.id}
                      className="bg-white rounded-xl border border-slate-200 p-4 flex flex-col gap-2 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <Link
                          href={app.href}
                          className="text-sm font-semibold text-gray-900 hover:text-emerald-600 transition-colors"
                        >
                          {app.label}
                        </Link>
                        <RelationBadge
                          label={badgeLabel}
                          priority={relation?.priority}
                        />
                      </div>
                      <p className="text-xs text-gray-600">{app.summary}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Solutions column */}
          {solutions.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Solutions
              </h3>
              <div className="space-y-3">
                {solutions.map((solution) => {
                  const relation = solution.relation;
                  const badgeLabel = getSolutionBadgeLabel(relation);
                  
                  return (
                    <div
                      key={solution.id}
                      className="bg-white rounded-xl border border-slate-200 p-4 flex flex-col gap-2 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <Link
                          href={solution.href}
                          className="text-sm font-semibold text-gray-900 hover:text-emerald-600 transition-colors"
                        >
                          {solution.label}
                        </Link>
                        <RelationBadge
                          label={badgeLabel}
                          priority={relation?.priority}
                        />
                      </div>
                      <p className="text-xs text-gray-600">
                        {solution.summary}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Legend */}
        <RelationLegend className="mt-8" />
      </div>
    </section>
  );
}

