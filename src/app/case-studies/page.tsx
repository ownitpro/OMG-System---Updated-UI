import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { ChartBarIcon, ClockIcon, UserGroupIcon, CurrencyDollarIcon } from "@heroicons/react/24/outline";

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
    image: "/images/case-studies/property-management.jpg"
  },
  {
    id: "ottawa-real-estate",
    title: "Ottawa Real Estate Agency",
    industry: "Real Estate",
    location: "Ottawa, ON",
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
    image: "/images/case-studies/real-estate.jpg"
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
    image: "/images/case-studies/contractors.jpg"
  }
];

export default function CaseStudiesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Success Stories
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              See how Canadian businesses have transformed their operations with OMGsystems automation. 
              Real results from real companies across Ontario.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/campaign/leadflow"
                className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
              >
                Start Your Success Story
              </a>
              <a
                href="#case-studies"
                className="px-6 py-3 border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-600 hover:text-white transition-colors"
              >
                View Case Studies
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <ChartBarIcon className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">65%</h3>
              <p className="text-gray-600">Average Time Savings</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <CurrencyDollarIcon className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">$35K</h3>
              <p className="text-gray-600">Average Annual Savings</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <UserGroupIcon className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">150+</h3>
              <p className="text-gray-600">Businesses Transformed</p>
            </div>
            <div className="text-center">
              <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <ClockIcon className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">3 weeks</h3>
              <p className="text-gray-600">Average Implementation</p>
            </div>
          </div>
        </div>
      </div>

      {/* Case Studies */}
      <div id="case-studies" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Case Studies</h2>
            <p className="text-xl text-gray-600">
              Real results from Canadian businesses using OMGsystems
            </p>
          </div>

          <div className="space-y-16">
            {caseStudies.map((study, index) => (
              <div key={study.id} className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
                <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                  <div className="bg-white rounded-lg shadow-lg p-8">
                    <div className="flex items-center space-x-2 mb-4">
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                        {study.industry}
                      </span>
                      <span className="px-3 py-1 bg-gray-100 text-gray-800 text-sm font-medium rounded-full">
                        {study.location}
                      </span>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      {study.title}
                    </h3>
                    
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-2">Challenge:</h4>
                      <p className="text-gray-600 mb-4">{study.challenge}</p>
                      
                      <h4 className="font-semibold text-gray-900 mb-2">Solution:</h4>
                      <p className="text-gray-600">{study.solution}</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-green-50 rounded-lg p-4">
                        <div className="text-2xl font-bold text-green-600 mb-1">
                          {study.results.timeSaved}
                        </div>
                        <div className="text-sm text-green-800">Time Saved</div>
                      </div>
                      <div className="bg-blue-50 rounded-lg p-4">
                        <div className="text-2xl font-bold text-blue-600 mb-1">
                          {study.results.costReduction}
                        </div>
                        <div className="text-sm text-blue-800">Annual Savings</div>
                      </div>
                      <div className="bg-purple-50 rounded-lg p-4">
                        <div className="text-2xl font-bold text-purple-600 mb-1">
                          {study.results.tenantSatisfaction || study.results.leadConversion || study.results.projectCompletion}
                        </div>
                        <div className="text-sm text-purple-800">
                          {study.results.tenantSatisfaction ? 'Tenant Satisfaction' : 
                           study.results.leadConversion ? 'Lead Conversion' : 'Project Completion'}
                        </div>
                      </div>
                      <div className="bg-orange-50 rounded-lg p-4">
                        <div className="text-2xl font-bold text-orange-600 mb-1">
                          {study.results.implementationTime}
                        </div>
                        <div className="text-sm text-orange-800">Implementation</div>
                      </div>
                    </div>
                    
                    <blockquote className="border-l-4 border-blue-600 pl-4 mb-6">
                      <p className="text-gray-700 italic mb-2">"{study.testimonial}"</p>
                      <cite className="text-sm text-gray-600">
                        — {study.author}, {study.company}
                      </cite>
                    </blockquote>
                    
                    <Link
                      href={`/case-studies/${study.id}`}
                      className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Read Full Case Study
                    </Link>
                  </div>
                </div>
                
                <div className={index % 2 === 1 ? 'lg:col-start-1' : ''}>
                  <div className="bg-gray-200 rounded-lg h-96 flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <div className="text-4xl mb-4">📊</div>
                      <p>Case Study Visual</p>
                      <p className="text-sm">Charts and metrics would go here</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to join these success stories?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Book a personalized demo to see how OMGsystems can transform your business operations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/campaign/leadflow"
              className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              Book a Demo
            </a>
            <a
              href="/contact"
              className="px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition-colors"
            >
              Contact Sales
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
