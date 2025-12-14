"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getAppById } from "@/config/apps_config";
import { AppPairingsStrip } from "@/components/apps/AppPairingsStrip";
import { AppIndustriesStrip } from "@/components/apps/AppIndustriesStrip";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/common/section";
import { Hero } from "@/components/apps/leadflow/hero";
import { PainCard } from "@/components/apps/leadflow/pain-card";
import { StepCard } from "@/components/apps/leadflow/step-card";
import { FeatureCard } from "@/components/apps/leadflow/feature-card";
import { ProofBlock } from "@/components/apps/leadflow/proof-block";
import { 
  ArrowRightIcon,
  UserIcon,
  CheckCircleIcon,
  ChartBarIcon,
  BoltIcon,
  SparklesIcon
} from "@heroicons/react/24/outline";
import { 
  hero, 
  frustrations, 
  steps, 
  deliverables, 
  proof, 
  faqs, 
  analytics,
  productStructuredData 
} from "@/content/leadflow";

export default function LeadFlowPage() {
  const [currentLead, setCurrentLead] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Analytics tracking
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent(analytics.view));
    }
  }, []);

  // Lead animation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentLead((prev) => (prev + 1) % 6);
        setIsAnimating(false);
      }, 500);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Build FAQPage JSON-LD
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((f) => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": { "@type": "Answer", "text": f.a },
    })),
  };

  const leadTypes = [
    { name: "Sarah M.", company: "TechCorp", type: "Enterprise", color: "blue" },
    { name: "Mike R.", company: "StartupXYZ", type: "SMB", color: "green" },
    { name: "Lisa K.", company: "Global Inc", type: "Enterprise", color: "purple" },
    { name: "David L.", company: "LocalBiz", type: "Local", color: "orange" },
    { name: "Emma S.", company: "ScaleUp", type: "Growth", color: "pink" },
    { name: "John D.", company: "MegaCorp", type: "Enterprise", color: "indigo" }
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-teal-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute top-40 left-1/2 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
      </div>

      <div className="relative z-10">
        {/* Modern Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              
              {/* Left Content - Main Message */}
              <div className="text-white animate-in slide-in-from-left duration-1000 text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center mr-4">
                    <BoltIcon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-emerald-400 font-semibold text-lg">LeadFlow Engine</span>
                </div>
                
                <h1 className="font-bold leading-tight mb-6 bg-gradient-to-r from-white via-emerald-100 to-teal-200 bg-clip-text text-transparent" style={{fontSize: "clamp(2.5rem, 5vw, 4.5rem)"}}>
                  Capture & Convert
                  <br />
                  <span className="text-emerald-400">Every Lead</span>
                </h1>
                
                <p className="text-gray-200 mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0" style={{fontSize: "clamp(1rem, 2vw, 1.25rem)"}}>
                  Transform your lead management with intelligent automation. Capture, qualify, and convert leads faster than ever before.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 mb-8 animate-in slide-in-from-left duration-1000 delay-300">
                  <Link
                    href="/try-live-demo?product=leadflow"
                    className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-semibold rounded-xl text-slate-900 bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all duration-300 transform hover:scale-105 shadow-xl"
                  >
                    <span className="mr-2">Try Live Demo</span>
                    <ArrowRightIcon className="w-5 h-5" />
                  </Link>
                  <Link
                    href="/signup"
                    className="inline-flex items-center justify-center px-8 py-4 border border-white/30 text-white font-semibold rounded-xl hover:bg-white/10 transition-all duration-300"
                  >
                    Start Free Trial
                  </Link>
                </div>
                
                {/* Trust Indicators */}
                <div className="flex flex-wrap items-center gap-6 text-sm text-gray-300 animate-in slide-in-from-left duration-1000 delay-500">
                  <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full mr-2 animate-pulse"></div>
                    Real-time capture
                  </div>
                  <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                    <div className="w-2 h-2 bg-teal-400 rounded-full mr-2 animate-pulse" style={{animationDelay: "0.5s"}}></div>
                    Smart qualification
                  </div>
                </div>
              </div>
              
              {/* Right Content - Lead Flow Animation */}
              <div className="relative animate-in slide-in-from-right duration-1000 delay-200">
                <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl">
                  
                  {/* Lead Flow Animation Container */}
                  <div className="w-full h-96 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl relative overflow-hidden">
                    
                    {/* Background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-700 to-slate-800"></div>
                    
                    {/* Incoming Leads Animation */}
                    <div className="absolute inset-4 bg-white/5 rounded-xl border border-white/20 overflow-hidden">
                      
                      {/* Header */}
                      <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-3 text-white text-sm font-semibold">
                        Live Lead Capture
                      </div>
                      
                      {/* Leads Container */}
                      <div className="p-4 h-full overflow-y-auto">
                        <div className="space-y-3">
                          {leadTypes.map((lead, index) => (
                            <div
                              key={index}
                              className={`bg-white/10 rounded-lg p-3 border border-white/20 transition-all duration-500 ${
                                currentLead === index && isAnimating ? 'scale-105 bg-white/20 shadow-lg' : 'opacity-70'
                              }`}
                              style={{
                                animation: currentLead === index && isAnimating ? 'leadSlideIn 0.5s ease-out' : 'none'
                              }}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                  <div className={`w-8 h-8 bg-${lead.color}-500 rounded-full flex items-center justify-center mr-3`}>
                                    <UserIcon className="w-4 h-4 text-white" />
                                  </div>
                                  <div>
                                    <div className="text-white text-sm font-medium">{lead.name}</div>
                                    <div className="text-gray-300 text-xs">{lead.company}</div>
                                  </div>
                                </div>
                                <div className="flex items-center">
                                  <div className="text-xs text-gray-400 mr-2">{lead.type}</div>
                                  {currentLead === index && isAnimating && (
                                    <CheckCircleIcon className="w-5 h-5 text-green-400 animate-pulse" />
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    {/* Success Counter */}
                    <div className="absolute top-4 right-4 bg-green-500/20 backdrop-blur-sm rounded-lg p-2 border border-green-400/30">
                      <div className="flex items-center text-green-400 text-xs">
                        <CheckCircleIcon className="w-4 h-4 mr-1" />
                        <span className="font-semibold">Verified</span>
                        <span className="ml-1">{currentLead + 1}/6</span>
                      </div>
                    </div>
                    
                    {/* Flow Indicator */}
                    <div className="absolute bottom-4 left-4 right-4 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-lg p-2 border border-emerald-400/30">
                      <div className="flex items-center text-white text-xs">
                        <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                        <span className="font-semibold">ACTIVE</span>
                        <span className="ml-2">Lead Flow Processing</span>
                      </div>
                    </div>
                    
                    {/* Floating Success Icons */}
                    <div className="absolute top-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
                      <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
                    </div>
                  </div>
                  
                  {/* Animation Description */}
                  <div className="mt-6 text-center">
                    <p className="text-white/80 text-sm font-medium">Live Lead Processing</p>
                    <p className="text-white/60 text-xs mt-1">Real-time capture & verification</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
            <div className="w-6 h-10 border-2 border-white/60 rounded-full flex justify-center backdrop-blur-sm bg-white/10">
              <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </section>

      {/* Frustrations - Redesigned with AI Agent Style */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              We've heard this before
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              If this sounds familiar, LeadFlow fixes it.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {frustrations.map((frustration, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mr-4 group-hover:bg-red-200 transition-colors duration-300">
                    <span className="text-2xl">😤</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">{frustration.title}</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">{frustration.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works - Redesigned with AI Agent Style */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How it works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Six steps from nothing to something.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div
                key={index}
                className="group relative bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-8 border border-emerald-100 hover:border-emerald-200 transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="flex items-start mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-2xl font-bold text-white">{index + 1}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{step.description}</p>
                  </div>
                </div>
                
                {/* Step indicator line */}
                {index < steps.length - 1 && (
                  <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-white rounded-full border-4 border-emerald-200 flex items-center justify-center">
                    <ArrowRightIcon className="w-4 h-4 text-emerald-500" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Deliverables - Redesigned with AI Agent Style */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What you get
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Clear handoffs, working assets, measurable outcomes.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {deliverables.map((deliverable, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
              >
                <div className="flex items-center mb-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                    <CheckCircleIcon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{deliverable.title}</h3>
                </div>
                <p className="text-gray-600 leading-relaxed mb-4">{deliverable.description}</p>
                <div className="flex items-center text-emerald-600 font-semibold">
                  <span className="mr-2">✓</span>
                  <span>Included in your package</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* App Pairings Strip */}
      <AppPairingsStrip app={getAppById("leads")} />

      {/* Proof - Redesigned with AI Agent Style */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Proof & results
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real results from real businesses using LeadFlow.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-3xl p-12 border border-emerald-100">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-6">{proof.title}</h3>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">{proof.description}</p>
                
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-emerald-600 mb-2">{proof.metric1}</div>
                    <div className="text-gray-600">{proof.label1}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-teal-600 mb-2">{proof.metric2}</div>
                    <div className="text-gray-600">{proof.label2}</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center mr-4">
                    <ChartBarIcon className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900">Success Metrics</h4>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Lead Conversion Rate</span>
                    <span className="font-bold text-emerald-600">+{proof.metric1}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Response Time</span>
                    <span className="font-bold text-teal-600">-{proof.metric2}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Customer Satisfaction</span>
                    <span className="font-bold text-emerald-600">95%+</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* App Industries Strip */}
      <AppIndustriesStrip appId="leads" />

      {/* Final CTA - Redesigned with AI Agent Style */}
      <section className="py-20 bg-gradient-to-br from-emerald-50 to-teal-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Ready to turn ads into clients on autopilot?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Onboarding typically completes in 1–3 weeks depending on complexity.
            </p>
          </div>
          
          <div className="bg-white rounded-3xl p-12 shadow-xl border border-emerald-100">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Get Your LeadFlow Strategy Call
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Book a free consultation to see how LeadFlow can transform your lead management.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/book-demo?app=leadflow"
                    className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-2xl hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    <span className="mr-2">Get Started</span>
                    <ArrowRightIcon className="w-5 h-5" />
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center px-8 py-4 border-2 border-emerald-200 text-emerald-700 font-semibold rounded-2xl hover:bg-emerald-50 transition-all duration-300"
                  >
                    Talk to Sales
                  </Link>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl p-8 text-white">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mr-4">
                    <BoltIcon className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-xl font-bold">Why Choose LeadFlow?</h4>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <CheckCircleIcon className="w-5 h-5 text-emerald-200 mr-3" />
                    <span>Automated lead capture & qualification</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircleIcon className="w-5 h-5 text-emerald-200 mr-3" />
                    <span>Real-time response to every lead</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircleIcon className="w-5 h-5 text-emerald-200 mr-3" />
                    <span>Seamless CRM integration</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircleIcon className="w-5 h-5 text-emerald-200 mr-3" />
                    <span>Proven results in 1-3 weeks</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section - Redesigned with AI Agent Style */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Frequently asked questions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to know about LeadFlow.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-emerald-200"
                >
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center mr-4 mt-1 group-hover:scale-110 transition-transform duration-300">
                      <span className="text-white font-bold text-sm">?</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-emerald-700 transition-colors duration-300">
                        {faq.q}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">{faq.a}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      </div>

      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productStructuredData) }}
      />
    </main>
  );
}