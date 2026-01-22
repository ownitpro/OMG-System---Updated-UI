# Lambda-Cognito Connection Verification Checklist

## Purpose
This checklist helps verify that the `securevault-cognito-email-sender` Lambda function is properly connected to Cognito User Pool and ready to send custom emails.

**Date Created:** 2025-12-20
**Verified:** 2025-12-21
**Status:** ✅ Verified and Working

---

## Expected Configuration Values

### Cognito User Pool
- **Pool ID:** `ca-central-1_JY2OSgN3y`
- **Pool Name:** User pool - ckhazo
- **Region:** ca-central-1

### Lambda Function
- **Name:** `securevault-cognito-email-sender`
- **ARN:** `arn:aws:lambda:ca-central-1:825738202952:function:securevault-cognito-email-sender`
- **Runtime:** Node.js 20.x
- **Region:** ca-central-1

### KMS Key
- **Alias:** `securevault-cognito-email`
- **ARN:** `arn:aws:kms:ca-central-1:825738202952:key/590ea24d-127f-423b-ae51-e54941c3c0f7`

---

## Verification Steps

### Step 1: Verify Cognito Lambda Trigger Configuration

**Navigation:** AWS Console → Amazon Cognito → User pools → User pool - ckhazo → User pool properties → Lambda triggers

**Check the following:**

- [ ] **Custom email sender** is configured
- [ ] **Lambda function ARN** matches: `arn:aws:lambda:ca-central-1:825738202952:function:securevault-cognito-email-sender`
- [ ] **Lambda version:** V1_0
- [ ] **KMS key ARN** matches: `arn:aws:kms:ca-central-1:825738202952:key/590ea24d-127f-423b-ae51-e54941c3c0f7`

**Expected Configuration in CLI (for reference):**
```json
{
  "CustomEmailSender": {
    "LambdaVersion": "V1_0",
    "LambdaArn": "arn:aws:lambda:ca-central-1:825738202952:function:securevault-cognito-email-sender"
  },
  "KMSKeyID": "arn:aws:kms:ca-central-1:825738202952:key/590ea24d-127f-423b-ae51-e54941c3c0f7"
}
```

---

### Step 2: Verify Lambda Environment Variables

**Navigation:** AWS Console → Lambda → Functions → securevault-cognito-email-sender → Configuration → Environment variables

**Check the following variables exist and match:**

| Variable Name | Expected Value |
|---------------|----------------|
| `USER_POOL_ID` | `ca-central-1_JY2OSgN3y` |
| `FROM_EMAIL` | `noreply@securevaultdocs.com` |
| `KMS_KEY_ARN` | `arn:aws:kms:ca-central-1:825738202952:key/590ea24d-127f-423b-ae51-e54941c3c0f7` |

- [ ] All three environment variables are present
- [ ] Values match exactly (no extra spaces or typos)
- [ ] KMS_KEY_ARN matches the one configured in Cognito

---

### Step 3: Verify Lambda IAM Role Permissions

**Navigation:** AWS Console → Lambda → Functions → securevault-cognito-email-sender → Configuration → Permissions

**Check the Execution Role has:**

- [ ] **AmazonSESFullAccess** policy attached (or equivalent SES send permissions)
- [ ] **Custom inline policy** for KMS decrypt named `cognito-kms-decrypt`

