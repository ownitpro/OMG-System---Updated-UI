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
    color: "text-blue-400",
    bgColor: "bg-blue-500/20",
  },
  {
    icon: ChartBarIcon,
    title: "Pipeline Tracking",
    description: "Visualise your sales pipeline; never lose an opportunity.",
    color: "text-[#47BD79]",
    bgColor: "bg-[#47BD79]/20",
  },
  {
    icon: CogIcon,
    title: "Automation Builder",
    description: "Create custom workflows that work 24/7 to nurture leads and clients.",
    color: "text-purple-400",
    bgColor: "bg-purple-500/20",
  },
  {
    icon: DocumentTextIcon,
    title: "Document Integration",
    description: "Store and organise all client documents in one secure place.",
    color: "text-indigo-400",
    bgColor: "bg-indigo-500/20",
  },
  {
    icon: PresentationChartBarIcon,
    title: "Reporting Dashboard",
    description: "Gain insights with customisable, real-time reports.",
    color: "text-orange-400",
    bgColor: "bg-orange-500/20",
  },
  {
    icon: UsersIcon,
    title: "Team Collaboration",
    description: "Shared notes, tasks, and communication to keep your team aligned.",
    color: "text-pink-400",
    bgColor: "bg-pink-500/20",
  },
];

export default function FeaturesGridSection() {
  return (
    <section className="py-16 md:py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Everything You Need in One Platform
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            A complete CRM solution that grows with your business
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={index}
                className="group relative bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-[#47BD79]/30 transition-all duration-600 ease-premium-out transform hover:-translate-y-2"
              >
                <div className="flex flex-col">
                  <div className={`w-12 h-12 ${feature.bgColor} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className={`w-6 h-6 ${feature.color}`} />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-white/60 leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Hover glow effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#47BD79]/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            );
          })}
        </div>

        {/* Integration Note */}
        <div className="mt-16 text-center">
          <div className="max-w-4xl mx-auto bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
            <h3 className="text-2xl font-bold text-white mb-4">
              Seamless Integration
            </h3>
            <p className="text-white/70 mb-6">
              Connect your CRM with email, document management, accounting software, and more.
              No more switching between systems—everything works together.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <span className="px-4 py-2 bg-blue-500/20 text-blue-400 rounded-full text-sm font-medium">Email Integration</span>
              <span className="px-4 py-2 bg-[#47BD79]/20 text-[#47BD79] rounded-full text-sm font-medium">Document Storage</span>
              <span className="px-4 py-2 bg-purple-500/20 text-purple-400 rounded-full text-sm font-medium">Accounting Software</span>
              <span className="px-4 py-2 bg-orange-500/20 text-orange-400 rounded-full text-sm font-medium">Calendar Sync</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
