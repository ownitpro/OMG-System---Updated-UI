"use client";

import React, { useState } from "react";
import Link from "next/link";
import { trackCTA } from "@/components/analytics/consent-banner";

interface CampaignLandingProps {
  headline: string;
  subheadline: string;
  painPoints: string[];
  solution: string;
  ctaText: string;
  ctaHref: string;
  campaignData: {
    source: string;
    medium: string;
    campaign: string;
  };
}

export function CampaignLanding({
  headline,
  subheadline,
  painPoints,
  solution,
  ctaText,
  ctaHref,
  campaignData,
}: CampaignLandingProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    industry: "",
    budget: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    trackCTA("campaign_form_submit", "Campaign Form Submit", "form", campaignData.campaign);
    console.log("Form submitted:", { ...formData, campaignData });
    window.location.href = `/thank-you?campaign=${campaignData.campaign}`;
  };

  const handleCTAClick = (ctaId: string, ctaText: string, placement: string) => {
    trackCTA(ctaId, ctaText, placement, campaignData.campaign);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Minimal Header */}
      <header className="border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-xl font-bold text-gray-900">
              OMGsystems
            </Link>
            <Link
              href="/contact"
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              onClick={() => handleCTAClick("header_demo", "Book a demo", "header")}
            >
              Book a demo
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {headline}
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            {subheadline}
          </p>
          
          <Link
            href={ctaHref}
            className="inline-flex items-center px-8 py-4 text-lg font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
            onClick={() => handleCTAClick("hero_cta", ctaText, "hero")}
          >
            {ctaText}
            <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Pain Points */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Are You Struggling With These Problems?
          </h2>
          
          <div className="space-y-6">
            {painPoints.map((pain, index) => (
              <div key={index} className="flex items-start">
                <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                  <span className="text-red-600 text-sm">✗</span>
                </div>
                <p className="text-lg text-gray-700">{pain}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Here's How We Solve It
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            {solution}
          </p>
          
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              What You Get:
            </h3>
            <ul className="space-y-3 text-left">
              <li className="flex items-center">
                <svg className="h-5 w-5 text-green-600 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Automated workflows that save 20+ hours per week</span>
              </li>
              <li className="flex items-center">
                <svg className="h-5 w-5 text-green-600 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Real-time dashboards and reporting</span>
              </li>
              <li className="flex items-center">
                <svg className="h-5 w-5 text-green-600 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Mobile app for on-the-go management</span>
              </li>
              <li className="flex items-center">
                <svg className="h-5 w-5 text-green-600 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>24/7 support and training</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Lead Form */}
      <section className="py-16 bg-white">
        <div className="max-w-2xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Get Your Free Strategy Call
            </h2>
            <p className="text-lg text-gray-600">
              Book a 15-minute call to see how OMGsystems can transform your business.
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="bg-gray-50 rounded-2xl p-8">
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company
                </label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Industry
                </label>
                <select
                  value={formData.industry}
                  onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Industry</option>
                  <option value="property-management">Property Management</option>
                  <option value="real-estate">Real Estate</option>
                  <option value="contractors">Contractors</option>
                  <option value="accounting">Accounting</option>
                  <option value="cleaning">Cleaning Services</option>
                  <option value="healthcare">Healthcare</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Budget Range
                </label>
                <select
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Budget</option>
                  <option value="under-100">Under $100/month</option>
                  <option value="100-500">$100 - $500/month</option>
                  <option value="500-1000">$500 - $1,000/month</option>
                  <option value="1000-plus">$1,000+/month</option>
                </select>
              </div>
            </div>
            
            <button
              type="submit"
              className="w-full px-8 py-4 text-lg font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
              onClick={() => handleCTAClick("form_submit", "Get Strategy Call", "form")}
            >
              Get My Free Strategy Call
              <svg className="ml-2 h-5 w-5 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            
            <p className="text-sm text-gray-500 text-center mt-4">
              We'll contact you within 24 hours to schedule your call.
            </p>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-sm">
            © 2024 OMGsystems. All rights reserved. | 
            <Link href="/privacy" className="ml-2 hover:underline">Privacy Policy</Link> | 
            <Link href="/terms" className="ml-2 hover:underline">Terms of Service</Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
