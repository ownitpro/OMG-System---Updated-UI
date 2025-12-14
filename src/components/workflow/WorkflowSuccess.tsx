"use client";

import { WorkflowDefinition } from "@/data/workflow-definitions";

interface WorkflowSuccessProps {
  workflow: WorkflowDefinition;
  paymentData: any;
  onClose: () => void;
}

export function WorkflowSuccess({ workflow, paymentData, onClose }: WorkflowSuccessProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">🎉 Congratulations!</h3>
          <p className="text-gray-600">Your workflow has been successfully deployed</p>
        </div>

        <div className="p-6">
          <div className="space-y-6">
            {/* Success Message */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-semibold text-green-800 mb-2">Deployment Successful!</h4>
              <p className="text-green-700 text-sm">
                Your <strong>{workflow.name}</strong> automation is now being built and will be ready in {workflow.estimatedTime}.
              </p>
            </div>

            {/* Order Details */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-3">Order Details</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Order ID:</span>
                  <span className="font-medium">{paymentData.orderId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Customer:</span>
                  <span className="font-medium">{paymentData.fullName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Company:</span>
                  <span className="font-medium">{paymentData.company}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Paid:</span>
                  <span className="font-medium text-green-600">${paymentData.totalFirstMonth}</span>
                </div>
              </div>
            </div>

            {/* What Happens Next */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">What Happens Next?</h4>
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-lime-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-lime-600 font-bold text-sm">1</span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Immediate Setup (Today)</div>
                    <div className="text-sm text-gray-600">We'll start building your automation and send you a confirmation email</div>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-gray-600 font-bold text-sm">2</span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Development & Testing ({workflow.estimatedTime})</div>
                    <div className="text-sm text-gray-600">Our team will build, integrate, and thoroughly test your automation</div>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-gray-600 font-bold text-sm">3</span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Go Live & Training</div>
                    <div className="text-sm text-gray-600">We'll deploy your automation and provide training for your team</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-800 mb-2">Need Help?</h4>
              <p className="text-blue-700 text-sm mb-3">
                Our team is here to support you throughout the process. Don't hesitate to reach out!
              </p>
              <div className="space-y-1 text-sm text-blue-700">
                <div>📧 Email: support@omgsystems.com</div>
                <div>📞 Phone: 1-800-OMG-SYSTEMS</div>
                <div>💬 Live Chat: Available in your dashboard</div>
              </div>
            </div>

            {/* Dashboard Access */}
            <div className="bg-lime-50 border border-lime-200 rounded-lg p-4">
              <h4 className="font-semibold text-lime-800 mb-2">Access Your Dashboard</h4>
              <p className="text-lime-700 text-sm mb-3">
                You can now access your personal dashboard to track progress and manage your automation.
              </p>
              <div className="flex gap-3">
                <button className="bg-lime-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-lime-700 transition-colors">
                  Go to Dashboard
                </button>
                <button className="border border-lime-300 text-lime-700 px-4 py-2 rounded-lg font-semibold hover:bg-lime-100 transition-colors">
                  View Order Details
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => window.location.href = '/dashboard'}
              className="flex-1 px-4 py-3 bg-lime-600 text-white rounded-lg hover:bg-lime-700 transition-colors"
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
