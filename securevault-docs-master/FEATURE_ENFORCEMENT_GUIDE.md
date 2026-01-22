# Feature Enforcement Guide

This guide explains how to enforce premium feature access in your API routes using the enforcement middleware.

## Overview

All plan limitations are strictly enforced using:
1. **Plan limits** defined in `src/lib/plan-limits.ts`
2. **Enforcement middleware** in `src/lib/enforcement-middleware.ts`
3. **API route enforcement** applied to all relevant endpoints

## Current Enforcement Status

### ✅ Fully Enforced

The following limits are currently enforced across the application:

1. **Storage Limits** - `src/app/api/documents/route.ts`
   - Checks before file upload
   - Returns 402 with upgrade prompt when exceeded

2. **OCR Limits** - `src/app/api/personal/ocr/preview/route.ts` and `src/app/api/org/[orgId]/ocr/preview/route.ts`
   - Monthly page count enforced
   - Returns 402 when limit reached

3. **Share Link Limits** - `src/app/api/org/[orgId]/shares/route.ts`
   - Enforced on link creation
   - Supports unlimited for higher tiers

4. **Seat Limits** - `src/app/api/organizations/[organizationId]/members/route.ts`
   - Checked when inviting members
   - Prevents exceeding seat count

5. **Business Vault Limits** - `src/app/api/organizations/route.ts`
   - Enforced on organization creation
   - Limited by user's plan

6. **Trial Expiration** - All above endpoints
   - Checked before any operation
   - Returns 402 on expired trial

## Adding Feature Enforcement to New Endpoints

When creating API endpoints that use premium features, follow these patterns:

### Example 1: Email Rules Endpoint

```typescript
// src/app/api/personal/email-rules/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getPersonalEnforcementContext, checkFeatureAccess } from '@/lib/enforcement-middleware';

export async function POST(request: NextRequest) {
  const userId = request.headers.get('x-user-id');

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Get enforcement context
  const { context, error } = await getPersonalEnforcementContext(userId);

  if (error) {
    return error;
  }

  // Check feature access
  const featureError = checkFeatureAccess(context!, 'hasEmailRules', 'Email Rules');

  if (featureError) {
    return featureError;
  }

  // Feature is available - proceed with logic
  // ... create email rule
}
```

### Example 2: Advanced Search Endpoint

```typescript
// src/app/api/search/advanced/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getOrgEnforcementContext, checkFeatureAccess } from '@/lib/enforcement-middleware';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { organizationId } = body;

  // Get enforcement context for organization
  const { context, error } = await getOrgEnforcementContext(organizationId);

  if (error) {
    return error;
  }

  // Check advanced search feature
  const featureError = checkFeatureAccess(context!, 'hasAdvancedSearch', 'Advanced Search');

  if (featureError) {
    return featureError;
  }

  // Proceed with advanced search
  // ... search logic
}
```

### Example 3: PII Redaction Endpoint

```typescript
// src/app/api/documents/[documentId]/redact-pii/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getPersonalEnforcementContext, checkFeatureAccess, checkTrialExpired } from '@/lib/enforcement-middleware';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ documentId: string }> }
) {
  const userId = request.headers.get('x-user-id');

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { context, error } = await getPersonalEnforcementContext(userId);

  if (error) {
    return error;
  }

  // Check trial status
  const trialError = checkTrialExpired(context!, 'PII redaction');
  if (trialError) {
    return trialError;
  }

  // Check PII redaction feature
  const featureError = checkFeatureAccess(context!, 'hasPIIRedaction', 'PII Redaction');

  if (featureError) {
    return featureError;
  }

  // Proceed with PII redaction
  const { documentId } = await params;
  // ... redaction logic
}
```

## Premium Features Requiring Enforcement

When implementing these features, add enforcement checks:

### Personal Plan Features

