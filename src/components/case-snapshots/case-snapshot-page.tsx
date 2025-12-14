"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeftIcon, ChartBarIcon, CheckCircleIcon, ClockIcon } from "@heroicons/react/24/outline";
import { CaseSnapshot } from "@/content/case-snapshots";

interface CaseSnapshotPageProps {
  snapshot: CaseSnapshot;
}

export function CaseSnapshotPage({ snapshot }: CaseSnapshotPageProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-4" role="list">
              <li role="listitem">
                <Link href="/" className="text-blue-600 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">
                <svg className="h-5 w-5 text-gray-400 mx-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </li>
              <li role="listitem">
                <Link href="/case-snapshots" className="text-blue-600 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded">
                  Case Snapshots
                </Link>
              </li>
              <li aria-hidden="true">
                <svg className="h-5 w-5 text-gray-400 mx-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </li>
              <li className="text-gray-500 font-medium" role="listitem" aria-current="page">
                {snapshot.title}
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Hero Section with Banner Image */}
      <div className="relative bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="mb-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                  {snapshot.industry.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </span>
              </div>
              <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                {snapshot.title}
              </h1>
              <p className="mt-4 text-xl text-gray-600">
                {snapshot.subtitle}
              </p>
            </div>
            <div className="relative">
              <Image
                src={snapshot.socialTiles.banner}
                alt={snapshot.socialTiles.altText}
                width={800}
                height={450}
                className="rounded-lg shadow-xl"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Situation */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <div className="h-8 w-8 bg-red-100 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-red-600 font-bold">1</span>
                </div>
                Situation
              </h2>
              <div className="bg-red-50 border-l-4 border-red-400 p-6 rounded-r-lg">
                <p className="text-gray-700 leading-relaxed">
                  {snapshot.situation}
                </p>
              </div>
            </section>

            {/* Intervention */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <div className="h-8 w-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-blue-600 font-bold">2</span>
                </div>
                Intervention
              </h2>
              <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-r-lg">
                <p className="text-gray-700 leading-relaxed">
                  {snapshot.intervention}
                </p>
              </div>
            </section>

            {/* Outcome */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <div className="h-8 w-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-green-600 font-bold">3</span>
                </div>
                Outcome
              </h2>
              <div className="bg-green-50 border-l-4 border-green-400 p-6 rounded-r-lg">
                <p className="text-gray-700 leading-relaxed">
                  {snapshot.outcome}
                </p>
              </div>
            </section>

            {/* Proof Notes */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <CheckCircleIcon className="h-6 w-6 text-green-600 mr-3" />
                Proof Notes
              </h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <ul className="space-y-3">
                  {snapshot.proofNotes.map((note, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircleIcon className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{note}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-8">
              {/* Metrics Card */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <ChartBarIcon className="h-5 w-5 text-blue-600 mr-2" />
                  Key Metrics
                </h3>
                <div className="space-y-4">
                  {snapshot.metrics.map((metric, index) => (
                    <div key={index} className="border-b border-gray-200 pb-4 last:border-b-0 last:pb-0">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-sm font-medium text-gray-900">{metric.kpi}</span>
                        <span className="text-sm font-bold text-green-600">{metric.delta}</span>
                      </div>
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Before: {metric.before}</span>
                        <span>After: {metric.after}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Card */}
              <div className="bg-blue-700 rounded-lg shadow-lg p-6 text-white">
                <h3 className="text-lg font-semibold mb-4">
                  Ready to see similar results?
                </h3>
                <p className="text-blue-100 mb-6">
                  Book a personalized demo to see how OMGsystems can transform your {snapshot.industry.replace('-', ' ')} operations.
                </p>
                <div className="space-y-3">
                  <Link
                    href={`/demo?industry=${snapshot.industry}`}
                    className="w-full bg-white text-blue-700 hover:bg-blue-50 font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
                  >
                    {snapshot.cta.primary}
                  </Link>
                  <Link
                    href={`/industries/${snapshot.industry}`}
                    className="w-full border border-blue-300 text-white hover:bg-blue-600 font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
                  >
                    {snapshot.cta.secondary}
                  </Link>
                </div>
              </div>

              {/* Social Share */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Share this success story
                </h3>
                <div className="flex space-x-3">
                  <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200">
                    LinkedIn
                  </button>
                  <button className="flex-1 bg-gray-800 hover:bg-gray-900 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200">
                    Twitter
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Case Snapshots */}
      <div className="bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            More Success Stories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* This would be populated with related case snapshots */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Related Case Study
                </h3>
                <p className="text-gray-600 text-sm">
                  See how other {snapshot.industry.replace('-', ' ')} businesses achieved similar results.
                </p>
                <Link
                  href="/case-snapshots"
                  className="mt-4 inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
                >
                  View all case studies
                  <ArrowLeftIcon className="h-4 w-4 ml-1 rotate-180" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
