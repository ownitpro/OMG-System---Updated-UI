'use client'

import { useState, useEffect, Suspense } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useTheme } from '@/contexts/ThemeContext'
import { useAccountAccess } from '@/hooks/useAccountAccess'
import { CreditCard, CheckCircle, AlertCircle, Calendar, DollarSign, Download, Clock, X, Sparkles, Crown, Zap, Building2, Star, ArrowRight, Receipt, HelpCircle, TrendingUp } from 'lucide-react'
import { getStripe } from '@/lib/stripe-client'
import { useRouter, useSearchParams } from 'next/navigation'
import { getPlanLimits, getTrialDaysRemaining, isTrialExpired, type Plan } from '@/lib/plan-limits'
import { getPriceId, type PlanTier, type BillingCycle } from '@/config/stripe-prices'
import { UpgradeToBusinessModal } from '@/components/account/UpgradeToBusinessModal'
import UsageDashboard from '@/components/billing/UsageDashboard'

interface Invoice {
  id: string
  date: string
  amount: number
  status: 'paid' | 'pending' | 'failed'
  downloadUrl: string
}

function BillingContent() {
  const { user, loading: authLoading, refreshUser } = useAuth()
  const { isPersonalAccount, isBusinessAccount } = useAccountAccess()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(false)
  const [currentPlan, setCurrentPlan] = useState<string>('free')
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly')
  const [planTier, setPlanTier] = useState<'personal' | 'business'>('personal')
  const [showModal, setShowModal] = useState(false)
  const [modalMessage, setModalMessage] = useState('')
  const [subscriptionPeriodEnd, setSubscriptionPeriodEnd] = useState<string | null>(null)
  const [subscriptionStatus, setSubscriptionStatus] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)
  const [showUpgradeModal, setShowUpgradeModal] = useState(false)

  // Mock invoices for demonstration
  const [invoices, setInvoices] = useState<Invoice[]>([])

  const fetchInvoices = async () => {
    try {
      const res = await fetch('/api/billing/invoices')
      if (res.ok) {
        const data = await res.json()
        if (data.invoices) {
            setInvoices(data.invoices)
        }
      }
    } catch (error) {
      console.error('Failed to fetch invoices:', error)
    }
  }

  useEffect(() => {
    if (user) {
      fetchInvoices()
    }
  }, [user])

  useEffect(() => {
    setMounted(true)
  }, [])

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login')
    }
  }, [authLoading, user, router])

  useEffect(() => {
    if (user) {
      setCurrentPlan(user.plan || 'free')
      setSubscriptionPeriodEnd(user.subscriptionPeriodEnd || null)
      setSubscriptionStatus(user.stripeSubscriptionStatus || null)
    }
  }, [user])

  // Handle success/cancel redirects from Stripe checkout
  useEffect(() => {
    const success = searchParams.get('success')
    const canceled = searchParams.get('canceled')

    if (success === 'true') {
      setModalMessage('Subscription activated successfully! Your plan will be updated shortly.')
      setShowModal(true)
      refreshUser()
      fetchInvoices()
      router.replace('/settings/billing')
    } else if (canceled === 'true') {
      setModalMessage('Checkout was canceled. You can try again anytime.')
      setShowModal(true)
      router.replace('/settings/billing')
    }
  }, [searchParams, router, refreshUser])

  const allPlans = {
    personal: [
      {
        name: 'Starter',
        id: 'starter',
        tier: 'personal' as const,
        price: { monthly: 9.99, yearly: 107.89 },
        description: 'Personal vault for individuals',
        icon: Zap,
        color: 'teal',
        features: [
          '1 user (personal vault)',
          '40 GB storage',
          '150 Processing Units / mo',
          '8 GB egress / mo',
          '5 active share links',
          '25 pages/PDF limit',
          'Desktop & camera upload (PWA)',
          'Email-to-Vault',
          'Email support',
        ],
        current: currentPlan === 'starter',
      },
      {
        name: 'Growth',
        id: 'growth',
        tier: 'personal' as const,
        price: { monthly: 14.99, yearly: 161.89 },
        description: 'For growing personal needs',
        icon: Star,
        color: 'cyan',
        features: [
          'Everything in Starter',
          '90 GB storage',
          '450 Processing Units / mo',
          '15 GB egress / mo',
          '25 active share links',
          '50 pages/PDF limit',
          'Drive / OneDrive import',
          'Request-files links',
          'Priority email support',
        ],
        current: currentPlan === 'growth',
        popular: true,
      },
      {
        name: 'Pro',
        id: 'pro',
        tier: 'personal' as const,
        price: { monthly: 24.99, yearly: 269.89 },
        description: 'For professionals + family',
        icon: Crown,
        color: 'emerald',
        features: [
          'Everything in Growth',
          '180 GB storage',
          '1,350 Processing Units / mo',
          '30 GB egress / mo',
          '75 active share links',
          '100 pages/PDF limit',
          'Up to 3 people (family)',
          'PII redaction',
          'Audit log (90 days)',
        ],
        current: currentPlan === 'pro',
      },
    ],
    business: [
      {
        name: 'Business Starter',
        id: 'business_starter',
        tier: 'business' as const,
        price: { monthly: 59.99, yearly: 647.89 },
        description: 'For small teams (1-3 seats)',
        icon: Building2,
        color: 'teal',
        perSeat: true,
        features: [
          '1-3 seats',
          '300 GB shared storage',
          '6,750 Processing Units / seat / mo',
          '50 GB egress / mo',
          '25 active share links',
          '25 pages/PDF limit',
          'Team collaboration',
          'Basic reporting',
        ],
        current: currentPlan === 'business_starter',
      },
      {
        name: 'Business Growth',
        id: 'business_growth',
        tier: 'business' as const,
        price: { monthly: 109.99, yearly: 1187.89 },
        description: 'For growing teams (3-10 seats)',
        icon: Star,
        color: 'cyan',
        perSeat: true,
        features: [
          '3-10 seats',
          '500 GB shared storage',
          '19,500 Processing Units / seat / mo',
          '90 GB egress / mo',
          '100 active share links',
          '50 pages/PDF limit',
          'Advanced permissions',
          'Custom workflows',
        ],
        current: currentPlan === 'business_growth',
        popular: true,
      },
      {
        name: 'Business Pro',
        id: 'business_pro',
        tier: 'business' as const,
        price: { monthly: 219.99, yearly: 2375.89 },
        description: 'For larger teams (10-20 seats)',
        icon: Crown,
        color: 'emerald',
        perSeat: true,
        features: [
          '10-20 seats',
          '1 TB shared storage',
          '36,000 Processing Units / seat / mo',
          '110 GB egress / mo',
          '250 active share links',
          '100 pages/PDF limit',
          'SSO integration',
          'Priority support',
        ],
        current: currentPlan === 'business_pro',
      },
    ],
  }

  const plans = allPlans[planTier]

  // Get current plan details (icon, color, name) for the banner
  const getCurrentPlanDetails = () => {
    const allPlansList = [...allPlans.personal, ...allPlans.business]
    const plan = allPlansList.find(p => p.id === currentPlan)

    if (plan) {
      return {
        name: plan.name + ' Plan',
        icon: plan.icon,
        color: plan.color,
        price: plan.price,
        isTrial: false
      }
    }

    // Trial/Free plan defaults
    return {
      name: '14-Day Free Trial',
      icon: Sparkles,
      color: 'cyan',
      price: null,
      isTrial: true
    }
  }

  const currentPlanDetails = getCurrentPlanDetails()

  // Get banner-specific color classes
  const getBannerColorClasses = (color: string) => {
    const colorMap: Record<string, { gradient: string; border: string; iconBg: string; iconText: string; titleText: string; subtitleText: string; badge: string }> = {
      cyan: {
        gradient: 'from-cyan-50/20 to-teal-50/20',
        border: 'border-cyan-100',
        iconBg: 'bg-cyan-100',
        iconText: 'text-cyan-600',
        titleText: 'text-cyan-900',
        subtitleText: 'text-cyan-700',
        badge: 'bg-cyan-100 text-cyan-700'
      },
      teal: {
        gradient: 'from-teal-50/20 to-emerald-50/20',
        border: 'border-teal-100',
        iconBg: 'bg-teal-100',
        iconText: 'text-teal-600',
        titleText: 'text-teal-900',
        subtitleText: 'text-teal-700',
        badge: 'bg-teal-100 text-teal-700'
      },
      emerald: {
        gradient: 'from-emerald-50/20 to-teal-50/20',
        border: 'border-emerald-100',
        iconBg: 'bg-emerald-100',
        iconText: 'text-emerald-600',
        titleText: 'text-emerald-900',
        subtitleText: 'text-emerald-700',
        badge: 'bg-emerald-100 text-emerald-700'
      }
    }
    return colorMap[color] || colorMap.teal
  }

  const bannerColors = getBannerColorClasses(currentPlanDetails.color)
  const BannerIcon = currentPlanDetails.icon

  const getColorClasses = (color: string, isPopular: boolean, isCurrent: boolean) => {
    const colors: Record<string, { border: string; bg: string; icon: string; button: string; badge: string }> = {
      teal: {
        border: isCurrent ? 'border-teal-400' : 'border-slate-100',
        bg: isCurrent ? 'bg-teal-50/50' : 'glass-card',
        icon: 'text-teal-600 bg-teal-100',
        button: 'btn-enhanced-primary shadow-teal-500/25',
        badge: 'bg-teal-100 text-teal-700'
      },
      cyan: {
        border: isCurrent ? 'border-cyan-400' : isPopular ? 'border-cyan-300' : 'border-slate-100',
        bg: isCurrent ? 'bg-cyan-50/50' : 'glass-card',
        icon: 'text-cyan-600 bg-cyan-100',
        button: 'bg-gradient-to-r from-cyan-600 to-cyan-500 text-white hover:from-cyan-700 hover:to-cyan-600 shadow-cyan-500/25',
        badge: 'bg-cyan-100 text-cyan-700'
      },
      emerald: {
        border: isCurrent ? 'border-emerald-400' : 'border-slate-100',
        bg: isCurrent ? 'bg-emerald-50/50' : 'glass-card',
        icon: 'text-emerald-600 bg-emerald-100',
        button: 'bg-gradient-to-r from-emerald-600 to-emerald-500 text-white hover:from-emerald-700 hover:to-emerald-600 shadow-emerald-500/25',
        badge: 'bg-emerald-100 text-emerald-700'
      }
    }
    return colors[color] || colors.teal
  }

  const handlePlanChange = async (planId: string) => {
    if (planId === currentPlan) return

    // If switching to business plan from personal context, might need upgrade flow
    if (isPersonalAccount && planTier === 'business') {
      setShowUpgradeModal(true)
      return
    }

    setLoading(true)

    try {
      // Determine plan type and simplified tier ID
      let type: 'personal' | 'business' = planTier;
      let tier: string = planId;
      
      // Business IDs are prefixed with 'business_' in the UI array, strip it for config lookup
      if (planId.startsWith('business_')) {
          type = 'business';
          tier = planId.replace('business_', '');
      }
      
      // Resolve price ID
      const priceId = getPriceId(type, tier as PlanTier, billingCycle as BillingCycle);
      
      if (!priceId) {
        throw new Error(`Price configuration missing for ${type} ${tier} (${billingCycle})`);
      }

      // Call the correct billing API endpoint
      const response = await fetch('/api/billing/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId,
          userId: user?.id,
          userEmail: user?.email,
          mode: 'subscription',
          planKey: `${type}_${tier}`,
          // Default seat count for now, could prompt user in future
          seatCount: type === 'business' ? 1 : undefined 
        }),
      })

      if (!response.ok) {
        let errorMsg = 'Failed to create checkout session';
        try {
            const error = await response.json();
            errorMsg = error.error || errorMsg;
        } catch {}
        
        throw new Error(errorMsg)
      }

      const { url } = await response.json()
      
      // Direct redirect to Stripe URL returned by backend
      window.location.href = url;

    } catch (error: any) {
      console.error('Error creating checkout session:', error)
      setModalMessage(error.message || 'Failed to start checkout process. Please try again.')
      setShowModal(true)
    } finally {
      setLoading(false)
    }
  }

  const handleManageSubscription = async () => {
    setLoading(true)

    try {
      const response = await fetch('/api/stripe/create-portal-session', {
        method: 'POST',
        headers: {
          'x-user-id': user?.id || '',
        },
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to create portal session')
      }

      const { url } = await response.json()
      window.location.href = url
    } catch (error: any) {
      console.error('Error creating portal session:', error)
      setModalMessage(error.message || 'Failed to open billing portal. Please try again.')
      setShowModal(true)
      setLoading(false)
    }
  }

  if (authLoading || !user) {
    return (
      <div className="p-8 flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-teal-500/20 border-t-teal-600"></div>
            <CreditCard className="absolute inset-0 m-auto w-5 h-5 text-teal-600" />
          </div>
          <p className="text-sm text-white/70 dark:text-slate-200 font-medium">Loading billing information...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-4 sm:p-8 overflow-x-hidden">
      {/* Header */}
      <div className={`flex items-center gap-3 mb-8 ${mounted ? 'animate-fadeIn' : 'opacity-0'}`}>
        <div className="p-3 rounded-xl bg-teal-500/10 shadow-lg shadow-teal-500/10">
          <CreditCard className="w-6 h-6 text-teal-600" />
        </div>
        <div>
          <h2 className="text-2xl font-black text-white dark:text-white font-display">
            Billing & Subscription
          </h2>
          <p className="text-sm mt-0.5 text-white/70 dark:text-slate-200 font-medium">
            Manage your subscription and billing information
          </p>
        </div>
      </div>

      {/* Trial Status Banner */}
      {(currentPlan === 'free' || currentPlan === 'trial') && user?.trialExpiresAt && (
        <div className={`mb-6 p-3 sm:p-4 rounded-2xl glass-card border-white/20 ${mounted ? 'animate-slideUp' : 'opacity-0'}`} style={{ animationDelay: '50ms' }}>
          {(() => {
            const daysRemaining = getTrialDaysRemaining(user.trialExpiresAt)
            const trialExpired = isTrialExpired(user.trialExpiresAt)

            return (
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg flex-shrink-0 ${
                    trialExpired
                      ? 'bg-red-100'
                      : daysRemaining <= 3
                        ? 'bg-amber-100'
                        : 'bg-teal-100'
                  }`}>
                    <Clock className={`w-5 h-5 ${
                      trialExpired
                        ? 'text-red-600'
                        : daysRemaining <= 3
                          ? 'text-amber-600'
                          : 'text-teal-600'
                    }`} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className={`text-sm sm:text-base font-bold text-white dark:text-white`}>
                      {trialExpired ? 'Trial Expired' : `${daysRemaining} Day${daysRemaining !== 1 ? 's' : ''} Remaining in Trial`}
                    </h4>
                    <p className={`text-xs sm:text-sm mt-1 text-white/70 dark:text-slate-200 font-medium`}>
                      {trialExpired
                        ? 'Your trial has ended. Upgrade now to continue using all features.'
                        : `Trial ends ${new Date(user.trialExpiresAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    const starterPlanElement = document.getElementById('plan-starter')
                    if (starterPlanElement) {
                      starterPlanElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
                    }
                  }}
                  className={`flex items-center justify-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300 flex-shrink-0 whitespace-nowrap btn-enhanced-primary shadow-lg`}
                >
                  {trialExpired ? 'Upgrade Now' : 'View Plans'}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )
          })()}
        </div>
      )}

      {/* Current Plan Card */}
      <div className={`p-4 rounded-2xl border mb-6 ${mounted ? 'animate-slideUp' : 'opacity-0'} bg-gradient-to-br ${bannerColors.gradient} ${bannerColors.border}`} style={{ animationDelay: '100ms' }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-xl ${bannerColors.iconBg}`}>
              <BannerIcon className={`w-5 h-5 ${bannerColors.iconText}`} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className={`text-base font-bold text-white dark:text-white`}>
                  {currentPlanDetails.name}
                </h3>
                {subscriptionStatus && (
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold capitalize ${bannerColors.badge}`}>
                    {subscriptionStatus}
                  </span>
                )}
                {/* Trial Days Remaining Badge */}
                {currentPlanDetails.isTrial && user?.trialExpiresAt && (
                  <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    getTrialDaysRemaining(user.trialExpiresAt) <= 3
                      ? 'bg-amber-100 text-amber-700'
                      : bannerColors.badge
                  }`}>
                    <Clock className="w-3 h-3" />
                    {getTrialDaysRemaining(user.trialExpiresAt)} days left
                  </div>
                )}
              </div>
              <div className="flex items-center gap-3 mt-0.5">
                <p className={`text-xs font-medium text-white/70 dark:text-slate-200`}>
                  {currentPlanDetails.isTrial
                    ? '10% of Starter tier features'
                    : currentPlanDetails.price
                      ? `$${currentPlanDetails.price[billingCycle]} / ${billingCycle === 'monthly' ? 'mo' : 'yr'}`
                      : 'Custom pricing'}
                </p>
                <span className={`text-[10px] text-slate-300`}>•</span>
                <p className={`text-xs font-medium text-white/70 dark:text-slate-200`}>
                  {currentPlanDetails.isTrial
                    ? (user?.trialExpiresAt
                        ? `Ends: ${new Date(user.trialExpiresAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`
                        : 'Upgrade anytime')
                    : subscriptionPeriodEnd
                    ? `Next: ${new Date(subscriptionPeriodEnd).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`
                    : 'Billing date updating...'}
                </p>
              </div>
            </div>
          </div>
          {!currentPlanDetails.isTrial && (
            <button
              onClick={handleManageSubscription}
              disabled={loading}
              className={`px-3 py-1.5 rounded-lg text-sm font-bold transition-all duration-300 bg-white shadow-sm hover:shadow text-white dark:text-white disabled:opacity-50`}
            >
              Manage
            </button>
          )}
        </div>
      </div>

      {/* Billing Cycle & Plan Tier Toggle Row */}
      <div className={`flex flex-col items-center gap-3 mb-6 ${mounted ? 'animate-slideUp' : 'opacity-0'}`} style={{ animationDelay: '150ms' }}>
        {/* Plan Tier Toggle */}
        <div className="inline-flex rounded-xl p-1 bg-white border border-slate-200 shadow-sm">
          <button
            onClick={() => setPlanTier('personal')}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all duration-300 ${
              planTier === 'personal'
                ? 'bg-teal-600 text-white shadow-md'
                : 'text-white/70 dark:text-slate-200 hover:text-white dark:text-white hover:bg-slate-50'
            }`}
          >
            Personal
          </button>
          <button
            onClick={() => setPlanTier('business')}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all duration-300 ${
              planTier === 'business'
                ? 'bg-teal-600 text-white shadow-md'
                : 'text-white/70 dark:text-slate-200 hover:text-white dark:text-white hover:bg-slate-50'
            }`}
          >
            Business
          </button>
        </div>

        {/* Billing Cycle Toggle */}
        {currentPlan === 'free' && (
          <div className="flex items-center gap-2 sm:gap-3">
            <span className={`text-xs font-bold ${billingCycle === 'monthly' ? 'text-white dark:text-white' : 'text-slate-400'}`}>
              Monthly
            </span>
            <button
              onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-300 ease-in-out focus:outline-none bg-teal-600`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-300 ease-in-out ${
                  billingCycle === 'yearly' ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
            <span className={`text-xs font-bold flex items-center gap-1 sm:gap-1.5 ${billingCycle === 'yearly' ? 'text-white dark:text-white' : 'text-slate-400'}`}>
              Yearly
              <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-700`}>
                -15%
              </span>
            </span>
          </div>
        )}
      </div>

      {/* Plan Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 pt-3">
        {plans.map((plan, index) => {
          const colorClasses = getColorClasses(plan.color, plan.popular || false, plan.current)
          const PlanIcon = plan.icon

          return (
            <div
              key={plan.id}
              id={`plan-${plan.id}`}
              className={`relative p-6 rounded-3xl border-2 transition-all duration-300 ${
                mounted ? 'animate-slideUp' : 'opacity-0'
              } ${colorClasses.border} ${colorClasses.bg} glass-card hover:shadow-2xl`}
              style={{ animationDelay: `${(index + 4) * 50}ms` }}
            >
              {plan.popular && (
                <span className={`absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider z-10 bg-gradient-to-r from-cyan-600 to-teal-500 text-white shadow-lg shadow-teal-500/30`}>
                  Popular
                </span>
              )}

              <div className="text-center mb-4">
                <div className={`inline-flex p-2 rounded-lg mb-2 ${colorClasses.icon}`}>
                  <PlanIcon className="w-5 h-5" />
                </div>
                <h4 className="text-lg font-black text-white dark:text-white font-display">
                  {plan.name}
                </h4>
                <p className="text-xs mt-1 text-white/70 dark:text-slate-200 font-medium">
                  {plan.description}
                </p>
                <div className="mt-2">
                  <span className="text-3xl font-black text-white dark:text-white font-display">
                    ${plan.price[billingCycle]}
                  </span>
                  {plan.price[billingCycle] > 0 && (
                    <span className="text-sm text-white/70 dark:text-slate-200 font-medium">
                      /{billingCycle === 'monthly' ? 'mo' : 'yr'}
                    </span>
                  )}
                </div>
              </div>

              <ul className="space-y-1.5 mb-4">
                {plan.features.slice(0, 5).map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-teal-600" />
                    <span className="text-xs text-white/70 dark:text-slate-200 font-medium">
                      {feature}
                    </span>
                  </li>
                ))}
                {plan.features.length > 5 && (
                  <li className="text-xs text-center pt-2 text-slate-400 font-bold uppercase tracking-wider">
                    +{plan.features.length - 5} more features
                  </li>
                )}
              </ul>

              <button
                disabled={plan.current || loading}
                onClick={() => handlePlanChange(plan.id)}
                className={`w-full py-3 px-4 rounded-xl text-sm font-bold transition-all duration-300 ${
                  plan.current
                    ? 'cursor-default bg-teal-50 text-teal-600 border border-teal-200'
                    : loading
                      ? 'cursor-wait opacity-50'
                      : 'bg-white'
                } ${plan.current ? '' : colorClasses.button}`}
              >
                {loading ? 'Processing...' : plan.current ? '✓ Current Plan' : 'Subscribe'}
              </button>
            </div>
          )
        })}
      </div>

      {/* Usage Dashboard - New comprehensive usage metrics */}
      {user && (
        <div className={`mb-6 ${mounted ? 'animate-slideUp' : 'opacity-0'}`} style={{ animationDelay: '350ms' }}>
          <UsageDashboard
            userId={user.id}
            plan={currentPlan as Plan}
            isBusinessAccount={isBusinessAccount}
          />
        </div>
      )}

      {/* Billing History */}
      <div className={`p-6 rounded-3xl border mb-6 ${mounted ? 'animate-slideUp' : 'opacity-0'} glass-card border-white/20`} style={{ animationDelay: '400ms' }}>
        <h3 className="text-lg font-bold mb-6 flex items-center gap-2 text-white dark:text-white font-display">
          <Receipt className="w-5 h-5 text-teal-600" />
          Billing History
        </h3>

        {invoices.length === 0 ? (
          <div className="text-center py-12 rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/50">
            <Clock className="w-12 h-12 mx-auto mb-3 text-slate-300" />
            <p className="text-sm font-bold text-white dark:text-white">No billing history yet</p>
            <p className="text-xs mt-1 text-white/70 dark:text-slate-200">Your invoices will appear here</p>
          </div>
        ) : (
          <div className="space-y-2">
            {invoices.map((invoice) => (
              <div key={invoice.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 rounded-xl border bg-white/50 border-slate-100 hover:border-teal-100 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg flex-shrink-0 bg-teal-50 text-teal-600">
                    <Receipt className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold text-white dark:text-white">{invoice.id}</p>
                    <p className="text-xs text-white/70 dark:text-slate-200 font-medium">
                      {new Date(invoice.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 sm:gap-3 ml-11 sm:ml-0">
                  <span className="text-sm font-bold text-white dark:text-white font-mono">
                    ${invoice.amount.toFixed(2)}
                  </span>
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold flex-shrink-0 uppercase tracking-wide ${
                    invoice.status === 'paid'
                      ? 'bg-emerald-100 text-emerald-700'
                      : invoice.status === 'pending'
                        ? 'bg-amber-100 text-amber-700'
                        : 'bg-red-100 text-red-700'
                  }`}>
                    {invoice.status.toUpperCase()}
                  </span>
                  <button
                    onClick={handleManageSubscription}
                    disabled={loading}
                    className="flex items-center gap-1 text-xs font-bold transition-colors flex-shrink-0 text-teal-600 hover:text-teal-700 disabled:opacity-50"
                  >
                    <Download className="w-3.5 h-3.5" />
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Help Section */}
      <div className={`p-4 sm:p-5 rounded-2xl glass-card border-white/20 ${mounted ? 'animate-slideUp' : 'opacity-0'} bg-gradient-to-br from-teal-50/50 to-cyan-50/50`} style={{ animationDelay: '450ms' }}>
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-xl flex-shrink-0 bg-white/50 text-teal-600 shadow-sm">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div className="min-w-0 flex-1">
            <h4 className="text-sm font-bold text-white dark:text-white">
              Need help with billing?
            </h4>
            <p className="text-xs mt-1 break-words text-white/70 dark:text-slate-200 font-medium">
              Contact{' '}
              <a href="mailto:billing@securevaultdocs.com" className="underline hover:no-underline font-bold text-teal-700 break-all">
                billing@securevaultdocs.com
              </a>
              {' '}or visit our{' '}
              <a href="/help" className="underline hover:no-underline font-bold text-teal-700">
                help center
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Info Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fadeIn"
            onClick={() => setShowModal(false)}
          />

          <div className="relative w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-scaleIn glass-card bg-white/95 backdrop-blur-xl border-white/20">
            <div className="relative px-6 py-5 bg-gradient-to-r from-teal-50 to-cyan-50 border-b border-teal-100">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-teal-100 text-teal-600">
                  <AlertCircle className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white dark:text-white font-display">
                  Information
                </h3>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 p-2 rounded-xl transition-colors hover:bg-slate-100 text-slate-400 hover:text-white dark:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6">
              <p className="text-sm text-white/70 dark:text-slate-200 font-medium">{modalMessage}</p>
            </div>

            <div className="flex justify-end px-6 py-4 border-t border-slate-100 bg-slate-50/50">
              <button
                onClick={() => setShowModal(false)}
                className="px-6 py-2.5 btn-enhanced-primary shadow-lg shadow-teal-500/25 transition-all duration-300 font-bold"
              >
                OK
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

      {/* Account Upgrade Modal */}
      <UpgradeToBusinessModal
        isOpen={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
      />
    </div>
  )
}

export default function BillingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="text-gray-400">Loading...</div></div>}>
      <BillingContent />
    </Suspense>
  )
}
