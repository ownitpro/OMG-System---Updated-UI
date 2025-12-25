"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
    <div className="min-h-screen bg-gradient-to-br from-[#2B2A2A] via-[#1f1e1e] to-[#2B2A2A]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Try <span className="text-[#47BD79]">SecureVault Docs</span> Demo
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Experience how SecureVault Docs can transform your document management.
            Choose your industry to see tailored workflows and features.
          </p>
        </div>

        <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 max-w-2xl mx-auto mb-12 overflow-hidden">
          <div className="p-6 border-b border-white/10">
            <h2 className="text-2xl font-bold text-center text-white">Start Your Demo</h2>
          </div>
          <div className="p-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">
                Select Your Industry
              </label>
              <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
                <SelectTrigger className="w-full bg-white/5 border-white/20 text-white">
                  <SelectValue placeholder="Choose your industry" />
                </SelectTrigger>
                <SelectContent className="bg-[#2B2A2A] border-white/20">
                  {industries.map((industry) => (
                    <SelectItem key={industry} value={industry} className="text-white hover:bg-white/10">
                      {industry}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button
              onClick={handleDemoStart}
              disabled={!selectedIndustry}
              className="w-full bg-[#47BD79] hover:bg-[#3da86a] text-white py-3 text-lg shadow-[0_0_20px_rgba(71,189,121,0.4)] transition-all duration-600 ease-premium-out"
            >
              Launch {selectedIndustry} Demo
              <ArrowRightIcon className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {features.map((feature, index) => (
            <div key={index} className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-[#47BD79]/30 transition-all duration-600 ease-premium-out text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-[#47BD79]/20 text-[#47BD79] rounded-full mx-auto mb-4">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-white/60 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <p className="text-white/60 mb-4">
            Need help choosing? <a href="/contact" className="text-[#47BD79] hover:underline">Contact our team</a> for personalized guidance.
          </p>
          <div className="flex items-center justify-center space-x-2 text-sm text-white/50">
            <CheckCircleIcon className="h-4 w-4 text-[#47BD79]" />
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