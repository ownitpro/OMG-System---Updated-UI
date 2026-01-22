'use client';

import { useState, useEffect, use } from 'react';
import { Plus, Search, Filter, Mail } from 'lucide-react';
import { EmailTemplateCard } from '@/components/email-templates/EmailTemplateCard';
import { CreateEditTemplateModal } from '@/components/email-templates/CreateEditTemplateModal';
import { MigrateTemplatesButton } from '@/components/email-templates/MigrateTemplatesButton';
import type { EmailTemplate } from '@/types/email-template';
import { getTemplateCategories } from '@/types/email-template';
import { useAuth } from '@/contexts/AuthContext';

interface PageProps {
  params: Promise<{ orgId: string }>;
}

export default function EmailTemplatesPage({ params }: PageProps) {
  const { orgId } = use(params);
  const { user } = useAuth();

  const [templates, setTemplates] = useState<EmailTemplate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<EmailTemplate | null>(null);

  // Test send modal state
  const [testingTemplate, setTestingTemplate] = useState<EmailTemplate | null>(null);
  const [testEmail, setTestEmail] = useState('');
  const [isSendingTest, setIsSendingTest] = useState(false);
  const [testResult, setTestResult] = useState<string | null>(null);

  // Delete confirmation state
  const [deletingTemplate, setDeletingTemplate] = useState<EmailTemplate | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const categories = getTemplateCategories();

  // Fetch templates
  const fetchTemplates = async () => {
    if (!user?.id) return;

    setIsLoading(true);
    setError(null);

    try {
      const queryParams = new URLSearchParams();
      if (typeFilter) queryParams.append('type', typeFilter);
      if (statusFilter !== 'all') {
        queryParams.append('isActive', (statusFilter === 'active').toString());
      }
      if (searchQuery.trim()) queryParams.append('search', searchQuery.trim());

      const response = await fetch(`/api/org/${orgId}/email-templates?${queryParams}`, {
        headers: {
          'x-user-id': user.id,
        },
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch templates');
      }

      setTemplates(data.templates || []);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch templates');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTemplates();
  }, [orgId, typeFilter, statusFilter, searchQuery, user?.id]);

  const handleCreateNew = () => {
    setEditingTemplate(null);
    setIsModalOpen(true);
  };

  const handleEdit = (template: EmailTemplate) => {
    setEditingTemplate(template);
    setIsModalOpen(true);
  };

  const handleToggleActive = async (template: EmailTemplate) => {
    try {
      const response = await fetch(`/api/org/${orgId}/email-templates/${template.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          isActive: !template.isActive,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to update template');
      }

      await fetchTemplates();
    } catch (err: any) {
      alert(err.message || 'Failed to update template');
    }
  };

  const handleDelete = (template: EmailTemplate) => {
    setDeletingTemplate(template);
  };

  const confirmDelete = async () => {
    if (!deletingTemplate) return;

    setIsDeleting(true);

    try {
      const response = await fetch(`/api/org/${orgId}/email-templates/${deletingTemplate.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to delete template');
      }

      await fetchTemplates();
      setDeletingTemplate(null);
    } catch (err: any) {
      alert(err.message || 'Failed to delete template');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleTestSend = (template: EmailTemplate) => {
    setTestingTemplate(template);
    setTestEmail('');
    setTestResult(null);
  };

  const sendTestEmail = async () => {
    if (!testingTemplate || !testEmail.includes('@')) {
      setTestResult('Please enter a valid email address');
      return;
    }

    setIsSendingTest(true);
    setTestResult(null);

    try {
      const response = await fetch(
        `/api/org/${orgId}/email-templates/${testingTemplate.id}/preview`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            testEmail,
            sampleData: {
              clientName: 'John Smith',
              orgName: 'Acme Corp',
              portalUrl: 'https://app.securevaultdocs.com/portal/abc123',
              pin: '1234',
              fileName: 'contract.pdf',
              expiryDate: 'December 31, 2024',
              dueDate: 'January 15, 2025',
              userName: 'Jane Doe',
              supportEmail: 'support@securevaultdocs.com',
            },
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setTestResult(`✓ Test email sent to ${testEmail}`);
        setTimeout(() => setTestingTemplate(null), 2000);
      } else {
        setTestResult(`✗ ${data.error || 'Failed to send test email'}`);
      }
    } catch (err: any) {
      setTestResult(`✗ ${err.message || 'Failed to send test email'}`);
    } finally {
      setIsSendingTest(false);
    }
  };

  return (
    <main className="container max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Mail className="h-8 w-8 text-[#3b82f6]" />
            Email Templates
          </h1>
          <p className="text-muted-foreground mt-1">
            Customize email notifications and branding
          </p>
        </div>
        <div className="flex items-center gap-3">
          <MigrateTemplatesButton
            orgId={orgId}
            onMigrationComplete={fetchTemplates}
          />
          <button
            onClick={handleCreateNew}
            className="btn btn-primary flex items-center gap-2"
          >
            <Plus className="h-5 w-5" />
            Create Template
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search templates..."
            className="w-full pl-10 pr-4 py-2 rounded-2xl border border-border bg-card focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        {/* Type Filter */}
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="pl-10 pr-8 py-2 rounded-2xl border border-border bg-card focus:outline-none focus:ring-2 focus:ring-ring custom-select dark-mode cursor-pointer min-w-[160px]"
          >
            <option value="">All Types</option>
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-2 p-1 bg-muted rounded-2xl">
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-4 py-1.5 rounded-xl text-sm font-medium transition ${
              statusFilter === 'all'
                ? 'bg-[#3b82f6] text-white'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setStatusFilter('active')}
            className={`px-4 py-1.5 rounded-xl text-sm font-medium transition ${
              statusFilter === 'active'
                ? 'bg-[#3b82f6] text-white'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Active
          </button>
          <button
            onClick={() => setStatusFilter('inactive')}
            className={`px-4 py-1.5 rounded-xl text-sm font-medium transition ${
              statusFilter === 'inactive'
                ? 'bg-[#3b82f6] text-white'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Inactive
          </button>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-red-400">
          {error}
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center py-12">
          <div className="h-8 w-8 border-4 border-white/20 border-t-white rounded-full animate-spin" />
        </div>
      )}

      {/* Templates Grid */}
      {!isLoading && templates.length === 0 && (
        <div className="text-center py-12">
          <Mail className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">No templates found</h3>
          <p className="text-muted-foreground mb-6">
            {searchQuery || typeFilter || statusFilter !== 'all'
              ? 'Try adjusting your filters'
              : 'Get started by creating your first template or migrating from code'}
          </p>
          {!searchQuery && !typeFilter && statusFilter === 'all' && (
            <div className="flex items-center justify-center gap-3">
              <MigrateTemplatesButton
                orgId={orgId}
                onMigrationComplete={fetchTemplates}
              />
              <button
                onClick={handleCreateNew}
                className="btn btn-primary flex items-center gap-2"
              >
                <Plus className="h-5 w-5" />
                Create Template
              </button>
            </div>
          )}
        </div>
      )}

      {!isLoading && templates.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map(template => (
            <EmailTemplateCard
              key={template.id}
              template={template}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onToggleActive={handleToggleActive}
              onTestSend={handleTestSend}
            />
          ))}
        </div>
      )}

      {/* Create/Edit Modal */}
      <CreateEditTemplateModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingTemplate(null);
        }}
        orgId={orgId}
        template={editingTemplate}
        onSave={() => {
          setIsModalOpen(false);
          setEditingTemplate(null);
          fetchTemplates();
        }}
      />

      {/* Test Send Modal */}
      {testingTemplate && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 space-y-4">
            <h3 className="text-xl font-semibold text-gray-900">
              Send Test Email
            </h3>
            <p className="text-sm text-gray-600">
              Test the <strong>{testingTemplate.name}</strong> template
            </p>
            <input
              type="email"
              value={testEmail}
              onChange={(e) => setTestEmail(e.target.value)}
              placeholder="test@example.com"
              className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onKeyDown={(e) => {
                if (e.key === 'Enter') sendTestEmail();
              }}
            />
            {testResult && (
              <div className={`text-sm ${testResult.startsWith('✓') ? 'text-green-600' : 'text-red-600'}`}>
                {testResult}
              </div>
            )}
            <div className="flex gap-3">
              <button
                onClick={() => setTestingTemplate(null)}
                disabled={isSendingTest}
                className="flex-1 px-4 py-2 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={sendTestEmail}
                disabled={isSendingTest}
                className="flex-1 px-4 py-2 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition disabled:opacity-50"
              >
                {isSendingTest ? 'Sending...' : 'Send Test'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deletingTemplate && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 space-y-4">
            <h3 className="text-xl font-semibold text-gray-900">
              Delete Template?
            </h3>
            <p className="text-sm text-gray-600">
              Are you sure you want to delete <strong>{deletingTemplate.name}</strong>? This action cannot be undone.
            </p>
            <div className="rounded-lg bg-amber-50 border border-amber-200 p-3 text-sm text-amber-800">
              <strong>Note:</strong> Emails will fall back to the default hardcoded template after deletion.
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setDeletingTemplate(null)}
                disabled={isDeleting}
                className="flex-1 px-4 py-2 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                disabled={isDeleting}
                className="flex-1 px-4 py-2 rounded-xl bg-red-600 text-white font-medium hover:bg-red-700 transition disabled:opacity-50"
              >
                {isDeleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
