"use client";

import { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface Automation {
  slug: string;
  title: string;
  setupTime: string;
  setupCost: number;
  monthlyCost: number;
  pain: string;
  benefit: string;
  features: string[];
  category: string;
  industries: string[];
  icon: string;
}

interface AutomationOrderModalProps {
  automation: Automation | null;
  onClose: () => void;
}

export function AutomationOrderModal({ automation, onClose }: AutomationOrderModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    requirements: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  if (!automation) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/automation-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          automation: automation,
          customerInfo: formData,
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to submit order');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-[#0f172a] border border-white/10 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-[#47BD79]/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-[#47BD79]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Order Submitted Successfully!</h2>
            <p className="text-white/60 mb-6">
              Thank you for your order. Our team will contact you within 24 hours to discuss your automation setup and payment processing.
            </p>
            <div className="bg-[#3B82F6]/10 border border-[#3B82F6]/30 rounded-xl p-4 mb-6">
              <h3 className="font-semibold text-[#3B82F6] mb-2">What happens next?</h3>
              <ul className="text-sm text-white/80 text-left space-y-1">
                <li>• Our team reviews your requirements</li>
                <li>• We send you a payment link for the setup cost</li>
                <li>• We create your account and begin setup</li>
                <li>• You'll receive login credentials and training</li>
                <li>• Monthly billing starts after setup completion</li>
              </ul>
            </div>
            <button
              onClick={onClose}
              className="bg-[#A855F7] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#9333EA] transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#0f172a] border border-white/10 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">
                Order {automation.title}
              </h2>
              <p className="text-white/60">
                Complete your order and we'll get started on your automation setup
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-white/60 hover:text-white transition-colors"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Order Summary */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Order Summary</h3>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{automation.icon}</span>
                  <div>
                    <h4 className="font-medium text-white">{automation.title}</h4>
                    <p className="text-sm text-white/60">{automation.category}</p>
                  </div>
                </div>

                <div className="border-t border-white/10 pt-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white/60">Setup Cost (one-time)</span>
                    <span className="font-semibold text-white">${automation.setupCost.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white/60">Monthly Subscription</span>
                    <span className="font-semibold text-white">${automation.monthlyCost}/month</span>
                  </div>
                  <div className="flex justify-between items-center text-sm text-white/40">
                    <span>Setup Time</span>
                    <span>{automation.setupTime}</span>
                  </div>
                </div>

                <div className="bg-[#3B82F6]/10 border border-[#3B82F6]/30 rounded-xl p-4">
                  <h4 className="font-semibold text-[#3B82F6] mb-2">What's Included</h4>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li>• Full setup and configuration</li>
                    <li>• Integration with your existing tools</li>
                    <li>• Team training and documentation</li>
                    <li>• 30-day support and optimization</li>
                    <li>• Monthly usage monitoring</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Order Form */}
            <div>
              {error && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 mb-6">
                  <p className="text-red-400">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    autoComplete="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-[#1b2335] border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-[#A855F7] focus:ring-2 focus:ring-[#A855F7]/20"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-[#1b2335] border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-[#A855F7] focus:ring-2 focus:ring-[#A855F7]/20"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-white mb-2">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    autoComplete="organization"
                    required
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-[#1b2335] border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-[#A855F7] focus:ring-2 focus:ring-[#A855F7]/20"
                    placeholder="Your company name"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-white mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    autoComplete="tel"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-[#1b2335] border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-[#A855F7] focus:ring-2 focus:ring-[#A855F7]/20"
                    placeholder="(555) 987-6543"
                  />
                </div>

                <div>
                  <label htmlFor="requirements" className="block text-sm font-medium text-white mb-2">
                    Additional Requirements / Notes
                  </label>
                  <textarea
                    id="requirements"
                    name="requirements"
                    rows={4}
                    value={formData.requirements}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-[#1b2335] border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-[#A855F7] focus:ring-2 focus:ring-[#A855F7]/20 resize-none"
                    placeholder="Any specific requirements, integrations, or customizations needed..."
                  />
                </div>

                <div className="bg-[#F59E0B]/10 border border-[#F59E0B]/30 rounded-xl p-4">
                  <h4 className="font-semibold text-[#F59E0B] mb-2">Payment Process</h4>
                  <p className="text-sm text-white/80">
                    After submitting this form, our team will contact you to process the setup payment and set up your monthly subscription.
                    We accept all major credit cards and can provide invoices for business purchases.
                  </p>
                </div>

                <div className="flex gap-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-[#A855F7] text-white py-3 px-6 rounded-xl font-semibold hover:bg-[#9333EA] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Order'}
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-6 py-3 border border-white/20 bg-white/5 text-white rounded-xl font-semibold hover:bg-white/10 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}