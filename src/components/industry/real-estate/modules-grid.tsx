import React from "react";
import { Container } from '@/components/layout/container';
import { 
  UserGroupIcon,
  CalendarDaysIcon,
  DocumentTextIcon,
  ChatBubbleLeftRightIcon,
  HeartIcon,
  ChartBarIcon,
  MegaphoneIcon,
  ChatBubbleOvalLeftIcon
} from '@heroicons/react/24/outline';

interface Module {
  name: string;
  bullets: string[];
  iconName: string;
}

interface ModulesGridProps {
  modules: Module[];
}

const iconMap = {
  'leads': UserGroupIcon,
  'schedule': CalendarDaysIcon,
  'docs': DocumentTextIcon,
  'messages': ChatBubbleLeftRightIcon,
  'nurture': HeartIcon,
  'analytics': ChartBarIcon,
  'marketing': MegaphoneIcon,
  'chatbot': ChatBubbleOvalLeftIcon,
};

const colorMap = {
  'leads': 'blue',
  'schedule': 'green',
  'docs': 'purple',
  'messages': 'orange',
  'nurture': 'pink',
  'analytics': 'indigo',
  'marketing': 'red',
  'chatbot': 'teal',
};

export function ModulesGrid({ modules }: ModulesGridProps) {
  const getColorClasses = (color: string) => {
    const colors = {
      blue: "bg-blue-100 text-blue-600",
      green: "bg-green-100 text-green-600", 
      purple: "bg-purple-100 text-purple-600",
      orange: "bg-orange-100 text-orange-600",
      pink: "bg-pink-100 text-pink-600",
      indigo: "bg-indigo-100 text-indigo-600",
      red: "bg-red-100 text-red-600",
      teal: "bg-teal-100 text-teal-600"
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <section id="modules" className="py-16 bg-gray-50">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What's Inside Real Estate Suite
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to run a modern, efficient real estate business — all in one integrated platform.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {modules.map((module, index) => {
            const IconComponent = iconMap[module.iconName as keyof typeof iconMap] || UserGroupIcon;
            const color = colorMap[module.iconName as keyof typeof colorMap] || 'blue';
            
            return (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${getColorClasses(color)}`}>
                  <IconComponent className="h-6 w-6" />
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {module.name}
                </h3>
                
                <ul className="space-y-2">
                  {module.bullets.map((bullet, bulletIndex) => (
                    <li key={bulletIndex} className="flex items-start text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
        
        {/* Integration Note */}
        <div className="mt-12 text-center">
          <div className="bg-white p-8 rounded-xl shadow-sm max-w-4xl mx-auto">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Seamlessly Integrated
            </h3>
            <p className="text-lg text-gray-600 mb-6">
              All modules work together as one cohesive system. Data flows automatically between 
              lead capture, scheduling, contracts, and follow-up — no manual data entry required.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
              <div className="flex items-center justify-center">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <UserGroupIcon className="h-4 w-4 text-blue-600" />
                </div>
                <span className="text-gray-700">Auto-capture leads</span>
              </div>
              <div className="flex items-center justify-center">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                  <CalendarDaysIcon className="h-4 w-4 text-green-600" />
                </div>
                <span className="text-gray-700">Schedule automatically</span>
              </div>
              <div className="flex items-center justify-center">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                  <DocumentTextIcon className="h-4 w-4 text-purple-600" />
                </div>
                <span className="text-gray-700">Generate contracts</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
