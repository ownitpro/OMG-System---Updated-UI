# SecureVault Docs - Troubleshooting Guide

This document contains all errors encountered and fixed during development, with prompts to quickly resolve them in the future.

---

## Table of Contents
1. [Localhost Not Opening / Port Conflicts](#1-localhost-not-opening--port-conflicts)
2. [Null Email Constraint Violation](#2-null-email-constraint-violation)
3. [Business Account Type Not Saving](#3-business-account-type-not-saving)
4. [getUserByEmail Return Type Mismatch](#4-getuserbyemail-return-type-mismatch)
5. [Documents Page HMR Error (Turbopack)](#5-documents-page-hmr-error-turbopack)
6. [SQL Column Does Not Exist Error](#6-sql-column-does-not-exist-error)
7. [Client Uploads Navigation Redirect Race Condition](#7-client-uploads-navigation-redirect-race-condition)
8. [Slow Bulk Delete in Documents Page](#8-slow-bulk-delete-in-documents-page)
9. [Page Re-fetching on Tab Switch](#9-page-re-fetching-on-tab-switch-all-pages)
10. [Upload Pausing When Switching Tabs](#10-upload-pausing-when-switching-tabs)
11. [Upload "Failed to fetch" Error During Batch Upload](#11-upload-failed-to-fetch-error-during-batch-upload)
12. [Corrupted User ID in Session](#12-corrupted-user-id-in-session-invalid-uuid-format)
13. [Client Portal Upload Button Disabled](#13-client-portal-upload-button-disabled)
14. [Client Uploads Widget Shows Nothing Useful](#14-client-uploads-widget-shows-nothing-useful)
15. [Personal Vault Dashboard - Uneven 3-Column Stats Layout](#15-personal-vault-dashboard---uneven-3-column-stats-layout)
16. [Database Connection Errors (ECONNRESET / SSL Certificate)](#16-database-connection-errors-econnreset--ssl-certificate)

---

## 1. Localhost Not Opening / Port Conflicts

### Symptoms
- `npm run dev` runs but localhost:3000 doesn't open
- Server starts on port 3001 instead of 3000
- Error: "Port 3000 is already in use"

### Root Cause
Another process (often a zombie Node.js process) is occupying port 3000.

### Fix Prompt
```
Kill all Node.js processes and restart the dev server on port 3000:
1. Run: taskkill /F /IM node.exe (Windows) or pkill node (Mac/Linux)
2. Clear .next folder: rmdir /s /q .next (Windows) or rm -rf .next (Mac/Linux)
3. Restart: npm run dev
```

### Files Modified
- None (process management only)

---

## 2. Null Email Constraint Violation

### Symptoms
```
error: null value in column "email" of relation "User" violates not-null constraint
```

### Root Cause
The `/api/users/[id]/route.ts` was calling `syncUserToDatabase()` without passing the email when creating/updating users.

### Fix Prompt
```
Fix the null email constraint in /api/users/[id]/route.ts:
1. Open src/app/api/users/[id]/route.ts
2. Find where syncUserToDatabase is called
3. Ensure email is passed: syncUserToDatabase({ id, email: session.user.email, name, accountType })
4. Add validation to reject requests without email
```

### Files Modified
- `src/app/api/users/[id]/route.ts`
- `src/app/api/auth/ensure-user/route.ts`

---

## 3. Business Account Type Not Saving

### Symptoms
- User signs up with "Business" account type
- After login, user appears as "Personal" account
- `accountType` field not persisted to database

### Root Cause
The `syncUserToDatabase()` function in `syncUser.ts` was not including `accountType` in the INSERT/UPDATE SQL statements.

### Fix Prompt
```
Fix accountType not saving in syncUserToDatabase:
1. Open src/lib/auth/syncUser.ts
2. Find the syncUserToDatabase function
3. Add accountType to the INSERT statement columns and VALUES
4. Add accountType to the ON CONFLICT UPDATE SET clause
5. Make sure accountType is passed through from signup API to auth callback
```

### Files Modified
- `src/lib/auth/syncUser.ts` - Added accountType to SQL INSERT/UPDATE
- `src/app/api/auth/[...nextauth]/route.ts` - Pass accountType through JWT/session

### Code Change
```typescript
// In syncUserToDatabase INSERT statement:
INSERT INTO ${tableName} (id, email, name, "accountType", ...)
VALUES ($1, $2, $3, $4, ...)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  name = EXCLUDED.name,
  "accountType" = COALESCE(EXCLUDED."accountType", ${tableName}."accountType"),
  ...
```

---

## 4. getUserByEmail Return Type Mismatch

### Symptoms
- Users always created as new even when they exist
- `existingUser` is always `undefined` after destructuring
- Console shows: `getUserByEmail result - data: [uuid] error: undefined` but user still treated as new

### Root Cause
The `getUserByEmail` function signature declared return type as `{ data, error }` but the function was returning the raw `queryOne()` result directly.

```typescript
// WRONG - function returned raw result
export async function getUserByEmail(email: string): Promise<{ data: CoreUser | null; error: Error | null }> {
  const result = await queryOne<CoreUser>(sql, [email]);
  return result; // This is CoreUser | null, NOT { data, error }
}

// When destructured:
const { data: existingUser } = await getUserByEmail(email);
// existingUser is always undefined because result doesn't have .data property
```

### Fix Prompt
```
Fix getUserByEmail return type mismatch in syncUser.ts:
1. Open src/lib/auth/syncUser.ts
2. Find all database functions: getUserByEmail, getUserById, getUserProfile, ensureUserProfile, syncUserToDatabase
3. Wrap each function body in try/catch
4. Return { data: result, error: null } on success
5. Return { data: null, error: err } on failure
```

### Files Modified
- `src/lib/auth/syncUser.ts`

### Code Change
```typescript
export async function getUserByEmail(email: string): Promise<{ data: CoreUser | null; error: Error | null }> {
  try {
    const sql = `SELECT * FROM ${getTableName('User')} WHERE email = $1`;
    const result = await queryOne<CoreUser>(sql, [email]);
    return { data: result, error: null };  // Properly wrap the result
  } catch (err) {
    console.error('[getUserByEmail] Error:', err);
    return { data: null, error: err as Error };
  }
}
```

---

## 5. Documents Page HMR Error (Turbopack)

### Symptoms
```
Error: Turbopack HMR error with expiration-service.ts
⨯ unhandledRejection: Error: ENOENT: no such file or directory
```
- Appears when navigating to /documents page
- Hot Module Replacement fails

### Root Cause
Corrupted `.next` build cache from Turbopack. Common after file changes or server crashes.

### Fix Prompt
```
Fix Turbopack HMR error:
1. Stop the dev server (Ctrl+C)
2. Delete .next folder: rmdir /s /q .next (Windows) or rm -rf .next (Mac/Linux)
3. Restart: npm run dev
4. If persists, also delete node_modules/.cache
```

### Files Modified
- None (cache clearing only)

---

## 6. SQL Column Does Not Exist Error

### Symptoms
```
Database query error: error: column ps.createdAt does not exist
hint: 'Perhaps you meant to reference the column "pr.createdAt"'
```

### Root Cause
The `PortalSubmission` table doesn't have a `createdAt` column. The query was using `ps."createdAt"` but should use `pr."createdAt"` from the joined `PortalRequest` table.

### Fix Prompt
```
Fix SQL column error in admin submissions route:
1. Open src/app/api/admin/submissions/route.ts
2. Find the ORDER BY clause
3. Change ps."createdAt" to pr."createdAt"
4. Clear .next cache and restart server to ensure new code runs
```

### Files Modified
- `src/app/api/admin/submissions/route.ts`

### Code Change
```typescript
// Before:
sql += ` ORDER BY ps."createdAt" DESC LIMIT ...`;

// After:
sql += ` ORDER BY pr."createdAt" DESC LIMIT ...`;
```

---

## 7. Client Uploads Navigation Redirect Race Condition

### Symptoms
- Click "View all" on Client Uploads widget
- Page loads briefly showing correct content
- Then redirects to /login
- Hitting browser back button shows the page correctly
- Server logs show page loads OK, then /login is requested

### Root Cause
Two issues combined:

**Issue A: AuthContext loading state (PRIMARY CAUSE)**
```typescript
// In AuthContext.tsx useEffect:
if (nextAuthSession?.user?.id) {
  fetchUserData(nextAuthSession.user.id)  // Async - not awaited!
}
setLoading(false)  // Runs BEFORE fetchUserData completes!
```
This caused `loading=false` while `user=null`, triggering redirect logic.

**Issue B: Layout redirect logic**
The layout checked `wasAuthenticated` from sessionStorage on every render, but during navigation the value could be stale.

### Fix Prompt
```
Fix navigation redirect race condition:

STEP 1 - Fix AuthContext.tsx:
1. Open src/contexts/AuthContext.tsx
2. Find the useEffect that handles session changes
3. Keep loading=true until fetchUserData completes:

   if (nextAuthSession?.user?.id) {
     setLoading(true)
     fetchUserData(nextAuthSession.user.id).finally(() => {
       setLoading(false)
     })
   } else {
     setUser(null)
     setLoading(false)
   }

STEP 2 - Fix layout.tsx (optional extra protection):
1. Open src/app/(app)/layout.tsx
2. Use useState for wasAuthenticated to read sessionStorage once on mount
3. Add hadUserRef to track if user was ever loaded in component lifecycle
4. Never redirect if hadUserRef.current is true
```

### Files Modified
- `src/contexts/AuthContext.tsx` - Fixed async loading state
- `src/app/(app)/layout.tsx` - Added defensive checks with useState and useRef
- `src/components/dashboard/RecentUploadsWidget.tsx` - Changed `<a>` to `<Link>` for client-side navigation

### Code Changes

**AuthContext.tsx:**
```typescript
useEffect(() => {
  if (status === 'loading') {
    setLoading(true)
    return
  }

  if (nextAuthSession?.user?.id) {
    setLoading(true)  // Keep loading true
    fetchUserData(nextAuthSession.user.id).finally(() => {
      setLoading(false)  // Only set false when done
    })
  } else {
    setUser(null)
    setLoading(false)
  }
}, [nextAuthSession, status, fetchUserData])
```

**layout.tsx:**
```typescript
// Read sessionStorage once on mount
const [wasAuthenticated] = useState(() => {
  if (typeof window === 'undefined') return false;
  return sessionStorage.getItem(AUTH_SESSION_KEY) === 'true';
});

// Track if user was ever loaded
const hadUserRef = useRef(false);
if (user && session) {
  hadUserRef.current = true;
}

// In redirect useEffect:
if (hadUserRef.current) return;  // Never redirect if we had a user
```

---

## Quick Reference Commands

### Clear Build Cache
```bash
# Windows
rmdir /s /q .next

# Mac/Linux
rm -rf .next
```

### Kill Node Processes
```bash
# Windows
taskkill /F /IM node.exe

# Mac/Linux
pkill node
```

### Restart Dev Server
```bash
npm run dev
```

### Check Port Usage
```bash
# Windows
netstat -ano | findstr :3000

# Mac/Linux
lsof -i :3000
```

---

## 8. Slow Bulk Delete in Documents Page

### Symptoms
- Selecting multiple documents and clicking delete takes ~1 minute
- UI freezes during bulk delete operation
- Each document deleted one at a time

### Root Cause
The bulk delete was using a sequential `for` loop with `await` on each delete request, making N API calls one after another instead of in parallel.

### Fix Prompt
```
Fix slow bulk delete in Documents page:
1. Open src/app/(app)/documents/page.tsx
2. Find the bulk delete section in confirmDelete function
3. Replace the sequential for loop with Promise.allSettled
4. Use parallel delete requests for all valid document IDs
```

### Files Modified
- `src/app/(app)/documents/page.tsx`

### Code Change
```typescript
// Before - Sequential (slow):
for (const documentId of documentIds) {
  await fetch(`/api/documents/${documentId}`, { method: 'DELETE' });
}

// After - Parallel (fast):
const deletePromises = validIds.map(documentId =>
  fetch(`/api/documents/${encodeURIComponent(documentId)}`, {
    method: 'DELETE',
  }).then(response => ({ documentId, success: response.ok }))
    .catch(() => ({ documentId, success: false }))
);
const results = await Promise.allSettled(deletePromises);
```

---

## 9. Page Re-fetching on Tab Switch (ALL PAGES)

### Symptoms
- Every time you switch away from the tab and come back, ALL pages show a loading spinner
- Dashboard, Documents, and other pages re-fetch data unnecessarily
- Wastes bandwidth and creates poor UX

### Root Cause
Multiple useEffects across the app (in AuthContext, OrganizationContext, and individual pages) re-run when the component re-renders. Tab visibility changes can trigger React re-renders, causing unnecessary API calls even though nothing actually changed.

### Fix Prompt
```
Fix page re-fetching on tab switch across ALL pages:

STEP 1 - Fix AuthContext.tsx:
1. Add refs: hasLoadedUserRef, lastUserIdRef
2. At the start of useEffect, check if user ID actually changed
3. Skip fetch if no change and data already loaded

STEP 2 - Fix OrganizationContext.tsx:
1. Add refs: hasLoadedDataRef, lastUserIdRef, lastAccountTypeRef
2. At the start of useEffect, check if user/accountType actually changed
3. Skip fetch if no change and data already loaded

STEP 3 - Fix individual pages (documents/page.tsx, dashboard/page.tsx):
1. Add refs to track last loaded values
2. Skip loadData() if values haven't actually changed
```

### Files Modified
- `src/contexts/AuthContext.tsx`
- `src/contexts/OrganizationContext.tsx`
- `src/app/(app)/documents/page.tsx`
- `src/app/(app)/dashboard/page.tsx`

### Code Change (AuthContext.tsx)
```typescript
// Track if data has been loaded
const hasLoadedUserRef = useRef(false);
const lastUserIdRef = useRef<string | null>(null);

useEffect(() => {
  const currentUserId = nextAuthSession?.user?.id || null;
  const userIdChanged = currentUserId !== lastUserIdRef.current;

  // Skip if user hasn't changed and we already loaded data
  if (!userIdChanged && hasLoadedUserRef.current && user) {
    console.log('[AUTH] Skipping user fetch - no actual change');
    setLoading(false);
    return;
  }

  if (nextAuthSession?.user?.id) {
    lastUserIdRef.current = nextAuthSession.user.id;
    fetchUserData(nextAuthSession.user.id).finally(() => {
      hasLoadedUserRef.current = true;
      setLoading(false);
    });
  } else {
    // Reset on logout
    hasLoadedUserRef.current = false;
    lastUserIdRef.current = null;
  }
}, [nextAuthSession, status, fetchUserData, user]);
```

### Code Change (OrganizationContext.tsx)
```typescript
// Track if data has been loaded
const hasLoadedDataRef = useRef(false);
const lastUserIdRef = useRef<string | null>(null);
const lastAccountTypeRef = useRef<string | null>(null);

useEffect(() => {
  const userChanged = user?.id !== lastUserIdRef.current;
  const accountTypeChanged = accountType !== lastAccountTypeRef.current;

  // Skip if nothing changed and data already loaded
  if (!userChanged && !accountTypeChanged && hasLoadedDataRef.current) {
    console.log('[ORG CONTEXT] Skipping fetch - no actual change');
    return;
  }

  if (user) {
    lastUserIdRef.current = user.id;
    lastAccountTypeRef.current = accountType;
    hasLoadedDataRef.current = true;
    // ... fetch data
  } else {
    // Reset on logout
    hasLoadedDataRef.current = false;
    lastUserIdRef.current = null;
    lastAccountTypeRef.current = null;
  }
}, [user, accountType]);
```

---

## 10. Upload Pausing When Switching Tabs

### Symptoms
- Start uploading a file
- Switch to another tab or window (alt+tab)
- Upload progress stops or slows dramatically
- Only resumes when returning to the tab

### Root Cause
Browsers throttle JavaScript execution and network requests in background tabs to save resources. This is especially aggressive in Chrome after 5+ minutes.

### Mitigation
While we cannot fully prevent browser throttling, we can:
1. Use Wake Lock API to prevent screen sleep (helps on mobile)
2. Use `keepalive: true` on small requests to prevent cancellation
3. Track upload state to handle resumption

### Fix Prompt
```
Mitigate upload pausing on tab switch:
1. Open src/components/documents/UploadDocumentModal.tsx
2. Add Wake Lock API to keep the browser active during uploads
3. Add visibility change listener to log when uploads may be affected
4. Use keepalive option on fetch for small files
```

### Files Modified
- `src/components/documents/UploadDocumentModal.tsx`

### Code Change
```typescript
// Request wake lock to prevent tab throttling
useEffect(() => {
  if (!uploading) return;

  let wakeLock: WakeLockSentinel | null = null;

  const requestWakeLock = async () => {
    try {
      if ('wakeLock' in navigator) {
        wakeLock = await navigator.wakeLock.request('screen');
      }
    } catch (err) {
      // Wake lock not supported
    }
  };

  if (uploading) {
    requestWakeLock();
  }

  return () => {
    if (wakeLock) wakeLock.release();
  };
}, [uploading]);
```

### Note
For large file uploads, consider implementing chunked uploads with resumption capability in a future update.

---

## 11. Upload "Failed to fetch" Error During Batch Upload

### Symptoms
- Uploading multiple files (e.g., 7 files) shows "Failed to fetch" error
- Console shows 500 errors from `/api/user/usage` endpoint
- Upload fails without clear error message

### Root Cause
Multiple issues can cause this:
1. Invalid user ID format causing database errors in `/api/user/usage`
2. Network timeouts during sequential file uploads
3. Presign or S3 upload requests failing without retries

### Fix Prompt
```
Fix batch upload "Failed to fetch" errors:

STEP 1 - Add UUID validation to /api/user/usage:
1. Open src/app/api/user/usage/route.ts
2. Add UUID regex validation before database query
3. Return zero usage (instead of 500 error) for invalid IDs

STEP 2 - Add UUID validation to presign endpoint:
1. Open src/app/api/personal/upload/presign/route.ts
2. Add UUID regex validation after userId check
3. Return 400 error for invalid ID format

STEP 3 - Add retry logic to upload process:
1. Open src/components/documents/UploadDocumentModal.tsx
2. Add retry loop with exponential backoff for presign requests
3. Add retry loop with exponential backoff for S3 uploads
```

### Files Modified
- `src/app/api/user/usage/route.ts` - Added UUID validation
- `src/app/api/personal/upload/presign/route.ts` - Added UUID validation
- `src/components/documents/UploadDocumentModal.tsx` - Added retry logic
- `src/hooks/usePlanEnforcement.ts` - Added UUID validation before usage fetch

### Code Changes

**API Route UUID Validation:**
```typescript
// Validate UUID format to prevent database errors
const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
if (!uuidRegex.test(userId)) {
  console.warn('[endpoint] Invalid user ID format:', userId)
  // Return safe default or 400 error
}
```

**Upload Retry Logic:**
```typescript
// Retry loop with exponential backoff
let retryCount = 0
const maxRetries = 2

while (retryCount <= maxRetries && !response) {
  try {
    response = await fetch(url, options)
  } catch (error) {
    retryCount++
    if (retryCount > maxRetries) throw error
    await new Promise(resolve => setTimeout(resolve, 1000 * retryCount))
  }
}
```

---

## 12. Corrupted User ID in Session (Invalid UUID Format)

### Symptoms
- Upload fails with "Failed to fetch" error
- Console shows 500 errors from `/api/user/usage` with malformed user ID like `user1-887d-dc8340f65285`
- User ID in session doesn't match UUID format (`xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`)
- Operations fail even after page refresh

### Root Cause
The NextAuth JWT token stored in browser cookies contains a corrupted user ID. This can happen due to:
1. Database migration issues
2. Session created before proper UUID generation was implemented
3. Edge cases in auth flow

### Fix
The app now automatically detects corrupted sessions and signs the user out with a helpful message. If this doesn't work automatically:

### Manual Fix
1. Open browser DevTools → Application → Cookies
2. Delete all cookies for `localhost:3000` (or your domain)
3. Clear localStorage: `localStorage.clear()`
4. Hard refresh the page (Ctrl+Shift+R)
5. Sign in again

### Files Modified
- `src/app/api/auth/[...nextauth]/route.ts` - Added UUID validation in session callback
- `src/contexts/AuthContext.tsx` - Added auto-signout for corrupted sessions
- `src/app/(auth)/login/page.tsx` - Added error message display

---

## 13. Client Portal Upload Button Disabled

### Symptoms
- User selects files in the portal upload page
- The "Upload X Documents" button stays grayed out / disabled
- No error message is shown

### Root Cause
The "Document Purpose" field is a **required field** but it's easy to miss. The upload button has this validation:
```typescript
disabled={uploading || isAnalyzing || files.length === 0 || !purpose}
```

### Fix Prompt
```
This is NOT a bug - just fill in the "Document Purpose" text field.

The field is located below the file list and is marked with a red asterisk (*).
Enter something like: "Tax documents", "Identity verification", "Passport upload"

The button will become active once the purpose field has content.
```

### Files
- `src/app/portal/[portalId]/upload/page.tsx` (lines 270-279, 611)

---

## 14. Client Uploads Widget Shows Nothing Useful

### Symptoms
- Dashboard shows "Client Uploads" widget with "No pending uploads"
- Widget doesn't show portal names or meaningful data
- Takes up space without providing value

### Root Cause
The widget was designed to show individual uploaded files, but:
1. The API was returning data grouped differently than expected
2. For many users, no pending uploads exist
3. The widget didn't aggregate data by portal name

### Fix Options

**Option A - Remove the widget entirely:**
```
Remove Client Uploads widget from dashboard:
1. Open src/app/(app)/dashboard/page.tsx
2. Delete the RecentUploadsWidget import at the top
3. Delete the <RecentUploadsWidget /> component usage
4. Adjust grid layout if needed
```

**Option B - Show portal list instead of file list:**
```
Update widget to show portals with pending counts:
1. Open src/components/dashboard/RecentUploadsWidget.tsx
2. Use data.filters.portals from API (already grouped)
3. Display: Portal Name + Count Badge + Latest Upload Time
4. Link each row to /dashboard/client-uploads?portalId=X
```

### Files Modified
- `src/app/(app)/dashboard/page.tsx` - Remove widget import and usage
- `src/components/dashboard/RecentUploadsWidget.tsx` - Or modify to show portals

---

## 15. Personal Vault Dashboard - Uneven 3-Column Stats Layout

### Symptoms
- On Personal vault, the stat cards (Total Documents, Share Links, Storage Used) look uneven
- There's empty space where the 4th card would be
- Cards don't fill the row properly

### Root Cause
The stats grid uses `lg:grid-cols-4` for all users, but Personal vault users don't have the "Active Portals" card (it's hidden via `canAccessClientPortal`). This leaves 3 cards in a 4-column grid.

### Fix Prompt
```
Fix Personal vault dashboard 3-column layout:
1. Open src/app/(app)/dashboard/page.tsx
2. Find the Key Metrics grid (around line 460)
3. Change static grid-cols-4 to dynamic based on account type:

Before:
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">

After:
<div className={`grid grid-cols-1 sm:grid-cols-2 ${canAccessClientPortal ? 'lg:grid-cols-4' : 'lg:grid-cols-3'} gap-4 sm:gap-6`}>
```

### Files Modified
- `src/app/(app)/dashboard/page.tsx` (line ~460)

### Code Change
```typescript
// Before - always 4 columns on large screens
<div ref={statsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">

// After - 3 columns for Personal, 4 columns for Business
<div ref={statsRef} className={`grid grid-cols-1 sm:grid-cols-2 ${canAccessClientPortal ? 'lg:grid-cols-4' : 'lg:grid-cols-3'} gap-4 sm:gap-6`}>
```

---

## Debugging Tips

1. **Check server logs** - Most errors show clear hints in the terminal
2. **Clear .next folder** - Fixes most Turbopack/HMR issues
3. **Check SQL hints** - PostgreSQL often suggests the correct column name
4. **Add console.logs** - Especially in auth callbacks and context providers
5. **Check return types** - TypeScript signatures must match actual returns
6. **Watch async timing** - Race conditions often occur when loading states aren't properly managed
7. **Check required fields** - Many "disabled button" issues are just missing required form fields
8. **Check conditional rendering** - Grids with hidden items may need dynamic column counts

---

## 16. Database Connection Errors (ECONNRESET / SSL Certificate)

### Symptoms
- Console shows: `[AUTH] Error fetching user data: "read ECONNRESET"`
- Console shows: `[AUTH] Error fetching user data: "unable to get local issuer certificate"`
- App shows "Personal (Error)" in the header
- User can login but data doesn't load properly
- Business account users see Personal vault features

### Root Causes

**ECONNRESET Error:**
- EC2 Instance Connect tunnel doesn't support port 5432 (only ports 22 and 3389)
- Network/firewall blocking outbound port 5432
- Aurora database not publicly accessible

**SSL Certificate Error:**
- `sslmode=require` in DATABASE_URL conflicts with `ssl: { rejectUnauthorized: false }` in db.ts

### Fix Prompt
```
Fix database connection errors:

STEP 1 - Check if you can reach Aurora directly:
1. Open PowerShell
2. Run: Test-NetConnection -ComputerName YOUR_AURORA_ENDPOINT -Port 5432
3. If TcpTestSucceeded: True → Aurora is reachable, go to Step 3
4. If TcpTestSucceeded: False → Go to Step 2

STEP 2 - Make Aurora publicly accessible (AWS Console):
1. RDS → Databases → your cluster → Modify
2. Set "Publicly accessible" = Yes
3. Security group → Add inbound rule: PostgreSQL (5432) from your IP or 0.0.0.0/0
4. Apply immediately
5. Re-test with Test-NetConnection

STEP 3 - Update DATABASE_URL in .env.local:
1. Remove localhost:5432 tunnel reference
2. Point directly to Aurora endpoint
3. Remove ?sslmode=require (db.ts handles SSL)

CORRECT FORMAT:
DATABASE_URL="postgresql://postgres:PASSWORD@YOUR-AURORA-ENDPOINT.rds.amazonaws.com:5432/postgres"

WRONG FORMAT (causes SSL error):
DATABASE_URL="postgresql://postgres:PASSWORD@YOUR-AURORA-ENDPOINT.rds.amazonaws.com:5432/postgres?sslmode=require"

STEP 4 - Restart dev server:
1. Kill node: taskkill /F /IM node.exe (Windows) or pkill node (Mac/Linux)
2. Run: npm run dev
```

### Files Modified
- `.env.local` - DATABASE_URL configuration

### Code Reference
The SSL is handled in `src/lib/db.ts`:
```typescript
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },  // This handles SSL - don't add sslmode=require to URL
  ...
});
```

### Alternative: Use SSM Port Forwarding (if direct connection blocked)
If your network blocks port 5432 and you can't make Aurora public:

1. Install AWS Session Manager Plugin
2. Add SSM permissions to your IAM user
3. Run:
```bash
aws ssm start-session --target YOUR_EC2_INSTANCE_ID --document-name AWS-StartPortForwardingSessionToRemoteHost --parameters host="YOUR_AURORA_ENDPOINT",portNumber="5432",localPortNumber="5432" --region YOUR_REGION
```
4. Use `DATABASE_URL="postgresql://postgres:PASSWORD@localhost:5432/postgres"` in .env.local

---

*Last updated: December 20, 2025*
