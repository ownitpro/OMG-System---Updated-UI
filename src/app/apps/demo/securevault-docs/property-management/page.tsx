"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BuildingOfficeIcon,
  DocumentTextIcon,
  UserGroupIcon,
  CogIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  ClockIcon,
  ShieldCheckIcon
} from "@heroicons/react/24/outline";

export default function PropertyManagementDemoPage() {
  const [currentStep, setCurrentStep] = useState(0);

  const demoSteps = [
    {
      title: "Owner Statement Upload",
      description: "Property owners can securely upload monthly statements directly to their file vault.",
      action: "Upload Statement",
      icon: DocumentTextIcon,
    },
    {
      title: "Tenant Document Collection",
      description: "Collect lease agreements, maintenance requests, and payment records in organized folders.",
      action: "View Tenant Files",
      icon: UserGroupIcon,
    },
    {
      title: "Maintenance Workflow",
      description: "Automatically route maintenance requests, track approvals, and store completion photos.",
      action: "Process Request",
      icon: CogIcon,
    },
    {
      title: "Audit & Compliance",
      description: "Generate compliance reports and maintain audit trails for all property-related documents.",
      action: "Generate Report",
      icon: ShieldCheckIcon,
    }
  ];

  const features = [
    "Owner portal for statement uploads",
    "Tenant document collection",
    "Maintenance request workflows",
    "Property compliance tracking",
    "Financial document organization",
    "Automated backup & versioning"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            SecureVault Docs for Property Management
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Streamline document management for property portfolios. From owner statements to tenant files, 
            keep everything organized and audit-ready.
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
                        // Simulate demo action
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
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Property Management Features</h2>
            <div className="space-y-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm">
                  <CheckCircleIcon className="h-5 w-5 text-emerald-600 flex-shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 p-6 bg-white rounded-xl shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Demo Statistics</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-emerald-600">95%</div>
                  <div className="text-sm text-gray-600">Faster document retrieval</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-emerald-600">80%</div>
                  <div className="text-sm text-gray-600">Reduction in filing time</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-emerald-600">100%</div>
                  <div className="text-sm text-gray-600">Audit compliance</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-emerald-600">24/7</div>
                  <div className="text-sm text-gray-600">Secure access</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <div className="bg-white rounded-xl p-8 shadow-lg max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Transform Your Property Management?</h3>
            <p className="text-gray-600 mb-6">
              See how SecureVault Docs can streamline your document workflows and improve compliance.
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
