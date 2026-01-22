'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Building2, Save, Trash2, Plus, AlertCircle, X, Users, FileText, Calendar, Sparkles, Check } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { useToast } from '@/components/shared/ToastContainer'
import { useAccountAccess } from '@/hooks/useAccountAccess'

interface Organization {
  id: string
  name: string
  description: string | null
  userRole: string
  createdAt: string
}

export default function OrganizationSettingsPage() {
  const router = useRouter()
  const { user, loading: authLoading } = useAuth()
  const { showToast } = useToast()
  const { isPersonalAccount, isBusinessAccount } = useAccountAccess()
  const [organizations, setOrganizations] = useState<Organization[]>([])
  const [selectedOrg, setSelectedOrg] = useState<Organization | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [formData, setFormData] = useState({ name: '', description: '' })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Redirect personal accounts away from organization settings
  useEffect(() => {
    if (!authLoading && user && isPersonalAccount) {
      router.replace('/settings/profile')
    }
  }, [authLoading, user, isPersonalAccount, router])

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login')
      return
    }

    // Only fetch organizations for business accounts
    if (user && isBusinessAccount) {
      fetchOrganizations()
    } else if (!authLoading) {
      setLoading(false)
    }
  }, [user, authLoading, isBusinessAccount, router])

  const fetchOrganizations = async () => {
    try {
      const response = await fetch('/api/organizations', {
        headers: { 'x-user-id': user?.id || '' },
      })
      const data = await response.json()
      setOrganizations(data.organizations || [])

      if (data.organizations && data.organizations.length > 0) {
        setSelectedOrg(data.organizations[0])
        setFormData({
          name: data.organizations[0].name,
          description: data.organizations[0].description || '',
        })
      }
    } catch (error) {
      console.error('Error fetching organizations:', error)
      showToast('Failed to load organizations', 'error')
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    if (!selectedOrg) return

    if (selectedOrg.userRole !== 'admin') {
      showToast('Only admins can update organization settings', 'error')
      return
    }

    setSaving(true)
    try {
      const response = await fetch(`/api/organizations/${selectedOrg.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': user?.id || '',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Failed to update organization')
      }

      showToast('Organization updated successfully', 'success')
      fetchOrganizations()
    } catch (error) {
      console.error('Error updating organization:', error)
      showToast('Failed to update organization', 'error')
    } finally {
      setSaving(false)
    }
  }

  const handleCreate = async () => {
    if (!formData.name.trim()) {
      showToast('Organization name is required', 'error')
      return
    }

    setSaving(true)
    try {
      const response = await fetch('/api/organizations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': user?.id || '',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to create organization')
      }

      showToast('Organization created successfully', 'success')
      setShowCreateModal(false)
      setFormData({ name: '', description: '' })
      fetchOrganizations()
    } catch (error: any) {
      console.error('Error creating organization:', error)
      showToast(error.message || 'Failed to create organization', 'error')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!selectedOrg) return

    if (selectedOrg.userRole !== 'admin') {
      showToast('Only admins can delete organizations', 'error')
      return
    }

    try {
      const response = await fetch(`/api/organizations/${selectedOrg.id}`, {
        method: 'DELETE',
        headers: { 'x-user-id': user?.id || '' },
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to delete organization')
      }

      showToast('Organization deleted successfully', 'success')
      setSelectedOrg(null)
      setShowDeleteModal(false)
      fetchOrganizations()
    } catch (error: any) {
      console.error('Error deleting organization:', error)
      showToast(error.message || 'Failed to delete organization', 'error')
    }
  }

  const handleOrgSelect = (org: Organization) => {
    setSelectedOrg(org)
    setFormData({
      name: org.name,
      description: org.description || '',
    })
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  // Block render completely for personal accounts - redirect is handled by useEffect above
  // This ensures nothing renders while redirecting
  if (isPersonalAccount) {
    return null
  }

  // Show loading while checking auth
  if (authLoading || loading || !user) {
    return (
      <div className="p-8 flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-500/20 border-t-purple-600"></div>
            <Building2 className="absolute inset-0 m-auto w-5 h-5 text-purple-600" />
          </div>
          <p className="text-sm text-white/70 dark:text-slate-200 font-medium">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-4 sm:p-8 overflow-x-hidden">
      {/* Header */}
      <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 ${mounted ? 'animate-fadeIn' : 'opacity-0'}`}>
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl flex-shrink-0 bg-purple-500/10 shadow-lg shadow-purple-500/10">
            <Building2 className="w-6 h-6 text-purple-600" />
          </div>
          <div className="min-w-0">
            <h2 className="text-xl sm:text-2xl font-black text-white dark:text-white font-display">
              Organization Settings
            </h2>
            <p className="text-xs sm:text-sm mt-0.5 text-white/70 dark:text-slate-200 font-medium">
              Manage your organization details and settings
            </p>
          </div>
        </div>
        <button
          onClick={() => {
            setFormData({ name: '', description: '' })
            setShowCreateModal(true)
          }}
          className="flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl shadow-lg transition-all duration-300 hover:scale-[1.02] flex-shrink-0 bg-gradient-to-r from-purple-600 to-purple-500 text-white hover:from-purple-700 hover:to-purple-600 shadow-purple-500/25 hover:shadow-purple-500/40"
        >
          <Plus className="w-4 h-4" />
          <span className="font-bold">Create</span>
        </button>
      </div>

      {organizations.length === 0 ? (
        <div className={`text-center py-16 rounded-3xl border-2 border-dashed border-slate-200 bg-slate-50/50 transition-colors ${
          mounted ? 'animate-fadeIn' : 'opacity-0'
        }`}>
          <div className="w-20 h-20 mx-auto rounded-2xl flex items-center justify-center mb-6 bg-purple-500/10">
            <Building2 className="w-10 h-10 text-purple-600" />
          </div>
          <h3 className="text-xl font-bold mb-2 text-white dark:text-white font-display">
            No Organizations Yet
          </h3>
          <p className="mb-8 max-w-sm mx-auto text-white/70 dark:text-slate-200 font-medium">
            Create your first organization to start managing your team and documents.
          </p>
          <button
            onClick={() => {
              setFormData({ name: '', description: '' })
              setShowCreateModal(true)
            }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-500 text-white rounded-xl hover:from-purple-700 hover:to-purple-600 shadow-lg shadow-purple-500/25 transition-all duration-300 hover:shadow-purple-500/40 hover:scale-[1.02]"
          >
            <Sparkles className="w-5 h-5" />
            <span className="font-bold">Create Your First Organization</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Organization List */}
          <div className={`lg:col-span-1 ${mounted ? 'animate-slideUp' : 'opacity-0'}`} style={{ animationDelay: '50ms' }}>
            <h3 className="text-sm font-bold mb-4 flex items-center gap-2 text-white dark:text-white">
              <Users className="w-4 h-4" />
              Your Organizations
            </h3>
            <div className="space-y-3">
              {organizations.map((org, index) => (
                <button
                  key={org.id}
                  onClick={() => handleOrgSelect(org)}
                  className={`w-full text-left p-4 rounded-xl border transition-all duration-300 ${
                    mounted ? 'animate-slideUp' : 'opacity-0'
                  } ${
                    selectedOrg?.id === org.id
                      ? 'glass-card border-purple-500/30 bg-gradient-to-r from-purple-500/5 to-purple-600/5 shadow-lg shadow-purple-500/10'
                      : 'bg-white/50 border-slate-200 hover:bg-white hover:border-purple-200 hover:shadow-md'
                  }`}
                  style={{ animationDelay: `${(index + 1) * 50}ms` }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className={`font-bold truncate ${
                          selectedOrg?.id === org.id
                            ? 'text-purple-700'
                            : 'text-white dark:text-white'
                        }`}>
                          {org.name}
                        </p>
                        {selectedOrg?.id === org.id && (
                          <Check className="w-4 h-4 text-purple-600" />
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold capitalize ${
                          org.userRole === 'admin'
                            ? 'bg-amber-500/10 text-amber-600'
                            : 'bg-slate-100 text-white/70 dark:text-slate-200'
                        }`}>
                          {org.userRole}
                        </span>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Organization Details */}
          <div className={`lg:col-span-2 ${mounted ? 'animate-slideUp' : 'opacity-0'}`} style={{ animationDelay: '100ms' }}>
            {selectedOrg ? (
              <div className="space-y-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-4 rounded-xl glass-card border-white/20 text-center">
                    <div className="p-2.5 rounded-lg mx-auto w-fit mb-2 bg-blue-500/10 text-blue-600">
                      <Users className="w-5 h-5" />
                    </div>
                    <p className="text-2xl font-black text-white dark:text-white font-display">--</p>
                    <p className="text-xs font-bold uppercase tracking-wide text-white">Members</p>
                  </div>
                  <div className="p-4 rounded-xl glass-card border-white/20 text-center">
                    <div className="p-2.5 rounded-lg mx-auto w-fit mb-2 bg-emerald-500/10 text-emerald-600">
                      <FileText className="w-5 h-5" />
                    </div>
                    <p className="text-2xl font-black text-white dark:text-white font-display">--</p>
                    <p className="text-xs font-bold uppercase tracking-wide text-white">Docs</p>
                  </div>
                  <div className="p-4 rounded-xl glass-card border-white/20 text-center">
                    <div className="p-2.5 rounded-lg mx-auto w-fit mb-2 bg-purple-500/10 text-purple-600">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <p className="text-sm font-bold leading-tight text-white dark:text-white">
                      {new Date(selectedOrg.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </p>
                    <p className="text-xs font-bold uppercase tracking-wide text-white mt-1">Created</p>
                  </div>
                </div>

                {/* Edit Form */}
                <div className="p-6 rounded-3xl glass-card border-white/20">
                  <h4 className="text-lg font-bold mb-6 text-white dark:text-white font-display">
                    Organization Details
                  </h4>

                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-bold text-white dark:text-white mb-2">
                        Organization Name
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        disabled={selectedOrg.userRole !== 'admin'}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 text-white dark:text-white placeholder:text-slate-400 disabled:bg-slate-50 disabled:text-white/70 dark:text-slate-200 disabled:cursor-not-allowed"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-white dark:text-white mb-2">
                        Description
                      </label>
                      <textarea
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        disabled={selectedOrg.userRole !== 'admin'}
                        rows={4}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 resize-none text-white dark:text-white placeholder:text-slate-400 disabled:bg-slate-50 disabled:text-white/70 dark:text-slate-200 disabled:cursor-not-allowed"
                        placeholder="Describe your organization..."
                      />
                    </div>
                  </div>

                  {selectedOrg.userRole !== 'admin' && (
                    <div className="flex items-start gap-3 p-4 mt-5 rounded-xl border bg-amber-500/10 border-amber-500/20">
                      <AlertCircle className="w-5 h-5 flex-shrink-0 text-amber-600" />
                      <p className="text-sm text-amber-700 font-medium">
                        Only organization admins can modify these settings.
                      </p>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-4 border-t border-slate-100/50">
                  <button
                    onClick={() => setShowDeleteModal(true)}
                    disabled={selectedOrg.userRole !== 'admin'}
                    className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl transition-all duration-300 text-red-600 hover:bg-red-50 disabled:text-slate-400 disabled:hover:bg-transparent disabled:cursor-not-allowed font-medium"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Delete Organization</span>
                  </button>

                  <button
                    onClick={handleSave}
                    disabled={saving || selectedOrg.userRole !== 'admin'}
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-500 text-white rounded-xl hover:from-purple-700 hover:to-purple-600 shadow-lg shadow-purple-500/25 transition-all duration-300 hover:shadow-purple-500/40 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    <Save className="w-4 h-4" />
                    <span className="font-bold">{saving ? 'Saving...' : 'Save Changes'}</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 rounded-3xl border-2 border-dashed border-slate-200 bg-slate-50/50">
                <Building2 className="w-12 h-12 mb-4 text-slate-300" />
                <p className="text-white/70 dark:text-slate-200 font-medium">
                  Select an organization to view its details
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Create Organization Modal - Glassmorphism Design */}
      {showCreateModal && (
        <div className="fixed inset-0 z-[9999] flex items-start justify-center p-4 overflow-y-auto">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-navy/20 backdrop-blur-sm animate-fadeIn"
            onClick={() => {
              setShowCreateModal(false)
              setFormData({ name: '', description: '' })
            }}
          />

          {/* Modal */}
          <div className="relative w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-scaleIn bg-gradient-to-br from-purple-600 to-purple-500 my-8">
            {/* Header with gradient */}
            <div className="relative px-6 py-5 bg-white/10 backdrop-blur-sm border-b border-white/20 rounded-t-3xl">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-white/20 backdrop-blur-sm">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white font-display">
                    Create Organization
                  </h3>
                  <p className="text-sm text-white/80 font-medium">
                    Set up your new workspace
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setShowCreateModal(false)
                  setFormData({ name: '', description: '' })
                }}
                className="absolute top-5 right-5 p-2 rounded-xl transition-colors hover:bg-white/10 text-white/80 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <div className="p-6 space-y-5 bg-white/95 backdrop-blur-sm">
              <div>
                <label className="block text-sm font-bold text-slate-900 mb-2">
                  Organization Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 text-slate-900 placeholder:text-slate-400 font-medium"
                  placeholder="Acme Corporation"
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-900 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 resize-none text-slate-900 placeholder:text-slate-400 font-medium"
                  placeholder="Describe your organization..."
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 px-6 py-4 border-t border-white/10 bg-white/5 backdrop-blur-sm">
              <button
                onClick={() => {
                  setShowCreateModal(false)
                  setFormData({ name: '', description: '' })
                }}
                className="flex-1 px-4 py-2.5 rounded-xl font-bold transition-all duration-300 bg-white border-2 border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-slate-900 hover:border-slate-300"
                disabled={saving}
              >
                Cancel
              </button>
              <button
                onClick={handleCreate}
                disabled={saving || !formData.name.trim()}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-purple-600 to-purple-500 text-white rounded-xl hover:from-purple-700 hover:to-purple-600 shadow-lg shadow-purple-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-bold"
              >
                {saving ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Creating...</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    <span>Create</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Organization Modal */}
      {showDeleteModal && selectedOrg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-navy/20 backdrop-blur-sm animate-fadeIn"
            onClick={() => setShowDeleteModal(false)}
          />

          {/* Modal */}
          <div className="relative w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-scaleIn glass-card bg-white/95">
            {/* Header */}
            <div className="relative px-6 py-5 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-red-100 text-red-600">
                  <AlertCircle className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white dark:text-white font-display">
                  Delete Organization
                </h3>
              </div>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="absolute top-5 right-5 p-2 rounded-xl transition-colors hover:bg-slate-100 text-slate-400 hover:text-white dark:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              <p className="text-sm mb-4 text-white/70 dark:text-slate-200 font-medium">
                Are you sure you want to delete "<strong className="text-white dark:text-white">{selectedOrg.name}</strong>"?
              </p>
              <div className="p-4 rounded-xl border bg-red-50 border-red-100">
                <p className="text-sm text-red-700 font-medium">
                  ⚠️ This action cannot be undone. All data associated with this organization will be permanently deleted.
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 px-6 py-4 border-t border-slate-100 bg-slate-50/50">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 px-4 py-2.5 rounded-xl font-bold transition-all duration-300 bg-white border border-slate-200 text-white/70 dark:text-slate-200 hover:bg-slate-50 hover:text-white dark:text-white hover:border-slate-300"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-xl hover:from-red-700 hover:to-red-600 shadow-lg shadow-red-500/25 transition-all duration-300 font-bold"
              >
                <Trash2 className="w-4 h-4" />
                Delete Organization
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Animation styles */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
        .animate-slideUp {
          animation: slideUp 0.4s ease-out forwards;
        }
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  )
}
