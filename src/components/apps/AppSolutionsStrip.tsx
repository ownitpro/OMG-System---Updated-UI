"use client";

import Link from "next/link";
import { getSolutionsForApp, getSolutionBadgeLabel } from "@/config/relationships";
import { RelationBadge } from "@/components/ui/RelationBadge";
import { RelationLegend } from "@/components/ui/RelationLegend";
import type { AppConfig, AppId } from "@/config/apps_config";
import { getAppById } from "@/config/apps_config";

type Props =
  | { app: AppConfig; appId?: never }
  | { appId: AppId; app?: never };

export function AppSolutionsStrip({ app, appId }: Props) {
  const resolvedApp = app ?? getAppById(appId!);
  const solutions = getSolutionsForApp(resolvedApp.id);
  
  if (!solutions.length) return null;

  return (
    <section className="relative py-6 bg-slate-950">
      {/* Emerald glow effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 -translate-y-1/2 left-0 w-[100px] h-[150px] bg-gradient-to-r from-[#47BD79]/10 via-emerald-500/6 to-transparent rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 -translate-y-1/2 right-0 w-[100px] h-[150px] bg-gradient-to-l from-[#47BD79]/10 via-emerald-500/6 to-transparent rounded-full blur-2xl"></div>
        {/* Center glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[120px] bg-gradient-to-br from-[#47BD79]/8 via-emerald-500/5 to-transparent rounded-full blur-2xl"></div>
      </div>
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-3">
          Works best with these Solutions
        </p>

        <div className="flex flex-wrap gap-3">
          {solutions.map((solution) => {
            const relation = solution.relation;
            const badgeLabel = getSolutionBadgeLabel(relation);

            return (
              <div
                key={solution.id}
                className="inline-flex items-center gap-2 rounded-full bg-slate-900/80 border border-slate-700 px-4 py-2 hover:border-emerald-400/50 transition-colors"
              >
                <Link
                  href={solution.href}
                  className="text-sm font-medium text-slate-100 hover:text-emerald-300 transition-colors"
                >
                  {solution.label}
                </Link>
                <RelationBadge
                  label={badgeLabel}
                  priority={relation?.priority}
                />
              </div>
            );
          })}
        </div>

        <RelationLegend className="mt-4" />
      </div>
    </section>
  );
}

