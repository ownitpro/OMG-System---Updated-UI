"use client";

interface WizardStepContainerProps {
  step: number;
  totalSteps: number;
  title: string;
  description: string;
  children: React.ReactNode;
}

export function WizardStepContainer({ 
  step, 
  totalSteps, 
  title, 
  description, 
  children 
}: WizardStepContainerProps) {
  return (
    <div className="space-y-6">
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Step {step + 1} of {totalSteps}</span>
          <span className="text-sm text-gray-500">{Math.round(((step + 1) / totalSteps) * 100)}% Complete</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-lime-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((step + 1) / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {/* Step Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
        <p className="text-gray-600">{description}</p>
      </div>

      {/* Step Content */}
      <div>
        {children}
      </div>
    </div>
  );
}
