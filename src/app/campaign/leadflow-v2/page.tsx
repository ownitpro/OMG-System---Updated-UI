"use client";

import React, { useState, useEffect } from "react";
import { CheckIcon, PlayIcon, StarIcon } from "@heroicons/react/24/outline";

// Metadata is now in layout.tsx

export default function LeadFlowV2Page() {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Proof Strip */}
      <div className="bg-green-50 border-b border-green-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-center space-x-8 text-sm text-green-800">
            <div className="flex items-center">
              <StarIcon className="h-4 w-4 mr-1" />
              <span>4.9/5 from 200+ Ontario businesses</span>
            </div>
            <div className="hidden sm:block">•</div>
            <div className="hidden sm:block">3x average conversion rate increase</div>
            <div className="hidden sm:block">•</div>
            <div className="hidden sm:block">65% reduction in manual follow-up</div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-4">
                <img src="/logo-white.svg" alt="OMGsystems" className="h-8 w-auto mr-4" />
                <span className="text-blue-200 text-sm">LeadFlow Engine™</span>
              </div>
              
              <h1 className="text-5xl font-bold mb-6">
                Turn Every Lead Into a <span className="text-yellow-400">Paying Customer</span>
              </h1>
              
              <p className="text-xl text-blue-100 mb-8">
                Stop losing leads to slow follow-up. LeadFlow Engine™ automatically nurtures, scores, and converts prospects while you sleep.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="#demo"
                  className="inline-flex items-center justify-center px-8 py-4 bg-yellow-400 text-blue-900 font-semibold rounded-lg hover:bg-yellow-300 transition-colors"
                >
                  <PlayIcon className="h-5 w-5 mr-2" />
                  See How It Works
                </a>
                <a
                  href="#form"
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-900 transition-colors"
                >
                  Book a Demo
                </a>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                <div className="bg-white rounded-lg p-6 text-gray-900">
                  <h3 className="font-semibold mb-4">Live Demo: LeadFlow in Action</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <span className="text-sm">New lead: Sarah M.</span>
                      <span className="text-xs text-green-600">Auto-scored: 85/100</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <span className="text-sm">Welcome email sent</span>
                      <span className="text-xs text-blue-600">2 min ago</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                      <span className="text-sm">Follow-up scheduled</span>
                      <span className="text-xs text-purple-600">Tomorrow 10 AM</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pain → Outcome Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Pain Points */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Are You Losing <span className="text-red-600">80% of Your Leads</span> to Slow Follow-up?
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-red-600 font-bold">×</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Leads Go Cold</h3>
                    <p className="text-gray-600">By the time you follow up, they've already chosen a competitor or forgotten about you.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-red-600 font-bold">×</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Manual Work Kills Productivity</h3>
                    <p className="text-gray-600">Your team spends hours on repetitive follow-up instead of closing deals.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-red-600 font-bold">×</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Inconsistent Messaging</h3>
                    <p className="text-gray-600">Different team members send different messages, confusing prospects and hurting your brand.</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Outcomes */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Transform Your Lead Flow Into a <span className="text-green-600">Revenue Machine</span>
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-4">
                    <CheckIcon className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Instant Follow-up</h3>
                    <p className="text-gray-600">Every lead gets personalized attention within minutes, not days.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-4">
                    <CheckIcon className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Smart Lead Scoring</h3>
                    <p className="text-gray-600">Focus on the hottest prospects with AI-powered lead scoring and prioritization.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-4">
                    <CheckIcon className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">3x More Conversions</h3>
                    <p className="text-gray-600">Our clients see 3x higher conversion rates and 65% less manual work.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div id="demo" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How LeadFlow Engine™ Works
            </h2>
            <p className="text-xl text-gray-600">
              Six simple steps to transform your lead generation
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Lead Captured</h3>
              <p className="text-gray-600">From your website, ads, or referrals - we capture every lead instantly.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-green-600">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Auto-Scored</h3>
              <p className="text-gray-600">AI analyzes behavior and demographics to score leads 0-100.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-purple-600">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Instant Welcome</h3>
              <p className="text-gray-600">Personalized welcome email sent within 2 minutes of capture.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-yellow-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-yellow-600">4</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Smart Sequences</h3>
              <p className="text-gray-600">Multi-channel follow-up sequences based on lead score and behavior.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-red-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-red-600">5</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Human Handoff</h3>
              <p className="text-gray-600">Hot leads automatically assigned to your team with full context.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-indigo-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-indigo-600">6</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Close & Convert</h3>
              <p className="text-gray-600">Your team closes more deals with warm, nurtured prospects.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Real Results from Ontario Businesses
            </h2>
            <p className="text-xl text-gray-600">
              See how LeadFlow Engine™ is transforming lead generation across industries
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">3.2x</div>
                <div className="text-lg font-semibold text-gray-900 mb-2">Conversion Rate</div>
                <div className="text-gray-600 mb-4">Property Management Company</div>
                <p className="text-sm text-gray-600">"We went from 12% to 38% conversion rate in just 3 months. LeadFlow Engine™ pays for itself every month."</p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">65%</div>
                <div className="text-lg font-semibold text-gray-900 mb-2">Less Manual Work</div>
                <div className="text-gray-600 mb-4">Real Estate Agency</div>
                <p className="text-sm text-gray-600">"Our team now focuses on closing deals instead of chasing leads. Productivity has never been higher."</p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-600 mb-2">$2.4M</div>
                <div className="text-lg font-semibold text-gray-900 mb-2">Additional Revenue</div>
                <div className="text-gray-600 mb-4">Contracting Company</div>
                <p className="text-sm text-gray-600">"LeadFlow Engine™ helped us close $2.4M in additional revenue last year. Best investment we've made."</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div id="form" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Ready to 3x Your Lead Conversion?
            </h2>
            <p className="text-xl text-gray-600">
              Book a personalized demo and see LeadFlow Engine™ in action with your data
            </p>
          </div>
          
          <div className="bg-gray-50 rounded-2xl p-8">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="leadflow-fullname" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="leadflow-fullname"
                    name="fullName"
                    autoComplete="name"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="John Smith"
                  />
                </div>
                
                <div>
                  <label htmlFor="leadflow-email" className="block text-sm font-medium text-gray-700 mb-2">
                    Work Email *
                  </label>
                  <input
                    type="email"
                    id="leadflow-email"
                    name="email"
                    autoComplete="email"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="john@company.com"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="leadflow-company" className="block text-sm font-medium text-gray-700 mb-2">
                    Company *
                  </label>
                  <input
                    type="text"
                    id="leadflow-company"
                    name="company"
                    autoComplete="organization"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Your Company"
                  />
                </div>
                
                <div>
                  <label htmlFor="leadflow-phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="leadflow-phone"
                    name="phone"
                    autoComplete="tel"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="(416) 555-0123"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="leadflow-industry" className="block text-sm font-medium text-gray-700 mb-2">
                    Industry *
                  </label>
                  <select
                    id="leadflow-industry"
                    name="industry"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select your industry</option>
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
                  <label htmlFor="leadflow-budget" className="block text-sm font-medium text-gray-700 mb-2">
                    Monthly Ad Budget
                  </label>
                  <select 
                    id="leadflow-budget"
                    name="budget"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="">Select budget range</option>
                    <option value="0-1000">$0 - $1,000</option>
                    <option value="1000-5000">$1,000 - $5,000</option>
                    <option value="5000-10000">$5,000 - $10,000</option>
                    <option value="10000+">$10,000+</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label htmlFor="leadflow-blocker" className="block text-sm font-medium text-gray-700 mb-2">
                  Biggest Blocker
                </label>
                <textarea
                  id="leadflow-blocker"
                  name="blocker"
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="What's your biggest challenge with lead generation right now?"
                />
              </div>
              
              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="consent"
                  name="consent"
                  required
                  className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="consent" className="ml-3 text-sm text-gray-600">
                  I agree to receive communications from OMGsystems about LeadFlow Engine™ and related services. You can unsubscribe at any time.
                </label>
              </div>
              
              <button
                type="submit"
                className="w-full bg-blue-600 text-white font-semibold py-4 px-6 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Book My Demo
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
          </div>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                How quickly can I see results?
              </h3>
              <p className="text-gray-600">
                Most clients see improved lead response times within 24 hours of implementation. Full conversion rate improvements typically appear within 2-4 weeks as your sequences mature.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Does LeadFlow Engine™ work with my existing CRM?
              </h3>
              <p className="text-gray-600">
                Yes! LeadFlow Engine™ integrates with most popular CRMs including HubSpot, Salesforce, Pipedrive, and custom solutions. We can also work with your existing tools.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                What's included in the setup?
              </h3>
              <p className="text-gray-600">
                Complete setup includes: CRM integration, custom email sequences, lead scoring configuration, team training, and 30 days of optimization support. Most setups are complete within 1-2 weeks.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Is there a minimum contract?
              </h3>
              <p className="text-gray-600">
                We offer flexible month-to-month plans with no long-term contracts. Most clients see ROI within the first month, making it easy to justify continued investment.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Footer CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-blue-600 text-white p-4 shadow-lg z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="hidden sm:block">
            <p className="font-semibold">Ready to 3x your lead conversion?</p>
            <p className="text-sm text-blue-100">Book a demo and see LeadFlow Engine™ in action</p>
          </div>
          <a
            href="#form"
            className="bg-yellow-400 text-blue-900 font-semibold px-6 py-2 rounded-lg hover:bg-yellow-300 transition-colors"
          >
            Book Demo Now
          </a>
        </div>
      </div>
    </div>
  );
}
