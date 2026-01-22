# Email Templates Testing Guide

This guide will help you test the newly implemented Email Template Management system.

## Prerequisites

✅ Database migration completed
✅ Dev server running
✅ User account created
✅ Organization/business vault created

---

## Step 1: Run the Database Migration

### Option A: Using the Migration Script

```bash
# Make sure you have .env.local configured with DATABASE_URL
node scripts/run-email-template-migration.js
```

### Option B: Manual SQL Execution

If you have direct database access (pgAdmin, DBeaver, psql, etc.):

1. Open your SQL client
2. Connect to your Aurora PostgreSQL database
3. Open and execute: `supabase/migrations/20251222_create_email_templates.sql`

### Verify Migration Success

You should see:
- ✅ Table `securevault."EmailTemplate"` created
- ✅ 4 indexes created (org, type, slug, active)
- ✅ Trigger for auto-updating timestamps
- ✅ 12 columns in the table

---

## Step 2: Start the Development Server

```bash
npm run dev
```

Navigate to: `http://localhost:3000`

---

## Step 3: Access Email Templates

1. Log in to your account
2. Navigate to an organization/business vault
3. Go to **Settings** (or Admin)
4. Click on the **"Email Templates"** card

**URL Pattern:** `/org/[your-org-id]/admin/email-templates`

---

## Step 4: Migrate Default Templates

On the Email Templates page:

1. Click the **"Migrate from Code"** button
2. Review the confirmation dialog
3. Click **"Migrate Templates"**
4. Wait for success message

**Expected Result:**
- ✅ 12 templates created
- ✅ Success message showing count
- ✅ Templates appear in grid

### Template Types Created:
1. Portal Created
2. Document Uploaded
3. Welcome Email
4. Password Reset
5. Password Changed
6. Request Created
7. Request Completed
8. Upload Confirmation
9. Client Upload Notification
10. Portal Expiring
11. Request Reminder
12. **Expiration Reminder** (NEW!)

---

## Step 5: Test Template CRUD Operations

### Create a New Template

1. Click **"Create Template"** button
2. Fill in the **Details** tab:
   - Name: "Test Welcome Email"
   - Description: "Custom welcome message"
   - Type: Select "Authentication"
   - Slug: Auto-generated (e.g., `test_welcome_email`)
   - Subject: `Welcome to {{orgName}}!`
   - Variables: Select `userName`, `orgName`, `loginUrl`

3. Switch to **HTML** tab:
   ```html
   <!DOCTYPE html>
   <html>
   <body style="font-family: sans-serif; padding: 20px;">
     <h2>Welcome {{userName}}!</h2>
     <p>Thanks for joining {{orgName}}.</p>
     <p><a href="{{loginUrl}}">Login Here</a></p>
   </body>
   </html>
   ```

4. Switch to **Text** tab and click "Auto-generate from HTML"

5. Switch to **Preview** tab to see live preview

6. Click **"Create Template"**

**Expected Result:**
- ✅ Template created
- ✅ Appears in grid
- ✅ Shows as "Active"

### Edit a Template

1. Click **"Edit"** on any template card
2. Modify the subject or content
3. Click **"Save Changes"**

**Expected Result:**
- ✅ Changes saved
- ✅ Updated timestamp shown
- ✅ Preview updates

### Toggle Active/Inactive

1. Click the **Active/Inactive** toggle on a template card
2. Observe status change

**Expected Result:**
- ✅ Status changes immediately
- ✅ Badge color updates (green → gray or vice versa)

### Delete a Template

1. Click **"Delete"** (trash icon) on a template
2. Confirm deletion in dialog

**Expected Result:**
- ✅ Template removed from grid
- ✅ Confirmation message

---

## Step 6: Test Filtering & Search

### Filter by Type

1. Use the **Type dropdown**
2. Select "Portal", "Authentication", "Request", or "Notification"

**Expected Result:**
- ✅ Only templates of selected type shown

### Filter by Status

1. Click **Active**, **Inactive**, or **All** toggle buttons

**Expected Result:**
- ✅ Templates filtered by active status

### Search

1. Type in the search box (e.g., "welcome", "portal")
2. Press Enter or wait for debounce

**Expected Result:**
- ✅ Templates filtered by name/description match

---

## Step 7: Test Email Sending

### Send Test Email

1. Click the **Send icon** on a template card
2. Enter your email address
3. Click **"Send Test"**

**Expected Result:**
- ✅ Success message shown
- ✅ Email received in inbox (check spam if using sandbox)
- ✅ Email contains replaced variables with sample data

### Test from Preview Tab

1. Edit a template
2. Go to **Preview** tab
3. Scroll down to "Send Test Email" section
4. Enter email address
5. Click **"Send Test"**

