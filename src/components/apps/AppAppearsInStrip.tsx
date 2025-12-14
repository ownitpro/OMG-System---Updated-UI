"use client";

import Link from "next/link";
import type { AppConfig } from "@/config/apps_config";
import {
  getIndustriesForApp,
  getSolutionsForApp,
  getIndustryBadgeLabel,
  getSolutionBadgeLabel,
} from "@/config/relationships";
import { RelationBadge } from "@/components/ui/RelationBadge";
import clsx from "clsx";

type Props = {
  app: AppConfig;
  className?: string;
};

export function AppAppearsInStrip({ app, className }: Props) {
  const industries = getIndustriesForApp(app.id);
  const solutions = getSolutionsForApp(app.id);

  if (!industries.length && !solutions.length) return null;

  return (
    <section
      className={clsx(
        "border-t border-slate-200 bg-slate-50 py-3",
        className
      )}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-3 md:flex-row md:items-center md:justify-between text-xs md:text-sm">
        {/* Label */}
        <div className="flex items-center gap-2 text-slate-700">
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 text-[0.7rem] font-bold">
            ↔
          </span>
          <span className="font-medium">
            Appears in these industries &amp; solutions
          </span>
        </div>

        {/* Chips */}
        <div className="flex flex-wrap gap-3 md:justify-end">
          {industries.length > 0 && (
            <div className="flex flex-wrap items-center gap-1">
              <span className="uppercase tracking-wide text-[0.65rem] text-slate-500">
                Industries
              </span>
              {industries.map((industry) => (
                <Link
                  key={industry.id}
                  href={industry.href}
                  className="inline-flex items-center gap-2 rounded-full bg-white border border-slate-200 px-2.5 py-1 hover:bg-slate-100 transition-colors"
                >
                  <span className="text-[0.7rem] font-medium text-gray-800">
                    {industry.label}
                  </span>
                  <RelationBadge
                    label={getIndustryBadgeLabel(industry.relation)}
                    priority={industry.relation?.priority}
                    className="text-[9px] px-1.5 py-0.5"
                  />
                </Link>
              ))}
            </div>
          )}

          {solutions.length > 0 && (
            <div className="flex flex-wrap items-center gap-1">
              <span className="uppercase tracking-wide text-[0.65rem] text-slate-500">
                Solutions
              </span>
              {solutions.map((solution) => (
                <Link
                  key={solution.id}
                  href={solution.href}
                  className="inline-flex items-center gap-2 rounded-full bg-white border border-slate-200 px-2.5 py-1 hover:bg-slate-100 transition-colors"
                >
                  <span className="text-[0.7rem] font-medium text-gray-800">
                    {solution.label}
                  </span>
                  <RelationBadge
                    label={getSolutionBadgeLabel(solution.relation)}
                    priority={solution.relation?.priority}
                    className="text-[9px] px-1.5 py-0.5"
                  />
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

