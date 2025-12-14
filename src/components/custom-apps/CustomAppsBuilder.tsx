"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/common/section";
import { customApps, CustomApp } from "@/content/customApps";

interface BuilderStep {
  id: number;
  title: string;
  description: string;
  component: React.ComponentType<any>;
}

interface AppSpec {
  template: string;
  modules: string[];
  branding: {
    name: string;
    color: string;
    logo?: File;
    font: string;
  };
  integrations: string[];
  workflow: string[];
  contact: {
    name: string;
    email: string;
    company: string;
    phone: string;
    notes: string;
  };
}

// Step 1: Select Template
function StepTemplateSelect({ onNext, onBack, data }: any) {
  const [selectedTemplate, setSelectedTemplate] = useState(data.template || "");

  const templates = [
    { id: "blank", name: "Start from Scratch", description: "Build a completely custom app", icon: "🆕" },
    ...customApps.map(app => ({
      id: app.slug,
      name: app.title,
      description: app.description,
      icon: "📱"
    }))
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Step 1: Select Template</h2>
        <p className="text-lg text-gray-600">Choose a base app to start or select blank to build from scratch.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {templates.map((template) => (
          <button
            key={template.id}
            onClick={() => setSelectedTemplate(template.id)}
            className={`p-6 border-2 rounded-lg text-left transition-all ${
              selectedTemplate === template.id
                ? "border-lime-500 bg-lime-50"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <div className="text-3xl mb-4">{template.icon}</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{template.name}</h3>
            <p className="text-gray-600">{template.description}</p>
          </button>
        ))}
      </div>

      <div className="flex justify-between">
        <button
          onClick={onBack}
          className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
        >
          Back
        </button>
        <button
          onClick={() => onNext({ template: selectedTemplate })}
          disabled={!selectedTemplate}
          className="px-6 py-2 bg-lime-600 text-white rounded-lg hover:bg-lime-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue
        </button>
      </div>
    </div>
  );
}

// Step 2: Choose Modules
function StepModules({ onNext, onBack, data }: any) {
  const [selectedModules, setSelectedModules] = useState<string[]>(data.modules || []);

  const availableModules = [
    { id: "Form Intake", description: "Capture data from clients", icon: "📝" },
    { id: "User Login & Roles", description: "Handle user authentication and permissions", icon: "👤" },
    { id: "Notifications / Alerts", description: "Send automated notifications", icon: "🔔" },
    { id: "Workflow Automation", description: "Automate business processes", icon: "⚡" },
    { id: "API Integration", description: "Connect with external services", icon: "🔗" },
    { id: "Data Dashboard", description: "Display analytics and metrics", icon: "📊" },
    { id: "File Upload & Storage", description: "Handle document and media uploads", icon: "📁" },
    { id: "Payment Processing", description: "Handle transactions and billing", icon: "💳" },
    { id: "Chatbot Support", description: "Provide automated customer support", icon: "🤖" }
  ];

  const toggleModule = (moduleId: string) => {
    setSelectedModules(prev => 
      prev.includes(moduleId) 
        ? prev.filter(id => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Step 2: Choose Modules</h2>
        <p className="text-lg text-gray-600">Select the modules you need for your custom app.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {availableModules.map((module) => (
          <button
            key={module.id}
            onClick={() => toggleModule(module.id)}
            className={`p-4 border-2 rounded-lg text-left transition-all ${
              selectedModules.includes(module.id)
                ? "border-lime-500 bg-lime-50"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <div className="flex items-center mb-2">
              <span className="text-2xl mr-3">{module.icon}</span>
              <h3 className="font-semibold text-gray-900">{module.id}</h3>
            </div>
            <p className="text-sm text-gray-600">{module.description}</p>
          </button>
        ))}
      </div>

      <div className="bg-gray-50 p-4 rounded-lg mb-8">
        <h4 className="font-semibold text-gray-900 mb-2">Selected Modules: {selectedModules.length}</h4>
        <div className="flex flex-wrap gap-2">
          {selectedModules.map((module) => (
            <span
              key={module}
              className="px-3 py-1 bg-lime-100 text-lime-700 text-sm rounded-full"
            >
              {module}
            </span>
          ))}
        </div>
      </div>

      <div className="flex justify-between">
        <button
          onClick={onBack}
          className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
        >
          Back
        </button>
        <button
          onClick={() => onNext({ modules: selectedModules })}
          className="px-6 py-2 bg-lime-600 text-white rounded-lg hover:bg-lime-700"
        >
          Continue
        </button>
      </div>
    </div>
  );
}

// Step 3: Branding & Visual Style
function StepBranding({ onNext, onBack, data }: any) {
  const [branding, setBranding] = useState(data.branding || {
    name: "",
    color: "#B7F000",
    font: "Inter"
  });

  const fonts = ["Inter", "Roboto", "Open Sans", "Lato", "Montserrat"];

  const updateBranding = (field: string, value: string) => {
    setBranding(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Step 3: Branding & Visual Style</h2>
        <p className="text-lg text-gray-600">Customize the look and feel of your app.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">App Name</label>
            <input
              type="text"
              value={branding.name}
              onChange={(e) => updateBranding("name", e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-lime-500"
              placeholder="My Custom App"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Brand Color</label>
            <div className="flex items-center gap-4">
              <input
                type="color"
                value={branding.color}
                onChange={(e) => updateBranding("color", e.target.value)}
                className="w-12 h-12 border border-gray-300 rounded cursor-pointer"
              />
              <input
                type="text"
                value={branding.color}
                onChange={(e) => updateBranding("color", e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-lime-500"
                placeholder="#B7F000"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Primary Font</label>
            <select
              value={branding.font}
              onChange={(e) => updateBranding("font", e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-lime-500"
            >
              {fonts.map((font) => (
                <option key={font} value={font}>{font}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Upload Logo (Optional)</label>
            <input
              type="file"
              accept="image/*"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-lime-500"
            />
          </div>
        </div>

        {/* Live Preview */}
        <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Live Preview</h3>
          <div className="space-y-4">
            <div className="p-4 rounded-lg" style={{ backgroundColor: branding.color + "20" }}>
              <h4 className="font-semibold text-gray-900 mb-2" style={{ fontFamily: branding.font }}>
                {branding.name || "My Custom App"}
              </h4>
              <p className="text-sm text-gray-600">Your app preview</p>
            </div>
            <div className="flex gap-2">
              <button
                className="px-4 py-2 rounded text-white text-sm"
                style={{ backgroundColor: branding.color }}
              >
                Primary Button
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded text-gray-700 text-sm">
                Secondary Button
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <button
          onClick={onBack}
          className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
        >
          Back
        </button>
        <button
          onClick={() => onNext({ branding })}
          className="px-6 py-2 bg-lime-600 text-white rounded-lg hover:bg-lime-700"
        >
          Continue
        </button>
      </div>
    </div>
  );
}

// Step 4: Integrations
function StepIntegrations({ onNext, onBack, data }: any) {
  const [selectedIntegrations, setSelectedIntegrations] = useState<string[]>(data.integrations || []);

  const availableIntegrations = [
    { id: "Google Sheets", description: "Sync data with Google Sheets", icon: "📊" },
    { id: "Airtable", description: "Connect with Airtable databases", icon: "🗃️" },
    { id: "Slack", description: "Send notifications to Slack", icon: "💬" },
    { id: "HubSpot", description: "Integrate with HubSpot CRM", icon: "🎯" },
    { id: "Google Drive", description: "Access Google Drive files", icon: "📁" },
    { id: "Email Notifications", description: "Send automated emails", icon: "📧" },
    { id: "Stripe", description: "Process payments with Stripe", icon: "💳" },
    { id: "API Webhook", description: "Custom API integrations", icon: "🔗" }
  ];

  const toggleIntegration = (integrationId: string) => {
    setSelectedIntegrations(prev => 
      prev.includes(integrationId) 
        ? prev.filter(id => id !== integrationId)
        : [...prev, integrationId]
    );
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Step 4: Integrations</h2>
        <p className="text-lg text-gray-600">Choose which external services to integrate with your app.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {availableIntegrations.map((integration) => (
          <button
            key={integration.id}
            onClick={() => toggleIntegration(integration.id)}
            className={`p-4 border-2 rounded-lg text-center transition-all ${
              selectedIntegrations.includes(integration.id)
                ? "border-lime-500 bg-lime-50"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <div className="text-3xl mb-2">{integration.icon}</div>
            <h3 className="font-semibold text-gray-900 mb-1">{integration.id}</h3>
            <p className="text-xs text-gray-600">{integration.description}</p>
          </button>
        ))}
      </div>

      <div className="bg-gray-50 p-4 rounded-lg mb-8">
        <h4 className="font-semibold text-gray-900 mb-2">Selected Integrations: {selectedIntegrations.length}</h4>
        <div className="flex flex-wrap gap-2">
          {selectedIntegrations.map((integration) => (
            <span
              key={integration}
              className="px-3 py-1 bg-lime-100 text-lime-700 text-sm rounded-full"
            >
              {integration}
            </span>
          ))}
        </div>
      </div>

      <div className="flex justify-between">
        <button
          onClick={onBack}
          className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
        >
          Back
        </button>
        <button
          onClick={() => onNext({ integrations: selectedIntegrations })}
          className="px-6 py-2 bg-lime-600 text-white rounded-lg hover:bg-lime-700"
        >
          Continue
        </button>
      </div>
    </div>
  );
}

// Step 5: Workflow Preview
function StepWorkflow({ onNext, onBack, data }: any) {
  const [workflow, setWorkflow] = useState<string[]>(data.workflow || [
    "Start", "Form", "Database", "Notification", "Dashboard", "End"
  ]);
  const [isValidated, setIsValidated] = useState(false);

  const validateWorkflow = () => {
    // Simulate validation
    setTimeout(() => {
      setIsValidated(true);
    }, 1000);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Step 5: Workflow Preview</h2>
        <p className="text-lg text-gray-600">Review and validate your app's workflow.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Workflow Visual */}
        <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Workflow Flow</h3>
          <div className="flex items-center justify-center space-x-4">
            {workflow.map((step, index) => (
              <div key={index} className="flex items-center">
                <div className="w-16 h-16 bg-lime-100 rounded-full flex items-center justify-center">
                  <span className="text-lime-600 font-semibold">{step}</span>
                </div>
                {index < workflow.length - 1 && (
                  <div className="w-8 h-0.5 bg-lime-300"></div>
                )}
              </div>
            ))}
          </div>
          <div className="mt-4 text-center">
            <button
              onClick={validateWorkflow}
              className="px-4 py-2 bg-lime-600 text-white rounded-lg hover:bg-lime-700"
            >
              Validate Flow
            </button>
            {isValidated && (
              <div className="mt-2 text-green-600 font-semibold">
                ✅ Workflow Validated
              </div>
            )}
          </div>
        </div>

        {/* Workflow Description */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">How it works:</h3>
          <div className="space-y-3">
            {workflow.map((step, index) => (
              <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-lime-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-lime-600 font-semibold text-sm">{index + 1}</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{step}</h4>
                  <p className="text-sm text-gray-600">
                    {step === "Start" && "User initiates the process"}
                    {step === "Form" && "Data is collected from user"}
                    {step === "Database" && "Information is stored securely"}
                    {step === "Notification" && "Alerts are sent to relevant parties"}
                    {step === "Dashboard" && "Results are displayed to user"}
                    {step === "End" && "Process is completed"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <button
          onClick={onBack}
          className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
        >
          Back
        </button>
        <button
          onClick={() => onNext({ workflow })}
          className="px-6 py-2 bg-lime-600 text-white rounded-lg hover:bg-lime-700"
        >
          Continue
        </button>
      </div>
    </div>
  );
}

// Step 6: Review & Submit
function StepReviewSubmit({ onNext, onBack, data }: any) {
  const [contact, setContact] = useState(data.contact || {
    name: "",
    email: "",
    company: "",
    phone: "",
    notes: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Redirect to thank you page
    window.location.href = "/custom-apps/thank-you";
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Step 6: Review & Submit</h2>
        <p className="text-lg text-gray-600">Review your selections and provide your contact information.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Summary */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-900">App Summary</h3>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-2">Template</h4>
            <p className="text-gray-600">{data.template || "Blank"}</p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-2">Modules ({data.modules?.length || 0})</h4>
            <div className="flex flex-wrap gap-2">
              {data.modules?.map((module: string) => (
                <span key={module} className="px-2 py-1 bg-lime-100 text-lime-700 text-sm rounded">
                  {module}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-2">Integrations ({data.integrations?.length || 0})</h4>
            <div className="flex flex-wrap gap-2">
              {data.integrations?.map((integration: string) => (
                <span key={integration} className="px-2 py-1 bg-blue-100 text-blue-700 text-sm rounded">
                  {integration}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-2">Branding</h4>
            <p className="text-gray-600">Name: {data.branding?.name || "Not set"}</p>
            <p className="text-gray-600">Color: {data.branding?.color || "Not set"}</p>
            <p className="text-gray-600">Font: {data.branding?.font || "Not set"}</p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-900">Contact Information</h3>
          <p className="text-sm text-gray-600 mb-4">
            Fill in your details and we'll reach out within 48 hours.
          </p>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
              <input
                type="text"
                required
                value={contact.name}
                onChange={(e) => setContact({...contact, name: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-lime-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
              <input
                type="email"
                required
                value={contact.email}
                onChange={(e) => setContact({...contact, email: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-lime-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Company Name *</label>
              <input
                type="text"
                required
                value={contact.company}
                onChange={(e) => setContact({...contact, company: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-lime-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input
                type="tel"
                value={contact.phone}
                onChange={(e) => setContact({...contact, phone: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-lime-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Additional Notes / Requirements</label>
              <textarea
                value={contact.notes}
                onChange={(e) => setContact({...contact, notes: e.target.value})}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-lime-500"
                placeholder="Any specific requirements or additional information..."
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                required
                className="mr-2"
              />
              <span className="text-sm text-gray-600">
                I agree to be contacted within 48 hours.
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <button
          onClick={onBack}
          className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
        >
          Back
        </button>
        <button
          onClick={handleSubmit}
          disabled={isSubmitting || !contact.name || !contact.email || !contact.company}
          className="px-6 py-2 bg-lime-600 text-white rounded-lg hover:bg-lime-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Submitting..." : "Submit Specs"}
        </button>
      </div>
    </div>
  );
}

export function CustomAppsBuilder() {
  const searchParams = useSearchParams();
  const template = searchParams.get("template");
  
  const [currentStep, setCurrentStep] = useState(1);
  const [appSpec, setAppSpec] = useState<AppSpec>({
    template: template || "",
    modules: [],
    branding: {
      name: "",
      color: "#B7F000",
      font: "Inter"
    },
    integrations: [],
    workflow: [],
    contact: {
      name: "",
      email: "",
      company: "",
      phone: "",
      notes: ""
    }
  });

  const steps: BuilderStep[] = [
    { id: 1, title: "Select Template", description: "Choose your starting point", component: StepTemplateSelect },
    { id: 2, title: "Choose Modules", description: "Select the features you need", component: StepModules },
    { id: 3, title: "Branding & Style", description: "Customize the look and feel", component: StepBranding },
    { id: 4, title: "Integrations", description: "Connect external services", component: StepIntegrations },
    { id: 5, title: "Workflow Preview", description: "Review your app flow", component: StepWorkflow },
    { id: 6, title: "Review & Submit", description: "Finalize and submit", component: StepReviewSubmit }
  ];

  const handleNext = (stepData: any) => {
    setAppSpec({ ...appSpec, ...stepData });
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const CurrentStepComponent = steps[currentStep - 1].component;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Progress Bar */}
      <div className="bg-white shadow-sm mb-8">
        <Container>
          <div className="py-4">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold text-gray-900">Custom App Builder</h1>
              <span className="text-sm text-gray-600">Step {currentStep} of {steps.length}</span>
            </div>
            <div className="flex space-x-2">
              {steps.map((step, index) => (
                <div
                  key={step.id}
                  className={`flex-1 h-2 rounded-full ${
                    index < currentStep ? 'bg-lime-600' : 
                    index === currentStep - 1 ? 'bg-lime-300' : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
            <div className="mt-2">
              <h2 className="text-lg font-semibold text-gray-900">{steps[currentStep - 1].title}</h2>
              <p className="text-sm text-gray-600">{steps[currentStep - 1].description}</p>
            </div>
          </div>
        </Container>
      </div>

      {/* Step Content */}
      <Container>
        <CurrentStepComponent
          onNext={handleNext}
          onBack={handleBack}
          data={appSpec}
        />
      </Container>
    </div>
  );
}