**Expected Result:**
- ✅ Test email sent with current template content
- ✅ Variables replaced correctly

---

## Step 8: Test Template Integration

### Create a Portal (to trigger email)

1. Go to **Client Portals**
2. Click **"Create Portal"** or **"New Portal"**
3. Fill in:
   - Client name
   - Client email (use your email)
   - Set a PIN
   - Set expiry date (optional)
4. Click **"Create"**

**Expected Result:**
- ✅ Portal created
- ✅ Email sent to client using **custom template** if exists
- ✅ Falls back to hardcoded template if no custom template
- ✅ Email received with portal details

### Check Console Logs

In your terminal where dev server is running, look for:
```
[EMAIL] Sent successfully to: client@example.com
```

Or if custom template was used:
```
[EMAIL] Using custom template: portal_created
```

---

## Step 9: Verify Database-First Behavior

### Test Custom Template Override

1. Create or edit the "Portal Created" template
2. Change the subject to: `🎉 Your Custom Portal from {{orgName}}`
3. Save and activate
4. Create a new portal
5. Check email

**Expected Result:**
- ✅ Email uses your custom subject
- ✅ Email uses your custom HTML
- ✅ All variables replaced correctly

### Test Fallback Behavior

1. Deactivate the "Portal Created" template (toggle to inactive)
2. Create a new portal
3. Check email

**Expected Result:**
- ✅ Email uses **hardcoded default** template
- ✅ No errors in console
- ✅ Email still sent successfully

---

## Step 10: Test Variable Replacement

### Available Variables Test

1. Edit a template
2. Go to **Details** tab
3. Scroll to "Available Variables" section
4. Click on any variable chip

**Expected Result:**
- ✅ Variable copied to clipboard (shows checkmark icon)
- ✅ Can paste `{{variableName}}` into content

### Preview with Sample Data

1. Edit a template
2. Add variables like `{{clientName}}`, `{{orgName}}`, `{{pin}}`
3. Go to **Preview** tab

**Expected Result:**
- ✅ Variables replaced with sample data
- ✅ Preview shows realistic content
- ✅ Missing variables highlighted in orange warning box

---

## Common Issues & Troubleshooting

### Issue: Migration fails

**Solution:**
- Check DATABASE_URL is set in `.env.local`
- Verify database connection (try psql or database client)
- Check if `securevault` schema exists
- Ensure you have CREATE TABLE permissions

### Issue: Templates not loading

**Solution:**
- Check browser console for errors
- Verify API route is accessible: `/api/org/[orgId]/email-templates`
- Check network tab for failed requests
- Verify user is logged in and has org membership

### Issue: Test email not sending

**Solution:**
- Check EMAIL_PROVIDER in `.env.local`
- If using SES sandbox, verify recipient email is verified
- Check console logs for email errors
- Verify AWS credentials if using SES

### Issue: Variables not replacing

**Solution:**
- Ensure variable syntax is `{{variableName}}` (double braces)
- Check variable is in template's `variables` array
- Verify sample data includes the variable key
- Check console for variable replacement errors

### Issue: Template not used when creating portal

**Solution:**
- Verify template slug matches exactly: `portal_created`
- Ensure template is Active
- Check organizationId matches
- Verify `organizationId` parameter is passed to email function

---

## Verification Checklist

After testing, verify:

- [ ] Migration ran successfully
- [ ] 12 default templates created via migration button
- [ ] Can create new custom template
- [ ] Can edit existing template
- [ ] Can delete template
- [ ] Can toggle active/inactive
- [ ] Can filter by type
- [ ] Can filter by status
- [ ] Can search templates
- [ ] Can send test email from card
- [ ] Can send test email from preview
- [ ] Portal creation uses custom template
- [ ] Inactive template falls back to code
- [ ] Variables replace correctly
- [ ] Preview shows correct content
- [ ] Email actually received in inbox

---

## Next Steps

Once testing is complete:

1. **Update remaining email functions** - Add DB template support to the other 11 email types
2. **Add monitoring** - Set up logging for template usage
3. **Create more templates** - Customize for your brand
4. **Test in staging** - Before production deployment
5. **Wait for AWS SES approval** - To send to non-verified emails

---

## Quick Test Commands

```bash
# Run migration
node scripts/run-email-template-migration.js

# Start dev server
npm run dev

# Check database connection
node -e "const {Client}=require('pg');require('dotenv').config({path:'.env.local'});const c=new Client({connectionString:process.env.DATABASE_URL});c.connect().then(()=>console.log('✅ DB Connected')).catch(e=>console.error('❌',e.message))"
```

---

## Support

If you encounter issues:
1. Check the console logs (browser + terminal)
2. Review the API responses in Network tab
3. Verify database schema is correct
4. Check environment variables are set

Happy testing! 🚀
