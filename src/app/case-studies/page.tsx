import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { ChartBarIcon, ClockIcon, UserGroupIcon, CurrencyDollarIcon, ArrowRightIcon } from "@heroicons/react/24/outline";

export const metadata: Metadata = {
  title: "Case Studies | OMGsystems",
  description: "Real success stories from Canadian businesses that have transformed their operations with OMGsystems automation platform.",
  robots: {
    index: true,
    follow: true,
  },
};

const caseStudies = [
  {
    id: "toronto-property-management",
    title: "Toronto Property Management Company",
    industry: "Property Management",
    location: "Toronto, ON",
    challenge: "Manual owner statements and tenant onboarding delays",
    solution: "Automated owner statement generation and digital tenant portals",
    results: {
      timeSaved: "75%",
      costReduction: "$45,000",
      tenantSatisfaction: "+40%",
      implementationTime: "3 weeks"
    },
    testimonial: "OMGsystems transformed our operations. We now process owner statements in minutes instead of hours, and our tenants love the digital onboarding experience.",
    author: "Sarah Chen, Operations Manager",
    company: "Metro Property Group",
    image: "/images/case-studies/property-management.jpg",
    color: "blue"
  },
  {
    id: "toronto-real-estate",
    title: "Toronto Real Estate Agency",
    industry: "Real Estate",
    location: "Toronto, ON",
    challenge: "Lead follow-up delays and missed opportunities",
    solution: "Automated lead nurturing and showing scheduler",
    results: {
      timeSaved: "60%",
      costReduction: "$32,000",
      leadConversion: "+25%",
      implementationTime: "2 weeks"
    },
    testimonial: "Our lead response time went from hours to minutes. The automated follow-up sequences have significantly improved our conversion rates.",
    author: "Mike Rodriguez, Broker",
    company: "Capital City Realty",
    image: "/images/case-studies/real-estate.jpg",
    color: "emerald"
  },
  {
    id: "hamilton-contractors",
    title: "Hamilton Construction Company",
    industry: "Contractors",
    location: "Hamilton, ON",
    challenge: "Project timeline delays and client communication gaps",
    solution: "Project management automation and client update system",
    results: {
      timeSaved: "50%",
      costReduction: "$28,000",
      projectCompletion: "+30%",
      implementationTime: "4 weeks"
    },
    testimonial: "We've eliminated the back-and-forth emails with clients. The automated project updates keep everyone informed and projects on track.",
    author: "David Kim, Project Manager",
    company: "Steel City Construction",
    image: "/images/case-studies/contractors.jpg",
    color: "orange"
  },
  {
    id: "toronto-accounting",
    title: "Toronto Accounting Firm",
    industry: "Accounting",
    location: "Toronto, ON",
    challenge: "Manual data entry and client communication",
    solution: "Automated data processing and client portal",
    results: {
      timeSaved: "70%",
      costReduction: "$52,000",
      reportAccuracy: "99.9%",
      implementationTime: "2 weeks"
    },
    testimonial: "The automated data processing has transformed our workflow. We've reduced errors to near zero and our clients love the real-time portal access.",
    author: "Jennifer Park, Managing Partner",
    company: "Park & Associates CPA",
    image: "/images/case-studies/accounting.jpg",
    color: "purple"
  }
];

const colorMap: Record<string, { bg: string; border: string; text: string; glow: string; statBg: string }> = {
  blue: {
    bg: 'bg-[#3B82F6]/10',
    border: 'border-[#3B82F6]/30',
    text: 'text-[#3B82F6]',
    glow: 'rgba(59, 130, 246, 0.2)',
    statBg: 'bg-[#3B82F6]/20'
  },
  emerald: {
    bg: 'bg-[#47BD79]/10',
    border: 'border-[#47BD79]/30',
    text: 'text-[#47BD79]',
    glow: 'rgba(71, 189, 121, 0.2)',
    statBg: 'bg-[#47BD79]/20'
  },
  orange: {
    bg: 'bg-orange-500/10',
    border: 'border-orange-500/30',
    text: 'text-orange-400',
    glow: 'rgba(249, 115, 22, 0.2)',
    statBg: 'bg-orange-500/20'
  },
  purple: {
    bg: 'bg-[#A855F7]/10',
    border: 'border-[#A855F7]/30',
    text: 'text-[#A855F7]',
    glow: 'rgba(168, 85, 247, 0.2)',
    statBg: 'bg-[#A855F7]/20'
  },
};

