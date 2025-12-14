"use client";

import { CheckIcon, ShieldCheckIcon, LockClosedIcon, GlobeAltIcon } from "@heroicons/react/24/outline";

const trustFeatures = [
  {
    icon: CheckIcon,
    text: "No registration required",
    color: "text-emerald-600",
  },
  {
    icon: CheckIcon,
    text: "5-minute interactive demo",
    color: "text-blue-600",
  },
  {
    icon: CheckIcon,
    text: "Tailored demo by industry",
    color: "text-purple-600",
  },
];

const securityFeatures = [
  {
    icon: ShieldCheckIcon,
    title: "Bank-Level Security",
    description: "AES-256 encryption protects your data",
  },
  {
    icon: LockClosedIcon,
    title: "Canadian Data Residency",
    description: "Your data stays in Canada, always",
  },
  {
    icon: GlobeAltIcon,
    title: "Compliance Ready",
    description: "Built for Canadian privacy laws",
  },
];

export default function TrustPanel() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-gray-900 to-blue-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/images/securevault-demo/trust-pattern.svg')] bg-cover bg-center opacity-10"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Trusted by Thousands of Businesses
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Experience the same security and reliability that powers businesses across Canada
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Trust Features */}
          <div className="space-y-8">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold text-white mb-6">
                Try It Risk-Free
              </h3>
              <div className="space-y-4">
                {trustFeatures.map((feature, index) => {
                  const IconComponent = feature.icon;
                  return (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="flex-shrink-0">
                        <IconComponent className={`w-6 h-6 ${feature.color}`} />
                      </div>
                      <span className="text-white/90 text-lg">
                        {feature.text}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Security Features */}
          <div className="space-y-6">
            {securityFeatures.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-colors duration-300">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                        <IconComponent className="w-6 h-6 text-emerald-400" />
                      </div>
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-white mb-2">
                        {feature.title}
                      </h4>
                      <p className="text-white/70">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-4xl font-bold text-white mb-2">10,000+</div>
            <div className="text-white/70">Businesses Trust Us</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-white mb-2">99.9%</div>
            <div className="text-white/70">Uptime Guarantee</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-white mb-2">24/7</div>
            <div className="text-white/70">Support Available</div>
          </div>
        </div>
      </div>
    </section>
  );
}
