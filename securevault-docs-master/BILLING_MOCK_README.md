# SecureVault Docs — Mock Billing System

## Overview

A complete mock-only billing and pricing system that works entirely in the browser using localStorage. No AWS or Stripe required. All data is namespaced under `mock/` to avoid conflicts.

## Environment Variables

Add to `.env.local`:

```env
NEXT_PUBLIC_BILLING_MODE=mock
NEXT_PUBLIC_SHOW_PERSONAL=true
NEXT_PUBLIC_SHOW_BUSINESS=true
NEXT_PUBLIC_YEARLY_DISCOUNT_PCT=10
```

## Files Created

### Configuration
- `src/lib/billing/mockConfig.ts` - All pricing tiers, costs, alarms, topups, seat caps, and connectors
- `src/lib/billing/mockStore.ts` - LocalStorage-based usage tracking
- `src/lib/billing/mode.ts` - Utility to check billing mode

### Pages
- `src/app/checkout/page.tsx` - Mock checkout page
- `src/app/org/demo/billing/page.tsx` - Org billing dashboard with meters
- `src/app/org/demo/integrations/page.tsx` - Integrations list (read-only)

### Components
- `src/components/billing/UsageToasts.tsx` - Usage warning toasts
- `src/components/pricing/QuickLinks.tsx` - Quick pricing navigation links

### Updated Files
- `src/components/pricing/PlanCard.tsx` - Now links to mock checkout when in mock mode
- `src/app/org/[orgId]/overview/page.tsx` - Added billing link and usage toasts

## Features

### Pricing Tiers
- **Business**: Starter ($59.99), Growth ($109.99), Pro ($219.99)
- **Personal**: Starter ($9.99), Growth ($14.99), Pro ($24.99)
- All tiers include Textract pages, storage, and egress limits

### Usage Meters
- Real-time usage tracking for Textract, Storage, and Egress
- Visual progress bars with color coding (green → amber → red)
- Alert thresholds at 70%, 80%, 90%, 95%
- Soft stop at 100%, burst stop at 103%

### Add-ons (Mock)
- Textract topups
- Storage and egress topups
- No charges in mock mode

### Usage Simulation
- Safe demo buttons to simulate usage
- Helps test meter thresholds and alerts

### Integrations
- Plan-based connector lists
- Read-only display (toggles disabled in mock mode)

## Usage Flow

1. **Pricing Page** → User selects plan
2. **Checkout (Mock)** → User confirms plan and seats
3. **Billing Dashboard** → View meters, add topups, simulate usage
4. **Org Overview** → Usage toasts appear when thresholds crossed

## Testing Checklist

- [ ] Home → Pricing renders Business/Personal tabs, monthly/yearly toggle
- [ ] Choose any plan → Checkout (Mock) → Confirm → lands on Org Billing (mock)
- [ ] Billing shows meters, thresholds, simulated usage, and add‑ons (mock)
- [ ] Overview shows usage toast when any meter crosses 70/80/90/95%
- [ ] Integrations page lists connectors for current tier (read‑only)
- [ ] "Powered by OMGsystems • 2025" appears on Billing page footer

## Notes

- All state stored in localStorage (`svd_mock_org_usage`)
- Safe to delete entire `src/lib/billing/` namespace to remove
- No mutations to existing auth, uploads, or dashboards
- Works entirely client-side - no server dependencies

