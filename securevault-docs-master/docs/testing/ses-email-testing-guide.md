# SecureVault SES Email Testing Guide

## Overview

This guide covers testing all email functionality in SecureVault, including:
- **Cognito Auth Emails** - Signup verification, forgot password, admin-created users
- **Application Emails** - Portal invites, document notifications, reminders
- **Database Templates** - Custom email templates stored in Aurora

---

## Prerequisites

### 1. AWS Credentials
Ensure AWS credentials are configured:
```bash
# Option 1: Environment variables
export AWS_ACCESS_KEY_ID=your-key
export AWS_SECRET_ACCESS_KEY=your-secret
export AWS_REGION=ca-central-1

# Option 2: AWS credentials file (~/.aws/credentials)
[default]
aws_access_key_id = your-key
aws_secret_access_key = your-secret
```

### 2. Environment Variables
Set in `.env.local`:
```bash
DATABASE_URL=postgresql://...
EMAIL_PROVIDER=ses
EMAIL_FROM=noreply@securevaultdocs.com
AWS_ACCESS_KEY_ID=smtp-user-key
AWS_SECRET_ACCESS_KEY=smtp-user-secret
AWS_REGION=ca-central-1
```

### 3. SES Sandbox vs Production
- **Sandbox Mode**: Can only send to verified email addresses
- **Production Mode**: Can send to any email address

Check status in AWS Console → SES → Account dashboard

---

## Test Scripts

### 1. Verify SES Setup
Checks Lambda-Cognito connection, KMS key, and SES domain:
```bash
node scripts/verify-ses-setup.js
```

Expected output:
```
=== Cognito User Pool Lambda Trigger ===
✅ CustomEmailSender trigger configured
   Lambda ARN: arn:aws:lambda:ca-central-1:825738202952:function:securevault-cognito-email-sender
✅ KMS Key matches expected value

=== Lambda Function Configuration ===
✅ Lambda function exists
   Runtime: nodejs20.x

=== SES Configuration ===
Sending Enabled: ✅ Yes
Domain securevaultdocs.com: ✅ Verified
```

### 2. Run Email Flow Tests
Tests template retrieval, variable replacement, and SES sending:
```bash
# Run all tests
node scripts/test-email-flows.js --email your@email.com

# Run only template tests
node scripts/test-email-flows.js --type template

# Run only app email tests
node scripts/test-email-flows.js --type app --email your@email.com

# Run only Cognito tests
node scripts/test-email-flows.js --type cognito --email your@email.com
```

---

## Manual Testing Procedures

### Test 1: Cognito Signup Email

1. **Trigger**: Create new account via signup form
2. **Expected**: Branded HTML email with verification code
3. **Verify**:
   - Check email arrives within 1-2 minutes
   - Email has SecureVault branding
   - Verification code works

**CloudWatch Logs**:
```bash
aws logs tail /aws/lambda/securevault-cognito-email-sender --follow
```

### Test 2: Forgot Password Email

1. **Trigger**: Click "Forgot Password" on login page
2. **Expected**: Password reset email with code
3. **Verify**:
   - Email arrives with reset code
   - Code works on reset page

### Test 3: Portal Created Email

1. **Trigger**: Create new client portal in app
2. **Expected**: Client receives portal invitation
3. **Verify**:
   - Email has portal URL
   - Email has PIN
   - Expiry date is correct (if set)

**API Test**:
```bash
curl -X POST http://localhost:3000/api/org/YOUR_ORG_ID/portals \
  -H "Content-Type: application/json" \
  -H "x-user-id: YOUR_USER_ID" \
  -d '{
    "clientEmail": "test@example.com",
    "clientName": "Test Client"
  }'
```

### Test 4: Custom Template Email

1. **Setup**: Create/edit template in Admin → Email Templates
2. **Trigger**: Perform action that uses template (e.g., create portal)
3. **Verify**:
   - Custom subject/content is used
   - Variables are replaced correctly

---

