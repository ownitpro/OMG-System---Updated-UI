# 🐛 Known Issues - OMG System

**Last Updated:** January 10, 2026 (Late Evening - Post API Connection Attempt)

---

## 🔴 CRITICAL - SSR Hydration Mismatch (Real Data Not Displaying)

### Issue Description
**Portal pages show mock data in UI even though APIs successfully return real data from database.**

**Status:** APIs ✅ Working | Data Fetching ✅ Working | DOM Update ❌ Broken

**What's Working:**
- APIs return 200 with real database data
- Hooks fetch data successfully
- React state contains real data (verified in console)
- Database queries execute properly

**What's Broken:**
- UI shows mock data (INV-001) instead of real data (INV-2024-001)
- Component renders on server with mock data
- Client-side data updates don't reflect in DOM

**Evidence:**
```
Console: invoiceNumbers: ["INV-2024-001", "INV-2024-002", "INV-2024-003"] ✅
UI Display: INV-001, INV-002, INV-003 ❌
```

**Root Cause:** Next.js SSR/hydration mismatch - server renders with mock, client fetches real data, but DOM doesn't update.

**Solution:** Remove mock data fallback OR fix hydration by using `useState` with `useEffect` to conditionally render only on client.

---

## 🟡 RESOLVED - NextAuth v5 Beta Routing Issue

### Issue Description
NextAuth v5 beta has routing issues with Next.js App Router. The catch-all route `[...nextauth]` is not properly handling auth endpoints.

**Affected Endpoints:**
- `/api/auth/session` → Returns 404
- `/api/auth/providers` → Returns 404
- `/api/auth/csrf` → Returns 404
- `/api/auth/error` → Returns 404

**Error in Browser:**
```
ClientFetchError: Unexpected token '<', "<!DOCTYPE"... is not valid JSON
```

**Root Cause:**
The `/api/auth/[...nextauth]/route.ts` catch-all should handle all `/api/auth/*` requests, but it's not being recognized by Next.js App Router in Turbopack dev mode.

### Current Workaround

**For Development/Testing Only:**
- Created temporary middleware bypass
- Allows direct access to `/portal/client` pages
- Auth still works on server-side (API routes protected)
- Only client-side `useSession()` affected

### Attempted Fixes

1. ✅ Added `basePath: "/api/auth"` to auth config
2. ✅ Verified `handlers` export exists
3. ✅ Confirmed route.ts file is correct
4. ⏳ Middleware approach (pending)
5. ⏳ Upgrade to NextAuth v5 stable (when released)
6. ⏳ Alternative: Auth.js standalone

### Impact

**What's Broken:**
- Client-side login form (uses `signIn()` from next-auth/react)
- Session checking on client pages
- Provider buttons (Google, GitHub, etc.)

**What Still Works:**
- Server-side authentication (API routes)
- `await auth()` in Server Components
- Protected API endpoints
- Database authentication
- Password verification

### Solution Plan

**Immediate (Today):**
1. Create temporary test bypass for frontend validation
2. Finish fixing remaining 7 frontend pages
3. Document all pages work with proper data structures

**Short-term (Next Session):**
4. Debug NextAuth v5 routing in detail
5. Consider alternative: Custom auth with server actions
6. Test middleware approach
7. Check NextAuth v5 GitHub issues

**Long-term:**
8. Upgrade to NextAuth v5 stable when released
9. Or migrate to alternative auth solution (Clerk, Auth0, custom)

---

## 🟡 MEDIUM - Frontend Pages Not Yet Fixed

### Issue Description
7 of 12 client portal pages still use old mock data structures that don't match API responses.

**Pages Needing Fixes:**
1. Content Development (`/portal/client/content-development`)
2. Branding & Creative (`/portal/client/branding-creative`)
3. Strategy Sessions (`/portal/client/strategy-sessions`)
4. Timeguard-AI (`/portal/client/timeguard-ai`)
5. Profile (`/portal/client/profile`)
6. Settings (`/portal/client/settings`)
7. Security (`/portal/client/security`)

