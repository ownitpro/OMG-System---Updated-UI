# SecureVault Docs — Client Portal Pack

**ENGINEERING NOTES (no‑scaffold)**

These notes summarize the structure, contracts, and testing steps for the Business + Personal client portal experience. No code here — safe to commit for team reference.

---

## 1) Scope

* Provide end‑to‑end mock flow for **Business org** and **Personal** portals.
* Guest experience: token/PIN, view requests, upload (mock), status.
* Internal experience: list portals, create portal, configure requested items, copy share link, revoke portal.
* **No** AWS, Stripe, or email side effects.

---

## 2) Routing (App Router)

### Guest

* `/portal/[portalId]/(guest)/page` → entry w/ links to login, requests
* `/portal/[portalId]/(guest)/login` → token/PIN input (mock accept)
* `/portal/[portalId]/(guest)/requests` → list required/optional docs
* `/portal/[portalId]/(guest)/upload` → dropzone (mock)
* `/portal/[portalId]/(guest)/status` → progress strip

### Internal — Business

* `/org/[orgId]/portals` → list
* `/org/[orgId]/portals/new` → create modal host
* `/org/[orgId]/portals/[portalId]` → detail (requests editor, share link, revoke)

### Internal — Personal

* `/personal/portals` → list
* `/personal/portals/new` → create
* `/personal/portals/[portalId]` → detail (same editor UX)

---

## 3) API Contracts (mock)

### Business Portals

* `GET /api/org/:orgId/portals` → `{ items: Portal[] }`
* `POST /api/org/:orgId/portals` → `{ ok: true, portal: Portal, token: string }` (creates portal + token)

### Portal Management

* `POST /api/org/portals/:portalId/requests` → upsert list of requested items
  * Body: `{ items: Array<{ label: string, required: boolean, notes?: string }> }`
  * Response: `{ ok: true }`
* `POST /api/org/portals/:portalId/revoke` → close portal
  * Response: `{ ok: true }`

### Personal Portals

* `GET /api/personal/portals` → `{ items: Portal[] }`
* `POST /api/personal/portals` → same signature as business
  * Body: `{ externalName: string, email?: string, pin?: string, expiresInDays?: number }`
  * Response: `{ ok: true, portal: Portal, token: string }`

### Guest Access

* `GET /api/portal/:portalId/requests` → `{ items: PortalRequest[] }`
* `GET /api/portal/:portalId/submissions` → `{ items: PortalSubmission[] }`
* `POST /api/portal/:portalId/presign` → `{ url: 'mock://upload' }` (mock presign)
* `POST /api/portal/:portalId/submit` → `{ ok: true, submission: PortalSubmission }`
  * Body: `{ fileName: string, bytes: number }`

**Types** (conceptual):

* `Portal { id, orgId?, personalId?, externalName, email?, pinHash?, expiresAt?, status, createdAt, updatedAt }`
* `PortalRequest { id, portalId, label, required, notes?, createdAt }`
* `PortalSubmission { id, portalId, requestId?, fileKey, fileName, bytes, ocrStatus, createdAt }`
* `GuestToken { id, portalId, token, expiresAt, usedAt? }`

---

## 4) Components

### `CreatePortalModal`
- **Location**: `src/components/portal/CreateModal.tsx`
- **Props**: `{ orgId?: string, personalId?: string }`
- **Features**: name/email/pin/expiry form; POSTs to business or personal endpoint
- **Usage**: Used in `/org/[orgId]/portals/new` and `/personal/portals/new`

### `RequestEditor`
- **Location**: `src/components/portal/RequestEditor.tsx`
- **Props**: `{ portalId: string }`
- **Features**: add/edit required items; upsert POST to `/api/org/portals/:portalId/requests`
- **Usage**: Used in portal detail pages

### `UploadsDropzone`
- **Location**: `src/components/portal/UploadsDropzone.tsx`
- **Props**: `{ portalId: string }`
- **Features**: simple `<input type=file>`; calls presign + submit (mock)
- **Usage**: Used in `/portal/[portalId]/(guest)/upload`

### `StatusStrip`
- **Location**: `src/components/portal/StatusStrip.tsx`
- **Props**: `{ portalId: string }`
- **Features**: summarizes required vs received counts
- **Usage**: Used in `/portal/[portalId]/(guest)/status`

### `ShareLink`
- **Location**: `src/components/portal/ShareLink.tsx`
- **Props**: `{ portalId: string, token?: string }`
- **Features**: copies public URL w/ token parameter
- **Usage**: Used in portal detail pages

