import React from "react";
import { Metadata } from "next";
import { ShieldCheckIcon, EyeIcon, LockClosedIcon, UserGroupIcon } from "@heroicons/react/24/outline";

export const metadata: Metadata = {
  title: "Privacy Policy | OMGsystems",
  description: "OMGsystems Privacy Policy - Learn how we collect, use, and protect your personal information in compliance with Canadian privacy laws.",
  keywords: "privacy policy, data protection, personal information, OMGsystems",
  openGraph: {
    title: "Privacy Policy | OMGsystems",
    description: "Learn how we collect, use, and protect your personal information.",
    images: [
      {
        url: "/og/privacy-policy.png",
        width: 1200,
        height: 630,
        alt: "OMGsystems Privacy Policy"
      }
    ]
  },
  alternates: {
    canonical: "https://omgsystems.com/legal/privacy"
  }
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <div className="text-center mb-12">
            <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShieldCheckIcon className="h-8 w-8 text-blue-600" />
            </div>
            <h1 className="text-4xl font-extrabold text-gray-900">
              Privacy Policy
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              Last updated: {new Date().toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Introduction</h2>
              <p className="text-gray-700 mb-4">
                OMGsystems ("we," "our," or "us") is committed to protecting your privacy and personal information. 
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you 
                use our website and services.
              </p>
              <p className="text-gray-700">
                This policy complies with Canadian privacy laws, including the Personal Information Protection and 
                Electronic Documents Act (PIPEDA) and applicable provincial privacy legislation.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Information We Collect</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="flex items-center mb-3">
                    <UserGroupIcon className="h-6 w-6 text-blue-600 mr-2" />
                    <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
                  </div>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Name and contact information</li>
                    <li>• Email address and phone number</li>
                    <li>• Company information</li>
                    <li>• Billing and payment information</li>
                    <li>• Account credentials</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="flex items-center mb-3">
                    <EyeIcon className="h-6 w-6 text-green-600 mr-2" />
                    <h3 className="text-lg font-semibold text-gray-900">Usage Information</h3>
                  </div>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Website usage and analytics</li>
                    <li>• Device and browser information</li>
                    <li>• IP address (anonymized)</li>
                    <li>• Cookies and similar technologies</li>
                    <li>• Support interactions</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">How We Use Your Information</h2>
              <div className="bg-blue-50 p-6 rounded-lg mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Primary Purposes</h3>
                <ul className="text-gray-700 space-y-2">
                  <li>• Provide and maintain our services</li>
                  <li>• Process transactions and manage accounts</li>
                  <li>• Communicate with you about our services</li>
                  <li>• Provide customer support</li>
                  <li>• Improve our website and services</li>
                </ul>
              </div>
              
              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Secondary Purposes</h3>
                <ul className="text-gray-700 space-y-2">
                  <li>• Marketing communications (with consent)</li>
                  <li>• Analytics and performance monitoring</li>
                  <li>• Legal compliance and fraud prevention</li>
                  <li>• Business development and research</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Information Sharing and Disclosure</h2>
              <div className="bg-yellow-50 p-6 rounded-lg mb-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">We do not sell your personal information</h3>
                <p className="text-gray-700">
                  We may share your information only in the following limited circumstances:
                </p>
              </div>
              
              <ul className="text-gray-700 space-y-3">
                <li className="flex items-start">
                  <LockClosedIcon className="h-5 w-5 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
                  <span><strong>Service Providers:</strong> Trusted third parties who assist in providing our services under strict confidentiality agreements.</span>
                </li>
                <li className="flex items-start">
                  <LockClosedIcon className="h-5 w-5 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
                  <span><strong>Legal Requirements:</strong> When required by law, court order, or to protect our rights and safety.</span>
                </li>
                <li className="flex items-start">
                  <LockClosedIcon className="h-5 w-5 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
                  <span><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets.</span>
                </li>
                <li className="flex items-start">
                  <LockClosedIcon className="h-5 w-5 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
                  <span><strong>Consent:</strong> When you have given explicit consent for specific sharing.</span>
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Security</h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-700 mb-4">
                  We implement comprehensive security measures to protect your personal information:
                </p>
                <ul className="text-gray-700 space-y-2">
                  <li>• AES-256 encryption for data at rest</li>
                  <li>• TLS 1.3 encryption for data in transit</li>
                  <li>• Regular security audits and assessments</li>
                  <li>• Access controls and authentication</li>
                  <li>• Employee training on data protection</li>
                  <li>• Incident response procedures</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Rights and Choices</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Access and Correction</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    You have the right to access and correct your personal information.
                  </p>
                  <a href="/contact" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    Request access or correction →
                  </a>
                </div>

                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Withdrawal of Consent</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    You can withdraw consent for marketing communications at any time.
                  </p>
                  <a href="/contact" className="text-green-600 hover:text-green-700 text-sm font-medium">
                    Withdraw consent →
                  </a>
                </div>

                <div className="bg-yellow-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Data Portability</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    Request a copy of your data in a portable format.
                  </p>
                  <a href="/contact" className="text-yellow-600 hover:text-yellow-700 text-sm font-medium">
                    Request data export →
                  </a>
                </div>

                <div className="bg-red-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Data Deletion</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    Request deletion of your personal information, subject to legal obligations.
                  </p>
                  <a href="/contact" className="text-red-600 hover:text-red-700 text-sm font-medium">
                    Request deletion →
                  </a>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Retention</h2>
              <p className="text-gray-700 mb-4">
                We retain your personal information only as long as necessary to fulfill the purposes outlined in this policy, 
                unless a longer retention period is required by law. Our data retention schedule includes:
              </p>
              <ul className="text-gray-700 space-y-2">
                <li>• Account information: Until account closure + 7 years</li>
                <li>• Transaction records: 7 years for tax and legal compliance</li>
                <li>• Support interactions: 3 years</li>
                <li>• Marketing data: Until consent is withdrawn</li>
                <li>• Analytics data: 26 months (anonymized)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Cookies and Tracking</h2>
              <p className="text-gray-700 mb-4">
                We use cookies and similar technologies to enhance your experience. You can control cookie preferences 
                through your browser settings or our cookie consent banner.
              </p>
              <a href="/legal/cookies" className="text-blue-600 hover:text-blue-700 font-medium">
                Learn more about our cookie policy →
              </a>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">International Transfers</h2>
              <p className="text-gray-700">
                All data processing and storage occurs within Canada. We do not transfer personal information outside 
                of Canada without your explicit consent and appropriate safeguards.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Children's Privacy</h2>
              <p className="text-gray-700">
                Our services are not intended for children under 13 years of age. We do not knowingly collect 
                personal information from children under 13.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to This Policy</h2>
              <p className="text-gray-700">
                We may update this Privacy Policy from time to time. We will notify you of any material changes 
                by posting the new policy on this page and updating the "Last updated" date.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Information</h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-700 mb-4">
                  If you have questions about this Privacy Policy or our data practices, please contact us:
                </p>
                <div className="space-y-2 text-gray-700">
                  <p><strong>Data Protection Officer:</strong> dpo@omgsystems.com</p>
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
