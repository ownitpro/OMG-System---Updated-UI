"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { DataTable } from "@/components/ui/data-table";
import type { Column } from "@/components/ui/data-table";
import {
  FlagIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  EllipsisHorizontalIcon,
  CheckCircleIcon,
  XCircleIcon,
  GlobeAltIcon,
  BuildingOfficeIcon,
} from "@heroicons/react/24/outline";

interface FeatureFlag {
  id: string;
  key: string;
  name: string;
  description: string;
  isGlobal: boolean;
  isEnabled: boolean;
  organizationId: string | null;
  organizationName: string;
  createdAt: string;
  updatedAt?: string;
}

const mockFeatureFlags: FeatureFlag[] = [
  {
    id: "1",
    key: "new_workflow_builder",
    name: "New Workflow Builder",
    description: "Enable the new drag-and-drop workflow builder interface",
    isGlobal: true,
    isEnabled: true,
    organizationId: null,
    organizationName: "Global",
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    key: "advanced_analytics",
    name: "Advanced Analytics",
    description: "Show detailed usage analytics and insights",
    isGlobal: false,
    isEnabled: true,
    organizationId: "org-456",
    organizationName: "TechCorp Inc",
    createdAt: "2024-02-20",
  },
  {
    id: "3",
    key: "beta_integrations",
    name: "Beta Integrations",
    description: "Access to beta API integrations and webhooks",
    isGlobal: false,
    isEnabled: false,
    organizationId: "org-789",
    organizationName: "PropertyMgt Co",
    createdAt: "2024-03-10",
  },
  {
    id: "4",
    key: "ai_chatbot",
    name: "AI Chatbot",
    description: "Enable AI-powered customer support chatbot",
    isGlobal: true,
    isEnabled: false,
    organizationId: null,
    organizationName: "Global",
    createdAt: "2024-04-05",
  },
  {
    id: "5",
    key: "dark_mode",
    name: "Dark Mode",
    description: "Enable dark mode theme for all users",
    isGlobal: true,
    isEnabled: true,
    organizationId: null,
    organizationName: "Global",
    createdAt: "2024-05-01",
  },
];

