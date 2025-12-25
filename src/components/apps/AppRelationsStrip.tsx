"use client";

import Link from "next/link";
import {
  type AppConfig,
} from "@/config/apps_config";
import { getSolutionsByIds } from "@/config/solutions_config";
import { getIndustriesByIds } from "@/config/industries_config";
import { getRelatedAppsForApp } from "@/config/relationships";
import { BoltIcon } from "@heroicons/react/24/outline";

type Props = {
  app: AppConfig;
};

export function AppRelationsStrip({ app }: Props) {
  // Use weighted helpers - they handle both new weighted relations and legacy fields
  const pairedApps = getRelatedAppsForApp(app.id);
  
  // For solutions, extract from weighted relations or fall back to legacy
  let pairedSolutions: ReturnType<typeof getSolutionsByIds> = [];
  if (app.solutions && app.solutions.length > 0) {
    const solutionIds = app.solutions.map((rel) => rel.solutionId);
    pairedSolutions = getSolutionsByIds(solutionIds);
  } else if (app.pairsWithSolutions && app.pairsWithSolutions.length > 0) {
    pairedSolutions = getSolutionsByIds(app.pairsWithSolutions);
  } else if (app.recommendedSolutionIds && app.recommendedSolutionIds.length > 0) {
    pairedSolutions = getSolutionsByIds(app.recommendedSolutionIds);
  }
  
  // For industries, extract from weighted relations or fall back to legacy
  let industries: ReturnType<typeof getIndustriesByIds> = [];
  if (app.industries && app.industries.length > 0) {
    const industryIds = app.industries.map((rel) => rel.industryId);
    industries = getIndustriesByIds(industryIds);
  } else if (app.appearsInIndustries && app.appearsInIndustries.length > 0) {
    industries = getIndustriesByIds(app.appearsInIndustries);
  } else if (app.recommendedIndustryIds && app.recommendedIndustryIds.length > 0) {
    industries = getIndustriesByIds(app.recommendedIndustryIds);
  }

  const showAnything =
    pairedApps.length || pairedSolutions.length || industries.length;

  if (!showAnything) return null;

  return (
    <section className="relative py-16 bg-slate-950 overflow-hidden">
      {/* Central glow effect behind hub */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-br from-[#47BD79]/10 via-emerald-500/5 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-xs font-semibold tracking-[0.25em] uppercase text-emerald-400 mb-2">
            Connected Stack
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            How {app.label} connects with your ecosystem
          </h2>
        </div>

        {/* Hub Diagram */}
        <div className="relative">
          {/* SVG Lines connecting hub to categories - Desktop only */}
          <svg
            className="hidden md:block absolute inset-0 w-full h-full pointer-events-none"
            style={{ zIndex: 0, minHeight: '300px' }}
          >
            {/* Gradient definitions - must be defined first */}
            <defs>
              <linearGradient id="greenGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#47BD79" />
                <stop offset="100%" stopColor="rgba(71, 189, 121, 0.3)" />
              </linearGradient>
              <linearGradient id="blueGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="rgba(56, 189, 248, 0.3)" />
              </linearGradient>
              <linearGradient id="amberGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fbbf24" />
                <stop offset="100%" stopColor="rgba(251, 191, 36, 0.3)" />
              </linearGradient>
            </defs>
            {/* Line to Apps (left) */}
            {pairedApps.length > 0 && (
              <line
                x1="50%"
                y1="75"
                x2="16.67%"
                y2="220"
                stroke="url(#greenGradient)"
                strokeWidth="2"
                strokeLinecap="round"
              />
            )}
            {/* Line to Solutions (center) */}
            {pairedSolutions.length > 0 && (
              <line
                x1="50%"
                y1="75"
                x2="50%"
                y2="220"
                stroke="#38bdf8"
                strokeWidth="2"
                strokeLinecap="round"
                style={{ opacity: 0.8 }}
              />
            )}
            {/* Line to Industries (right) */}
            {industries.length > 0 && (
              <line
                x1="50%"
                y1="75"
                x2="83.33%"
                y2="220"
                stroke="url(#amberGradient)"
                strokeWidth="2"
                strokeLinecap="round"
              />
            )}
          </svg>

          {/* Center Hub - The App */}
          <div className="relative z-10 flex justify-center mb-10">
            <div className="relative">
              {/* Pulsing ring animation */}
              <div
                className="absolute inset-[-8px] bg-[#47BD79]/20 rounded-full animate-ping"
                style={{ animationDuration: '3s' }}
              />
              {/* Second pulsing ring with delay */}
              <div
                className="absolute inset-[-4px] bg-[#47BD79]/30 rounded-full animate-ping"
                style={{ animationDuration: '3s', animationDelay: '1.5s' }}
              />
              {/* Hub circle */}
              <div className="relative w-28 h-28 md:w-36 md:h-36 rounded-full bg-gradient-to-br from-[#47BD79] to-emerald-600 flex items-center justify-center shadow-[0_0_40px_rgba(71,189,121,0.4)]">
                <div className="text-center">
                  <BoltIcon className="w-7 h-7 md:w-8 md:h-8 text-white mx-auto mb-1" />
                  <span className="text-white font-bold text-sm md:text-base">{app.label}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Three Categories as Spoke Groups */}
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 md:pt-16">
            {/* Apps Spokes - Green */}
            {pairedApps.length > 0 && (
              <div className="text-center">
                {/* Mobile connecting line */}
                <div className="flex justify-center mb-4 md:hidden">
                  <div className="h-10 w-0.5 bg-gradient-to-b from-[#47BD79] to-[#47BD79]/20 rounded-full" />
                </div>
                {/* Category badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-500/30 mb-4">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span className="text-emerald-300 text-sm font-semibold">Apps</span>
                </div>
                {/* Links */}
                <div className="flex flex-wrap justify-center gap-2">
                  {pairedApps.map((a) => (
                    <Link
                      key={a.id}
                      href={a.href}
                      className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/80 text-sm hover:border-emerald-400/50 hover:text-emerald-300 hover:bg-emerald-500/10 transition-all duration-300"
                    >
                      {a.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Solutions Spokes - Blue */}
            {pairedSolutions.length > 0 && (
              <div className="text-center">
                {/* Mobile connecting line */}
                <div className="flex justify-center mb-4 md:hidden">
                  <div className="h-10 w-0.5 bg-gradient-to-b from-sky-400 to-sky-400/20 rounded-full" />
                </div>
                {/* Category badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-500/20 border border-sky-500/30 mb-4">
                  <span className="w-2 h-2 rounded-full bg-sky-400" />
                  <span className="text-sky-300 text-sm font-semibold">Solutions</span>
                </div>
                {/* Links */}
                <div className="flex flex-wrap justify-center gap-2">
                  {pairedSolutions.map((s) => (
                    <Link
                      key={s.id}
                      href={s.href}
                      className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/80 text-sm hover:border-sky-400/50 hover:text-sky-300 hover:bg-sky-500/10 transition-all duration-300"
                    >
                      {s.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Industries Spokes - Amber */}
            {industries.length > 0 && (
              <div className="text-center">
                {/* Mobile connecting line */}
                <div className="flex justify-center mb-4 md:hidden">
                  <div className="h-10 w-0.5 bg-gradient-to-b from-amber-400 to-amber-400/20 rounded-full" />
                </div>
                {/* Category badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/20 border border-amber-500/30 mb-4">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  <span className="text-amber-300 text-sm font-semibold">Industries</span>
                </div>
                {/* Links */}
                <div className="flex flex-wrap justify-center gap-2">
                  {industries.map((i) => (
                    <Link
                      key={i.id}
                      href={i.href}
                      className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/80 text-sm hover:border-amber-400/50 hover:text-amber-300 hover:bg-amber-500/10 transition-all duration-300"
                    >
                      {i.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

