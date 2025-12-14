import React from "react";
interface Organization {
  id: string;
}

interface OrgDocumentsProps {
  org: Organization;
}

export function OrgDocuments({ org }: OrgDocumentsProps) {
  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-medium text-gray-900">Documents</h3>
          <p className="mt-1 text-sm text-gray-500">
            View and manage documents for this organization
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Request Document
          </button>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <div className="text-center">
          <p className="text-sm text-gray-500">No documents found</p>
          <p className="mt-1 text-sm text-gray-400">
            Documents will appear here when uploaded via SecureVault Docs
          </p>
        </div>
      </div>
    </div>
  );
}
