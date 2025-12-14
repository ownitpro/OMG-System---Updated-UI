import React from "react";
import { Metadata } from "next";
import { EyeIcon, ShieldCheckIcon, CogIcon, DocumentTextIcon } from "@heroicons/react/24/outline";

export const metadata: Metadata = {
  title: "Cookie Policy | OMGsystems",
  description: "Learn about how OMGsystems uses cookies and similar technologies to enhance your experience and provide personalized services.",
  keywords: "cookie policy, cookies, tracking, privacy, OMGsystems",
  openGraph: {
    title: "Cookie Policy | OMGsystems",
    description: "Learn about how we use cookies and similar technologies.",
    images: [
      {
        url: "/og/cookie-policy.png",
        width: 1200,
        height: 630,
        alt: "OMGsystems Cookie Policy"
      }
    ]
  },
  alternates: {
    canonical: "https://omgsystems.com/legal/cookies"
  }
};

const cookieCategories = [
  {
    name: "Essential Cookies",
    description: "These cookies are necessary for the website to function properly and cannot be disabled.",
    icon: ShieldCheckIcon,
    color: "bg-green-100 text-green-600",
    examples: [
      "Authentication and session management",
      "Security and fraud prevention",
      "Load balancing and performance",
      "Basic website functionality"
    ],
    retention: "Session or up to 30 days"
  },
  {
    name: "Analytics Cookies",
    description: "These cookies help us understand how visitors interact with our website.",
    icon: EyeIcon,
    color: "bg-blue-100 text-blue-600",
    examples: [
      "Page views and user behavior",
      "Traffic sources and referrals",
      "Performance metrics",
      "Error tracking and debugging"
    ],
    retention: "Up to 26 months",
    consent: true
  },
  {
    name: "Functional Cookies",
    description: "These cookies enable enhanced functionality and personalization.",
    icon: CogIcon,
    color: "bg-purple-100 text-purple-600",
    examples: [
      "User preferences and settings",
      "Language and region selection",
      "Form data and input assistance",
      "A/B testing and feature flags"
    ],
    retention: "Up to 12 months",
    consent: true
  },
  {
    name: "Marketing Cookies",
    description: "These cookies are used to deliver relevant advertisements and track campaign effectiveness.",
    icon: CogIcon,
    color: "bg-orange-100 text-orange-600",
    examples: [
      "Ad targeting and personalization",
      "Campaign performance tracking",
      "Social media integration",
      "Retargeting and remarketing"
    ],
    retention: "Up to 12 months",
    consent: true
  }
];

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <div className="text-center mb-12">
            <div className="h-16 w-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <DocumentTextIcon className="h-8 w-8 text-orange-600" />
            </div>
            <h1 className="text-4xl font-extrabold text-gray-900">
              Cookie Policy
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              Last updated: {new Date().toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">What Are Cookies?</h2>
              <p className="text-gray-700 mb-4">
                Cookies are small text files that are stored on your device when you visit our website. 
                They help us provide you with a better experience by remembering your preferences and 
                understanding how you use our site.
              </p>
              <p className="text-gray-700">
                We use both session cookies (which expire when you close your browser) and persistent 
                cookies (which remain on your device for a set period of time).
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Types of Cookies We Use</h2>
              
              <div className="space-y-6">
                {cookieCategories.map((category, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center mb-4">
                      <div className={`h-10 w-10 rounded-lg flex items-center justify-center mr-4 ${category.color}`}>
                        <category.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">{category.name}</h3>
                        <p className="text-gray-600">{category.description}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Examples:</h4>
                        <ul className="text-sm text-gray-700 space-y-1">
                          {category.examples.map((example, exampleIndex) => (
                            <li key={exampleIndex}>• {example}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Retention:</h4>
                        <p className="text-sm text-gray-700">{category.retention}</p>
                        {category.consent && (
                          <div className="mt-2">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              Requires Consent
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Third-Party Cookies</h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-700 mb-4">
                  We may also use third-party services that set their own cookies. These include:
                </p>
                <ul className="text-gray-700 space-y-2">
                  <li>• <strong>Google Analytics:</strong> Website analytics and performance monitoring</li>
                  <li>• <strong>Google Tag Manager:</strong> Tag management and tracking</li>
                  <li>• <strong>Stripe:</strong> Payment processing and fraud prevention</li>
                  <li>• <strong>Social Media Platforms:</strong> Social sharing and integration</li>
                </ul>
                <p className="text-gray-700 mt-4 text-sm">
                  These third parties have their own privacy policies and cookie practices. 
                  We recommend reviewing their policies for more information.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Managing Your Cookie Preferences</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Cookie Consent Banner</h3>
                  <p className="text-gray-700 text-sm mb-4">
                    When you first visit our website, you'll see a cookie consent banner. 
                    You can choose which categories of cookies to accept.
                  </p>
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    Update Cookie Preferences →
                  </button>
                </div>

                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Browser Settings</h3>
                  <p className="text-gray-700 text-sm mb-4">
                    You can also manage cookies through your browser settings. 
                    Most browsers allow you to block or delete cookies.
                  </p>
                  <div className="text-sm text-gray-600">
                    <p>• Chrome: Settings → Privacy and Security → Cookies</p>
                    <p>• Firefox: Options → Privacy & Security → Cookies</p>
                    <p>• Safari: Preferences → Privacy → Cookies</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Impact of Disabling Cookies</h2>
              <div className="bg-yellow-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">What happens if you disable cookies?</h3>
                <ul className="text-gray-700 space-y-2">
                  <li>• <strong>Essential cookies:</strong> Website may not function properly</li>
                  <li>• <strong>Analytics cookies:</strong> We won't be able to improve our website based on usage data</li>
                  <li>• <strong>Functional cookies:</strong> You'll need to re-enter preferences on each visit</li>
                  <li>• <strong>Marketing cookies:</strong> You may see less relevant advertisements</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Cookie Details</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Cookie Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Purpose
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Duration
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        next-auth.session-token
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        User authentication and session management
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        7 days
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Essential
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        _ga
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        Google Analytics - distinguishes users
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        2 years
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          Analytics
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        _gid
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        Google Analytics - distinguishes users
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        24 hours
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          Analytics
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        omg_consent
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        Stores your cookie consent preferences
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        1 year
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Essential
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        ab_test_header
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        A/B testing for header variations
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        30 days
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                          Functional
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Updates to This Policy</h2>
              <p className="text-gray-700">
                We may update this Cookie Policy from time to time to reflect changes in our practices 
                or for other operational, legal, or regulatory reasons. We will notify you of any 
                material changes by posting the updated policy on this page.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-700 mb-4">
                  If you have questions about our use of cookies, please contact us:
                </p>
                <div className="space-y-2 text-gray-700">
                  <p><strong>Privacy Team:</strong> privacy@omgsystems.com</p>
                  <p><strong>General Inquiries:</strong> <a href="/contact" className="text-blue-600 hover:text-blue-700">Contact Form</a></p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
