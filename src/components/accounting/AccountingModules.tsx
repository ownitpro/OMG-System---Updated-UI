"use client";

import {
  DocumentTextIcon,
  CogIcon,
  ChatBubbleLeftRightIcon,
  CalendarIcon,
  ShieldCheckIcon,
  SparklesIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";

const modules = [
  {
    icon: DocumentTextIcon,
    title: "Secure Document Capture & Filing",
    description: "Email-to-vault, mobile upload, OCR + classification, versioning, alerts",
    color: "bg-blue-50 text-blue-600",
  },
  {
    icon: CogIcon,
    title: "Engagement & Workflow Automation",
    description: "Service templates (T1, T2, payroll), checklists, escalation rules, tracking",
    color: "bg-green-50 text-green-600",
  },
  {
    icon: ChatBubbleLeftRightIcon,
    title: "Client Communication & Reminders",
    description: "Dynamic fields, personalised messaging, multi-channel (email/SMS)",
    color: "bg-purple-50 text-purple-600",
  },
  {
    icon: CalendarIcon,
    title: "Scheduling & Meetings",
    description: "Real-time booking, auto Zoom link, reminders",
    color: "bg-orange-50 text-orange-600",
  },
  {
    icon: ShieldCheckIcon,
    title: "Identity / KYC Verification",
    description: "Government ID + selfie checks, risk assessment, audit-ready evidence",
    color: "bg-indigo-50 text-indigo-600",
  },
  {
    icon: SparklesIcon,
    title: "AI Meeting Summaries & Task Extraction",
    description: "Auto-transcript to summary, task assignment, follow-up tracking",
    color: "bg-pink-50 text-pink-600",
  },
  {
    icon: CurrencyDollarIcon,
    title: "Billing, Invoicing & E-Sign",
    description: "Engagement letters, contract/invoice automation, e-signature tracking",
    color: "bg-emerald-50 text-emerald-600",
  },
  {
    icon: ChartBarIcon,
    title: "Dashboards, Alerts & SLA",
    description: "Pipeline/workload views, overdue item alerts, SLA monitoring & performance metrics",
    color: "bg-cyan-50 text-cyan-600",
  },
];

export default function AccountingModules() {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-4">
            End-to-end modules designed for Canadian accounting firms.
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to streamline your accounting practice in one unified platform.
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
