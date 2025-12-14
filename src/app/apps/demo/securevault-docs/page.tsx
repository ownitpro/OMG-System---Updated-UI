"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ShieldCheckIcon, 
  DocumentTextIcon, 
  CloudIcon,
  LockClosedIcon,
  ArrowRightIcon,
  CheckCircleIcon
} from "@heroicons/react/24/outline";

const industries = [
  "Property Management",
  "Real Estate", 
  "Contractors",
  "Accounting",
  "Healthcare",
  "Legal",
  "Other",
];

export default function SecureVaultDocsDemoPage() {
  const [selectedIndustry, setSelectedIndustry] = useState("");
  const router = useRouter();

  const handleDemoStart = () => {
    if (selectedIndustry) {
      router.push(`/apps/demo/securevault-docs/${selectedIndustry.toLowerCase().replace(/\s+/g, '-')}`);
    }
  };

  const features = [
    {
      icon: ShieldCheckIcon,
      title: "Bank-Level Security",
      description: "AES-256 encryption with Canadian data residency"
    },
    {
      icon: DocumentTextIcon,
      title: "Smart Organization",
      description: "AI-powered document categorization and tagging"
    },
    {
      icon: CloudIcon,
      title: "Automated Workflows",
      description: "Streamline document processes with intelligent automation"
    },
    {
      icon: LockClosedIcon,
      title: "Audit-Ready",
      description: "Complete compliance tracking and audit logs"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Try SecureVault Docs Demo
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Experience how SecureVault Docs can transform your document management. 
            Choose your industry to see tailored workflows and features.
          </p>
        </div>

        <Card className="max-w-2xl mx-auto mb-12">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">Start Your Demo</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Your Industry
              </label>
              <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Choose your industry" />
                </SelectTrigger>
                <SelectContent>
                  {industries.map((industry) => (
                    <SelectItem key={industry} value={industry}>
                      {industry}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <Button 
              onClick={handleDemoStart}
              disabled={!selectedIndustry}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 text-lg"
            >
              Launch {selectedIndustry} Demo
              <ArrowRightIcon className="ml-2 h-5 w-5" />
            </Button>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-md text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full mx-auto mb-4">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <p className="text-gray-600 mb-4">
            Need help choosing? <a href="/contact" className="text-blue-600 hover:underline">Contact our team</a> for personalized guidance.
          </p>
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
            <CheckCircleIcon className="h-4 w-4 text-green-500" />
            <span>No registration required</span>
            <span>•</span>
            <span>5-minute demo</span>
            <span>•</span>
            <span>Industry-specific workflows</span>
          </div>
        </div>
      </div>
    </div>
  );
}