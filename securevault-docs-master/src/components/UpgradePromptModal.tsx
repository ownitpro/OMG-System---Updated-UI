'use client'

import { X, Zap, ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface UpgradePromptModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  message: string
  suggestedPlan?: string
  benefits?: string[]
}

export default function UpgradePromptModal({
  isOpen,
  onClose,
  title,
  message,
  suggestedPlan = 'starter',
  benefits = [],
}: UpgradePromptModalProps) {
  const router = useRouter()

  if (!isOpen) return null

  const handleUpgrade = () => {
    router.push('/settings/billing')
    onClose()
  }

  const planNames: Record<string, string> = {
    starter: 'Starter',
    growth: 'Growth',
    pro: 'Pro',
  }

  const planPrices: Record<string, string> = {
    starter: '$9.99/mo',
    growth: '$14.99/mo',
    pro: '$24.99/mo',
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-sm text-gray-700 mb-4">{message}</p>

          {/* Suggested Plan */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-lg p-4 mb-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-base font-semibold text-gray-900">
                {planNames[suggestedPlan]} Plan
              </h4>
              <span className="text-lg font-bold text-blue-600">
                {planPrices[suggestedPlan]}
              </span>
            </div>

            {benefits.length > 0 && (
              <ul className="space-y-1.5 mt-3">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                    <ArrowRight className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <p className="text-xs text-gray-500 text-center">
            Upgrade anytime, cancel anytime. No long-term commitment.
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-3 px-6 py-4 bg-gray-50 rounded-b-lg">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            Maybe Later
          </button>
          <button
            onClick={handleUpgrade}
            className="flex-1 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-md hover:from-blue-700 hover:to-indigo-700 transition-colors shadow-sm"
          >
            View Plans
          </button>
        </div>
      </div>
    </div>
  )
}
