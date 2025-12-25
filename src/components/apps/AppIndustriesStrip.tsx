// src/components/apps/AppIndustriesStrip.tsx
"use client";

import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import type { AppConfig, AppId } from "@/config/apps_config";
import { getAppById } from "@/config/apps_config";
import { getIndustriesByAppId } from "@/config/industries_config";

type Props =
  | { app: AppConfig; appId?: never }
  | { appId: AppId; app?: never };

export function AppIndustriesStrip({ app, appId }: Props) {
  const resolvedApp = app ?? getAppById(appId!);
  const industries = getIndustriesByAppId(resolvedApp.id);

  if (!industries.length) return null;

  return (
    <section className="relative py-8 bg-slate-950">
      {/* Subtle glow effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[100px] bg-gradient-to-br from-[#47BD79]/8 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Centered header */}
        <div className="text-center mb-6">
          <p className="text-[11px] uppercase tracking-[0.22em] text-slate-400 mb-1">
            Appears in these industries
          </p>
          <h3 className="text-lg font-semibold text-white">
            Where teams use <span className="text-[#47BD79]">{resolvedApp.label}</span>
          </h3>
        </div>

        {/* Horizontal pill cloud */}
        <div className="flex flex-wrap justify-center gap-3">
          {industries.map((industry) => (
            <Link
              key={industry.id}
              href={industry.href}
              className="group relative inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-700 bg-slate-900/60 hover:border-[#47BD79]/50 hover:bg-[#47BD79]/10 transition-all duration-300"
            >
              <span className="text-sm font-medium text-white group-hover:text-[#47BD79] transition-colors">
                {industry.label}
              </span>
              <ArrowRightIcon className="w-3.5 h-3.5 text-slate-500 group-hover:text-[#47BD79] group-hover:translate-x-0.5 transition-all" />

              {/* Tooltip on hover */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-slate-800 rounded-lg text-xs text-white/80 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-lg z-20">
                {industry.summary}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

