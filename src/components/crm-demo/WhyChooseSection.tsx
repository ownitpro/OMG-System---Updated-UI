"use client";

import { 
  DocumentTextIcon, 
  ClockIcon, 
  CogIcon, 
  DevicePhoneMobileIcon, 
  ChartBarIcon 
} from "@heroicons/react/24/outline";

const features = [
  {
    icon: DocumentTextIcon,
    title: "Single Source of Truth",
    description: "Unify leads, clients & documents in one place.",
    color: "text-[#47BD79]",
    bgColor: "bg-[#47BD79]/20",
  },
  {
    icon: ClockIcon,
    title: "Automated Lead Follow-up",
    description: "Respond to leads up to 7× faster.",
    color: "text-blue-400",
    bgColor: "bg-blue-500/20",
  },
  {
    icon: CogIcon,
    title: "Industry-Ready Workflows",
    description: "Pre-built flows for property management, real estate and more.",
    color: "text-purple-400",
    bgColor: "bg-purple-500/20",
  },
  {
    icon: DevicePhoneMobileIcon,
    title: "Mobile Access",
    description: "Access your CRM anywhere, anytime.",
    color: "text-indigo-400",
    bgColor: "bg-indigo-500/20",
  },
  {
    icon: ChartBarIcon,
    title: "Reporting & Analytics",
    description: "Make data-driven decisions with real-time insights.",
    color: "text-orange-400",
    bgColor: "bg-orange-500/20",
  },
];

export default function WhyChooseSection() {
  return (
    <section className="py-16 md:py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Why Choose Our CRM?
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Built specifically for real businesses that need more than just contact management
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
                <div className="flex flex-col items-center text-center">
                  <div className={`w-16 h-16 ${feature.bgColor} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className={`w-8 h-8 ${feature.color}`} />
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

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center px-6 py-3 bg-[#47BD79]/10 border border-[#47BD79]/30 rounded-full">
            <div className="w-2 h-2 bg-[#47BD79] rounded-full mr-3 animate-pulse"></div>
            <span className="text-[#47BD79] font-medium">
              All features included in your free trial
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
