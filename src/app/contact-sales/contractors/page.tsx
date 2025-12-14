"use client";

import { useState } from "react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/common/section";

export default function ContactSalesContractors() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    businessName: "",
    city: "",
    services: [] as string[],
    projectSize: "",
    painPoints: [] as string[],
    currentTools: "",
    desiredGoal: "",
    notes: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    const fieldName = e.target.name;
    
    setForm(prev => ({
      ...prev,
      [fieldName]: checked 
        ? [...(prev[fieldName as keyof typeof prev] as string[]), value]
        : (prev[fieldName as keyof typeof prev] as string[]).filter(item => item !== value)
    }));
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    
    try {
      const res = await fetch("/api/contact-sales/contractors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      
      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="min-h-screen bg-gray-50 py-20">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Thank You!</h1>
              <p className="text-lg text-gray-600 mb-6">
                We've received your request for a Contractors strategy call. Our team will reach out within 24 hours to schedule your consultation.
              </p>
              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-blue-800">
                  <strong>What's next?</strong> We'll review your specific challenges and prepare a customized demo showing how our automation solutions can streamline your operations and help you win more projects.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <Section className="bg-gradient-to-br from-orange-50 to-red-100">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Request a Strategy Call — Contractors
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Let us show how automation, project management, and smart workflows can help you win more bids, manage projects better, and get paid faster.
            </p>
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
              <p className="text-gray-700">
                Stop losing money to inefficient processes and missed follow-ups. 
                Transform your contracting business with automation that works while you work.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Form Section */}
      <Section>
        <Container>
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Let's Talk — Book Your Sales Call</h2>
              
              {status === "error" && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                  <p className="text-red-700">There was an error submitting your request. Please try again or contact us directly.</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Contact Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={form.name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={form.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={form.phone}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      placeholder="(555) 987-6543"
                    />
                  </div>
                  <div>
                    <label htmlFor="businessName" className="block text-sm font-medium text-gray-700 mb-2">
                      Business Name
                    </label>
                    <input
                      type="text"
                      id="businessName"
                      name="businessName"
                      value={form.businessName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      placeholder="Your business name"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                      City / Area of Service
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={form.city}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      placeholder="Toronto, ON"
                    />
                  </div>
                  <div>
                    <label htmlFor="projectSize" className="block text-sm font-medium text-gray-700 mb-2">
                      Approximate Average Project Size / Budget
                    </label>
                    <select
                      id="projectSize"
                      name="projectSize"
                      value={form.projectSize}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    >
                      <option value="">Select range</option>
                      <option value="under-10k">Under $10,000</option>
                      <option value="10k-50k">$10,000 - $50,000</option>
                      <option value="50k-100k">$50,000 - $100,000</option>
                      <option value="100k-500k">$100,000 - $500,000</option>
                      <option value="500k+">$500,000+</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Trade / Services Offered (Select all that apply)
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { value: "plumbing", label: "Plumbing" },
                      { value: "electrical", label: "Electrical" },
                      { value: "hvac", label: "HVAC" },
                      { value: "renovation", label: "Renovation" },
                      { value: "flooring", label: "Flooring" },
                      { value: "roofing", label: "Roofing" },
                      { value: "landscaping", label: "Landscaping" },
                      { value: "painting", label: "Painting" },
                      { value: "concrete", label: "Concrete" },
                      { value: "carpentry", label: "Carpentry" },
                      { value: "tiling", label: "Tiling" },
                      { value: "other", label: "Other" }
                    ].map((option) => (
                      <label key={option.value} className="flex items-center">
                        <input
                          type="checkbox"
                          name="services"
                          value={option.value}
                          checked={form.services.includes(option.value)}
                          onChange={handleCheckboxChange}
                          className="mr-2 text-orange-600 focus:ring-orange-500"
                        />
                        <span className="text-sm text-gray-700">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Biggest Pain Point (Select all that apply)
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { value: "estimating", label: "Estimating & Quoting" },
                      { value: "follow-ups", label: "Follow-ups & Lead Nurturing" },
                      { value: "payments", label: "Payment Collection" },
                      { value: "lead-qualification", label: "Lead Qualification" },
                      { value: "scheduling", label: "Project Scheduling" },
                      { value: "material-management", label: "Material Management" },
                      { value: "customer-communication", label: "Customer Communication" },
                      { value: "invoicing", label: "Invoicing & Billing" }
                    ].map((option) => (
                      <label key={option.value} className="flex items-center">
                        <input
                          type="checkbox"
                          name="painPoints"
                          value={option.value}
                          checked={form.painPoints.includes(option.value)}
                          onChange={handleCheckboxChange}
                          className="mr-2 text-orange-600 focus:ring-orange-500"
                        />
                        <span className="text-sm text-gray-700">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor="currentTools" className="block text-sm font-medium text-gray-700 mb-2">
                    Tools Currently in Use
                  </label>
                  <input
                    type="text"
                    id="currentTools"
                    name="currentTools"
                    value={form.currentTools}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="e.g., QuickBooks, Jobber, ServiceTitan, or None"
                  />
                </div>

                <div>
                  <label htmlFor="desiredGoal" className="block text-sm font-medium text-gray-700 mb-2">
                    What is your desired goal?
                  </label>
                  <textarea
                    id="desiredGoal"
                    name="desiredGoal"
                    rows={3}
                    value={form.desiredGoal}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="e.g., More qualified leads, faster quoting, smoother payments, better project tracking..."
                  />
                </div>

                <div>
                  <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
                    Additional Notes (Optional)
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    rows={3}
                    value={form.notes}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="Any other information you'd like to share..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full bg-orange-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-orange-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === "submitting" ? "Submitting..." : "Request Strategy Call"}
                </button>
              </form>
            </div>
          </div>
        </Container>
      </Section>

      {/* Trust Section */}
      <Section className="bg-white">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Why Choose OMGsystems?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Canadian Data Residency</h3>
                <p className="text-sm text-gray-600">Your data stays in Canada with full compliance and security</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Audit Logs</h3>
                <p className="text-sm text-gray-600">Complete audit trails for compliance and transparency</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Built-for-Industry</h3>
                <p className="text-sm text-gray-600">Workflows designed specifically for contractors</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Quick Setup</h3>
                <p className="text-sm text-gray-600">Get up and running in days, not months</p>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