**Impact:**
- Will have runtime errors when connected to APIs
- Field name mismatches
- Status enum mismatches
- Missing formatters

**Solution:**
Apply same fix pattern used for completed pages:
1. Import formatters from `/lib/client/formatters.ts`
2. Update mock data structure to match API
3. Update status enums
4. Replace inline formatters with utilities

---

## 🟡 MEDIUM - Mock Data vs API Connection

### Issue Description
All pages currently use hardcoded mock data. APIs exist but are not connected to frontend.

**What's Ready:**
- ✅ APIs built and tested (12 endpoints)
- ✅ Database populated (57 records)
- ✅ Formatters utility created
- ✅ 5 pages have correct data structures

**What's Needed:**
- Create custom React hooks for data fetching
- Replace mock data with `fetch()` or `useSWR()`
- Add loading states (skeleton loaders)
- Add error handling
- Wire up action buttons (create/edit/delete)

**Plan:**
1. Finish fixing remaining 7 pages first
2. Create `/hooks/useClientData.ts` with custom hooks
3. Replace mock data page by page
4. Add loading/error UI
5. Test CRUD operations

---

## 🟢 LOW - Prisma Warning

### Issue Description
```
warn The configuration property `package.json#prisma` is deprecated
```

**Impact:** Cosmetic warning, no functional impact

**Fix:**
Migrate to `prisma.config.ts` when convenient

---

## 🟢 LOW - Baseline Browser Mapping Warning

### Issue Description
```
[baseline-browser-mapping] The data in this module is over two months old
```

**Impact:** Cosmetic warning, no functional impact

**Fix:**
```bash
npm i baseline-browser-mapping@latest -D
```

---

## 📋 Issue Priority Matrix

| Priority | Issue | Impact | Fix Complexity | Timeline |
|----------|-------|--------|----------------|----------|
| 🔴 CRITICAL | NextAuth Routing | Blocks login | Medium | Today/Tomorrow |
| 🟡 MEDIUM | Frontend Pages (7) | Blocks API connection | Low | Today |
| 🟡 MEDIUM | API Connection | Blocks real data | Medium | Tomorrow |
| 🟢 LOW | Prisma Config | None | Low | Anytime |
| 🟢 LOW | Browser Mapping | None | Low | Anytime |

---

## 🎯 Resolution Roadmap

### Phase 1: Frontend Complete (Today)
- [x] Fix 5 critical pages ✅
- [ ] Fix remaining 7 pages
- [ ] Create temporary auth bypass
- [ ] Test all pages visually

### Phase 2: Auth Fix (Tomorrow AM)
- [ ] Debug NextAuth v5 routing
- [ ] Try middleware approach
- [ ] Or implement custom server action auth
- [ ] Test login/logout flow

### Phase 3: API Connection (Tomorrow PM)
- [ ] Create data fetching hooks
- [ ] Connect pages to APIs
- [ ] Add loading states
- [ ] Wire up CRUD operations

### Phase 4: Polish (Next Session)
- [ ] Fix Prisma warnings
- [ ] Update dependencies
- [ ] Full integration testing
- [ ] Performance optimization

---

## 🔗 Related Documentation

- [FRONTEND_FIXES_SUMMARY.md](FRONTEND_FIXES_SUMMARY.md) - Frontend fixes log
- [DATABASE_STATUS_COMPLETE.md](DATABASE_STATUS_COMPLETE.md) - Database status
- [SESSION_COMPLETE_SUMMARY.md](SESSION_COMPLETE_SUMMARY.md) - Session summary
- [test-browser-validation.md](test-browser-validation.md) - Testing checklist

---

## 📞 Reporting New Issues

When you find a new issue:

1. **Check Console** - Press F12, screenshot errors
2. **Note Context** - What were you doing?
3. **Reproduce** - Can you make it happen again?
4. **Document** - Add to this file with:
   - Clear description
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots/error messages
   - Proposed solution

---

**Status:** 🟡 In Progress - Actively working on fixes
**Next Action:** Create test bypass, finish remaining pages
