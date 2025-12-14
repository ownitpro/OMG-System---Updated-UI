"use client";

import React from "react";
import { useState, useEffect, useCallback } from "react";
import { CalculatorIcon, ChartBarIcon, ClockIcon, CurrencyDollarIcon, InformationCircleIcon } from "@heroicons/react/24/outline";
import { ROICalculatorInputs } from "./roi-calculator-inputs";
import { ROICalculatorResults } from "./roi-calculator-results";
import { ROICalculatorLeadCapture } from "./roi-calculator-lead-capture";
import { ROICalculatorFAQs } from "./roi-calculator-faqs";
import { propertyManagementROI } from "@/content/roi/property-management";
import { realEstateROI } from "@/content/roi/real-estate";
import { contractorsROI } from "@/content/roi/contractors";
import { accountingROI } from "@/content/roi/accounting";
import { cleaningROI } from "@/content/roi/cleaning";
import { healthcareROI } from "@/content/roi/healthcare";

const roiDataMap: Record<string, any> = {
  'property-management': propertyManagementROI,
  'real-estate': realEstateROI,
  'contractors': contractorsROI,
  'accounting': accountingROI,
  'cleaning': cleaningROI,
  'healthcare': healthcareROI
};

interface ROICalculatorShellProps {
  slug: string;
}

export function ROICalculatorShell({ 
  slug
}: ROICalculatorShellProps) {
  const data = roiDataMap[slug];
  if (!data) {
    throw new Error(`No ROI data found for slug: ${slug}`);
  }
  const industry = data.industry;
  const industryName = data.industry;
  // Initialize inputs with defaults from data
  const [currentInputs, setCurrentInputs] = useState(() => {
    const inputs: any = {};
    data.inputs.forEach((input: any) => {
      inputs[input.id] = input.default;
    });
    return inputs;
  });
  
  const [results, setResults] = useState<any>(null);
  const [showLeadCapture, setShowLeadCapture] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);

  // Calculate results when inputs change
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsCalculating(true);
      try {
        const newResults = {
          timeSavedHours: data.calculations.timeSavedHours(currentInputs),
          costSaved: data.calculations.costSaved(currentInputs),
          revenueLift: data.calculations.revenueLift(currentInputs),
          paybackWeeks: data.calculations.paybackWeeks(currentInputs)
        };
        setResults(newResults);
      } catch (error) {
        console.error('Calculation error:', error);
      } finally {
        setIsCalculating(false);
      }
    }, 300); // Debounce calculations

    return () => clearTimeout(timer);
  }, [currentInputs, data.calculations]);

  const handleInputChange = useCallback((field: string, value: any) => {
    setCurrentInputs((prev: any) => ({
      ...prev,
      [field]: value
    }));
  }, []);

  const handleShowLeadCapture = useCallback(() => {
    setShowLeadCapture(true);
    
    // Track analytics if consent given
    const consent = localStorage.getItem('omg_consent');
    if (consent === 'accepted' && window.gtag) {
      window.gtag('event', 'roi_lead_capture_show', {
        event_category: 'ROI Calculator',
        industry: industry,
        page_path: window.location.pathname
      });
    }
  }, [industry]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-4" role="list">
              <li role="listitem">
                <a href="/" className="text-blue-600 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded">Home</a>
              </li>
              <li aria-hidden="true">
                <svg className="h-5 w-5 text-gray-400 mx-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </li>
              <li role="listitem">
                <a href="/roi" className="text-blue-600 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded">ROI Calculators</a>
              </li>
              <li aria-hidden="true">
                <svg className="h-5 w-5 text-gray-400 mx-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </li>
              <li className="text-gray-500 font-medium" role="listitem" aria-current="page">{data.industry}</li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Header */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <CalculatorIcon className="h-16 w-16 text-blue-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {industryName} ROI Calculator (Ontario)
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Estimate time saved, admin costs avoided, and predictable monthly ROI in CAD. 
              Transparent calculations based on Ontario market data.
            </p>
          </div>
        </div>
      </div>

      {/* Main Calculator */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Inputs */}
          <div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Current Setup</h2>
              <ROICalculatorInputs
                industry={industry}
                inputs={currentInputs}
                onInputChange={handleInputChange}
              />
            </div>
          </div>

          {/* Right Column - Results */}
          <div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Potential Savings</h2>
              <ROICalculatorResults
                results={results}
                isCalculating={isCalculating}
                industry={industry}
                inputs={currentInputs}
              />
            </div>
          </div>
        </div>

        {/* Lead Capture Section */}
        {results && !showLeadCapture && (
          <div className="mt-12">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">
                Want this in your inbox?
              </h3>
              <p className="text-blue-700 mb-4">
                Get a detailed breakdown of your ROI calculation and next steps.
              </p>
              <button
                onClick={handleShowLeadCapture}
                className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
              >
                Email me this result
              </button>
            </div>
          </div>
        )}

        {/* Lead Capture Form */}
        {showLeadCapture && (
          <div className="mt-12">
            <ROICalculatorLeadCapture
              industry={industry}
              inputs={currentInputs}
              results={results}
              onClose={() => setShowLeadCapture(false)}
            />
          </div>
        )}

        {/* Reassurance Block */}
        <div className="mt-12 bg-green-50 border border-green-200 rounded-lg p-6">
          <div className="flex items-start">
            <InformationCircleIcon className="h-6 w-6 text-green-600 mr-3 mt-0.5" />
            <div>
              <h3 className="text-lg font-semibold text-green-900 mb-2">
                Transparent & Conservative Estimates
              </h3>
              <p className="text-green-800">
                These are estimates based on your inputs and conservative assumptions for Ontario. 
                We'll tailor a precise projection during a demo with your actual data and processes.
              </p>
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div className="mt-12">
          <ROICalculatorFAQs industry={industry} />
        </div>

        {/* CTA Section */}
        <div className="mt-12 bg-gray-900 rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">
            Ready to achieve these savings?
          </h3>
          <p className="text-gray-300 mb-6">
            Book a personalized demo to see how OMGsystems can transform your {industryName.toLowerCase()} operations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/campaign/leadflow"
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              Book a demo
            </a>
            <a
              href={`/demo/${industry}`}
              className="px-6 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-gray-900 transition-colors"
            >
              See industry demo
            </a>
            <a
              href="/case-studies"
              className="px-6 py-3 border-2 border-gray-600 text-gray-300 font-semibold rounded-lg hover:bg-gray-600 hover:text-white transition-colors"
            >
              Read customer snapshots
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
