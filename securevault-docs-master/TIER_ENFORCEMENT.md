# Tier Restrictions & Enforcement

This document outlines how tier restrictions and limitations are enforced in SecureVault Docs.

## Plan Limits Utility

The centralized plan limits system is located in [`src/lib/plan-limits.ts`](src/lib/plan-limits.ts).

### Available Plans

- **Free**: 14-day free trial with 10% of Starter tier allowances
- **Starter**: Entry-level paid tier for individuals
- **Growth**: Mid-tier with enhanced features
- **Pro**: Premium tier with team collaboration features

## Free Trial System

### Trial Details

- **Duration**: 14 days from signup
- **Allowances**: 10% of Starter tier limits
- **Features**: Same feature access as Starter (Email-to-Vault, etc.)
- **Database Fields**:
  - `trialStartedAt`: When trial began
  - `trialExpiresAt`: When trial ends

### Trial Functions

```typescript
isTrialExpired(trialExpiresAt: string) // Check if trial has ended
getTrialDaysRemaining(trialExpiresAt: string) // Calculate days left
shouldShowUpgradePrompt(plan, trialExpiresAt) // Show prompt at ≤3 days
```

### Per-Plan Limitations

#### Storage Limits

| Plan    | Storage | Notes |
|---------|---------|-------|
| Free    | 1 GB    | 10% of Starter (14-day trial) |
| Starter | 10 GB   | |
| Growth  | 50 GB   | |
| Pro     | 200 GB  | |

#### OCR Limits (per month)

| Plan    | OCR Pages | Notes |
|---------|-----------|-------|
| Free    | 20        | 10% of Starter (14-day trial) |
| Starter | 200       | |
| Growth  | 600       | |
| Pro     | 2,000     | |

#### Secure Share Links

| Plan    | Limit      | Notes |
|---------|------------|-------|
| Free    | 1          | 10% of Starter (14-day trial) |
| Starter | 5          | |
| Growth  | Unlimited  | |
| Pro     | Unlimited  | |

#### Team Features

| Plan    | Seats | Business Vaults |
|---------|-------|-----------------|
| Free    | 1     | 0               |
| Starter | 1     | 0               |
| Growth  | 1     | 0               |
| Pro     | 3     | 2               |

### Feature Access Matrix

| Feature                      | Free | Starter | Growth | Pro |
|------------------------------|------|---------|--------|-----|
| Email-to-Vault               | ❌   | ✅      | ✅     | ✅  |
| Email Rules (auto-file)      | ❌   | ❌      | ❌     | ✅  |
| Advanced Search              | ❌   | ❌      | ❌     | ✅  |
| PII Redaction                | ❌   | ❌      | ❌     | ✅  |
| Audit Log                    | ❌   | ❌      | ❌     | ✅  |
| Scheduled Exports            | ❌   | ❌      | ❌     | ✅  |
| Saved Searches               | ❌   | ❌      | ✅     | ✅  |
| Label Rules                  | ❌   | ❌      | ✅     | ✅  |
| Drive Import                 | ❌   | ❌      | ✅     | ✅  |
| Recipient-bound Links        | ❌   | ❌      | ❌     | ✅  |
| Request File Links           | ❌   | ❌      | ✅     | ✅  |

### Export Formats

| Plan    | Formats         |
|---------|-----------------|
| Free    | ZIP             |
| Starter | ZIP             |
| Growth  | ZIP, CSV, PDF   |
| Pro     | ZIP, CSV, PDF   |

### Support Level

| Plan    | Support  |
|---------|----------|
| Free    | Email    |
| Starter | Email    |
| Growth  | Priority |
| Pro     | Priority |

## Enforcement Functions

### 1. `getPlanLimits(plan: Plan)`

Returns the complete limits object for a given plan.

```typescript
const limits = getPlanLimits('pro')
console.log(limits.storageGb) // 200
console.log(limits.ocrPagesPerMonth) // 2000
```

### 2. `hasFeature(plan: Plan, feature: keyof PlanLimits)`

Check if a plan has access to a specific feature.

```typescript
hasFeature('starter', 'hasEmailToVault') // true
hasFeature('starter', 'hasAdvancedSearch') // false
```

### 3. `isWithinLimit(plan: Plan, limitType, currentUsage: number)`

Verify if current usage is within plan limits.

```typescript
isWithinLimit('starter', 'storageGb', 8) // true (8 GB < 10 GB)
isWithinLimit('starter', 'storageGb', 12) // false (12 GB > 10 GB)
```

### 4. `getUsagePercentage(plan: Plan, limitType, currentUsage: number)`

