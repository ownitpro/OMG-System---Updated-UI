import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.omgsystems.com"),
  title: "Thank You | OMGsystems",
  description: "Thank you for your submission. We'll be in touch soon to help you get started with OMGsystems.",
  robots: {
    index: false,
    follow: false,
  },
};

interface ThankYouPageProps {
  searchParams: {
    type?: string;
  };
}

export default function ThankYouPage({ searchParams }: ThankYouPageProps) {
  const { type } = searchParams;

  const getContent = () => {
    switch (type) {
      case 'leadflow-strategy':
        return {
          title: "Strategy Call Request Received!",
          subtitle: "Thank you for requesting your LeadFlow strategy call",
          message: "Our team will review your request and contact you within 24 hours to schedule your personalized strategy call. We'll analyze your current setup and create a custom plan to maximize your lead generation.",
          nextSteps: [
            "Check your email for a confirmation message",
            "Our team will contact you within 24 hours",
            "We'll schedule your strategy call at a convenient time",
            "You'll receive a calendar invite with meeting details"
          ],
          ctaText: "Explore Our Solutions",
          ctaHref: "/",
          secondaryCtaText: "Try Demo",
          secondaryCtaHref: "/apps/demo/crm"
        };
      
      case 'analytics-report':
        return {
          title: "Analytics Report Request Received!",
          subtitle: "Thank you for requesting your custom analytics report",
          message: "Our analytics team will prepare your personalized report within 48 hours. We'll analyze your industry benchmarks and provide actionable insights tailored to your business needs.",
          nextSteps: [
            "Check your email for a confirmation message",
            "Our team will prepare your report within 48 hours",
            "You'll receive your custom analytics report via email",
            "A follow-up call will be scheduled to discuss findings"
          ],
          ctaText: "View Analytics Demo",
          ctaHref: "/analytics-demo",
          secondaryCtaText: "Explore Automations",
          secondaryCtaHref: "/smart-automations"
        };
      
      case 'workflow-builder':
        return {
          title: "Workflow Order Received!",
          subtitle: "Thank you for your workflow builder order",
          message: "Our development team will review your custom workflow and contact you within 24 hours to schedule your kickoff call. We'll build, test, and deploy your workflow according to your specifications.",
          nextSteps: [
            "Check your email for order confirmation",
            "Our team will review your workflow within 24 hours",
            "We'll contact you to schedule your kickoff call",
            "Payment processing will be set up for your order"
          ],
          ctaText: "Build Another Workflow",
          ctaHref: "/workflow-builder",
          secondaryCtaText: "View Smart Automations",
          secondaryCtaHref: "/smart-automations"
        };
      
      case 'smart-automation':
        return {
          title: "Automation Order Received!",
          subtitle: "Thank you for your smart automation order",
          message: "Our automation team will review your order and contact you within 24 hours to schedule your kickoff call. We'll configure, test, and deploy your automation according to your business needs.",
          nextSteps: [
            "Check your email for order confirmation",
            "Our team will review your automation within 24 hours",
            "We'll contact you to schedule your kickoff call",
            "Payment processing will be set up for your order"
          ],
          ctaText: "Browse More Automations",
          ctaHref: "/smart-automations",
          secondaryCtaText: "Build Custom Workflow",
          secondaryCtaHref: "/workflow-builder"
        };
      
      default:
        return {
          title: "Thank You!",
          subtitle: "Your submission has been received",
          message: "Thank you for your interest in OMGsystems. Our team will review your submission and get back to you soon.",
          nextSteps: [
            "Check your email for a confirmation message",
            "Our team will review your submission",
            "We'll contact you with next steps",
            "You'll receive relevant information about our solutions"
          ],
          ctaText: "Explore Our Solutions",
          ctaHref: "/",
          secondaryCtaText: "Try Demo",
          secondaryCtaHref: "/apps/demo/crm"
        };
    }
  };

  const content = getContent();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center">
          {/* Success Icon */}
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {content.title}
          </h1>

          {/* Subtitle */}
          <p className="text-xl text-gray-600 mb-6">
            {content.subtitle}
          </p>

          {/* Message */}
          <p className="text-gray-700 mb-8 leading-relaxed">
            {content.message}
          </p>

          {/* Next Steps */}
          <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">What happens next?</h3>
            <ul className="space-y-3">
              {content.nextSteps.map((step, index) => (
                <li key={index} className="flex items-start">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <span className="text-blue-600 text-sm font-semibold">{index + 1}</span>
                  </div>
                  <span className="text-gray-700">{step}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={content.ctaHref}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              {content.ctaText}
            </Link>
            <Link
              href={content.secondaryCtaHref}
              className="border border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              {content.secondaryCtaText}
            </Link>
          </div>

          {/* Contact Info */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600 mb-2">
              Need immediate assistance?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center text-sm">
              <a
                href="mailto:support@omgsystems.com"
                className="text-blue-600 hover:text-blue-700 transition-colors"
              >
                support@omgsystems.com
              </a>
              <span className="hidden sm:block text-gray-400">•</span>
              <a
                href="tel:+1-555-0123"
                className="text-blue-600 hover:text-blue-700 transition-colors"
              >
                +1 (555) 012-3456
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}