# Support Runbooks

## High-Level Troubleshooting Guides

### A. "Can't Login"

**Symptoms:**
- User cannot access account
- Login fails
- Password reset not working

**Steps:**

1. **Confirm email**
   - Verify correct email address
   - Check for typos
   - Try alternate email if available

2. **Check authentication method**
   - Try email/password
   - Try Google OAuth
   - Try Microsoft OAuth
   - Suggest alternate provider

3. **Check audit logs**
   - View recent login attempts
   - Check for failed attempts
   - Look for account lockout

4. **Reset password**
   - Use "Forgot password" flow
   - Verify email delivery (mock in test)
   - Check spam folder

5. **Resend invite (if new user)**
   - Check if invite was sent
   - Resend invite email
   - Verify email address

6. **For admins**
   - Suggest WebAuthn enrollment after access restored
   - Review security settings
   - Check for account restrictions

### B. "Share Link Not Working"

**Symptoms:**
- Link doesn't open
- PIN not accepted
- Expired link error
- Watermark viewer not loading

**Steps:**

1. **Verify PIN/expiry**
   - Check if PIN is required
   - Verify PIN was entered correctly
   - Check if link has expired
   - Verify expiry date

2. **Check link status**
   - Verify link is still active
   - Check if link was revoked
   - Confirm link URL is correct

3. **Recreate link if needed**
   - If expired, create new link
   - If revoked, create new link
   - Set new PIN and expiry

4. **Check watermark viewer**
   - Verify browser compatibility
   - Check JavaScript enabled
   - Try incognito mode
   - Clear browser cache

5. **Test access**
   - Open link in incognito
   - Test PIN entry
   - Verify watermark display
   - Check download (if enabled)

### C. "Portal Invite Not Received"

**Symptoms:**
- Client didn't receive invite
- Email not delivered
- Invite link not working

**Steps:**

1. **Verify email address**
   - Confirm correct email
   - Check for typos
   - Verify email format

2. **Resend invite**
   - Go to Client Portals
   - Find portal
   - Click "Resend Invite"
   - Verify email sent (mock in test)

3. **Check email delivery**
   - Check spam folder
   - Verify email filters
   - Try alternate email

4. **Provide alternate link**
   - Generate new invite token
   - Provide direct portal link
   - Include access instructions

5. **Verify portal access**
   - Test portal link
   - Confirm token works
   - Check portal permissions

### D. "Hit Usage Limit"

**Symptoms:**
- Upload blocked
- Usage bar at 100%
- Alert messages showing
- Service interruption

**Steps:**

1. **Explain caps visually**
   - Show Billing page
   - Explain usage bars
   - Show alert thresholds
   - Display current usage

2. **Review plan limits**
   - Show current plan
   - Explain plan features
   - Compare to other plans
   - Highlight upgrade benefits

3. **Suggest solutions**
   - Upgrade plan
   - Top-up (if available)
   - Archive old documents
   - Delete unused files

4. **Show upgrade path**
   - Navigate to Billing
   - Click "Upgrade" button
   - Show plan comparison
   - Explain upgrade process

5. **Monitor usage**
   - Set up usage alerts (future)
   - Review usage patterns
   - Plan for growth
   - Optimize storage

## Common Issues

### Upload Fails

**Check:**
- File size limits
- File type restrictions
- Network connection
- Browser compatibility
- Storage limits

**Solutions:**
- Try smaller files
- Check file format
- Retry upload
- Clear cache
- Upgrade plan if at limit

### OCR Not Working

**Check:**
- OCR feature enabled
- File format supported
- OCR pages limit
- Processing status

**Solutions:**
- Enable OCR in settings
- Check file format
- Review OCR limits
- Wait for processing
- Retry if failed

### Connector Not Connecting

**Check:**
- Connector enabled
- OAuth flow completed
- Credentials valid
- Service availability

**Solutions:**
- Reconnect connector
- Check OAuth flow
- Verify credentials
- Contact service provider
- Use mock mode for testing

## Escalation

**When to Escalate:**
- Security concerns
- Data loss
- Billing disputes
- System outages
- Feature requests

**Escalation Process:**
1. Document issue clearly
2. Gather user information
3. Collect error messages
4. Check audit logs
5. Contact engineering team

