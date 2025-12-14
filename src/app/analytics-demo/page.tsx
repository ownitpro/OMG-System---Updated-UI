import type { Metadata } from "next";
import { AnalyticsDemoForm } from "@/components/forms/AnalyticsDemoForm";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.omgsystems.com"),
  title: "Analytics & Reporting Demo | OMGsystems",
  description: "See how our analytics and reporting tools can transform your business insights. Get a custom analytics report tailored to your industry.",
  openGraph: {
    title: "Analytics & Reporting Demo | OMGsystems",
    description: "See how our analytics and reporting tools can transform your business insights. Get a custom analytics report tailored to your industry.",
    url: "https://www.omgsystems.com/analytics-demo",
    images: [
      {
        url: "https://www.omgsystems.com/images/analytics-demo-og.jpg",
        width: 1200,
        height: 630,
        alt: "Analytics & Reporting Demo - OMGsystems",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Analytics & Reporting Demo | OMGsystems",
    description: "See how our analytics and reporting tools can transform your business insights. Get a custom analytics report tailored to your industry.",
    images: ["https://www.omgsystems.com/images/analytics-demo-og.jpg"],
  },
};

export default function AnalyticsDemoPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-50 to-indigo-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Analytics &
              <br />
              <span className="text-purple-600">Reporting Demo</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              See how our analytics and reporting tools can transform your business insights. 
              Get industry benchmarks, performance metrics, and actionable recommendations.
            </p>
          </div>
        </div>
      </section>

      {/* Key Metrics Cards */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Real Results from Our Clients
            </h2>
            <p className="text-xl text-gray-600">
              See the impact our analytics solutions have delivered
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">57% Faster</h3>
              <p className="text-gray-600">Tickets Resolved</p>
              <div className="mt-4 text-sm text-gray-500">
                <span className="text-red-600">7 days</span> → <span className="text-green-600">3 days</span>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">100% Automated</h3>
              <p className="text-gray-600">Owner Statements</p>
              <div className="mt-4 text-sm text-gray-500">
                <span className="text-red-600">14 days</span> → <span className="text-green-600">0 days</span>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">12h Saved</h3>
              <p className="text-gray-600">Admin Time Weekly</p>
              <div className="mt-4 text-sm text-gray-500">
                <span className="text-red-600">68%</span> → <span className="text-green-600">96%</span> efficiency
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industry Dashboard Previews */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Industry-Specific Analytics
            </h2>
            <p className="text-xl text-gray-600">
              Tailored dashboards for your industry with relevant benchmarks
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Property Management */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Property Management</h3>
                <p className="text-gray-600 mb-4">Owner Reports, Ticket Times, Revenue Trends</p>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Avg. Response Time</span>
                    <span className="text-sm font-semibold text-green-600">2.3 days</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Owner Satisfaction</span>
                    <span className="text-sm font-semibold text-green-600">94%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Revenue Growth</span>
                    <span className="text-sm font-semibold text-green-600">+23%</span>
                  </div>
                </div>
                
                <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                  See Property Analytics
                </button>
              </div>
            </div>
            
            {/* Contractors */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Contractors</h3>
                <p className="text-gray-600 mb-4">Project Tracking, Lead Conversion, Profit Margins</p>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Lead Conversion</span>
                    <span className="text-sm font-semibold text-green-600">67%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Project Completion</span>
                    <span className="text-sm font-semibold text-green-600">98%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Profit Margin</span>
                    <span className="text-sm font-semibold text-green-600">+15%</span>
                  </div>
                </div>
                
                <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                  See Contractor Analytics
                </button>
              </div>
            </div>
            
            {/* Real Estate */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Real Estate</h3>
                <p className="text-gray-600 mb-4">Lead Sources, Conversion Rates, Market Trends</p>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Lead Quality Score</span>
                    <span className="text-sm font-semibold text-green-600">8.7/10</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Close Rate</span>
                    <span className="text-sm font-semibold text-green-600">34%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Avg. Deal Size</span>
                    <span className="text-sm font-semibold text-green-600">+28%</span>
                  </div>
                </div>
                
                <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                  See Real Estate Analytics
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Custom Report Request Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Schedule Your Custom Analytics Report
            </h2>
            <p className="text-xl text-gray-600">
              Get a personalized analytics report tailored to your business needs and industry benchmarks
            </p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
            <AnalyticsDemoForm />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What's Included in Your Analytics Report
            </h2>
            <p className="text-xl text-gray-600">
              Comprehensive insights to drive your business forward
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Performance Metrics</h3>
              <p className="text-gray-600 text-sm">Key performance indicators and benchmarks for your industry</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Trend Analysis</h3>
              <p className="text-gray-600 text-sm">Historical data analysis and future projections</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Actionable Insights</h3>
              <p className="text-gray-600 text-sm">Specific recommendations to improve your business</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Custom Dashboards</h3>
              <p className="text-gray-600 text-sm">Personalized dashboards for your specific needs</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
