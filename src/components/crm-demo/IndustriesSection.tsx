"use client";

import {
  WrenchScrewdriverIcon,
  BuildingOfficeIcon,
  CalculatorIcon,
  HeartIcon
} from "@heroicons/react/24/outline";

const industries = [
  {
    icon: WrenchScrewdriverIcon,
    title: "CRM for Contractors",
    description: "Track jobs from lead to invoice.",
    link: "/industries/contractors",
    color: "text-orange-400",
    bgColor: "bg-orange-500/20",
  },
  {
    icon: BuildingOfficeIcon,
    title: "CRM for Property Management",
    description: "Manage tenants, maintenance, and rent collection.",
    link: "/industries/property-management",
    color: "text-blue-400",
    bgColor: "bg-blue-500/20",
  },
  {
    icon: CalculatorIcon,
    title: "CRM for Accounting",
    description: "Streamline onboarding and tax preparation.",
    link: "/industries/accounting",
    color: "text-sky-400",
    bgColor: "bg-sky-500/20",
  },
  {
    icon: HeartIcon,
    title: "CRM for Healthcare",
    description: "Patient management and appointment scheduling.",
    link: "/industries/healthcare",
    color: "text-red-400",
    bgColor: "bg-red-500/20",
  },
];

export default function IndustriesSection() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Built for Your Industry
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Pre-configured workflows and features designed for your specific business needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {industries.map((industry, index) => {
            const IconComponent = industry.icon;
            return (
              <a
                key={index}
                href={industry.link}
                className="group relative bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-sky-500/30 transition-all duration-600 ease-premium-out transform hover:-translate-y-2 block"
              >
                <div className="flex flex-col items-center text-center">
                  <div className={`w-16 h-16 ${industry.bgColor} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className={`w-8 h-8 ${industry.color}`} />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {industry.title}
                  </h3>
                  <p className="text-white/60 leading-relaxed mb-4">
                    {industry.description}
                  </p>
                  <span className="inline-flex items-center text-sky-400 font-medium group-hover:text-sky-300 transition-colors">
                    Learn More
                    <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>

                {/* Hover glow effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-sky-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </a>
            );
          })}
        </div>

        {/* Additional Industries */}
        <div className="mt-16 text-center">
          <div className="max-w-4xl mx-auto bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
            <h3 className="text-2xl font-bold text-white mb-4">
              More Industries Supported
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <BuildingOfficeIcon className="w-6 h-6 text-blue-400" />
                </div>
                <p className="text-sm font-medium text-white/70">Real Estate</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-sky-500/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <WrenchScrewdriverIcon className="w-6 h-6 text-sky-400" />
                </div>
                <p className="text-sm font-medium text-white/70">Cleaning Services</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <CalculatorIcon className="w-6 h-6 text-purple-400" />
                </div>
                <p className="text-sm font-medium text-white/70">Professional Services</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <HeartIcon className="w-6 h-6 text-orange-400" />
                </div>
                <p className="text-sm font-medium text-white/70">Healthcare</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
