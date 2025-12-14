"use client";

import Link from "next/link";
import type { SolutionId } from "@/config/solutions_config";
import { getSolutionById } from "@/config/solutions_config";
import { getAppsForSolution, getIndustriesForSolution, getSolutionBadgeLabel } from "@/config/relationships";
import { RelationBadge } from "@/components/ui/RelationBadge";
import { RelationLegend } from "@/components/ui/RelationLegend";

type Props = {
  solutionId: SolutionId;
};

export function SolutionRelationsStrip({ solutionId }: Props) {
  const solution = getSolutionById(solutionId);
  const apps = getAppsForSolution(solutionId);
  const industries = getIndustriesForSolution(solutionId);

  if ((!apps || apps.length === 0) && (!industries || industries.length === 0)) return null;

  return (
    <section className="py-14 bg-slate-900 border-t border-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-sky-400 mb-2">
              Works Best With
            </p>
            <h2 className="text-xl md:text-2xl font-semibold text-slate-50">
              {solution.label} works best with these apps and industries.
            </h2>
          </div>
          <p className="text-xs text-slate-400 max-w-md">
            Relationships are calculated from your app config, so every solution
            page stays aligned with your real product stack.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Apps */}
          {apps.length > 0 && (
            <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-5 shadow-lg shadow-emerald-500/10">
              <h3 className="text-sm font-semibold text-slate-200 mb-3">
                Works best with these Apps
              </h3>
              <div className="space-y-2">
                {apps.map((app) => {
                  const relation = app.relation;
                  const badgeLabel = getSolutionBadgeLabel(relation);
                  
                  return (
                    <div
                      key={app.id}
                      className="flex items-center justify-between gap-2 rounded-lg border border-slate-700 bg-slate-900 p-3 hover:border-emerald-400/50 transition-colors"
                    >
                      <Link
                        href={app.href}
                        className="text-xs font-medium text-slate-100 hover:text-emerald-200 transition-colors flex-1"
                      >
                        {app.label}
                      </Link>
                      <RelationBadge
                        label={badgeLabel}
                        priority={relation?.priority}
                        className="text-[10px] px-2 py-0.5"
                      />
                    </div>
                  );
                })}
              </div>
              <RelationLegend className="mt-4" />
            </div>
          )}

          {/* Industries */}
          {industries.length > 0 && (
            <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-5 shadow-lg shadow-amber-500/10">
              <h3 className="text-sm font-semibold text-slate-200 mb-3">
                Used most in these Industries
              </h3>
              <div className="flex flex-wrap gap-2">
                {industries.map((ind) => (
                  <Link
                    key={ind.id}
                    href={ind.href}
                    className="inline-flex items-center rounded-full border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs text-slate-100 hover:border-amber-400 hover:text-amber-200 transition-colors"
                  >
                    {ind.label}
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
