"use client";

import { useState } from "react";
import { 
  ShoppingBagIcon, 
  HomeIcon, 
  HeartIcon, 
  ComputerDesktopIcon,
  BuildingStorefrontIcon,
  UserGroupIcon
} from "@heroicons/react/24/outline";

const industries = [
  {
    id: 1,
    name: "E-commerce",
    icon: ShoppingBagIcon,
    color: "blue",
    description: "SEO-rich product listings, reviews, ad copy, campaigns.",
    templates: [
      "Product descriptions",
      "SEO-optimized listings",
      "Customer reviews",
      "Ad copy & campaigns",
      "Email marketing",
      "Social media content"
    ],
    useCases: [
      "Boost product visibility with SEO-optimized descriptions",
      "Create compelling ad copy that converts",
      "Generate customer review responses",
      "Build email marketing campaigns"
    ]
  },
  {
    id: 2,
    name: "Real Estate",
    icon: HomeIcon,
    color: "emerald",
    description: "Listing descriptions, market reports, newsletters, social campaigns.",
    templates: [
      "Property listings",
      "Market reports",
      "Newsletters",
      "Social campaigns",
      "Agent bios",
      "Neighborhood guides"
    ],
    useCases: [
      "Create compelling property descriptions",
      "Generate market analysis reports",
      "Build agent marketing materials",
      "Develop neighborhood content"
    ]
  },
  {
    id: 3,
    name: "Healthcare",
    icon: HeartIcon,
    color: "red",
    description: "Patient education materials, compliant blogs/marketing, regulatory content.",
    templates: [
      "Patient education",
      "Compliant marketing",
      "Regulatory content",
      "Medical blogs",
      "Treatment guides",
      "Health newsletters"
    ],
    useCases: [
      "Create patient-friendly content",
      "Generate compliant marketing materials",
      "Develop educational resources",
      "Build regulatory documentation"
    ]
  },
  {
    id: 4,
    name: "Technology",
    icon: ComputerDesktopIcon,
    color: "purple",
    description: "Technical documentation, product launches, developer resources, marketing campaigns.",
    templates: [
      "Technical docs",
      "Product launches",
      "Developer resources",
      "Marketing campaigns",
      "API documentation",
      "User guides"
    ],
    useCases: [
      "Generate technical documentation",
      "Create product launch content",
      "Build developer resources",
      "Develop marketing campaigns"
    ]
  },
  {
    id: 5,
    name: "Retail",
    icon: BuildingStorefrontIcon,
    color: "orange",
    description: "Product catalogs, seasonal campaigns, customer communications, brand content.",
    templates: [
      "Product catalogs",
      "Seasonal campaigns",
      "Customer communications",
      "Brand content",
      "Promotional materials",
      "Store descriptions"
    ],
    useCases: [
      "Create seasonal marketing campaigns",
      "Generate product catalog content",
      "Build customer communication templates",
      "Develop brand storytelling"
    ]
  },
  {
    id: 6,
    name: "Services",
    icon: UserGroupIcon,
    color: "cyan",
    description: "Service descriptions, case studies, testimonials, thought leadership content.",
    templates: [
      "Service descriptions",
      "Case studies",
      "Testimonials",
      "Thought leadership",
      "Process guides",
      "Client communications"
    ],
    useCases: [
      "Create compelling service descriptions",
      "Generate case study content",
      "Build thought leadership articles",
      "Develop client communication templates"
    ]
  }
];

const colorClasses = {
  blue: "from-blue-500 to-blue-600",
  emerald: "from-emerald-500 to-emerald-600",
  red: "from-red-500 to-red-600",
  purple: "from-purple-500 to-purple-600",
  orange: "from-orange-500 to-orange-600",
  cyan: "from-cyan-500 to-cyan-600"
};

const bgColorClasses = {
  blue: "bg-blue-500/10 border-blue-500/30",
  emerald: "bg-emerald-500/10 border-emerald-500/30",
  red: "bg-red-500/10 border-red-500/30",
  purple: "bg-purple-500/10 border-purple-500/30",
  orange: "bg-orange-500/10 border-orange-500/30",
  cyan: "bg-cyan-500/10 border-cyan-500/30"
};

export default function IndustryTemplatesSection() {
  const [hoveredIndustry, setHoveredIndustry] = useState<number | null>(null);

  return (
    <section className="py-16 md:py-24 bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Tailor-made for Your Industry — No Guesswork Needed
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Industry-Specific Templates & Use Cases
          </p>
        </div>

        {/* Industries Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {industries.map((industry, index) => {
            const Icon = industry.icon;
            const isHovered = hoveredIndustry === industry.id;
            
            return (
              <div
                key={industry.id}
                className={`group relative bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 ${
                  isHovered ? 'scale-105' : ''
                }`}
                onMouseEnter={() => setHoveredIndustry(industry.id)}
                onMouseLeave={() => setHoveredIndustry(null)}
                style={{ 
                  transitionDelay: `${index * 100}ms`,
                  opacity: 1,
                  transform: 'translateY(0)'
                }}
              >
                {/* Industry Header */}
                <div className="flex items-center mb-4">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${colorClasses[industry.color as keyof typeof colorClasses]} flex items-center justify-center mr-4`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white group-hover:text-emerald-400 transition-colors">
                      {industry.name}
                    </h3>
                  </div>
                </div>

                {/* Industry Description */}
                <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                  {industry.description}
                </p>

                {/* Templates List */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-emerald-400 mb-2">Templates:</h4>
                  <div className="flex flex-wrap gap-1">
                    {industry.templates.slice(0, 3).map((template, templateIndex) => (
                      <span
                        key={templateIndex}
                        className="px-2 py-1 bg-white/10 rounded text-xs text-white/80"
                      >
                        {template}
                      </span>
                    ))}
                    <span className="px-2 py-1 bg-emerald-500/20 rounded text-xs text-emerald-400">
                      +{industry.templates.length - 3} more
                    </span>
                  </div>
                </div>

                {/* Use Cases */}
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-emerald-400 mb-2">Use Cases:</h4>
                  {industry.useCases.slice(0, 2).map((useCase, useCaseIndex) => (
                    <div key={useCaseIndex} className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-xs text-gray-300">{useCase}</span>
                    </div>
                  ))}
                </div>

                {/* Hover Effect Overlay */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}></div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center px-6 py-3 bg-white/5 backdrop-blur-md border border-white/20 rounded-full">
            <div className="w-2 h-2 bg-emerald-400 rounded-full mr-3 animate-pulse"></div>
            <span className="text-white font-medium">Choose your industry to get started with tailored templates</span>
          </div>
        </div>
      </div>
    </section>
  );
}