| Feature | Flag | Plans Available | Endpoint to Enforce |
|---------|------|-----------------|---------------------|
| Email-to-Vault | `hasEmailToVault` | Starter+ | `/api/personal/email-to-vault/*` |
| Email Rules | `hasEmailRules` | Pro | `/api/personal/email-rules/*` |
| Advanced Search | `hasAdvancedSearch` | Pro | `/api/search/advanced` |
| PII Redaction | `hasPIIRedaction` | Pro | `/api/documents/[id]/redact-pii` |
| Audit Log | `hasAuditLog` | Pro | `/api/personal/audit-log` |
| Scheduled Exports | `hasScheduledExports` | Pro | `/api/exports/schedule` |
| Saved Searches | `hasSavedSearches` | Growth+ | `/api/search/saved` |
| Label Rules | `hasLabelRules` | Growth+ | `/api/labels/rules/*` |
| Drive Import | `hasDriveImport` | Growth+ | `/api/import/drive` |
| Recipient-Bound Links | `hasRecipientBoundLinks` | Pro | `/api/shares/recipient-bound` |

### Export Format Restrictions

```typescript
// src/app/api/exports/route.ts
import { getPersonalEnforcementContext } from '@/lib/enforcement-middleware';

export async function POST(request: NextRequest) {
  const { format } = await request.json(); // e.g., 'zip', 'csv', 'pdf'

  const userId = request.headers.get('x-user-id');
  const { context, error } = await getPersonalEnforcementContext(userId!);

  if (error) return error;

  // Check if format is allowed
  if (!context!.limits.exportFormats.includes(format)) {
    return NextResponse.json({
      error: `${format.toUpperCase()} export is not available on your current plan.`,
      code: 'FORMAT_NOT_AVAILABLE',
      availableFormats: context!.limits.exportFormats
    }, { status: 403 });
  }

  // Proceed with export
}
```

## Enforcement Middleware API

### Context Functions

- `getPersonalEnforcementContext(userId)` - Get context for personal vault operations
- `getOrgEnforcementContext(orgId)` - Get context for organization operations

### Check Functions

- `checkTrialExpired(context, operation)` - Check trial status
- `checkStorageLimit(userId, fileSizeBytes, limitGb)` - Check storage
- `checkOcrLimit(userId, orgId, limit)` - Check OCR pages
- `checkShareLinkLimit(orgId, limit)` - Check share links
- `checkSeatLimit(orgId, limit)` - Check team seats
- `checkBusinessVaultLimit(userId, limit)` - Check business vaults
- `checkFeatureAccess(context, feature, featureName)` - Check feature flags

## Error Response Format

All enforcement errors return consistent format:

```json
{
  "error": "Human-readable error message",
  "code": "ERROR_CODE",
  "currentCount": 5,      // optional: current usage
  "limit": 10,            // optional: plan limit
  "feature": "featureName" // optional: for feature checks
}
```

Error codes:
- `TRIAL_EXPIRED` - Trial period has ended
- `STORAGE_LIMIT_EXCEEDED` - Storage quota exceeded
- `OCR_LIMIT_EXCEEDED` - OCR page limit exceeded
- `LIMIT_REACHED` - Generic limit reached (share links, etc.)
- `SEAT_LIMIT_EXCEEDED` - Team seat limit exceeded
- `BUSINESS_VAULT_LIMIT_EXCEEDED` - Business vault limit exceeded
- `FEATURE_NOT_AVAILABLE` - Premium feature not in plan

All enforcement errors use HTTP status `402 Payment Required` for limit/trial issues and `403 Forbidden` for feature access issues.

## Testing Enforcement

Test each enforcement scenario:

1. **Free plan** - Should block all premium features
2. **Starter plan** - Should allow basic features, block advanced
3. **Growth plan** - Should allow most features, block Pro-only
4. **Pro plan** - Should allow all features
5. **Expired trial** - Should block all operations with trial error
6. **Limit exceeded** - Should return proper error with current usage

## Upgrade Prompts

Frontend should detect `402` responses and show upgrade modals with:
- Current plan
- Feature/limit being restricted
- Suggested plan (included in error for some checks)
- Upgrade CTA linking to `/billing`
