"use client";

import React from "react";
import { useState } from "react";
import { 
  CogIcon,
  BuildingOfficeIcon,
  GlobeAltIcon,
  ShieldCheckIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  XCircleIcon,
  PencilIcon,
  TrashIcon,
  PlusIcon,
  CalendarIcon,
  UserIcon,
  BellIcon,
  KeyIcon
} from "@heroicons/react/24/outline";

interface SystemSetting {
  id: string;
  key: string;
  value: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
}

interface Organization {
  id: string;
  name: string;
  slug: string;
  displayName: string | null;
  timezone: string | null;
  createdAt: Date;
}

interface AdminSettingsIndexProps {
  systemSettings: SystemSetting[];
  organizations: Organization[];
}

export function AdminSettingsIndex({ systemSettings, organizations }: AdminSettingsIndexProps) {
  const [activeTab, setActiveTab] = useState<"system" | "organizations">("system");
  const [showDangerZone, setShowDangerZone] = useState(false);
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [consentPolicy, setConsentPolicy] = useState("");
  const [emailSender, setEmailSender] = useState("");

  const tabs = [
    { id: "system", name: "System Settings", icon: CogIcon },
    { id: "organizations", name: "Organization Settings", icon: BuildingOfficeIcon },
  ];

  const systemSettingsCategories = [
    {
      name: "General",
      icon: CogIcon,
      settings: systemSettings.filter(s => s.key.startsWith('general_')),
    },
    {
      name: "Email",
      icon: BellIcon,
      settings: systemSettings.filter(s => s.key.startsWith('email_')),
    },
    {
      name: "Security",
      icon: ShieldCheckIcon,
      settings: systemSettings.filter(s => s.key.startsWith('security_')),
    },
    {
      name: "Analytics",
      icon: GlobeAltIcon,
      settings: systemSettings.filter(s => s.key.startsWith('analytics_')),
    },
  ];

  const updateSystemSetting = (key: string, value: string) => {
    // In a real app, this would make an API call to update the setting
    console.log('Updating system setting:', key, 'to', value);
    alert(`Setting ${key} updated!`);
  };

  const updateOrganizationSetting = (orgId: string, field: string, value: string) => {
    // In a real app, this would make an API call to update the organization
    console.log('Updating organization setting:', orgId, field, 'to', value);
    alert(`Organization setting updated!`);
  };

  const deleteOrganization = (orgId: string) => {
    // In a real app, this would make an API call to delete the organization
    console.log('Deleting organization:', orgId);
    alert('Organization deleted!');
  };

  const enableMaintenanceMode = () => {
    setMaintenanceMode(true);
    updateSystemSetting('maintenance_mode', 'true');
  };

  const disableMaintenanceMode = () => {
    setMaintenanceMode(false);
    updateSystemSetting('maintenance_mode', 'false');
  };

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="bg-white shadow rounded-lg">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 px-6" aria-label="Tabs">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`${
                    activeTab === tab.id
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
                >
                  <Icon className="h-5 w-5 mr-2" />
                  {tab.name}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="px-6 py-4">
          {/* System Settings Tab */}
          {activeTab === "system" && (
            <div className="space-y-6">
              {/* Maintenance Mode */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <ExclamationTriangleIcon className="h-5 w-5 text-yellow-600 mr-2" />
                    <div>
                      <h3 className="text-sm font-medium text-yellow-800">Maintenance Mode</h3>
                      <p className="text-sm text-yellow-700">
                        Enable maintenance mode to temporarily disable the system for updates
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {maintenanceMode ? (
                      <button
                        onClick={disableMaintenanceMode}
                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                      >
                        <CheckCircleIcon className="h-4 w-4 mr-1" />
                        Disable
                      </button>
                    ) : (
                      <button
                        onClick={enableMaintenanceMode}
                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700"
                      >
                        <ExclamationTriangleIcon className="h-4 w-4 mr-1" />
                        Enable
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Settings Categories */}
              {systemSettingsCategories.map((category) => {
                const Icon = category.icon;
                return (
                  <div key={category.name} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center mb-4">
                      <Icon className="h-5 w-5 text-gray-600 mr-2" />
                      <h3 className="text-lg font-medium text-gray-900">{category.name}</h3>
                    </div>
                    
                    <div className="space-y-4">
                      {category.settings.map((setting) => (
                        <div key={setting.id} className="flex items-center justify-between p-3 bg-white rounded-md">
                          <div className="flex-1">
                            <div className="text-sm font-medium text-gray-900">{setting.key}</div>
                            {setting.description && (
                              <div className="text-sm text-gray-500">{setting.description}</div>
                            )}
                          </div>
                          <div className="flex items-center space-x-2">
                            <input
                              type="text"
                              defaultValue={setting.value}
                              className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
                              onBlur={(e) => updateSystemSetting(setting.key, e.target.value)}
                            />
                            <button className="text-gray-400 hover:text-gray-600">
                              <PencilIcon className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                      
                      {category.settings.length === 0 && (
                        <p className="text-sm text-gray-500 text-center py-4">No settings in this category</p>
                      )}
                    </div>
                  </div>
                );
              })}

              {/* Danger Zone */}
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <ExclamationTriangleIcon className="h-5 w-5 text-red-600 mr-2" />
                    <div>
                      <h3 className="text-sm font-medium text-red-800">Danger Zone</h3>
                      <p className="text-sm text-red-700">
                        Irreversible and destructive actions
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowDangerZone(!showDangerZone)}
                    className="inline-flex items-center px-3 py-2 border border-red-300 text-sm leading-4 font-medium rounded-md text-red-700 bg-white hover:bg-red-50"
                  >
                    {showDangerZone ? "Hide" : "Show"} Danger Zone
                  </button>
                </div>
                
                {showDangerZone && (
                  <div className="mt-4 space-y-3">
                    <div className="flex items-center justify-between p-3 bg-white rounded-md border border-red-200">
                      <div>
                        <div className="text-sm font-medium text-gray-900">Reset All Settings</div>
                        <div className="text-sm text-gray-500">Reset all system settings to defaults</div>
                      </div>
                      <button className="px-3 py-1 border border-red-300 text-sm font-medium rounded-md text-red-700 bg-white hover:bg-red-50">
                        Reset
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-white rounded-md border border-red-200">
                      <div>
                        <div className="text-sm font-medium text-gray-900">Clear All Data</div>
                        <div className="text-sm text-gray-500">Permanently delete all system data</div>
                      </div>
                      <button className="px-3 py-1 border border-red-300 text-sm font-medium rounded-md text-red-700 bg-white hover:bg-red-50">
                        Clear Data
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Organization Settings Tab */}
          {activeTab === "organizations" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">Organizations</h3>
                <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
                  <PlusIcon className="h-4 w-4 mr-2" />
                  Create Organization
                </button>
              </div>

              <div className="space-y-4">
                {organizations.map((org) => (
                  <div key={org.id} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <BuildingOfficeIcon className="h-5 w-5 text-gray-600 mr-2" />
                        <div>
                          <h4 className="text-lg font-medium text-gray-900">{org.name}</h4>
                          <p className="text-sm text-gray-500">Slug: {org.slug}</p>
                        </div>
                      </div>
                      <button className="text-red-400 hover:text-red-600">
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Display Name</label>
                        <input
                          type="text"
                          defaultValue={org.displayName || ""}
                          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          onBlur={(e) => updateOrganizationSetting(org.id, 'displayName', e.target.value)}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Timezone</label>
                        <select
                          defaultValue={org.timezone || "UTC"}
                          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          onChange={(e) => updateOrganizationSetting(org.id, 'timezone', e.target.value)}
                        >
                          <option value="UTC">UTC</option>
                          <option value="America/New_York">Eastern Time</option>
                          <option value="America/Chicago">Central Time</option>
                          <option value="America/Denver">Mountain Time</option>
                          <option value="America/Los_Angeles">Pacific Time</option>
                          <option value="Europe/London">London</option>
                          <option value="Europe/Paris">Paris</option>
                          <option value="Asia/Tokyo">Tokyo</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                      <span>Created {new Date(org.createdAt).toLocaleDateString()}</span>
                      <button
                        onClick={() => deleteOrganization(org.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Delete Organization
                      </button>
                    </div>
                  </div>
                ))}
                
                {organizations.length === 0 && (
                  <div className="text-center py-12">
                    <BuildingOfficeIcon className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No organizations</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Create your first organization to get started.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
