import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { IndustryBreadcrumbs } from "@/components/ui/breadcrumbs";

const industries = [
  {
    name: "Property Management",
    href: "/industries/property-management",
    description: "SmartRent Flow - Automate rent, maintenance, and owner reports",
    icon: "/icons/property/building.svg",
    features: ["Automated rent collection", "Maintenance tracking", "Owner dashboards", "Lease management"],
    stats: "Save 10+ admin hours/week"
  },
  {
    name: "Real Estate",
    href: "/industries/real-estate", 
    description: "Agent Growth Engine - Automate the busywork, close more deals",
    icon: "/icons/realestate/house.svg",
    features: ["Lead capture & drips", "Automated showings", "Contract generation", "Client nurturing"],
    stats: "5x faster response time"
  },
  {
    name: "Accounting",
    href: "/industries/accounting",
    description: "Financial Workflow Engine - Automate 80% of your firm's grind", 
    icon: "/icons/accounting/calculator.svg",
    features: ["Document capture", "Client onboarding", "Billing automation", "Compliance tracking"],
    stats: "70% less manual work"
  },
  {
    name: "Contractors",
    href: "/industries/contractors",
    description: "Project Growth Engine - Let automation handle the admin",
    icon: "/icons/contractors/helmet.svg", 
    features: ["Lead generation", "Quote automation", "Project tracking", "Payment collection"],
    stats: "Steady lead flow year-round"
  },
  {
    name: "Cleaning Services",
    href: "/industries/cleaning",
    description: "CleanFlow Engine - Run your company without it running you",
    icon: "/icons/cleaning/broom.svg",
    features: ["Route optimization", "Staff scheduling", "Quality control", "Client communication"],
    stats: "Cut admin time 50%"
  },
  {
    name: "Healthcare",
    href: "/industries/healthcare",
    description: "CareFlow Automation - Improve patient care, strengthen efficiency",
    icon: "/icons/calendar.svg",
    features: ["Patient scheduling", "Document management", "Billing automation", "Compliance tracking"],
    stats: "Reduce no-shows by 20-50%"
  }
];

export const metadata = {
  title: "Industry Solutions | OMGsystems Canada",
  description: "Discover how OMGsystems automates workflows for Property Management, Real Estate, Accounting, Contractors, Cleaning Services, and Healthcare across Canada.",
  openGraph: {
    title: "Industry Solutions | OMGsystems Canada",
    description: "Discover how OMGsystems automates workflows for Property Management, Real Estate, Accounting, Contractors, Cleaning Services, and Healthcare across Canada.",
    url: "/industries",
    images: ["/og/industries.jpg"],
  },
  alternates: {
    canonical: "/industries",
  },
};

export default function IndustriesPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white">
        <div 
          className="absolute inset-0 bg-gradient-radial from-green-50/40 via-transparent to-transparent"
          aria-hidden="true"
        />
        
        <Container className="relative py-20 lg:py-24">
          <div className="text-center max-w-4xl mx-auto">
            <IndustryBreadcrumbs industry="All Industries" />
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Industry-Specific Automation Solutions
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Tailored workflow automation for every industry. From property management to healthcare, 
              we help Canadian businesses automate their most time-consuming processes.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
              <Button asChild size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg rounded-2xl">
                <Link href="/book-demo">
                  Book a Demo
                  <ArrowRightIcon className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-4 text-lg rounded-2xl">
                <Link href="/contact">
                  Contact Sales
                </Link>
              </Button>
            </div>
            
            <div className="flex flex-wrap justify-center gap-3">
              <span className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-sm font-medium text-gray-700">
                Canadian Data Residency
              </span>
              <span className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-sm font-medium text-gray-700">
                Industry-Specific Workflows
              </span>
              <span className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-sm font-medium text-gray-700">
                1-3 Week Implementation
              </span>
            </div>
          </div>
        </Container>
      </section>

      {/* Industries Grid */}
      <section className="py-16 bg-gray-50">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Choose Your Industry
            </h2>
            <p className="text-lg text-gray-600">
              Each solution is built specifically for your industry's unique challenges and workflows
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industries.map((industry, index) => (
              <div 
                key={index}
                className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-shadow duration-300 group"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mr-4">
                    <img src={industry.icon} alt="" className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg">{industry.name}</h3>
                    <p className="text-sm text-green-600 font-medium">{industry.stats}</p>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-4 text-sm">{industry.description}</p>
                
                <ul className="space-y-2 mb-6">
                  {industry.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start text-sm text-gray-600">
                      <span className="text-green-600 mr-2 mt-1">•</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <Button asChild className="w-full bg-green-600 hover:bg-green-700 text-white group-hover:bg-green-700 transition-colors">
                  <Link href={industry.href}>
                    Learn More
                    <ArrowRightIcon className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-green-50">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Don't See Your Industry?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              We work with businesses across all industries. Contact us to discuss how we can 
              customize our automation solutions for your specific needs.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg rounded-2xl">
                <Link href="/contact">
                  Contact Us
                  <ArrowRightIcon className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-gray-300 text-gray-700 hover:bg-white px-8 py-4 text-lg rounded-2xl">
                <Link href="/book-demo">
                  Book a Demo
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
