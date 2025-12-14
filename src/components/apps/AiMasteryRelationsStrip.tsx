"use client";

import Link from "next/link";
import {
  getAppsForSolution,
  getIndustriesForSolution,
} from "@/config/relationships";
import { solutionsConfig } from "@/config/solutions_config";
import { industriesConfig } from "@/config/industries_config";

export function AiMasteryRelationsStrip() {
  const solution = solutionsConfig.find((s) => s.id === "ai_mastery_training");
  if (!solution) return null;

  // Get apps for this solution
  const apps = getAppsForSolution("ai_mastery_training");
  
  // Get industries from solution's relatedIndustries or industries array
  const industryRels = solution.relatedIndustries || solution.industries || [];
  const industries = industryRels
    .map((rel) => {
      const industry = industriesConfig.find((i) => i.id === rel.industryId);
      if (!industry) return null;
      return { industry, relation: rel };
    })
    .filter((x): x is { industry: typeof industriesConfig[0]; relation: typeof industryRels[0] } => x !== null);

  if (!apps.length && !industries.length) return null;

  return (
    <section className="border-t border-emerald-100 bg-emerald-50/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-emerald-600 mb-1">
            Appears in your stacks
          </p>
          <h3 className="text-sm md:text-base font-semibold text-gray-900">
            OMG AI Mastery is part of your recommended stack in key industries.
          </h3>
          <p className="text-xs text-gray-600 mt-1">
            Use it to train teams and individuals so they actually use CRM, SVD, and OMG Leads properly.
          </p>
          {/* Legend */}
          <div className="flex gap-4 mt-3 text-[11px] text-gray-600">
            <span className="inline-flex items-center gap-1">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" />
              Primary = core part of your stack
            </span>
            <span className="inline-flex items-center gap-1">
              <span className="inline-block w-2 h-2 rounded-full bg-gray-400" />
              Secondary = recommended add-on
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-3 md:items-end">
          {industries.length > 0 && (
            <div className="flex flex-wrap gap-2 justify-start md:justify-end">
              {industries.map(({ industry, relation }) => (
                <Link
                  key={industry.id}
                  href={industry.href}
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white border border-emerald-100 text-[11px] text-gray-800 shadow-sm hover:bg-emerald-50 hover:border-emerald-200 transition-all"
                >
                  {relation.role === "primary" && (
                    <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" />
                  )}
                  {relation.role === "secondary" && (
                    <span className="inline-block w-2 h-2 rounded-full bg-gray-400" />
                  )}
                  <span>{industry.label}</span>
                </Link>
              ))}
            </div>
          )}
          {apps.length > 0 && (
            <div className="flex flex-wrap gap-2 justify-start md:justify-end">
              {apps.map((app) => {
                const relation = app.relation;
                return (
                  <Link
                    key={app.id}
                    href={app.href}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white border border-gray-200 text-[11px] text-gray-800 hover:bg-emerald-50 hover:border-emerald-200 transition-all"
                  >
                    {relation?.priority === "primary" && (
                      <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" />
                    )}
                    {relation?.priority === "secondary" && (
                      <span className="inline-block w-2 h-2 rounded-full bg-gray-400" />
                    )}
                    <span>{app.label}</span>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

