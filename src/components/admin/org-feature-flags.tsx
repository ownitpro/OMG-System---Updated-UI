import React from "react";
import { Badge } from "@/components/ui/badge";

interface Organization {
  id: string;
}

interface OrgFeatureFlagsProps {
  org: Organization;
}

export function OrgFeatureFlags({ org }: OrgFeatureFlagsProps) {
  // Mock feature flags for now
  const featureFlags = [
    { key: "advanced_analytics", enabled: true, source: "plan" },
    { key: "custom_branding", enabled: false, source: "manual" },
    { key: "api_access", enabled: true, source: "plan" },
    { key: "priority_support", enabled: false, source: "manual" },
  ];

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-medium text-gray-900">Feature Flags</h3>
          <p className="mt-1 text-sm text-gray-500">
            Manage feature flags for this organization
          </p>
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {featureFlags.map((flag) => (
            <li key={flag.key}>
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{flag.key}</p>
                    <p className="text-sm text-gray-500">
                      Source: {flag.source}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant={flag.enabled ? "success" : "secondary"}>
                      {flag.enabled ? "Enabled" : "Disabled"}
                    </Badge>
                    {flag.source === "manual" && (
                      <button
                        type="button"
                        className="inline-flex items-center px-3 py-1 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Toggle
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
