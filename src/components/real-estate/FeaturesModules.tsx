"use client";

import {
  UserGroupIcon,
  ChartBarIcon,
  HomeIcon,
  MegaphoneIcon,
  DocumentTextIcon,
  UserIcon,
  HeartIcon,
  ChartPieIcon,
} from "@heroicons/react/24/outline";

const modules = [
  {
    icon: UserGroupIcon,
    title: "LeadFlow for Realtors",
    description: "Multi-channel lead capture (website, ads, referrals)",
    subDescription: "Lead scoring based on behaviour & engagement",
    color: "bg-blue-50 text-blue-600",
  },
  {
    icon: ChartBarIcon,
    title: "Smart CRM",
    description: "Pipeline views, contact tagging, reminders, analytics",
    subDescription: "Custom deal stages; team collaboration & lead assignment",
    color: "bg-green-50 text-green-600",
  },
  {
    icon: HomeIcon,
    title: "Listing Sync",
    description: "Auto-import from MLS, editable listing pages, instant social previews",
    subDescription: "Real-time MLS data synchronization",
    color: "bg-purple-50 text-purple-600",
  },
  {
    icon: MegaphoneIcon,
    title: "Marketing Hub",
    description: "Schedule ads, posts, newsletters from dashboard",
    subDescription: "Automated social media posting & ad campaign management",
    color: "bg-orange-50 text-orange-600",
  },
  {
    icon: DocumentTextIcon,
    title: "Transaction Manager",
    description: "Digital signatures, status updates, compliance logs",
    subDescription: "Automated contract generation & e-signature workflows",
    color: "bg-red-50 text-red-600",
  },
  {
    icon: UserIcon,
    title: "Client Portal",
    description: "Clients track showings, offers & closing status",
    subDescription: "Secure document sharing & communication; real-time updates",
    color: "bg-indigo-50 text-indigo-600",
  },
  {
    icon: HeartIcon,
    title: "Referral & Review Engine",
    description: "Automatic testimonial requests post-closing",
    subDescription: "Referral tracking & reward automation; review management",
    color: "bg-pink-50 text-pink-600",
  },
  {
    icon: ChartPieIcon,
    title: "Analytics Dashboard",
    description: "Real-time deal, commission & marketing metrics",
    subDescription: "Performance tracking, ROI analysis, custom reports",
    color: "bg-teal-50 text-teal-600",
  },
];

export default function FeaturesModules() {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-4">
            Eight modules designed for Canadian real estate workflows
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to streamline your real estate business in one unified platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
