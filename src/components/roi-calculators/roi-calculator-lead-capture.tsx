"use client";

import React from "react";
import { useState } from "react";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";

interface ROICalculatorLeadCaptureProps {
  industry: string;
  inputs: any;
  results: any;
  onClose: () => void;
}

export function ROICalculatorLeadCapture({ industry, inputs, results, onClose }: ROICalculatorLeadCaptureProps) {
  const [formData, setFormData] = useState({
    email: '',
    company: '',
    phone: '',
    proposalRequested: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const leadData = {
        email: formData.email,
        name: formData.company || 'ROI Calculator User',
        phone: formData.phone,
        company: formData.company,
        industry: industry,
        budgetBand: 'calculating',
        source: 'roi-calculator',
        context: {
          page_path: window.location.pathname,
          section: 'roi-calculator',
          timestamp: new Date().toISOString(),
          inputs: inputs,
          results: results,
          proposalRequested: formData.proposalRequested
        }
      };

      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(leadData),
      });

      if (response.ok) {
        setIsSubmitted(true);
        
        // Track analytics if consent given
        const consent = localStorage.getItem('omg_consent');
        if (consent === 'accepted' && window.gtag) {
          window.gtag('event', 'roi_lead_submit', {
            event_category: 'ROI Calculator',
            industry: industry,
            page_path: window.location.pathname,
            email_domain: formData.email.split('@')[1],
            proposal_requested: formData.proposalRequested
          });
        }
      }
    } catch (error) {
      console.error('Lead capture error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-6">
        <div className="flex items-center space-x-3 mb-4">
          <CheckIcon className="h-6 w-6 text-green-600" />
          <div>
            <h3 className="font-semibold text-green-800">Sent! Check your inbox.</h3>
            <p className="text-sm text-green-700">Your ROI calculation summary is on its way.</p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-4 mb-4">
          <h4 className="font-medium text-gray-900 mb-2">Your ROI Summary:</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-600">Time saved:</span>
              <span className="font-medium ml-2">{results.timeSavedHours?.toFixed(1)} hours/month</span>
            </div>
            <div>
              <span className="text-gray-600">Cost saved:</span>
              <span className="font-medium ml-2">${results.costSaved?.toLocaleString()}/month</span>
            </div>
            {results.revenueLift > 0 && (
              <div>
                <span className="text-gray-600">Revenue lift:</span>
                <span className="font-medium ml-2">${results.revenueLift?.toLocaleString()}/month</span>
              </div>
            )}
            <div>
              <span className="text-gray-600">Payback:</span>
              <span className="font-medium ml-2">~{results.paybackWeeks?.toFixed(0)} weeks</span>
            </div>
          </div>
        </div>
        
        <div className="flex space-x-3">
          <a
            href="/campaign/leadflow"
            className="flex-1 px-4 py-2 bg-blue-600 text-white text-center rounded-lg hover:bg-blue-700 transition-colors"
          >
            Book a demo
          </a>
          <a
            href={`/demo/${industry}`}
            className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 text-center rounded-lg hover:bg-gray-300 transition-colors"
          >
            See industry demo
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-semibold text-blue-900 mb-1">Want this in your inbox?</h3>
          <p className="text-sm text-blue-700">
            Get a detailed breakdown of your ROI calculation and next steps.
          </p>
        </div>
        <button
          onClick={onClose}
          className="p-1 hover:bg-blue-100 rounded-full transition-colors"
        >
          <XMarkIcon className="h-4 w-4 text-blue-600" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="roi-email" className="block text-sm font-medium text-gray-700 mb-1">
            Email (required)
          </label>
          <input
            type="email"
            id="roi-email"
            name="email"
            autoComplete="email"
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="work@company.com"
            required
          />
        </div>
        
        <div>
          <label htmlFor="roi-company" className="block text-sm font-medium text-gray-700 mb-1">
            Company (optional)
          </label>
          <input
            type="text"
            id="roi-company"
            name="company"
            autoComplete="organization"
            value={formData.company}
            onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Your company name"
          />
        </div>
        
        <div>
          <label htmlFor="roi-phone" className="block text-sm font-medium text-gray-700 mb-1">
            Phone (optional)
          </label>
          <input
            type="tel"
            id="roi-phone"
            name="phone"
            autoComplete="tel"
            value={formData.phone}
            onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="(416) 555-0123"
          />
        </div>
        
        <div className="flex items-start space-x-2">
          <input
            type="checkbox"
            id="proposalRequested"
            checked={formData.proposalRequested}
            onChange={(e) => setFormData(prev => ({ ...prev, proposalRequested: e.target.checked }))}
            className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <label htmlFor="proposalRequested" className="text-sm text-gray-700">
            Also send me a tailored proposal
          </label>
        </div>
        
        <div className="flex space-x-3">
          <button
            type="submit"
            disabled={isSubmitting || !formData.email}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isSubmitting ? 'Sending...' : 'Email me this result'}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Skip
          </button>
        </div>
      </form>
    </div>
  );
}
