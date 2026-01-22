# SecureVault Docs - Technical Specification Sheet

**Version**: 1.0
**Last Updated**: November 19, 2025
**Status**: Development

---

## Product Overview

| Attribute | Value |
|-----------|-------|
| Product Name | SecureVault Docs |
| Product Type | Document Management & Client Collaboration Platform |
| Deployment | Cloud SaaS (Web Application) |
| Access Methods | Web Browser, PWA, Desktop Apps (planned) |
| Target Markets | B2B (SMB), B2C (Individuals) |

---

## Technology Stack

### Frontend

| Component | Technology | Version |
|-----------|------------|---------|
| Framework | Next.js | 16.x |
| UI Library | React | 18.3.1 |
| Language | TypeScript | 5.6 |
| Styling | Tailwind CSS | 3.4 |
| Icons | Lucide React | 0.553 |
| Validation | Zod | 4.1.12 |
| Class Utils | clsx | latest |

### Backend

| Component | Technology | Version |
|-----------|------------|---------|
| Runtime | Node.js | 20.11+ |
| API Framework | Next.js API Routes | 16.x |
| Database | PostgreSQL | 15+ |
| ORM | Prisma | 5.x |
| Cache | Redis | 7.x |
| Queue | AWS SQS | - |

### Cloud Infrastructure (AWS)

| Service | Purpose | Region |
|---------|---------|--------|
| S3 | Document storage | us-east-1 |
| CloudFront | CDN for downloads | Global |
| Textract | OCR processing | us-east-1 |
| SQS | Job queues | us-east-1 |
| SNS | Push notifications | us-east-1 |
| RDS | PostgreSQL hosting | us-east-1 |
| ElastiCache | Redis hosting | us-east-1 |

### Third-Party Services

| Service | Provider | Purpose |
|---------|----------|---------|
| Authentication | Auth.js | OAuth & Magic Links |
| Payments | Stripe | Subscriptions & billing |
| Email | SendGrid | Transactional email |
| Automation | n8n | Workflow orchestration |
| Monitoring | Sentry | Error tracking |
| Analytics | Mixpanel | Product analytics |

---

## System Requirements

### Client Requirements

| Platform | Minimum Requirements |
|----------|---------------------|
| **Desktop Browsers** | Chrome 90+, Firefox 88+, Safari 14+, Edge 90+ |
| **Mobile Browsers** | iOS Safari 14+, Chrome for Android 90+ |
| **Screen Resolution** | 320px minimum width (responsive) |
| **JavaScript** | Required (ES2020+) |
| **Cookies** | Required for authentication |
| **LocalStorage** | Required for preferences |

### Server Requirements

| Resource | Development | Production |
|----------|-------------|------------|
| **CPU** | 2 vCPU | 4+ vCPU |
| **Memory** | 4 GB | 16+ GB |
| **Storage** | 50 GB SSD | 500+ GB SSD |
| **Network** | 100 Mbps | 1+ Gbps |
| **Node.js** | 20.11+ | 20.11+ LTS |

---

## API Specifications

### API Overview

| Attribute | Value |
|-----------|-------|
| Protocol | HTTPS (TLS 1.3) |
| Format | JSON |
| Authentication | Bearer Token (JWT) |
| Rate Limiting | 100 req/min (standard), 1000 req/min (enterprise) |
| Versioning | URL path (`/api/v1/`) |

### Core Endpoints

#### Organizations

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/org/{orgId}` | Get organization details |
| PATCH | `/api/v1/org/{orgId}` | Update organization |
| GET | `/api/v1/org/{orgId}/members` | List team members |
| POST | `/api/v1/org/{orgId}/members` | Invite team member |
| DELETE | `/api/v1/org/{orgId}/members/{userId}` | Remove member |

#### Documents

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/org/{orgId}/documents` | List documents |
| POST | `/api/v1/org/{orgId}/documents` | Create document record |
| GET | `/api/v1/org/{orgId}/documents/{docId}` | Get document details |
| PATCH | `/api/v1/org/{orgId}/documents/{docId}` | Update document |
| DELETE | `/api/v1/org/{orgId}/documents/{docId}` | Delete document |
| POST | `/api/v1/org/{orgId}/upload/presign` | Get upload URL |
| GET | `/api/v1/org/{orgId}/documents/{docId}/download` | Get download URL |
| GET | `/api/v1/org/{orgId}/documents/{docId}/versions` | List versions |

