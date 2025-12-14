"use client";

import {
  MegaphoneIcon,
  UserPlusIcon,
  DocumentTextIcon,
  CurrencyDollarIcon,
  UserIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";

const modules = [
  {
    icon: MegaphoneIcon,
    title: "Lead Gen & Ads",
    description: "Targeted ad campaigns (Meta, Google)",
    subDescription: "Landing pages + funnels, Audience testing & scaling",
    color: "bg-blue-50 text-blue-600",
  },
  {
    icon: UserPlusIcon,
    title: "Smart Intake",
    description: "Collect photos, budget, timeline",
    subDescription: "Auto-qualify leads, Booking link embedded in flow",
    color: "bg-green-50 text-green-600",
  },
  {
    icon: DocumentTextIcon,
    title: "Fast Proposals",
    description: "Pre-defined templates & pricing library",
    subDescription: "Auto-fill from intake, Branded PDF delivery",
    color: "bg-purple-50 text-purple-600",
  },
  {
    icon: CurrencyDollarIcon,
    title: "Auto-Invoicing",
    description: "Generate invoices from accepted quotes",
    subDescription: "Deposit requests, Automated reminders & overdue handling",
    color: "bg-orange-50 text-orange-600",
  },
  {
    icon: UserIcon,
    title: "Client Portal",
    description: "Define job phases (e.g., rough-in, finish)",
    subDescription: "Milestone notifications, Client status view",
    color: "bg-indigo-50 text-indigo-600",
  },
  {
    icon: HeartIcon,
    title: "Review Automation",
    description: "Ask for Google/Facebook reviews",
    subDescription: "Auto-post positive ones, Referral prompts & rewards",
    color: "bg-pink-50 text-pink-600",
  },
];

export default function ProjectModules() {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-4">
            Comprehensive workflow automation for every aspect of contracting
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to streamline your contracting business in one unified platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {modules.map((module, index) => (
            <div
              key={index}
              className="group relative bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
            >
              <div className={`flex items-center justify-center w-12 h-12 rounded-full ${module.color} mb-4`}>
                <module.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">
                {module.title}
              </h3>
              <p className="text-gray-600 text-sm mb-2">
                {module.description}
              </p>
              <p className="text-gray-500 text-xs">
                {module.subDescription}
              </p>
              
              {/* Hover glow effect */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-400/0 to-blue-400/0 group-hover:from-emerald-400/5 group-hover:to-blue-400/5 transition-all duration-300 pointer-events-none"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
