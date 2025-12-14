"use client";

import Link from "next/link";
import { ArrowRightIcon, SparklesIcon } from "@heroicons/react/24/outline";

export function OMGIQMiniSection() {
  return (
    <section className="relative py-20 bg-gradient-to-br from-purple-50 via-violet-50 to-indigo-50 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-purple-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-violet-200/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Glass Effect Container */}
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/50 p-8 md:p-12">
          <div className="mx-auto max-w-3xl text-center">
            {/* Badge */}
            <div className="mb-6 inline-flex items-center rounded-full bg-purple-100 px-4 py-2 text-sm font-semibold text-purple-700">
              <SparklesIcon className="mr-2 h-5 w-5" aria-hidden="true" />
              New: OMGIQ
            </div>

            {/* Header */}
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-violet-500 rounded-2xl mb-4 shadow-lg mx-auto">
              <SparklesIcon className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              OMG Space IQ (OMGIQ)
            </h2>
            <p className="text-2xl md:text-3xl text-purple-600 font-semibold mb-6">
              Your daily edge—delivered.
            </p>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed">
              Pick your industries, choose SMS or WhatsApp, and get short, smart
              digests you can act on. No more tab overload. Just signal.
            </p>

            {/* CTA Button */}
            <div className="mt-10">
              <Link
                href="/apps/omg-iq"
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-purple-600 to-violet-600 text-white font-bold rounded-xl hover:from-purple-700 hover:to-violet-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Explore OMGIQ
                <ArrowRightIcon className="ml-2 h-5 w-5" aria-hidden="true" />
              </Link>
            </div>

            {/* How We Compare */}
            <div className="mt-12 rounded-2xl bg-gradient-to-br from-purple-50 to-violet-50 p-6 md:p-8 text-left border border-purple-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                How We Compare
              </h3>
              <div className="space-y-4 text-base">
                <div className="flex items-start">
                  <span className="text-gray-400 mr-3 text-xl">•</span>
                  <div>
                    <p className="text-gray-700">
                      <span className="font-semibold text-gray-900">
                        Email newsletters:
                      </span>{" "}
                      long, slow, not tailored to your mix.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-gray-400 mr-3 text-xl">•</span>
                  <div>
                    <p className="text-gray-700">
                      <span className="font-semibold text-gray-900">
                        Manual research:
                      </span>{" "}
                      accurate but eats your day.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-purple-600 mr-3 text-xl font-bold">✓</span>
                  <div>
                    <p className="text-gray-700">
                      <span className="font-semibold text-purple-600">OMGIQ:</span>{" "}
                      short, relevant, delivered where you are.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