#### Portals

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/org/{orgId}/portals` | List portals |
| POST | `/api/v1/org/{orgId}/portals` | Create portal |
| GET | `/api/v1/org/{orgId}/portals/{portalId}` | Get portal details |
| PATCH | `/api/v1/org/{orgId}/portals/{portalId}` | Update portal |
| POST | `/api/v1/org/{orgId}/portals/{portalId}/revoke` | Revoke portal |
| GET | `/api/v1/org/{orgId}/portals/{portalId}/requests` | List requests |
| POST | `/api/v1/org/{orgId}/portals/{portalId}/requests` | Add request |
| GET | `/api/v1/org/{orgId}/portals/{portalId}/submissions` | List submissions |

#### Guest Portal Access

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/portal/{portalId}/auth` | Authenticate with PIN |
| GET | `/api/v1/portal/{portalId}/requests` | Get document requests |
| POST | `/api/v1/portal/{portalId}/presign` | Get upload URL |
| POST | `/api/v1/portal/{portalId}/submit` | Submit documents |
| GET | `/api/v1/portal/{portalId}/status` | Get submission status |

#### Share Links

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/org/{orgId}/shares` | List share links |
| POST | `/api/v1/org/{orgId}/shares` | Create share link |
| DELETE | `/api/v1/org/{orgId}/shares/{shareId}` | Revoke share link |
| GET | `/api/v1/share/{token}` | Access shared document |
| POST | `/api/v1/share/{token}/auth` | Authenticate with PIN |

#### Billing

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/org/{orgId}/billing` | Get billing info |
| GET | `/api/v1/org/{orgId}/billing/usage` | Get current usage |
| POST | `/api/v1/org/{orgId}/billing/checkout` | Create checkout session |
| POST | `/api/v1/org/{orgId}/billing/portal` | Get billing portal URL |
| POST | `/api/v1/org/{orgId}/billing/addon` | Purchase add-on |
| GET | `/api/v1/org/{orgId}/billing/invoices` | List invoices |

### Response Formats

#### Success Response

```json
{
  "success": true,
  "data": { ... },
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 100
  }
}
```

