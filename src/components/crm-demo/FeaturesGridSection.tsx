"use client";

import { 
  UserGroupIcon, 
  ChartBarIcon, 
  CogIcon, 
  DocumentTextIcon, 
  PresentationChartBarIcon, 
  UsersIcon 
} from "@heroicons/react/24/outline";

const features = [
  {
    icon: UserGroupIcon,
    title: "Contact & Lead Management",
    description: "Capture, organise, and track every interaction.",
    color: "text-blue-600",
    bgColor: "bg-blue-500/10",
  },
  {
    icon: ChartBarIcon,
    title: "Pipeline Tracking",
    description: "Visualise your sales pipeline; never lose an opportunity.",
    color: "text-emerald-600",
    bgColor: "bg-emerald-500/10",
  },
  {
    icon: CogIcon,
    title: "Automation Builder",
    description: "Create custom workflows that work 24/7 to nurture leads and clients.",
    color: "text-purple-600",
    bgColor: "bg-purple-500/10",
  },
  {
    icon: DocumentTextIcon,
    title: "Document Integration",
    description: "Store and organise all client documents in one secure place.",
    color: "text-indigo-600",
    bgColor: "bg-indigo-500/10",
  },
  {
    icon: PresentationChartBarIcon,
    title: "Reporting Dashboard",
    description: "Gain insights with customisable, real-time reports.",
    color: "text-orange-600",
    bgColor: "bg-orange-500/10",
  },
  {
    icon: UsersIcon,
    title: "Team Collaboration",
    description: "Shared notes, tasks, and communication to keep your team aligned.",
    color: "text-pink-600",
    bgColor: "bg-pink-500/10",
  },
];

export default function FeaturesGridSection() {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Everything You Need in One Platform
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A complete CRM solution that grows with your business
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={index}
                className="group relative bg-white rounded-2xl p-6 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="flex flex-col">
                  <div className={`w-12 h-12 ${feature.bgColor} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className={`w-6 h-6 ${feature.color}`} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
                
                {/* Hover glow effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            );
          })}
        </div>

        {/* Integration Note */}
        <div className="mt-16 text-center">
          <div className="max-w-4xl mx-auto bg-white rounded-2xl p-8 border border-gray-200 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Seamless Integration
            </h3>
            <p className="text-gray-600 mb-6">
              Connect your CRM with email, document management, accounting software, and more. 
              No more switching between systems—everything works together.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">Email Integration</span>
              <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">Document Storage</span>
              <span className="px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">Accounting Software</span>
              <span className="px-4 py-2 bg-orange-100 text-orange-800 rounded-full text-sm font-medium">Calendar Sync</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
