'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { User, Building2, Users, Shield, CreditCard, FileText, ChevronRight, ChevronDown } from 'lucide-react'
import { AppTopNav } from '@/components/layout/AppTopNav'
import { useAuth } from '@/contexts/AuthContext'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { useAccountAccess } from '@/hooks/useAccountAccess'

function SettingsLayoutContent({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const { user, loading: authLoading } = useAuth()
  const { allowedSettingsSections } = useAccountAccess()
  const [mounted, setMounted] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Close dropdown when route changes
  useEffect(() => {
    setIsDropdownOpen(false)
  }, [pathname])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (!target.closest('.settings-dropdown')) {
        setIsDropdownOpen(false)
      }
    }
    if (isDropdownOpen) {
      document.addEventListener('click', handleClickOutside)
    }
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [isDropdownOpen])

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login')
    }
  }, [authLoading, user, router])

  // Show loading while checking auth
  if (authLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center landing-bg">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
      </div>
    )
  }

  // All navigation items with section identifiers
  const allNavigation = [
    {
      name: 'Profile',
      href: '/settings/profile',
      section: 'profile',
      icon: User,
      description: 'Manage your personal information',
      color: 'blue',
    },
    {
      name: 'Organization',
      href: '/settings/organization',
      section: 'organization',
      icon: Building2,
      description: 'Organization settings and details',
      color: 'purple',
    },
    {
      name: 'Members',
      href: '/settings/members',
      section: 'members',
      icon: Users,
      description: 'Manage team members and roles',
      color: 'emerald',
    },
    {
      name: 'Security',
      href: '/settings/security',
      section: 'security',
      icon: Shield,
      description: 'Security and authentication settings',
      color: 'amber',
    },
    {
      name: 'Billing',
      href: '/settings/billing',
      section: 'billing',
      icon: CreditCard,
      description: 'Subscription and billing information',
      color: 'cyan',
    },
    {
      name: 'Audit Logs',
      href: '/settings/auditlogs',
      section: 'auditlogs',
      icon: FileText,
      description: 'View security and activity logs',
      color: 'blue',
    },
  ]

  // Filter navigation based on account type
  // Personal accounts: Profile, Security, Billing only
  // Business accounts: All sections
  const navigation = allNavigation.filter(item =>
    allowedSettingsSections.includes(item.section)
  )

  const getColorClasses = (color: string, isActive: boolean) => {
    const colors: Record<string, { active: string; icon: string; hover: string }> = {
      blue: {
        active: 'bg-blue-50 border-blue-200 text-blue-700',
        icon: 'text-blue-600',
        hover: 'hover:bg-blue-50/50',
      },
      purple: {
        active: 'bg-purple-50 border-purple-200 text-purple-700',
        icon: 'text-purple-600',
        hover: 'hover:bg-purple-50/50',
      },
      emerald: {
        active: 'bg-emerald-50 border-emerald-200 text-emerald-700',
        icon: 'text-emerald-600',
        hover: 'hover:bg-emerald-50/50',
      },
      amber: {
        active: 'bg-amber-50 border-amber-200 text-amber-700',
        icon: 'text-amber-600',
        hover: 'hover:bg-amber-50/50',
      },
      cyan: {
        active: 'bg-cyan-50 border-cyan-200 text-cyan-700',
        icon: 'text-cyan-600',
        hover: 'hover:bg-cyan-50/50',
      },
    }
    return colors[color] || colors.blue
  }

  return (
    <div className="min-h-screen flex flex-col relative landing-bg font-outfit selection:bg-teal-mid/30 text-navy bg-fixed">
      <div className="grain-overlay absolute inset-0 z-0 pointer-events-none opacity-[0.35]" />
      
      <div className="relative z-50 w-full mb-4">
        <AppTopNav />
      </div>

      <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-28 pb-8 relative z-10">
        {/* Header with animation */}
        <div className={`mb-4 sm:mb-8 relative z-20 ${mounted ? 'animate-fadeIn' : 'opacity-0'}`}>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-navy font-display">
                Settings
              </h1>
              <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-slate-600 font-medium">
                Manage your account settings and preferences
              </p>
            </div>
            {/* Mobile Dropdown Navigation */}
            <div className="lg:hidden relative settings-dropdown">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 px-3 py-2 min-h-[44px] rounded-xl transition-all glass-card bg-white/40 hover:bg-white/60 text-navy border border-white/20"
              >
                {(() => {
                  const current = navigation.find(n => n.href === pathname)
                  const Icon = current?.icon || User
                  return (
                    <>
                      <Icon className="w-4 h-4" />
                      <span className="text-sm font-bold">{current?.name || 'Settings'}</span>
                      <ChevronDown className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                    </>
                  )
                })()}
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 rounded-xl shadow-xl z-50 overflow-hidden glass-card bg-white/80 border border-white/20 backdrop-blur-xl">
                  {navigation.map((item) => {
                    const isActive = pathname === item.href
                    const Icon = item.icon
                    
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setIsDropdownOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3 transition-colors ${
                          isActive
                            ? 'bg-teal-500/10 text-teal-600 font-bold'
                            : 'hover:bg-white/40 text-slate-600 hover:text-navy font-medium'
                        }`}
                      >
                        <Icon className={`w-4 h-4 ${isActive ? 'text-teal-600' : 'text-slate-500'}`} />
                        <span className="text-sm">
                          {item.name}
                        </span>
                        {isActive && (
                          <ChevronRight className="w-4 h-4 ml-auto text-teal-600" />
                        )}
                      </Link>
                    )
                  })}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex gap-4 lg:gap-8 relative z-10">
          {/* Sidebar Navigation - Desktop */}
          <aside className="hidden lg:block w-72 flex-shrink-0">
            <nav className="space-y-3">
              {navigation.map((item, index) => {
                const isActive = pathname === item.href
                const Icon = item.icon
                
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`group relative flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 ${
                      mounted ? 'animate-slideUp' : 'opacity-0'
                    } ${
                      isActive
                        ? 'bg-gradient-to-r from-teal-500 to-teal-400 text-white shadow-lg shadow-teal-500/25'
                        : 'glass-card bg-white/40 hover:bg-white/60 text-slate-600 hover:text-navy hover:-translate-x-[-4px]'
                    }`}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                      <div className={`p-2 rounded-lg transition-all duration-300 ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : 'bg-white/50 text-slate-500 group-hover:text-teal-dark group-hover:bg-teal-mid/10'
                      }`}>
                        <Icon className="w-5 h-5" />
                      </div>

                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-bold ${isActive ? 'text-white' : 'text-navy'}`}>
                        {item.name}
                      </p>
                      <p className={`text-xs mt-0.5 line-clamp-1 font-medium ${isActive ? 'text-white/90' : 'text-slate-600'}`}>
                        {item.description}
                      </p>
                    </div>

                    {/* Arrow indicator */}
                    {isActive && (
                       <ChevronRight className="w-4 h-4 text-white/80" />
                    )}
                  </Link>
                )
              })}
            </nav>

            {/* Help Card */}
            <div className={`mt-6 p-5 rounded-2xl transition-all duration-500 glass-card bg-gradient-to-br from-blue-500/10 to-indigo-500/10 border-blue-200/50 ${
              mounted ? 'animate-fadeIn' : 'opacity-0'
            }`}
            style={{ animationDelay: '300ms' }}
            >
              <h4 className="text-sm font-bold text-navy font-display">
                Need Help?
              </h4>
              <p className="text-xs mt-1 text-slate-600 font-medium">
                Check our documentation or contact support for assistance.
              </p>
              <a
                href="/help"
                className="inline-flex items-center gap-1 text-xs font-bold mt-3 transition-colors text-blue-600 hover:text-blue-700 bg-blue-500/10 px-3 py-1.5 rounded-lg hover:bg-blue-500/20"
              >
                Visit Help Center
                <ChevronRight className="w-3 h-3" />
              </a>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            <div className={`rounded-3xl shadow-xl shadow-teal-900/5 overflow-visible transition-all duration-500 glass-card backdrop-blur-3xl border-white/60 bg-white/60 ${
              mounted ? 'animate-fadeIn' : 'opacity-0'
            }`}
            style={{ animationDelay: '150ms' }}
            >
              {children}
            </div>
          </main>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-6 text-xs text-center mt-auto transition-colors text-slate-400 font-medium relative z-10">
        Powered by OMGsystems • 2025
      </footer>


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
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
        .animate-slideUp {
          animation: slideUp 0.4s ease-out forwards;
        }
      `}</style>
    </div>
  )
}

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeProvider>
      <SettingsLayoutContent>{children}</SettingsLayoutContent>
    </ThemeProvider>
  )
}
