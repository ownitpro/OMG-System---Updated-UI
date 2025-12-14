"use client";
import { useState, useEffect, useRef } from "react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/common/section";
import { SmartAutomationsGrid } from "@/components/automations/SmartAutomationsGrid";
import { AutomationOrderModal } from "@/components/automations/AutomationOrderModal";
import { automations, AutomationDefinition } from "@/data/automations";

export function SmartAutomationsPageClient() {
  const [selectedAutomation, setSelectedAutomation] = useState<AutomationDefinition | null>(null);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [showExitIntent, setShowExitIntent] = useState(false);
  
  const automationsRef = useRef<HTMLDivElement>(null);
  const pricingRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);
  const flowRef = useRef<HTMLDivElement>(null);

  // Handle deep linking from homepage
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const automationSlug = urlParams.get('automation');
    if (automationSlug) {
      const automation = automations.find(a => a.slug === automationSlug);
      if (automation) {
        setSelectedAutomation(automation);
        setExpandedCard(automation.slug);
        // Scroll to automation grid
        setTimeout(() => {
          automationsRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, []);

  // Exit intent detection
  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !showExitIntent) {
        setShowExitIntent(true);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [showExitIntent]);

  const handleOrderClick = (automation: AutomationDefinition) => {
    setSelectedAutomation(automation);
    setIsOrderModalOpen(true);
  };

  const handleCardExpand = (automation: AutomationDefinition) => {
    setExpandedCard(expandedCard === automation.slug ? null : automation.slug);
    setSelectedAutomation(automation);
  };

  const scrollToSection = (section: string) => {
    const refs = {
      'automations': automationsRef,
      'pricing': pricingRef,
      'faq': faqRef,
      'flow': flowRef
    };
    
    refs[section as keyof typeof refs]?.current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Anchors */}
      <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <Container>
          <nav className="flex justify-center space-x-8 py-4">
            <button 
              onClick={() => scrollToSection('automations')}
              className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              All Automations
            </button>
            <button 
              onClick={() => scrollToSection('flow')}
              className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              How It Works
            </button>
            <button 
              onClick={() => scrollToSection('pricing')}
              className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              Pricing
            </button>
            <button 
              onClick={() => scrollToSection('faq')}
              className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              FAQ
            </button>
          </nav>
        </Container>
      </div>

      {/* Enhanced Hero Section */}
      <Section className="bg-gradient-to-br from-slate-50 to-gray-100">
        <Container>
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Smart Automations
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-4 max-w-4xl mx-auto">
              <span className="font-bold text-lime-600">Trigger-based automation</span> you can deploy in days — not months.
            </p>
            <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
              Deploy 13 AI-powered workflow automations built for your business. Choose the automation you need, pay setup + subscription, and get live fast.
            </p>
            
            {/* Enhanced Trust Bar */}
            <div className="flex flex-wrap justify-center gap-8 mb-12 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-lime-500 rounded-full"></div>
                <span className="font-medium">Canadian Data Center</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-lime-500 rounded-full"></div>
                <span className="font-medium">Enterprise Security</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-lime-500 rounded-full"></div>
                <span className="font-medium">Audit Logs</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-lime-500 rounded-full"></div>
                <span className="font-medium">Secure by Design</span>
              </div>
            </div>

            {/* Primary CTA */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <button 
                onClick={() => scrollToSection('automations')}
                className="bg-lime-500 hover:bg-lime-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all transform hover:scale-105 shadow-lg"
              >
                Pick Your Automation →
              </button>
              <button 
                onClick={() => scrollToSection('flow')}
                className="bg-transparent border-2 border-gray-300 text-gray-700 hover:border-lime-500 hover:text-lime-600 px-8 py-4 rounded-lg font-semibold text-lg transition-all"
              >
                Learn More
              </button>
            </div>

            {/* ROI Callout */}
            <div className="bg-lime-50 border border-lime-200 rounded-lg p-6 max-w-2xl mx-auto">
              <p className="text-lime-800 font-semibold text-lg">
                💰 Clients recoup cost in <span className="font-bold">60 days</span> on average
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Enhanced Automation Grid */}
      <div ref={automationsRef}>
        <SmartAutomationsGrid 
          onOrderClick={handleOrderClick}
          onCardExpand={handleCardExpand}
          expandedCard={expandedCard}
          selectedAutomation={selectedAutomation}
        />
      </div>

      {/* Workflow Flow Diagram */}
      <div ref={flowRef}>
        <Section className="bg-white">
          <Container>
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">
                How Each Automation Works
              </h2>
              
              {/* Flow Diagram */}
              <div className="bg-gradient-to-r from-lime-50 to-green-50 rounded-2xl p-8 mb-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-center">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-lime-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <span className="text-2xl">⚡</span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Trigger</h3>
                    <p className="text-sm text-gray-600">Event starts the automation</p>
                  </div>
                  
                  <div className="hidden md:block">
                    <div className="w-full h-1 bg-lime-300 rounded-full"></div>
                    <div className="w-0 h-0 border-l-8 border-l-lime-300 border-t-4 border-b-4 border-t-transparent border-b-transparent ml-auto -mt-2"></div>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <span className="text-2xl">⚙️</span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Process</h3>
                    <p className="text-sm text-gray-600">AI analyzes and processes data</p>
                  </div>
                  
                  <div className="hidden md:block">
                    <div className="w-full h-1 bg-lime-300 rounded-full"></div>
                    <div className="w-0 h-0 border-l-8 border-l-lime-300 border-t-4 border-b-4 border-t-transparent border-b-transparent ml-auto -mt-2"></div>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <span className="text-2xl">✅</span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Action</h3>
                    <p className="text-sm text-gray-600">Automated response or update</p>
                  </div>
                </div>
              </div>

              {/* Before vs After Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="bg-red-50 border border-red-200 rounded-xl p-8">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mr-4">
                      <span className="text-2xl">❌</span>
                    </div>
                    <h3 className="text-2xl font-bold text-red-800">Before Automation</h3>
                  </div>
                  <ul className="space-y-3 text-red-700">
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
                      Manual data entry and processing
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
                      Missed opportunities and delays
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
                      Inconsistent follow-up
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
                      Time-consuming repetitive tasks
                    </li>
                  </ul>
                </div>

                <div className="bg-lime-50 border border-lime-200 rounded-xl p-8">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-lime-500 rounded-full flex items-center justify-center mr-4">
                      <span className="text-2xl">✅</span>
                    </div>
                    <h3 className="text-2xl font-bold text-lime-800">After Automation</h3>
                  </div>
                  <ul className="space-y-3 text-lime-700">
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-lime-500 rounded-full mr-3"></span>
                      Instant data processing and routing
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-lime-500 rounded-full mr-3"></span>
                      Never miss an opportunity
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-lime-500 rounded-full mr-3"></span>
                      Consistent, timely responses
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-lime-500 rounded-full mr-3"></span>
                      Focus on high-value activities
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </Container>
        </Section>
      </div>

      {/* Enhanced Pricing & Terms */}
      <div ref={pricingRef}>
        <Section className="bg-gray-50">
          <Container>
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">
                Pricing & Terms
              </h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-lime-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">💰</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Setup Cost</h3>
                    <p className="text-gray-600">One-time implementation fee</p>
                  </div>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-lime-500 rounded-full mr-3"></span>
                      Full configuration & integration
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-lime-500 rounded-full mr-3"></span>
                      Team training & documentation
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-lime-500 rounded-full mr-3"></span>
                      30-day support & optimization
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-lime-500 rounded-full mr-3"></span>
                      Testing & validation
                    </li>
                  </ul>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">📊</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Monthly Subscription</h3>
                    <p className="text-gray-600">Ongoing service & support</p>
                  </div>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                      Usage monitoring & alerts
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                      Regular updates & improvements
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                      Email support during business hours
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                      Performance optimization
                    </li>
                  </ul>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">🛡️</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Guarantee</h3>
                    <p className="text-gray-600">Your success is our priority</p>
                  </div>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                      30-day satisfaction guarantee
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                      Cancel anytime with 30-day notice
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                      No long-term contracts
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                      Priority support for enterprise
                    </li>
                  </ul>
                </div>
              </div>

              {/* Trust & Security Callout */}
              <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200 text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Trust & Security</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-lime-100 rounded-full flex items-center justify-center mb-3">
                      <span className="text-xl">🔒</span>
                    </div>
                    <span className="font-semibold text-gray-900">Encrypted</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-lime-100 rounded-full flex items-center justify-center mb-3">
                      <span className="text-xl">🇨🇦</span>
                    </div>
                    <span className="font-semibold text-gray-900">Canadian Data Center</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-lime-100 rounded-full flex items-center justify-center mb-3">
                      <span className="text-xl">📋</span>
                    </div>
                    <span className="font-semibold text-gray-900">Audit Logs</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-lime-100 rounded-full flex items-center justify-center mb-3">
                      <span className="text-xl">🛡️</span>
                    </div>
                    <span className="font-semibold text-gray-900">Secure by Design</span>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </Section>
      </div>

      {/* Enhanced FAQ Section */}
      <div ref={faqRef}>
        <Section className="bg-white">
          <Container>
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">
                Frequently Asked Questions
              </h2>
              <div className="space-y-6">
                {[
                  {
                    question: "How long does setup take?",
                    answer: "Most automations are delivered in 1-3 weeks depending on complexity. Simple automations take 2 weeks, while complex ones may take 3-4 weeks. We'll provide a specific timeline during setup."
                  },
                  {
                    question: "What happens if I need custom logic?",
                    answer: "We can customize any automation to fit your specific needs. During setup, we'll discuss your requirements and adjust the automation accordingly. Custom logic may extend delivery time by 1-2 weeks."
                  },
                  {
                    question: "Is the monthly fee mandatory?",
                    answer: "Yes, the monthly subscription covers ongoing monitoring, updates, and support. However, you can cancel anytime with 30 days notice. The setup cost is non-refundable as it covers completed work."
                  },
                  {
                    question: "How many automations can I have?",
                    answer: "You can have as many automations as you need. Each automation is billed separately with its own setup cost and monthly subscription. We offer volume discounts for 5+ automations."
                  },
                  {
                    question: "Can I customize or disable triggers?",
                    answer: "Absolutely! You have full control over when your automations run. You can customize trigger conditions, add filters, or temporarily disable automations through your portal."
                  }
                ].map((faq, index) => (
                  <details key={index} className="group bg-gray-50 rounded-lg cursor-pointer">
                    <summary className="flex justify-between items-center p-6 font-semibold text-lg text-gray-800 hover:text-gray-900">
                      {faq.question}
                      <span className="ml-4 flex-shrink-0">
                        <svg className="w-5 h-5 text-lime-600 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                      </span>
                    </summary>
                    <div className="px-6 pb-6">
                      <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </Container>
        </Section>
      </div>

      {/* Enhanced CTA Section */}
      <Section className="bg-gradient-to-r from-lime-500 to-green-600">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Automate Your Business?
            </h2>
            <p className="text-xl text-lime-100 mb-8">
              Choose your automation, get set up in weeks, and start seeing results immediately.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => scrollToSection('automations')}
                className="bg-white text-lime-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-50 transition-all transform hover:scale-105 shadow-lg"
              >
                Browse Automations
              </button>
              <a
                href="/contact?type=automation"
                className="bg-transparent text-white px-8 py-4 rounded-lg font-semibold text-lg border-2 border-white hover:bg-white hover:text-lime-600 transition-all"
              >
                Talk to Sales
              </a>
            </div>
          </div>
        </Container>
      </Section>

      {/* Sticky Mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 md:hidden z-50">
        <button 
          onClick={() => scrollToSection('automations')}
          className="w-full bg-lime-500 text-white py-3 rounded-lg font-semibold text-lg shadow-lg"
        >
          Pick Automation
        </button>
      </div>

      {/* Exit Intent Banner */}
      {showExitIntent && (
        <div className="fixed top-0 left-0 right-0 bg-lime-500 text-white p-4 z-50">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <span className="font-semibold">Need help picking an automation? Book a call →</span>
            <button 
              onClick={() => setShowExitIntent(false)}
              className="text-white hover:text-gray-200"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Order Modal */}
      {selectedAutomation && (
        <AutomationOrderModal
          automation={selectedAutomation}
          isOpen={isOrderModalOpen}
          onClose={() => setIsOrderModalOpen(false)}
          onSuccess={() => {
            setIsOrderModalOpen(false);
            setSelectedAutomation(null);
            // Redirect to portal or confirmation page
            window.location.href = '/portal/onboarding';
          }}
        />
      )}
    </div>
  );
}
