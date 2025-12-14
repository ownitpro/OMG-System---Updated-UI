"use client";

import {
  CalendarIcon,
  ChatBubbleLeftRightIcon,
  DocumentTextIcon,
  ClipboardDocumentListIcon,
  MapPinIcon,
  StarIcon,
  DocumentArrowUpIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";

const modules = [
  {
    icon: CalendarIcon,
    title: "Smart Scheduling",
    description: "Assign staff, auto adjust routes, handle sick days instantly",
    features: [
      "Real-time availability & conflict resolution",
      "Route optimization saves fuel & time"
    ],
    color: "bg-blue-50 text-blue-600",
  },
  {
    icon: ChatBubbleLeftRightIcon,
    title: "Client Communication",
    description: "Live client portals, automated messages, photo proof uploads",
    features: [
      "Real-time job status updates & notifications",
      "Two-way communication with instant responses"
    ],
    color: "bg-green-50 text-green-600",
  },
  {
    icon: DocumentTextIcon,
    title: "Quote & Invoice Automation",
    description: "Send quotes, convert to jobs, auto-issue invoice",
    features: [
      "Recurring billing, payment tracking",
      "Late payment reminders & collection automation"
    ],
    color: "bg-purple-50 text-purple-600",
  },
  {
    icon: ClipboardDocumentListIcon,
    title: "Task & Supply Tracking",
    description: "Smart checklists, consumable monitoring, automated triggers",
    features: [
      "Inventory management & cost tracking",
      "Quality control & compliance reporting"
    ],
    color: "bg-orange-50 text-orange-600",
  },
  {
    icon: MapPinIcon,
    title: "Employee Time-Clock & GPS",
    description: "Mobile clock-in/out, map tracking, route optimization",
    features: [
      "Time tracking & payroll integration",
      "Performance monitoring & safety alerts"
    ],
    color: "bg-indigo-50 text-indigo-600",
  },
  {
    icon: StarIcon,
    title: "Review & Referral Engine",
    description: "Sends review requests + referral codes after job",
    features: [
      "Social media integration, reputation management",
      "Referral tracking & reward automation"
    ],
    color: "bg-pink-50 text-pink-600",
  },
  {
    icon: DocumentArrowUpIcon,
    title: "SecureVault Docs Integration",
    description: "Upload contracts, inspection reports, compliance forms",
    features: [
      "Secure document storage & sharing",
      "Audit trails & compliance reporting"
    ],
    color: "bg-emerald-50 text-emerald-600",
  },
  {
    icon: ChartBarIcon,
    title: "Analytics Dashboard",
    description: "Jobs per week, satisfaction score, revenue trendline",
    features: [
      "Performance metrics & KPI tracking",
      "Predictive analytics & business insights"
    ],
    color: "bg-cyan-50 text-cyan-600",
  },
];

export default function CleaningModules() {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-4">
            Eight powerful modules designed for cleaning businesses.
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to streamline your cleaning operations in one unified platform.
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
              <p className="text-gray-600 text-sm mb-3">
                {module.description}
              </p>
              <ul className="space-y-1">
                {module.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="text-xs text-gray-500 flex items-start">
                    <span className="w-1 h-1 bg-emerald-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                    {feature}
                  </li>
                ))}
              </ul>
              
              {/* Hover glow effect */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-400/0 to-blue-400/0 group-hover:from-emerald-400/5 group-hover:to-blue-400/5 transition-all duration-300 pointer-events-none"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
