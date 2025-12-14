"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  WrenchScrewdriverIcon,
  DocumentTextIcon,
  ClipboardDocumentListIcon,
  CogIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  ShieldCheckIcon,
  ChartBarIcon
} from "@heroicons/react/24/outline";

export default function ContractorsDemoPage() {
  const [currentStep, setCurrentStep] = useState(0);

  const demoSteps = [
    {
      title: "Project Drawings & Plans",
      description: "Store and version control all project drawings, blueprints, and design documents.",
      action: "Upload Drawing",
      icon: DocumentTextIcon,
    },
    {
      title: "Change Orders & Approvals",
      description: "Track change orders, client approvals, and project modifications with full audit trails.",
      action: "Process Change Order",
      icon: ClipboardDocumentListIcon,
    },
    {
      title: "Compliance Documentation",
      description: "Maintain safety certificates, permits, and regulatory compliance documents.",
      action: "View Compliance",
      icon: ShieldCheckIcon,
    },
    {
      title: "Project Reporting",
      description: "Generate project reports, progress updates, and client deliverables automatically.",
      action: "Generate Report",
      icon: ChartBarIcon,
    }
  ];

  const features = [
    "Project document organization",
    "Change order tracking",
    "Compliance document management",
    "Client approval workflows",
    "Safety certificate storage",
    "Project progress reporting"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            SecureVault Docs for Contractors
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Manage project documents, change orders, and compliance files with intelligent organization 
            and automated workflows designed for construction professionals.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Interactive Demo</h2>
            <div className="space-y-4">
              {demoSteps.map((step, index) => (
                <Card 
                  key={index} 
                  className={`cursor-pointer transition-all duration-300 ${
                    currentStep === index 
                      ? 'ring-2 ring-emerald-500 bg-emerald-50' 
                      : 'hover:shadow-md'
                  }`}
                  onClick={() => setCurrentStep(index)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        currentStep === index ? 'bg-emerald-600 text-white' : 'bg-gray-200 text-gray-600'
                      }`}>
                        {index + 1}
                      </div>
                      <step.icon className="h-6 w-6 text-emerald-600" />
                      <CardTitle className="text-lg">{step.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{step.description}</p>
                    <Button 
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
                      onClick={(e) => {
                        e.stopPropagation();
                        alert(`Demo: ${step.action}`);
                      }}
                    >
                      {step.action}
                      <ArrowRightIcon className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Contractor Features</h2>
            <div className="space-y-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm">
                  <CheckCircleIcon className="h-5 w-5 text-emerald-600 flex-shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 p-6 bg-white rounded-xl shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Demo Results</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-emerald-600">90%</div>
                  <div className="text-sm text-gray-600">Faster document access</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-emerald-600">75%</div>
                  <div className="text-sm text-gray-600">Reduced admin time</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-emerald-600">100%</div>
                  <div className="text-sm text-gray-600">Compliance tracking</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-emerald-600">24/7</div>
                  <div className="text-sm text-gray-600">Project access</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <div className="bg-white rounded-xl p-8 shadow-lg max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Streamline Your Construction Projects?</h3>
            <p className="text-gray-600 mb-6">
              Discover how SecureVault Docs can improve project organization and client communication.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3">
                Schedule a Demo Call
                <ArrowRightIcon className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-3">
                Download Case Study
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
