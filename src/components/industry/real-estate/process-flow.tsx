import React from "react";
import { Container } from '@/components/layout/container';
import { 
  UserGroupIcon,
  ChatBubbleLeftRightIcon,
  CalendarDaysIcon,
  DocumentTextIcon,
  CheckCircleIcon,
  HeartIcon
} from '@heroicons/react/24/outline';

interface Step {
  step: number;
  title: string;
  description: string;
  iconName: string;
}

interface ProcessFlowProps {
  steps: Step[];
}

const iconMap = {
  'capture': UserGroupIcon,
  'engage': ChatBubbleLeftRightIcon,
  'calendar': CalendarDaysIcon,
  'contract': DocumentTextIcon,
  'close': CheckCircleIcon,
  'referral': HeartIcon,
};

export function ProcessFlow({ steps }: ProcessFlowProps) {
  return (
    <section id="how-it-works" className="py-16 bg-white">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Your Real Estate Success Journey
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From first inquiry to closed deal and beyond — see how our platform guides every step.
          </p>
        </div>
        
        {/* Desktop Flow */}
        <div className="hidden lg:block">
          <div className="relative max-w-6xl mx-auto">
            {/* Connection Line */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-200 via-green-200 via-purple-200 via-orange-200 via-indigo-200 to-pink-200 transform -translate-y-1/2 -z-10"></div>
            
            <div className="grid grid-cols-6 gap-4">
              {steps.map((step, index) => {
                const IconComponent = iconMap[step.iconName as keyof typeof iconMap] || UserGroupIcon;
                
                return (
                  <div key={index} className="relative">
                    <div className="bg-white p-6 rounded-lg shadow-sm border-2 border-gray-100 hover:border-blue-300 transition-colors">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <IconComponent className="h-8 w-8 text-blue-600" />
                        </div>
                        <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 text-sm font-bold">
                          {step.step}
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {step.title}
                        </h3>
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        
        {/* Mobile/Tablet Flow */}
        <div className="lg:hidden">
          <div className="space-y-6 max-w-2xl mx-auto">
            {steps.map((step, index) => {
              const IconComponent = iconMap[step.iconName as keyof typeof iconMap] || UserGroupIcon;
              
              return (
                <div key={index} className="relative">
                  {/* Connection Line */}
                  {index < steps.length - 1 && (
                    <div className="absolute left-8 top-16 w-0.5 h-6 bg-gradient-to-b from-blue-200 to-green-200 -z-10"></div>
                  )}
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                        <IconComponent className="h-8 w-8 text-blue-600" />
                      </div>
                      <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mt-2 text-sm font-bold">
                        {step.step}
                      </div>
                    </div>
                    
                    <div className="ml-6 flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Process Summary */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-xl max-w-4xl mx-auto">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              The Complete Real Estate Cycle
            </h3>
            <p className="text-lg text-gray-600 mb-6">
              Our platform handles every stage of the real estate process, from initial lead capture 
              to post-close relationship nurturing. No step is left to chance.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <div className="text-left">
                <h4 className="font-semibold text-gray-900 mb-2">Front-End Automation:</h4>
                <ul className="space-y-1 text-gray-600">
                  <li>• Instant lead capture and response</li>
                  <li>• Automated scheduling and reminders</li>
                  <li>• Contract generation and e-signature</li>
                </ul>
              </div>
              <div className="text-left">
                <h4 className="font-semibold text-gray-900 mb-2">Back-End Intelligence:</h4>
                <ul className="space-y-1 text-gray-600">
                  <li>• Post-close nurture sequences</li>
                  <li>• Referral tracking and prompts</li>
                  <li>• Market update automation</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
