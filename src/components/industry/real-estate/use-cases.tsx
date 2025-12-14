import React from "react";
import { Container } from '@/components/layout/container';
import { 
  HomeIcon,
  BuildingOfficeIcon,
  UserGroupIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';

interface UseCase {
  title: string;
  points: string[];
}

interface UseCasesProps {
  useCases: UseCase[];
}

const iconMap = {
  'Residential Broker / Agent': HomeIcon,
  'Rental / Leasing Agent': BuildingOfficeIcon,
  'Small Brokerage Team': UserGroupIcon,
  'Hybrid Agent + Investor': ChartBarIcon,
};

const colorMap = {
  'Residential Broker / Agent': 'blue',
  'Rental / Leasing Agent': 'green',
  'Small Brokerage Team': 'purple',
  'Hybrid Agent + Investor': 'orange',
};

export function UseCases({ useCases }: UseCasesProps) {
  const getColorClasses = (color: string) => {
    const colors = {
      blue: "bg-blue-100 text-blue-600",
      green: "bg-green-100 text-green-600", 
      purple: "bg-purple-100 text-purple-600",
      orange: "bg-orange-100 text-orange-600"
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <section className="py-16 bg-white">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Perfect for Every Real Estate Professional
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Whether you're a solo agent or managing a team, our platform adapts to your specific needs and workflow.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {useCases.map((useCase, index) => {
            const IconComponent = iconMap[useCase.title as keyof typeof iconMap] || HomeIcon;
            const color = colorMap[useCase.title as keyof typeof colorMap] || 'blue';
            
            return (
              <div key={index} className="bg-gray-50 p-8 rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-start mb-6">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mr-6 flex-shrink-0 ${getColorClasses(color)}`}>
                    <IconComponent className="h-8 w-8" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                      {useCase.title}
                    </h3>
                  </div>
                </div>
                
                <ul className="space-y-3">
                  {useCase.points.map((point, pointIndex) => (
                    <li key={pointIndex} className="flex items-start">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-gray-700 leading-relaxed">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
        
        {/* Additional Use Case Details */}
        <div className="mt-12">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-xl max-w-6xl mx-auto">
            <h3 className="text-2xl font-semibold text-gray-900 text-center mb-8">
              Real-World Applications
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">For Individual Agents:</h4>
                <ul className="space-y-2 text-gray-600">
                  <li>• Manage 50+ active leads without losing track</li>
                  <li>• Automate follow-up sequences for different buyer types</li>
                  <li>• Generate and send contracts in minutes, not hours</li>
                  <li>• Stay top-of-mind with past clients for referrals</li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">For Brokerages & Teams:</h4>
                <ul className="space-y-2 text-gray-600">
                  <li>• Standardize processes across all agents</li>
                  <li>• Share templates and best practices</li>
                  <li>• Track team performance and conversion rates</li>
                  <li>• Scale operations without proportional admin overhead</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        {/* Industry-Specific Features */}
        <div className="mt-12 text-center">
          <div className="bg-white p-8 rounded-xl shadow-sm max-w-4xl mx-auto">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">
              Built for Canadian Real Estate
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <HomeIcon className="h-6 w-6 text-blue-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">MLS Integration</h4>
                <p className="text-sm text-gray-600">Connect with local MLS systems where permitted</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <BuildingOfficeIcon className="h-6 w-6 text-green-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Provincial Compliance</h4>
                <p className="text-sm text-gray-600">Templates and workflows for Canadian regulations</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <ChartBarIcon className="h-6 w-6 text-purple-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Local Market Data</h4>
                <p className="text-sm text-gray-600">Canadian market insights and reporting</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
