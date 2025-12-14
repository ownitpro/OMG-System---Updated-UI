import React from "react";
import Link from "next/link";
import { ArrowDownTrayIcon, PlayIcon } from "@heroicons/react/24/outline";

interface FeaturedResourcesProps {
  resources: Array<{
    thumbnail: string;
    title: string;
    description: string;
    url: string;
  }>;
}

export function FeaturedResources({ resources }: FeaturedResourcesProps) {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Ready-to-Use Templates & Playbooks
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Access exclusive resources created by our community and automation experts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {resources.map((resource, index) => (
            <div key={index} className="bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-200 overflow-hidden group">
              <div className="aspect-video bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
                {resource.thumbnail ? (
                  <img
                    src={resource.thumbnail}
                    alt={resource.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-center p-6">
                    <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                      {resource.title.toLowerCase().includes('webinar') ? (
                        <PlayIcon className="w-8 h-8 text-white" />
                      ) : (
                        <ArrowDownTrayIcon className="w-8 h-8 text-white" />
                      )}
                    </div>
                    <p className="text-gray-600 font-medium text-sm">Resource Preview</p>
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-200">
                  {resource.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {resource.description}
                </p>
                <Link
                  href={resource.url}
                  className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium text-sm"
                >
                  {resource.title.toLowerCase().includes('webinar') ? 'Watch Now' : 'Download'}
                  <ArrowDownTrayIcon className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/resources"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
          >
            Explore Full Resource Library
            <ArrowDownTrayIcon className="ml-1 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
