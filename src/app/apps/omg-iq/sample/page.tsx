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
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/apps/omg-iq"
          className="mb-8 inline-flex items-center text-sm font-medium text-gray-600 hover:text-gray-900"
        >
          <ArrowLeftIcon className="mr-2 h-4 w-4" aria-hidden="true" />
          Back to OMGIQ
        </Link>

        <div className="rounded-lg bg-white shadow-lg">
          {/* SMS/WhatsApp Preview */}
          <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-full bg-emerald-600 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">IQ</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    OMGIQ
                  </p>
                  <p className="text-xs text-gray-500">Today, 8:00 AM</p>
                </div>
              </div>
              <span className="text-xs text-gray-500">SMS</span>
            </div>
          </div>

          {/* Digest Content */}
          <div className="px-6 py-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Your Daily Industry Digest
            </h1>
            <p className="text-sm text-gray-600 mb-6">
              Real Estate • Construction • HVAC
            </p>

            <div className="space-y-6">
              <div className="border-l-4 border-emerald-600 pl-4">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">
                  Real Estate
                </h2>
                <p className="text-sm text-gray-700 mb-2">
                  Market activity up 12% this week. New listings in downtown
                  core increased 8%. Interest rates holding steady at 4.2%.
                </p>
                <p className="text-xs text-gray-500">Source: MarketWatch</p>
              </div>

              <div className="border-l-4 border-blue-600 pl-4">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">
                  Construction
                </h2>
                <p className="text-sm text-gray-700 mb-2">
                  Material costs down 3% month-over-month. New building permits
                  up 15% in Q4. Labor availability improving in major metros.
                </p>
                <p className="text-xs text-gray-500">Source: Construction Weekly</p>
              </div>

              <div className="border-l-4 border-orange-600 pl-4">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">
                  HVAC
                </h2>
                <p className="text-sm text-gray-700 mb-2">
                  Energy efficiency rebates extended through 2025. Smart
                  thermostat adoption up 22%. Service calls trending higher
                  ahead of winter.
                </p>
                <p className="text-xs text-gray-500">Source: HVAC Today</p>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-xs text-gray-500 text-center">
                This is a sample. Your actual digest will be personalized based
                on your selected industries and preferences.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/apps/demo?app=omg-iq"
            className="inline-flex items-center rounded-md bg-emerald-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-emerald-500"
          >
            Get Started Free
          </Link>
        </div>
      </div>
    </main>
  );
}

