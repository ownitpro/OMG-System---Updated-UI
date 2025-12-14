// app/try-live-demo/page.tsx

import { Metadata } from "next";
import Link from "next/link";
import { liveDemos } from "@/config/try_live_demo_config";
import { 
  PlayIcon, 
  ClockIcon, 
  CheckCircleIcon,
  SparklesIcon,
  ArrowRightIcon
} from "@heroicons/react/24/outline";

export const metadata: Metadata = {
  title: "Try a Live Demo | OMGsystems",
  description:
    "Choose a live sandbox and see how OMGsystems works in your world. No registration required. Just launch, click around, and imagine your team using this every day.",
  keywords: "live demo, interactive demo, CRM demo, SecureVault Docs demo, business software demo",
  openGraph: {
    title: "Try a Live Demo | OMGsystems",
    description:
      "Choose a live sandbox and see how OMGsystems works in your world. No registration required.",
    type: "website",
  },
  robots: "index, follow",
  alternates: {
    canonical: "https://www.omgsystems.com/try-live-demo",
  },
};

export default function TryLiveDemoPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 text-slate-900">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-50 rounded-full blur-3xl opacity-50"></div>
      </div>

      <section className="relative mx-auto flex max-w-6xl flex-col gap-10 px-4 py-16 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 border border-emerald-200 px-4 py-1.5 mb-6">
            <SparklesIcon className="w-4 h-4 text-emerald-600" />
            <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wide">
              Interactive Demos
            </span>
          </div>
          <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl text-gray-900 mb-6">
            Try a Live Demo
          </h1>
          <p className="mt-4 text-balance text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Choose a live sandbox and see how OMGsystems works in your world.
            No registration required. Just launch, click around, and imagine
            your team using this every day.
          </p>
        </div>

        {/* Trust / short strip */}
        <div className="flex flex-wrap gap-4 justify-center text-sm">
          <div className="flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-medium text-emerald-700">Instant access · No setup</span>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 shadow-sm">
            <ClockIcon className="w-4 h-4 text-blue-600" />
            <span className="font-medium text-blue-700">5–10 minute guided experience</span>
          </div>
        </div>

        {/* Demo tiles */}
        <div className="grid gap-8 md:grid-cols-2 mt-4">
          {liveDemos.map((demo) => (
            <div
              key={demo.id}
              className="group relative flex flex-col rounded-2xl border-2 border-gray-200 bg-white p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:border-emerald-300"
            >
              {/* Badge */}
              <div className="mb-4 flex items-center justify-between gap-2">
                {demo.badge && (
                  <span className="inline-flex items-center rounded-full bg-emerald-100 px-4 py-1.5 text-xs font-semibold text-emerald-700">
                    {demo.badge}
                  </span>
                )}
                <div className="flex items-center gap-1.5 text-xs text-gray-500">
                  <ClockIcon className="w-4 h-4" />
                  <span className="font-medium">~{demo.estTimeMinutes} min</span>
                </div>
              </div>

              {/* Title + summary */}
              <div className="mb-6">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-3">
                  {demo.label}
                </h2>
                <p className="text-base text-gray-600 leading-relaxed">{demo.summary}</p>
              </div>

              {/* Highlights */}
              <ul className="mt-4 space-y-3 mb-6">
                {demo.highlights.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircleIcon className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>

              {/* Ideal for */}
              <div className="mt-auto pt-6 border-t border-gray-100">
                <p className="text-sm text-gray-600 mb-4">
                  <span className="font-semibold text-gray-900">
                    Ideal for:
                  </span>{" "}
                  {demo.idealFor}
                </p>
                
                {/* CTA with Coming Soon */}
                <div className="flex items-center gap-3">
                  <button
                    disabled
                    className="inline-flex items-center gap-2 rounded-lg bg-gray-100 text-gray-400 px-5 py-2.5 text-sm font-semibold cursor-not-allowed"
                  >
                    <PlayIcon className="w-4 h-4" />
                    Launch demo
                  </button>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 border border-amber-200 px-4 py-2 text-xs font-semibold text-amber-700">
                    <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse"></span>
                    Coming Soon
                  </span>
                </div>
              </div>

              {/* Subtle hover glow */}
              <div className="pointer-events-none absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br from-emerald-50/0 via-emerald-50/50 to-blue-50/0 opacity-0 blur-2xl transition-opacity group-hover:opacity-100" />
            </div>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="mt-8 rounded-2xl border-2 border-gray-200 bg-gradient-to-br from-gray-50 to-white px-6 py-6 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
              <ArrowRightIcon className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                After you explore the demos, you can{" "}
                <Link href="/contact" className="font-semibold text-emerald-600 hover:text-emerald-700 underline">
                  connect with us through Contact Us
                </Link>{" "}
                or{" "}
                <Link href="/solutions/custom-solutions" className="font-semibold text-emerald-600 hover:text-emerald-700 underline">
                  Custom Solutions
                </Link>{" "}
                to map out how OMGsystems can plug into your actual workflows.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
