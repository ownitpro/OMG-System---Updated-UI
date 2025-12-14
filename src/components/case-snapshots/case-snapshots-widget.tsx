"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRightIcon, ChartBarIcon } from "@heroicons/react/24/outline";
import { caseSnapshots } from "@/content/case-snapshots";

export function CaseSnapshotsWidget() {
  // Get 3 featured case snapshots
  const featuredSnapshots = caseSnapshots.slice(0, 3);

  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Real Results from Real Businesses
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See how companies across industries achieved remarkable growth with OMGsystems.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {featuredSnapshots.map((snapshot) => (
            <div key={snapshot.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              {/* Image */}
              <div className="relative h-48">
                <Image
                  src={snapshot.socialTiles.banner}
                  alt={snapshot.socialTiles.altText}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white bg-opacity-90 text-gray-900">
                    {snapshot.industry.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                  {snapshot.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {snapshot.subtitle}
                </p>

                {/* Key Metric */}
                <div className="mb-4 p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900">
                      {snapshot.metrics[0]?.kpi}
                    </span>
                    <span className="text-lg font-bold text-green-600">
                      {snapshot.metrics[0]?.delta}
                    </span>
                  </div>
                </div>

                {/* Read More */}
                <Link
                  href={`/case-snapshots/${snapshot.id}`}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
                >
                  Read Full Story
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/case-snapshots"
            className="inline-flex items-center bg-white hover:bg-gray-50 text-gray-900 font-semibold py-3 px-6 rounded-lg border border-gray-300 transition-colors duration-200"
          >
            <ChartBarIcon className="h-5 w-5 mr-2" />
            View All Success Stories
            <ArrowRightIcon className="h-5 w-5 ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
}
