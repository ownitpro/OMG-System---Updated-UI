"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

const industries = [
  { name: "Property Management", slug: "property-management", icon: "🏢" },
  { name: "Real Estate", slug: "real-estate", icon: "🏠" },
  { name: "Contractors", slug: "contractors", icon: "🔨" },
  { name: "Accounting", slug: "accounting", icon: "📊" },
  { name: "Cleaning", slug: "cleaning", icon: "🧽" },
  { name: "Healthcare", slug: "healthcare", icon: "🏥" },
  { name: "Other", slug: "other", icon: "💼" }
];

export default function IndustrySelectorModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndustry, setSelectedIndustry] = useState("");
  const router = useRouter();

  // Listen for modal open events
  useEffect(() => {
    const handleOpenModal = (event: any) => {
      setIsOpen(true);
      if (event.detail?.industry) {
        setSelectedIndustry(event.detail.industry);
      }
    };
    window.addEventListener('openIndustryModal', handleOpenModal);
    return () => window.removeEventListener('openIndustryModal', handleOpenModal);
  }, []);

  const handleIndustrySelect = (industry: { name: string; slug: string }) => {
    setSelectedIndustry(industry.name);
  };

  const handleLaunchDemo = () => {
    if (selectedIndustry) {
      const industrySlug = industries.find(ind => ind.name === selectedIndustry)?.slug || 'other';
      router.push(`/apps/demo?industry=${industrySlug}`);
    }
  };

  const handleSkip = () => {
    router.push('/apps/demo');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        {/* Backdrop */}
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
          onClick={() => setIsOpen(false)}
        />
        
        {/* Modal */}
        <div className="relative bg-white rounded-xl shadow-xl max-w-md w-full p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-900">
              Which industry are you in?
            </h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          <p className="text-gray-600 mb-6">
            Choose your industry to see a tailored demo that's relevant to your business.
          </p>

          <div className="space-y-3 mb-6">
            {industries.map((industry) => (
              <button
                key={industry.slug}
                onClick={() => handleIndustrySelect(industry)}
                className={`w-full flex items-center p-3 rounded-lg border-2 transition-all ${
                  selectedIndustry === industry.name
                    ? 'border-emerald-500 bg-emerald-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <span className="text-2xl mr-3">{industry.icon}</span>
                <span className="font-medium text-gray-900">{industry.name}</span>
              </button>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={handleLaunchDemo}
              disabled={!selectedIndustry}
              className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white"
            >
              Launch Demo for {selectedIndustry || 'Selected Industry'}
            </Button>
            <Button
              onClick={handleSkip}
              variant="outline"
              className="flex-1"
            >
              Skip & Browse All
            </Button>
          </div>

          <p className="text-xs text-gray-500 mt-4 text-center">
            No signup required • Fully interactive • Industry-specific
          </p>
        </div>
      </div>
    </div>
  );
}
