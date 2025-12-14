"use client";

import { useState } from "react";
import { EyeIcon, SparklesIcon, ArrowRightIcon } from "@heroicons/react/24/outline";

const categories = [
  "All",
  "Property Management", 
  "Contractors",
  "Accounting",
  "Healthcare",
  "Cleaning",
  "Real Estate",
  "Analytics",
  "Automation"
];

const apps = [
  {
    id: 1,
    title: "Property Inventory Tracker",
    description: "Easily track occupancy, maintenance, and tenant info—all in one dashboard.",
    category: "Property Management",
    features: ["Form Intake", "User Management", "Notifications", "Dashboard Analytics", "Mobile Access"],
    image: "/images/custom-apps/property-tracker.png",
    color: "blue"
  },
  {
    id: 2,
    title: "Tenant Payment Portal",
    description: "Offer secure online rent payments, instant receipts, and transaction records for tenants and admins.",
    category: "Property Management",
    features: ["Payment Processing", "User Login", "Notifications", "Transaction History", "Receipt Generation"],
    image: "/images/custom-apps/payment-portal.png",
    color: "emerald"
  },
  {
    id: 3,
    title: "Contractor Work Order App",
    description: "Submit, manage, and monitor work orders—plus message clients from your phone or desktop.",
    category: "Contractors",
    features: ["Form Intake", "User Management", "Notifications", "Photo Upload", "Status Tracking"],
    image: "/images/custom-apps/work-orders.png",
    color: "orange"
  },
  {
    id: 4,
    title: "Client Onboarding Toolkit",
    description: "Automate new client intake with guided forms and progress tracking.",
    category: "Accounting",
    features: ["Form Intake", "User Management", "Notifications", "Document Collection", "Progress Tracking"],
    image: "/images/custom-apps/onboarding.png",
    color: "purple"
  },
  {
    id: 5,
    title: "Clinic Intake Hub",
    description: "Digital check-in, appointment booking, and health data management in one place.",
    category: "Healthcare",
    features: ["Form Intake", "User Management", "Notifications", "Appointment Booking", "Health Records"],
    image: "/images/custom-apps/clinic-hub.png",
    color: "red"
  },
  {
    id: 6,
    title: "Cleaning Route Planner",
    description: "Optimize daily cleaning routes and track job completion live—with maps and alerts for your crew.",
    category: "Cleaning",
    features: ["Form Intake", "User Management", "Notifications", "GPS Tracking", "Route Optimization"],
    image: "/images/custom-apps/route-planner.png",
    color: "green"
  },
  {
    id: 7,
    title: "Real Estate Lead Manager",
    description: "Organize, nurture, and match leads—move deals from first contact to closing seamlessly.",
    category: "Real Estate",
    features: ["Form Intake", "User Management", "Notifications", "Lead Scoring", "Pipeline Management"],
    image: "/images/custom-apps/lead-manager.png",
    color: "indigo"
  },
  {
    id: 8,
    title: "Custom Dashboard Builder",
    description: "Design interactive analytics dashboards with live charts and drag-and-drop widgets.",
    category: "Analytics",
    features: ["Data Dashboard", "User Management", "API Integration", "Real-time Updates", "Custom Widgets"],
    image: "/images/custom-apps/dashboard-builder.png",
    color: "cyan"
  },
  {
    id: 9,
    title: "Workflow Automation Studio",
    description: "Visually automate any business process—from emails to complex approvals—no code needed.",
    category: "Automation",
    features: ["Workflow Automation", "User Management", "API Integration", "Visual Builder", "Conditional Logic"],
    image: "/images/custom-apps/workflow-studio.png",
    color: "pink"
  }
];

