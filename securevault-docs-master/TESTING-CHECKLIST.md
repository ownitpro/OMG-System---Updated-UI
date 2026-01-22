# Portal System Testing Checklist

## 1. Portal Creation & Setup

### Admin Portal Creation
- [ ] Navigate to `/portals/new`
- [ ] Fill in client name and email
- [ ] Set a 4-6 digit PIN
- [ ] Set expiration date (optional)
- [ ] Add description
- [ ] Submit and verify portal is created
- [ ] Verify redirect to portal detail page
- [ ] Check that PIN is auto-generated if not provided

### Portal Settings
- [ ] Navigate to portal settings page
- [ ] Verify all fields load correctly
- [ ] Update client name and save
- [ ] Update client email and save
- [ ] Change PIN and verify it works
- [ ] Update expiration date
- [ ] Add/update description
- [ ] Verify success messages appear
- [ ] Verify data persists after page reload

## 2. Document Requests

### Creating Requests
- [ ] Create a new portal
- [ ] Navigate to "Request Documents" from portal page
- [ ] Select a template (KYC, Financial, Property, etc.)
- [ ] Add custom items if needed
- [ ] Set due date
- [ ] Submit request
- [ ] Verify request appears in portal settings
- [ ] Verify request appears on client portal view

### Request Management in Settings
- [ ] View all requests for a portal in settings page
- [ ] Verify progress bars show correct status
- [ ] Delete a request
- [ ] Verify deleted request is removed
- [ ] Create multiple requests for same portal

## 3. Client Portal Access

### PIN Authentication
- [ ] Navigate to portal URL: `/portal/{portalId}`
- [ ] Verify organization branding appears (logo if set)
- [ ] Enter incorrect PIN
- [ ] Verify error message and attempt counter
- [ ] Enter incorrect PIN 5 times
- [ ] Verify account lockout (15 minutes)
- [ ] Wait or clear rate limit, enter correct PIN
- [ ] Verify authentication success
- [ ] Verify cookie-based session persists on refresh
- [ ] Close browser and reopen - verify session expired

### Portal Dashboard
- [ ] After authentication, verify welcome message with client name
- [ ] Verify progress bar shows overall completion
- [ ] Verify "Document Requests" card shows pending count
- [ ] Verify "General Upload" card is available
- [ ] Check "Active Requests" section shows all requests
- [ ] Verify completion status indicators (checkmark vs clock)

## 4. Document Upload

### Request-Based Upload
- [ ] Click on "Document Requests"
- [ ] Verify all requested items are listed
- [ ] Upload file for a request item
- [ ] Verify file size validation (max 50MB)
- [ ] Verify file type validation
- [ ] Verify upload progress indicator
- [ ] Verify success message
- [ ] Verify item marked as uploaded
- [ ] Verify progress bar updates
- [ ] Upload all items in a request
- [ ] Verify completion notification

### General Upload
- [ ] Click on "General Upload"
- [ ] Upload a file with purpose description
- [ ] Verify file validation
- [ ] Verify upload success
- [ ] Verify file is stored correctly

### Upload Edge Cases
- [ ] Try uploading file >50MB (should fail)
- [ ] Try uploading invalid file type (should fail)
- [ ] Try uploading with no purpose in general upload (should fail)
- [ ] Upload file with special characters in name
- [ ] Upload multiple files in sequence

## 5. Security Features

### Authentication
- [ ] Verify portal requires PIN before access
- [ ] Verify rate limiting (5 attempts, 15-min lockout)
- [ ] Verify session cookies are HTTP-only
- [ ] Verify session cookies have Secure flag in production
- [ ] Verify session cookies are SameSite=Strict

### Input Validation
- [ ] Try path traversal in filename (../../../etc/passwd)
- [ ] Try XSS in purpose field (<script>alert('xss')</script>)
- [ ] Try SQL injection in form fields
- [ ] Verify all inputs are sanitized
- [ ] Verify file sizes are checked server-side

### Authorization
- [ ] Try accessing portal A with session from portal B (should fail)
- [ ] Try accessing API endpoints without authentication (should fail)
- [ ] Try accessing another portal's documents (should fail)

## 6. Portal Management

### Portal List View
- [ ] Navigate to `/portals`
- [ ] Verify all portals are listed
- [ ] Verify search/filter works
- [ ] Verify portal cards show correct status
- [ ] Click on portal to view details

