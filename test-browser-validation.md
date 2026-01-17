# Browser Validation Checklist

## Pre-Test Setup

1. **Start Development Server**
   ```bash
   npm run dev
   ```

2. **Login as CLIENT User**
   - Navigate to: http://localhost:3000/login
   - Use test CLIENT credentials
   - Verify redirect to `/portal/client`

---

## Page-by-Page Validation

### ✅ 1. Billing Page (`/portal/client/billing`)

**Status Enums:**
- [ ] PAID invoices show green "Paid" badge
- [ ] PENDING invoices show yellow "Pending" badge
- [ ] Overdue invoices (past due date) show red "Overdue" badge

**Currency Formatting:**
- [ ] Invoice amounts display as CA$X,XXX.XX
- [ ] Total spend shows formatted currency
- [ ] Budget displays correctly with currency symbol

**Stats Cards:**
- [ ] "Total Paid" card shows sum of paid invoices
- [ ] "Pending Invoices" count excludes overdue
- [ ] "Active Subscriptions" count is accurate

**Actions:**
- [ ] Click "Download" button (should be styled, may not function yet)
- [ ] Click "View" button on invoice

**Console Errors:**
- [ ] No errors related to formatCurrency
- [ ] No errors related to getInvoiceStatus

---

### ✅ 2. Support Page (`/portal/client/support`)

**Ticket ID Formatting:**
- [ ] UUIDs show as "TKT-XXXX" (last 4 chars uppercase)
- [ ] Example: `cm4xabc1234def5678ghi` → `TKT-9GHI`

**Status Badges:**
- [ ] OPEN tickets show yellow badge with clock icon
- [ ] IN_PROGRESS tickets show blue badge
- [ ] RESOLVED tickets show green badge with check icon
- [ ] CLOSED tickets show gray badge

**Contact Form:**
- [ ] Subject input works
- [ ] Category dropdown has options
- [ ] Message textarea works
- [ ] "Send Message" button is styled

**Console Errors:**
- [ ] No errors related to formatTicketId
- [ ] No errors related to TICKET_STATUS

---

### ✅ 3. Automations Page (`/portal/client/automations`)

**Stats Calculation:**
- [ ] "Active Automations" shows count of active
- [ ] "Total Runs" shows sum of totalRuns (not runsToday)
- [ ] "Success Rate" shows percentage (95% for 95/100)

**Last Run Display:**
- [ ] Shows "2 hours ago" format (not exact time)
- [ ] Uses formatTimeAgo() helper

**Run Statistics:**
- [ ] Each automation shows total runs
- [ ] Shows success percentage per automation
- [ ] Color codes success rate (green/yellow/red)

**Status Display:**
- [ ] Active automations show green "Active" badge
- [ ] Paused automations show yellow/orange "Paused" badge

**Console Errors:**
- [ ] No errors related to calculateSuccessRate
- [ ] No errors related to formatTimeAgo

---

### ✅ 4. Ads Management Page (`/portal/client/ads-management`)

**Field Name Updates:**
- [ ] Shows "spent" not "spend"
- [ ] Budget column shows "CA$XXX of CA$XXX"
- [ ] Displays budget vs spent

**New Fields:**
- [ ] Date range shown under campaign name
- [ ] CPC (Cost Per Click) displayed
- [ ] Conversions count visible

**Stats Cards:**
- [ ] Total Spend uses formatCurrency
- [ ] Impressions use formatCompactNumber (12.5K format)
- [ ] Average CTR calculated correctly

**Status Badges:**
- [ ] ACTIVE campaigns show green badge
- [ ] PAUSED campaigns show appropriate color
- [ ] DRAFT campaigns show gray badge

**Console Errors:**
- [ ] No errors related to formatCompactNumber
- [ ] No errors related to CAMPAIGN_STATUS

---

### ⏳ 5. Content Development Page

**To Verify:**
- [ ] Project structure matches API
- [ ] Word count displayed
- [ ] Keywords shown as tags
- [ ] Due date with overdue highlighting

---

### ⏳ 6. Branding & Creative Page

**To Verify:**
- [ ] File size formatted (2.4 MB)
- [ ] File format badges (PNG, SVG, PDF)
- [ ] Dimensions display
- [ ] Color swatches render
- [ ] Download count visible

---

### ✅ 7. Custom Projects Page

**JSON Parsing:**
- [ ] Milestones parsed from JSON string
- [ ] Deliverables list displays
- [ ] Assigned team shown
- [ ] Repository links work (if present)

**Progress Tracking:**
- [ ] Progress percentage (0-100%)
- [ ] Estimated hours vs actual hours
- [ ] Budget vs spent with progress bar