### `RevokeButton`
- **Location**: `src/components/portal/RevokeButton.tsx`
- **Props**: `{ portalId: string }`
- **Features**: closes a portal (mock)
- **Usage**: Used in business portal detail pages

---

## 5) Seeds

### `seedBusinessDemo()`
- **Location**: `src/lib/portal-db.ts`
- **Creates**:
  - 2 portals (`org_demo`)
  - 3 requested items (T4 slips, Bank statements, Notice of Assessment)
  - 1 guest token (`demo-token-jm`)
- **Auto-seeds**: Called on `/org/[orgId]/portals` page load (idempotent)

### `seedPersonalDemo()`
- **Location**: `src/lib/portal-db.ts`
- **Creates**:
  - 1 portal (`personal_demo`)
  - 2 requested items (Lease Agreement, Proof of Insurance)
  - 1 guest token (`demo-token-ll`)
- **Auto-seeds**: Called on `/personal/portals` page load (idempotent)

### `runSeeds()`
- **Location**: `src/scripts/seed-portal-demo.ts`
- **Helper**: Calls both seed functions
- **Usage**: Can be called in dev layouts if desired

---

## 6) UX Notes

* Internal pages assume existing shell (header/sidebar). Nothing here injects duplicate nav.
* Buttons use generic `.btn`/`.btn-primary`/`.btn-danger` classes; map to your design system as needed.
* Share link is read‑only input + copy; real implementation will use signed URLs + shortlinks.
* Modal uses fixed overlay with z-index 50; responsive max-width.
* Status strip shows required/received/missing counts in a rounded card.

---

## 7) Wiring Plan (future, non‑mock)

1. **Auth & RBAC**: gate internal routes for org members; guest routes validate token+PIN.
2. **Storage**: replace `presign`/`submit` with S3 presign + multipart + callback to mark `ocrStatus`.
3. **OCR**: queue Textract job; update submission with parsed fields and folder routing.
4. **Email**: SES templated invite w/ magic link + optional PIN channel (Pinpoint/SNS for SMS).
5. **Audit**: append all actions to shared `audit_events` table (already approved model).
6. **Caps**: enforce per‑plan caps (percent tiles in Billing → guard rails only; hide AWS specifics in UI).

---

## 8) Test Plan (dev)

### Business Flow

1. **List Portals**
   - Visit `/org/org_demo/portals`
   - Should show 2 demo portals (auto-seeded)
   - Click "New Portal" → opens create modal

2. **Create Portal**
   - Fill form: name, email (optional), PIN (optional), expiry days
   - Submit → returns token
   - Redirects to detail page showing share link

3. **Manage Requests**
   - On detail page, use RequestEditor
   - Add/edit items, mark required/optional
   - Save → reload guest page to see updates

4. **Guest Access**
   - Copy share link: `/portal/[portalId]?token=[token]`
   - Visit link → enter token/PIN (mock accepts any)
   - View requests → see configured items
   - Upload file → shows in submissions
   - Check status → shows required vs received

5. **Revoke Portal**
   - Click "Close Portal" on detail page
   - Status changes to `closed`
   - Portal no longer accessible

### Personal Flow

1. **List Portals**
   - Visit `/personal/portals`
   - Should show 1 demo portal (auto-seeded)

