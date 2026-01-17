import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

export const metadata: Metadata = {
  title: "Sample Digest – OMGIQ | OMGsystems",
  description: "See a sample of what OMGIQ delivers to your SMS or WhatsApp.",
  robots: "noindex, follow",
};

export default function SampleDigestPage() {
  return (
    <main className="min-h-screen bg-black pt-32 pb-12 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-[#0f172a] to-black" />
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#10b981]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/apps/omg-iq"
          className="mb-8 inline-flex items-center text-sm font-medium text-white/60 hover:text-white transition-colors"
        >
          <ArrowLeftIcon className="mr-2 h-4 w-4" aria-hidden="true" />
          Back to OMGIQ
        </Link>

        <div className="rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-lg">
          {/* SMS/WhatsApp Preview */}
          <div className="border-b border-white/10 bg-white/5 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-full bg-[#10b981] flex items-center justify-center">
                  <span className="text-white font-bold text-sm">IQ</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">
                    OMGIQ
                  </p>
                  <p className="text-xs text-white/50">Today, 8:00 AM</p>
                </div>
              </div>
              <span className="text-xs text-white/50">SMS</span>
            </div>
          </div>

          {/* Digest Content */}
          <div className="px-6 py-8">
            <h1 className="text-2xl font-bold text-white mb-4">
              Your Daily Industry Digest
            </h1>
            <p className="text-sm text-white/60 mb-6">
              Real Estate • Construction • HVAC
            </p>

            <div className="space-y-6">
              <div className="border-l-4 border-emerald-600 pl-4">
                <h2 className="text-lg font-semibold text-white mb-2">
                  Real Estate
                </h2>
                <p className="text-sm text-white/70 mb-2">
                  Market activity up 12% this week. New listings in downtown
                  core increased 8%. Interest rates holding steady at 4.2%.
                </p>
                <p className="text-xs text-white/50">Source: MarketWatch</p>
              </div>

              <div className="border-l-4 border-blue-600 pl-4">
                <h2 className="text-lg font-semibold text-white mb-2">
                  Construction
                </h2>
                <p className="text-sm text-white/70 mb-2">
                  Material costs down 3% month-over-month. New building permits
                  up 15% in Q4. Labor availability improving in major metros.
                </p>
                <p className="text-xs text-white/50">Source: Construction Weekly</p>
              </div>

              <div className="border-l-4 border-orange-600 pl-4">
                <h2 className="text-lg font-semibold text-white mb-2">
                  HVAC
                </h2>
                <p className="text-sm text-white/70 mb-2">
                  Energy efficiency rebates extended through 2025. Smart
                  thermostat adoption up 22%. Service calls trending higher
                  ahead of winter.
                </p>
                <p className="text-xs text-white/50">Source: HVAC Today</p>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10">
              <p className="text-xs text-white/50 text-center">
                This is a sample. Your actual digest will be personalized based
                on your selected industries and preferences.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/signup"
            className="inline-flex items-center rounded-xl bg-[#10b981] px-6 py-3 text-base font-semibold text-white shadow-lg hover:bg-[#059669] transition-all duration-300"
          >
            Get Started Free
          </Link>
        </div>
      </div>
    </main>
  );
}

