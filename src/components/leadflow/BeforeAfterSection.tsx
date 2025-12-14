"use client";

import { 
  ExclamationTriangleIcon,
  CheckCircleIcon,
  XMarkIcon,
  ArrowTrendingUpIcon
} from "@heroicons/react/24/outline";

const beforeItems = [
  "Your lead generation is a guessing game. Some weeks are good, others go dark.",
  "You have no idea which ad works.",
  "Leads are lost or ignored.",
  "Your team is chasing endless follow-ups."
];

const afterItems = [
  "You have a consistent flow of high-quality leads each week.",
  "You know what's working and scale confidently.",
  "No lead slips away — every lead is followed up.",
  "Your system grows with you — chaos gone."
];

export default function BeforeAfterSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Before & After: What Changes
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See the transformation that happens when you move from chaotic lead generation to a predictable system.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Before */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <XMarkIcon className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Before</h3>
            </div>
            
            <div className="space-y-4">
              {beforeItems.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <ExclamationTriangleIcon className="w-4 h-4 text-red-600" />
                  </div>
                  <p className="text-gray-700 leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* After */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-emerald-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                <CheckCircleIcon className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">After LeadFlow Engine</h3>
            </div>
            
            <div className="space-y-4">
              {afterItems.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <ArrowTrendingUpIcon className="w-4 h-4 text-emerald-600" />
                  </div>
                  <p className="text-gray-700 leading-relaxed font-medium">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Transformation Stats */}
        <div className="mt-16 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-3xl p-8 md:p-12 text-white">
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              The Transformation in Numbers
            </h3>
            <p className="text-xl text-emerald-100 max-w-2xl mx-auto">
              Real results from businesses that implemented LeadFlow Engine
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2">3×</div>
              <div className="text-lg text-emerald-100">Average ROI Increase</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2">60%</div>
              <div className="text-lg text-emerald-100">Less Time on Manual Tasks</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2">45%</div>
              <div className="text-lg text-emerald-100">Higher Lead Quality</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
