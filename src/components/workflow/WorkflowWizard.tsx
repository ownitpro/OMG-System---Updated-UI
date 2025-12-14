"use client";

import { useState, useEffect } from "react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/common/section";
import { workflowDefinitions } from "@/data/workflow-definitions";

interface WorkflowWizardProps {
  workflowId: string;
  onComplete: (workflowData: any) => void;
}

interface WizardStep {
  id: number;
  title: string;
  description: string;
  component: React.ComponentType<any>;
}

// Step 1: Choose Trigger
function TriggerStep({ workflow, onNext, onBack }: any) {
  const [selectedTrigger, setSelectedTrigger] = useState("");

  const triggers = [
    { id: "form-submission", name: "New form submission", description: "When someone submits a form" },
    { id: "spreadsheet-row", name: "New row in spreadsheet", description: "When a new row is added to Google Sheets" },
    { id: "manual-button", name: "Manual button press", description: "When someone clicks a button" },
    { id: "schedule", name: "Scheduled trigger", description: "Runs at specific times" },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: Canvas */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Workflow Canvas</h3>
          <div className="flex items-center justify-center h-64 bg-gray-50 rounded-lg">
            <div className="text-center">
              <div className="w-16 h-16 bg-lime-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🚀</span>
              </div>
              <p className="text-gray-600">Start → {selectedTrigger || "Choose trigger"}</p>
            </div>
          </div>
        </div>

        {/* Right: Step Details */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Step 1: Choose the trigger</h2>
            <p className="text-gray-600">When does this workflow start? Select your trigger:</p>
          </div>

          <div className="space-y-3 mb-6">
            {triggers.map((trigger) => (
              <label key={trigger.id} className="flex items-start p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="trigger"
                  value={trigger.id}
                  checked={selectedTrigger === trigger.id}
                  onChange={(e) => setSelectedTrigger(e.target.value)}
                  className="mt-1 mr-3"
                />
                <div>
                  <div className="font-medium text-gray-900">{trigger.name}</div>
                  <div className="text-sm text-gray-600">{trigger.description}</div>
                </div>
              </label>
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
              onClick={() => onNext({ trigger: selectedTrigger })}
              disabled={!selectedTrigger}
              className="px-6 py-2 bg-lime-600 text-white rounded-lg hover:bg-lime-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Step 2: Map Fields
function FieldMappingStep({ workflow, onNext, onBack, data }: any) {
  const [fieldMappings, setFieldMappings] = useState([
    { source: "name", target: "contact_name", required: true },
    { source: "email", target: "contact_email", required: true },
    { source: "phone", target: "contact_phone", required: false },
  ]);

  const addFieldMapping = () => {
    setFieldMappings([...fieldMappings, { source: "", target: "", required: false }]);
  };

  const updateFieldMapping = (index: number, field: string, value: string) => {
    const updated = [...fieldMappings];
    updated[index] = { ...updated[index], [field]: value };
    setFieldMappings(updated);
  };

  const removeFieldMapping = (index: number) => {
    setFieldMappings(fieldMappings.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: Canvas */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Workflow Canvas</h3>
          <div className="flex items-center justify-center h-64 bg-gray-50 rounded-lg">
            <div className="text-center">
              <div className="w-16 h-16 bg-lime-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚙️</span>
              </div>
              <p className="text-gray-600">Start → Configure Fields</p>
            </div>
          </div>
        </div>

        {/* Right: Step Details */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Step 2: Map fields</h2>
            <p className="text-gray-600">Map the data fields from your trigger to the workflow variables.</p>
          </div>

          <div className="space-y-4 mb-6">
            {fieldMappings.map((mapping, index) => (
              <div key={index} className="flex items-center gap-4 p-4 border rounded-lg">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Source Field</label>
                  <input
                    type="text"
                    value={mapping.source}
                    onChange={(e) => updateFieldMapping(index, "source", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="e.g., name, email"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Target Variable</label>
                  <input
                    type="text"
                    value={mapping.target}
                    onChange={(e) => updateFieldMapping(index, "target", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="e.g., contact_name"
                  />
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={mapping.required}
                    onChange={(e) => updateFieldMapping(index, "required", e.target.checked)}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-600">Required</span>
                </div>
                <button
                  onClick={() => removeFieldMapping(index)}
                  className="text-red-600 hover:text-red-800"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          <button
            onClick={addFieldMapping}
            className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-lime-400 hover:text-lime-600 mb-6"
          >
            + Add Field Mapping
          </button>

          <div className="flex justify-between">
            <button
              onClick={onBack}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Back
            </button>
            <button
              onClick={() => onNext({ fieldMappings })}
              className="px-6 py-2 bg-lime-600 text-white rounded-lg hover:bg-lime-700"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Step 3: Define Actions
function ActionsStep({ workflow, onNext, onBack, data }: any) {
  const [actions, setActions] = useState([
    { id: 1, type: "create_lead", name: "Create lead in CRM", config: {} },
  ]);

  const availableActions = [
    { id: "create_lead", name: "Create lead in CRM", description: "Add new contact to your CRM system" },
    { id: "send_email", name: "Send email", description: "Send automated email notification" },
    { id: "add_to_list", name: "Add to list", description: "Add contact to email list" },
    { id: "update_spreadsheet", name: "Update spreadsheet", description: "Add row to Google Sheets" },
    { id: "send_slack", name: "Send Slack message", description: "Notify team via Slack" },
    { id: "delay", name: "Wait/Delay", description: "Pause workflow for specified time" },
  ];

  const addAction = (actionType: string) => {
    const action = availableActions.find(a => a.id === actionType);
    if (action) {
      setActions([...actions, {
        id: Date.now(),
        type: actionType,
        name: action.name,
        config: {}
      }]);
    }
  };

  const removeAction = (id: number) => {
    setActions(actions.filter(a => a.id !== id));
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Canvas */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Workflow Canvas</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-center p-4 bg-gray-50 rounded-lg">
              <div className="text-center">
                <div className="w-12 h-12 bg-lime-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-xl">🚀</span>
                </div>
                <p className="text-sm text-gray-600">Start</p>
              </div>
            </div>
            
            {actions.map((action, index) => (
              <div key={action.id} className="flex items-center justify-center p-4 bg-blue-50 rounded-lg">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-xl">⚡</span>
                  </div>
                  <p className="text-sm text-gray-600">{action.name}</p>
                  <button
                    onClick={() => removeAction(action.id)}
                    className="text-red-600 hover:text-red-800 text-xs mt-1"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Middle: Available Actions */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Available Actions</h3>
          <div className="space-y-2">
            {availableActions.map((action) => (
              <button
                key={action.id}
                onClick={() => addAction(action.id)}
                className="w-full text-left p-3 border rounded-lg hover:bg-gray-50"
              >
                <div className="font-medium text-gray-900">{action.name}</div>
                <div className="text-sm text-gray-600">{action.description}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Right: Step Details */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Step 3: Define actions</h2>
            <p className="text-gray-600">What should happen next? Choose one or more actions.</p>
          </div>

          <div className="mb-6">
            <h4 className="font-semibold text-gray-900 mb-3">Selected Actions ({actions.length})</h4>
            {actions.length === 0 ? (
              <p className="text-gray-500 text-sm">No actions selected. Click on available actions to add them.</p>
            ) : (
              <div className="space-y-2">
                {actions.map((action) => (
                  <div key={action.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <span className="text-sm">{action.name}</span>
                    <button
                      onClick={() => removeAction(action.id)}
                      className="text-red-600 hover:text-red-800 text-xs"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-between">
            <button
              onClick={onBack}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Back
            </button>
            <button
              onClick={() => onNext({ actions })}
              disabled={actions.length === 0}
              className="px-6 py-2 bg-lime-600 text-white rounded-lg hover:bg-lime-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Step 4: Preview & Test
function PreviewStep({ workflow, onNext, onBack, data }: any) {
  const [testData, setTestData] = useState({
    name: "John Doe",
    email: "john@example.com",
    phone: "+1-555-0123"
  });

  const [testResults, setTestResults] = useState<any>(null);
  const [isRunningTest, setIsRunningTest] = useState(false);

  const runTest = async () => {
    setIsRunningTest(true);
    // Simulate test run
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setTestResults({
      success: true,
      steps: [
        { name: "Trigger activated", status: "success" },
        { name: "Field mapping completed", status: "success" },
        { name: "Create lead in CRM", status: "success" },
        { name: "Send notification email", status: "success" }
      ]
    });
    setIsRunningTest(false);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: Canvas with Animation */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Workflow Preview</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-center p-4 bg-lime-50 rounded-lg border-2 border-lime-200">
              <div className="text-center">
                <div className="w-12 h-12 bg-lime-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-xl">🚀</span>
                </div>
                <p className="text-sm text-gray-600">Start</p>
              </div>
            </div>
            
            {data.actions?.map((action: any, index: number) => (
              <div key={index} className="flex items-center justify-center p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-xl">⚡</span>
                  </div>
                  <p className="text-sm text-gray-600">{action.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Test & Results */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Step 4: Preview & Test</h2>
            <p className="text-gray-600">Test your workflow with sample data to see what happens.</p>
          </div>

          <div className="mb-6">
            <h4 className="font-semibold text-gray-900 mb-3">Test Data</h4>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  value={testData.name}
                  onChange={(e) => setTestData({...testData, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={testData.email}
                  onChange={(e) => setTestData({...testData, email: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="text"
                  value={testData.phone}
                  onChange={(e) => setTestData({...testData, phone: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>
          </div>

          <button
            onClick={runTest}
            disabled={isRunningTest}
            className="w-full py-3 bg-lime-600 text-white rounded-lg hover:bg-lime-700 disabled:opacity-50 mb-6"
          >
            {isRunningTest ? "Running Test..." : "Run Test"}
          </button>

          {testResults && (
            <div className="mb-6">
              <h4 className="font-semibold text-gray-900 mb-3">Test Results</h4>
              <div className="space-y-2">
                {testResults.steps.map((step: any, index: number) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-green-50 rounded">
                    <span className="text-sm">{step.name}</span>
                    <span className="text-green-600 text-sm">✓ Success</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-2">Pricing</h4>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span>Setup cost:</span>
                <span className="font-semibold">${workflow.setupCost}</span>
              </div>
              <div className="flex justify-between">
                <span>Monthly cost:</span>
                <span className="font-semibold">${workflow.monthlyCost}</span>
              </div>
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
              onClick={() => onNext({ testData, testResults })}
              className="px-6 py-2 bg-lime-600 text-white rounded-lg hover:bg-lime-700"
            >
              Deploy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Step 5: Deploy & Pay
function DeployStep({ workflow, onComplete, onBack, data }: any) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    company: "",
    phone: "",
    notes: ""
  });

  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    onComplete({
      workflow,
      customerInfo: formData,
      pricing: {
        setupCost: workflow.setupCost,
        monthlyCost: workflow.monthlyCost
      }
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: Ready to Deploy */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Ready to Deploy</h3>
          <div className="flex items-center justify-center h-64 bg-green-50 rounded-lg border-2 border-green-200">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎉</span>
              </div>
              <p className="text-gray-600 font-medium">Your workflow is ready!</p>
            </div>
          </div>
        </div>

        {/* Right: Payment Form */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Step 5: Deploy & Pay</h2>
            <p className="text-gray-600">You're almost done — fill in your details and confirm payment.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
              <input
                type="text"
                required
                value={formData.fullName}
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Company Name *</label>
              <input
                type="text"
                required
                value={formData.company}
                onChange={(e) => setFormData({...formData, company: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Additional Notes</label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({...formData, notes: e.target.value})}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </form>

          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-2">Payment Summary</h4>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span>Setup cost:</span>
                <span className="font-semibold">${workflow.setupCost}</span>
              </div>
              <div className="flex justify-between">
                <span>Monthly cost:</span>
                <span className="font-semibold">${workflow.monthlyCost}</span>
              </div>
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between font-semibold">
                  <span>Total first month:</span>
                  <span>${workflow.setupCost + workflow.monthlyCost}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              onClick={onBack}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Back
            </button>
            <button
              type="submit"
              disabled={isProcessing}
              className="px-6 py-2 bg-lime-600 text-white rounded-lg hover:bg-lime-700 disabled:opacity-50"
            >
              {isProcessing ? "Processing..." : "Deploy & Pay"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function WorkflowWizard({ workflowId, onComplete }: WorkflowWizardProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [workflowData, setWorkflowData] = useState<any>({});
  const [workflow, setWorkflow] = useState<any>(null);

  useEffect(() => {
    const foundWorkflow = workflowDefinitions.find(w => w.id === workflowId);
    setWorkflow(foundWorkflow);
  }, [workflowId]);

  const steps: WizardStep[] = [
    { id: 1, title: "Choose Trigger", description: "Select how your workflow starts", component: TriggerStep },
    { id: 2, title: "Map Fields", description: "Connect your data fields", component: FieldMappingStep },
    { id: 3, title: "Define Actions", description: "Choose what happens next", component: ActionsStep },
    { id: 4, title: "Preview & Test", description: "Test your workflow", component: PreviewStep },
    { id: 5, title: "Deploy & Pay", description: "Launch your automation", component: DeployStep },
  ];

  const handleNext = (stepData: any) => {
    setWorkflowData({ ...workflowData, ...stepData });
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = (finalData: any) => {
    onComplete(finalData);
  };

  if (!workflow) {
    return <div>Loading...</div>;
  }

  const CurrentStepComponent = steps[currentStep - 1].component;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Progress Bar */}
      <div className="bg-white shadow-sm">
        <Container>
          <div className="py-4">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold text-gray-900">{workflow.name}</h1>
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
      <Section className="py-8">
        <Container>
          <CurrentStepComponent
            workflow={workflow}
            onNext={handleNext}
            onBack={handleBack}
            onComplete={handleComplete}
            data={workflowData}
          />
        </Container>
      </Section>
    </div>
  );
}