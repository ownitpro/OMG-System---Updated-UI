# Trial & Plan Enforcement Implementation

This document describes how trial and plan limits are enforced throughout SecureVault Docs.

## Overview

We've implemented a comprehensive trial enforcement system that:
1. Checks limits before allowing actions
2. Shows user-friendly upgrade prompts
3. Blocks actions when trial expires
4. Tracks usage against plan limits

## Components Created

### 1. Plan Enforcement Hook ([src/hooks/usePlanEnforcement.ts](src/hooks/usePlanEnforcement.ts))

Central hook for checking plan limits across the app.

**Functions:**
- `canUploadFile(fileSizeBytes)` - Checks if file upload is allowed
- `canPerformOCR(pageCount)` - Checks OCR limit
- `canCreateShareLink()` - Checks share link limit
- `canAddSeat()` - Checks team seat limit
- `canCreateBusinessVault()` - Checks business vault limit

**Returns `EnforcementResult`:**
```typescript
{
  allowed: boolean
  reason?: string
  showUpgradePrompt?: boolean
  suggestedPlan?: string
}
```

**Usage Example:**
```typescript
const { canUploadFile, plan, trialExpired } = usePlanEnforcement()

const result = canUploadFile(file.size)
if (!result.allowed) {
  // Show error or upgrade prompt
}
```

### 2. Upgrade Prompt Modal ([src/components/UpgradePromptModal.tsx](src/components/UpgradePromptModal.tsx))

Beautiful, reusable modal that prompts users to upgrade when limits are reached.

**Features:**
- Displays limit reached message
- Shows suggested plan with pricing
- Lists upgrade benefits
- Redirects to billing page on "View Plans"

**Usage Example:**
```typescript
<UpgradePromptModal
  isOpen={showUpgradeModal}
  onClose={() => setShowUpgradeModal(false)}
  title="Storage Limit Reached"
  message="You've used all 1 GB of storage in your trial"
  suggestedPlan="starter"
  benefits={['10 GB storage', '200 OCR pages/month']}
/>
```

## Enforcement Points

### ✅ Upload Limit Enforcement (TESTED & WORKING)

**Location:** [src/components/documents/UploadDocumentModal.tsx](src/components/documents/UploadDocumentModal.tsx)

**Checks:**
1. Total file size against storage limit
2. Trial expiration status
3. Shows upgrade prompt if limit exceeded

**User Experience:**
- Error message shows remaining storage
- Upgrade modal suggests appropriate plan
- Clear call-to-action to view pricing

**Test Results:**
- ✅ Upload blocked when storage limit exceeded
- ✅ Error message displays current usage accurately
- ✅ Upgrade modal appears with correct plan suggestion (Starter)
- ✅ "View Plans" button redirects to billing page

### ✅ Backend Upload Enforcement (IMPLEMENTED)

**Location:** [src/app/api/documents/route.ts](src/app/api/documents/route.ts)

**Checks:**
1. Trial expiration status
2. Storage limit validation before upload
3. Storage usage update after successful upload

**Implementation:**
- Enforces limits for personal vaults only (organizations have separate limits)
- Fetches user plan and trial status from database
- Uses `checkStorageLimit()` to validate before creating document
- Returns 402 (Payment Required) status code when limit exceeded
- Calls `updateUserStorage()` after successful upload to update tracked usage
- Detailed error messages with current usage and limit info

**Error Response Example:**
```json
{
  "error": "This upload would exceed your 1 GB storage limit. You're currently using 0.85 GB.",
  "code": "STORAGE_LIMIT_EXCEEDED",
  "currentGb": 0.85,
  "limitGb": 1,
  "fileGb": 0.2
}
```

### ✅ Share Link Enforcement (IMPLEMENTED)

**Locations:**
- Frontend: [src/app/org/[orgId]/shares/new/page.tsx](src/app/org/[orgId]/shares/new/page.tsx)
- API: [src/app/api/org/[orgId]/shares/route.ts](src/app/api/org/[orgId]/shares/route.ts)
- Database function: [src/lib/mockDb.ts](src/lib/mockDb.ts) - `getShareCountByOrg()`

**Implementation:**
- Frontend checks limit before API call using `usePlanEnforcement().canCreateShareLink()`
- Backend validates limit in API route (402 status code on limit exceeded)
- Shows upgrade modal when limit reached
- Free tier: 1 link max
- Starter: 5 links max
- Growth/Pro: Unlimited (-1 = unlimited)

### ✅ OCR Enforcement (IMPLEMENTED)

**Locations:**
- Utilities: [src/lib/ocr-tracking.ts](src/lib/ocr-tracking.ts)
- Hook: [src/hooks/usePlanEnforcement.ts](src/hooks/usePlanEnforcement.ts) - `canPerformOCR()`
- Database: `ocrPagesUsedThisMonth`, `ocrMonthResetDate` fields in User table

