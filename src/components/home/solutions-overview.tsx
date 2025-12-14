// components/home/solutions-overview.tsx

import Link from "next/link";
import { solutionsTilesConfig } from "@/config/solutions_config";

export function SolutionsOverviewSection() {
  return (
    <section className="mx-auto mt-16 max-w-6xl px-4 sm:px-6 lg:px-8">
      <header className="mb-6 flex flex-col gap-2 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-300">
            Solutions
          </p>
          <h2 className="text-2xl font-semibold tracking-tight text-slate-50 sm:text-3xl">
            Plug AI into the parts of your business that hurt the most.
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-slate-300">
            Start with AI scheduling, cross-tool automations, or a full custom
            systems overhaul. Every solution is powered by the same OMG stack.
          </p>
        </div>
        <Link
          href="/solutions/custom-solutions"
          className="mt-3 inline-flex items-center justify-center rounded-full bg-emerald-500 px-4 py-2 text-xs font-semibold text-slate-950 hover:bg-emerald-400 sm:mt-0"
        >
          Talk about my systems
        </Link>
      </header>

      <div className="grid gap-4 md:grid-cols-3">
        {solutionsTilesConfig.map((solution) => (
          <Link
            key={solution.id}
            href={solution.href}
            className="group flex flex-col justify-between rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur transition hover:-translate-y-1 hover:border-emerald-400/60 hover:bg-white/10"
          >
            <div>
              <p className="text-[11px] font-medium uppercase tracking-wide text-emerald-300">
                {solution.eyebrow}
              </p>
              <div className="mt-1 flex items-center gap-2">
                <h3 className="text-base font-semibold text-slate-50">
                  {solution.label}
                </h3>
                {solution.badge && (
                  <span className="rounded-full bg-emerald-500 px-2 py-0.5 text-[10px] font-semibold text-slate-950">
                    {solution.badge}
                  </span>
                )}
              </div>
              <p className="mt-2 text-sm text-slate-300">
                {solution.description}
              </p>
            </div>

            <span className="mt-4 inline-flex items-center text-xs font-medium text-emerald-300">
              Explore {solution.label}
              <span className="ml-1 transition-transform group-hover:translate-x-0.5">
                →
              </span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