### Portal Deletion
- [ ] Go to portal settings
- [ ] Click "Delete Portal"
- [ ] Verify confirmation dialog
- [ ] Cancel deletion
- [ ] Delete portal
- [ ] Verify redirect to portals list
- [ ] Verify portal is removed
- [ ] Verify associated requests are deleted

## 7. Email Notifications (If Configured)

### Portal Created Email
- [ ] Create a new portal
- [ ] Verify client receives email with PIN
- [ ] Verify email contains portal URL
- [ ] Verify email has organization branding
- [ ] Click portal URL in email - should work

### Document Uploaded Email
- [ ] Upload a document
- [ ] Verify admin receives notification email
- [ ] Verify email contains client name and filename
- [ ] Verify email contains link to portal

### Request Completed Email
- [ ] Complete all items in a request
- [ ] Verify client receives completion email
- [ ] Verify admin receives completion email
- [ ] Verify emails contain correct request details

## 8. Database & Persistence

### Data Persistence
- [ ] Create portal and verify in database
- [ ] Update portal and verify changes in database
- [ ] Create request and verify in database
- [ ] Upload file and verify submission record
- [ ] Delete portal and verify cascade deletion

### Organization Handling
- [ ] Create portal for real organization (in DB)
- [ ] Verify folders are created in Folder table
- [ ] Create portal for personal vault (not in DB)
- [ ] Verify request created without folder errors
- [ ] Verify both portals function correctly

## 9. Error Handling

### Network Errors
- [ ] Disconnect network during upload
- [ ] Verify error message
- [ ] Reconnect and retry

### Server Errors
- [ ] Simulate 500 error
- [ ] Verify user-friendly error message
- [ ] Verify error is logged

### Form Validation
- [ ] Submit portal creation with empty required fields
- [ ] Submit with invalid email format
- [ ] Verify inline validation messages

## 10. Browser Compatibility

- [ ] Test in Chrome
- [ ] Test in Firefox
- [ ] Test in Safari
- [ ] Test in Edge
- [ ] Test on mobile browsers (iOS Safari, Chrome Mobile)

## 11. Mobile Responsiveness

- [ ] Portal creation form on mobile
- [ ] Portal settings on mobile
- [ ] Client portal access on mobile
- [ ] Document upload on mobile
- [ ] File selection works on mobile
- [ ] PIN input works on mobile
- [ ] All buttons are tappable
- [ ] No horizontal scrolling

## 12. Performance

- [ ] Portal list loads within 2 seconds
- [ ] Portal detail loads within 1 second
- [ ] File upload progress is smooth
- [ ] No console errors
- [ ] No memory leaks during navigation

## Integration Testing Scenarios

### Complete Portal Flow
1. Admin creates portal with client info and PIN
2. Admin creates document request with 3 items
3. Client receives portal URL and PIN (manually or via email)
4. Client accesses portal with PIN
5. Client uploads 3 documents for request
6. Admin views completed request in settings
7. Admin downloads uploaded documents
8. Admin marks request as reviewed
9. Admin deletes portal

### Multi-Portal Scenario
1. Create 3 portals for same organization
2. Create different requests for each
3. Verify isolation between portals
4. Verify correct file routing to folders
5. Delete one portal, verify others unaffected

### Error Recovery
1. Start upload, cancel mid-way
2. Start again, verify works
3. Submit form with error
4. Fix error and resubmit
5. Verify no duplicate records

## Pre-Deployment Checklist

- [ ] All tests passing
- [ ] No console errors in production build
- [ ] Environment variables configured
- [ ] Database migrations run
- [ ] S3 bucket configured (if using real storage)
- [ ] Email provider configured (if using)
- [ ] HTTPS enabled
- [ ] Security headers configured (CSP, HSTS, etc.)
- [ ] Rate limiting in place
- [ ] Logging configured
- [ ] Monitoring/alerting set up
- [ ] Backup strategy in place
- [ ] Deployment checklist reviewed (see DEPLOYMENT-CHECKLIST.md)

## Known Issues / Future Improvements

- [ ] Add 2FA option for portals
- [ ] Add file preview capability
- [ ] Add bulk portal creation (CSV upload)
- [ ] Add portal analytics dashboard
- [ ] Add virus scanning for uploads
- [ ] Add document watermarking
- [ ] Add offline support with service workers
- [ ] Add request templates customization
- [ ] Add automated reminders for pending requests
- [ ] Add client-side file encryption option
