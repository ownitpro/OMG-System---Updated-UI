import React from "react";
import { generatePageMetadata } from "@/lib/metadata";

export const metadata = generatePageMetadata({
  title: "System Status - OMGsystems",
  description: "Check the current status of OMGsystems services including API, documentation, and portal access.",
  path: "/status",
  noindex: true,
});

// Mock status data - in production, this would come from your monitoring system
const systemStatus = {
  overall: "operational",
  services: [
    {
      name: "API Services",
      status: "operational",
      uptime: "99.9%",
      lastIncident: null,
    },
    {
      name: "Documentation",
      status: "operational", 
      uptime: "100%",
      lastIncident: null,
    },
    {
      name: "Client Portal",
      status: "operational",
      uptime: "99.8%",
      lastIncident: null,
    },
  ],
  lastUpdated: new Date().toISOString(),
};

function StatusIndicator({ status }: { status: string }) {
  const colors = {
    operational: "bg-green-500",
    degraded: "bg-yellow-500", 
    outage: "bg-red-500",
    maintenance: "bg-blue-500",
  };

  return (
    <div className={`w-3 h-3 rounded-full ${colors[status as keyof typeof colors] || "bg-gray-500"}`} />
  );
}

export default function StatusPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          System Status
        </h1>
        <p className="text-gray-600">
          Real-time status of OMGsystems services and infrastructure.
        </p>
      </div>

      {/* Overall Status */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        <div className="flex items-center gap-3 mb-4">
          <StatusIndicator status={systemStatus.overall} />
          <h2 className="text-xl font-semibold text-gray-900">
            All Systems Operational
          </h2>
        </div>
        <p className="text-gray-600">
          All OMGsystems services are running normally. No incidents reported.
        </p>
      </div>

      {/* Service Status */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Service Status</h3>
        {systemStatus.services.map((service, index) => (
          <div key={index} className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <StatusIndicator status={service.status} />
                <div>
                  <h4 className="font-medium text-gray-900">{service.name}</h4>
                  <p className="text-sm text-gray-600 capitalize">{service.status}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{service.uptime}</p>
                <p className="text-xs text-gray-500">uptime</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Status Legend */}
      <div className="mt-8 bg-gray-50 rounded-lg p-4">
        <h4 className="font-medium text-gray-900 mb-3">Status Legend</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span>Operational</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <span>Degraded</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <span>Outage</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500" />
            <span>Maintenance</span>
          </div>
        </div>
      </div>

      {/* Last Updated */}
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-500">
          Last updated: {new Date(systemStatus.lastUpdated).toLocaleString()}
        </p>
      </div>
    </div>
  );
}
