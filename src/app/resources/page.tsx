import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { MagnifyingGlassIcon, ArrowRightIcon, DocumentTextIcon, CodeBracketIcon, CogIcon, QuestionMarkCircleIcon } from "@heroicons/react/24/outline";

export const metadata: Metadata = {
  title: "Resources & Documentation | OMGsystems",
  description: "Everything you need to integrate, automate, and scale with OMGsystems. Find guides, API docs, workflows, and industry-specific resources.",
  openGraph: {
    title: "Resources & Documentation | OMGsystems",
    description: "Everything you need to integrate, automate, and scale with OMGsystems. Find guides, API docs, workflows, and industry-specific resources.",
    type: "website",
  },
};

const resourceCategories = [
  {
    icon: <DocumentTextIcon className="w-8 h-8" />,
    title: "Getting Started",
    description: "Onboarding guides, setup tutorials, and first steps with OMGsystems.",
    articles: 12,
    link: "/resources/getting-started"
  },
  {
    icon: <CodeBracketIcon className="w-8 h-8" />,
    title: "API & Integrations",
    description: "Technical documentation, API references, and integration guides.",
    articles: 8,
    link: "/resources/api"
  },
  {
    icon: <CogIcon className="w-8 h-8" />,
    title: "Workflows & Automations",
    description: "Build and optimize your business processes with our automation tools.",
    articles: 15,
    link: "/resources/workflows"
  },
  {
    icon: <DocumentTextIcon className="w-8 h-8" />,
    title: "Industry-Specific Guides",
    description: "Tailored resources for Property Management, Real Estate, Healthcare, and more.",
    articles: 20,
    link: "/resources/industries"
  },
  {
    icon: <QuestionMarkCircleIcon className="w-8 h-8" />,
    title: "FAQs",
    description: "Common questions, troubleshooting, and quick answers.",
    articles: 25,
    link: "/resources/faq"
  }
];

const featuredArticles = [
  {
    title: "Intro to SecureVault Docs – Your Compliance Checklist",
    description: "Learn how to set up document security, automate filing, and maintain compliance with Canadian privacy laws.",
    category: "Getting Started",
    readTime: "8 min read",
    link: "/resources/securevault-intro"
  },
  {
    title: "Building Your First Workflow in 15 Minutes",
    description: "Step-by-step guide to creating automated workflows that save time and reduce errors.",
    category: "Workflows",
    readTime: "12 min read",
    link: "/resources/first-workflow"
  },
  {
    title: "API Integration Best Practices",
    description: "Connect OMGsystems with your existing tools using our robust API endpoints.",
    category: "API & Integrations",
    readTime: "15 min read",
    link: "/resources/api-best-practices"
  }
];

const recentArticles = [
  {
    title: "Property Management Automation: Tenant Communication Workflows",
    description: "Streamline tenant communications with automated workflows for maintenance requests, rent reminders, and lease renewals.",
    category: "Property Management",
    date: "2025-01-15",
    readTime: "10 min read"
  },
  {
    title: "Healthcare Compliance: PHIPA-Compliant Document Management",
    description: "Ensure your healthcare practice meets PHIPA requirements with automated document handling and audit trails.",
    category: "Healthcare",
    date: "2025-01-12",
    readTime: "12 min read"
  },
  {
    title: "Real Estate CRM Integration: Lead Management Automation",
    description: "Connect your real estate CRM with OMGsystems for seamless lead tracking and follow-up automation.",
    category: "Real Estate",
    date: "2025-01-10",
    readTime: "8 min read"
  },
  {
    title: "Contractor Field Service: Mobile App Integration",
    description: "Enable your field teams with mobile apps that sync with your office systems in real-time.",
    category: "Contractors",
    date: "2025-01-08",
    readTime: "14 min read"
  },
  {
    title: "Accounting Firm Automation: Client Onboarding Workflows",
    description: "Automate client intake, document collection, and initial setup processes for accounting firms.",
    category: "Accounting",
    date: "2025-01-05",
    readTime: "11 min read"
  },
  {
    title: "Cleaning Service Optimization: Route Planning & Scheduling",
    description: "Optimize your cleaning routes and automate scheduling with intelligent workflow automation.",
    category: "Cleaning",
    date: "2025-01-03",
    readTime: "9 min read"
  }
];

export default function ResourcesPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 to-indigo-100 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Resources & Documentation
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed max-w-4xl mx-auto">
              Everything you need to integrate, automate, and scale with OMGsystems.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search docs..."
                  className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Resource Categories */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Browse by Category
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Find the resources you need organized by topic and complexity level.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {resourceCategories.map((category, index) => (
              <Link
                key={index}
                href={category.link}
                className="group block bg-white border border-gray-200 rounded-xl p-6 hover:border-blue-300 hover:shadow-lg transition-all duration-200"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors duration-200">
                      {category.icon}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200 mb-2">
                      {category.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3">
                      {category.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">
                        {category.articles} articles
                      </span>
                      <ArrowRightIcon className="w-4 h-4 text-blue-600 group-hover:translate-x-1 transition-transform duration-200" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Article */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Guide
            </h2>
            <p className="text-xl text-gray-600">
              Start with our most popular resource
            </p>
          </div>

          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-white">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center justify-between mb-4">
                <span className="text-blue-100 text-sm font-medium">
                  {featuredArticles[0].category}
                </span>
                <span className="text-blue-100 text-sm">
                  {featuredArticles[0].readTime}
                </span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                {featuredArticles[0].title}
              </h3>
              <p className="text-blue-100 text-lg mb-6">
                {featuredArticles[0].description}
              </p>
              <Link
                href={featuredArticles[0].link}
                className="inline-flex items-center px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
              >
                Read Guide
                <ArrowRightIcon className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Articles */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Recent Articles
            </h2>
            <p className="text-xl text-gray-600">
              Latest guides, tutorials, and best practices
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentArticles.map((article, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 hover:border-blue-300 hover:shadow-lg transition-all duration-200">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
                    {article.category}
                  </span>
                  <span className="text-sm text-gray-500">
                    {article.readTime}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {article.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {article.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    {new Date(article.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </span>
                  <Link
                    href="#"
                    className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                  >
                    Read More →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Need Help?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Can't find what you're looking for? Our team is here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              Contact Documentation Team
              <ArrowRightIcon className="ml-2 h-5 w-5" />
            </Link>
            <Link
              href="/community"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-50 transition-colors border border-blue-600"
            >
              Join Community
            </Link>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Explore our resources and start building your automated workflows today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/apps/demo"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              Try Live Demo
              <ArrowRightIcon className="ml-2 h-5 w-5" />
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center px-8 py-4 bg-transparent text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors border border-white"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}