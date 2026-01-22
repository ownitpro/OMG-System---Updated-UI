'use client'

import { useState, useEffect } from 'react'
import { useTheme } from '@/contexts/ThemeContext'
import {
  Zap,
  HardDrive,
  Download,
  Link2,
  Calendar,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Settings,
  TrendingUp,
} from 'lucide-react'
import { getPlanLimits, type Plan } from '@/lib/plan-limits'
import { STRIPE_PRICES_TOPUP } from '@/config/stripe-prices'

interface UsageData {
  processing: {
    monthlyUsed: number
    monthlyLimit: number
    dailyUsed: number
    dailyLimit: number
    bonusUnits: number
  }
  storage: {
    used: number
    limit: number
  }
  egress: {
    used: number
    limit: number
  }
  shareLinks: {
    active: number
    limit: number
  }
  quickStoreCount: number
}

interface UsageDashboardProps {
  userId: string
  plan: Plan
  isBusinessAccount?: boolean
  orgId?: string
}

export default function UsageDashboard({
  userId,
  plan,
  isBusinessAccount = false,
  orgId,
}: UsageDashboardProps) {
  const { isDarkMode } = useTheme()
  const [usage, setUsage] = useState<UsageData | null>(null)
  const [loading, setLoading] = useState(true)
  const [autoTopUpEnabled, setAutoTopUpEnabled] = useState(false)
  const [autoTopUpPack, setAutoTopUpPack] = useState('pu_pack_medium')
  const [savingSettings, setSavingSettings] = useState(false)
  const [purchasingPack, setPurchasingPack] = useState<string | null>(null)

  const limits = getPlanLimits(plan)

  useEffect(() => {
    fetchUsage()
  }, [userId, orgId])

  const fetchUsage = async () => {
    try {
      setLoading(true)
      const endpoint = orgId
        ? `/api/org/${orgId}/usage`
        : '/api/user/usage'

      const response = await fetch(endpoint)
      if (response.ok) {
        const data = await response.json()
        setUsage(data.usage)
        setAutoTopUpEnabled(data.autoTopUpEnabled || false)
        setAutoTopUpPack(data.autoTopUpPack || 'pu_pack_medium')
      }
    } catch (error) {
      console.error('Failed to fetch usage:', error)
    } finally {
      setLoading(false)
    }
  }

  const toggleAutoTopUp = async () => {
    try {
      setSavingSettings(true)
      const response = await fetch('/api/billing/top-up', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'update_settings',
          settings: { enabled: !autoTopUpEnabled },
        }),
      })

      if (response.ok) {
        setAutoTopUpEnabled(!autoTopUpEnabled)
      }
    } catch (error) {
      console.error('Failed to update auto top-up:', error)
    } finally {
      setSavingSettings(false)
    }
  }

  const handleSetAutoTopUpPack = async (pack: string) => {
    try {
      setSavingSettings(true)
      const response = await fetch('/api/billing/top-up', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'update_settings',
          settings: { pack },
        }),
      })

      if (response.ok) {
        setAutoTopUpPack(pack)
      }
    } catch (error) {
      console.error('Failed to update auto top-up pack:', error)
    } finally {
      setSavingSettings(false)
    }
  }

  const handlePurchasePack = async (packId: string) => {
    try {
      setPurchasingPack(packId)
      const response = await fetch('/api/billing/top-up', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'purchase',
          packId: packId,
        }),
      })

      const data = await response.json()

      if (data.url) {
        // Redirect to Stripe checkout
        window.location.href = data.url
      } else if (data.success) {
        // Instant purchase (e.g., using saved card)
        fetchUsage() // Refresh usage data
      }
    } catch (error) {
      console.error('Failed to purchase pack:', error)
    } finally {
      setPurchasingPack(null)
    }
  }

  const getPercentage = (used: number, limit: number) => {
    if (limit <= 0) return 0
    return Math.min((used / limit) * 100, 100)
  }

  const getUsageColor = (percentage: number) => {
    if (percentage >= 95) return 'red'
    if (percentage >= 70) return 'amber'
    return 'emerald'
  }

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 B'
    const k = 1024
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  if (loading) {
    return (
      <div className={`p-6 rounded-2xl border ${isDarkMode ? 'bg-slate-800/50 border-slate-700' : 'bg-white border-gray-200'}`}>
        <div className="flex items-center justify-center py-8">
          <RefreshCw className={`w-6 h-6 animate-spin ${isDarkMode ? 'text-slate-400' : 'text-gray-400'}`} />
          <span className={`ml-2 ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>Loading usage data...</span>
        </div>
      </div>
    )
  }

  // Use mock data if API not returning data yet
  const displayUsage = usage || {
    processing: {
      monthlyUsed: 45,
      monthlyLimit: limits.processingUnitsPerMonth,
      dailyUsed: 12,
      dailyLimit: limits.dailyProcessingLimit,
      bonusUnits: 0,
    },
    storage: {
      used: 2.5 * 1024 * 1024 * 1024, // 2.5 GB in bytes
      limit: limits.storageGb * 1024 * 1024 * 1024,
    },
    egress: {
      used: 1.2 * 1024 * 1024 * 1024, // 1.2 GB in bytes
      limit: limits.egressGbPerMonth * 1024 * 1024 * 1024,
    },
    shareLinks: {
      active: 3,
      limit: limits.activeShareLinks,
    },
    quickStoreCount: 0,
  }

  const processingMonthlyPercent = getPercentage(displayUsage.processing.monthlyUsed, displayUsage.processing.monthlyLimit)
  const processingDailyPercent = getPercentage(displayUsage.processing.dailyUsed, displayUsage.processing.dailyLimit)
  const storagePercent = getPercentage(displayUsage.storage.used, displayUsage.storage.limit)
  const egressPercent = getPercentage(displayUsage.egress.used, displayUsage.egress.limit)
  const shareLinksPercent = getPercentage(displayUsage.shareLinks.active, displayUsage.shareLinks.limit)

  return (
    <div className="p-6 rounded-3xl glass-card-premium border-white/20">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold flex items-center gap-2 text-navy font-display">
          <TrendingUp className="w-5 h-5 text-teal-600" />
          Usage This Month
        </h3>
        <button
          onClick={fetchUsage}
          className="p-2 rounded-xl transition-all hover:bg-white hover:shadow-sm text-slate-500 hover:text-teal-600 active:scale-95"
          title="Refresh"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Quick Store Warning */}
      {displayUsage.quickStoreCount > 0 && (
        <div className="mb-6 p-4 rounded-xl flex items-start gap-4 bg-amber-50 border border-amber-200 shadow-sm">
          <AlertTriangle className="w-5 h-5 flex-shrink-0 text-amber-600" />
          <div>
            <p className="text-sm font-bold text-amber-900">
              {displayUsage.quickStoreCount} Unprocessed File{displayUsage.quickStoreCount > 1 ? 's' : ''}
            </p>
            <p className="text-xs mt-1 text-amber-700">
              These files were saved but not processed due to limits. Process them when usage resets.
            </p>
          </div>
        </div>
      )}

      {/* Usage Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        {/* Processing Units - Monthly */}
        <UsageMeter
          icon={Zap}
          label="Processing Units"
          sublabel="Monthly"
          current={displayUsage.processing.monthlyUsed}
          limit={displayUsage.processing.monthlyLimit}
          bonus={displayUsage.processing.bonusUnits}
          percentage={processingMonthlyPercent}
          color={getUsageColor(processingMonthlyPercent)}
          isDarkMode={false}
        />

        {/* Processing Units - Daily */}
        <UsageMeter
          icon={Calendar}
          label="Processing Units"
          sublabel="Today"
          current={displayUsage.processing.dailyUsed}
          limit={displayUsage.processing.dailyLimit}
          percentage={processingDailyPercent}
          color={getUsageColor(processingDailyPercent)}
          isDarkMode={false}
        />

        {/* Storage */}
        <UsageMeter
          icon={HardDrive}
          label="Storage"
          current={formatBytes(displayUsage.storage.used)}
          limit={`${limits.storageGb} GB`}
          percentage={storagePercent}
          color={getUsageColor(storagePercent)}
          isDarkMode={false}
          rawCurrent={displayUsage.storage.used}
          rawLimit={displayUsage.storage.limit}
        />

        {/* Egress / Downloads */}
        <UsageMeter
          icon={Download}
          label="Downloads"
          sublabel="Egress"
          current={formatBytes(displayUsage.egress.used)}
          limit={`${limits.egressGbPerMonth} GB`}
          percentage={egressPercent}
          color={getUsageColor(egressPercent)}
          isDarkMode={false}
          rawCurrent={displayUsage.egress.used}
          rawLimit={displayUsage.egress.limit}
        />

        {/* Active Share Links */}
        <UsageMeter
          icon={Link2}
          label="Active Share Links"
          current={displayUsage.shareLinks.active}
          limit={displayUsage.shareLinks.limit}
          percentage={shareLinksPercent}
          color={getUsageColor(shareLinksPercent)}
          isDarkMode={false}
          isUnlimited={displayUsage.shareLinks.limit === -1}
        />
      </div>

      {/* Processing Unit Packs */}
      <div className="p-6 rounded-3xl border border-white/20 mb-6 bg-white/40">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-xl bg-cyan-100 text-cyan-600">
            <Zap className="w-5 h-5" />
          </div>
          <h4 className="text-lg font-bold text-navy font-display">
            Buy Processing Units
          </h4>
        </div>
        <p className="text-sm mb-4 text-slate-600 font-semibold">
          Need more processing power? Purchase additional Processing Units.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <PUPackCard
            name="Small"
            units={STRIPE_PRICES_TOPUP.pu_pack_small.units}
            price={STRIPE_PRICES_TOPUP.pu_pack_small.amountUsd}
            isDarkMode={false}
            onPurchase={() => handlePurchasePack('pu_pack_small')}
            purchasing={purchasingPack === 'pu_pack_small'}
          />
          <PUPackCard
            name="Medium"
            units={STRIPE_PRICES_TOPUP.pu_pack_medium.units}
            price={STRIPE_PRICES_TOPUP.pu_pack_medium.amountUsd}
            isDarkMode={false}
            onPurchase={() => handlePurchasePack('pu_pack_medium')}
            purchasing={purchasingPack === 'pu_pack_medium'}
            popular
          />
          <PUPackCard
            name="Large"
            units={STRIPE_PRICES_TOPUP.pu_pack_large.units}
            price={STRIPE_PRICES_TOPUP.pu_pack_large.amountUsd}
            isDarkMode={false}
            onPurchase={() => handlePurchasePack('pu_pack_large')}
            purchasing={purchasingPack === 'pu_pack_large'}
          />
        </div>
      </div>

      {/* Auto Top-Up Toggle */}
      <div className="p-6 rounded-3xl border border-white/20 bg-white/40">
        <div className="flex items-center justify-between">
          <div className="flex items-start gap-4">
            <div className="p-2.5 rounded-xl bg-purple-100 text-purple-600">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-base font-bold text-navy">
                Auto Top-Up
              </h4>
              <p className="text-sm mt-1 text-slate-600 font-semibold">
                Automatically purchase PU when you hit 95% usage
              </p>
            </div>
          </div>
          <button
            onClick={toggleAutoTopUp}
            disabled={savingSettings}
            className={`relative inline-flex h-7 w-12 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
              autoTopUpEnabled
                ? 'bg-purple-600 shadow-lg shadow-purple-500/30'
                : 'bg-slate-200'
            } ${savingSettings ? 'opacity-50 cursor-wait' : ''}`}
          >
            <span
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                autoTopUpEnabled ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
        {autoTopUpEnabled && (
          <div className="mt-3">
            <p className={`text-xs mb-2 ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>
              Select default pack for auto top-up:
            </p>
            <div className="flex gap-2">
              {['pu_pack_small', 'pu_pack_medium', 'pu_pack_large'].map((pack) => (
                <button
                  key={pack}
                  onClick={() => handleSetAutoTopUpPack(pack)}
                  className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
                    autoTopUpPack === pack
                      ? 'bg-purple-600 text-white shadow-md'
                      : 'bg-white border border-slate-200 text-slate-500 hover:text-navy hover:bg-slate-50'
                  }`}
                >
                  {pack === 'pu_pack_small' && `Small (${STRIPE_PRICES_TOPUP.pu_pack_small.units})`}
                  {pack === 'pu_pack_medium' && `Medium (${STRIPE_PRICES_TOPUP.pu_pack_medium.units})`}
                  {pack === 'pu_pack_large' && `Large (${STRIPE_PRICES_TOPUP.pu_pack_large.units})`}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// Usage Meter Sub-component
interface UsageMeterProps {
  icon: React.ComponentType<{ className?: string }>
  label: string
  sublabel?: string
  current: number | string
  limit: number | string
  bonus?: number
  percentage: number
  color: 'emerald' | 'amber' | 'red'
  isDarkMode: boolean
  isUnlimited?: boolean
  rawCurrent?: number
  rawLimit?: number
}

function UsageMeter({
  icon: Icon,
  label,
  sublabel,
  current,
  limit,
  bonus,
  percentage,
  color,
  isDarkMode,
  isUnlimited,
}: UsageMeterProps) {
  const colorClasses = {
    emerald: {
      bg: 'bg-teal-500/10',
      text: 'text-teal-600',
      bar: 'from-teal-500 to-emerald-400',
      barBg: 'bg-teal-100',
    },
    amber: {
      bg: 'bg-amber-500/10',
      text: 'text-amber-600',
      bar: 'from-amber-500 to-orange-400',
      barBg: 'bg-amber-100',
    },
    red: {
      bg: 'bg-red-500/10',
      text: 'text-red-600',
      bar: 'from-red-500 to-rose-400',
      barBg: 'bg-red-100',
    },
  }

  const colors = colorClasses[color]

  return (
    <div className={`p-4 rounded-2xl relative overflow-hidden bg-white/50 border border-slate-100 hover:shadow-md transition-all duration-300 group`}>
      <div className={`absolute top-0 right-0 w-24 h-24 rounded-full blur-3xl opacity-40 transition-opacity duration-500 group-hover:opacity-60 ${colors.bg}`}></div>

      <div className="flex items-center gap-3 mb-3">
        <div className={`p-2 rounded-lg ${colors.bg}`}>
          <Icon className={`w-4 h-4 ${colors.text}`} />
        </div>
        <div>
          <span className="text-sm font-bold text-navy">{label}</span>
          {sublabel && (
            <span className="text-xs ml-1 font-semibold text-slate-600">({sublabel})</span>
          )}
        </div>
      </div>

      <div className="flex items-baseline gap-1.5">
        <p className="text-2xl font-black text-navy font-display">
          {current}
        </p>
        {bonus !== undefined && bonus > 0 && (
          <span className="text-xs font-bold text-purple-600 bg-purple-100 px-1.5 py-0.5 rounded-full">
            +{bonus}
          </span>
        )}
      </div>

      <p className="text-xs mt-1 font-semibold text-slate-600">
        of {isUnlimited ? 'Unlimited' : limit}
      </p>

      {!isUnlimited && (
        <div className={`mt-2 rounded-full h-1.5 ${colors.barBg}`}>
          <div
            className={`bg-gradient-to-r ${colors.bar} h-1.5 rounded-full transition-all duration-500`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      )}

      {percentage >= 90 && !isUnlimited && (
        <div className={`mt-2 flex items-center gap-1 text-[10px] ${colors.text}`}>
          <AlertTriangle className="w-3 h-3" />
          {percentage >= 100 ? 'Limit reached' : 'Near limit'}
        </div>
      )}
    </div>
  )
}

// PU Pack Card Sub-component
interface PUPackCardProps {
  name: string
  units: number
  price: number
  isDarkMode: boolean
  onPurchase: () => void
  purchasing: boolean
  popular?: boolean
}

function PUPackCard({
  name,
  units,
  price,
  isDarkMode,
  onPurchase,
  purchasing,
  popular,
}: PUPackCardProps) {
  return (
    <div
      className={`p-5 rounded-2xl border text-center relative transition-all duration-300 ${
        popular
          ? 'bg-cyan-50/50 border-cyan-100 hover:shadow-lg hover:shadow-cyan-100 group'
          : 'bg-white/50 border-slate-100 hover:shadow-lg group'
      }`}
    >
      {popular && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider bg-gradient-to-r from-cyan-600 to-teal-500 text-white shadow-lg shadow-cyan-500/25">
          Best Value
        </span>
      )}
      <p className="text-sm font-bold text-slate-600 uppercase tracking-wider">
        {name}
      </p>
      <p className="text-3xl font-black text-navy my-2 font-display">
        {units.toLocaleString()}
      </p>
      <p className="text-xs font-semibold text-slate-500 mb-2">
        Processing Units
      </p>
      <p className="text-lg font-bold text-teal-700">
        ${price}
      </p>
      <button
        onClick={onPurchase}
        disabled={purchasing}
        className={`mt-3 w-full py-2 text-xs font-bold rounded-xl transition-all ${
          popular
            ? 'btn-premium-primary shadow-cyan-500/25'
            : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-navy'
        } ${purchasing ? 'opacity-50 cursor-wait' : ''}`}
      >
        {purchasing ? 'Processing...' : 'Buy Now'}
      </button>
    </div>
  )
}
