'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Users, UserPlus, Trash2, Shield, Eye, Edit2, AlertCircle, X, Clock, Mail, ChevronDown, Copy, Check, Link2 } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { useTheme } from '@/contexts/ThemeContext'
import { useToast } from '@/components/shared/ToastContainer'
import { useAccountAccess } from '@/hooks/useAccountAccess'

interface User {
  id: string
  email: string
  name: string | null
}

interface Member {
  id: string
  role: string
  joinedAt: string
  userId: string
  User: User
}

interface PendingInvite {
  id: string
  email: string
  role: string
  createdAt: string
  expiresAt: string
  token: string
}

interface Organization {
  id: string
  name: string
  userRole: string
}

export default function MembersPage() {
  const router = useRouter()
  const { user, loading: authLoading } = useAuth()
  const { isDarkMode } = useTheme()
  const { showToast } = useToast()
  const { isPersonalAccount, isBusinessAccount } = useAccountAccess()
  const [organizations, setOrganizations] = useState<Organization[]>([])
  const [selectedOrg, setSelectedOrg] = useState<Organization | null>(null)
  const [members, setMembers] = useState<Member[]>([])
  const [pendingInvites, setPendingInvites] = useState<PendingInvite[]>([])
  const [loading, setLoading] = useState(true)
  const [showInviteModal, setShowInviteModal] = useState(false)
  const [inviteData, setInviteData] = useState({ email: '', role: 'member' })
  const [inviting, setInviting] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [memberToDelete, setMemberToDelete] = useState<{ id: string; email: string } | null>(null)
  const [inviteUrl, setInviteUrl] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)
  const [copiedLink, setCopiedLink] = useState<string | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Redirect personal accounts away from members settings
  useEffect(() => {
    if (!authLoading && user && isPersonalAccount) {
      router.push('/settings/profile')
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

  useEffect(() => {
    if (selectedOrg) {
      fetchMembers()
      fetchPendingInvites()
    }
  }, [selectedOrg])

  const fetchOrganizations = async () => {
    try {
      const response = await fetch('/api/organizations', {
        headers: { 'x-user-id': user?.id || '' },
      })
      const data = await response.json()
      setOrganizations(data.organizations || [])

      if (data.organizations && data.organizations.length > 0) {
        setSelectedOrg(data.organizations[0])
      }
    } catch (error) {
      console.error('Error fetching organizations:', error)
      showToast('Failed to load organizations', 'error')
    } finally {
      setLoading(false)
    }
  }

  const fetchMembers = async () => {
    if (!selectedOrg) return

    try {
      const response = await fetch(`/api/organizations/${selectedOrg.id}/members`, {
        headers: { 'x-user-id': user?.id || '' },
      })
      const data = await response.json()
      setMembers(data.members || [])
    } catch (error) {
      console.error('Error fetching members:', error)
      showToast('Failed to load members', 'error')
    }
  }

  const fetchPendingInvites = async () => {
    if (!selectedOrg) return

    try {
      const response = await fetch(`/api/organizations/${selectedOrg.id}/invites`, {
        headers: { 'x-user-id': user?.id || '' },
      })
      const data = await response.json()
      setPendingInvites(data.invites || [])
    } catch (error) {
      console.error('Error fetching pending invites:', error)
    }
  }

  const handleRevokeInvite = async (inviteId: string, email: string) => {
    if (!selectedOrg) return

    try {
      const response = await fetch(`/api/organizations/${selectedOrg.id}/invites/${inviteId}`, {
        method: 'DELETE',
        headers: { 'x-user-id': user?.id || '' },
      })

      if (!response.ok) {
        throw new Error('Failed to revoke invitation')
      }

      showToast(`Invitation for ${email} revoked`, 'success')
      fetchPendingInvites()
    } catch (error: any) {
      console.error('Error revoking invite:', error)
      showToast(error.message || 'Failed to revoke invitation', 'error')
    }
  }

  const handleInvite = async () => {
    if (!selectedOrg) return

    if (!inviteData.email.trim()) {
      showToast('Email is required', 'error')
      return
    }

    setInviting(true)
    try {
      const response = await fetch(`/api/organizations/${selectedOrg.id}/members`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': user?.id || '',
        },
        body: JSON.stringify(inviteData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to invite member')
      }

      if (data.inviteUrl) {
        setInviteUrl(data.inviteUrl)
        showToast('Invitation created! Share the link with the user.', 'success')
        fetchPendingInvites()
      } else {
        showToast('Member invited successfully', 'success')
        setShowInviteModal(false)
        setInviteData({ email: '', role: 'member' })
      }

      fetchMembers()
    } catch (error: any) {
      console.error('Error inviting member:', error)
      showToast(error.message || 'Failed to invite member', 'error')
    } finally {
      setInviting(false)
    }
  }

  const handleUpdateRole = async (memberId: string, newRole: string) => {
    if (!selectedOrg) return

    try {
      const response = await fetch(`/api/organizations/${selectedOrg.id}/members/${memberId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': user?.id || '',
        },
        body: JSON.stringify({ role: newRole }),
      })

      if (!response.ok) {
        throw new Error('Failed to update role')
      }

      showToast('Role updated successfully', 'success')
      fetchMembers()
    } catch (error) {
      console.error('Error updating role:', error)
      showToast('Failed to update role', 'error')
    }
  }

  const handleRemoveMember = async () => {
    if (!selectedOrg || !memberToDelete) return

    try {
      const response = await fetch(`/api/organizations/${selectedOrg.id}/members/${memberToDelete.id}`, {
        method: 'DELETE',
        headers: { 'x-user-id': user?.id || '' },
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to remove member')
      }

      showToast('Member removed successfully', 'success')
      setShowDeleteModal(false)
      setMemberToDelete(null)
      fetchMembers()
    } catch (error: any) {
      console.error('Error removing member:', error)
      showToast(error.message || 'Failed to remove member', 'error')
    }
  }

  const copyInviteLink = (token: string) => {
    const inviteUrl = `${window.location.origin}/invite/${token}`
    navigator.clipboard.writeText(inviteUrl)
    setCopiedLink(token)
    showToast('Invite link copied!', 'success')
    setTimeout(() => setCopiedLink(null), 2000)
  }

  const getRoleConfig = (role: string) => {
    const configs: Record<string, { icon: typeof Shield; color: string; bgColor: string; label: string }> = {
      admin: {
        icon: Shield,
        color: isDarkMode ? 'text-amber-400' : 'text-amber-600',
        bgColor: isDarkMode ? 'bg-amber-500/20' : 'bg-amber-100',
        label: 'Admin'
      },
      member: {
        icon: Edit2,
        color: isDarkMode ? 'text-blue-400' : 'text-blue-600',
        bgColor: isDarkMode ? 'bg-blue-500/20' : 'bg-blue-100',
        label: 'Member'
      },
      viewer: {
        icon: Eye,
        color: isDarkMode ? 'text-slate-400' : 'text-gray-600',
        bgColor: isDarkMode ? 'bg-slate-700' : 'bg-gray-100',
        label: 'Viewer'
      }
    }
    return configs[role] || configs.viewer
  }

  const getInitials = (name: string | null, email: string) => {
    if (name) {
      return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
    }
    return email[0].toUpperCase()
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  // Show loading while checking auth or redirecting personal accounts
  if (authLoading || loading || !user || isPersonalAccount) {
    return (
      <div className={`p-8 flex items-center justify-center min-h-[400px] ${isDarkMode ? 'bg-slate-800/50' : 'bg-white'}`}>
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-emerald-500/20 border-t-emerald-500"></div>
            <Users className="absolute inset-0 m-auto w-5 h-5 text-emerald-500" />
          </div>
          <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>Loading...</p>
        </div>
      </div>
    )
  }

  if (organizations.length === 0) {
    return (
      <div className="p-8">
        <div className={`text-center py-16 rounded-2xl border-2 border-dashed transition-colors ${
          isDarkMode ? 'border-slate-700 bg-slate-800/30' : 'border-gray-200 bg-gray-50'
        }`}>
          <div className={`w-20 h-20 mx-auto rounded-2xl flex items-center justify-center mb-6 ${
            isDarkMode ? 'bg-emerald-500/20' : 'bg-emerald-100'
          }`}>
            <Users className={`w-10 h-10 ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`} />
          </div>
          <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            No Organizations
          </h3>
          <p className={`max-w-sm mx-auto ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>
            Create an organization first to manage team members.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-4 sm:p-8 overflow-x-hidden">
      {/* Header */}
      <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8 ${mounted ? 'animate-fadeIn' : 'opacity-0'}`}>
        <div className="flex items-center gap-3">
          <div className={`p-2.5 rounded-xl flex-shrink-0 ${isDarkMode ? 'bg-emerald-500/20' : 'bg-emerald-100'}`}>
            <Users className={`w-5 sm:w-6 h-5 sm:h-6 ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`} />
          </div>
          <div className="min-w-0">
            <h2 className={`text-xl sm:text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Team Members
            </h2>
            <p className={`text-xs sm:text-sm mt-0.5 ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>
              Manage members and roles for {selectedOrg?.name || 'your organization'}
            </p>
          </div>
        </div>
        {selectedOrg && selectedOrg.userRole === 'admin' && (
          <button
            onClick={() => {
              setInviteData({ email: '', role: 'member' })
              setInviteUrl(null)
              setShowInviteModal(true)
            }}
            className={`flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl shadow-lg transition-all duration-300 hover:scale-[1.02] flex-shrink-0 ${
              isDarkMode
                ? 'bg-gradient-to-r from-emerald-600 to-emerald-500 text-white hover:from-emerald-700 hover:to-emerald-600 shadow-emerald-500/25 hover:shadow-emerald-500/40'
                : 'bg-gradient-to-r from-emerald-600 to-emerald-500 text-white hover:from-emerald-700 hover:to-emerald-600 shadow-emerald-500/30 hover:shadow-emerald-500/50'
            }`}
          >
            <UserPlus className="w-5 h-5" />
            <span className="font-semibold text-sm sm:text-base">Invite Member</span>
          </button>
        )}
      </div>

      {/* Organization Selector */}
      {organizations.length > 1 && (
        <div className={`mb-6 ${mounted ? 'animate-slideUp' : 'opacity-0'}`} style={{ animationDelay: '50ms' }}>
          <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-slate-300' : 'text-gray-700'}`}>
            Organization
          </label>
          <div className="relative inline-block">
            <select
              value={selectedOrg?.id || ''}
              onChange={(e) => {
                const org = organizations.find(o => o.id === e.target.value)
                setSelectedOrg(org || null)
              }}
              className={`appearance-none px-4 py-2.5 pr-10 rounded-xl border focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-300 ${
                isDarkMode
                  ? 'bg-slate-700/50 border-slate-600 text-white'
                  : 'bg-white border-gray-200 text-gray-900'
              }`}
            >
              {organizations.map((org) => (
                <option key={org.id} value={org.id}>
                  {org.name}
                </option>
              ))}
            </select>
            <ChevronDown className={`absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`} />
          </div>
        </div>
      )}

      {/* Admin Warning */}
      {selectedOrg && selectedOrg.userRole !== 'admin' && (
        <div className={`mb-6 flex items-start gap-3 p-4 rounded-xl border ${mounted ? 'animate-slideUp' : 'opacity-0'} ${
          isDarkMode ? 'bg-amber-500/10 border-amber-500/30' : 'bg-amber-50 border-amber-200'
        }`} style={{ animationDelay: '50ms' }}>
          <AlertCircle className={`w-5 h-5 flex-shrink-0 ${isDarkMode ? 'text-amber-400' : 'text-amber-600'}`} />
          <p className={`text-sm ${isDarkMode ? 'text-amber-300' : 'text-amber-800'}`}>
            Only organization admins can invite or remove members.
          </p>
        </div>
      )}

      {/* Members Grid */}
      <div className={`mb-8 min-h-[400px] ${mounted ? 'animate-slideUp' : 'opacity-0'}`} style={{ animationDelay: '100ms' }}>
        <h3 className={`text-sm font-semibold mb-4 flex items-center gap-2 ${isDarkMode ? 'text-slate-300' : 'text-gray-700'}`}>
          <Users className="w-4 h-4" />
          Active Members ({members.length})
        </h3>

        {members.length === 0 ? (
          <div className={`text-center py-12 rounded-xl border-2 border-dashed ${
            isDarkMode ? 'border-slate-700 bg-slate-800/30' : 'border-gray-200 bg-gray-50'
          }`}>
            <Users className={`w-12 h-12 mx-auto mb-4 ${isDarkMode ? 'text-slate-600' : 'text-gray-300'}`} />
            <p className={`${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>No members found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            {members.map((member, index) => {
              const isCurrentUser = member.userId === user?.id
              const roleConfig = getRoleConfig(member.role)
              const RoleIcon = roleConfig.icon

              return (
                <div
                  key={member.id}
                  className={`p-3 sm:p-4 rounded-xl border transition-all duration-300 ${
                    mounted ? 'animate-slideUp' : 'opacity-0'
                  } ${
                    isDarkMode
                      ? 'bg-slate-800/50 border-slate-700 hover:bg-slate-800 hover:border-slate-600'
                      : 'bg-white border-gray-200 hover:bg-gray-50 hover:border-gray-300'
                  }`}
                  style={{ animationDelay: `${(index + 2) * 50}ms` }}
                >
                  <div className="flex items-start gap-3">
                    {/* Avatar */}
                    <div className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full flex-shrink-0 flex items-center justify-center text-sm font-bold ${
                      isDarkMode
                        ? 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white'
                        : 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white'
                    }`}>
                      {getInitials(member.User.name, member.User.email)}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          {member.User.name || member.User.email.split('@')[0]}
                        </p>
                        {isCurrentUser && (
                          <span className={`text-[10px] px-1.5 py-0.5 rounded flex-shrink-0 ${
                            isDarkMode ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-700'
                          }`}>
                            You
                          </span>
                        )}
                      </div>
                      <p className={`text-xs mt-0.5 break-all ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>
                        {member.User.email}
                      </p>
                      <div className="flex items-center gap-2 mt-2 flex-wrap">
                        {/* Role Badge/Selector */}
                        {selectedOrg?.userRole === 'admin' && !isCurrentUser ? (
                          <div className="relative inline-flex">
                            <select
                              value={member.role}
                              onChange={(e) => handleUpdateRole(member.id, e.target.value)}
                              className={`appearance-none pl-2 pr-6 py-1 text-xs rounded-lg font-semibold cursor-pointer transition-colors border ${
                                member.role === 'admin'
                                  ? isDarkMode ? 'bg-amber-500/20 text-amber-400 border-amber-500/30' : 'bg-amber-500 text-white border-amber-500'
                                  : isDarkMode ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : 'bg-emerald-500 text-white border-emerald-500'
                              } focus:outline-none focus:ring-2 focus:ring-emerald-500`}
                            >
                              <option value="admin">Admin</option>
                              <option value="member">Member</option>
                              <option value="viewer">Viewer</option>
                            </select>
                            <ChevronDown className={`absolute right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 pointer-events-none ${
                              member.role === 'admin'
                                ? isDarkMode ? 'text-amber-400' : 'text-white'
                                : isDarkMode ? 'text-emerald-400' : 'text-white'
                            }`} />
                          </div>
                        ) : (
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-lg font-semibold ${
                            member.role === 'admin'
                              ? isDarkMode ? 'bg-amber-500/20 text-amber-400' : 'bg-amber-500 text-white'
                              : isDarkMode ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-500 text-white'
                          }`}>
                            <RoleIcon className="w-3.5 h-3.5" />
                            {roleConfig.label}
                          </span>
                        )}
                      </div>
                      <p className={`text-xs mt-1.5 ${isDarkMode ? 'text-slate-500' : 'text-gray-500'}`}>
                        Joined {formatDate(member.joinedAt)}
                      </p>
                    </div>

                    {/* Actions */}
                    {selectedOrg?.userRole === 'admin' && (
                      <button
                        onClick={() => {
                          setMemberToDelete({ id: member.id, email: member.User.email })
                          setShowDeleteModal(true)
                        }}
                        className={`p-2 rounded-lg transition-all duration-300 flex-shrink-0 ${
                          isDarkMode
                            ? 'text-slate-500 hover:text-red-400 hover:bg-red-500/20'
                            : 'text-gray-400 hover:text-red-600 hover:bg-red-50'
                        }`}
                        title="Remove member"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Pending Invitations */}
      {selectedOrg?.userRole === 'admin' && pendingInvites.length > 0 && (
        <div className={`${mounted ? 'animate-slideUp' : 'opacity-0'}`} style={{ animationDelay: '200ms' }}>
          <h3 className={`text-sm font-semibold mb-4 flex items-center gap-2 ${isDarkMode ? 'text-slate-300' : 'text-gray-700'}`}>
            <Clock className="w-4 h-4" />
            Pending Invitations ({pendingInvites.length})
          </h3>

          <div className="space-y-3">
            {pendingInvites.map((invite, index) => {
              const isExpired = new Date(invite.expiresAt) < new Date()
              const roleConfig = getRoleConfig(invite.role)
              const RoleIcon = roleConfig.icon

              return (
                <div
                  key={invite.id}
                  className={`p-3 sm:p-4 rounded-xl border transition-all duration-300 ${
                    mounted ? 'animate-slideUp' : 'opacity-0'
                  } ${
                    isExpired
                      ? isDarkMode ? 'bg-red-500/5 border-red-500/30' : 'bg-red-50 border-red-200'
                      : isDarkMode ? 'bg-slate-800/50 border-slate-700' : 'bg-white border-gray-200'
                  }`}
                  style={{ animationDelay: `${(index + 5) * 50}ms` }}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-start sm:items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center ${
                        isDarkMode ? 'bg-slate-700' : 'bg-gray-100'
                      }`}>
                        <Mail className={`w-5 h-5 ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className={`font-medium text-sm break-all ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          {invite.email}
                        </p>
                        <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs rounded-lg font-medium ${roleConfig.bgColor} ${roleConfig.color}`}>
                            <RoleIcon className="w-3 h-3" />
                            {roleConfig.label}
                          </span>
                          {isExpired ? (
                            <span className={`text-xs font-medium ${isDarkMode ? 'text-red-400' : 'text-red-600'}`}>
                              Expired
                            </span>
                          ) : (
                            <span className={`text-xs ${isDarkMode ? 'text-slate-500' : 'text-gray-400'}`}>
                              Expires {formatDate(invite.expiresAt)}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 ml-13 sm:ml-0">
                      <button
                        onClick={() => copyInviteLink(invite.token)}
                        className={`flex items-center justify-center gap-1.5 px-3 py-2 text-xs sm:text-sm rounded-lg font-medium transition-all duration-300 flex-1 sm:flex-initial ${
                          copiedLink === invite.token
                            ? isDarkMode ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-100 text-emerald-700'
                            : isDarkMode ? 'bg-slate-700 text-slate-300 hover:bg-slate-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {copiedLink === invite.token ? (
                          <>
                            <Check className="w-4 h-4" />
                            <span className="hidden sm:inline">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Link2 className="w-4 h-4" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                      <button
                        onClick={() => handleRevokeInvite(invite.id, invite.email)}
                        className={`px-3 py-2 text-xs sm:text-sm rounded-lg font-medium transition-all duration-300 flex-1 sm:flex-initial ${
                          isDarkMode
                            ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
                            : 'bg-red-100 text-red-700 hover:bg-red-200'
                        }`}
                      >
                        Revoke
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Invite Member Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 z-[9999] flex items-start justify-center p-4 overflow-y-auto">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fadeIn"
            onClick={() => {
              setShowInviteModal(false)
              setInviteData({ email: '', role: 'member' })
              setInviteUrl(null)
            }}
          />

          <div className="relative w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-scaleIn bg-white border border-slate-200 my-8">
            <div className="relative px-6 py-5 bg-gradient-to-r from-emerald-50 to-teal-50 border-b border-slate-200 rounded-t-3xl">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-emerald-100">
                  <UserPlus className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 font-display">
                    Invite Team Member
                  </h3>
                  <p className="text-sm text-slate-600 font-medium">
                    Invite a user to {selectedOrg?.name}
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setShowInviteModal(false)
                  setInviteData({ email: '', role: 'member' })
                  setInviteUrl(null)
                }}
                className="absolute top-4 right-4 p-2 rounded-xl transition-colors hover:bg-slate-100 text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-5 bg-white">
              <div>
                <label className="block text-sm font-bold mb-2 text-slate-900">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                    <Mail className="h-5 w-5" />
                  </div>
                  <input
                    type="email"
                    value={inviteData.email}
                    onChange={(e) => setInviteData({ ...inviteData, email: e.target.value })}
                    className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 text-slate-900 placeholder:text-slate-400 font-medium"
                    placeholder="user@example.com"
                  />
                </div>
                <p className="text-xs mt-2 text-slate-500 font-medium">
                  User must already have an account
                </p>
              </div>

              <div>
                <label className="block text-sm font-bold mb-2 text-slate-900">
                  Role
                </label>
                <div className="relative">
                  <select
                    value={inviteData.role}
                    onChange={(e) => setInviteData({ ...inviteData, role: e.target.value })}
                    className="w-full appearance-none px-4 py-3 rounded-xl border-2 border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 text-slate-900 font-medium"
                  >
                    <option value="viewer">Viewer - Can view documents</option>
                    <option value="member">Member - Can view and edit documents</option>
                    <option value="admin">Admin - Full access</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none text-slate-500" />
                </div>
              </div>

              {inviteUrl && (
                <div className={`p-4 rounded-xl border ${
                  isDarkMode ? 'bg-blue-500/10 border-blue-500/30' : 'bg-blue-50 border-blue-200'
                }`}>
                  <p className={`text-sm font-medium mb-2 ${isDarkMode ? 'text-blue-300' : 'text-blue-900'}`}>
                    Invitation Link Created
                  </p>
                  <p className={`text-xs mb-3 ${isDarkMode ? 'text-blue-400' : 'text-blue-700'}`}>
                    The user doesn't have an account yet. Share this link with them:
                  </p>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={inviteUrl}
                      readOnly
                      className={`flex-1 px-3 py-2 rounded-lg text-sm ${
                        isDarkMode
                          ? 'bg-slate-700 border border-slate-600 text-white'
                          : 'bg-white border border-blue-200 text-gray-900'
                      }`}
                    />
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(inviteUrl)
                        showToast('Link copied to clipboard!', 'success')
                      }}
                      className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg hover:from-blue-700 hover:to-blue-600 transition-all duration-300 text-sm font-medium"
                    >
                      Copy
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-3 px-6 py-4 border-t border-slate-200 bg-slate-50">
              <button
                onClick={() => {
                  setShowInviteModal(false)
                  setInviteData({ email: '', role: 'member' })
                  setInviteUrl(null)
                }}
                className="flex-1 px-4 py-2.5 rounded-xl font-bold transition-all duration-300 bg-white border-2 border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-slate-900 hover:border-slate-300"
                disabled={inviting}
              >
                {inviteUrl ? 'Close' : 'Cancel'}
              </button>
              {!inviteUrl && (
                <button
                  onClick={handleInvite}
                  disabled={inviting || !inviteData.email.trim()}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-bold bg-gradient-to-r from-emerald-600 to-emerald-500 text-white hover:from-emerald-700 hover:to-emerald-600 shadow-emerald-500/30"
                >
                  {inviting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Inviting...
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-4 h-4" />
                      Send Invite
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && memberToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fadeIn"
            onClick={() => {
              setShowDeleteModal(false)
              setMemberToDelete(null)
            }}
          />

          <div className={`relative w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-scaleIn ${
            isDarkMode
              ? 'bg-slate-800/90 backdrop-blur-xl border border-slate-700/50'
              : 'bg-white/90 backdrop-blur-xl border border-gray-200'
          }`}>
            <div className={`relative px-6 py-5 ${
              isDarkMode
                ? 'bg-gradient-to-r from-red-500/20 to-orange-500/20'
                : 'bg-gradient-to-r from-red-50 to-orange-50'
            }`}>
              <div className="flex items-center gap-3">
                <div className={`p-2.5 rounded-xl ${isDarkMode ? 'bg-red-500/30' : 'bg-red-100'}`}>
                  <AlertCircle className={`w-5 h-5 ${isDarkMode ? 'text-red-400' : 'text-red-600'}`} />
                </div>
                <h3 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Remove Member
                </h3>
              </div>
              <button
                onClick={() => {
                  setShowDeleteModal(false)
                  setMemberToDelete(null)
                }}
                className={`absolute top-4 right-4 p-2 rounded-xl transition-colors ${
                  isDarkMode ? 'hover:bg-slate-700/50 text-slate-400' : 'hover:bg-gray-100 text-gray-500'
                }`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6">
              <p className={`text-sm mb-4 ${isDarkMode ? 'text-slate-300' : 'text-gray-700'}`}>
                Are you sure you want to remove <strong className={isDarkMode ? 'text-white' : 'text-gray-900'}>{memberToDelete.email}</strong> from the organization?
              </p>
              <div className={`p-4 rounded-xl border ${
                isDarkMode ? 'bg-red-500/10 border-red-500/30' : 'bg-red-50 border-red-200'
              }`}>
                <p className={`text-sm ${isDarkMode ? 'text-red-300' : 'text-red-700'}`}>
                  This action cannot be undone. The user will lose access to all organization resources.
                </p>
              </div>
            </div>

            <div className={`flex gap-3 px-6 py-4 border-t ${isDarkMode ? 'border-slate-700 bg-slate-800/50' : 'border-gray-100 bg-gray-50'}`}>
              <button
                onClick={() => {
                  setShowDeleteModal(false)
                  setMemberToDelete(null)
                }}
                className={`flex-1 px-4 py-2.5 rounded-xl font-medium transition-all duration-300 ${
                  isDarkMode
                    ? 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Cancel
              </button>
              <button
                onClick={handleRemoveMember}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-xl hover:from-red-700 hover:to-red-600 shadow-lg shadow-red-500/25 transition-all duration-300 font-medium"
              >
                <Trash2 className="w-4 h-4" />
                Remove Member
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