const colorClasses = {
  blue: "from-blue-500/20 to-blue-600/20 border-blue-500/30",
  emerald: "from-emerald-500/20 to-emerald-600/20 border-emerald-500/30",
  orange: "from-orange-500/20 to-orange-600/20 border-orange-500/30",
  purple: "from-purple-500/20 to-purple-600/20 border-purple-500/30",
  red: "from-red-500/20 to-red-600/20 border-red-500/30",
  green: "from-green-500/20 to-green-600/20 border-green-500/30",
  indigo: "from-indigo-500/20 to-indigo-600/20 border-indigo-500/30",
  cyan: "from-cyan-500/20 to-cyan-600/20 border-cyan-500/30",
  pink: "from-pink-500/20 to-pink-600/20 border-pink-500/30"
};

export default function AppGallery() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [hoveredApp, setHoveredApp] = useState<number | null>(null);

  const filteredApps = selectedCategory === "All" 
    ? apps 
    : apps.filter(app => app.category === selectedCategory);

  const handleBuildSimilar = (appId: number) => {
    // Add confetti animation or other feedback
    console.log(`Building similar app to ${appId}`);
  };

  return (
    <section className="py-16 md:py-24 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Example Custom Apps Gallery
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Explore real-world solutions—or use them as your launchpad.
          </p>
        </div>

        {/* Filter Dropdown */}
        <div className="mb-12 flex justify-center">
          <div className="relative">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="appearance-none bg-white/10 backdrop-blur-md border border-white/20 rounded-lg px-6 py-3 pr-10 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            >
              {categories.map((category) => (
                <option key={category} value={category} className="bg-gray-900 text-white">
                  {category}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg className="w-5 h-5 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Apps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredApps.map((app) => (
            <div
              key={app.id}
              className={`group relative bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 ${
                hoveredApp === app.id ? 'scale-105' : ''
              }`}
              onMouseEnter={() => setHoveredApp(app.id)}
              onMouseLeave={() => setHoveredApp(null)}
            >
              {/* App Preview */}
              <div className={`aspect-video bg-gradient-to-br ${colorClasses[app.color as keyof typeof colorClasses]} rounded-lg mb-4 flex items-center justify-center relative overflow-hidden`}>
                <div className="text-center text-white/80">
                  <div className="w-12 h-12 mx-auto mb-2 bg-white/20 rounded-lg flex items-center justify-center">
                    <EyeIcon className="w-6 h-6" />
                  </div>
                  <p className="text-sm font-medium">{app.title}</p>
                </div>
                
                {/* Floating Elements */}
                <div className="absolute top-2 left-2 w-3 h-3 bg-white/30 rounded-full animate-pulse"></div>
                <div className="absolute top-3 right-3 w-2 h-2 bg-white/40 rounded-full animate-bounce delay-300"></div>
                <div className="absolute bottom-2 left-3 w-4 h-4 bg-white/20 rounded-full animate-pulse delay-700"></div>
              </div>

              {/* App Info */}
              <div className="mb-4">
                <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                  {app.title}
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {app.description}
                </p>
              </div>

              {/* Features */}
              <div className="mb-6">
                <p className="text-sm text-gray-400 mb-2">Features:</p>
                <div className="flex flex-wrap gap-1">
                  {app.features.slice(0, 3).map((feature, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-white/10 rounded text-xs text-white/80"
                    >
                      {feature}
                    </span>
                  ))}
                  <span className="px-2 py-1 bg-emerald-500/20 rounded text-xs text-emerald-400">
                    +{app.features.length - 3} more
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-white/20 text-sm font-medium rounded-lg text-white bg-white/10 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-200">
                  <EyeIcon className="w-4 h-4 mr-2" />
                  View Details
                </button>
                <button 
                  onClick={() => handleBuildSimilar(app.id)}
                  className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-gray-900 bg-emerald-400 hover:bg-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-200 transform hover:scale-105"
                >
                  <SparklesIcon className="w-4 h-4 mr-2" />
                  Build Similar
                </button>
              </div>

              {/* Hover Effect Overlay */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center px-6 py-3 bg-emerald-50/10 border border-emerald-500/30 rounded-full">
            <div className="w-2 h-2 bg-emerald-400 rounded-full mr-3 animate-pulse"></div>
            <span className="text-emerald-400 font-medium">All apps include custom branding and deployment</span>
          </div>
        </div>
      </div>
    </section>
  );
}
