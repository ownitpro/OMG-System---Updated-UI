"use client";

import Link from "next/link";
import type { AppConfig } from "@/config/apps_config";
import { AppPairingsStrip } from "@/components/apps/AppPairingsStrip";
import { AppIndustriesStrip } from "@/components/apps/AppIndustriesStrip";
import { AppSolutionsStrip } from "@/components/apps/AppSolutionsStrip";
import { AppRelationsStrip } from "@/components/apps/AppRelationsStrip";

type Props = { app: AppConfig };

export function DefaultAppPage({ app }: Props) {
  return (
    <main className="bg-slate-950 text-slate-50">
      <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-950 to-black">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-emerald-400 mb-4">
            App Overview
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-50 mb-3">
            {app.label}
          </h1>
          <p className="text-xl text-emerald-300 mb-4">{app.tagline}</p>
          <p className="text-base md:text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
            {app.summary}
          </p>
          {app.status === "coming_soon" && (
            <div className="inline-flex items-center rounded-full border border-amber-400/60 bg-amber-500/10 px-4 py-1.5 text-xs font-medium text-amber-200">
              Coming soon — join the waitlist to be first in line.
            </div>
          )}
        </div>
      </section>

      {/* Shared strips */}
      <AppPairingsStrip app={app} />
      <AppIndustriesStrip app={app} />
      <AppSolutionsStrip app={app} />
      <AppRelationsStrip app={app} />
    </main>
  );
}

