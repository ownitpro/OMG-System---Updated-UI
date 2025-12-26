"use client";

import { useState, useEffect, Suspense, ChangeEvent, FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { 
  CheckCircleIcon,
  SparklesIcon,
  RocketLaunchIcon,
  ArrowRightIcon,
  UserIcon,
  BuildingOfficeIcon,
  EnvelopeIcon,
  PhoneIcon,
  LightBulbIcon,
  CogIcon,
  BoltIcon,
  StarIcon
} from '@heroicons/react/24/outline';

function CustomAppRequestPageContent() {
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    businessName: '',
    industry: '',
    description: '',
    additionalNotes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedComponents, setSelectedComponents] = useState<string[]>([]);

  useEffect(() => {
    const components = searchParams.get('components');
    // fromScratch param is available if needed for future use
    // const fromScratch = searchParams.get('fromScratch');

    if (components) {
      setSelectedComponents(components.split(','));
    }
  }, [searchParams]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Here you would typically send the data to your backend
    console.log('Form submitted:', { ...formData, selectedComponents });

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const componentDescriptions: Record<string, string> = {
    'dashboard': 'Dashboard',
    'forms': 'Data Entry Forms',
    'reports': 'Reporting System',
    'notifications': 'Notification System',
    'user-management': 'User Management',
    'integrations': 'Third-party Integrations',
    'automation': 'Workflow Automation',
    'mobile': 'Mobile Access',
    'database': 'Database Setup',
    'crm-integration': 'CRM Integration',
    'accounting': 'Accounting Software',
    'communication': 'Communication Tools',
    'api-connections': 'API Connections',
    'workflows': 'Workflow Automation',
    'triggers': 'Event Triggers',
    'scheduling': 'Scheduling System',
    'data-processing': 'Data Processing',
    'ai-features': 'AI Features',
    'analytics': 'Advanced Analytics',
    'security': 'Security & Compliance',
    'permissions': 'Role-based Access',
    'custom-features': 'Custom Features',
    'user-portal': 'User Portal',
    'mobile-ui': 'Mobile Interface'
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 max-w-2xl w-full border border-white/20 text-center">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircleIcon className="w-8 h-8 text-white" />
          </div>
          
          <h2 className="text-3xl font-bold text-white mb-4">
            Request Received!
          </h2>
          
          <p className="text-xl text-blue-200 mb-6">
            Thank you for your custom app request. Our team will contact you within 48 hours to discuss your project and next steps.
          </p>
          
          <div className="bg-white/10 rounded-lg p-6 mb-8">
            <h3 className="text-white font-semibold mb-4">What happens next?</h3>
            <div className="space-y-3 text-left">
              <div className="flex items-center text-white/80">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mr-3 text-sm font-bold">1</div>
                <span>Our team reviews your requirements</span>
              </div>
              <div className="flex items-center text-white/80">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mr-3 text-sm font-bold">2</div>
                <span>We schedule a discovery call within 48 hours</span>
              </div>
              <div className="flex items-center text-white/80">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mr-3 text-sm font-bold">3</div>
                <span>We create a detailed project proposal</span>
              </div>
              <div className="flex items-center text-white/80">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mr-3 text-sm font-bold">4</div>
                <span>Development begins once approved</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => window.location.href = '/solutions/custom-apps'}
              className="inline-flex items-center justify-center px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-colors duration-300"
            >
              <ArrowRightIcon className="w-4 h-4 mr-2" />
              Back to Custom Apps
            </button>
            <button
              onClick={() => window.location.href = '/contact'}
              className="inline-flex items-center justify-center px-6 py-3 bg-white/20 hover:bg-white/30 text-white rounded-lg font-semibold transition-colors duration-300"
            >
              Contact Us
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute top-40 left-1/2 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-6 py-3 bg-blue-500/20 backdrop-blur-sm rounded-full border border-blue-500/30 mb-8">
            <SparklesIcon className="w-5 h-5 mr-2 text-blue-400" />
            <span className="font-semibold text-blue-400">Custom App Request</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Let's Build Your
            <span className="block text-blue-400">Custom Application</span>
          </h1>
          
          <p className="text-xl text-blue-200 max-w-2xl mx-auto">
            Tell us about your project and we'll create a custom app tailored to your business needs.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Selected Components */}
          <div className="lg:col-span-1">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 sticky top-8">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <CogIcon className="w-5 h-5 mr-2 text-blue-400" />
                Selected Components
              </h3>
              
              {selectedComponents.length > 0 ? (
                <div className="space-y-2">
                  {selectedComponents.map((component, index) => (
                    <div key={index} className="flex items-center text-sm text-white/80">
                      <CheckCircleIcon className="w-4 h-4 text-green-400 mr-2" />
                      {componentDescriptions[component] || component}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-white/60 text-sm">No components selected</p>
              )}
            </div>
          </div>

          {/* Request Form */}
          <div className="lg:col-span-2">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      <UserIcon className="w-4 h-4 inline mr-2" />
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Your full name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      <EnvelopeIcon className="w-4 h-4 inline mr-2" />
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      <PhoneIcon className="w-4 h-4 inline mr-2" />
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      <BuildingOfficeIcon className="w-4 h-4 inline mr-2" />
                      Business Name *
                    </label>
                    <input
                      type="text"
                      name="businessName"
                      value={formData.businessName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Your company name"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Industry
                  </label>
                  <select
                    name="industry"
                    value={formData.industry}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select your industry</option>
                    <option value="property-management">Property Management</option>
                    <option value="real-estate">Real Estate</option>
                    <option value="contractors">Contractors</option>
                    <option value="healthcare">Healthcare</option>
                    <option value="cleaning-services">Cleaning Services</option>
                    <option value="accounting">Accounting</option>
                    <option value="professional-services">Professional Services</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    <LightBulbIcon className="w-4 h-4 inline mr-2" />
                    Project Description *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Describe your project goals, what you want the app to do, and any specific requirements..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Additional Notes
                  </label>
                  <textarea
                    name="additionalNotes"
                    value={formData.additionalNotes}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Any additional information, timeline requirements, or special requests..."
                  />
                </div>

                <div className="flex items-center justify-between pt-6">
                  <div className="text-white/80 text-sm">
                    * Required fields
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center justify-center px-8 py-4 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-500 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-colors duration-300"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Submitting...
                      </>
                    ) : (
                      <>
                        <RocketLaunchIcon className="w-5 h-5 mr-2" />
                        Submit Request
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-white mb-8">Why Choose Our Custom App Development?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                <BoltIcon className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-xl font-bold text-white mb-2">Fast Development</h4>
              <p className="text-white/80">Get your custom app built and deployed quickly with our streamlined development process.</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                <StarIcon className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-xl font-bold text-white mb-2">Tailored to You</h4>
              <p className="text-white/80">Every app is custom-built to match your specific business needs and workflows.</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                <CogIcon className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-xl font-bold text-white mb-2">Ongoing Support</h4>
              <p className="text-white/80">We provide continuous support and updates to keep your app running smoothly.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CustomAppRequestPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    }>
      <CustomAppRequestPageContent />
    </Suspense>
  );
}
