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
    <section className="relative py-20 bg-black overflow-hidden">
      {/* Smooth gradient transition from black */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black via-30% to-black" />

      {/* Animated Background Elements - Dark theme */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#47BD79]/8 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#3B82F6]/8 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <p className="text-xs uppercase tracking-wide text-[#47BD79] mb-2 font-semibold">
              Recommended stack
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
              Recommended Stack by Industry
            </h2>
            <p className="text-base text-white/60 max-w-2xl leading-relaxed">
              See how most teams use OMGsystems in each industry: which apps
              they turn on, and which solutions usually drive the biggest ROI.
            </p>
          </div>
          <div className="text-xs text-white/50">
            <span className="inline-flex h-7 items-center rounded-full border border-white/20 bg-white/5 px-4 backdrop-blur-sm">
              Config-driven • Always in sync
            </span>
          </div>
        </div>

        {/* Industry cards - 2 column grid */}
        <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
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
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 sm:p-8 hover:bg-white/10 transition-all duration-600 ease-premium-out hover:border-[#47BD79]/30 w-full"
                style={{ boxShadow: '0 0 30px rgba(71, 189, 121, 0.1)' }}
              >
                {/* Subtle accent */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#47BD79] to-[#3B82F6]"></div>

                {/* Header row - fixed height area */}
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div className="flex-1">
                    <p className="text-xs uppercase tracking-wide text-white/50 mb-1 font-medium">
                      Industry
                    </p>
                    <h3 className="text-xl font-bold text-white mb-2">
                      {industry.label}
                    </h3>
                    <p className="text-sm text-white/60 leading-relaxed min-h-[40px]">
                      {industry.summary || "Discover the best apps and solutions for your industry."}
                    </p>
                  </div>
                  <Link
                    href={industry.href}
                    className="inline-flex items-center rounded-full border border-[#47BD79]/30 bg-[#47BD79]/10 px-4 py-2 text-xs font-medium text-[#47BD79] hover:border-[#47BD79] hover:bg-[#47BD79]/20 transition-all duration-400 ease-premium-out whitespace-nowrap flex-shrink-0"
                  >
                    View industry
                    <span className="ml-1.5 text-xs">→</span>
                  </Link>
                </div>

                {/* Recommended apps + solutions - vertical stack */}
                <div className="grid gap-4 grid-cols-1 flex-1">
                  {/* Apps */}
                  <div className="min-w-0 flex flex-col">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-[#47BD79]">
                      Apps we usually pair
                    </p>
                    <div className="space-y-2 flex-1">
                      {apps.length === 0 && (
                        <span className="text-xs text-white/40">
                          No apps configured yet.
                        </span>
                      )}
                      {apps.map((app) => {
                        const relation = app.relation;
                        const badgeLabel = getIndustryBadgeLabel(relation);

                        return (
                          <div
                            key={app.id}
                            className="group/app rounded-xl border border-[#47BD79]/20 bg-[#47BD79]/10 p-2 sm:p-3 hover:border-[#47BD79]/40 hover:bg-[#47BD79]/15 transition-all duration-400 ease-premium-out"
                          >
                            <div className="flex items-start justify-between gap-2 mb-1.5 flex-wrap">
                              <Link
                                href={app.href}
                                className="text-sm font-semibold text-white hover:text-[#47BD79] transition-colors flex-1 min-w-0 break-words"
                              >
                                {app.label}
                              </Link>
                              <RelationBadge
                                label={badgeLabel}
                                priority={relation?.priority}
                                className="text-[10px] px-2 py-0.5 flex-shrink-0"
                              />
                            </div>
                            <p className="text-xs text-white/60 leading-relaxed line-clamp-2 break-words">
                              {app.tagline}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Solutions */}
                  <div className="min-w-0 flex flex-col">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-[#A855F7]">
                      Solutions that drive ROI
                    </p>
                    <div className="space-y-2 flex-1">
                      {solutions.length === 0 && (
                        <span className="text-xs text-white/40">
                          No solutions configured yet.
                        </span>
                      )}
                      {solutions.map((solution) => {
                        const relation = solution.relation;
                        const badgeLabel = getSolutionBadgeLabel(relation);

                        return (
                          <div
                            key={solution.id}
                            className="group/solution rounded-xl border border-[#A855F7]/20 bg-[#A855F7]/10 p-2 sm:p-3 hover:border-[#A855F7]/40 hover:bg-[#A855F7]/15 transition-all duration-400 ease-premium-out"
                          >
                            <div className="flex items-start justify-between gap-2 mb-1.5 flex-wrap">
                              <Link
                                href={solution.href}
                                className="text-sm font-semibold text-white hover:text-[#A855F7] transition-colors flex-1 min-w-0 break-words"
                              >
                                {solution.label}
                              </Link>
                              <RelationBadge
                                label={badgeLabel}
                                priority={relation?.priority}
                                className="text-[10px] px-2 py-0.5 flex-shrink-0"
                              />
                            </div>
                            <p className="text-xs text-white/60 leading-relaxed line-clamp-2 break-words">
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
                  <div className="border-t border-white/10 pt-6 mt-auto">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-[#47BD79]">
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
                              className="block bg-gradient-to-br from-[#47BD79]/15 to-[#3da86a]/10 border border-[#47BD79]/20 rounded-xl p-4 hover:border-[#47BD79]/40 hover:bg-[#47BD79]/20 transition-all duration-400 ease-premium-out"
                            >
                              <div className="flex items-center justify-between gap-3 mb-2">
                                <span className="text-sm font-semibold text-white">
                                  {solution.label}
                                </span>
                                <RelationBadge
                                  label={badgeLabel}
                                  priority={relation?.priority}
                                  className="text-[10px] px-2 py-0.5 flex-shrink-0"
                                />
                              </div>
                              <p className="text-xs text-white/70 leading-relaxed">
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