export default function FeatureFlagsPage() {
  const [featureFlags, setFeatureFlags] = useState<FeatureFlag[]>(mockFeatureFlags);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [newFlag, setNewFlag] = useState({
    key: "",
    name: "",
    description: "",
    isGlobal: true,
    isEnabled: false,
    organizationId: "",
  });

  const handleToggleFlag = (flagId: string) => {
    setFeatureFlags((prev) =>
      prev.map((flag) => (flag.id === flagId ? { ...flag, isEnabled: !flag.isEnabled } : flag))
    );
  };

  const handleAddFlag = () => {
    if (!newFlag.key || !newFlag.name) return;

    const flag: FeatureFlag = {
      id: String(featureFlags.length + 1),
      key: newFlag.key,
      name: newFlag.name,
      description: newFlag.description,
      isGlobal: newFlag.isGlobal,
      isEnabled: newFlag.isEnabled,
      organizationId: newFlag.isGlobal ? null : newFlag.organizationId,
      organizationName: newFlag.isGlobal ? "Global" : "Organization",
      createdAt: new Date().toISOString().split("T")[0],
    };

    setFeatureFlags([...featureFlags, flag]);
    setNewFlag({
      key: "",
      name: "",
      description: "",
      isGlobal: true,
      isEnabled: false,
      organizationId: "",
    });
    setShowAddForm(false);
  };

  const filteredFlags = useMemo(() => {
    if (!searchTerm.trim()) return featureFlags;
    return featureFlags.filter(
      (flag) =>
        flag.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        flag.key.toLowerCase().includes(searchTerm.toLowerCase()) ||
        flag.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        flag.organizationName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [featureFlags, searchTerm]);

  const stats = useMemo(() => {
    const totalFlags = filteredFlags.length;
    const enabledFlags = filteredFlags.filter((f) => f.isEnabled).length;
    const globalFlags = filteredFlags.filter((f) => f.isGlobal).length;
    const orgSpecificFlags = filteredFlags.filter((f) => !f.isGlobal).length;

    return { totalFlags, enabledFlags, globalFlags, orgSpecificFlags };
  }, [filteredFlags]);

  const columns: Column<FeatureFlag>[] = [
    {
      key: "name",
      label: "Feature Flag",
      sortable: true,
      render: (value, row) => (
        <div>
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-gray-900">{value}</span>
            <Badge variant={row.isEnabled ? "success" : "secondary"} className="text-xs">
              {row.isEnabled ? "Enabled" : "Disabled"}
            </Badge>
            <Badge variant={row.isGlobal ? "outline" : "default"} className="text-xs">
              {row.isGlobal ? (
                <>
                  <GlobeAltIcon className="h-3 w-3 mr-1 inline" />
                  Global
                </>
              ) : (
                <>
                  <BuildingOfficeIcon className="h-3 w-3 mr-1 inline" />
                  Org-Specific
                </>
              )}
            </Badge>
          </div>
          <div className="text-sm text-gray-500 mt-1">{row.description}</div>
          <div className="text-xs text-gray-400 mt-1">
            Key: <code className="bg-gray-100 px-1 py-0.5 rounded">{row.key}</code>
          </div>
        </div>
      ),
    },
    {
      key: "organizationName",
      label: "Scope",
      sortable: true,
      render: (value, row) => (
        <div className="flex items-center">
          {row.isGlobal ? (
            <GlobeAltIcon className="h-4 w-4 text-gray-400 mr-2" />
          ) : (
            <BuildingOfficeIcon className="h-4 w-4 text-gray-400 mr-2" />
          )}
          <span className="text-sm">{value}</span>
        </div>
      ),
    },
    {
      key: "isEnabled",
      label: "Status",
      sortable: true,
      render: (value, row) => (
        <div className="flex items-center space-x-2">
          <Switch
            checked={row.isEnabled}
            onCheckedChange={() => handleToggleFlag(row.id)}
            className="data-[state=checked]:bg-primary-600"
          />
          <span className="text-sm text-gray-600">{row.isEnabled ? "Enabled" : "Disabled"}</span>
        </div>
      ),
    },
    {
      key: "createdAt",
      label: "Created",
      sortable: true,
      render: (value) => (
        <span className="text-sm text-gray-600">{new Date(value as string).toLocaleDateString()}</span>
      ),
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Feature Flags</h1>
          <p className="text-gray-600 mt-1">Manage feature flags and system toggles</p>
        </div>
        <Button onClick={() => setShowAddForm(!showAddForm)}>
          <PlusIcon className="mr-2 h-4 w-4" />
          Add Feature Flag
        </Button>
      </div>

      {/* Summary Metrics */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Flags"
          value={stats.totalFlags}
          icon={FlagIcon}
          type="default"
          change={2}
          changeLabel="this month"
          trend="up"
        />
        <MetricCard
          title="Enabled"
          value={stats.enabledFlags}
          icon={CheckCircleIcon}
          type="success"
          change={Math.round((stats.enabledFlags / stats.totalFlags) * 100)}
          changeLabel="of total"
          trend="up"
        />
        <MetricCard
          title="Global Flags"
          value={stats.globalFlags}
          icon={GlobeAltIcon}
          type="default"
          change={1}
          changeLabel="system-wide"
          trend="up"
        />
        <MetricCard
          title="Org-Specific"
          value={stats.orgSpecificFlags}
          icon={BuildingOfficeIcon}
          type="default"
          change={1}
          changeLabel="per organization"
          trend="up"
        />
      </div>

      {/* Add New Feature Flag Form */}
      {showAddForm && (
        <Card variant="default" className="admin-card border-primary-200 bg-primary-50/50">
          <CardHeader>
            <CardTitle>Add New Feature Flag</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="flag-key">Flag Key *</Label>
                <Input
                  id="flag-key"
                  placeholder="e.g., new_feature"
                  value={newFlag.key}
                  onChange={(e) => setNewFlag({ ...newFlag, key: e.target.value })}
                  className="mt-1 admin-input"
                />
              </div>
              <div>
                <Label htmlFor="flag-name">Flag Name *</Label>
                <Input
                  id="flag-name"
                  placeholder="e.g., New Feature"
                  value={newFlag.name}
                  onChange={(e) => setNewFlag({ ...newFlag, name: e.target.value })}
                  className="mt-1 admin-input"
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="flag-description">Description</Label>
                <Input
                  id="flag-description"
                  placeholder="Describe what this flag does"
                  value={newFlag.description}
                  onChange={(e) => setNewFlag({ ...newFlag, description: e.target.value })}
                  className="mt-1 admin-input"
                />
              </div>
              <div>
                <Label htmlFor="flag-org">Organization (leave empty for global)</Label>
                <Input
                  id="flag-org"
                  placeholder="Organization ID"
                  value={newFlag.organizationId}
                  onChange={(e) => setNewFlag({ ...newFlag, organizationId: e.target.value, isGlobal: !e.target.value })}
                  disabled={newFlag.isGlobal}
                  className="mt-1 admin-input"
                />
              </div>
              <div className="flex items-center space-x-2 pt-6">
                <Switch
                  id="flag-global"
                  checked={newFlag.isGlobal}
                  onCheckedChange={(checked) => setNewFlag({ ...newFlag, isGlobal: checked, organizationId: checked ? "" : newFlag.organizationId })}
                />
                <Label htmlFor="flag-global">Global Flag</Label>
              </div>
              <div className="flex items-center space-x-2 pt-6">
                <Switch
                  id="flag-enabled"
                  checked={newFlag.isEnabled}
                  onCheckedChange={(checked) => setNewFlag({ ...newFlag, isEnabled: checked })}
                />
                <Label htmlFor="flag-enabled">Enabled by default</Label>
              </div>
            </div>
            <div className="mt-6 flex space-x-3">
              <Button onClick={handleAddFlag} disabled={!newFlag.key || !newFlag.name}>
                Create Feature Flag
              </Button>
              <Button variant="outline" onClick={() => setShowAddForm(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Search */}
      <Card variant="default" className="admin-card">
        <CardContent className="pt-6">
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search feature flags by name, key, description, or organization..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 admin-input"
            />
          </div>
        </CardContent>
      </Card>

      {/* Feature Flags Table */}
      <Card variant="default" className="admin-card">
        <CardHeader>
          <CardTitle>All Feature Flags ({filteredFlags.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            data={filteredFlags}
            columns={columns}
            keyExtractor={(row) => row.id}
            searchable={false}
            pagination={true}
            pageSize={10}
            selectable={false}
            emptyMessage="No feature flags found matching your criteria."
          />
        </CardContent>
      </Card>
    </div>
  );
}


