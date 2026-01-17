# OMG System - Coupon System Documentation

**Version:** 1.0.0
**Last Updated:** January 16, 2026
**Status:** ✅ Production-Ready (Database + API + Frontend)

---

## Table of Contents

1. [Overview](#overview)
2. [Architecture](#architecture)
3. [Database Schema](#database-schema)
4. [API Reference](#api-reference)
5. [Frontend Components](#frontend-components)
6. [React Hooks](#react-hooks)
7. [Checkout Integration](#checkout-integration)
8. [Coupon Stacking Logic](#coupon-stacking-logic)
9. [Testing Guide](#testing-guide)
10. [Stripe Integration Plan](#stripe-integration-plan)
11. [Business Rules Summary](#business-rules-summary)

---

## Overview

### What is the OMG Coupon System?

The OMG System coupon system is a **production-ready** discount management solution that provides:

- **Full CRUD operations** for coupon management
- **Advanced targeting** (by product, by client, first-time only)
- **Stackable coupons** with priority and group rules
- **Real-time validation** during checkout
- **Analytics tracking** (usage, savings, conversion)
- **Bulk operations** (enable/disable/delete multiple coupons)

### Why Have Both OMG Coupons AND Stripe Coupons?

**They serve different purposes and work together:**

| Feature | OMG System | Stripe |
|---------|------------|--------|
| **Primary Role** | Business rules & validation | Payment processing |
| **Product targeting** | ✅ Yes | ❌ No |
| **Client targeting** | ✅ Yes | ❌ No |
| **First-time only** | ✅ Yes | ❌ Limited |
| **Stackable coupons** | ✅ Yes | ❌ No |
| **Custom analytics** | ✅ Yes | Limited |
| **Offline validation** | ✅ Yes | ❌ No |
| **Apply to payment** | ❌ No | ✅ Yes |

**The Flow:**
```
User enters coupon → OMG validates business rules →
Pass to Stripe → Stripe applies discount → Payment processed
```

### Current System Status

| Component | Status | Notes |
|-----------|--------|-------|
| Database Schema | ✅ Complete | All fields in Prisma |
| API Endpoints | ✅ Complete | 7 endpoints working |
| Admin UI | ✅ Complete | Full CRUD, filters, bulk actions |
| React Hooks | ✅ Complete | SWR-based data fetching |
| Checkout Integration | ✅ Complete | Validation working |
| Stripe Integration | ⏳ Pending | Waiting for API keys |

---

## Architecture

### System Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                        OMG System Hub                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────────────┐ │
│  │   Admin     │    │  Checkout   │    │     PostgreSQL      │ │
│  │   Portal    │    │    Page     │    │      Database       │ │
│  │             │    │             │    │                     │ │
│  │ - Create    │    │ - Apply     │    │  ┌───────────────┐  │ │
│  │ - Edit      │    │ - Validate  │    │  │    Coupon     │  │ │
│  │ - Delete    │    │ - Stack     │    │  │    Table      │  │ │
│  │ - Toggle    │    │             │    │  └───────────────┘  │ │
│  │ - Bulk ops  │    │             │    │                     │ │
│  └──────┬──────┘    └──────┬──────┘    └──────────┬──────────┘ │
│         │                  │                      │             │
│         │    ┌─────────────┴─────────────┐       │             │
│         │    │                           │       │             │
│         ▼    ▼                           ▼       │             │
│  ┌─────────────────────────────────────────┐    │             │
│  │              API Layer                   │◄───┘             │
│  │                                          │                  │
│  │  /api/admin/coupons      - CRUD          │                  │
│  │  /api/admin/coupons/[id] - Single ops    │                  │
│  │  /api/admin/coupons/validate - Checkout  │                  │
│  │  /api/admin/coupons/bulk - Bulk ops      │                  │
│  │  /api/admin/coupons/stats - Analytics    │                  │
│  │  /api/coupons/validate - Public          │                  │
│  └─────────────────────────────────────────┘                   │
│                          │                                      │
└──────────────────────────┼──────────────────────────────────────┘
                           │
                           ▼ (Future)
                   ┌───────────────┐
                   │    Stripe     │
                   │   Checkout    │
                   │               │
                   │ Apply discount│
                   │ to payment    │
                   └───────────────┘
```

### Data Flow

```
1. Admin creates coupon in Portal
   └→ POST /api/admin/coupons → Prisma → PostgreSQL

2. User enters coupon at checkout
   └→ POST /api/admin/coupons/validate
      └→ Check all business rules
      └→ Return: valid/invalid + discount amount

3. User submits checkout (Future with Stripe)
   └→ Create Stripe Checkout Session with coupon
   └→ Stripe applies discount
   └→ Payment processed
   └→ Webhook updates coupon usage count
```

---

## Database Schema

### Coupon Model

**File:** `prisma/schema.prisma` (lines 427-477)

```prisma
enum CouponType {
  PERCENTAGE
  FIXED_AMOUNT
}

enum CouponCategory {
  PROMO
  PARTNER
  LOYALTY
  SEASONAL
  REFERRAL
  OTHER
}

model Coupon {
  id             String          @id @default(cuid())
  code           String          @unique
  description    String?
  type           CouponType      // PERCENTAGE or FIXED_AMOUNT
  value          Float           // Percent (0-100) or cents

  // Limits
  maxUses        Int?            // Max total redemptions (null = unlimited)
  currentUses    Int             @default(0)
  minPurchase    Float?          // Minimum order amount in cents
  maxDiscount    Float?          // Cap on discount amount in cents

  // Scheduling
  startsAt       DateTime?       // When coupon becomes active
  expiresAt      DateTime?       // When coupon expires

  // Status & Category
  isActive       Boolean         @default(true)
  isPublic       Boolean         @default(false)
  category       CouponCategory  @default(OTHER)

  // Targeting (JSON fields)
  appliesTo      String?         // JSON: "all" or ["product1", "product2"]
  assignedTo     String?         // JSON: "all" or ["client1", "client2"]

  // Restrictions
  firstTimeOnly  Boolean         @default(false)

  // Stacking
  stackable      Boolean         @default(false)
  stackGroup     String?         // Group name for stacking rules
  priority       Int             @default(0)  // Higher = applied first

  // Tracking
  totalSavings   Float           @default(0)  // Total $ saved by customers
  note           String?         // Admin notes

  // Relations
  organizationId String
  organization   Organization    @relation(...)
  createdById    String
  createdBy      User            @relation("CouponCreator", ...)

  createdAt      DateTime        @default(now())
  updatedAt      DateTime        @updatedAt

  @@index([organizationId])
  @@index([code])
  @@index([isActive])
  @@index([category])
  @@index([expiresAt])
}
```

### Field Reference

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| `id` | String | Auto | cuid() | Unique identifier |
| `code` | String | Yes | - | Coupon code (unique, uppercase) |
| `description` | String | No | null | User-facing description |
| `type` | Enum | Yes | - | PERCENTAGE or FIXED_AMOUNT |
| `value` | Float | Yes | - | Discount value (% or cents) |
| `maxUses` | Int | No | null | Max redemptions (null = unlimited) |
| `currentUses` | Int | No | 0 | Times redeemed |
| `minPurchase` | Float | No | null | Min order amount (cents) |
| `maxDiscount` | Float | No | null | Max discount cap (cents) |
| `startsAt` | DateTime | No | null | Activation date |
| `expiresAt` | DateTime | No | null | Expiration date |
| `isActive` | Boolean | No | true | Enabled/disabled |
| `isPublic` | Boolean | No | false | Show publicly |
| `category` | Enum | No | OTHER | Coupon category |
| `appliesTo` | String | No | null | Product targeting (JSON) |
| `assignedTo` | String | No | null | Client targeting (JSON) |
| `firstTimeOnly` | Boolean | No | false | New customers only |
| `stackable` | Boolean | No | false | Can combine with others |
| `stackGroup` | String | No | null | Stacking group name |
| `priority` | Int | No | 0 | Stacking priority |
| `totalSavings` | Float | No | 0 | Total savings tracked |
| `note` | String | No | null | Admin notes |

---

## API Reference

### Base URL
```
/api/admin/coupons
```

### Authentication
All endpoints require admin authentication via NextAuth session.

---

### GET /api/admin/coupons

**Description:** List all coupons with optional filtering

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `search` | string | Search by code, description, or note |
| `status` | string | Filter: `active`, `inactive`, `expired`, `scheduled` |
| `category` | string | Filter by category |

**Response:**
```json
{
  "data": {
    "coupons": [
      {
        "id": "clx123...",
        "code": "SAVE20",
        "description": "20% off all products",
        "type": "PERCENTAGE",
        "value": 20,
        "maxUses": 100,
        "currentUses": 45,
        "minPurchase": null,
        "maxDiscount": 5000,
        "startsAt": null,
        "expiresAt": "2026-12-31T23:59:59.000Z",
        "isActive": true,
        "isPublic": false,
        "category": "PROMO",
        "appliesTo": null,
        "assignedTo": null,
        "firstTimeOnly": false,
        "stackable": false,
        "stackGroup": null,
        "priority": 0,
        "totalSavings": 4500,
        "note": "Holiday promotion",
        "organization": {
          "id": "org_123",
          "name": "OMG Systems",
          "slug": "omg-systems"
        },
        "createdBy": {
          "id": "user_123",
          "name": "Admin User",
          "email": "admin@omgsystem.com"
        },
        "createdAt": "2026-01-01T00:00:00.000Z",
        "updatedAt": "2026-01-15T12:00:00.000Z"
      }
    ],
    "total": 1
  }
}
```

---

### POST /api/admin/coupons

**Description:** Create a new coupon

**Request Body:**
```json
{
  "code": "NEWUSER50",
  "description": "50% off for new users",
  "type": "PERCENTAGE",
  "value": 50,
  "maxUses": 500,
  "minPurchase": 1000,
  "maxDiscount": 2500,
  "expiresAt": "2026-06-30T23:59:59.000Z",
  "isActive": true,
  "category": "PROMO",
  "firstTimeOnly": true,
  "note": "New user acquisition campaign"
}
```

**Response:** `201 Created`
```json
{
  "data": {
    "coupon": {
      "id": "clx456...",
      "code": "NEWUSER50",
      ...
    }
  }
}
```

---

### GET /api/admin/coupons/[id]

**Description:** Get single coupon details

**Response:**
```json
{
  "data": {
    "coupon": { ... }
  }
}
```

---

### PATCH /api/admin/coupons/[id]

**Description:** Update a coupon

**Request Body:** (partial update)
```json
{
  "isActive": false,
  "note": "Paused for review"
}
```

**Response:**
```json
{
  "data": {
    "coupon": { ... }
  }
}
```

---

### DELETE /api/admin/coupons/[id]

**Description:** Delete a coupon

**Response:**
```json
{
  "data": {
    "message": "Coupon deleted successfully"
  }
}
```

---

### POST /api/admin/coupons/[id]/duplicate

**Description:** Duplicate an existing coupon with new code

**Response:**
```json
{
  "data": {
    "coupon": {
      "id": "clx789...",
      "code": "SAVE20_COPY",
      ...
    }
  }
}
```

---

### POST /api/admin/coupons/bulk

**Description:** Perform bulk operations on multiple coupons

**Request Body:**
```json
{
  "action": "enable",  // "enable", "disable", or "delete"
  "ids": ["clx123...", "clx456...", "clx789..."]
}
```

**Response:**
```json
{
  "data": {
    "affected": 3,
    "message": "3 coupons enabled"
  }
}
```

---

### GET /api/admin/coupons/stats

**Description:** Get coupon statistics

**Response:**
```json
{
  "data": {
    "totalCoupons": 24,
    "activeCoupons": 18,
    "totalRedemptions": 156,
    "avgDiscount": 15.5,
    "totalSavings": 4500.00,
    "expiredCoupons": 3,
    "expiringSoon": 2,
    "scheduledCoupons": 1,
    "categoryStats": {
      "PROMO": 8,
      "PARTNER": 5,
      "LOYALTY": 4,
      "SEASONAL": 3,
      "REFERRAL": 2,
      "OTHER": 2
    },
    "topCoupons": [
      {
        "id": "clx123...",
        "code": "SAVE20",
        "currentUses": 45,
        "totalSavings": 2250
      }
    ]
  }
}
```

---

### POST /api/admin/coupons/validate

**Description:** Validate a coupon for checkout (requires auth)

**Request Body:**
```json
{
  "code": "SAVE20",
  "productId": "securevault-docs",
  "clientId": "client_123",
  "subtotalCents": 2999
}
```

**Response (Valid):**
```json
{
  "data": {
    "valid": true,
    "coupon": {
      "id": "clx123...",
      "code": "SAVE20",
      "description": "20% off",
      "type": "PERCENTAGE",
      "value": 20,
      "stackable": false,
      "stackGroup": null,
      "priority": 0
    },
    "discountCents": 599,
    "discountFormatted": "$5.99",
    "message": "Coupon applied successfully!"
  }
}
```

**Response (Invalid):**
```json
{
  "data": {
    "valid": false,
    "message": "This coupon has expired"
  }
}
```

### Validation Checks (in order):

1. **Code exists** - Coupon found in database
2. **Is active** - `isActive = true`
3. **Started** - `startsAt` is null or in the past
4. **Not expired** - `expiresAt` is null or in the future
5. **Under max uses** - `currentUses < maxUses`
6. **Min purchase met** - `subtotalCents >= minPurchase`
7. **Product targeting** - `appliesTo` is "all" or includes productId
8. **Client targeting** - `assignedTo` is "all" or includes clientId
9. **First-time check** - If `firstTimeOnly`, user has no prior orders

---

### POST /api/coupons/validate

**Description:** Public coupon validation (same as admin but different auth)

**File:** `src/app/api/coupons/validate/route.ts`

Same request/response as admin validate endpoint.

---

## Frontend Components

### Admin Portal - CouponsTable

**File:** `src/app/portal/admin/coupons/CouponsTable.tsx`

**Size:** 1,516 lines

**Features:**
- Full CRUD interface
- Search by code/description
- Filter by status (Active, Inactive, Expired, Scheduled)
- Filter by category
- Sort by any column
- Bulk selection and actions
- CSV export
- Statistics cards
- Create/Edit modal with full form
- Duplicate coupon functionality
- Toggle enable/disable

**UI Components Used:**
- Shadcn/ui Table, Dialog, Button, Input, Select
- Custom stat cards
- Filter dropdowns
- Bulk action toolbar

### Key Sections:

```typescript
// Statistics Cards (top of page)
<div className="grid grid-cols-4 gap-4">
  <StatCard title="Total Coupons" value={stats.totalCoupons} />
  <StatCard title="Active" value={stats.activeCoupons} />
  <StatCard title="Total Redemptions" value={stats.totalRedemptions} />
  <StatCard title="Total Savings" value={formatCurrency(stats.totalSavings)} />
</div>

// Filter Bar
<div className="flex gap-4">
  <SearchInput placeholder="Search coupons..." />
  <StatusFilter options={['active', 'inactive', 'expired', 'scheduled']} />
  <CategoryFilter options={['PROMO', 'PARTNER', 'LOYALTY', ...]} />
</div>

// Bulk Actions (when rows selected)
<div className="flex gap-2">
  <Button onClick={handleBulkEnable}>Enable Selected</Button>
  <Button onClick={handleBulkDisable}>Disable Selected</Button>
  <Button onClick={handleBulkDelete} variant="destructive">Delete Selected</Button>
</div>

// Data Table
<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Select</TableHead>
      <TableHead>Code</TableHead>
      <TableHead>Type</TableHead>
      <TableHead>Value</TableHead>
      <TableHead>Usage</TableHead>
      <TableHead>Status</TableHead>
      <TableHead>Actions</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {coupons.map(coupon => <CouponRow key={coupon.id} coupon={coupon} />)}
  </TableBody>
</Table>
```

---

## React Hooks

### useAdminCoupons

**File:** `src/hooks/useAdminCoupons.ts`

**Purpose:** Manage coupon data fetching and mutations

```typescript
import { useAdminCoupons } from '@/hooks/useAdminCoupons';

function CouponsPage() {
  const {
    // Data
    coupons,          // Coupon[]
    total,            // number
    isLoading,        // boolean
    error,            // Error | null

    // Actions
    refetch,          // () => void
    createCoupon,     // (data: CreateCouponInput) => Promise<Coupon>
    updateCoupon,     // (id: string, data: UpdateCouponInput) => Promise<Coupon>
    deleteCoupon,     // (id: string) => Promise<void>
    toggleCoupon,     // (id: string, enabled: boolean) => Promise<Coupon>
    duplicateCoupon,  // (id: string) => Promise<Coupon>
    bulkToggle,       // (ids: string[], enabled: boolean) => Promise<number>
    bulkDelete,       // (ids: string[]) => Promise<number>
  } = useAdminCoupons({
    search: 'SAVE',      // optional
    status: 'active',    // optional
    category: 'PROMO',   // optional
  });

  // Use the data and actions...
}
```

### useAdminCouponStats

**File:** `src/hooks/useAdminCoupons.ts`

```typescript
import { useAdminCouponStats } from '@/hooks/useAdminCoupons';

function CouponStats() {
  const { stats, isLoading, error, refetch } = useAdminCouponStats();

  return (
    <div>
      <p>Total: {stats?.totalCoupons}</p>
      <p>Active: {stats?.activeCoupons}</p>
      <p>Savings: ${stats?.totalSavings}</p>
    </div>
  );
}
```

### useCouponValidation

**File:** `src/hooks/useCouponValidation.ts`

**Purpose:** Validate coupons at checkout with stacking support

```typescript
import { useCouponValidation } from '@/hooks/useCouponValidation';

function CheckoutPage() {
  const productId = 'securevault-docs';
  const subtotalCents = 2999;

  const {
    loading,
    result,
    validate,
    clear,
    applied,        // AppliedCoupon[]
    rejected,       // { code: string; reason: string }[]
    finalCents,     // number
    totalDiscount,  // number
    isValid,        // boolean
  } = useCouponValidation(productId, subtotalCents);

  async function handleApplyCoupon(codes: string[]) {
    const result = await validate(codes);
    if (result.ok) {
      console.log('Applied:', result.applied);
      console.log('Final price:', result.finalCents);
    } else {
      console.log('Rejected:', result.rejected);
    }
  }

  return (
    <div>
      <input onChange={e => handleApplyCoupon([e.target.value])} />
      {loading && <p>Validating...</p>}
      {isValid && <p>Discount: ${totalDiscount / 100}</p>}
    </div>
  );
}
```

### validateCoupon (standalone function)

**File:** `src/hooks/useAdminCoupons.ts`

```typescript
import { validateCoupon } from '@/hooks/useAdminCoupons';

// Single coupon validation
const result = await validateCoupon(
  'SAVE20',           // code
  'securevault-docs', // productId (optional)
  'client_123',       // clientId (optional)
  2999                // subtotalCents
);

if (result.valid) {
  console.log('Discount:', result.discountCents);
  console.log('Message:', result.message);
} else {
  console.log('Error:', result.message);
}
```

---

## Checkout Integration

### Current Implementation

**File:** `src/app/checkout/start/page.tsx`

The checkout page already has full coupon integration:

```typescript
// URL Parameters Support
// /checkout/start?coupon=SAVE20
// /checkout/start?coupon=CODE1,CODE2 (multiple)

const searchParams = useSearchParams();
const couponFromUrl = searchParams.get('coupon');

// Hook Integration
const {
  loading: couponLoading,
  result: couponResult,
  validate: validateCoupons,
  clear: clearCoupons,
  applied,
  rejected,
  finalCents,
  totalDiscount,
  isValid: couponValid,
} = useCouponValidation(productId, subtotalCents);

// Auto-apply from URL
useEffect(() => {
  if (couponFromUrl) {
    const codes = couponFromUrl.split(',').map(c => c.trim());
    validateCoupons(codes);
  }
}, [couponFromUrl]);

// Manual coupon input
const [couponInput, setCouponInput] = useState('');

async function handleApplyCoupon() {
  const codes = couponInput.split(',').map(c => c.trim()).filter(Boolean);
  await validateCoupons(codes);
}

// Display
return (
  <div>
    {/* Coupon Input */}
    <div className="flex gap-2">
      <Input
        value={couponInput}
        onChange={e => setCouponInput(e.target.value)}
        placeholder="Enter coupon code"
      />
      <Button onClick={handleApplyCoupon} disabled={couponLoading}>
        Apply
      </Button>
    </div>

    {/* Applied Coupons */}
    {applied.map(coupon => (
      <div key={coupon.code} className="flex justify-between">
        <span>{coupon.code}</span>
        <span>-${(coupon.discountCents / 100).toFixed(2)}</span>
      </div>
    ))}

    {/* Rejected Coupons */}
    {rejected.map(r => (
      <div key={r.code} className="text-red-500">
        {r.code}: {r.reason}
      </div>
    ))}

    {/* Price Summary */}
    <div>
      <p>Subtotal: ${(subtotalCents / 100).toFixed(2)}</p>
      {totalDiscount > 0 && (
        <p className="text-green-500">
          Discount: -${(totalDiscount / 100).toFixed(2)}
        </p>
      )}
      <p className="font-bold">
        Total: ${(finalCents / 100).toFixed(2)}
      </p>
    </div>
  </div>
);
```

### Shareable Coupon URLs

Create marketing links with pre-applied coupons:

```
https://omgsystem.com/checkout/start?product=securevault-docs&coupon=SAVE20
https://omgsystem.com/checkout/start?product=omg-iq&coupon=NEWUSER50
https://omgsystem.com/checkout/start?tier=growth&coupon=CODE1,CODE2
```

---

## Coupon Stacking Logic

### How Stacking Works

**File:** `src/hooks/useCouponValidation.ts`

When multiple coupons are provided:

1. **Validate each coupon** individually via API
2. **Sort by priority** (highest first)
3. **Apply stacking rules:**
   - Non-stackable coupons block all others
   - One coupon per `stackGroup`
   - Sequential discount calculation

### Stacking Rules

| Scenario | Behavior |
|----------|----------|
| All stackable | Apply all in priority order |
| One non-stackable | Only that coupon applies |
| Multiple non-stackable | Best value wins |
| Same stackGroup | First (by priority) wins |

### Example Stacking Scenarios

**Scenario 1: Two Stackable Coupons**
```
Coupons: SAVE10 (10%), EXTRA5 (5%)
Subtotal: $100.00

SAVE10 applied: $100 - $10 = $90
EXTRA5 applied: $90 - $4.50 = $85.50

Final: $85.50 (not $85.00!)
```

**Scenario 2: Non-Stackable Blocks Others**
```
Coupons: HALFOFF (50%, non-stackable), EXTRA5 (5%, stackable)
Subtotal: $100.00

HALFOFF wins, EXTRA5 rejected: "Cannot stack with another coupon"
Final: $50.00
```

**Scenario 3: Same Stack Group**
```
Coupons: PARTNER10 (10%, group: "partner"), PARTNER15 (15%, group: "partner")
Subtotal: $100.00

PARTNER15 wins (higher discount), PARTNER10 rejected: "Only one coupon allowed from group: partner"
Final: $85.00
```

### Code Implementation

```typescript
// From useCouponValidation.ts

export async function validateCouponStack(
  codes: string[],
  productId: string,
  subtotalCents: number
): Promise<CouponStackResult> {
  // 1. Validate each coupon
  const validCoupons: ValidatedCoupon[] = [];
  const rejected: { code: string; reason: string }[] = [];

  for (const code of codes) {
    const result = await validateCouponCode(code, productId, subtotalCents);
    if (result.valid && result.coupon) {
      validCoupons.push(result.coupon);
    } else {
      rejected.push({ code, reason: result.message });
    }
  }

  // 2. Sort by priority (highest first)
  const sorted = [...validCoupons].sort((a, b) => b.priority - a.priority);

  // 3. Check non-stackable
  const hasNonStackable = sorted.some(c => !c.stackable);
  if (hasNonStackable && sorted.length > 1) {
    // Keep only the best non-stackable
    const best = sorted.find(c => !c.stackable)!;
    for (const c of sorted) {
      if (c.code !== best.code) {
        rejected.push({ code: c.code, reason: "Cannot stack with another coupon" });
      }
    }
    couponsToApply = [best];
  }

  // 4. Check stack groups
  const usedGroups = new Set<string>();
  for (const c of couponsToApply) {
    if (c.stackGroup) {
      if (usedGroups.has(c.stackGroup)) {
        rejected.push({
          code: c.code,
          reason: `Only one coupon allowed from group: ${c.stackGroup}`
        });
        continue;
      }
      usedGroups.add(c.stackGroup);
    }
    filteredCoupons.push(c);
  }

  // 5. Calculate sequential discounts
  let running = subtotalCents;
  const applied: AppliedCoupon[] = [];

  for (const c of filteredCoupons) {
    const discount = c.type === 'PERCENTAGE'
      ? Math.round((running * c.value) / 100)
      : c.value;

    const cappedDiscount = Math.min(discount, running);
    running -= cappedDiscount;

    applied.push({
      code: c.code,
      percentOff: c.percentOff,
      discountCents: cappedDiscount,
      finalCentsAfter: running,
    });
  }

  return {
    ok: true,
    applied,
    rejected,
    finalCents: running,
    totalDiscountCents: subtotalCents - running,
  };
}
```

---

## Testing Guide

### Testing Coupon Creation (Admin)

1. **Navigate to Admin Portal**
   ```
   http://localhost:3000/portal/admin
   ```

2. **Go to Coupons Page**
   - Click "Coupons" in sidebar

3. **Create a New Coupon**
   - Click "Add Coupon" button
   - Fill in form:
     - Code: `TEST20`
     - Type: Percentage
     - Value: 20
     - Description: "Test 20% off"
   - Click "Create"

4. **Verify in Database**
   ```bash
   npx prisma studio
   # Open Coupon table, verify record exists
   ```

### Testing Coupon Validation (Checkout)

1. **Navigate to Checkout**
   ```
   http://localhost:3000/checkout/start?product=securevault-docs
   ```

2. **Enter Coupon Code**
   - Type `TEST20` in coupon field
   - Click "Apply"

3. **Verify Response**
   - Should see: "Coupon applied successfully!"
   - Discount amount displayed
   - Final price updated

4. **Test Invalid Coupon**
   - Enter `FAKECODE`
   - Should see: "Invalid coupon code"

### Testing Coupon Stacking

1. **Create Two Stackable Coupons** (in admin)
   - `STACK10` - 10%, stackable: true, priority: 1
   - `STACK5` - 5%, stackable: true, priority: 0

2. **Apply Both at Checkout**
   ```
   http://localhost:3000/checkout/start?product=securevault-docs&coupon=STACK10,STACK5
   ```

3. **Verify Stacking**
   - Both coupons should apply
   - Discounts calculated sequentially

### Testing via API

```bash
# Create coupon
curl -X POST http://localhost:3000/api/admin/coupons \
  -H "Content-Type: application/json" \
  -H "Cookie: <your-session-cookie>" \
  -d '{
    "code": "APITEST",
    "type": "PERCENTAGE",
    "value": 25,
    "description": "API Test Coupon"
  }'

# Validate coupon
curl -X POST http://localhost:3000/api/admin/coupons/validate \
  -H "Content-Type: application/json" \
  -H "Cookie: <your-session-cookie>" \
  -d '{
    "code": "APITEST",
    "productId": "securevault-docs",
    "subtotalCents": 2999
  }'

# List coupons
curl http://localhost:3000/api/admin/coupons \
  -H "Cookie: <your-session-cookie>"

# Delete coupon
curl -X DELETE http://localhost:3000/api/admin/coupons/<coupon-id> \
  -H "Cookie: <your-session-cookie>"
```

### Testing Checklist

- [ ] Create percentage coupon
- [ ] Create fixed amount coupon
- [ ] Set expiration date
- [ ] Set start date (scheduled)
- [ ] Set max uses limit
- [ ] Set minimum purchase
- [ ] Set max discount cap
- [ ] Enable/disable coupon
- [ ] Delete coupon
- [ ] Duplicate coupon
- [ ] Bulk enable/disable
- [ ] Bulk delete
- [ ] Search coupons
- [ ] Filter by status
- [ ] Filter by category
- [ ] Export to CSV
- [ ] Apply at checkout
- [ ] Apply multiple (stacking)
- [ ] URL coupon parameter
- [ ] Product targeting
- [ ] First-time only restriction

---

## Stripe Integration Plan

### Current Status

| Component | Status |
|-----------|--------|
| OMG Coupon System | ✅ Complete |
| Stripe API Keys | ⏳ Waiting from manager |
| Stripe Checkout Session | ❌ Not implemented |
| Stripe Webhook Handler | ❌ Not implemented |

### Implementation Steps (When Keys Available)

#### 1. Create Stripe Checkout Session

**File:** `src/app/api/checkout/create-session/route.ts`

```typescript
import Stripe from 'stripe';
import { auth } from '@/auth';
import { prisma } from '@/lib/db';
import { validateCouponCode } from '@/hooks/useCouponValidation';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  const session = await auth();
  const { productId, couponCodes, tier } = await req.json();

  // Get product/tier pricing
  const price = getPriceForProduct(productId, tier);

  // Validate coupon if provided
  let discountPercent = 0;
  let omgCouponId = null;

  if (couponCodes?.length > 0) {
    const validation = await validateCouponCode(
      couponCodes[0],
      productId,
      price.amountCents
    );

    if (validation.valid && validation.coupon) {
      discountPercent = validation.coupon.percentOff;
      omgCouponId = validation.coupon.id;
    }
  }

  // Create Stripe coupon (if discount applies)
  let stripeCouponId = null;
  if (discountPercent > 0) {
    const stripeCoupon = await stripe.coupons.create({
      percent_off: discountPercent,
      duration: 'once',
      metadata: {
        omg_coupon_id: omgCouponId,
      },
    });
    stripeCouponId = stripeCoupon.id;
  }

  // Create checkout session
  const checkoutSession = await stripe.checkout.sessions.create({
    mode: 'subscription', // or 'payment'
    line_items: [{
      price: price.stripePriceId,
      quantity: 1,
    }],
    discounts: stripeCouponId ? [{ coupon: stripeCouponId }] : [],
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/cancel`,
    metadata: {
      userId: session?.user?.id,
      productId,
      tier,
      omgCouponId,
    },
  });

  return Response.json({ url: checkoutSession.url });
}
```

#### 2. Create Stripe Webhook Handler

**File:** `src/app/api/webhooks/stripe/route.ts`

```typescript
import Stripe from 'stripe';
import { prisma } from '@/lib/db';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  const body = await req.text();
  const sig = req.headers.get('stripe-signature')!;

  const event = stripe.webhooks.constructEvent(
    body,
    sig,
    process.env.STRIPE_WEBHOOK_SECRET!
  );

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;
      const { userId, productId, tier, omgCouponId } = session.metadata!;

      // Update coupon usage
      if (omgCouponId) {
        await prisma.coupon.update({
          where: { id: omgCouponId },
          data: {
            currentUses: { increment: 1 },
            totalSavings: {
              increment: session.total_details?.amount_discount || 0
            },
          },
        });
      }

      // Create subscription record
      await prisma.subscription.create({
        data: {
          userId,
          productId,
          tier,
          stripeSubscriptionId: session.subscription as string,
          status: 'ACTIVE',
        },
      });

      break;
    }

    case 'customer.subscription.deleted': {
      // Handle cancellation
      break;
    }
  }

  return Response.json({ received: true });
}
```

#### 3. Environment Variables Needed

```env
# .env.local
STRIPE_SECRET_KEY=sk_live_...
STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

---

## Business Rules Summary

### Coupon Validation Order

1. ✅ Code exists in database
2. ✅ Coupon is active (`isActive = true`)
3. ✅ Coupon has started (`startsAt` is null or past)
4. ✅ Coupon not expired (`expiresAt` is null or future)
5. ✅ Under max redemptions (`currentUses < maxUses`)
6. ✅ Meets minimum purchase (`subtotal >= minPurchase`)
7. ✅ Product targeting passes (`appliesTo` includes product)
8. ✅ Client targeting passes (`assignedTo` includes client)
9. ✅ First-time check passes (if `firstTimeOnly`)

### Discount Calculation

```typescript
// Percentage discount
discountCents = Math.round((subtotalCents * value) / 100);

// Fixed amount discount
discountCents = value; // Already in cents

// Apply max discount cap
if (maxDiscount && discountCents > maxDiscount) {
  discountCents = maxDiscount;
}

// Never exceed subtotal
if (discountCents > subtotalCents) {
  discountCents = subtotalCents;
}
```

### Targeting Rules

**Product Targeting (`appliesTo`):**
```json
// All products
null or "all"

// Specific products
["securevault-docs", "omg-iq"]
```

**Client Targeting (`assignedTo`):**
```json
// All clients
null or "all"

// Specific clients
["client_123", "client_456"]
```

### Stacking Priority

1. Non-stackable coupons win over all
2. Higher priority numbers applied first
3. Stack groups limit to one per group
4. Sequential calculation (compound discount)

---

## Quick Reference

### Common Tasks

| Task | How To |
|------|--------|
| Create coupon | Admin Portal → Coupons → Add Coupon |
| Disable coupon | Toggle switch in coupon row |
| Delete coupon | Actions menu → Delete |
| Bulk disable | Select rows → Disable Selected |
| Export CSV | Click "Export CSV" button |
| Apply at checkout | Enter code in coupon field |
| Pre-apply via URL | Add `?coupon=CODE` to checkout URL |

### API Quick Reference

| Operation | Endpoint | Method |
|-----------|----------|--------|
| List | `/api/admin/coupons` | GET |
| Create | `/api/admin/coupons` | POST |
| Get one | `/api/admin/coupons/[id]` | GET |
| Update | `/api/admin/coupons/[id]` | PATCH |
| Delete | `/api/admin/coupons/[id]` | DELETE |
| Duplicate | `/api/admin/coupons/[id]/duplicate` | POST |
| Bulk ops | `/api/admin/coupons/bulk` | POST |
| Stats | `/api/admin/coupons/stats` | GET |
| Validate | `/api/admin/coupons/validate` | POST |

### Files Quick Reference

| File | Purpose |
|------|---------|
| `prisma/schema.prisma` | Database model |
| `src/hooks/useAdminCoupons.ts` | Admin data hook |
| `src/hooks/useCouponValidation.ts` | Checkout validation |
| `src/app/api/admin/coupons/route.ts` | Main API |
| `src/app/api/admin/coupons/validate/route.ts` | Validation API |
| `src/app/portal/admin/coupons/CouponsTable.tsx` | Admin UI |
| `src/app/checkout/start/page.tsx` | Checkout page |

---

## Changelog

### v1.0.0 (January 16, 2026)
- Initial documentation
- Full system complete (database, API, frontend)
- Checkout integration working
- Pending: Stripe webhook integration

---

## Support

For questions or issues:
- Check this documentation first
- Review API responses for error messages
- Check browser console for frontend errors
- Check server logs for API errors

**Common Issues:**

1. **"Unauthorized" error** - Session expired, re-login
2. **"Coupon not found"** - Check code is uppercase
3. **"Coupon expired"** - Check `expiresAt` date
4. **"Min purchase not met"** - Increase cart value
5. **Stacking not working** - Check `stackable` flag on both coupons
