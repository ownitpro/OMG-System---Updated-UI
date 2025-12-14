"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  CalculatorIcon,
  DocumentTextIcon,
  ClipboardDocumentCheckIcon,
  CogIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  ShieldCheckIcon,
  ChartBarIcon
} from "@heroicons/react/24/outline";

export default function AccountingDemoPage() {
  const [currentStep, setCurrentStep] = useState(0);

  const demoSteps = [
    {
      title: "Client Tax Documents",
      description: "Securely collect and organize client tax documents with automated categorization.",
      action: "Upload Tax Doc",
      icon: DocumentTextIcon,
    },
    {
      title: "E-Signature Workflows",
      description: "Streamline client document signing with secure e-signature integration.",
      action: "Send for Signature",
      icon: ClipboardDocumentCheckIcon,
    },
    {
      title: "Compliance & Audit",
      description: "Maintain complete audit trails and compliance documentation for all client files.",
      action: "View Audit Log",
      icon: ShieldCheckIcon,
    },
    {
      title: "Client Portal Access",
      description: "Provide clients with secure access to their documents and tax information.",
      action: "Open Client Portal",
      icon: ChartBarIcon,
    }
  ];

  const features = [
    "Client document collection",
    "E-signature integration",
    "Tax document organization",
    "Compliance tracking",
    "Client portal access",
    "Automated backup & security"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            SecureVault Docs for Accounting
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Streamline client document management, tax preparation, and compliance workflows 
            with bank-level security and intelligent organization.
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
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Accounting Features</h2>
            <div className="space-y-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm">
                  <CheckCircleIcon className="h-5 w-5 text-emerald-600 flex-shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 p-6 bg-white rounded-xl shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Demo Benefits</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-emerald-600">85%</div>
                  <div className="text-sm text-gray-600">Faster document processing</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-emerald-600">70%</div>
                  <div className="text-sm text-gray-600">Reduced admin time</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-emerald-600">100%</div>
                  <div className="text-sm text-gray-600">Compliance ready</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-emerald-600">24/7</div>
                  <div className="text-sm text-gray-600">Client access</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <div className="bg-white rounded-xl p-8 shadow-lg max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Modernize Your Accounting Practice?</h3>
            <p className="text-gray-600 mb-6">
              See how SecureVault Docs can improve client service and streamline your accounting workflows.
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