**Status Display:**
- [ ] PLANNING status shows appropriately
- [ ] IN_PROGRESS status displays
- [ ] COMPLETED status visible

---

### ⏳ 8. Strategy Sessions Page

**To Verify:**
- [ ] Meeting link display
- [ ] Session notes (for completed)
- [ ] Duration formatting (60 min → "1 hour")
- [ ] Status badges (SCHEDULED, COMPLETED, CANCELLED)

---

### ⏳ 9. Timeguard-AI Page

**To Verify:**
- [ ] Running timer calculation
- [ ] Duration format (2h 0m)
- [ ] Billable indicator
- [ ] Tags display

---

### ⏳ 10. Profile Page

**To Verify:**
- [ ] Uses `position` field (not `role`)
- [ ] Avatar upload handler exists
- [ ] Form save to API
- [ ] Success/error toast

---

### ⏳ 11. Settings Page

**To Verify:**
- [ ] Settings persist to API (not just localStorage)
- [ ] Save button actually calls API
- [ ] "Download My Data" handler
- [ ] "Delete Account" handler

---

### ⏳ 12. Security Page

**To Verify:**
- [ ] Password change calls API
- [ ] 2FA setup functional
- [ ] Session revoke works
- [ ] Login history from API

---

## Common Validation Points

### Every Page Should:

1. **Load Without Errors**
   - [ ] No console errors on page load
   - [ ] No TypeScript compilation errors
   - [ ] No missing imports

2. **Display Data Correctly**
   - [ ] Mock data renders
   - [ ] Formatters work correctly
   - [ ] No "undefined" or "NaN" in UI

3. **Status Badges**
   - [ ] Colors match design
   - [ ] Icons display
   - [ ] Labels are readable

4. **Responsive Design**
   - [ ] Mobile view works
   - [ ] Tablet view works
   - [ ] Desktop view works

5. **Loading States**
   - [ ] Skeleton loaders (if present)
   - [ ] Spinner animations work
   - [ ] Transitions smooth

---

## Critical Console Checks

### Look For These Errors:

```
❌ Cannot read property 'XXX' of undefined
❌ formatCurrency is not a function
❌ TICKET_STATUS is undefined
❌ JSON.parse() error
❌ Invalid date
❌ Division by zero (NaN)
```

### Expected Warnings (OK):

```
⚠️ React key prop warnings (we'll fix during API connection)
⚠️ Missing alt text on images (optional fix)
```

---

## Testing Workflow

1. **Start at Dashboard**
   - Verify overview loads

2. **Visit Each Page in Order**
   - Click through sidebar navigation
   - Check all sections/tabs
   - Test filter/search (if present)

3. **Test Interactive Elements**
   - Click buttons (styled but may not function)
   - Open modals/dialogs
   - Toggle switches
   - Select dropdowns

4. **Check Network Tab**
   - No failed API calls to non-existent endpoints
   - No 404 errors for images/assets

5. **Verify Data Display**
   - Numbers formatted correctly
   - Dates human-readable
   - Currency shows proper symbol
   - Percentages have %
   - Large numbers abbreviated (12.5K)

---

## Success Criteria

### ✅ Phase 1 Complete When:

- [ ] All 4 fixed pages load without errors
- [ ] Status enums match API exactly
- [ ] All formatters work correctly
- [ ] No TypeScript errors in console
- [ ] Mock data displays properly
- [ ] No NaN or undefined in UI
- [ ] Status badges show correct colors
- [ ] Currency formatting consistent

### 🎯 Ready for API Connection When:

- [ ] All 12 pages fixed
- [ ] All action buttons have handlers (even if placeholder)
- [ ] All forms have submit logic
- [ ] No layout breaking issues
- [ ] All data structures match API responses

---

## Quick Test Commands

```bash
# Validation Test
node test-frontend-formatters.js

# Start Dev Server
npm run dev

# TypeScript Check
npm run build

# Lint Check
npm run lint
```

---

## Reported Issues Template

```markdown
### Issue: [Page Name] - [Brief Description]

**Page:** `/portal/client/[page-name]`
**Severity:** High/Medium/Low
**Category:** Status Enum / Field Mismatch / Formatting / Console Error

**Expected:**
[What should happen]

**Actual:**
[What actually happens]

**Console Error:**
\`\`\`
[Paste error message]
\`\`\`

**Screenshot:**
[If applicable]
```

---

## Next Steps After Validation

1. ✅ Fix any issues found
2. ✅ Update remaining 8 pages
3. ✅ Re-test all pages
4. ✅ Create API hooks for data fetching
5. ✅ Connect pages to real APIs
6. ✅ End-to-end testing
