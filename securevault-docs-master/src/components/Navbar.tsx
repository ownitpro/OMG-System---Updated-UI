'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import { useOrganization } from '@/contexts/OrganizationContext'
import { usePathname } from 'next/navigation'
import { ChevronDown, Building2, User } from 'lucide-react'

export default function Navbar() {
  const { user, signOut, loading } = useAuth()
  const { organizations, selectedOrganization, setSelectedOrganization, isPersonalVault, setIsPersonalVault } = useOrganization()
  const pathname = usePathname()
  const [showOrgDropdown, setShowOrgDropdown] = useState(false)

  // Don't show navbar on auth pages
  const authPages = ['/login', '/signup']
  if (authPages.includes(pathname)) {
    return null
  }

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-xl font-bold text-blue-600">
                SecureVault
              </Link>
            </div>
            {user && (
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <Link
                  href="/dashboard"
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    pathname === '/dashboard'
                      ? 'border-blue-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  }`}
                >
                  Dashboard
                </Link>
                <Link
                  href="/dashboard"
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    pathname === '/dashboard'
                      ? 'border-blue-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  }`}
                >
                  Documents
                </Link>
                <Link
                  href="/portals"
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    pathname.startsWith('/portals')
                      ? 'border-blue-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  }`}
                >
                  Portals
                </Link>
                <Link
                  href="/settings/organization"
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    pathname.startsWith('/settings')
                      ? 'border-blue-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  }`}
                >
                  Settings
                </Link>
              </div>
            )}
          </div>
          <div className="flex items-center">
            {loading ? (
              <div className="text-sm text-gray-500">Loading...</div>
            ) : user ? (
              <div className="flex items-center space-x-4">
                {/* Organization Selector */}
                <div className="relative">
                  <button
                    onClick={() => setShowOrgDropdown(!showOrgDropdown)}
                    className="flex items-center gap-2 px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {isPersonalVault ? (
                      <>
                        <User className="w-4 h-4 text-gray-500" />
                        <span>Personal</span>
                      </>
                    ) : selectedOrganization ? (
                      <>
                        <Building2 className="w-4 h-4 text-gray-500" />
                        <span>{selectedOrganization.name}</span>
                      </>
                    ) : (
                      <>
                        <User className="w-4 h-4 text-gray-500" />
                        <span>Personal</span>
                      </>
                    )}
                    <ChevronDown className="w-4 h-4 text-gray-500" />
                  </button>

                  {showOrgDropdown && (
                    <>
                      <div
                        className="fixed inset-0 z-10"
                        onClick={() => setShowOrgDropdown(false)}
                      />
                      <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-20">
                        <button
                          onClick={() => {
                            setIsPersonalVault(true)
                            setShowOrgDropdown(false)
                          }}
                          className={`w-full text-left px-4 py-2 text-sm flex items-center gap-2 ${
                            isPersonalVault ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          <User className="w-4 h-4" />
                          Personal Vault
                        </button>

                        {organizations.length > 0 && (
                          <>
                            <div className="border-t border-gray-200 my-1" />
                            <div className="px-3 py-1 text-xs font-medium text-gray-500 uppercase">
                              Organizations
                            </div>
                            {organizations.map((org) => (
                              <button
                                key={org.id}
                                onClick={() => {
                                  setSelectedOrganization(org)
                                  setShowOrgDropdown(false)
                                }}
                                className={`w-full text-left px-4 py-2 text-sm flex items-center gap-2 ${
                                  selectedOrganization?.id === org.id
                                    ? 'bg-blue-50 text-blue-700'
                                    : 'text-gray-700 hover:bg-gray-50'
                                }`}
                              >
                                <Building2 className="w-4 h-4" />
                                <div className="flex-1 min-w-0">
                                  <p className="truncate">{org.name}</p>
                                  <p className="text-xs text-gray-500 capitalize">{org.userRole}</p>
                                </div>
                              </button>
                            ))}
                          </>
                        )}
                      </div>
                    </>
                  )}
                </div>

                <span className="text-sm text-gray-700">{user.email}</span>
                <button
                  onClick={() => signOut()}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Sign out
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  href="/login"
                  className="text-sm font-medium text-gray-700 hover:text-gray-900"
                >
                  Sign in
                </Link>
                <Link
                  href="/signup"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
