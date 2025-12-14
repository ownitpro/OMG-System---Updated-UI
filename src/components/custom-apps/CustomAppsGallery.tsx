"use client";

import { useState } from "react";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/common/section";
import { customApps, CustomApp } from "@/content/customApps";

interface CustomAppCardProps {
  app: CustomApp;
}

function CustomAppCard({ app }: CustomAppCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
      {/* Image placeholder */}
      <div className="h-48 bg-gray-200 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-lime-100 rounded-lg flex items-center justify-center mx-auto mb-2">
            <span className="text-2xl">📱</span>
          </div>
          <p className="text-sm text-gray-500">App Preview</p>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{app.title}</h3>
        <p className="text-gray-600 mb-4">{app.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {app.modules.slice(0, 3).map((module, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-lime-100 text-lime-700 text-xs rounded-full"
            >
              {module}
            </span>
          ))}
          {app.modules.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
              +{app.modules.length - 3} more
            </span>
          )}
        </div>
        
        <div className="flex gap-3">
          <Link
            href={`/custom-apps/${app.slug}`}
            className="flex-1 text-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            View Details
          </Link>
          <Link
            href={`/custom-apps/builder?template=${app.slug}`}
            className="flex-1 text-center px-4 py-2 bg-lime-600 text-white rounded-lg hover:bg-lime-700 transition-colors"
          >
            Build Similar App
          </Link>
        </div>
      </div>
    </div>
  );
}

export function CustomAppsGallery() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState("");

  const categories = ["All", ...Array.from(new Set(customApps.map(app => app.category)))];

  const filteredApps = customApps.filter(app => {
    const matchesCategory = selectedCategory === "All" || app.category === selectedCategory;
    const matchesSearch = app.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto">
      {/* Filters */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search apps..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-lime-500"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                  selectedCategory === category
                    ? "bg-lime-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Apps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredApps.map((app) => (
          <CustomAppCard key={app.id} app={app} />
        ))}
      </div>

      {filteredApps.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🔍</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No apps found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
        </div>
      )}
    </div>
  );
}
