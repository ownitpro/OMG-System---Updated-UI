import { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/common/section";
import { SmartAutomationsGrid } from "@/components/automations/SmartAutomationsGrid";
import { AutomationOrderModal } from "@/components/automations/AutomationOrderModal";

export const metadata: Metadata = {
  title: "Smart Automations | OMGsystems",
  description: "Pick from 13 workflow automations, pay setup + monthly, get live fast. Deploy AI-powered automations built for your business.",
  openGraph: {
    title: "Smart Automations | OMGsystems",
    description: "Deploy 13 AI / workflow automations built for your business. Choose the automation you need, pay setup + subscription, and get live in 1–3 weeks.",
    url: "https://omgsystems.com/smart-automations",
    images: [
      {
        url: "https://omgsystems.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Smart Automations by OMGsystems",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Smart Automations | OMGsystems",
    description: "Deploy 13 AI / workflow automations built for your business. Choose the automation you need, pay setup + subscription, and get live in 1–3 weeks.",
    images: ["https://omgsystems.com/twitter-image.jpg"],
  },
};

export default function SmartAutomationsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <Section className="bg-gradient-to-br from-purple-50 to-indigo-100">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Smart Automations
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8">
              Deploy 13 AI / workflow automations built for your business. Choose the automation you need, pay setup + subscription, and get live in 1–3 weeks.
            </p>
            
            {/* Trust Bar */}
            <div className="flex flex-wrap justify-center gap-6 mb-8 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span>Canadian data residency</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span>Enterprise security</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <span>Audit logs</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span>Role-based access</span>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
              <p className="text-gray-700 font-medium">
                Setup in 1-3 weeks • Monthly billing • Cancel anytime
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Automation Grid */}
      <SmartAutomationsGrid />

      {/* How It Works Section */}
      <Section className="bg-white">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              How It Works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-purple-600">1</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Pick Automation</h3>
                <p className="text-gray-600">
                  Choose from 13 pre-built automations designed for your industry
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-600">2</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Provide Info</h3>
                <p className="text-gray-600">
                  Share your requirements and custom needs for the automation
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-green-600">3</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">We Deliver</h3>
                <p className="text-gray-600">
                  We build, integrate, and test your automation in 1-3 weeks
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-orange-600">4</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Start Using</h3>
                <p className="text-gray-600">
                  Access your automation in your portal and start seeing results
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Pricing & Terms */}
      <Section className="bg-gray-50">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              Pricing & Terms
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">What's Included</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Full setup and configuration</li>
                  <li>• Integration with your existing tools</li>
                  <li>• Team training and documentation</li>
                  <li>• 30-day support and optimization</li>
                  <li>• Monthly usage monitoring</li>
                </ul>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Billing & Usage</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• One-time setup fee (paid upfront)</li>
                  <li>• Monthly subscription (billed automatically)</li>
                  <li>• Usage caps included in monthly price</li>
                  <li>• Overage charges apply if limits exceeded</li>
                  <li>• Cancel anytime with 30-day notice</li>
                </ul>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Support & Updates</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Email support during business hours</li>
                  <li>• Regular automation updates</li>
                  <li>• Performance monitoring and alerts</li>
                  <li>• Quarterly optimization reviews</li>
                  <li>• Priority support for enterprise plans</li>
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* FAQ Section */}
      <Section className="bg-white">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">What's included in the setup cost?</h3>
                <p className="text-gray-600">The setup cost covers full configuration, integration with your existing tools, team training, and 30 days of support. No hidden fees.</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">How are overages billed?</h3>
                <p className="text-gray-600">Each automation includes a monthly usage cap. If you exceed the cap, overage charges are billed at $0.10 per additional unit. We'll notify you before charges apply.</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">What's the return/cancel policy?</h3>
                <p className="text-gray-600">You can cancel your monthly subscription with 30 days notice. Setup costs are non-refundable as they cover completed work, but we offer a 30-day satisfaction guarantee.</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">How long does delivery take?</h3>
                <p className="text-gray-600">Most automations are delivered in 1-3 weeks depending on complexity. Simple automations (2 weeks) to complex ones (3-4 weeks). We'll provide a specific timeline during setup.</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Can I customize automations?</h3>
                <p className="text-gray-600">Yes! Each automation can be customized to your specific needs. We'll discuss your requirements during setup and adjust the automation accordingly.</p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section className="bg-gradient-to-r from-purple-600 to-indigo-600">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Automate Your Business?
            </h2>
            <p className="text-xl text-purple-100 mb-8">
              Choose your automation, get set up in weeks, and start seeing results immediately.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#automations"
                className="bg-white text-purple-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-50 transition-colors"
              >
                Browse Automations
              </a>
              <a
                href="/contact?type=automation"
                className="bg-transparent text-white px-8 py-4 rounded-lg font-semibold text-lg border-2 border-white hover:bg-white hover:text-purple-600 transition-colors"
              >
                Talk to Sales
              </a>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}