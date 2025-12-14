"use client";

import React from "react";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { XMarkIcon, CheckIcon } from "@heroicons/react/24/outline";

interface LeadCaptureProps {
  onClose: () => void;
}

export function LeadCapture({ onClose }: LeadCaptureProps) {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    industry: '',
    budgetBand: '',
    phone: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const pathname = usePathname();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Create lead with chat context
      const leadData = {
        email: formData.email,
        name: formData.name,
        phone: formData.phone,
        industry: formData.industry,
        budgetBand: formData.budgetBand,
        source: 'chat',
        context: {
          page_path: pathname,
          section: getPageSection(pathname),
          timestamp: new Date().toISOString()
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
          window.gtag('event', 'chat_lead_submit', {
            event_category: 'AI Chat',
            page_path: pathname,
            industry: formData.industry,
            budget_band: formData.budgetBand
          });
        }
      }
    } catch (error) {
      console.error('Lead capture error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getPageSection = (path: string) => {
    if (path.startsWith('/industries/')) return 'industry';
    if (path.startsWith('/apps/')) return 'app';
    if (path.startsWith('/campaign/')) return 'campaign';
    return 'home';
  };

  if (isSubmitted) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-center space-x-2">
          <CheckIcon className="h-5 w-5 text-green-600" />
          <div>
            <h4 className="font-medium text-green-800">Thanks for your interest!</h4>
            <p className="text-sm text-green-700 mt-1">
              We'll send you a tailored overview and follow up within one business day.
            </p>
          </div>
        </div>
        <div className="mt-3 flex space-x-2">
          <button
            onClick={() => window.open('/campaign/leadflow', '_blank')}
            className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
          >
            Book a demo
          </button>
          <button
            onClick={onClose}
            className="px-3 py-1 bg-gray-200 text-gray-700 text-sm rounded hover:bg-gray-300 transition-colors"
          >
            Continue chatting
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h4 className="font-medium text-blue-800">Want a tailored outline?</h4>
          <p className="text-sm text-blue-700 mt-1">
            Drop your details and we'll send you a customized overview.
          </p>
        </div>
        <button
          onClick={onClose}
          className="p-1 hover:bg-blue-100 rounded-full transition-colors"
        >
          <XMarkIcon className="h-4 w-4 text-blue-600" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <input
            type="email"
            placeholder="Work email"
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
        
        <div>
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
        
        <div>
          <select
            value={formData.industry}
            onChange={(e) => setFormData(prev => ({ ...prev, industry: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          >
            <option value="">Select your industry</option>
            <option value="property-management">Property Management</option>
            <option value="real-estate">Real Estate</option>
            <option value="contractors">Contractors</option>
            <option value="healthcare">Healthcare</option>
            <option value="accounting">Accounting</option>
            <option value="cleaning">Cleaning Services</option>
            <option value="other">Other</option>
          </select>
        </div>
        
        <div>
          <select
            value={formData.budgetBand}
            onChange={(e) => setFormData(prev => ({ ...prev, budgetBand: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          >
            <option value="">Budget range (CAD/month)</option>
            <option value="exploring">Exploring (up to $500)</option>
            <option value="growing">Growing ($500-$1,500)</option>
            <option value="scaling">Scaling ($1,500-$4,000)</option>
            <option value="enterprise">Enterprise ($4,000+)</option>
          </select>
        </div>
        
        <div>
          <input
            type="tel"
            placeholder="Phone (optional)"
            value={formData.phone}
            onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <div className="text-xs text-gray-600">
          We'll email your suggestion and follow up. You can opt out anytime.
        </div>
        
        <div className="flex space-x-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 px-3 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isSubmitting ? 'Sending...' : 'Get a proposal & book a call'}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-2 bg-gray-200 text-gray-700 text-sm rounded hover:bg-gray-300 transition-colors"
          >
            Skip
          </button>
        </div>
      </form>
    </div>
  );
}
