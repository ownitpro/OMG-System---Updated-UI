// src/components/home/HomeRecommendedStackByIndustry.tsx
"use client";

import Link from "next/link";
import { industriesConfig } from "@/config/industries_config";
import {
  getAppsForIndustry,
  getSolutionsForIndustry,
  getIndustryBadgeLabel,
  getSolutionBadgeLabel,
  topN,
} from "@/config/relationships";
import { RelationBadge } from "@/components/ui/RelationBadge";
import { RelationLegend } from "@/components/ui/RelationLegend";

export function HomeRecommendedStackByIndustry() {
  return (
    <section className="relative py-20 bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-emerald-200/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-200/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <p className="text-xs uppercase tracking-wide text-emerald-600 mb-2 font-semibold">
              Recommended stack
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Recommended Stack by Industry
            </h2>
            <p className="text-base text-gray-600 max-w-2xl leading-relaxed">
              See how most teams use OMGsystems in each industry: which apps
              they turn on, and which solutions usually drive the biggest ROI.
            </p>
          </div>
          <div className="text-xs text-gray-500">
            <span className="inline-flex h-7 items-center rounded-full border border-gray-200 bg-white px-4 shadow-sm">
              Config-driven • Always in sync
            </span>
          </div>
        </div>

        {/* Industry cards - Single column on all screens to fit all 4 in view */}
        <div className="grid gap-6 grid-cols-1">
          {industriesConfig.map((industry) => {
            // Use weighted relationship helpers - automatically sorted by weight
            const apps = topN(getAppsForIndustry(industry.id), 3);
            const allSolutions = getSolutionsForIndustry(industry.id);
            
            // Split solutions into core and training
            // Note: getSolutionsForIndustry returns SolutionConfig objects directly, not nested
            const coreSolutions = allSolutions.filter(
              (solution) => !solution.kind || solution.kind !== "training"
            );
            const trainingSolutions = allSolutions.filter(
              (solution) => solution.kind === "training"
            );
            
            // Get top core solutions (limit to 2 for display)
            const solutions = topN(coreSolutions, 2);

            return (
              <div
                key={industry.id}
                className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-emerald-300 w-full"
              >
                {/* Subtle accent */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 to-blue-400"></div>

                {/* Header row */}
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div className="flex-1">
                    <p className="text-xs uppercase tracking-wide text-gray-500 mb-1 font-medium">
                      Industry
                    </p>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {industry.label}
                    </h3>
                    {industry.summary && (
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {industry.summary}
                      </p>
                    )}
                  </div>
                  <Link
                    href={industry.href}
                    className="inline-flex items-center rounded-full border border-gray-300 bg-gray-50 px-4 py-2 text-xs font-medium text-gray-700 hover:border-emerald-400 hover:bg-emerald-50 hover:text-emerald-700 transition-colors whitespace-nowrap"
                  >
                    View industry
                    <span className="ml-1.5 text-xs">→</span>
                  </Link>
                </div>

                {/* Recommended apps + solutions */}
                <div className="grid gap-6 sm:grid-cols-2">
                  {/* Apps */}
                  <div className="min-w-0">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-700">
                      Apps we usually pair
                    </p>
                    <div className="space-y-2">
                      {apps.length === 0 && (
                        <span className="text-xs text-gray-400">
                          No apps configured yet.
                        </span>
                      )}
                      {apps.map((app) => {
                        const relation = app.relation;
                        const badgeLabel = getIndustryBadgeLabel(relation);
                        
                        return (
                          <div
                            key={app.id}
                            className="group/app rounded-xl border border-gray-200 bg-gray-50 p-3 sm:p-4 hover:border-emerald-300 hover:bg-emerald-50 transition-all duration-200"
                          >
                            <div className="flex items-start justify-between gap-2 mb-1.5 flex-wrap">
                              <Link
                                href={app.href}
                                className="text-sm font-semibold text-gray-900 hover:text-emerald-600 transition-colors flex-1 min-w-0 break-words"
                              >
                                {app.label}
                              </Link>
                              <RelationBadge
                                label={badgeLabel}
                                priority={relation?.priority}
                                className="text-[10px] px-2 py-0.5 flex-shrink-0"
                              />
                            </div>
                            <p className="text-xs text-gray-600 leading-relaxed line-clamp-2 break-words">
                              {app.tagline}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Solutions */}
                  <div className="min-w-0">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-700">
                      Solutions that drive ROI
                    </p>
                    <div className="space-y-2">
                      {solutions.length === 0 && (
                        <span className="text-xs text-gray-400">
                          No solutions configured yet.
                        </span>
                      )}
                      {solutions.map((solution) => {
                        const relation = solution.relation;
                        const badgeLabel = getSolutionBadgeLabel(relation);
                        
                        return (
                          <div
                            key={solution.id}
                            className="group/solution rounded-xl border border-gray-200 bg-gray-50 p-3 sm:p-4 hover:border-violet-300 hover:bg-violet-50 transition-all duration-200"
                          >
                            <div className="flex items-start justify-between gap-2 mb-1.5 flex-wrap">
                              <Link
                                href={solution.href}
                                className="text-sm font-semibold text-gray-900 hover:text-violet-600 transition-colors flex-1 min-w-0 break-words"
                              >
                                {solution.label}
                              </Link>
                              <RelationBadge
                                label={badgeLabel}
                                priority={relation?.priority}
                                className="text-[10px] px-2 py-0.5 flex-shrink-0"
                              />
                            </div>
                            <p className="text-xs text-gray-600 leading-relaxed line-clamp-2 break-words">
                              {solution.shortTagline || solution.summary}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* AI Training / OMG AI Mastery mini card */}
                {trainingSolutions.length > 0 && (
                  <div className="border-t border-gray-200 pt-6 mt-4">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-emerald-600">
                      AI Training &amp; Mastery
                    </p>
                    <div className="grid gap-3">
                      {trainingSolutions
                        .filter((solution) => solution && solution.id && solution.href)
                        .map((solution) => {
                          const relation = solution.relation;
                          const badgeLabel = getSolutionBadgeLabel(relation);
                          
                          return (
                            <Link
                              key={solution.id}
                              href={solution.href}
                              className="block bg-gradient-to-br from-emerald-50 to-lime-50 border border-emerald-200 rounded-xl p-4 hover:border-emerald-300 hover:shadow-md transition-all duration-200"
                            >
                              <div className="flex items-center justify-between gap-3 mb-2">
                                <span className="text-sm font-semibold text-gray-900">
                                  {solution.label}
                                </span>
                                <RelationBadge
                                  label={badgeLabel}
                                  priority={relation?.priority}
                                  className="text-[10px] px-2 py-0.5 flex-shrink-0"
                                />
                              </div>
                              <p className="text-xs text-gray-700 leading-relaxed">
                                {solution.summary || "Includes OMG AI Mastery so your team actually learns how to use this stack with AI."}
                              </p>
                            </Link>
                          );
                        })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <RelationLegend className="mt-10" />
      </div>
    </section>
  );
}