**Implementation:**
- Tracks OCR pages used per month in User table
- Automatic monthly reset logic (checks on every read)
- Hook fetches real usage from database
- Limits:
  - Free: 20 pages/month
  - Starter: 200 pages/month
  - Growth: 600 pages/month
  - Pro: 2,000 pages/month

**Functions:**
- `getUserOCRUsage(userId)` - Get current usage with auto-reset
- `incrementOCRUsage(userId, pageCount)` - Increment after processing
- `checkOCRLimit(userId, pageCount, limitPages)` - Validate before processing
- `checkAndResetOCRMonth(userId)` - Auto-reset counter for new month

## Trial Expiration Handling

When trial expires (`trialExpiresAt` < now):
1. All enforcement functions return `allowed: false`
2. Error messages indicate trial has expired
3. Upgrade prompts shown with "Trial Expired" title
4. Suggests upgrading to Starter plan

## Database Fields

Trial tracking uses these fields from the `User` table:

```sql
trialStartedAt   TIMESTAMPTZ  -- When 14-day trial began
trialExpiresAt   TIMESTAMPTZ  -- When trial ends
```

## Next Steps

### ✅ Completed

1. **Share Link Enforcement** - Fully implemented with frontend + backend validation
   - Frontend: [src/app/org/[orgId]/shares/new/page.tsx](src/app/org/[orgId]/shares/new/page.tsx)
   - Backend: [src/app/api/org/[orgId]/shares/route.ts](src/app/api/org/[orgId]/shares/route.ts)
   - Returns 402 status code when limit exceeded
   - Shows upgrade modal with plan suggestions

2. **Real Storage Tracking** - Implemented storage tracking utilities in [src/lib/storage-tracking.ts](src/lib/storage-tracking.ts)
   - `getUserStorage()` - Get current storage usage
   - `updateUserStorage()` - Recalculate and update storage after upload/delete
   - `checkStorageLimit()` - Validate before upload
   - Hook automatically fetches real storage from database

3. **OCR Tracking** - Fully implemented with automatic monthly reset
   - Utilities: [src/lib/ocr-tracking.ts](src/lib/ocr-tracking.ts)
   - Database fields: `ocrPagesUsedThisMonth`, `ocrMonthResetDate`
   - Auto-reset logic checks and resets counter at start of each month
   - Hook fetches real OCR usage from database

4. **Backend Upload Enforcement** - Storage limits enforced in API
   - Location: [src/app/api/documents/route.ts](src/app/api/documents/route.ts)
   - Checks trial expiration before upload
   - Validates storage limit using `checkStorageLimit()`
   - Returns 402 status code with detailed error for limit exceeded
   - Updates storage usage after successful upload using `updateUserStorage()`

5. **Share Links Listing Page** - Complete management interface
   - Location: [src/app/org/[orgId]/shares/page.tsx](src/app/org/[orgId]/shares/page.tsx)
   - Features:
     - Display all share links with status badges
     - Usage statistics cards (active/total/limit)
     - Copy to clipboard functionality
     - Delete share links
     - Empty state with CTA
     - Plan limit warnings

### Remaining TODOs

1. **Add Enforcement to More Actions**
   - Team member invites (check seats limit)
   - Business vault creation (check vault limit)
   - Export actions (check plan features)

2. **Implement OCR in Document Processing**
   - Add OCR processing UI/API
   - Call `incrementOCRUsage()` after processing
   - Use `canPerformOCR()` to check limits before processing

### API Route Enforcement

For backend enforcement, check limits in API routes:

```typescript
// Example: /api/documents/upload
import { canPerformAction } from '@/lib/plan-limits'

export async function POST(request: Request) {
  const user = await getUser(request)
  const fileSize = parseInt(request.headers.get('content-length') || '0')

  const check = canPerformAction(user.plan, {
    type: 'upload_file',
    currentCount: user.storageUsedBytes,
  })

  if (!check.allowed) {
    return Response.json(
      { error: check.reason },
      { status: 402 } // Payment Required
    )
  }

  // Continue with upload...
}
```

## Testing Checklist

- [ ] Free trial users see correct limits (1 GB, 20 OCR, 1 share link)
- [ ] Upload blocked when storage limit reached
- [ ] Upgrade modal shows with correct plan suggestion
- [ ] Trial expiration blocks all actions
- [ ] Upgrade prompt redirects to billing page
- [ ] Paid users have correct limits enforced
- [ ] Unlimited features (Growth/Pro share links) work correctly

## Notes

- All enforcement is client-side for now (UI-level blocking)
- Should add server-side validation in API routes for security
- Consider rate limiting for trial users
- Add analytics to track when users hit limits
