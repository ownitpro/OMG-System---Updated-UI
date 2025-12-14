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
    <section className="border-t border-slate-100 bg-slate-50 py-6">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-3">
          Works best with these Solutions
        </p>

        <div className="flex flex-wrap gap-3">
          {solutions.map((solution) => {
            const relation = solution.relation;
            const badgeLabel = getSolutionBadgeLabel(relation);

            return (
              <div
                key={solution.id}
                className="inline-flex items-center gap-2 rounded-full bg-white border border-slate-200 px-4 py-2 shadow-sm hover:shadow-md transition-shadow"
              >
                <Link
                  href={solution.href}
                  className="text-sm font-medium text-gray-800 hover:text-blue-600 transition-colors"
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