Calculate usage percentage for displaying progress bars.

```typescript
getUsagePercentage('starter', 'storageGb', 5) // 50 (5 GB / 10 GB = 50%)
```

### 5. `canPerformAction(plan: Plan, action)`

Check if a user can perform an action based on their current usage.

```typescript
canPerformAction('starter', {
  type: 'create_share_link',
  currentCount: 5
})
// { allowed: false, reason: "You've reached your plan limit..." }
```

### 6. `getUpgradeSuggestion(currentPlan: Plan, reason)`

Get upgrade recommendations based on usage constraints.

```typescript
getUpgradeSuggestion('starter', 'storage')
// { suggestedPlan: 'growth', benefits: ['50 GB storage (from 10 GB)'] }
```

## Implementation Examples

### Example 1: Enforcing Share Link Limits

```typescript
import { canPerformAction, getPlanLimits } from '@/lib/plan-limits'

async function createShareLink(userId: string, documentId: string) {
  const user = await getUser(userId)
  const currentLinks = await countUserShareLinks(userId)

  const check = canPerformAction(user.plan, {
    type: 'create_share_link',
    currentCount: currentLinks
  })

  if (!check.allowed) {
    throw new Error(check.reason)
  }

  // Proceed with creating share link
  return await db.shareLink.create({...})
}
```

### Example 2: Displaying Storage Usage

```typescript
import { getPlanLimits, getUsagePercentage } from '@/lib/plan-limits'

function StorageWidget({ plan, currentUsageGb }: Props) {
  const limits = getPlanLimits(plan)
  const percentage = getUsagePercentage(plan, 'storageGb', currentUsageGb)

  return (
    <div>
      <p>{currentUsageGb} GB / {limits.storageGb} GB</p>
      <ProgressBar value={percentage} />
    </div>
  )
}
```

### Example 3: Feature Gating

```typescript
import { hasFeature } from '@/lib/plan-limits'

function EmailRulesButton({ userPlan }: Props) {
  if (!hasFeature(userPlan, 'hasEmailRules')) {
    return (
      <Tooltip content="Upgrade to Pro for Email Rules">
        <Button disabled>Email Rules (Pro)</Button>
      </Tooltip>
    )
  }

  return <Button onClick={openEmailRules}>Email Rules</Button>
}
```

## Where to Enforce Restrictions

### 1. Client-Side (UI)

- **Disable buttons/features** for unavailable functionality
- **Show upgrade prompts** when limits are reached
- **Display usage meters** to prevent surprises
- Located in: Components, pages, and UI elements

### 2. API Routes

- **Validate permissions** before processing requests
- **Check quotas** before creating resources
- **Return appropriate error codes** (402 for payment required)
- Located in: `src/app/api/**/*.ts`

### 3. Database Level (Future)

- **Triggers** to prevent quota violations
- **Constraints** on resource counts
- **Policies** for RLS (Row Level Security)

## Migration Notes

When the Stripe integration is live, you'll need to:

1. **Add actual usage tracking** to the User table:
   ```sql
   ALTER TABLE "User"
   ADD COLUMN "storageUsedBytes" BIGINT DEFAULT 0,
   ADD COLUMN "ocrPagesUsedThisMonth" INTEGER DEFAULT 0,
   ADD COLUMN "shareLinksCount" INTEGER DEFAULT 0;
   ```

2. **Create background jobs** to:
   - Calculate storage usage
   - Reset monthly OCR counters
   - Update share link counts

3. **Add enforcement middleware** to API routes:
   ```typescript
   export const withPlanLimit = (limitType: string) => {
     return async (req, res, next) => {
       const user = await getUser(req.userId)
       const check = canPerformAction(user.plan, {...})
       if (!check.allowed) {
         return res.status(402).json({ error: check.reason })
       }
       next()
     }
   }
   ```

## Testing Plan Enforcement

Create test users with different plans and verify:

1. ✅ Free users cannot create share links
2. ✅ Starter users can create up to 5 share links
3. ✅ Growth users have unlimited share links
4. ✅ Only Pro users can create business vaults
5. ✅ Only Pro users can add team seats
6. ✅ OCR limits are enforced per month
7. ✅ Storage limits prevent uploads when exceeded
8. ✅ Feature-specific buttons are disabled for lower tiers

## Next Steps

1. **Implement usage tracking** for storage and OCR
2. **Add API middleware** for enforcement
3. **Create upgrade modals** with clear CTAs
4. **Set up usage alerts** at 80% and 95%
5. **Add telemetry** to track upgrade triggers
