"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  CheckCircleIcon, 
  SparklesIcon,
  ClockIcon,
  ShieldCheckIcon
} from "@heroicons/react/24/outline";
import { trackAIAgentQuoteRequest, trackFormSubmission } from "@/lib/analytics";

const industries = [
  "Property Management",
  "Real Estate", 
  "Contractors",
  "Accounting",
  "Cleaning",
  "Healthcare",
  "Other"
];

const timelines = [
  "ASAP (Within 2 weeks)",
  "1-2 months",
  "3-6 months", 
  "6+ months",
  "Just exploring options"
];

export default function OfferSection() {
  const [formData, setFormData] = useState({
    fullName: "",
    companyName: "",
    email: "",
    industry: "",
    agentRole: "",
    timeline: "",
    additionalDetails: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/ai-agents/quote-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Track successful form submission
        trackFormSubmission('ai_agent_quote_request', {
          industry: formData.industry,
          timeline: formData.timeline,
          has_additional_details: !!formData.additionalDetails
        });
        
        // Track AI Agent specific analytics
        trackAIAgentQuoteRequest({
          industry: formData.industry,
          agentRole: formData.agentRole,
          timeline: formData.timeline,
          companyName: formData.companyName
        });
        
        setIsSubmitted(true);
      } else {
        throw new Error('Failed to submit form');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting your request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <section id="offer" className="py-20 bg-gradient-to-br from-emerald-50 to-lime-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white rounded-3xl p-12 shadow-2xl">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-emerald-500 to-lime-500 rounded-full mb-8">
              <CheckCircleIcon className="w-10 h-10 text-white" />
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Thank You!
            </h2>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              We've received your AI Agent request and will be in touch within 48 hours 
              with your tailored quote and next steps.
            </p>
            
            <div className="bg-emerald-50 rounded-2xl p-6 mb-8">
              <h3 className="text-lg font-semibold text-emerald-800 mb-4">What happens next?</h3>
              <div className="space-y-3 text-left">
                <div className="flex items-center">
                  <ClockIcon className="w-5 h-5 text-emerald-600 mr-3" />
                  <span className="text-emerald-700">We'll review your requirements within 24 hours</span>
                </div>
                <div className="flex items-center">
                  <SparklesIcon className="w-5 h-5 text-emerald-600 mr-3" />
                  <span className="text-emerald-700">Custom quote delivered within 48 hours</span>
                </div>
                <div className="flex items-center">
                  <ShieldCheckIcon className="w-5 h-5 text-emerald-600 mr-3" />
                  <span className="text-emerald-700">Free consultation call to discuss your agent</span>
                </div>
              </div>
            </div>
            
            <Button 
              asChild
              size="lg"
              className="bg-gradient-to-r from-emerald-600 to-lime-600 hover:from-emerald-700 hover:to-lime-700 text-white px-8 py-4 text-lg font-semibold"
            >
              <a href="/">Return to Homepage</a>
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="offer" className="py-20 bg-gradient-to-br from-emerald-50 to-lime-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Ready to bring an AI Agent into your business?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Pick what you'd like your agent to do. Fill out a brief form. 
            We'll send you a custom quote within 48 hours.
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="fullName" className="text-sm font-semibold text-gray-700 mb-2 block">
                  Full Name *
                </Label>
                <Input
                  id="fullName"
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Enter your full name"
                />
              </div>
              
              <div>
                <Label htmlFor="companyName" className="text-sm font-semibold text-gray-700 mb-2 block">
                  Company Name *
                </Label>
                <Input
                  id="companyName"
                  type="text"
                  required
                  value={formData.companyName}
                  onChange={(e) => handleInputChange('companyName', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Enter your company name"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="email" className="text-sm font-semibold text-gray-700 mb-2 block">
                  Email Address *
                </Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Enter your email address"
                />
              </div>
              
              <div>
                <Label htmlFor="industry" className="text-sm font-semibold text-gray-700 mb-2 block">
                  Industry *
                </Label>
                <Select value={formData.industry} onValueChange={(value) => handleInputChange('industry', value)}>
                  <SelectTrigger className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
                    <SelectValue placeholder="Select your industry" />
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
            </div>

            {/* Agent Role */}
            <div>
              <Label htmlFor="agentRole" className="text-sm font-semibold text-gray-700 mb-2 block">
                What task do you want performed? *
              </Label>
              <Textarea
                id="agentRole"
                required
                value={formData.agentRole}
                onChange={(e) => handleInputChange('agentRole', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="Describe the specific task or process you'd like your AI Agent to handle..."
                rows={4}
              />
            </div>

            {/* Timeline */}
            <div>
              <Label htmlFor="timeline" className="text-sm font-semibold text-gray-700 mb-2 block">
                Project Timeline
              </Label>
              <Select value={formData.timeline} onValueChange={(value) => handleInputChange('timeline', value)}>
                <SelectTrigger className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
                  <SelectValue placeholder="When would you like to get started?" />
                </SelectTrigger>
                <SelectContent>
                  {timelines.map((timeline) => (
                    <SelectItem key={timeline} value={timeline}>
                      {timeline}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Additional Details */}
            <div>
              <Label htmlFor="additionalDetails" className="text-sm font-semibold text-gray-700 mb-2 block">
                Additional Details
              </Label>
              <Textarea
                id="additionalDetails"
                value={formData.additionalDetails}
                onChange={(e) => handleInputChange('additionalDetails', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="Any specific requirements, integrations, or questions you'd like us to know about..."
                rows={4}
              />
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-gradient-to-r from-emerald-600 to-lime-600 hover:from-emerald-700 hover:to-lime-700 text-white px-12 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                    Submitting...
                  </div>
                ) : (
                  "Request Your Custom Quote"
                )}
              </Button>
              
              <p className="text-sm text-gray-500 mt-4">
                We'll respond within 48 hours with your tailored AI Agent proposal.
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
