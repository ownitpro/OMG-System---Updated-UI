import type { Metadata } from "next";
import { LeadFlowStrategyForm } from "@/components/forms/LeadFlowStrategyForm";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.omgsystems.com"),
  title: "LeadFlow Strategy Call | OMGsystems",
  description: "Get a personalized LeadFlow strategy call to optimize your lead generation and conversion. Book your free consultation with our experts.",
  openGraph: {
    title: "LeadFlow Strategy Call | OMGsystems",
    description: "Get a personalized LeadFlow strategy call to optimize your lead generation and conversion. Book your free consultation with our experts.",
    url: "https://www.omgsystems.com/leadflow-strategy",
    images: [
      {
        url: "https://www.omgsystems.com/images/leadflow-strategy-og.jpg",
        width: 1200,
        height: 630,
        alt: "LeadFlow Strategy Call - OMGsystems",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LeadFlow Strategy Call | OMGsystems",
    description: "Get a personalized LeadFlow strategy call to optimize your lead generation and conversion. Book your free consultation with our experts.",
    images: ["https://www.omgsystems.com/images/leadflow-strategy-og.jpg"],
  },
};

export default function LeadFlowStrategyPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Get Your
              <br />
              <span className="text-blue-600">LeadFlow Strategy Call</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Book a free 30-minute strategy call with our LeadFlow experts. We'll analyze your current setup, 
              identify opportunities, and create a custom plan to maximize your lead generation and conversion.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Free 30-minute consultation
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Custom strategy plan
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                No obligation
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Book Your Strategy Call
              </h2>
              <p className="text-gray-600">
                Fill out the form below and we'll get back to you within 24 hours to schedule your call.
              </p>
            </div>
            
            <LeadFlowStrategyForm />
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What You'll Get From Your Strategy Call
            </h2>
            <p className="text-xl text-gray-600">
              Our experts will provide actionable insights tailored to your business
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Current Setup Analysis
              </h3>
              <p className="text-gray-600">
                We'll review your existing lead generation setup and identify strengths, weaknesses, and opportunities for improvement.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Custom Strategy Plan
              </h3>
              <p className="text-gray-600">
                Receive a personalized roadmap with specific recommendations for optimizing your lead flow and conversion rates.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                ROI Projections
              </h3>
              <p className="text-gray-600">
                Get realistic projections on how implementing our recommendations could impact your lead generation and revenue.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
