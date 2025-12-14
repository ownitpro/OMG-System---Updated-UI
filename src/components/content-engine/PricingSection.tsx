"use client";

import { useState } from "react";
import { 
  CheckIcon, 
  StarIcon,
  RocketLaunchIcon,
  SparklesIcon
} from "@heroicons/react/24/outline";

const plans = [
  {
    id: 1,
    name: "Creator",
    price: "$29",
    period: "/ mo",
    description: "Perfect for freelancers and personal brands",
    features: [
      "Up to 50 pieces/month",
      "AI copy + visual + video tools",
      "Workflow analytics",
      "Email support",
      "Industry templates",
      "Basic integrations"
    ],
    cta: "Get Started",
    popular: false,
    color: "blue"
  },
  {
    id: 2,
    name: "Business",
    price: "$99",
    period: "/ mo",
    description: "Ideal for SMBs and in-house teams",
    features: [
      "Up to 500 pieces/month",
      "AI copy + visual + video tools",
      "Advanced analytics",
      "Priority support",
      "Custom templates",
      "API access",
      "Team collaboration",
      "Brand guidelines"
    ],
    cta: "Start Free Trial",
    popular: true,
    color: "emerald"
  },
  {
    id: 3,
    name: "Enterprise",
    price: "$299",
    period: "/ mo",
    description: "Built for agencies and large organizations",
    features: [
      "Unlimited content",
      "Custom AI models",
      "Advanced analytics",
      "Dedicated support",
      "Custom integrations",
      "White-label options",
      "Advanced security",
      "SLA guarantees"
    ],
    cta: "Contact Sales",
    popular: false,
    color: "purple"
  }
];

const colorClasses = {
  blue: "from-blue-500 to-blue-600",
  emerald: "from-emerald-500 to-emerald-600",
  purple: "from-purple-500 to-purple-600"
};

const bgColorClasses = {
  blue: "bg-blue-500/10 border-blue-500/30",
  emerald: "bg-emerald-500/10 border-emerald-500/30",
  purple: "bg-purple-500/10 border-purple-500/30"
};

export default function PricingSection() {
  const [selectedPlan, setSelectedPlan] = useState(2);

  return (
    <section className="py-16 md:py-24 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Flexible Plans for Every Business — All Powered by AI
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Pricing
          </p>
        </div>

        {/* Pricing Table */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => {
            const isSelected = selectedPlan === plan.id;
            const isPopular = plan.popular;
            
            return (
              <div
                key={plan.id}
                className={`relative group cursor-pointer transition-all duration-300 transform hover:-translate-y-2 ${
                  isSelected ? 'scale-105' : ''
                }`}
                onClick={() => setSelectedPlan(plan.id)}
              >
                {/* Popular Badge */}
                {isPopular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="bg-gradient-to-r from-emerald-500 to-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center">
                      <StarIcon className="w-4 h-4 mr-1" />
                      Most Popular
                    </div>
                  </div>
                )}

                {/* Plan Card */}
                <div className={`relative bg-white/5 backdrop-blur-md rounded-2xl p-8 border shadow-lg hover:shadow-xl transition-all duration-300 ${
                  isPopular 
                    ? 'border-emerald-500/50 ring-2 ring-emerald-500/20' 
                    : 'border-white/10 hover:border-white/20'
                }`}>
                  {/* Plan Header */}
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                    <div className="flex items-baseline justify-center mb-2">
                      <span className="text-4xl font-bold text-white">{plan.price}</span>
                      <span className="text-gray-400 ml-1">{plan.period}</span>
                    </div>
                    <p className="text-gray-300 text-sm">{plan.description}</p>
                  </div>

                  {/* Plan Features */}
                  <div className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-start space-x-3">
                        <CheckIcon className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-300 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <button className={`w-full py-3 px-6 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 ${
                    isPopular
                      ? 'bg-gradient-to-r from-emerald-500 to-blue-500 text-white hover:from-emerald-600 hover:to-blue-600'
                      : 'bg-white/10 text-white border border-white/20 hover:bg-white/20'
                  }`}>
                    {plan.cta}
                  </button>

                  {/* Hover Effect Overlay */}
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* All Plans Include */}
        <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 shadow-lg mb-16">
          <div className="text-center mb-6">
            <h3 className="text-xl font-semibold text-white mb-2">All plans include:</h3>
            <p className="text-gray-300">AI copy + visual + video tools, workflow analytics, support, and industry templates.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              "AI copy + visual + video tools",
              "Workflow analytics",
              "Email support",
              "Industry templates"
            ].map((feature, index) => (
              <div key={index} className="flex items-center space-x-2">
                <CheckIcon className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span className="text-gray-300 text-sm">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <div className="mb-6">
            <p className="text-white text-lg mb-4">
              Click Get Started to lock in pricing or start your free demo instantly!
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-medium rounded-lg text-gray-900 bg-emerald-400 hover:bg-emerald-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl">
              <RocketLaunchIcon className="w-5 h-5 mr-2" />
              🚀 Try the Free Demo
            </button>
            <button className="inline-flex items-center justify-center px-8 py-4 border border-emerald-400/30 text-lg font-medium rounded-lg text-emerald-400 bg-emerald-400/10 hover:bg-emerald-400/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-400 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl">
              <SparklesIcon className="w-5 h-5 mr-2" />
              🤝 Speak with a Content Expert
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
