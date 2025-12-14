"use client";

import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

const industries = [
  {
    name: "Property Management",
    description: "Owner statements, maintenance flows, tenant portals",
    icon: "🏢",
    color: "bg-blue-50",
    textColor: "text-blue-600"
  },
  {
    name: "Real Estate",
    description: "Lead nurture, showings, contract workflows",
    icon: "🏠",
    color: "bg-emerald-50",
    textColor: "text-emerald-600"
  },
  {
    name: "Contractors",
    description: "Quotes, invoices, job tracking—all in one place",
    icon: "🔨",
    color: "bg-orange-50",
    textColor: "text-orange-600"
  },
  {
    name: "Accounting",
    description: "Client intake, doc automation, recurring billing",
    icon: "📊",
    color: "bg-purple-50",
    textColor: "text-purple-600"
  },
  {
    name: "Cleaning",
    description: "Routing, QC checklists, automatic payments",
    icon: "🧽",
    color: "bg-green-50",
    textColor: "text-green-600"
  },
  {
    name: "Healthcare",
    description: "Scheduling, intake automation, staffing alerts",
    icon: "🏥",
    color: "bg-red-50",
    textColor: "text-red-600"
  }
];

export default function IndustryCards() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedIndustry, setSelectedIndustry] = useState("");

  const handleLaunchDemo = (industry: string) => {
    setSelectedIndustry(industry);
    // Dispatch custom event to open modal with pre-selected industry
    window.dispatchEvent(new CustomEvent('openIndustryModal', { detail: { industry } }));
  };

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-4">
            See how it works in your industry
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Each industry has unique workflows and challenges. Our demos are tailored to show you exactly how OMGsystems addresses your specific needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {industries.map((industry, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="text-center">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${industry.color} mb-4`}>
                  <span className="text-2xl">{industry.icon}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {industry.name}
                </h3>
                <p className="text-gray-600 mb-6">
                  {industry.description}
                </p>
                <Button 
                  onClick={() => handleLaunchDemo(industry.name)}
                  className={`w-full ${industry.textColor.replace('text-', 'bg-').replace('-600', '-500')} hover:opacity-90 text-white`}
                >
                  Launch Demo for {industry.name}
                  <ArrowRightIcon className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