#### Error Response

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid request parameters",
    "details": [
      {
        "field": "email",
        "message": "Invalid email format"
      }
    ]
  }
}
```

### Error Codes

| Code | HTTP Status | Description |
|------|-------------|-------------|
| `UNAUTHORIZED` | 401 | Missing or invalid authentication |
| `FORBIDDEN` | 403 | Insufficient permissions |
| `NOT_FOUND` | 404 | Resource not found |
| `VALIDATION_ERROR` | 400 | Invalid request parameters |
| `CONFLICT` | 409 | Resource already exists |
| `RATE_LIMITED` | 429 | Too many requests |
| `USAGE_EXCEEDED` | 402 | Usage limit exceeded |
| `INTERNAL_ERROR` | 500 | Server error |

---

## Data Specifications

### File Handling

| Attribute | Specification |
|-----------|---------------|
| Maximum file size | 500 MB |
| Chunk size (upload) | 5 MB |
| Supported formats | See table below |
| Filename max length | 255 characters |
| Path max length | 1024 characters |

### Supported File Types

| Category | Extensions | MIME Types |
|----------|------------|------------|
| Documents | .pdf, .doc, .docx | application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document |
| Spreadsheets | .xls, .xlsx, .csv | application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, text/csv |
| Presentations | .ppt, .pptx | application/vnd.ms-powerpoint, application/vnd.openxmlformats-officedocument.presentationml.presentation |
| Images | .jpg, .jpeg, .png, .gif, .webp, .tiff, .bmp | image/* |
| Text | .txt, .rtf, .md | text/plain, text/rtf, text/markdown |
| Archives | .zip | application/zip |

### OCR Specifications

| Attribute | Specification |
|-----------|---------------|
| Supported formats | PDF, JPEG, PNG, TIFF |
| Maximum pages per document | 100 |
| Maximum file size for OCR | 50 MB |
| Supported languages | English (MVP), Multi-language (future) |
| Processing time (typical) | 2-5 seconds per page |
| Accuracy target | 95%+ for printed text |

### Storage Specifications

| Attribute | Specification |
|-----------|---------------|
| Storage class | S3 Standard |
| Encryption | AES-256 (server-side) |
| Redundancy | 99.999999999% durability |
| Versioning | Enabled (configurable retention) |
| Lifecycle | 90-day transition to IA (configurable) |

---

## Security Specifications

### Authentication

| Method | Specification |
|--------|---------------|
| OAuth Providers | Google, Microsoft |
| Magic Links | Email-based, 15-minute expiry |
| Session Duration | 7 days (remember me), 24 hours (default) |
| Session Storage | HTTP-only secure cookies |
| Token Format | JWT with RS256 signing |
| MFA | TOTP (Google Authenticator compatible) |

### Authorization

| Model | Specification |
|-------|---------------|
| Type | Role-Based Access Control (RBAC) |
| Roles | Owner, Admin, Member |
| Scope | Organization-level |
| Permissions | See permission matrix below |

#### Permission Matrix

| Permission | Owner | Admin | Member |
|------------|-------|-------|--------|
| Manage billing | ✓ | ✗ | ✗ |
| Manage team | ✓ | ✓ | ✗ |
| Manage settings | ✓ | ✓ | ✗ |
| Create portals | ✓ | ✓ | ✓ |
| Upload documents | ✓ | ✓ | ✓ |
| Share documents | ✓ | ✓ | ✓ |
| Delete documents | ✓ | ✓ | Own only |
| View analytics | ✓ | ✓ | Limited |

### Encryption

| Layer | Method | Key Management |
|-------|--------|----------------|
| In Transit | TLS 1.3 | AWS ACM |
| At Rest (S3) | AES-256 | AWS KMS |
| At Rest (DB) | AES-256 | AWS RDS |
| PIN Hashing | bcrypt | 12 rounds |
| Token Signing | RS256 | Rotated quarterly |

### Share Link Security

| Feature | Specification |
|---------|---------------|
| Token format | 32-character cryptographic random |
| Expiration | Configurable (1 hour to 90 days) |
| PIN protection | Optional, bcrypt hashed |
| Access logging | All views and downloads logged |
| Revocation | Immediate, propagated globally |
| Watermarking | Dynamic overlay with viewer info |
| Copy protection | Optional text selection blocking |

---

## Performance Specifications

### Response Time Targets

| Operation | Target (p95) | Maximum |
|-----------|--------------|---------|
| Page load (initial) | < 2s | 5s |
| Page load (cached) | < 500ms | 2s |
| API response (read) | < 200ms | 1s |
| API response (write) | < 500ms | 2s |
| Search query | < 500ms | 2s |
| File upload (per chunk) | < 3s | 10s |
| Presigned URL generation | < 100ms | 500ms |

### Throughput Targets

| Metric | Target |
|--------|--------|
| Concurrent users | 10,000 |
| Requests per second | 5,000 |
| File uploads per minute | 1,000 |
| Search queries per second | 500 |

### Availability Targets

| Metric | Target |
|--------|--------|
| Uptime | 99.9% (8.76 hours downtime/year) |
| RPO (Recovery Point) | 1 hour |
| RTO (Recovery Time) | 4 hours |
| Planned maintenance | < 4 hours/month |

### Scalability

| Component | Scaling Method | Trigger |
|-----------|----------------|---------|
| Web servers | Horizontal (auto) | CPU > 70% |
| Database | Vertical + Read replicas | Connections > 80% |
| Cache | Cluster mode | Memory > 80% |
| Storage | Automatic (S3) | N/A |
| OCR processing | Queue-based | Queue depth > 100 |

---

## Integration Specifications

### Webhooks

| Event | Payload | Retry Policy |
|-------|---------|--------------|
| `document.uploaded` | Document metadata | 3 retries, exponential backoff |
| `document.ocr.completed` | Document ID, text length | 3 retries |
| `portal.submitted` | Portal ID, submission count | 3 retries |
| `portal.expired` | Portal ID | 3 retries |
| `share.accessed` | Share ID, accessor info | 3 retries |
| `usage.threshold` | Threshold level, current usage | 3 retries |

### n8n Workflows

| Workflow | Trigger | Actions |
|----------|---------|---------|
| Portal Invitation | Portal created | Send email via SendGrid |
| Submission Notification | Documents submitted | Notify org via email/Slack |
| OCR Processing | Document uploaded | Queue Textract job |
| Usage Alert | Threshold crossed | Send alert email |
| Share Expiry | Daily cron | Deactivate expired shares |
| Billing Sync | Stripe webhook | Update usage records |

### Drive Connectors

| Provider | Auth Method | Sync Modes |
|----------|-------------|------------|
| Google Drive | OAuth 2.0 | Import, Auto-sync |
| OneDrive | OAuth 2.0 | Import, Auto-sync |
| Dropbox | OAuth 2.0 | Import, Auto-sync |
| Box | OAuth 2.0 | Import, Auto-sync |

---

## Usage Limits & Quotas

### Plan Limits

| Resource | Free | Personal Pro | Starter | Professional | Enterprise |
|----------|------|--------------|---------|--------------|------------|
| Storage | 5 GB | 100 GB | 50 GB | 250 GB | 1 TB |
| OCR pages/mo | 50 | 500 | 500 | 2,500 | 10,000 |
| Egress/mo | 1 GB | 10 GB | 10 GB | 50 GB | 200 GB |
| Portals | 1 | 5 | 10 | 50 | Unlimited |
| Share links | 5 | Unlimited | Unlimited | Unlimited | Unlimited |
| Team members | 1 | 1 | 5 | 25 | 100 |
| File size max | 100 MB | 500 MB | 500 MB | 500 MB | 500 MB |
| API access | ✗ | ✗ | ✗ | ✓ | ✓ |
| SSO | ✗ | ✗ | ✗ | ✗ | ✓ |

### Rate Limits

| Endpoint Category | Limit | Window |
|-------------------|-------|--------|
| Authentication | 10 | 1 minute |
| API (standard) | 100 | 1 minute |
| API (enterprise) | 1,000 | 1 minute |
| File uploads | 50 | 1 minute |
| Search queries | 30 | 1 minute |
| Share link creation | 20 | 1 minute |

### Soft & Hard Stops

| Threshold | Action |
|-----------|--------|
| 70% | Info notification |
| 80% | Warning notification |
| 90% | Urgent notification |
| 95% | Critical notification |
| 100% | Soft stop (uploads blocked) |
| 103% | Hard stop (all writes blocked) |

---

## Compliance & Standards

### Security Standards

| Standard | Status | Notes |
|----------|--------|-------|
| SOC 2 Type II | Planned | Target Q3 2025 |
| ISO 27001 | Planned | Target Q4 2025 |
| OWASP Top 10 | Compliant | Regular scans |

### Privacy Regulations

| Regulation | Status | Features |
|------------|--------|----------|
| GDPR | Compliant | Data export, deletion, DPA |
| CCPA | Compliant | Privacy controls, opt-out |
| HIPAA | BAA Available | Enterprise only |

### Data Handling

| Aspect | Specification |
|--------|---------------|
| Data residency | US (default), EU (enterprise) |
| Data retention | Configurable (30-365 days after deletion) |
| Backup retention | 30 days |
| Audit log retention | 2 years |
| PII encryption | Field-level encryption for sensitive data |

---

## Monitoring & Observability

### Metrics

| Category | Metrics Tracked |
|----------|-----------------|
| Application | Request rate, error rate, latency |
| Infrastructure | CPU, memory, disk, network |
| Business | Signups, uploads, portal completions |
| Usage | Storage, OCR pages, egress |

### Alerting

| Severity | Response Time | Examples |
|----------|---------------|----------|
| Critical | 15 minutes | Service down, data breach |
| High | 1 hour | Error rate > 5%, latency > 5s |
| Medium | 4 hours | Error rate > 1%, disk > 80% |
| Low | 24 hours | Unusual traffic patterns |

### Logging

| Log Type | Retention | Storage |
|----------|-----------|---------|
| Application logs | 30 days | CloudWatch |
| Access logs | 90 days | CloudWatch |
| Audit logs | 2 years | S3 + Database |
| Error logs | 90 days | Sentry |

---

## Environment Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | Yes |
| `REDIS_URL` | Redis connection string | Yes |
| `AWS_ACCESS_KEY_ID` | AWS credentials | Yes |
| `AWS_SECRET_ACCESS_KEY` | AWS credentials | Yes |
| `AWS_REGION` | AWS region | Yes |
| `S3_BUCKET` | Document storage bucket | Yes |
| `STRIPE_SECRET_KEY` | Stripe API key | Yes |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook verification | Yes |
| `SENDGRID_API_KEY` | Email service API key | Yes |
| `NEXTAUTH_SECRET` | Session encryption key | Yes |
| `NEXTAUTH_URL` | Application base URL | Yes |
| `GOOGLE_CLIENT_ID` | Google OAuth | Yes |
| `GOOGLE_CLIENT_SECRET` | Google OAuth | Yes |
| `MICROSOFT_CLIENT_ID` | Microsoft OAuth | Yes |
| `MICROSOFT_CLIENT_SECRET` | Microsoft OAuth | Yes |

### Feature Flags

| Flag | Description | Default |
|------|-------------|---------|
| `ENABLE_DARK_MODE` | Dark theme support | true |
| `ENABLE_OCR` | OCR processing | true |
| `ENABLE_CONNECTORS` | Drive integrations | false |
| `ENABLE_API_ACCESS` | Public API | false |
| `ENABLE_DEMO_MODE` | Demo environment | false |
| `SHOW_USAGE_CAPS` | Display usage limits | true |

---

## Browser & Device Support

### Desktop Browsers

| Browser | Minimum Version | Notes |
|---------|-----------------|-------|
| Chrome | 90 | Recommended |
| Firefox | 88 | Full support |
| Safari | 14 | Full support |
| Edge | 90 | Full support |

### Mobile Browsers

| Browser | Minimum Version | Notes |
|---------|-----------------|-------|
| iOS Safari | 14 | PWA support |
| Chrome Android | 90 | PWA support |
| Samsung Internet | 14 | PWA support |

### Accessibility

| Standard | Level | Status |
|----------|-------|--------|
| WCAG | 2.1 AA | Target |
| Keyboard navigation | Full | Implemented |
| Screen reader | Full | Implemented |
| Color contrast | 4.5:1 | Implemented |

---

## Deployment Specifications

### Environments

| Environment | URL | Purpose |
|-------------|-----|---------|
| Development | localhost:3000 | Local development |
| Staging | staging.securevault.io | Pre-production testing |
| Production | app.securevault.io | Live application |

### Deployment Process

| Step | Tool | Trigger |
|------|------|---------|
| Build | Next.js | Git push |
| Test | Jest/Playwright | Automatic |
| Deploy (staging) | Vercel/AWS | PR merge to develop |
| Deploy (production) | Vercel/AWS | Release tag |

### Rollback

| Method | Time | Data Loss |
|--------|------|-----------|
| Instant rollback | < 1 minute | None |
| Database restore | 15-30 minutes | Up to 1 hour |
| Full recovery | 2-4 hours | Up to 24 hours |

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2025-11-19 | Initial specification |

---

*This specification sheet should be updated as the system evolves and new requirements are identified.*