## Troubleshooting Guide

### Issue: Email Not Received

**Check 1: SES Sending Enabled**
```bash
aws ses get-send-quota --region ca-central-1
```
Look for `Max24HourSend > 0`

**Check 2: Email in Spam Folder**
SES emails may be flagged as spam initially

**Check 3: CloudWatch Logs**
```bash
# Lambda logs
aws logs tail /aws/lambda/securevault-cognito-email-sender --since 30m

# Look for errors
aws logs filter-log-events \
  --log-group-name /aws/lambda/securevault-cognito-email-sender \
  --filter-pattern "ERROR"
```

**Check 4: SES Suppression List**
```bash
aws sesv2 list-suppressed-destinations --region ca-central-1
```

### Issue: Lambda Not Triggered

**Check 1: Cognito Lambda Config**
```bash
aws cognito-idp describe-user-pool \
  --user-pool-id ca-central-1_JY2OSgN3y \
  --query 'UserPool.LambdaConfig' \
  --region ca-central-1
```

Should show:
```json
{
  "CustomEmailSender": {
    "LambdaArn": "arn:aws:lambda:ca-central-1:825738202952:function:securevault-cognito-email-sender",
    "LambdaVersion": "V1_0"
  },
  "KMSKeyID": "arn:aws:kms:ca-central-1:825738202952:key/590ea24d-127f-423b-ae51-e54941c3c0f7"
}
```

**Fix**: Re-attach trigger
```bash
aws cognito-idp update-user-pool \
  --user-pool-id ca-central-1_JY2OSgN3y \
  --lambda-config "CustomEmailSender={LambdaVersion=V1_0,LambdaArn=arn:aws:lambda:ca-central-1:825738202952:function:securevault-cognito-email-sender},KMSKeyID=arn:aws:kms:ca-central-1:825738202952:key/590ea24d-127f-423b-ae51-e54941c3c0f7" \
  --region ca-central-1
```

### Issue: KMS Decryption Error

**Symptoms**: Lambda log shows "Unable to decrypt code"

**Check 1: KMS Key Policy**
```bash
aws kms get-key-policy \
  --key-id 590ea24d-127f-423b-ae51-e54941c3c0f7 \
  --policy-name default \
  --region ca-central-1
```

Policy must allow:
- `cognito-idp.amazonaws.com` to Encrypt
- Lambda role to Decrypt

**Check 2: Lambda Environment Variable**
```bash
aws lambda get-function-configuration \
  --function-name securevault-cognito-email-sender \
  --query 'Environment.Variables.KMS_KEY_ARN' \
  --region ca-central-1
```

Must match: `arn:aws:kms:ca-central-1:825738202952:key/590ea24d-127f-423b-ae51-e54941c3c0f7`

### Issue: SES Rate Limiting

**Symptoms**: `Throttling` error in logs

**Check**: Current sending quota
```bash
aws ses get-send-quota --region ca-central-1
```

**Monitor**: Real-time sending rate
```bash
aws ses get-send-statistics --region ca-central-1
```

### Issue: Template Not Found

**Symptoms**: Email uses hardcoded template instead of custom

**Check 1**: Template exists in DB
```sql
SELECT slug, name, "isActive"
FROM securevault."EmailTemplate"
WHERE "organizationId" = 'your-org-id';
```

**Check 2**: Template is active
```sql
SELECT * FROM securevault."EmailTemplate"
WHERE slug = 'portal_created'
  AND "organizationId" = 'your-org-id'
  AND "isActive" = true;
```

---

## Production Testing Checklist

### Pre-Launch

- [ ] AWS SES production access approved
- [ ] Domain DKIM verified (securevaultdocs.com)
- [ ] Lambda function deployed and working
- [ ] KMS key policy correct
- [ ] Cognito Lambda trigger attached
- [ ] All email templates migrated to DB
- [ ] Test email to personal account (spam check)

### Post-Launch Verification