2. **Create & Manage**
   - Same flow as business (create, edit requests, share link)
   - No revoke button (personal portals don't close)

---

## 9) Constraints & Safety

* No changes to global auth, headers, colors.
* Mock DB is ephemeral; restart resets state.
* All endpoints use `cache: 'no-store'` where needed to avoid stale lists.
* No AWS, Stripe, or email dependencies.
* All uploads are mocked (no actual file storage).
* PINs are mock-hashed (`hash:${pin}`) - not secure.

---

## 10) Hand‑off Checklist

* [ ] Link org shell nav item **Client Portals** → `/org/:orgId/portals`
* [ ] Link personal sidebar **Portals** → `/personal/portals`
* [ ] Ensure base URL env `NEXT_PUBLIC_BASE_URL` set for SSR fetches (optional)
* [ ] Confirm Tailwind/classes mapping for `.btn` variants
* [ ] Seed helper called in dev only
* [ ] Test all routes in dev environment
* [ ] Verify guest token flow works end-to-end
* [ ] Confirm modal styling matches design system

---

## 11) Future Enhancements

* Map `RequestEditor` items to marketplace templates
* Attach submissions to specific request rows
* Add per‑request statuses and reviewer comments
* Add CSV export for submissions metadata
* Replace copy‑link with one‑click invite (email + token)
* Add bulk portal creation
* Add portal templates/presets
* Add expiration reminders
* Add submission notifications
* Add file preview/download for submissions

---

## 12) File Structure Reference

```
src/
├── lib/
│   └── portal-db.ts                    # Mock database + seeds
├── components/
│   └── portal/
│       ├── CreateModal.tsx             # Create portal form
│       ├── RequestEditor.tsx            # Manage requested items
│       ├── UploadsDropzone.tsx          # File upload (mock)
│       ├── StatusStrip.tsx              # Status display
│       ├── ShareLink.tsx               # Share link + copy
│       └── RevokeButton.tsx            # Close portal
├── app/
│   ├── api/
│   │   ├── org/
│   │   │   ├── [orgId]/
│   │   │   │   └── portals/
│   │   │   │       └── route.ts        # GET/POST org portals
│   │   │   └── portals/
│   │   │       └── [portalId]/
│   │   │           ├── requests/
│   │   │           │   └── route.ts    # POST upsert requests
│   │   │           └── revoke/
│   │   │               └── route.ts    # POST close portal
│   │   ├── personal/
│   │   │   └── portals/
│   │   │       └── route.ts            # GET/POST personal portals
│   │   └── portal/
│   │       └── [portalId]/
│   │           ├── requests/
│   │           │   └── route.ts         # GET guest requests
│   │           ├── submissions/
│   │           │   └── route.ts        # GET guest submissions
│   │           ├── presign/
│   │           │   └── route.ts         # POST mock presign
│   │           └── submit/
│   │               └── route.ts        # POST mock submit
│   ├── portal/
│   │   └── [portalId]/
│   │       └── (guest)/
│   │           ├── page.tsx             # Landing
│   │           ├── login/
│   │           │   └── page.tsx         # Token/PIN login
│   │           ├── requests/
│   │           │   └── page.tsx         # View requests
│   │           ├── upload/
│   │           │   └── page.tsx         # Upload files
│   │           └── status/
│   │               └── page.tsx         # View status
│   ├── org/
│   │   └── [orgId]/
│   │       └── portals/
│   │           ├── page.tsx            # List portals
│   │           ├── new/
│   │           │   └── page.tsx        # Create portal
│   │           └── [portalId]/
│   │               └── page.tsx        # Portal detail
│   └── personal/
│       └── portals/
│           ├── page.tsx                # List portals
│           ├── new/
│           │   └── page.tsx           # Create portal
│           └── [portalId]/
│               └── page.tsx           # Portal detail
└── scripts/
    └── seed-portal-demo.ts            # Seed helper
```

---

## 13) Database Schema (Mock)

### In-Memory Storage

All data stored in `Map` structures in `src/lib/portal-db.ts`:

- `db.portals` - Map<string, Portal>
- `db.requests` - Map<string, PortalRequest>
- `db.submissions` - Map<string, PortalSubmission>
- `db.tokens` - Map<string, GuestToken> (keyed by token string)

### ID Generation

- Uses `cuid()` helper function: `prefix + random + timestamp`
- Prefixes: `p_` (portals), `r_` (requests), `s_` (submissions), `t_` (tokens), `tok_` (token strings)

### Data Persistence

- **Ephemeral**: Data only exists during dev server session
- **Reset**: Restarting dev server clears all data
- **Seeds**: Auto-seeded on page load (idempotent checks prevent duplicates)

---

## 14) Environment Variables

### Optional

- `NEXT_PUBLIC_BASE_URL` - Used for SSR fetches in server components
  - Default: `http://localhost:3000` (fallback)
  - Example: `https://app.securevaultdocs.com`

### Not Required

- No AWS credentials needed (all mocked)
- No Stripe keys needed (all mocked)
- No email/SES config needed (all mocked)

---

## 15) Known Limitations (Mock)

1. **No Real File Storage**: Uploads are mocked; no actual files stored
2. **No Authentication**: All routes are open (dev only)
3. **No Email**: No actual invite emails sent
4. **No OCR**: Submissions marked as `pending` (never processed)
5. **No Expiration Enforcement**: Expired portals still accessible
6. **No PIN Validation**: Mock accepts any PIN
7. **No Token Expiration**: Tokens never expire in mock
8. **No Audit Logging**: No action tracking
9. **No Rate Limiting**: No protection against abuse
10. **No File Validation**: No size/type checks

---

**Last Updated**: 2025-11-18  
**Status**: ✅ Complete - Ready for Integration Testing

