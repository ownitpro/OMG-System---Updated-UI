import React from "react";
import { Container } from '@/components/layout/container';
import { 
  MapPinIcon,
  PuzzlePieceIcon,
  SparklesIcon,
  UserGroupIcon,
  ShieldCheckIcon,
  ChartBarIcon,
  LinkIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

export function Differentiators() {
  const differentiators = [
    {
      icon: MapPinIcon,
      title: "Built for Canadian real estate workflows",
      description: "Understanding local MLS systems, provincial regulations, and Canadian market dynamics."
    },
    {
      icon: PuzzlePieceIcon,
      title: "Unified CRM + automation + marketing + docs",
      description: "Everything in one platform — no more juggling multiple tools and data silos."
    },
    {
      icon: SparklesIcon,
      title: "AI-assisted copy, drip sequences, listing templates",
      description: "Smart automation that learns from your best practices and scales your expertise."
    },
    {
      icon: UserGroupIcon,
      title: "Multi-agent & role-based access (for brokerages)",
      description: "Team collaboration with proper permissions and shared resources."
    },
    {
      icon: ShieldCheckIcon,
      title: "Usage metering & guardrails, no surprises",
      description: "Transparent pricing with clear usage limits and upgrade paths."
    },
    {
      icon: ChartBarIcon,
      title: "Secure document vault + encryption + audit logs",
      description: "Bank-level security for sensitive real estate documents and client data."
    },
    {
      icon: LinkIcon,
      title: "Integrations (MLS / listing feeds, calendar, website, email)",
      description: "Connect with your existing tools and workflows seamlessly."
    },
    {
      icon: CheckCircleIcon,
      title: "Proven ROI with measurable results",
      description: "Track performance improvements and demonstrate value to your business."
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose OMGsystems Real Estate Suite?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're not just another CRM. We're a complete real estate automation platform 
            built specifically for Canadian agents and brokerages.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {differentiators.map((item, index) => {
            const IconComponent = item.icon;
            
            return (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <IconComponent className="h-6 w-6 text-blue-600" />
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {item.title}
                </h3>
                
                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
        
        {/* Comparison Section */}
        <div className="mt-16">
          <div className="bg-white p-8 rounded-xl shadow-sm max-w-6xl mx-auto">
            <h3 className="text-2xl font-semibold text-gray-900 text-center mb-8">
              OMGsystems vs. Traditional Solutions
            </h3>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-4 px-4 font-semibold text-gray-900">Feature</th>
                    <th className="text-center py-4 px-4 font-semibold text-blue-600">OMGsystems</th>
                    <th className="text-center py-4 px-4 font-semibold text-gray-600">Traditional CRM</th>
                    <th className="text-center py-4 px-4 font-semibold text-gray-600">Generic Automation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="py-4 px-4 font-medium text-gray-900">Real Estate Specific</td>
                    <td className="py-4 px-4 text-center">
                      <CheckCircleIcon className="h-5 w-5 text-green-500 mx-auto" />
                    </td>
                    <td className="py-4 px-4 text-center">
                      <div className="h-5 w-5 bg-gray-300 rounded-full mx-auto"></div>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <div className="h-5 w-5 bg-gray-300 rounded-full mx-auto"></div>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4 font-medium text-gray-900">Canadian MLS Integration</td>
                    <td className="py-4 px-4 text-center">
                      <CheckCircleIcon className="h-5 w-5 text-green-500 mx-auto" />
                    </td>
                    <td className="py-4 px-4 text-center">
                      <div className="h-5 w-5 bg-gray-300 rounded-full mx-auto"></div>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <div className="h-5 w-5 bg-gray-300 rounded-full mx-auto"></div>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4 font-medium text-gray-900">Unified Platform</td>
                    <td className="py-4 px-4 text-center">
                      <CheckCircleIcon className="h-5 w-5 text-green-500 mx-auto" />
                    </td>
                    <td className="py-4 px-4 text-center">
                      <div className="h-5 w-5 bg-gray-300 rounded-full mx-auto"></div>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <div className="h-5 w-5 bg-gray-300 rounded-full mx-auto"></div>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4 font-medium text-gray-900">AI-Powered Automation</td>
                    <td className="py-4 px-4 text-center">
                      <CheckCircleIcon className="h-5 w-5 text-green-500 mx-auto" />
                    </td>
                    <td className="py-4 px-4 text-center">
                      <div className="h-5 w-5 bg-gray-300 rounded-full mx-auto"></div>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <CheckCircleIcon className="h-5 w-5 text-green-500 mx-auto" />
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4 font-medium text-gray-900">Canadian Data Storage</td>
                    <td className="py-4 px-4 text-center">
                      <CheckCircleIcon className="h-5 w-5 text-green-500 mx-auto" />
                    </td>
                    <td className="py-4 px-4 text-center">
                      <div className="h-5 w-5 bg-gray-300 rounded-full mx-auto"></div>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <div className="h-5 w-5 bg-gray-300 rounded-full mx-auto"></div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
        {/* Trust Indicators */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-8 rounded-xl max-w-4xl mx-auto">
            <h3 className="text-2xl font-semibold mb-4">
              Trusted by Canadian Real Estate Professionals
            </h3>
            <p className="text-blue-100 mb-6">
              Join hundreds of agents and brokerages across Ontario and Canada who have transformed 
              their business with our Real Estate Suite.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
              <div className="text-center">
                <div className="text-3xl font-bold mb-1">500+</div>
                <div className="text-blue-200">Active Agents</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-1">50+</div>
                <div className="text-blue-200">Brokerages</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-1">99.9%</div>
                <div className="text-blue-200">Uptime</div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