- [ ] New user signup receives verification email
- [ ] Forgot password sends reset email
- [ ] Portal creation sends client invitation
- [ ] Document upload notifies admin
- [ ] Request completion notifies client
- [ ] Expiration reminders work

### Monitoring Setup

- [ ] CloudWatch alarms for Lambda errors
- [ ] SES bounce/complaint SNS notifications
- [ ] Daily sending quota monitoring
- [ ] Weekly email delivery rate review

---

## AWS Console Locations

| Component | Path |
|-----------|------|
| SES Dashboard | Amazon SES → Account dashboard |
| SES Identities | Amazon SES → Identities → securevaultdocs.com |
| SES Suppression | Amazon SES → Suppression list |
| Cognito Pool | Cognito → User pools → User pool - ckhazo |
| Cognito Triggers | Cognito → User pool → Lambda triggers |
| Lambda Function | Lambda → securevault-cognito-email-sender |
| Lambda Logs | CloudWatch → Log groups → /aws/lambda/securevault-cognito-email-sender |
| KMS Key | KMS → Customer managed keys → securevault-cognito-email |

---

## Common Commands Reference

### SES Commands
```bash
# Check sending quota
aws ses get-send-quota --region ca-central-1

# Send test email
aws ses send-email \
  --from noreply@securevaultdocs.com \
  --destination ToAddresses=test@example.com \
  --message "Subject={Data=Test},Body={Text={Data=Test message}}" \
  --region ca-central-1

# Check sending statistics
aws ses get-send-statistics --region ca-central-1

# List verified identities
aws ses list-identities --region ca-central-1
```

### Lambda Commands
```bash
# View recent logs
aws logs tail /aws/lambda/securevault-cognito-email-sender --since 1h --follow

# Get function config
aws lambda get-function-configuration \
  --function-name securevault-cognito-email-sender \
  --region ca-central-1

# Update environment variables
aws lambda update-function-configuration \
  --function-name securevault-cognito-email-sender \
  --environment "Variables={USER_POOL_ID=...,FROM_EMAIL=...,KMS_KEY_ARN=...}" \
  --region ca-central-1
```

### Cognito Commands
```bash
# Describe user pool
aws cognito-idp describe-user-pool \
  --user-pool-id ca-central-1_JY2OSgN3y \
  --region ca-central-1

# List users
aws cognito-idp list-users \
  --user-pool-id ca-central-1_JY2OSgN3y \
  --region ca-central-1 \
  --limit 10

# Admin create user (for testing)
aws cognito-idp admin-create-user \
  --user-pool-id ca-central-1_JY2OSgN3y \
  --username test@example.com \
  --user-attributes Name=email,Value=test@example.com \
  --message-action SUPPRESS \
  --region ca-central-1
```

---

## Email Template Variables Reference

| Template | Available Variables |
|----------|---------------------|
| portal_created | `clientName`, `clientEmail`, `orgName`, `portalUrl`, `pin`, `expiryDate`, `expiryText` |
| document_uploaded | `documentName`, `uploaderName`, `folderPath`, `uploadDate` |
| request_completed | `clientName`, `requestName`, `completedDate` |
| client_upload_notification | `clientName`, `fileName`, `uploadDate`, `portalName` |
| welcome_email | `userName`, `email`, `loginUrl` |
| password_reset | `userName`, `resetCode`, `resetUrl` |
| password_changed | `userName`, `changeDate` |
| request_created | `clientName`, `requestName`, `dueDate`, `portalUrl` |
| upload_confirmation | `clientName`, `fileName`, `uploadDate` |
| portal_expiring | `clientName`, `portalName`, `expiryDate`, `daysRemaining` |
| request_reminder | `clientName`, `requestName`, `dueDate`, `daysRemaining` |
| expiration_reminder | `documentName`, `expiryDate`, `daysRemaining` |

---

## Support

For issues with this testing guide or the email system:
1. Check CloudWatch logs first
2. Review this troubleshooting guide
3. Contact DevOps team with logs and error messages
