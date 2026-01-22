# SecureVault Current Setup

**Last Updated:** 2025-12-23
**Status:** Production Ready (SES sandbox mode pending approval)
**Version:** 1.3.0

This is the single source of truth for the current SecureVault project configuration.

---

## Tech Stack Overview

| Component | Technology | Region |
|-----------|------------|--------|
| Database | Aurora PostgreSQL | ca-central-1 |
| Authentication | AWS Cognito + NextAuth.js | ca-central-1 |
| Email | AWS SES (SMTP + Lambda) | ca-central-1 |
| Storage | AWS S3 with KMS | ca-central-1 |
| ORM | Prisma (multi-schema) | - |
| Framework | Next.js 14 | - |

---

## Recent Features (v1.1.0 - v1.3.0)

### Direct S3 Uploads (v1.1.0)
- Large file uploads up to 5GB directly to S3
- Browser-to-S3 with presigned PUT URLs
- Real-time upload progress tracking
- Automatic fallback to proxy for failures
- Files > 10MB use direct upload automatically

### Office Document Preview (v1.0.0 - v1.2.0)
- **Word**: Server-side DOCX parsing with mammoth.js
- **Excel**: Spreadsheet rendering with xlsx library
- **PowerPoint**: Slide text extraction with JSZip (v1.2.0)
- Styled HTML preview in iframes
- Thumbnail previews in document cards

### Bulk Document Operations (v1.3.0)
- Multi-select documents with checkboxes
- Bulk move to any folder
- Bulk delete with confirmation
- Parallel API operations for performance

### S3 CORS Configuration
- Required for direct browser uploads
- Documentation: `docs/S3-CORS-SETUP.md`

---

## 1. Database

### Aurora PostgreSQL
- **Cluster:** securevault-database.cluster-xxx.ca-central-1.rds.amazonaws.com
- **Port:** 5432
- **Database:** securevault
- **Schemas:** core, hub, securevault

### Prisma Configuration
Multi-schema support with explicit schema references:
- `core.User`, `core.Organization`
- `hub.ManagedDocument`
- `securevault.Portal`, `securevault.EmailTemplate`

---

## 2. Authentication

### AWS Cognito
- **User Pool ID:** ca-central-1_JY2OSgN3y
- **User Pool Name:** User pool - ckhazo
- **App Client:** Configured for NextAuth.js

### NextAuth.js Integration
- Provider: Cognito
- Session strategy: JWT
- Callbacks configured for user/org metadata

---

## 3. Email

### AWS SES
- **Domain:** securevaultdocs.com (DKIM verified)
- **From Address:** noreply@securevaultdocs.com
- **Production Status:** Pending approval (sandbox mode)

### Email Types

**Auth Emails (Lambda-triggered):**
- Signup verification
- Forgot password
- Resend code
- Admin create user

**App Emails (SMTP-triggered):**
- Portal invitations
- Document notifications
- Request reminders
- Expiration alerts

### Lambda Function
- **Name:** securevault-cognito-email-sender
- **Runtime:** Node.js 20.x
- **KMS Key:** securevault-cognito-email

### Email Templates
12 templates stored in Aurora DB (`securevault.EmailTemplate` table):
- portal_created
- document_uploaded
- request_completed
- client_upload_notification
- welcome_email
- password_reset
- password_changed
- request_created
- upload_confirmation
- portal_expiring
- request_reminder
- expiration_reminder

---

## 4. Storage

### AWS S3
- **Bucket:** securevault-documents
- **Region:** ca-central-1
- **Encryption:** AWS KMS (customer managed key)
- **CORS:** Configured for direct browser uploads (see `docs/S3-CORS-SETUP.md`)

### Upload Flow (Small Files < 10MB)
1. Client sends file to proxy endpoint
2. Server uploads to S3
3. Metadata stored in Aurora

### Upload Flow (Large Files > 10MB) - NEW
1. Client requests presigned PUT URL from `/api/upload/presign-direct`
2. Client uploads directly to S3 with progress tracking
3. Client calls `/api/upload/complete` to create document record
4. Automatic fallback to proxy on failure

