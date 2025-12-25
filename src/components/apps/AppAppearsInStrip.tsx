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
        "relative py-8 bg-slate-950",
        className
      )}
    >
      {/* Emerald glow effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 -translate-y-1/2 left-0 w-[120px] h-[200px] bg-gradient-to-r from-[#47BD79]/10 via-emerald-500/6 to-transparent rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 -translate-y-1/2 right-0 w-[120px] h-[200px] bg-gradient-to-l from-[#47BD79]/10 via-emerald-500/6 to-transparent rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[200px] bg-gradient-to-br from-[#47BD79]/8 via-emerald-500/5 to-transparent rounded-full blur-2xl"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title on top */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#47BD79]/20 text-[#47BD79] text-sm font-bold border border-[#47BD79]/30">
            ↔
          </span>
          <span className="font-semibold text-white text-base">
            Appears in these industries &amp; solutions
          </span>
        </div>

        {/* All buttons below */}
        <div className="flex flex-col gap-4">
          {industries.length > 0 && (
            <div className="flex flex-wrap items-center justify-center gap-2">
              <span className="uppercase tracking-wider text-[0.7rem] font-semibold text-slate-400 mr-2">
                Industries
              </span>
              {industries.map((industry) => (
                <Link
                  key={industry.id}
                  href={industry.href}
                  className="inline-flex items-center gap-2 rounded-full bg-slate-900/80 border-2 border-[#47BD79] shadow-[0_0_12px_rgba(71,189,121,0.25)] px-3 py-1.5 hover:bg-slate-800 hover:shadow-[0_0_16px_rgba(71,189,121,0.4)] transition-all duration-200"
                >
                  <span className="text-xs font-medium text-white">
                    {industry.label}
                  </span>
                  <RelationBadge
                    label={getIndustryBadgeLabel(industry.relation)}
                    priority={industry.relation?.priority}
                    className="text-[10px] px-2 py-0.5"
                  />
                </Link>
              ))}
            </div>
          )}

          {solutions.length > 0 && (
            <div className="flex flex-wrap items-center justify-center gap-2">
              <span className="uppercase tracking-wider text-[0.7rem] font-semibold text-slate-400 mr-2">
                Solutions
              </span>
              {solutions.map((solution) => (
                <Link
                  key={solution.id}
                  href={solution.href}
                  className="inline-flex items-center gap-2 rounded-full bg-slate-900/80 border-2 border-[#47BD79] shadow-[0_0_12px_rgba(71,189,121,0.25)] px-3 py-1.5 hover:bg-slate-800 hover:shadow-[0_0_16px_rgba(71,189,121,0.4)] transition-all duration-200"
                >
                  <span className="text-xs font-medium text-white">
                    {solution.label}
                  </span>
                  <RelationBadge
                    label={getSolutionBadgeLabel(solution.relation)}
                    priority={solution.relation?.priority}
                    className="text-[10px] px-2 py-0.5"
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

