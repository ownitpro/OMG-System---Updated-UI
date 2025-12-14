"use client";

import {
  CalendarIcon,
  DocumentTextIcon,
  CurrencyDollarIcon,
  FolderIcon,
  BeakerIcon,
  UserGroupIcon,
  BellIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";

const modules = [
  {
    icon: CalendarIcon,
    title: "Smart Scheduling & Telehealth",
    description: "Self-service booking/rescheduling, multi-channel reminders, wait-list fills, EHR/calendar sync",
    color: "bg-blue-50 text-blue-600",
  },
  {
    icon: DocumentTextIcon,
    title: "Digital Intake & Documents",
    description: "Dynamic forms, e-signature, OCR for scanned/faxed docs, direct mapping to records",
    color: "bg-green-50 text-green-600",
  },
  {
    icon: CurrencyDollarIcon,
    title: "Billing & Claims",
    description: "Eligibility checks, instant submission, denial handling and tracking",
    color: "bg-purple-50 text-purple-600",
  },
  {
    icon: FolderIcon,
    title: "Secure Document Hub",
    description: "Central storage, smart tags, role-based access, cross-site sharing & audit logs",
    color: "bg-orange-50 text-orange-600",
  },
  {
    icon: BeakerIcon,
    title: "Medication & Inventory (LTC)",
    description: "Barcode dosing, auto-logging, inventory alerts, scheduled rounds overview",
    color: "bg-indigo-50 text-indigo-600",
  },
  {
    icon: UserGroupIcon,
    title: "Staff Scheduling",
    description: "AI-assisted rosters, fairness & overtime management, mobile updates",
    color: "bg-pink-50 text-pink-600",
  },
  {
    icon: BellIcon,
    title: "Alerting & Escalation",
    description: "Rules engine, routing & escalation chains, context-rich notifications, audit trails",
    color: "bg-emerald-50 text-emerald-600",
  },
  {
    icon: ChartBarIcon,
    title: "Analytics & Compliance",
    description: "KPI dashboards, SLA monitoring, compliance exports, usage trend analysis",
    color: "bg-cyan-50 text-cyan-600",
  },
];

export default function CareFlowModules() {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-4">
            Comprehensive workflow automation for every aspect of healthcare operations.
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to streamline your healthcare operations in one unified platform.
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
              <p className="text-gray-600 text-sm">
                {module.description}
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
