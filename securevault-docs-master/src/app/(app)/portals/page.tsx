'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useOrganization } from '@/contexts/OrganizationContext';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { useToast } from '@/components/shared/ToastContainer';
import { useAccountAccess } from '@/hooks/useAccountAccess';
import { Users, Plus, FolderOpen, Clock, Inbox, CheckCircle2, XCircle, AlertCircle, X, Calendar, FileText, Trash2, User, BarChart3, Upload, Sparkles, Building2, ArrowRight, RefreshCw, Send, Loader2 } from 'lucide-react';
import { templatesByIndustry, type RequestTemplateItem } from '@/data/request-templates';
import DateTimePicker from '@/components/shared/DateTimePicker';
import ConfirmModal from '@/components/shared/ConfirmModal';

type Tab = 'portals' | 'requests';

function PortalsTabs() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isDarkMode } = useTheme();
  const currentTab = (searchParams.get('tab') as Tab) || 'portals';
  const { isPersonalVault } = useOrganization();

  const tabs = [
    { key: 'portals', label: 'Portals', icon: Users },
    // Only show Requests tab for business organizations
    ...(!isPersonalVault ? [{ key: 'requests', label: 'Requests', icon: Inbox }] : []),
  ];

  const handleTabChange = (tabKey: string) => {
    router.push(`/portals?tab=${tabKey}`);
  };

  return (
    <div className="border-b border-white/10 dark:border-white/5 mb-6">
      <nav className="flex gap-4 overflow-x-auto" aria-label="Portals navigation">
        {tabs.map((tab) => {
          const isActive = currentTab === tab.key;
          const Icon = tab.icon;
          return (
            <button
              key={tab.key}
              onClick={() => handleTabChange(tab.key)}
              className={`relative flex items-center gap-2 pb-3 px-1 text-sm font-medium transition-all ${
                isActive
                  ? 'text-teal-500 dark:text-teal-400'
                  : 'text-white/50 dark:text-slate-400 hover:text-white/70 dark:hover:text-slate-300'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
              {isActive && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-teal-500 to-teal-400 rounded-full" />
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
}

function PortalsView() {
  const { activeOrg, isPersonalVault } = useOrganization();
  const { user } = useAuth();
  const { isDarkMode } = useTheme();
  const { showToast } = useToast();
  const router = useRouter();
  const [portals, setPortals] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  // Delete portal state
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);
  const [portalToDelete, setPortalToDelete] = React.useState<any>(null);
  const [deleting, setDeleting] = React.useState(false);

  React.useEffect(() => {
    const fetchPortals = async () => {
      if (!activeOrg?.id || !user?.id) return;

      setLoading(true);
      try {
        const endpoint = isPersonalVault
          ? '/api/personal/portals'
          : `/api/org/${activeOrg.id}/portals`;

        const response = await fetch(endpoint, {
          headers: {
            'x-user-id': user.id,
          },
        });
        if (response.ok) {
          const data = await response.json();
          // Handle various response formats: array, {items: []}, or {portals: []}
          setPortals(Array.isArray(data) ? data : data.portals || data.items || []);
        }
      } catch (error) {
        console.error('Error fetching portals:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPortals();
  }, [activeOrg?.id, isPersonalVault, user?.id]);

  const handleDeletePortal = async () => {
    if (!portalToDelete?.id || !activeOrg?.id) return;

    setDeleting(true);
    try {
      const response = await fetch(`/api/portals/${portalToDelete.id}`, {
        method: 'DELETE',
        headers: {
          'x-user-id': user?.id || '',
        },
      });

      if (response.ok) {
        setPortals(portals.filter(p => p.id !== portalToDelete.id));
        showToast('Portal deleted successfully', 'success');
      } else {
        const data = await response.json();
        showToast(data.error || 'Failed to delete portal', 'error');
      }
    } catch (error) {
      console.error('Error deleting portal:', error);
      showToast('An error occurred while deleting', 'error');
    } finally {
      setDeleting(false);
      setShowDeleteModal(false);
      setPortalToDelete(null);
    }
  };

  const confirmDeletePortal = (portal: any) => {
    setPortalToDelete(portal);
    setShowDeleteModal(true);
  };

  const formatRelativeTime = (dateString: string | null) => {
    if (!dateString) return 'Never';
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="animate-fadeIn min-h-screen">
      <div className="flex flex-col gap-4 sm:gap-6 mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
          <div>
            <h2 className="text-2xl font-bold text-white dark:text-white font-display">
              Client Portals
            </h2>
            <p className="text-sm font-medium text-white/90 dark:text-slate-200 mt-1">
              Create and manage secure client portals
            </p>
          </div>
          <button
            onClick={() => router.push('/portals/new')}
            className="flex items-center justify-center gap-2 px-5 py-2.5 min-h-[44px] btn-enhanced-primary rounded-xl shadow-lg shadow-teal-500/25 hover:shadow-teal-500/40 hover:scale-[1.02] transition-all duration-300 text-sm font-bold tracking-wide"
          >
            <Plus className="w-5 h-5" />
            New Portal
          </button>
        </div>

        {/* Quick Action Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            onClick={() => router.push('/portals/analytics')}
            className="group flex items-center gap-4 p-5 glass-card hover:scale-[1.02] transition-all duration-300 text-left"
          >
            <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform duration-300">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-white dark:text-white text-lg">Analytics</h3>
              <p className="text-sm text-white/80 dark:text-slate-200 font-medium">View portal metrics</p>
            </div>
          </button>

          <button
            onClick={() => router.push('/portals/bulk-create')}
            className="group flex items-center gap-4 p-5 glass-card hover:scale-[1.02] transition-all duration-300 text-left"
          >
            <div className="p-3 rounded-xl bg-gradient-to-br from-teal-500 to-teal-600 shadow-lg shadow-teal-500/20 group-hover:scale-110 transition-transform duration-300">
              <Upload className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-white dark:text-white text-lg">Bulk Create</h3>
              <p className="text-sm text-white/80 dark:text-slate-200 font-medium">Upload CSV to create multiple</p>
            </div>
          </button>
        </div>

        {/* Mobile-only divider */}
        <div className="sm:hidden h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-700 to-transparent" />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div className="glass-card p-6 hover:translate-y-[-2px] transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-white dark:text-white">Active Portals</p>
              <p className="text-3xl font-black text-white dark:text-white mt-2 font-display">{portals.length}</p>
            </div>
            <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg shadow-blue-500/20">
              <Users className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="glass-card p-6 hover:translate-y-[-2px] transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-white dark:text-white">Documents</p>
              <p className="text-3xl font-black text-white dark:text-white mt-2 font-display">0</p>
            </div>
            <div className="p-3 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 shadow-lg shadow-amber-500/20">
              <FolderOpen className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="glass-card p-6 hover:translate-y-[-2px] transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-white dark:text-white">Activity</p>
              <p className="text-3xl font-black text-white dark:text-white mt-2 font-display">0</p>
            </div>
            <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 shadow-lg shadow-purple-500/20">
              <Clock className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Portals List */}
      <div className="glass-card overflow-hidden">
        {loading ? (
          <div className="p-12 text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-white border-r-transparent"></div>
            <p className="mt-4 text-sm text-white dark:text-white">Loading portals...</p>
          </div>
        ) : portals.length === 0 ? (
          <div className="p-16 text-center">
            <div className="inline-flex p-4 rounded-2xl mb-4 bg-teal-500/10">
              <Sparkles className="w-12 h-12 text-teal-500" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-white dark:text-white font-display">
              Set up your first portal
            </h3>
            <p className="text-sm mb-6 max-w-md mx-auto text-white/80 dark:text-slate-200">
              Create a secure client portal to share documents and collect information from your clients seamlessly.
            </p>
            <button
              onClick={() => router.push('/portals/new')}
              className="inline-flex items-center gap-2 px-6 py-3 btn-enhanced-primary rounded-xl shadow-lg shadow-teal-500/25 hover:shadow-teal-500/40 hover:scale-[1.02] transition-all duration-300 text-sm font-bold tracking-wide"
            >
              <Plus className="w-5 h-5" />
              Create Portal
            </button>
          </div>
        ) : (
          <div className="divide-y divide-white/10 dark:divide-white/5">
            {portals.map((portal, index) => (
              <div
                key={portal.id}
                className="p-6 hover:bg-white/5 transition-colors"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-bold text-white dark:text-white text-lg font-display">
                        {portal.title || portal.externalName || portal.name}
                      </h3>
                      <span className="px-2 py-0.5 text-xs font-bold rounded bg-teal-500/10 text-teal-600 dark:text-teal-400 uppercase tracking-wider">
                        Active
                      </span>
                    </div>

                    <p className="text-sm text-white/70 dark:text-slate-200">
                      {portal.clientEmail || portal.client?.email || portal.email}
                    </p>

                    <div className="flex items-center gap-4 mt-3 text-sm text-white/60 dark:text-slate-300 font-medium">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4" />
                        Created {new Date(portal.createdAt).toLocaleDateString()}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1.5">
                        <FolderOpen className="w-4 h-4" />
                        {portal.documentCount || 0} {portal.documentCount === 1 ? 'document' : 'documents'}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1.5">
                        <Upload className="w-4 h-4" />
                        Last upload: {formatRelativeTime(portal.lastUploadAt)}
                      </span>
                    </div>
                  </div>

                  <div className="ml-4 flex items-center gap-2">
                    <button
                      onClick={() => router.push(`/portals/${portal.id}`)}
                      className="px-4 py-2 text-sm font-semibold rounded-lg transition-colors bg-white/40 hover:bg-white/60 text-white border border-white/30"
                    >
                      View Details
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        confirmDeletePortal(portal);
                      }}
                      className="p-2 rounded-lg transition-colors text-slate-400 hover:text-red-500 hover:bg-red-500/10"
                      title="Delete portal"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delete Portal Confirmation Modal */}
      <ConfirmModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setPortalToDelete(null);
        }}
        onConfirm={handleDeletePortal}
        title="Delete Portal"
        message={`Are you sure you want to delete the portal "${portalToDelete?.name || portalToDelete?.title || 'this portal'}"? This will also delete all associated documents and submissions. This action cannot be undone.`}
        confirmText="Delete Portal"
        cancelText="Cancel"
        variant="danger"
        loading={deleting}
      />
    </div>
  );
}

function RequestsView() {
  const { activeOrg, isPersonalVault } = useOrganization();
  const { user } = useAuth();
  const { isDarkMode } = useTheme();
  const { showToast } = useToast();
  const searchParams = useSearchParams();
  const action = searchParams.get('action');

  const [requests, setRequests] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [showCreateModal, setShowCreateModal] = React.useState(false);
  const [showDetailsModal, setShowDetailsModal] = React.useState(false);
  const [selectedRequest, setSelectedRequest] = React.useState<any>(null);

  // Create request modal state
  const [selectedIndustry, setSelectedIndustry] = React.useState<string>('');
  const [selectedTemplate, setSelectedTemplate] = React.useState<string>('');
  const [clientName, setClientName] = React.useState('');
  const [clientEmail, setClientEmail] = React.useState('');
  const [clientPin, setClientPin] = React.useState('');
  const [dueDate, setDueDate] = React.useState('');
  const [customItems, setCustomItems] = React.useState<RequestTemplateItem[]>([]);
  const [newItemLabel, setNewItemLabel] = React.useState('');
  const [creating, setCreating] = React.useState(false);

  // Delete request state
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);
  const [requestToDelete, setRequestToDelete] = React.useState<any>(null);
  const [deleting, setDeleting] = React.useState(false);

  // Details modal item management state
  const [newItemLabelDetails, setNewItemLabelDetails] = React.useState('');
  const [addingItem, setAddingItem] = React.useState(false);
  const [sendingReminder, setSendingReminder] = React.useState(false);
  const [deletingItemId, setDeletingItemId] = React.useState<string | null>(null);
  const [reRequestingItemId, setReRequestingItemId] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (action === 'new') {
      setShowCreateModal(true);
    }
  }, [action]);

  React.useEffect(() => {
    // Only load requests for business organizations, not personal vaults
    if (activeOrg && !isPersonalVault && user?.id) {
      loadRequests();
    } else {
      setLoading(false);
    }
  }, [activeOrg, isPersonalVault, user?.id]);

  const loadRequests = async () => {
    if (!activeOrg?.id || !user?.id) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      // Fetch requests from API
      const response = await fetch(`/api/org/${activeOrg.id}/requests`, {
        headers: {
          'x-user-id': user.id,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch requests');
      }

      const data = await response.json();
      setRequests(data.requests || []);
    } catch (error) {
      console.error('Error loading requests:', error);
      showToast('Failed to load requests', 'error');
      setRequests([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteRequest = async () => {
    if (!requestToDelete?.id) return;

    setDeleting(true);
    try {
      const response = await fetch(`/api/org/requests/${requestToDelete.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setRequests(requests.filter(r => r.id !== requestToDelete.id));
        showToast('Request deleted successfully', 'success');
      } else {
        const data = await response.json();
        showToast(data.error || 'Failed to delete request', 'error');
      }
    } catch (error) {
      console.error('Error deleting request:', error);
      showToast('An error occurred while deleting', 'error');
    } finally {
      setDeleting(false);
      setShowDeleteModal(false);
      setRequestToDelete(null);
    }
  };

  const confirmDeleteRequest = (request: any) => {
    setRequestToDelete(request);
    setShowDeleteModal(true);
  };

  // Handle adding a new item to the request
  const handleAddItem = async () => {
    if (!selectedRequest?.portalId || !newItemLabelDetails.trim()) return;

    setAddingItem(true);
    try {
      const response = await fetch(`/api/org/requests/${selectedRequest.portalId}/items`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ label: newItemLabelDetails.trim(), required: false }),
      });

      if (response.ok) {
        const data = await response.json();
        // Update the selected request with new item (use key for consistency with GET response)
        const newItem = { key: data.item.id, label: data.item.label, required: false, uploaded: false };
        setSelectedRequest({
          ...selectedRequest,
          items: [...selectedRequest.items, newItem],
        });
        // Also update in the main requests list
        setRequests(requests.map(r =>
          r.id === selectedRequest.id
            ? { ...r, items: [...r.items, newItem] }
            : r
        ));
        setNewItemLabelDetails('');
        showToast('Item added successfully', 'success');
      } else {
        const error = await response.json();
        showToast(error.error || 'Failed to add item', 'error');
      }
    } catch (error) {
      console.error('Error adding item:', error);
      showToast('Failed to add item', 'error');
    } finally {
      setAddingItem(false);
    }
  };

  // Handle deleting an item from the request
  const handleDeleteItem = async (itemId: string) => {
    if (!selectedRequest?.portalId) return;

    setDeletingItemId(itemId);
    try {
      const response = await fetch(`/api/org/requests/${selectedRequest.portalId}/items?itemId=${itemId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Update the selected request (items use 'key' not 'id')
        const updatedItems = selectedRequest.items.filter((i: any) => i.key !== itemId);
        setSelectedRequest({ ...selectedRequest, items: updatedItems });
        // Also update in the main requests list
        setRequests(requests.map(r =>
          r.id === selectedRequest.id
            ? { ...r, items: updatedItems }
            : r
        ));
        showToast('Item deleted successfully', 'success');
      } else {
        const error = await response.json();
        showToast(error.error || 'Failed to delete item', 'error');
      }
    } catch (error) {
      console.error('Error deleting item:', error);
      showToast('Failed to delete item', 'error');
    } finally {
      setDeletingItemId(null);
    }
  };

  // Handle re-requesting an item (clear uploaded status)
  const handleReRequestItem = async (itemId: string) => {
    if (!selectedRequest?.portalId) return;

    setReRequestingItemId(itemId);
    try {
      const response = await fetch(`/api/org/requests/${selectedRequest.portalId}/items`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ itemId, action: 're-request' }),
      });

      if (response.ok) {
        // Update the selected request (items use 'key' not 'id')
        const updatedItems = selectedRequest.items.map((i: any) =>
          i.key === itemId ? { ...i, uploaded: false } : i
        );
        setSelectedRequest({ ...selectedRequest, items: updatedItems });
        // Also update in the main requests list
        setRequests(requests.map(r =>
          r.id === selectedRequest.id
            ? { ...r, items: updatedItems }
            : r
        ));
        showToast('Item re-requested successfully', 'success');
      } else {
        const error = await response.json();
        showToast(error.error || 'Failed to re-request item', 'error');
      }
    } catch (error) {
      console.error('Error re-requesting item:', error);
      showToast('Failed to re-request item', 'error');
    } finally {
      setReRequestingItemId(null);
    }
  };

  // Handle sending a reminder email
  const handleSendReminder = async () => {
    if (!selectedRequest?.portalId) return;

    setSendingReminder(true);
    try {
      const response = await fetch(`/api/org/requests/${selectedRequest.portalId}/remind`, {
        method: 'POST',
      });

      if (response.ok) {
        showToast('Reminder email sent successfully', 'success');
      } else {
        const error = await response.json();
        showToast(error.error || 'Failed to send reminder', 'error');
      }
    } catch (error) {
      console.error('Error sending reminder:', error);
      showToast('Failed to send reminder', 'error');
    } finally {
      setSendingReminder(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'complete':
        return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case 'partial':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      case 'open':
        return <Clock className="w-5 h-5 text-blue-500" />;
      default:
        return <XCircle className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'complete':
        return 'Complete';
      case 'partial':
        return 'In Progress';
      case 'open':
        return 'Waiting';
      case 'closed':
        return 'Closed';
      default:
        return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'complete':
        return isDarkMode ? 'bg-green-500/20 text-green-400' : 'bg-green-100 text-green-800';
      case 'partial':
        return isDarkMode ? 'bg-yellow-500/20 text-yellow-400' : 'bg-yellow-100 text-yellow-800';
      case 'open':
        return isDarkMode ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-800';
      default:
        return isDarkMode ? 'bg-slate-700 text-slate-400' : 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const getProgress = (items: any[]) => {
    const uploaded = items.filter(i => i.uploaded).length;
    return { uploaded, total: items.length, percentage: Math.round((uploaded / items.length) * 100) };
  };

  const industries = Object.keys(templatesByIndustry);

  const getTemplatesForIndustry = () => {
    if (!selectedIndustry) return [];
    return templatesByIndustry[selectedIndustry] || [];
  };

  const getSelectedTemplateData = () => {
    const templates = getTemplatesForIndustry();
    return templates.find(t => t.key === selectedTemplate);
  };

  const handleTemplateChange = (templateKey: string) => {
    setSelectedTemplate(templateKey);
    const template = getTemplatesForIndustry().find(t => t.key === templateKey);
    if (template) {
      setCustomItems(template.items.map(item => ({ ...item })));
    }
  };

  const handleAddCustomItem = () => {
    if (!newItemLabel.trim()) return;
    setCustomItems([...customItems, { key: newItemLabel.toLowerCase().replace(/\s+/g, '_'), label: newItemLabel, required: false }]);
    setNewItemLabel('');
  };

  const handleRemoveItem = (index: number) => {
    setCustomItems(customItems.filter((_, i) => i !== index));
  };

  const handleToggleRequired = (index: number) => {
    const updated = [...customItems];
    if (updated[index]) {
      updated[index].required = !updated[index].required;
      setCustomItems(updated);
    }
  };

  const resetModalForm = () => {
    setSelectedIndustry('');
    setSelectedTemplate('');
    setClientName('');
    setClientEmail('');
    setClientPin('');
    setDueDate('');
    setCustomItems([]);
    setNewItemLabel('');
  };

  const handleCreateRequest = async () => {
    // Validation
    if (!clientName.trim()) {
      showToast('Please enter client name', 'error');
      return;
    }
    if (!clientEmail.trim()) {
      showToast('Please enter client email', 'error');
      return;
    }
    if (!clientPin.trim()) {
      showToast('Please enter a PIN for the portal', 'error');
      return;
    }
    if (customItems.length === 0) {
      showToast('Please add at least one document item', 'error');
      return;
    }

    if (!user?.id) {
      showToast('Not authenticated', 'error');
      return;
    }

    if (!activeOrg?.id) {
      showToast('No organization selected', 'error');
      return;
    }

    try {
      setCreating(true);

      // Step 1: Create a portal for this client first
      const portalResponse = await fetch(`/api/org/${activeOrg.id}/portals`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': user.id,
        },
        body: JSON.stringify({
          name: `${clientName} - Document Request`,
          clientEmail: clientEmail,
          pin: clientPin, // PIN is required
        }),
      });

      if (!portalResponse.ok) {
        const errorData = await portalResponse.json();
        throw new Error(errorData.error || 'Failed to create portal');
      }

      const portalData = await portalResponse.json();
      const portalId = portalData.portal?.id;

      if (!portalId) {
        throw new Error('Failed to get portal ID');
      }

      // Step 2: Create request linked to the new portal
      const response = await fetch(`/api/org/${activeOrg.id}/requests`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': user.id,
        },
        body: JSON.stringify({
          portalId: portalId,
          templateKey: selectedTemplate || 'custom',
          items: customItems,
          dueAt: dueDate || null,
          clientName,
          clientEmail,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create request');
      }

      showToast('Document request created successfully!', 'success');
      setShowCreateModal(false);
      resetModalForm();
      await loadRequests();
    } catch (error) {
      console.error('Error creating request:', error);
      showToast('Failed to create request', 'error');
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="animate-fadeIn">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Document Requests
          </h2>
          <p className={`text-sm mt-1 ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>
            Request documents from clients through portals
          </p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-xl hover:from-blue-700 hover:to-blue-600 shadow-lg shadow-blue-500/25 transition-all duration-300 hover:shadow-blue-500/40 hover:scale-[1.02]"
        >
          <Plus className="w-4 h-4" />
          New Request
        </button>
      </div>

      {/* Stats */}
      {!loading && requests.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className={`border rounded-xl p-5 transition-all duration-300 hover:scale-[1.02] ${
            isDarkMode
              ? 'bg-gradient-to-br from-slate-800/80 to-slate-800/40 border-slate-700'
              : 'bg-white border-gray-200 hover:shadow-lg'
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>Total Requests</p>
                <p className={`text-2xl font-bold mt-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{requests.length}</p>
              </div>
              <div className={`p-2.5 rounded-xl ${isDarkMode ? 'bg-blue-500/20' : 'bg-blue-100'}`}>
                <Inbox className={`w-6 h-6 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
              </div>
            </div>
          </div>

          <div className={`border rounded-xl p-5 transition-all duration-300 hover:scale-[1.02] ${
            isDarkMode
              ? 'bg-gradient-to-br from-slate-800/80 to-slate-800/40 border-slate-700'
              : 'bg-white border-gray-200 hover:shadow-lg'
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>Waiting</p>
                <p className={`text-2xl font-bold mt-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {requests.filter(r => r.status === 'open').length}
                </p>
              </div>
              <div className={`p-2.5 rounded-xl ${isDarkMode ? 'bg-blue-500/20' : 'bg-blue-100'}`}>
                <Clock className={`w-6 h-6 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
              </div>
            </div>
          </div>

          <div className={`border rounded-xl p-5 transition-all duration-300 hover:scale-[1.02] ${
            isDarkMode
              ? 'bg-gradient-to-br from-slate-800/80 to-slate-800/40 border-slate-700'
              : 'bg-white border-gray-200 hover:shadow-lg'
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>In Progress</p>
                <p className={`text-2xl font-bold mt-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {requests.filter(r => r.status === 'partial').length}
                </p>
              </div>
              <div className={`p-2.5 rounded-xl ${isDarkMode ? 'bg-yellow-500/20' : 'bg-yellow-100'}`}>
                <AlertCircle className={`w-6 h-6 ${isDarkMode ? 'text-yellow-400' : 'text-yellow-600'}`} />
              </div>
            </div>
          </div>

          <div className={`border rounded-xl p-5 transition-all duration-300 hover:scale-[1.02] ${
            isDarkMode
              ? 'bg-gradient-to-br from-slate-800/80 to-slate-800/40 border-slate-700'
              : 'bg-white border-gray-200 hover:shadow-lg'
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>Complete</p>
                <p className={`text-2xl font-bold mt-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {requests.filter(r => r.status === 'complete').length}
                </p>
              </div>
              <div className={`p-2.5 rounded-xl ${isDarkMode ? 'bg-green-500/20' : 'bg-green-100'}`}>
                <CheckCircle2 className={`w-6 h-6 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`} />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Requests List */}
      <div className="glass-card overflow-hidden mt-8">
        {loading ? (
          <div className="p-12 text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-teal-500 border-r-transparent"></div>
            <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">Loading requests...</p>
          </div>
        ) : requests.length === 0 ? (
          <div className="p-16 text-center">
            <div className="inline-flex p-4 rounded-2xl mb-4 bg-teal-500/10">
              <Inbox className="w-12 h-12 text-teal-500" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-navy dark:text-white font-display">
              No requests yet
            </h3>
            <p className="text-sm mb-6 max-w-md mx-auto text-slate-500 dark:text-slate-400">
              Create your first document request to start collecting documents from clients
            </p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="inline-flex items-center gap-2 px-6 py-3 btn-enhanced-primary rounded-xl shadow-lg shadow-teal-500/25 hover:shadow-teal-500/40 hover:scale-[1.02] transition-all duration-300 text-sm font-bold tracking-wide"
            >
              <Plus className="w-5 h-5" />
              Create Request
            </button>
          </div>
        ) : (
          <div className="divide-y divide-white/10 dark:divide-white/5">
            {requests.map((request) => {
              const progress = getProgress(request.items);
              const isDue = request.dueAt && new Date(request.dueAt) < new Date();

              return (
                <div key={request.id} className="p-6 hover:bg-white/5 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        {getStatusIcon(request.status)}
                        <h3 className="font-bold text-navy dark:text-white text-lg font-display">{request.title}</h3>
                        <span className={`px-2 py-0.5 text-xs font-bold rounded uppercase tracking-wider ${getStatusColor(request.status)}`}>
                          {getStatusText(request.status)}
                        </span>
                        {isDue && (
                          <span className="px-2 py-0.5 text-xs font-bold rounded bg-red-500/10 text-red-500 uppercase tracking-wider">
                            Overdue
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-4 text-sm mb-4 text-slate-400 dark:text-slate-500 font-medium">
                        <span>Client: {request.clientName}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-4 h-4" />
                          Created {formatDate(request.createdAt)}
                        </span>
                        {request.dueAt && (
                          <>
                            <span>•</span>
                            <span className="flex items-center gap-1.5">
                              <Clock className="w-4 h-4" />
                              Due {formatDate(request.dueAt)}
                            </span>
                          </>
                        )}
                      </div>

                      {/* Progress Bar */}
                      <div className="mb-4">
                        <div className="flex items-center justify-between text-sm mb-2">
                          <span className="text-slate-500 dark:text-slate-400 font-medium">
                            {progress.uploaded} of {progress.total} documents uploaded
                          </span>
                          <span className="font-bold text-navy dark:text-white">{progress.percentage}%</span>
                        </div>
                        <div className="w-full rounded-full h-2 bg-slate-100 dark:bg-slate-700/50">
                          <div
                            className={`h-2 rounded-full transition-all ${
                              progress.percentage === 100 ? 'bg-green-500' : 'bg-blue-500'
                            }`}
                            style={{ width: `${progress.percentage}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* Document Items */}
                      <div className="flex flex-wrap gap-2">
                        {request.items.map((item: any) => (
                          <span
                            key={item.key}
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border ${
                              item.uploaded
                                ? 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20'
                                : item.required
                                ? 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700'
                                : 'bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-500 border-slate-200 dark:border-slate-700/50'
                            }`}
                          >
                            {item.uploaded && <CheckCircle2 className="w-3 h-3" />}
                            {item.label}
                            {item.required && !item.uploaded && <span className="text-red-500">*</span>}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="ml-4 flex items-center gap-2">
                      <button
                        onClick={() => {
                          setSelectedRequest(request);
                          setShowDetailsModal(true);
                        }}
                        className="px-4 py-2 text-sm font-semibold rounded-lg transition-colors bg-slate-100 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                      >
                        View Details
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          confirmDeleteRequest(request);
                        }}
                        className="p-2 rounded-lg transition-colors text-slate-400 hover:text-red-500 hover:bg-red-500/10"
                        title="Delete request"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Create Request Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-[9999] p-4 sm:p-6 animate-fadeIn">
          <div className="rounded-2xl p-6 sm:p-8 max-w-3xl w-full max-h-[85vh] overflow-y-auto shadow-2xl animate-slideUp bg-white border border-slate-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-900 font-display">Create Document Request</h2>
              <button
                onClick={() => {
                  setShowCreateModal(false);
                  resetModalForm();
                }}
                className="p-2 rounded-lg transition-colors text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Client Information */}
              <div>
                <h3 className="text-sm font-bold mb-3 text-slate-900">Client Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold mb-2 text-slate-900">
                      Client Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder="John Smith"
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2 text-slate-900">
                      Client Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                      placeholder="john@example.com"
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all font-medium"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-bold mb-2 text-slate-900">
                    Portal PIN <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={clientPin}
                    onChange={(e) => setClientPin(e.target.value)}
                    placeholder="e.g., 1234"
                    maxLength={20}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all font-medium"
                  />
                  <p className="text-xs mt-2 text-slate-600 font-medium">
                    The client will need to enter this PIN to access the portal. The PIN will be emailed to them.
                  </p>
                </div>
              </div>

              {/* Template Selection */}
              <div>
                <h3 className="text-sm font-bold mb-3 text-slate-900">Document Template (Optional)</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold mb-2 text-slate-900">Industry</label>
                    <select
                      value={selectedIndustry}
                      onChange={(e) => {
                        setSelectedIndustry(e.target.value);
                        setSelectedTemplate('');
                        setCustomItems([]);
                      }}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all font-medium [&>option]:text-slate-900 [&>option]:bg-white"
                    >
                      <option value="">Select industry...</option>
                      {industries.map((industry) => (
                        <option key={industry} value={industry}>
                          {industry}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2 text-slate-900">Template</label>
                    <select
                      value={selectedTemplate}
                      onChange={(e) => handleTemplateChange(e.target.value)}
                      disabled={!selectedIndustry}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed [&>option]:text-slate-900 [&>option]:bg-white"
                    >
                      <option value="">Select template...</option>
                      {getTemplatesForIndustry().map((template) => (
                        <option key={template.key} value={template.key}>
                          {template.title}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                {getSelectedTemplateData()?.description && (
                  <p className="text-sm mt-2 text-slate-600 font-medium">{getSelectedTemplateData()?.description}</p>
                )}
              </div>

              {/* Due Date */}
              <div className="p-5 border rounded-2xl transition-colors bg-slate-50 border-slate-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-1.5 rounded-lg bg-teal-500/10">
                    <Calendar className="w-4 h-4 text-teal-600" />
                  </div>
                  <label className="text-sm font-bold text-slate-900">
                    Due Date (Optional)
                  </label>
                </div>
                <p className="text-xs mb-3 text-slate-600 font-medium">
                  Set a deadline for when documents should be submitted
                </p>
                <DateTimePicker
                  value={dueDate}
                  onChange={setDueDate}
                  min={new Date().toISOString().slice(0, 16)}
                  placeholder="Select due date and time"
                />
              </div>

              {/* Document Items */}
              <div>
                <h3 className="text-sm font-bold mb-3 text-slate-900">
                  Requested Documents <span className="text-red-500">*</span>
                </h3>

                {/* Current Items */}
                {customItems.length > 0 ? (
                  <div className="space-y-2 mb-4">
                    {customItems.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 border rounded-xl bg-slate-50 border-slate-200"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-bold text-slate-900">{item.label}</span>
                          {item.required && (
                            <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-teal-500/10 text-teal-600">
                              Required
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleToggleRequired(index)}
                            className="px-3 py-1.5 text-xs font-semibold border rounded-lg transition-colors border-slate-300 hover:bg-slate-100 text-slate-700"
                          >
                            {item.required ? 'Make Optional' : 'Make Required'}
                          </button>
                          <button
                            onClick={() => handleRemoveItem(index)}
                            className="p-1.5 rounded-lg transition-colors text-red-600 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 border-2 border-dashed rounded-xl mb-4 border-slate-300 bg-slate-50">
                    <FileText className="w-8 h-8 mx-auto mb-2 text-slate-400" />
                    <p className="text-sm text-slate-600 font-medium">No documents added yet</p>
                    <p className="text-xs mt-1 text-slate-500">Select a template or add custom documents below</p>
                  </div>
                )}

                {/* Add Custom Item */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newItemLabel}
                    onChange={(e) => setNewItemLabel(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddCustomItem()}
                    placeholder="Enter document name (e.g., W-2, Invoice, Contract)"
                    className="flex-1 px-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all font-medium"
                  />
                  <button
                    onClick={handleAddCustomItem}
                    className="px-4 py-3 border rounded-xl transition-colors bg-teal-500 border-teal-500 text-white hover:bg-teal-600 font-bold"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 mt-6 pt-6 border-t border-slate-200">
              <button
                onClick={() => {
                  setShowCreateModal(false);
                  resetModalForm();
                }}
                className="px-6 py-3 rounded-xl transition-colors bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold border border-slate-300"
                disabled={creating}
              >
                Cancel
              </button>
              <button
                onClick={handleCreateRequest}
                disabled={creating}
                className="px-6 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-xl hover:from-teal-600 hover:to-teal-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-lg shadow-teal-500/25 transition-all font-bold"
              >
                {creating ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Creating...
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    Create Request
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Request Confirmation Modal */}
      <ConfirmModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setRequestToDelete(null);
        }}
        onConfirm={handleDeleteRequest}
        title="Delete Request"
        message={`Are you sure you want to delete the request for "${requestToDelete?.clientName || 'this client'}"? This action cannot be undone.`}
        confirmText="Delete Request"
        cancelText="Cancel"
        variant="danger"
        loading={deleting}
      />

      {/* Request Details Modal */}
      {showDetailsModal && selectedRequest && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[9999] p-4 animate-fadeIn">
          <div className={`rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-slideUp ${
            isDarkMode ? 'bg-slate-800 border border-slate-700 scrollbar-dark' : 'bg-white'
          }`}>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{selectedRequest.title}</h2>
                <p className={`text-sm mt-1 ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>Request ID: {selectedRequest.id}</p>
              </div>
              <button
                onClick={() => {
                  setShowDetailsModal(false);
                  setSelectedRequest(null);
                }}
                className={`p-2 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-slate-700 text-slate-400' : 'hover:bg-gray-100 text-gray-500'}`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Status and Progress */}
              <div className={`rounded-xl p-4 ${isDarkMode ? 'bg-slate-700/50' : 'bg-gray-50'}`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(selectedRequest.status)}
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedRequest.status)}`}>
                      {getStatusText(selectedRequest.status)}
                    </span>
                  </div>
                  <div className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>
                    {getProgress(selectedRequest.items).uploaded} of {getProgress(selectedRequest.items).total} uploaded
                  </div>
                </div>
                <div className={`w-full rounded-full h-2 ${isDarkMode ? 'bg-slate-600' : 'bg-gray-200'}`}>
                  <div
                    className="bg-blue-500 h-2 rounded-full transition-all"
                    style={{ width: `${getProgress(selectedRequest.items).percentage}%` }}
                  />
                </div>
              </div>

              {/* Client Information */}
              <div>
                <h3 className={`text-sm font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Client Information</h3>
                <div className={`rounded-xl p-4 space-y-2 ${isDarkMode ? 'bg-slate-700/50' : 'bg-gray-50'}`}>
                  <div className="flex items-center gap-2">
                    <User className={`w-4 h-4 ${isDarkMode ? 'text-slate-400' : 'text-gray-400'}`} />
                    <span className={`text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{selectedRequest.clientName || 'Client'}</span>
                  </div>
                </div>
              </div>

              {/* Dates */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className={`text-sm font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Created</h3>
                  <div className={`flex items-center gap-2 text-sm ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>
                    <Calendar className={`w-4 h-4 ${isDarkMode ? 'text-slate-500' : 'text-gray-400'}`} />
                    {formatDate(selectedRequest.createdAt)}
                  </div>
                </div>
                {selectedRequest.dueAt && (
                  <div>
                    <h3 className={`text-sm font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Due Date</h3>
                    <div className={`flex items-center gap-2 text-sm ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>
                      <Calendar className={`w-4 h-4 ${isDarkMode ? 'text-slate-500' : 'text-gray-400'}`} />
                      {formatDate(selectedRequest.dueAt)}
                      {new Date(selectedRequest.dueAt) < new Date() && (
                        <span className="text-red-500 text-xs font-medium">(Overdue)</span>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Document Items */}
              <div>
                <h3 className={`text-sm font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Document Items</h3>
                <div className="space-y-2">
                  {selectedRequest.items.map((item: any, index: number) => (
                    <div
                      key={item.key || index}
                      className={`flex items-center justify-between p-3 rounded-xl ${isDarkMode ? 'bg-slate-700/50' : 'bg-gray-50'}`}
                    >
                      <div className="flex items-center gap-3">
                        {item.uploaded ? (
                          <CheckCircle2 className="w-5 h-5 text-green-500" />
                        ) : (
                          <FileText className={`w-5 h-5 ${isDarkMode ? 'text-slate-400' : 'text-gray-400'}`} />
                        )}
                        <div>
                          <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{item.label}</p>
                          {item.required && (
                            <span className="text-xs text-red-500">Required</span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {item.uploaded ? (
                          <>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${isDarkMode ? 'bg-green-500/20 text-green-400' : 'bg-green-100 text-green-800'}`}>
                              Uploaded
                            </span>
                            <button
                              onClick={() => handleReRequestItem(item.key)}
                              disabled={reRequestingItemId === item.key}
                              title="Re-request (discard current file)"
                              className={`p-1.5 rounded-lg transition-colors ${
                                isDarkMode
                                  ? 'hover:bg-slate-600 text-slate-400 hover:text-yellow-400'
                                  : 'hover:bg-gray-200 text-gray-400 hover:text-yellow-600'
                              } disabled:opacity-50`}
                            >
                              {reRequestingItemId === item.key ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                              ) : (
                                <RefreshCw className="w-4 h-4" />
                              )}
                            </button>
                          </>
                        ) : (
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${isDarkMode ? 'bg-slate-600 text-slate-300' : 'bg-gray-100 text-gray-600'}`}>
                            Pending
                          </span>
                        )}
                        <button
                          onClick={() => handleDeleteItem(item.key)}
                          disabled={deletingItemId === item.key}
                          title="Delete item"
                          className={`p-1.5 rounded-lg transition-colors ${
                            isDarkMode
                              ? 'hover:bg-slate-600 text-slate-400 hover:text-red-400'
                              : 'hover:bg-gray-200 text-gray-400 hover:text-red-600'
                          } disabled:opacity-50`}
                        >
                          {deletingItemId === item.key ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Trash2 className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Add new item */}
                <div className={`mt-4 flex gap-2`}>
                  <input
                    type="text"
                    value={newItemLabelDetails}
                    onChange={(e) => setNewItemLabelDetails(e.target.value)}
                    placeholder="Add new document request..."
                    className={`flex-1 px-3 py-2 rounded-lg border text-sm ${
                      isDarkMode
                        ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400'
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                    } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !addingItem) {
                        handleAddItem();
                      }
                    }}
                  />
                  <button
                    onClick={handleAddItem}
                    disabled={addingItem || !newItemLabelDetails.trim()}
                    className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                      isDarkMode
                        ? 'bg-blue-600 hover:bg-blue-700 text-white disabled:bg-slate-600 disabled:text-slate-400'
                        : 'bg-blue-600 hover:bg-blue-700 text-white disabled:bg-gray-200 disabled:text-gray-400'
                    }`}
                  >
                    {addingItem ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Plus className="w-4 h-4" />
                    )}
                    Add
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className={`flex justify-between gap-3 pt-4 border-t ${isDarkMode ? 'border-slate-700' : 'border-gray-200'}`}>
                <button
                  onClick={handleSendReminder}
                  disabled={sendingReminder}
                  className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                    isDarkMode
                      ? 'bg-blue-600 hover:bg-blue-700 text-white disabled:bg-slate-600 disabled:text-slate-400'
                      : 'bg-blue-600 hover:bg-blue-700 text-white disabled:bg-gray-200 disabled:text-gray-400'
                  }`}
                >
                  {sendingReminder ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                  Send Reminder
                </button>
                <button
                  onClick={() => {
                    setShowDetailsModal(false);
                    setSelectedRequest(null);
                    setNewItemLabelDetails('');
                  }}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    isDarkMode ? 'bg-slate-700 text-slate-300 hover:bg-slate-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Component shown to personal account users who cannot access Client Portals
function PersonalAccountUpgradePrompt() {
  const { isDarkMode } = useTheme();
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  // Dynamically import the modal to avoid SSR issues
  const UpgradeModal = React.lazy(() =>
    import('@/components/account/UpgradeToBusinessModal').then(mod => ({ default: mod.UpgradeToBusinessModal }))
  );

  return (
    <div className="space-y-6">
      <div className="animate-fadeIn">
        <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-white'}`}>
          Client Portals
        </h1>
        <p className={`mt-2 ${isDarkMode ? 'text-slate-400' : 'text-white/80'}`}>
          Manage portals and document requests
        </p>
      </div>

      {/* Upgrade prompt card */}
      <div className="relative overflow-hidden rounded-3xl p-8 sm:p-12 text-center glass-card border-2 border-slate-200 dark:border-white/10 shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -ml-32 -mb-32 pointer-events-none"></div>
        
        <div className="relative z-10">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-8 bg-gradient-to-br from-blue-500 to-indigo-600 shadow-xl shadow-blue-500/30">
            <Building2 className="w-10 h-10 text-white" />
          </div>

          <h2 className="text-3xl font-black mb-4 text-navy dark:text-white font-display text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
            Upgrade to Business
          </h2>

          <p className="text-lg mb-8 max-w-lg mx-auto text-slate-600 dark:text-slate-300 font-medium">
            Client Portals are available for Business accounts. Create secure portals to collect documents from your clients.
          </p>

          <div className="rounded-2xl p-6 mb-8 max-w-md mx-auto bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200 dark:border-white/10">
            <h3 className="font-bold mb-4 text-navy dark:text-white font-display text-lg">
              With a Business account you get:
            </h3>
          <ul className={`text-sm space-y-2 text-left ${isDarkMode ? 'text-slate-300' : 'text-gray-600'}`}>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
              Unlimited Client Portals
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
              Document Request Management
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
              Team Members & Collaboration
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
              Organization Management
            </li>
          </ul>
        </div>

        <button
          onClick={() => setShowUpgradeModal(true)}
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors"
        >
          Upgrade to Business
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
      </div>

      {/* Upgrade Modal */}
      {showUpgradeModal && (
        <Suspense fallback={null}>
          <UpgradeModal
            isOpen={showUpgradeModal}
            onClose={() => setShowUpgradeModal(false)}
          />
        </Suspense>
      )}

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out forwards;
        }
      `}</style>
    </div>
  );
}

function PortalsPageContent() {
  const searchParams = useSearchParams();
  const { isDarkMode } = useTheme();
  const { isPersonalAccount, canAccessClientPortal } = useAccountAccess();
  const tab = (searchParams.get('tab') as Tab) || 'portals';

  // Block personal accounts from accessing Client Portals
  if (isPersonalAccount || !canAccessClientPortal) {
    return <PersonalAccountUpgradePrompt />;
  }

  return (
    <div className="space-y-6">
      <div className="animate-fadeIn">
        <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-white'}`}>
          Client Portals
        </h1>
        <p className={`mt-2 ${isDarkMode ? 'text-slate-400' : 'text-white/80'}`}>
          Manage portals and document requests
        </p>
      </div>

      <PortalsTabs />

      {tab === 'portals' && <PortalsView />}
      {tab === 'requests' && <RequestsView />}

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out forwards;
        }
        .animate-slideUp {
          animation: slideUp 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
}

export default function PortalsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="text-gray-400">Loading portals...</div></div>}>
      <PortalsPageContent />
    </Suspense>
  );
}
