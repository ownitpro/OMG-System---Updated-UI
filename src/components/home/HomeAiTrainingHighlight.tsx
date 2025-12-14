"use client";

import Link from "next/link";
import { solutionsConfig } from "@/config/solutions_config";
import {
  getAppsForSolution,
  getIndustriesForSolution,
} from "@/config/relationships";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

export function HomeAiTrainingHighlight() {
  // Pull all training-type solutions (e.g. OMG AI Mastery, plus any future ones)
  const trainingSolutions = solutionsConfig.filter(
    (s) => s.kind === "training"
  );

  if (trainingSolutions.length === 0) {
    return null; // nothing to show if you have no training products yet
  }

  // For now, treat the first one as the "hero" (you can add a sort later if needed)
  const [primary, ...rest] = trainingSolutions;

  const primaryApps = getAppsForSolution(primary.id).slice(0, 2);
  const primaryIndustries = getIndustriesForSolution(primary.id).slice(0, 3);

  return (
    <section className="py-20 bg-gradient-to-br from-emerald-50 via-lime-50 to-amber-50 border-t border-emerald-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-emerald-600 mb-2">
              AI Training &amp; Mastery
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Become AI-smart in days, not months.
            </h2>
            <p className="text-gray-700 max-w-2xl">
              Highlight your AI training layer so visitors instantly see how you
              can train individuals and teams to actually use AI properly — not
              just buy tools.
            </p>
          </div>

          {/* Legend for primary / secondary */}
          <div className="flex flex-col gap-2 text-xs text-gray-600">
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

        {/* Main Highlight Card */}
        <div className="grid lg:grid-cols-[2fr,1.4fr] gap-8 mb-10">
          <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 shadow-lg border border-emerald-100">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold mb-4">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" />
              {primary.badgeLabel || "Primary AI Training"}
            </div>

            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              {primary.label}
            </h3>
            <p className="text-gray-700 mb-5">{primary.summary}</p>

            <ul className="space-y-1 text-sm text-gray-700 mb-6">
              <li>• 3-Day Personal Course for individuals</li>
              <li>• 2-Week Business Bootcamp for teams</li>
              <li>• Guided AI Playground with real-world prompts</li>
              <li>• Verifiable certificate with QR code</li>
            </ul>

            <div className="flex flex-wrap gap-3">
              <Link
                href={primary.href}
                className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-lime-500 text-white text-sm font-semibold shadow-md hover:from-emerald-600 hover:to-lime-600 hover:shadow-lg transition-all"
              >
                View OMG AI Mastery
                <ArrowRightIcon className="ml-2 h-4 w-4" />
              </Link>
              <Link
                href={primary.href}
                className="inline-flex items-center justify-center px-6 py-3 rounded-xl border border-emerald-200 bg-white text-sm font-semibold text-emerald-700 hover:bg-emerald-50 transition-all"
              >
                See Course Details
              </Link>
            </div>
          </div>

          {/* Apps + Industries Chips */}
          <div className="space-y-6">
            {/* Recommended Apps */}
            {primaryApps.length > 0 && (
              <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-md border border-gray-100">
                <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-2">
                  Works best with these Apps
                </p>
                <div className="flex flex-wrap gap-2">
                  {primaryApps.map(({ app, relation }) => (
                    <Link
                      key={app.id}
                      href={app.href}
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gray-50 border border-gray-200 text-xs text-gray-800 hover:bg-emerald-50 hover:border-emerald-200 transition-all"
                    >
                      {relation?.priority === "primary" && (
                        <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" />
                      )}
                      {relation?.priority === "secondary" && (
                        <span className="inline-block w-2 h-2 rounded-full bg-gray-400" />
                      )}
                      <span>{app.label}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Recommended Industries */}
            {primaryIndustries.length > 0 && (
              <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-md border border-gray-100">
                <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-2">
                  Already used in these industries
                </p>
                <div className="flex flex-wrap gap-2">
                  {primaryIndustries.map(({ industry, relation }) => (
                    <Link
                      key={industry.id}
                      href={industry.href}
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gray-50 border border-gray-200 text-xs text-gray-800 hover:bg-emerald-50 hover:border-emerald-200 transition-all"
                    >
                      {relation?.priority === "primary" && (
                        <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" />
                      )}
                      {relation?.priority === "secondary" && (
                        <span className="inline-block w-2 h-2 rounded-full bg-gray-400" />
                      )}
                      <span>{industry.label}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* If you ever have more training solutions, list them here */}
        {rest.length > 0 && (
          <div className="border-t border-emerald-100 pt-8 mt-4">
            <p className="text-xs uppercase tracking-[0.25em] text-gray-500 mb-4">
              Other AI Training Options
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rest.map((solution) => {
                const apps = getAppsForSolution(solution.id).slice(0, 2);
                return (
                  <div
                    key={solution.id}
                    className="bg-white/80 backdrop-blur-md rounded-xl p-5 shadow-sm border border-gray-100"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-semibold text-gray-900">
                        {solution.label}
                      </h4>
                      {solution.badgeLabel && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-700">
                          {solution.badgeLabel}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-600 mb-3">
                      {solution.summary}
                    </p>
                    {apps.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-3">
                        {apps.map(({ app, relation }) => (
                          <span
                            key={app.id}
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-gray-50 border border-gray-200 text-[10px] text-gray-700"
                          >
                            {relation?.priority === "primary" && (
                              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            )}
                            {relation?.priority === "secondary" && (
                              <span className="inline-block w-1.5 h-1.5 rounded-full bg-gray-400" />
                            )}
                            {app.label}
                          </span>
                        ))}
                      </div>
                    )}
                    <Link
                      href={solution.href}
                      className="inline-flex items-center text-[11px] font-semibold text-emerald-700 hover:text-emerald-900"
                    >
                      View details →
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

