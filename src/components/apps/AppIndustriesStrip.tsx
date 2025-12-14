// src/components/apps/AppIndustriesStrip.tsx
"use client";

import Link from "next/link";
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
    <section className="py-10 bg-slate-950 border-y border-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
          {/* Left column – label */}
          <div className="max-w-sm">
            <p className="text-[11px] uppercase tracking-[0.22em] text-slate-400 mb-1">
              Appears in these industries
            </p>
            <h3 className="text-lg md:text-xl font-semibold text-white mb-2">
              Where teams use {resolvedApp.label}
            </h3>
            <p className="text-sm text-slate-400">
              These are the industries that typically plug{" "}
              <span className="font-medium text-emerald-300">
                {resolvedApp.label}
              </span>{" "}
              into their core stack.
            </p>
          </div>

          {/* Right column – industry pills */}
          <div className="flex-1">
            <div className="flex flex-wrap gap-2">
              {industries.map((industry) => (
                <Link
                  key={industry.id}
                  href={industry.href}
                  className="group inline-flex flex-col items-start justify-between rounded-2xl border border-slate-800 bg-slate-900/80 px-3 py-2 hover:border-emerald-400/70 hover:bg-slate-900 transition-colors min-w-[9rem]"
                >
                  <span className="text-[11px] font-semibold text-slate-100">
                    {industry.label}
                  </span>
                  <span className="text-[11px] text-slate-400 group-hover:text-emerald-200 line-clamp-2">
                    {industry.summary}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