**Expected KMS Policy (inline policy):**
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "kms:Decrypt",
      "Resource": "arn:aws:kms:ca-central-1:825738202952:key/590ea24d-127f-423b-ae51-e54941c3c0f7"
    }
  ]
}
```

**Additional basic permissions should include:**
- [ ] CloudWatch Logs permissions (for logging)
- [ ] Basic Lambda execution role

---

### Step 4: Verify Lambda Trigger from Cognito

**Navigation:** AWS Console → Lambda → Functions → securevault-cognito-email-sender → Configuration → Triggers

**Check:**

- [ ] Trigger shows `Cognito user pool: User pool - ckhazo`
- [ ] Status is **Enabled**
- [ ] Principal service is `cognito-idp.amazonaws.com`

---

### Step 5: Verify Lambda Resource Policy

**Navigation:** AWS Console → Lambda → Functions → securevault-cognito-email-sender → Configuration → Permissions → Resource-based policy statements

**Check:**

- [ ] Policy statement exists allowing Cognito to invoke the function
- [ ] Principal is `cognito-idp.amazonaws.com`
- [ ] Source ARN references the correct User Pool

**Expected Policy Statement:**
```json
{
  "Sid": "CognitoInvoke",
  "Effect": "Allow",
  "Principal": {
    "Service": "cognito-idp.amazonaws.com"
  },
  "Action": "lambda:InvokeFunction",
  "Resource": "arn:aws:lambda:ca-central-1:825738202952:function:securevault-cognito-email-sender",
  "Condition": {
    "ArnLike": {
      "AWS:SourceArn": "arn:aws:cognito-idp:ca-central-1:825738202952:userpool/ca-central-1_JY2OSgN3y"
    }
  }
}
```

---

### Step 6: Verify KMS Key Policy

**Navigation:** AWS Console → KMS → Customer managed keys → securevault-cognito-email

**Check:**

- [ ] Key alias is `securevault-cognito-email`
- [ ] Key is **Enabled**
- [ ] Key policy allows `cognito-idp.amazonaws.com` to use the key

**Expected Key Policy (excerpt):**
```json
{
  "Sid": "Allow Cognito to encrypt codes",
  "Effect": "Allow",
  "Principal": {
    "Service": "cognito-idp.amazonaws.com"
  },
  "Action": [
    "kms:Encrypt",
    "kms:GenerateDataKey"
  ],
  "Resource": "*"
}
```

- [ ] Lambda execution role has `kms:Decrypt` permission (verified in Step 3)

---

### Step 7: Verify Lambda Dependencies

**Navigation:** AWS Console → Lambda → Functions → securevault-cognito-email-sender → Code

**Check package.json or deployment package includes:**

- [ ] `@aws-crypto/client-node` (for decrypting Cognito codes)
- [ ] `@aws-sdk/client-ses` (for sending emails)
- [ ] `@aws-sdk/client-kms` (for KMS operations)

---

### Step 8: Verify Cognito Email Configuration

**Navigation:** AWS Console → Amazon Cognito → User pools → User pool - ckhazo → Messaging → Email

**Check:**

- [ ] **Email provider:** Amazon SES (not Cognito default)
- [ ] **SES Region:** Canada (Central) / ca-central-1
- [ ] **FROM email address:** Configured (should reference securevaultdocs.com)
- [ ] **SES Configuration Set:** (Optional, may be blank)

---

### Step 9: Test Lambda Function (Optional Manual Test)

**Navigation:** AWS Console → Lambda → Functions → securevault-cognito-email-sender → Test

**Create test event with:**
```json
{
  "version": "1",
  "triggerSource": "CustomEmailSender_SignUp",
  "region": "ca-central-1",
  "userPoolId": "ca-central-1_JY2OSgN3y",
  "userName": "testuser",
  "callerContext": {
    "awsSdkVersion": "3.0.0",
    "clientId": "test-client-id"
  },
  "request": {
    "type": "customEmailSenderRequestV1",
    "code": "encrypted-test-code",
    "userAttributes": {
      "email": "test@example.com"
    }
  },
  "response": {}
}
```

**Expected Result:**
- [ ] Function executes without errors (may fail on decrypt since code is fake, but should reach that point)
- [ ] CloudWatch logs show function was invoked

---

### Step 10: Check CloudWatch Logs

**Navigation:** AWS Console → CloudWatch → Log groups → /aws/lambda/securevault-cognito-email-sender

**Check:**

- [ ] Log group exists
- [ ] Recent log streams present (if function has been invoked)
- [ ] No critical errors in recent logs
- [ ] Retention period is set (optional but recommended: 7-30 days)

---

## Connection Status Summary

Verified on 2025-12-21 using `node scripts/verify-ses-setup.js`:

| Component | Status | Notes |
|-----------|--------|-------|
| Cognito Lambda Trigger | ✅ | CustomEmailSender configured, ARN matches |
| Lambda Environment Vars | ✅ | USER_POOL_ID, FROM_EMAIL, KMS_KEY_ARN all set |
| Lambda IAM Permissions | ✅ | AmazonSESFullAccess + cognito-kms-decrypt |
| Lambda Resource Policy | ✅ | Cognito can invoke Lambda |
| KMS Key Configuration | ✅ | Key matches expected ARN |
| Lambda Dependencies | ✅ | @aws-crypto, @aws-sdk/client-ses, @aws-sdk/client-kms |
| Cognito SES Email Config | ✅ | Amazon SES in ca-central-1 |

**Legend:**
- ✅ Verified and correct
- ⚠️ Verified but needs adjustment
- ❌ Not configured or incorrect
- ⏳ Not yet checked

---

## Common Issues and Fixes

### Issue 1: Lambda not triggering
**Symptoms:** Cognito sends default emails instead of custom ones
**Check:**
- Lambda trigger is enabled in Cognito
- Resource policy allows Cognito to invoke Lambda
- KMS key ARN is configured in Cognito

**Fix:**
```bash
aws cognito-idp update-user-pool \
  --user-pool-id ca-central-1_JY2OSgN3y \
  --lambda-config "CustomEmailSender={LambdaVersion=V1_0,LambdaArn=arn:aws:lambda:ca-central-1:825738202952:function:securevault-cognito-email-sender},KMSKeyID=arn:aws:kms:ca-central-1:825738202952:key/590ea24d-127f-423b-ae51-e54941c3c0f7" \
  --region ca-central-1
