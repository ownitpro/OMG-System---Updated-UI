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
    color: "text-sky-400",
  },
  {
    icon: ClockIcon,
    title: "Automated Lead Follow-up",
    description: "Respond to leads up to 7× faster.",
    color: "text-blue-400",
  },
  {
    icon: CogIcon,
    title: "Industry-Ready Workflows",
    description: "Pre-built flows for property management, real estate and more.",
    color: "text-cyan-400",
  },
  {
    icon: DevicePhoneMobileIcon,
    title: "Mobile Access",
    description: "Access your CRM anywhere, anytime.",
    color: "text-sky-300",
  },
  {
    icon: ChartBarIcon,
    title: "Reporting & Analytics",
    description: "Make data-driven decisions with real-time insights.",
    color: "text-blue-300",
  },
];

export default function WhyChooseSection() {
  return (
    <section className="py-20 md:py-32 bg-black relative overflow-hidden">
      {/* Subtle background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-500/5 via-transparent to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Why Choose Our CRM?
          </h2>
          <p className="text-xl md:text-2xl text-white/60 max-w-3xl mx-auto">
            Built specifically for real businesses that need more than just contact management
          </p>
        </div>

        {/* Features - Clean List Layout */}
        <div className="max-w-5xl mx-auto space-y-12">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={index}
                className="group flex items-start gap-6 md:gap-8 hover:translate-x-2 transition-transform duration-300"
              >
                {/* Icon */}
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className={`w-8 h-8 md:w-10 md:h-10 ${feature.color}`} />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 pt-2">
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-sky-400 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-base md:text-lg text-white/60 leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Subtle divider line */}
                <div className="hidden md:block flex-shrink-0 w-px h-16 bg-gradient-to-b from-transparent via-white/10 to-transparent"></div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 text-center">
          <div className="inline-flex items-center px-6 py-3 border-l-4 border-sky-400 bg-sky-500/10">
            <div className="w-2 h-2 bg-sky-400 rounded-full mr-3 animate-pulse"></div>
            <span className="text-sky-400 font-medium text-lg">
              All features included in your free trial
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