export default function CaseStudiesPage() {
  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-[#0f172a]" />

        {/* Background glow orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#47BD79]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-[#3B82F6]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-40 pb-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Success <span className="text-[#47BD79]">Stories</span>
            </h1>
            <p className="text-xl text-white/70 max-w-3xl mx-auto mb-10">
              See how Canadian businesses have transformed their operations with OMGsystems automation.
              Real results from real companies across Ontario.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-[#47BD79] text-white font-semibold rounded-xl hover:bg-[#3da86a] transition-all duration-300 shadow-lg shadow-[#47BD79]/30 hover:shadow-[#47BD79]/50 group"
              >
                Start Your Success Story
                <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="#case-studies"
                className="inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-md text-white font-semibold rounded-xl hover:bg-white/20 transition-all duration-300 border border-white/20 hover:border-[#47BD79]/50"
              >
                View Case Studies
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="relative py-16 bg-[#0f172a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-[#3B82F6]/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 border border-[#3B82F6]/30">
                <ChartBarIcon className="h-8 w-8 text-[#3B82F6]" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">65%</h3>
              <p className="text-white/60">Average Time Savings</p>
            </div>
            <div className="text-center">
              <div className="bg-[#47BD79]/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 border border-[#47BD79]/30">
                <CurrencyDollarIcon className="h-8 w-8 text-[#47BD79]" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">$35K</h3>
              <p className="text-white/60">Average Annual Savings</p>
            </div>
            <div className="text-center">
              <div className="bg-[#A855F7]/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 border border-[#A855F7]/30">
                <UserGroupIcon className="h-8 w-8 text-[#A855F7]" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">150+</h3>
              <p className="text-white/60">Businesses Transformed</p>
            </div>
            <div className="text-center">
              <div className="bg-orange-500/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 border border-orange-500/30">
                <ClockIcon className="h-8 w-8 text-orange-400" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">3 weeks</h3>
              <p className="text-white/60">Average Implementation</p>
            </div>
          </div>
        </div>
      </div>

      {/* Case Studies */}
      <div id="case-studies" className="relative py-20 bg-black">
        {/* Background glow */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#47BD79]/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#3B82F6]/5 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Featured Case Studies</h2>
            <p className="text-xl text-white/60">
              Real results from Canadian businesses using OMGsystems
            </p>
          </div>

          <div className="space-y-12">
            {caseStudies.map((study) => {
              const colors = colorMap[study.color] || colorMap.blue;

              // Create anchor ID from industry name (e.g., "Property Management" -> "property-management")
              const anchorId = study.industry.toLowerCase().replace(/\s+/g, '-');

              return (
                <div
                  key={study.id}
                  id={anchorId}
                  className={`bg-white/5 backdrop-blur-xl rounded-2xl p-8 border ${colors.border} hover:bg-white/10 transition-all duration-300 scroll-mt-24`}
                  style={{ boxShadow: `0 0 30px ${colors.glow}` }}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left: Content */}
                    <div>
                      <div className="flex items-center space-x-2 mb-4">
                        <span className={`px-3 py-1 ${colors.bg} ${colors.text} text-sm font-medium rounded-full border ${colors.border}`}>
                          {study.industry}
                        </span>
                        <span className="px-3 py-1 bg-white/10 text-white/70 text-sm font-medium rounded-full">
                          {study.location}
                        </span>
                      </div>

                      <h3 className="text-2xl font-bold text-white mb-4">
                        {study.title}
                      </h3>

                      <div className="mb-6">
                        <h4 className="font-semibold text-red-400 mb-2">Challenge:</h4>
                        <p className="text-white/60 mb-4">{study.challenge}</p>

                        <h4 className="font-semibold text-[#47BD79] mb-2">Solution:</h4>
                        <p className="text-white/60">{study.solution}</p>
                      </div>

                      <blockquote className="border-l-4 border-[#47BD79] pl-4 mb-6">
                        <p className="text-white/70 italic mb-2">&quot;{study.testimonial}&quot;</p>
                        <cite className="text-sm text-white/50">
                          — {study.author}, {study.company}
                        </cite>
                      </blockquote>

                      <Link
                        href={`/industries/${study.industry.toLowerCase().replace(' ', '-')}`}
                        className={`inline-flex items-center px-6 py-3 ${colors.bg} ${colors.text} font-semibold rounded-xl border ${colors.border} hover:bg-white/10 transition-all duration-300 group`}
                      >
                        View Industry Solutions
                        <ArrowRightIcon className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>

                    {/* Right: Results */}
                    <div className="grid grid-cols-2 gap-4 content-start">
                      <div className={`${colors.statBg} rounded-xl p-6 border ${colors.border}`}>
                        <div className={`text-3xl font-bold ${colors.text} mb-1`}>
                          {study.results.timeSaved}
                        </div>
                        <div className="text-sm text-white/60">Time Saved</div>
                      </div>
                      <div className={`${colors.statBg} rounded-xl p-6 border ${colors.border}`}>
                        <div className={`text-3xl font-bold ${colors.text} mb-1`}>
                          {study.results.costReduction}
                        </div>
                        <div className="text-sm text-white/60">Annual Savings</div>
                      </div>
                      <div className={`${colors.statBg} rounded-xl p-6 border ${colors.border}`}>
                        <div className={`text-3xl font-bold ${colors.text} mb-1`}>
                          {study.results.tenantSatisfaction || study.results.leadConversion || study.results.projectCompletion}
                        </div>
                        <div className="text-sm text-white/60">
                          {study.results.tenantSatisfaction ? 'Tenant Satisfaction' :
                           study.results.leadConversion ? 'Lead Conversion' : 'Project Completion'}
                        </div>
                      </div>
                      <div className={`${colors.statBg} rounded-xl p-6 border ${colors.border}`}>
                        <div className={`text-3xl font-bold ${colors.text} mb-1`}>
                          {study.results.implementationTime}
                        </div>
                        <div className="text-sm text-white/60">Implementation</div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative py-20 bg-gradient-to-b from-black to-[#0f172a] overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#47BD79]/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to join these success stories?
          </h2>
          <p className="text-xl text-white/60 mb-10">
            Book a personalized demo to see how OMGsystems can transform your business operations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-[#47BD79] text-white font-semibold rounded-xl hover:bg-[#3da86a] transition-all duration-300 shadow-lg shadow-[#47BD79]/30 hover:shadow-[#47BD79]/50 group"
            >
              Book a Demo
              <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-md text-white font-semibold rounded-xl hover:bg-white/20 transition-all duration-300 border border-white/20 hover:border-[#47BD79]/50"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
