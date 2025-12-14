"use client";

import { EyeIcon, ChatBubbleLeftRightIcon, BoltIcon } from "@heroicons/react/24/outline";

const benefits = [
  {
    icon: EyeIcon,
    title: "See real workflows",
    description: "Experience CRM, docs & automation built for your industry.",
    color: "text-blue-600",
    bgColor: "bg-blue-50"
  },
  {
    icon: ChatBubbleLeftRightIcon,
    title: "Ask live questions",
    description: "Explore controls freely, get answers as you go.",
    color: "text-emerald-600",
    bgColor: "bg-emerald-50"
  },
  {
    icon: BoltIcon,
    title: "Immediate value",
    description: "See how OMGsystems saves you time and helps you grow.",
    color: "text-purple-600",
    bgColor: "bg-purple-50"
  }
];

export default function BenefitsSection() {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-4">
            Why try a live demo?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience the power of OMGsystems firsthand with our interactive, industry-specific demos
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2 text-center"
            >
              <div className={`flex items-center justify-center w-16 h-16 rounded-full ${benefit.bgColor} mx-auto mb-6`}>
                <benefit.icon className={`h-8 w-8 ${benefit.color}`} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {benefit.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
