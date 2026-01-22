'use client';

import { useState, useEffect } from 'react';
import { X, Save, FileText, Code, Eye, Send } from 'lucide-react';
import type { EmailTemplate, EmailTemplateType, CreateEmailTemplateDto, UpdateEmailTemplateDto } from '@/types/email-template';
import { TEMPLATE_TYPE_INFO, getSuggestedVariables } from '@/types/email-template';
import { TemplateVariableHelper } from './TemplateVariableHelper';
import { TemplatePreviewPane } from './TemplatePreviewPane';

interface CreateEditTemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
  orgId: string;
  template?: EmailTemplate | null;
  onSave: () => void;
}

type TabType = 'details' | 'html' | 'text' | 'preview';

export function CreateEditTemplateModal({
  isOpen,
  onClose,
  orgId,
  template,
  onSave,
}: CreateEditTemplateModalProps) {
  const [activeTab, setActiveTab] = useState<TabType>('details');
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form state
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [slug, setSlug] = useState('');
  const [type, setType] = useState('');
  const [subject, setSubject] = useState('');
  const [htmlContent, setHtmlContent] = useState('');
  const [textContent, setTextContent] = useState('');
  const [variables, setVariables] = useState<string[]>([]);
  const [isActive, setIsActive] = useState(true);

  // Sample data for preview
  const [sampleData, setSampleData] = useState<Record<string, string>>({});

  // Test email state
  const [testEmail, setTestEmail] = useState('');
  const [isSendingTest, setIsSendingTest] = useState(false);
  const [testResult, setTestResult] = useState<string | null>(null);

  const isEditMode = !!template;

  // Initialize form with template data
  useEffect(() => {
    if (template) {
      setName(template.name);
      setDescription(template.description || '');
      setSlug(template.slug);
      setType(template.type);
      setSubject(template.subject);
      setHtmlContent(template.htmlContent);
      setTextContent(template.textContent || '');
      setVariables(template.variables || []);
      setIsActive(template.isActive);
    } else {
      // Reset form for new template
      setName('');
      setDescription('');
      setSlug('');
      setType('');
      setSubject('');
      setHtmlContent('');
      setTextContent('');
      setVariables([]);
      setIsActive(true);
    }
    setError(null);
    setTestResult(null);
  }, [template, isOpen]);

  // Auto-generate slug from name
  useEffect(() => {
    if (!isEditMode && name) {
      const generatedSlug = name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '_')
        .replace(/^_+|_+$/g, '');
      setSlug(generatedSlug);
    }
  }, [name, isEditMode]);

  // Update suggested variables when type changes
  useEffect(() => {
    if (type && !isEditMode) {
      const suggested = getSuggestedVariables(type as EmailTemplateType);
      setVariables(suggested);
    }
  }, [type, isEditMode]);

  // Initialize sample data with examples
  useEffect(() => {
    const initialData: Record<string, string> = {
      clientName: 'John Smith',
      clientEmail: 'john@example.com',
      orgName: 'Acme Corp',
      portalUrl: 'https://app.securevaultdocs.com/portal/abc123',
      pin: '1234',
      fileName: 'contract.pdf',
      documentName: 'Q4 Financial Report',
      requestTitle: 'Tax Documents Request',
      expiryDate: 'December 31, 2024',
      expiryText: 'Expires in 7 days',
      dueDate: 'January 15, 2025',
      itemCount: '5',
      uploadCount: '3',
      userName: 'Jane Doe',
      resetLink: 'https://app.securevaultdocs.com/reset-password?token=xyz',
      loginUrl: 'https://app.securevaultdocs.com/login',
      supportEmail: 'support@securevaultdocs.com',
      daysRemaining: '7',
    };
    setSampleData(initialData);
  }, []);

  const handleSave = async () => {
    setError(null);
    setIsSaving(true);

    try {
      // Validation
      if (!name.trim()) {
        throw new Error('Name is required');
      }
      if (!slug.trim()) {
        throw new Error('Slug is required');
      }
      if (!type.trim()) {
        throw new Error('Type is required');
      }
      if (!subject.trim()) {
        throw new Error('Subject is required');
      }
      if (!htmlContent.trim()) {
        throw new Error('HTML content is required');
      }

      const url = isEditMode
        ? `/api/org/${orgId}/email-templates/${template.id}`
        : `/api/org/${orgId}/email-templates`;

      const method = isEditMode ? 'PATCH' : 'POST';

      const body: CreateEmailTemplateDto | UpdateEmailTemplateDto = isEditMode
        ? {
            name,
            description: description || undefined,
            subject,
            htmlContent,
            textContent: textContent || undefined,
            variables,
            isActive,
          }
        : {
            name,
            description: description || undefined,
            slug,
            type,
            subject,
            htmlContent,
            textContent: textContent || undefined,
            variables,
            isActive,
          };

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to save template');
      }

      onSave();
      onClose();
    } catch (err: any) {
      setError(err.message || 'Failed to save template');
    } finally {
      setIsSaving(false);
    }
  };

  const handleSendTest = async () => {
    if (!testEmail || !testEmail.includes('@')) {
      setTestResult('Please enter a valid email address');
      return;
    }

    setIsSendingTest(true);
    setTestResult(null);

    try {
      const response = await fetch(
        `/api/org/${orgId}/email-templates/${template?.id}/preview`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            testEmail,
            sampleData,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setTestResult(`✓ Test email sent to ${testEmail}`);
      } else {
        setTestResult(`✗ ${data.error || 'Failed to send test email'}`);
      }
    } catch (err: any) {
      setTestResult(`✗ ${err.message || 'Failed to send test email'}`);
    } finally {
      setIsSendingTest(false);
    }
  };

  const autoGenerateTextFromHtml = () => {
    // Simple HTML to text conversion
    const text = htmlContent
      .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
      .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
    setTextContent(text);
  };

  if (!isOpen) return null;

  const templateTypes = Object.entries(TEMPLATE_TYPE_INFO);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-5xl w-full max-h-[90vh] flex flex-col">
        {/* Sticky Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-white rounded-t-2xl sticky top-0 z-10">
          <h2 className="text-2xl font-semibold text-gray-900">
            {isEditMode ? 'Edit Template' : 'Create Template'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 px-6 bg-white">
          <button
            onClick={() => setActiveTab('details')}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition ${
              activeTab === 'details'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            <FileText className="h-4 w-4" />
            Details
          </button>
          <button
            onClick={() => setActiveTab('html')}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition ${
              activeTab === 'html'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            <Code className="h-4 w-4" />
            HTML
          </button>
          <button
            onClick={() => setActiveTab('text')}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition ${
              activeTab === 'text'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            <FileText className="h-4 w-4" />
            Text
          </button>
          <button
            onClick={() => setActiveTab('preview')}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition ${
              activeTab === 'preview'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            <Eye className="h-4 w-4" />
            Preview
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Details Tab */}
          {activeTab === 'details' && (
            <div className="space-y-6 max-w-3xl">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Portal Created Email"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={2}
                  className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Brief description of when this email is sent"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Type *
                  </label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    disabled={isEditMode}
                    className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                  >
                    <option value="">Select type...</option>
                    {templateTypes.map(([key, info]) => (
                      <option key={key} value={info.category}>
                        {info.category} - {info.displayName}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Slug * {isEditMode && <span className="text-xs text-gray-500">(read-only)</span>}
                  </label>
                  <input
                    type="text"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    disabled={isEditMode}
                    className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed font-mono text-sm"
                    placeholder="portal_created"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject Line *
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your Secure Portal from {{orgName}}"
                />
              </div>

              <div>
                <TemplateVariableHelper
                  selectedVariables={variables}
                  onVariableSelect={setVariables}
                  mode="select"
                />
              </div>

              <div className="flex items-center gap-3 p-4 rounded-xl bg-gray-50">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                  className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <label htmlFor="isActive" className="text-sm font-medium text-gray-700">
                  Active (template will be used for emails)
                </label>
              </div>
            </div>
          )}

          {/* HTML Tab */}
          {activeTab === 'html' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-gray-700">
                  HTML Content *
                </label>
                <div className="text-xs text-gray-500">
                  Use {'{{variableName}}'} for dynamic content
                </div>
              </div>
              <textarea
                value={htmlContent}
                onChange={(e) => setHtmlContent(e.target.value)}
                rows={20}
                className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                placeholder="<!DOCTYPE html>..."
                spellCheck={false}
              />
              <TemplateVariableHelper
                onVariableInsert={(variable) => {
                  // Insert at cursor position or append
                  const textarea = document.querySelector('textarea');
                  if (textarea) {
                    const start = textarea.selectionStart;
                    const end = textarea.selectionEnd;
                    const newValue =
                      htmlContent.substring(0, start) +
                      variable +
                      htmlContent.substring(end);
                    setHtmlContent(newValue);
                  }
                }}
                mode="insert"
              />
            </div>
          )}

          {/* Text Tab */}
          {activeTab === 'text' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-gray-700">
                  Plain Text Content
                </label>
                <button
                  onClick={autoGenerateTextFromHtml}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  Auto-generate from HTML
                </button>
              </div>
              <textarea
                value={textContent}
                onChange={(e) => setTextContent(e.target.value)}
                rows={15}
                className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                placeholder="Plain text version for email clients that don't support HTML..."
              />
            </div>
          )}

          {/* Preview Tab */}
          {activeTab === 'preview' && (
            <div className="space-y-6">
              <TemplatePreviewPane
                htmlContent={htmlContent}
                sampleData={sampleData}
                subject={subject}
              />

              {/* Test Email Section */}
              {isEditMode && (
                <div className="rounded-xl border border-gray-200 bg-gray-50 p-6 space-y-4">
                  <h3 className="text-sm font-semibold text-gray-900">Send Test Email</h3>
                  <div className="flex gap-3">
                    <input
                      type="email"
                      value={testEmail}
                      onChange={(e) => setTestEmail(e.target.value)}
                      placeholder="test@example.com"
                      className="flex-1 rounded-xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      onClick={handleSendTest}
                      disabled={isSendingTest}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition disabled:opacity-50"
                    >
                      {isSendingTest ? (
                        <>
                          <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4" />
                          Send Test
                        </>
                      )}
                    </button>
                  </div>
                  {testResult && (
                    <div className={`text-sm ${testResult.startsWith('✓') ? 'text-green-600' : 'text-red-600'}`}>
                      {testResult}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Error Display */}
          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-800 text-sm">
              {error}
            </div>
          )}
        </div>

        {/* Sticky Footer */}
        <div className="flex justify-between items-center p-6 border-t border-gray-200 bg-white rounded-b-2xl sticky bottom-0 z-10">
          <div className="text-xs text-gray-500">
            * Required fields
          </div>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              disabled={isSaving}
              className="px-4 py-2 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 transition disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition disabled:opacity-50"
            >
              {isSaving ? (
                <>
                  <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  {isEditMode ? 'Save Changes' : 'Create Template'}
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