### Supported Previews
| Type | Library | Formats |
|------|---------|---------|
| Word | mammoth.js | .doc, .docx |
| Excel | xlsx | .xls, .xlsx, .csv |
| PowerPoint | JSZip | .ppt, .pptx |
| PDF | Native iframe | .pdf |
| Images | Native img tag | .jpg, .png, .gif, .webp |
| Video | Native video tag | .mp4, .webm, .mov |
| Audio | Native audio tag | .mp3, .wav, .ogg |

---

## 5. Environment Variables

### Required Variables

```bash
# Database (Aurora PostgreSQL)
DATABASE_URL=postgresql://user:pass@securevault-database.cluster-xxx.ca-central-1.rds.amazonaws.com:5432/securevault

# Authentication (Cognito)
COGNITO_CLIENT_ID=your-client-id
COGNITO_CLIENT_SECRET=your-client-secret
COGNITO_ISSUER=https://cognito-idp.ca-central-1.amazonaws.com/ca-central-1_JY2OSgN3y
NEXTAUTH_URL=https://your-domain.com
NEXTAUTH_SECRET=your-nextauth-secret

# Email (SES)
EMAIL_PROVIDER=ses
EMAIL_FROM=noreply@securevaultdocs.com
AWS_ACCESS_KEY_ID=your-aws-key
AWS_SECRET_ACCESS_KEY=your-aws-secret
AWS_REGION=ca-central-1

# Storage (S3)
S3_BUCKET=securevault-documents
S3_REGION=ca-central-1

# Application
NEXT_PUBLIC_APP_URL=https://securevaultdocs.com
```

---

## 6. Key AWS Resources

| Resource | Name/ID | Console Path |
|----------|---------|--------------|
| Cognito User Pool | ca-central-1_JY2OSgN3y | Cognito > User pools |
| Lambda Function | securevault-cognito-email-sender | Lambda > Functions |
| KMS Key | securevault-cognito-email | KMS > Customer managed keys |
| S3 Bucket | securevault-documents | S3 > Buckets |
| RDS Cluster | securevault-database | RDS > Databases |
| SES Domain | securevaultdocs.com | SES > Identities |

---

## 7. Test Scripts

```bash
# Verify SES/Lambda setup
node scripts/verify-ses-setup.js

# Check email templates in DB
node scripts/check-email-templates.js

# SES sandbox testing
node scripts/ses-sandbox-test.js status
node scripts/ses-sandbox-test.js list
node scripts/ses-sandbox-test.js verify your@email.com
node scripts/ses-sandbox-test.js send your@email.com

# Full email flow tests
node scripts/test-email-flows.js --type template
node scripts/test-email-flows.js --type app --email your@email.com
```

---

## 8. Current Status

| Component | Status |
|-----------|--------|
| Aurora PostgreSQL | Active |
| Cognito Auth | Active |
| SES Domain | Verified |
| SES Production Access | Pending AWS Approval |
| Lambda-Cognito | Connected & Verified |
| Email Templates | 12 templates in DB |
| S3 Storage | Active |
| KMS Encryption | Active |

---

## 9. Related Documentation

| Document | Description |
|----------|-------------|
| [CHANGELOG.md](CHANGELOG.md) | Version history and recent changes |
| [docs/S3-CORS-SETUP.md](docs/S3-CORS-SETUP.md) | S3 CORS configuration for direct uploads |
| [SecureVault_AWS_Migration_Handoff.md](SecureVault_AWS_Migration_Handoff.md) | Full AWS migration guide |
| [ses-implementation-summary.md](ses-implementation-summary.md) | SES implementation details |
| [lambda-cognito-verification-checklist.md](lambda-cognito-verification-checklist.md) | Lambda verification steps |
| [docs/testing/ses-email-testing-guide.md](docs/testing/ses-email-testing-guide.md) | Email testing procedures |
| [LOCAL_DEV_DATABASE.md](LOCAL_DEV_DATABASE.md) | Local development database setup |

---

## 10. NOT Used (Legacy/Removed)

The following technologies are **NOT** used in this project:
- Supabase (database or auth)
- Local PostgreSQL (production uses Aurora)
- Demo/mock mode
- Auth bypass flags

If you encounter documentation referencing these, it is outdated.
