"use client";

import { useState } from "react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/common/section";

export default function ContactSalesHealthcare() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    practiceName: "",
    practiceType: "",
    location: "",
    patientVolume: "",
    painPoints: [] as string[],
    currentEMR: "",
    currentTools: "",
    desiredOutcome: "",
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
    setForm(prev => ({
      ...prev,
      painPoints: checked 
        ? [...prev.painPoints, value]
        : prev.painPoints.filter(point => point !== value)
    }));
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    
    try {
      const res = await fetch("/api/contact-sales/healthcare", {
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
                We've received your request for a Healthcare strategy call. Our team will reach out within 24 hours to schedule your consultation.
              </p>
              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-blue-800">
                  <strong>What's next?</strong> We'll review your specific challenges and prepare a customized demo showing how our automation solutions can streamline your practice operations while maintaining HIPAA compliance.
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
      <Section className="bg-gradient-to-br from-emerald-50 to-teal-100">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Request a Strategy Call — Healthcare
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Let us show how automation, secure workflows, and smart integrations can help you reduce admin time, improve patient care, and maintain compliance.
            </p>
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
              <p className="text-gray-700">
                Stop spending hours on paperwork and administrative tasks. 
                Focus on what matters most - patient care - with automation that's built for healthcare.
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="(555) 987-6543"
                    />
                  </div>
                  <div>
                    <label htmlFor="practiceName" className="block text-sm font-medium text-gray-700 mb-2">
                      Practice Name
                    </label>
                    <input
                      type="text"
                      id="practiceName"
                      name="practiceName"
                      value={form.practiceName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="Your practice or clinic name"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="practiceType" className="block text-sm font-medium text-gray-700 mb-2">
                      Practice Type
                    </label>
                    <select
                      id="practiceType"
                      name="practiceType"
                      value={form.practiceType}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    >
                      <option value="">Select type</option>
                      <option value="family-medicine">Family Medicine</option>
                      <option value="specialist">Specialist Practice</option>
                      <option value="clinic">Multi-Provider Clinic</option>
                      <option value="urgent-care">Urgent Care</option>
                      <option value="mental-health">Mental Health</option>
                      <option value="dental">Dental</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                      Location / City
                    </label>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      value={form.location}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="Toronto, ON"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="patientVolume" className="block text-sm font-medium text-gray-700 mb-2">
                    Patient Volume (per month)
                  </label>
                  <select
                    id="patientVolume"
                    name="patientVolume"
                    value={form.patientVolume}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  >
                    <option value="">Select range</option>
                    <option value="0-500">0-500 patients</option>
                    <option value="500-1000">500-1,000 patients</option>
                    <option value="1000-2000">1,000-2,000 patients</option>
                    <option value="2000-5000">2,000-5,000 patients</option>
                    <option value="5000+">5,000+ patients</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Biggest Challenge (Select all that apply)
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { value: "appointment-scheduling", label: "Appointment Scheduling" },
                      { value: "patient-communication", label: "Patient Communication" },
                      { value: "billing-insurance", label: "Billing & Insurance" },
                      { value: "documentation", label: "Documentation & Charting" },
                      { value: "referrals", label: "Referrals & Follow-ups" },
                      { value: "compliance", label: "Compliance & Reporting" },
                      { value: "staff-coordination", label: "Staff Coordination" },
                      { value: "no-shows", label: "No-Shows & Cancellations" }
                    ].map((option) => (
                      <label key={option.value} className="flex items-center">
                        <input
                          type="checkbox"
                          value={option.value}
                          checked={form.painPoints.includes(option.value)}
                          onChange={handleCheckboxChange}
                          className="mr-2 text-emerald-600 focus:ring-emerald-500"
                        />
                        <span className="text-sm text-gray-700">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="currentEMR" className="block text-sm font-medium text-gray-700 mb-2">
                      Current EMR System
                    </label>
                    <input
                      type="text"
                      id="currentEMR"
                      name="currentEMR"
                      value={form.currentEMR}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="e.g., Epic, Cerner, Allscripts, or None"
                    />
                  </div>
                  <div>
                    <label htmlFor="currentTools" className="block text-sm font-medium text-gray-700 mb-2">
                      Other Tools Currently Used
                    </label>
                    <input
                      type="text"
                      id="currentTools"
                      name="currentTools"
                      value={form.currentTools}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="e.g., Scheduling tool, CRM, spreadsheets"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="desiredOutcome" className="block text-sm font-medium text-gray-700 mb-2">
                    What do you want to achieve with automation?
                  </label>
                  <textarea
                    id="desiredOutcome"
                    name="desiredOutcome"
                    rows={3}
                    value={form.desiredOutcome}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="e.g., Reduce admin time, improve patient experience, better compliance, fewer errors..."
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="Any other information you'd like to share..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full bg-emerald-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">HIPAA Compliant</h3>
                <p className="text-sm text-gray-600">Built with healthcare privacy and security in mind</p>
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Patient-Focused</h3>
                <p className="text-sm text-gray-600">Designed to improve patient experience and care</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
