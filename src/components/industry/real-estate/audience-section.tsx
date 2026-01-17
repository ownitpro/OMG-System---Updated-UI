import React from "react";
import { Container } from '@/components/layout/container';
import { 
  UserIcon, 
  BuildingOfficeIcon, 
  HomeIcon, 
  UserGroupIcon,
  MapPinIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';

export function AudienceSection() {
  const audienceTypes = [
    {
      icon: UserIcon,
      title: "Solo Agents",
      description: "Individual realtors managing their own practice",
      color: "blue"
    },
    {
      icon: UserGroupIcon,
      title: "Teams & Brokerages",
      description: "Multi-agent operations needing collaboration",
      color: "green"
    },
    {
      icon: HomeIcon,
      title: "Residential Specialists",
      description: "Agents focused on home sales and purchases",
      color: "purple"
    },
    {
      icon: BuildingOfficeIcon,
      title: "Rental & Leasing",
      description: "Property managers and leasing specialists",
      color: "orange"
    },
    {
      icon: MapPinIcon,
      title: "Ontario & Canada",
      description: "Agents across Canadian markets",
      color: "indigo"
    },
    {
      icon: ChartBarIcon,
      title: "Growth-Focused",
      description: "Agents wanting to scale their business",
      color: "pink"
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: "bg-blue-100 text-blue-600",
      green: "bg-green-100 text-green-600", 
      purple: "bg-purple-100 text-purple-600",
      orange: "bg-orange-100 text-orange-600",
      indigo: "bg-indigo-100 text-indigo-600",
      pink: "bg-pink-100 text-pink-600"
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <section className="py-16 bg-gray-50">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Who We Serve
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Whether you're a solo realtor in Toronto or a multi-agent brokerage in Toronto, 
            our Real Estate Suite scales with you.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {audienceTypes.map((audience, index) => {
            const IconComponent = audience.icon;
            return (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${getColorClasses(audience.color)}`}>
                  <IconComponent className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {audience.title}
                </h3>
                <p className="text-gray-600">
                  {audience.description}
                </p>
              </div>
            );
          })}
        </div>
        
        {/* Additional Context */}
        <div className="mt-12 text-center">
          <div className="bg-white p-8 rounded-xl shadow-sm max-w-4xl mx-auto">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Built for Canadian Real Estate
            </h3>
            <p className="text-lg text-gray-600 mb-6">
              Our platform understands the unique needs of Canadian real estate professionals, 
              from MLS integration to provincial compliance requirements.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
              <div className="flex items-center justify-center">
                <MapPinIcon className="h-5 w-5 text-blue-600 mr-2" />
                <span className="text-gray-700">MLS Integration Ready</span>
              </div>
              <div className="flex items-center justify-center">
                <ChartBarIcon className="h-5 w-5 text-green-600 mr-2" />
                <span className="text-gray-700">Provincial Compliance</span>
              </div>
              <div className="flex items-center justify-center">
                <BuildingOfficeIcon className="h-5 w-5 text-purple-600 mr-2" />
                <span className="text-gray-700">Canadian Data Storage</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
