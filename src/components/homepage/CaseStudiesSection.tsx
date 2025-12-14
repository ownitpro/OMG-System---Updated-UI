"use client";

import { useState, useEffect } from "react";
import { 
  BuildingOfficeIcon,
  HomeIcon,
  WrenchScrewdriverIcon,
  CalculatorIcon,
  HeartIcon,
  SparklesIcon,
  ArrowRightIcon,
  PlayIcon,
  ChartBarIcon
} from "@heroicons/react/24/outline";
import Link from "next/link";

const caseStudies = [
  {
    id: 1,
    title: "Property Management Success",
    industry: "Property Management",
    icon: BuildingOfficeIcon,
    color: "blue",
    challenge: "Manual lead management and tenant communication",
    solution: "Automated lead scoring and tenant portal",
    results: [
      { metric: "40%", label: "Faster Lead Response" },
      { metric: "60%", label: "Reduced Admin Time" },
      { metric: "25%", label: "Higher Tenant Satisfaction" }
    ],
    testimonial: "",
    company: "",
    cta: "View Case Study",
    href: "/case-studies/property-management"
  },
  {
    id: 2,
    title: "Real Estate Brokerage Growth",
    industry: "Real Estate",
    icon: HomeIcon,
    color: "emerald",
    challenge: "Scattered lead sources and manual follow-ups",
    solution: "Unified CRM with automated nurturing sequences",
    results: [
      { metric: "3x", label: "More Qualified Leads" },
      { metric: "50%", label: "Faster Deal Closure" },
      { metric: "35%", label: "Higher Conversion Rate" }
    ],
    testimonial: "",
    company: "",
    cta: "View Case Study",
    href: "/case-studies/real-estate"
  },
  {
    id: 3,
    title: "Contractor Business Optimization",
    industry: "Contractors",
    icon: WrenchScrewdriverIcon,
    color: "orange",
    challenge: "Manual quote generation and project tracking",
    solution: "Automated quoting and project management system",
    results: [
      { metric: "45 min", label: "Quote Generation Time" },
      { metric: "32%", label: "Higher Close Rate" },
      { metric: "50%", label: "Faster Project Delivery" }
    ],
    testimonial: "",
    company: "",
    cta: "View Case Study",
    href: "/case-studies/contractors"
  },
  {
    id: 4,
    title: "Accounting Firm Efficiency",
    industry: "Accounting",
    icon: CalculatorIcon,
    color: "purple",
    challenge: "Manual data entry and client communication",
    solution: "Automated data processing and client portal",
    results: [
      { metric: "2 weeks", label: "Integration Time" },
      { metric: "99.9%", label: "Report Accuracy" },
      { metric: "70%", label: "Reduced Manual Work" }
    ],
    testimonial: "",
    company: "",
    cta: "View Case Study",
    href: "/case-studies/accounting"
  },
  {
    id: 5,
    title: "Healthcare Practice Modernization",
    industry: "Healthcare",
    icon: HeartIcon,
    color: "red",
    challenge: "Administrative burden and patient communication",
    solution: "Automated scheduling and patient management",
    results: [
      { metric: "70%", label: "Less Admin Time" },
      { metric: "50%", label: "Higher Patient Throughput" },
      { metric: "90%", label: "Patient Satisfaction" }
    ],
    testimonial: "",
    company: "",
    cta: "View Case Study",
    href: "/case-studies/healthcare"
  },
  {
    id: 6,
    title: "Cleaning Service Scaling",
    industry: "Cleaning",
    icon: SparklesIcon,
    color: "teal",
    challenge: "Manual scheduling and billing processes",
    solution: "Automated scheduling and instant billing system",
    results: [
      { metric: "60%", label: "Higher Productivity" },
      { metric: "Instant", label: "Billing Time" },
      { metric: "40%", label: "More Bookings" }
    ],
    testimonial: "",
    company: "",
    cta: "View Case Study",
    href: "/case-studies/cleaning"
  }
];

export default function HomepageCaseStudiesSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCase, setActiveCase] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCase(prev => (prev + 1) % caseStudies.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="case-studies" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Real Results from Real Businesses
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See how businesses across different industries are transforming their operations 
            with OMGsystems automation solutions.
          </p>
        </div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-16">
          {caseStudies.map((caseStudy, index) => (
            <div
              key={caseStudy.id}
              className={`bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 ${
                isVisible ? 'animate-fade-in-up' : 'opacity-0'
              } ${activeCase === index ? 'ring-2 ring-blue-500 scale-105' : ''}`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Industry Badge */}
              <div className="flex items-center space-x-2 mb-4">
                <caseStudy.icon className={`w-5 h-5 text-${caseStudy.color}-600`} />
                <span className={`text-sm font-semibold text-${caseStudy.color}-600 bg-${caseStudy.color}-100 px-3 py-1 rounded-full`}>
                  {caseStudy.industry}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {caseStudy.title}
              </h3>

              {/* Challenge & Solution */}
              <div className="mb-6">
                <div className="mb-3">
                  <h4 className="text-sm font-semibold text-red-600 mb-1">Challenge:</h4>
                  <p className="text-sm text-gray-600">{caseStudy.challenge}</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-green-600 mb-1">Solution:</h4>
                  <p className="text-sm text-gray-600">{caseStudy.solution}</p>
                </div>
              </div>

              {/* Results */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                {caseStudy.results.map((result, resultIndex) => (
                  <div key={resultIndex} className="text-center">
                    <div className={`text-2xl font-bold text-${caseStudy.color}-600`}>
                      {result.metric}
                    </div>
                    <div className="text-xs text-gray-600">
                      {result.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Testimonial - Only show if testimonial exists */}
              {caseStudy.testimonial && (
                <div className="bg-gray-50 rounded-lg p-3 mb-4">
                  <p className="text-sm text-gray-700 italic">
                    "{caseStudy.testimonial}"
                  </p>
                  {caseStudy.company && (
                    <div className="text-xs text-gray-500 mt-2">
                      — {caseStudy.company}
                    </div>
                  )}
                </div>
              )}

              {/* CTA */}
              <Link
                href={caseStudy.href}
                className={`inline-flex items-center w-full justify-center px-4 py-2 bg-${caseStudy.color}-600 text-white font-semibold rounded-lg hover:bg-${caseStudy.color}-700 transition-colors group`}
              >
                {caseStudy.cta}
                <ArrowRightIcon className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          ))}
        </div>

        {/* Industry Overview */}
        <div className="bg-white rounded-3xl p-8 shadow-lg">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Trusted Across Industries
            </h3>
            <p className="text-gray-600">
              From property management to healthcare, we help businesses automate their workflows
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {caseStudies.map((caseStudy, index) => (
              <div
                key={caseStudy.id}
                className="text-center group cursor-pointer"
                onClick={() => setActiveCase(index)}
              >
                <div className={`w-16 h-16 bg-${caseStudy.color}-100 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                  <caseStudy.icon className={`w-8 h-8 text-${caseStudy.color}-600`} />
                </div>
                <div className="text-sm font-semibold text-gray-900">
                  {caseStudy.industry}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link
            href="/case-studies"
            className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors group"
          >
            <ChartBarIcon className="w-5 h-5 mr-2" />
            View All Success Stories
            <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
