import React from "react";
import { Metadata } from "next";
import { 
  ShieldCheckIcon, 
  LockClosedIcon, 
  EyeIcon, 
  DocumentTextIcon,
  ClockIcon,
  UserGroupIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon
} from "@heroicons/react/24/outline";

export const metadata: Metadata = {
  title: "Trust & Security | OMGsystems",
  description: "Learn about OMGsystems' commitment to data security, privacy, and compliance. Our security-first approach protects your business data.",
  keywords: "security, privacy, compliance, data protection, encryption, OMGsystems",
  openGraph: {
    title: "Trust & Security | OMGsystems",
    description: "Learn about OMGsystems' commitment to data security, privacy, and compliance.",
    images: [
      {
        url: "/og/trust-security.png",
        width: 1200,
        height: 630,
        alt: "OMGsystems Trust & Security"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Trust & Security | OMGsystems",
    description: "Learn about OMGsystems' commitment to data security, privacy, and compliance.",
    images: ["/og/trust-security.png"]
  },
  alternates: {
    canonical: "https://omgsystems.com/trust"
  }
};

const securityFeatures = [
  {
    icon: ShieldCheckIcon,
    title: "Data Residency",
    description: "All data storage and processing occurs within Canada, ensuring compliance with Canadian privacy laws and regulations.",
    details: [
      "Primary data center located in Canada",
      "Backup systems within Canadian borders",
      "No data transfer outside Canada without explicit consent"
    ]
  },
  {
    icon: LockClosedIcon,
    title: "Encryption",
    description: "End-to-end encryption protects your data both in transit and at rest, using industry-standard AES-256 encryption.",
    details: [
      "AES-256 encryption for data at rest",
      "TLS 1.3 for data in transit",
      "Encrypted database backups",
      "Secure key management and rotation"
    ]
  },
  {
    icon: EyeIcon,
    title: "Access Control",
    description: "Role-based access control ensures only authorized personnel can access sensitive data, with comprehensive audit logging.",
    details: [
      "Multi-factor authentication required",
      "Role-based permissions system",
      "Session management and timeout",
      "Comprehensive audit trails"
    ]
  },
  {
    icon: DocumentTextIcon,
    title: "Document Security",
    description: "Short-lived signed links for shared documents with configurable expiration and access controls.",
    details: [
      "Time-limited access links",
      "Configurable expiration periods",
      "Access attempt logging",
      "Immediate revocation capability"
    ]
  },
  {
    icon: UserGroupIcon,
    title: "Support Privacy",
    description: "Support-blind by default with break-glass dual-approval flow for sensitive data access.",
    details: [
      "Support team cannot access customer data by default",
      "Dual-approval required for data access",
      "All access attempts logged and monitored",
      "Customer notification for data access"
    ]
  },
  {
    icon: ClockIcon,
    title: "Data Retention",
    description: "Automated data retention policies with configurable purge windows and immutable locked packets option.",
    details: [
      "Automated retention policy enforcement",
      "Configurable purge windows per data type",
      "Immutable locked packets for critical data",
      "Regular retention compliance reports"
    ]
  }
];

const complianceFeatures = [
  {
    title: "Privacy by Design",
    description: "Privacy considerations are built into every aspect of our platform from the ground up."
  },
  {
    title: "Regular Security Audits",
    description: "Third-party security audits conducted quarterly to ensure ongoing compliance and security."
  },
  {
    title: "Incident Response",
    description: "Comprehensive incident response procedures with 24/7 monitoring and rapid response capabilities."
  },
  {
    title: "Staff Training",
    description: "Regular security awareness training for all staff members with annual certification requirements."
  }
];

export default function TrustPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              Trust & Security
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Your data security and privacy are our top priorities. Learn about our comprehensive 
              security measures and commitment to protecting your business information.
            </p>
          </div>
        </div>
      </div>

      {/* Security Features */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Security-First Architecture
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Every aspect of our platform is designed with security and privacy in mind.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {securityFeatures.map((feature, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-8">
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0">
                  <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <feature.icon className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {feature.title}
                  </h3>
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                {feature.description}
              </p>
              <ul className="space-y-2">
                {feature.details.map((detail, detailIndex) => (
                  <li key={detailIndex} className="flex items-start">
                    <CheckCircleIcon className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Compliance Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Compliance & Standards
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              We adhere to industry best practices and regulatory requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {complianceFeatures.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShieldCheckIcon className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Incident Response */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex items-center mb-6">
            <div className="h-12 w-12 bg-yellow-100 rounded-lg flex items-center justify-center mr-4">
              <ExclamationTriangleIcon className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Incident Response
              </h2>
              <p className="text-gray-600">
                Our commitment to transparency and rapid response
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Response Timeline
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <ClockIcon className="h-4 w-4 text-blue-500 mr-2" />
                  <span>Detection: Within 15 minutes</span>
                </li>
                <li className="flex items-center">
                  <ClockIcon className="h-4 w-4 text-blue-500 mr-2" />
                  <span>Assessment: Within 1 hour</span>
                </li>
                <li className="flex items-center">
                  <ClockIcon className="h-4 w-4 text-blue-500 mr-2" />
                  <span>Notification: Within 4 hours</span>
                </li>
                <li className="flex items-center">
                  <ClockIcon className="h-4 w-4 text-blue-500 mr-2" />
                  <span>Resolution: Within 24 hours</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Contact Information
              </h3>
              <div className="space-y-2 text-sm text-gray-600">
                <p>
                  <strong>Security Team:</strong><br />
                  security@omgsystems.com
                </p>
                <p>
                  <strong>Data Protection Officer:</strong><br />
                  dpo@omgsystems.com
                </p>
                <p>
                  <strong>Incident Response:</strong><br />
                  incidents@omgsystems.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Data Rights */}
      <div className="bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Your Data Rights
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              You have full control over your data and how it's used.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="bg-white rounded-lg p-6 text-center">
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <EyeIcon className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Right to Access
              </h3>
              <p className="text-gray-600 text-sm">
                Request a copy of all data we have about you and your organization.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 text-center">
              <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <DocumentTextIcon className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Right to Rectification
              </h3>
              <p className="text-gray-600 text-sm">
                Correct any inaccurate or incomplete data in your account.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 text-center">
              <div className="h-12 w-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <LockClosedIcon className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Right to Erasure
              </h3>
              <p className="text-gray-600 text-sm">
                Request deletion of your data, subject to legal and contractual obligations.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-white">
              Questions About Security?
            </h2>
            <p className="mt-4 text-xl text-blue-100">
              Our security team is here to answer any questions you may have.
            </p>
            <div className="mt-8">
              <a
                href="/contact"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
              >
                Contact Security Team
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}