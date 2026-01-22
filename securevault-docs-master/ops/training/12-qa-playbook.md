# QA Playbook

## Smoke Tests

Quick tests to verify core functionality. Run these before each release.

## Auth Tests

### Login Methods

**Test Cases:**
1. **Email/Password**
   - Enter valid credentials
   - Verify successful login
   - Check redirect to dashboard

2. **Google OAuth**
   - Click "Login with Google"
   - Complete OAuth flow (mock in test)
   - Verify account creation/login

3. **Microsoft OAuth**
   - Click "Login with Microsoft"
   - Complete OAuth flow (mock in test)
   - Verify account creation/login

4. **Beta Checkbox**
   - Verify visible in staging only
   - Check localStorage persistence
   - Test acceptance flow

### Signup Flow

**Test Cases:**
1. Create new account
2. Verify email confirmation (mock)
3. Complete onboarding
4. Access dashboard

## Org Switch Tests

**Test Cases:**
1. **Create Org**
   - Create new organization
   - Set name, logo, region
   - Verify org appears in header

2. **Invite Member**
   - Send invite email (mock)
   - Verify invite in system
   - Check email delivery

3. **Accept Invite**
   - Use invite link
   - Accept invitation
   - Verify member access

4. **Switch Orgs**
   - Switch between orgs
   - Verify header updates
   - Check data isolation

## Document Tests

**Test Cases:**
1. **Upload**
   - Upload single file
   - Upload multiple files
   - Verify progress bar
   - Check file appears in list

2. **Label**
   - Apply label to document
   - Verify label appears
   - Check label in search

3. **Search**
   - Search by filename
   - Search by label
   - Filter by date
   - Filter by type

4. **Version**
   - Upload new version
   - View version history
   - Restore previous version

5. **Viewer**
   - Open document
   - Verify viewer loads
   - Check watermark (if shared)

6. **Share & Revoke**
   - Create share link
   - Set PIN and expiry
   - Test link in incognito
   - Revoke share
   - Verify link no longer works

## Portal/Request Tests

**Test Cases:**
1. **Create Portal**
   - Create new client portal
   - Set client name and email
   - Send invite (mock)

2. **Send Request**
   - Create new request
   - Choose template
   - Select portal
   - Set due date
   - Send request

3. **Portal Upload**
   - Use portal link
   - Upload file via portal
   - Verify file appears in org

## Billing Tests

**Test Cases:**
1. **Usage Bars**
   - Verify bars display correctly
   - Check mock values
   - Test alert thresholds

2. **Upgrade Button**
   - Click upgrade
   - Verify routes to checkout
   - Check plan comparison

3. **Alerts**
   - Test 70% alert
   - Test 80% alert
   - Test 90% alert
   - Test 95% alert
   - Test 100% hard stop

## Marketplace Tests

**Test Cases:**
1. **Browse Templates**
   - View template list
   - Check template cards
   - Verify preview images

2. **Preview Template**
   - Click preview
   - View template details
   - Check content display

3. **Dry Run**
   - Run dry run
   - Verify preview shown
   - Check no changes made

4. **Install**
   - Install to Business
   - Verify redirect to templates page
   - Check template appears
   - Verify folders/labels created

5. **Install to Personal**
   - Install to Personal
   - Verify redirect to templates page
   - Check template appears
   - Verify folders/labels created

## Cross-Browser Tests

**Browsers to Test:**
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

**Test Areas:**
- Login/signup
- File upload
- Share links
- Portal access
- Responsive design

## Mobile Tests

**Devices:**
- iPhone (Safari)
- Android (Chrome)
- Tablet (iPad/Android)

**Test Areas:**
- PWA installation
- Touch interactions
- Responsive layout
- File upload
- Share link access

## Performance Tests

**Metrics:**
- Page load time
- Upload speed
- Search response time
- Share link load time

**Targets:**
- Page load < 2s
- Upload progress visible
- Search < 1s
- Share viewer < 3s

## Regression Tests

**Before Each Release:**
1. Run all smoke tests
2. Test critical user flows
3. Verify no breaking changes
4. Check demo orgs still work

## Bug Reporting

**Template:**
- **Title:** Clear description
- **Steps:** Reproducible steps
- **Expected:** What should happen
- **Actual:** What actually happens
- **Browser/OS:** Environment details
- **Screenshots:** If applicable

