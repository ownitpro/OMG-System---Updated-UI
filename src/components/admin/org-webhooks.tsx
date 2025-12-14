import React from "react";
interface Organization {
  id: string;
}

interface OrgWebhooksProps {
  org: Organization;
}

export function OrgWebhooks({ org }: OrgWebhooksProps) {
  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-medium text-gray-900">Webhooks & Usage</h3>
          <p className="mt-1 text-sm text-gray-500">
            Monitor webhook endpoints and usage statistics
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Add Webhook
          </button>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <div className="text-center">
          <p className="text-sm text-gray-500">No webhooks configured</p>
          <p className="mt-1 text-sm text-gray-400">
            Webhook endpoints and usage statistics will appear here
          </p>
        </div>
      </div>
    </div>
  );
}
