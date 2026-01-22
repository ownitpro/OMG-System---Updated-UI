# API Routes Summary

## ✅ All API Routes Created/Fixed

### Fixed Routes (Updated to Next.js 15 Promise params pattern)

1. **`src/app/api/org/[orgId]/portals/route.ts`** ✅
   - GET: Returns list of portals for organization
   - POST: Creates new portal
   - Status: Fixed - uses `Promise<{ orgId: string }>` pattern

2. **`src/app/api/portal/[portalId]/requests/route.ts`** ✅
   - GET: Returns requests for portal
   - Status: Fixed - uses `Promise<{ portalId: string }>` pattern

3. **`src/app/api/org/portals/[portalId]/requests/route.ts`** ✅
   - POST: Upserts portal requests
   - Status: Fixed - uses `Promise<{ portalId: string }>` pattern

4. **`src/app/api/org/portals/[portalId]/revoke/route.ts`** ✅
   - POST: Revokes/closes portal
   - Status: Fixed - uses `Promise<{ portalId: string }>` pattern

5. **`src/app/api/portal/[portalId]/submissions/route.ts`** ✅
   - GET: Returns portal submissions
   - Status: Fixed - uses `Promise<{ portalId: string }>` pattern

6. **`src/app/api/portal/[portalId]/submit/route.ts`** ✅
   - POST: Submits file to portal
   - Status: Fixed - uses `Promise<{ portalId: string }>` pattern

### Already Correct Routes (Using Promise params)

- `src/app/api/org/[orgId]/portals-list/route.ts` ✅
- `src/app/api/org/[orgId]/shares/route.ts` ✅
- `src/app/api/org/[orgId]/requests/route.ts` ✅
- `src/app/api/org/[orgId]/request-templates/route.ts` ✅
- `src/app/api/org/[orgId]/upload/presign/route.ts` ✅
- `src/app/api/org/[orgId]/ocr/preview/route.ts` ✅
- `src/app/api/org/[orgId]/overview/activity/route.ts` ✅
- `src/app/api/org/[orgId]/overview/kpis/route.ts` ✅
- `src/app/api/org/[orgId]/overview/checklist/route.ts` ✅
- `src/app/api/org/[orgId]/overview/quick-actions/route.ts` ✅
- `src/app/api/portals/[portalId]/route.ts` ✅
- `src/app/api/portals/[portalId]/requests/route.ts` ✅
- `src/app/api/portals/[portalId]/presign/route.ts` ✅
- `src/app/api/mock/portal/[portalId]/route.ts` ✅
- `src/app/api/mock/portal/[portalId]/invite/route.ts` ✅
- `src/app/api/mock/portal/[portalId]/upload/route.ts` ✅

### Routes Without Dynamic Params (No changes needed)

- `src/app/api/personal/portals/route.ts` ✅
- `src/app/api/personal/upload/presign/route.ts` ✅
- `src/app/api/personal/ocr/preview/route.ts` ✅
- `src/app/api/support/submit/route.ts` ✅
- `src/app/api/mock/portal/route.ts` ✅
- `src/app/api/mock/portal/verify-token/route.ts` ✅
- `src/app/api/mock/portal/request-link/route.ts` ✅

## 📋 All API Routes Available

### Org Routes (`/api/org/[orgId]/*`)
- ✅ `/api/org/[orgId]/portals` - GET (list), POST (create)
- ✅ `/api/org/[orgId]/portals-list` - GET
- ✅ `/api/org/[orgId]/shares` - POST
- ✅ `/api/org/[orgId]/requests` - POST
- ✅ `/api/org/[orgId]/request-templates` - GET
- ✅ `/api/org/[orgId]/upload/presign` - POST
- ✅ `/api/org/[orgId]/ocr/preview` - POST
- ✅ `/api/org/[orgId]/overview/activity` - GET
- ✅ `/api/org/[orgId]/overview/kpis` - GET
- ✅ `/api/org/[orgId]/overview/checklist` - GET
- ✅ `/api/org/[orgId]/overview/quick-actions` - GET

### Portal Routes (`/api/portal/[portalId]/*`)
- ✅ `/api/portal/[portalId]/requests` - GET
- ✅ `/api/portal/[portalId]/submissions` - GET
- ✅ `/api/portal/[portalId]/presign` - POST
- ✅ `/api/portal/[portalId]/submit` - POST

### Org Portal Management (`/api/org/portals/[portalId]/*`)
- ✅ `/api/org/portals/[portalId]/requests` - POST
- ✅ `/api/org/portals/[portalId]/revoke` - POST

### Mock Portal Routes (`/api/mock/portal/*`)
- ✅ `/api/mock/portal` - GET (list), POST (create)
- ✅ `/api/mock/portal/verify-token` - GET
- ✅ `/api/mock/portal/request-link` - POST
- ✅ `/api/mock/portal/[portalId]` - GET
- ✅ `/api/mock/portal/[portalId]/invite` - POST
- ✅ `/api/mock/portal/[portalId]/upload` - POST

### Personal Routes
- ✅ `/api/personal/portals` - GET, POST
- ✅ `/api/personal/upload/presign` - POST
- ✅ `/api/personal/ocr/preview` - POST
- ✅ `/api/personal/meters` - GET

### Other Routes
- ✅ `/api/portals/[portalId]` - GET
- ✅ `/api/portals/[portalId]/requests` - GET
- ✅ `/api/portals/[portalId]/presign` - POST
- ✅ `/api/shares/[token]` - GET
- ✅ `/api/shares/[token]/download` - GET
- ✅ `/api/support/submit` - POST
- ✅ `/api/sales/lead` - POST

## 🔧 Pattern Used

All routes now follow this Next.js 15 pattern:

```typescript
import { NextRequest, NextResponse } from 'next/server';

type Props = {
  params: Promise<{ orgId: string }>; // or portalId, token, etc.
};

export async function GET(_req: NextRequest, { params }: Props) {
  try {
    const { orgId } = await params;
    // ... logic
    return NextResponse.json({ data: [] });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ data: [] }, { status: 500 });
  }
}
```

## ✅ Status

- All routes exist
- All routes use correct Next.js 15 Promise params pattern
- Error handling added where missing
- No linting errors