```

### Issue 2: KMS Decryption Failure
**Symptoms:** Lambda logs show "KMS decrypt failed" or similar
**Check:**
- Lambda IAM role has `kms:Decrypt` permission
- KMS key ARN in Lambda env vars matches Cognito config
- KMS key policy allows Cognito to encrypt

### Issue 3: SES Send Failure
**Symptoms:** Lambda executes but email not sent
**Check:**
- FROM email domain is verified in SES
- Lambda has AmazonSESFullAccess or equivalent
- SES is out of sandbox OR recipient email is verified in sandbox
- AWS account has SES production access approved

### Issue 4: Wrong Environment Variables
**Symptoms:** Lambda throws configuration errors
**Fix:**
```bash
aws lambda update-function-configuration \
  --function-name securevault-cognito-email-sender \
  --environment "Variables={USER_POOL_ID=ca-central-1_JY2OSgN3y,FROM_EMAIL=noreply@securevaultdocs.com,KMS_KEY_ARN=arn:aws:kms:ca-central-1:825738202952:key/590ea24d-127f-423b-ae51-e54941c3c0f7}" \
  --region ca-central-1
```

---

## CLI Commands Reference

### View Cognito Lambda Config
```bash
aws cognito-idp describe-user-pool \
  --user-pool-id ca-central-1_JY2OSgN3y \
  --region ca-central-1 \
  --query "UserPool.LambdaConfig"
```

### View Lambda Configuration
```bash
aws lambda get-function-configuration \
  --function-name securevault-cognito-email-sender \
  --region ca-central-1
```

### View Lambda Policy
```bash
aws lambda get-policy \
  --function-name securevault-cognito-email-sender \
  --region ca-central-1
```

### View CloudWatch Logs
```bash
aws logs tail /aws/lambda/securevault-cognito-email-sender \
  --follow \
  --region ca-central-1
```

### Test Lambda Manually
```bash
aws lambda invoke \
  --function-name securevault-cognito-email-sender \
  --region ca-central-1 \
  --payload file://test-event.json \
  response.json
```

---

## Next Steps After Verification

Once all checkboxes are ✅:

1. **If AWS SES Production Access is approved:**
   - Test real signup flow with external email
   - Verify email delivery and branding
   - Check spam folder placement
   - Test forgot password flow

2. **If still in SES Sandbox:**
   - Test with verified email addresses only
   - Document which test emails are verified
   - Prepare for production testing after approval

3. **Document any issues found:**
   - Update this checklist with resolution notes
   - Create tickets for unresolved issues
   - Share findings with team

---

## Sign-off

**Verified by:** Claude Code (automated verification script)
**Date:** 2025-12-21
**Overall Status:** ✅ Verified
**Notes:**
- All Lambda-Cognito connections verified
- Test email sent successfully via SES sandbox (mario@ownitpro.com)
- Full email flow test passed: 8/8 tests successful
- Waiting on AWS SES production access approval to test with non-verified emails

