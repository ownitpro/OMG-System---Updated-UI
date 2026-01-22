# Product Requirements Document (PRD)

## SecureVault Docs

**Version**: 1.0
**Last Updated**: November 19, 2025
**Status**: Development

---

## Executive Summary

SecureVault Docs is a modern document management and client collaboration platform that enables secure document intake, organization, and sharing for both businesses and individuals. The platform addresses the critical pain points of scattered documents, insecure sharing, lack of audit trails, and inefficient client document collection workflows.

**Core Value Proposition**: _"Capture Once. Organize Forever."_ - Secure, simple document workflows for Business and Personal use.

---

## Problem Statement

### Business Users

- **Email Chasing**: Spending hours requesting and tracking client documents via email
- **Security Risks**: Sensitive documents shared through insecure channels
- **No Audit Trails**: Compliance concerns due to lack of document access tracking
- **Bill Shock**: Unexpected charges from cloud storage and processing services
- **Client Confusion**: Complex tools that frustrate clients during document submission

### Personal Users

- **Document Scatter**: Files spread across emails, drives, devices, and physical locations
- **Search Difficulty**: Unable to find documents when needed (tax season, emergencies)
- **Sharing Challenges**: No secure way to share sensitive documents with professionals
- **Organization Burden**: Manual effort to organize and maintain document collections

---

## Target Users

### Primary: Business ICP

**Profile**:

- Small-to-mid firms (5-100 seats)
- Industries: Accounting, Real Estate, Construction, Project Management, Legal

**Jobs to Be Done**:

- Collect documents from clients efficiently
- Request specific documents with clear templates
- Maintain version control and audit trails
- Share documents securely with expiration controls
- Monitor usage costs in real-time

**Key Personas**:

- **Org Owner/Admin**: Manages team, billing, client portals, and integrations
- **Team Member**: Uploads, organizes, shares, and fulfills document requests

### Secondary: Personal ICP

**Profile**:

- Busy professionals and families
- Individual document management needs

**Use Cases**:

- Tax preparation document collection
- Immigration paperwork organization
- Vehicle and home records management
- Receipt storage and retrieval
- Secure sharing with accountants and attorneys

---

## Product Goals

### Business Goals

1. Reduce document collection time by 70%
2. Eliminate insecure document sharing practices
3. Provide complete audit trails for compliance
4. Enable predictable, transparent billing
5. Achieve 90%+ client completion rates on document requests

### User Goals

1. Single source of truth for all documents
2. Find any document in under 30 seconds
3. Share documents securely with one click
4. Complete document requests without confusion
5. Clear visibility into storage usage and costs

### Technical Goals

1. 99.9% uptime availability
2. Sub-second search response times
3. Support files up to 500MB
4. OCR processing within 60 seconds
5. Zero-downtime deployments

---

## Features & Requirements

### Core Feature Set

#### 1. Document Capture

| Requirement      | Priority | Description                                                           |
| ---------------- | -------- | --------------------------------------------------------------------- |
| Device Upload    | P0       | Chunked upload with progress indication, supporting files up to 500MB |
| Email-to-Vault   | P1       | Unique email address per user/org for forwarding documents            |
| Drive Connectors | P2       | Integration with Google Drive, OneDrive, Dropbox, Box                 |
| Drag & Drop      | P0       | Intuitive drag-and-drop interface for multiple files                  |
| Mobile Camera    | P1       | Direct capture from device camera (PWA)                               |

#### 2. Document Organization

| Requirement          | Priority | Description                                          |
| -------------------- | -------- | ---------------------------------------------------- |
| Labels/Tags          | P0       | Customizable labels (ID, Bills, Receipts, Tax, etc.) |
| Hierarchical Folders | P0       | Nested folder structure with drag-and-drop           |
| Full-Text Search     | P0       | Search within document content and metadata          |
| Version History      | P1       | Track all document versions with rollback capability |
| Auto-OCR             | P1       | Automatic text extraction for searchability          |
| Smart Filters        | P1       | Filter by date, type, label, size, OCR status        |

#### 3. Secure Sharing

| Requirement    | Priority | Description                                         |
| -------------- | -------- | --------------------------------------------------- |
| Share Links    | P0       | Generate secure, expiring links for document access |
| PIN Protection | P0       | Optional PIN requirement for sensitive documents    |
| Watermarking   | P1       | Overlay watermarks on viewed documents              |
| Copy Block     | P1       | Prevent text selection and copying                  |
| Revocation     | P0       | Immediately revoke access to shared documents       |
| Access Logs    | P0       | Track all views, downloads, and access attempts     |

#### 4. Client Portals (Business Only)

| Requirement              | Priority | Description                                                 |
| ------------------------ | -------- | ----------------------------------------------------------- |
| Portal Creation          | P0       | Create dedicated spaces for each client                     |
| Email Invitations        | P0       | Send secure token-based access invitations                  |
| Document Requests        | P0       | Define required and optional documents                      |
| Request Templates        | P1       | Industry-specific templates (Accounting, Real Estate, etc.) |
| Progress Tracking        | P0       | Visual status of submitted vs. pending documents            |
| Guest Upload             | P0       | Clients upload without creating accounts                    |
| Submission Notifications | P0       | Notify org when documents are submitted                     |

#### 5. Usage & Billing

| Requirement      | Priority | Description                                          |
| ---------------- | -------- | ---------------------------------------------------- |
| Real-Time Meters | P0       | Live display of OCR pages, storage, and egress usage |
| Alert Thresholds | P0       | Notifications at 70%, 80%, 90%, 95%, 100%, 103%      |
| Add-On Purchases | P0       | One-click purchase of additional capacity            |
| Usage History    | P1       | Historical usage charts and reports                  |
| Cost Projection  | P2       | Predict end-of-month costs based on current usage    |

#### 6. Access & Installation

| Requirement    | Priority | Description                               |
| -------------- | -------- | ----------------------------------------- |
| PWA Support    | P0       | Add to Home Screen on mobile and desktop  |
| Desktop Apps   | P2       | Native installers for Windows, Mac, Linux |
| Offline Access | P2       | View recently accessed documents offline  |

---

## User Flows

### Flow 1: Business User Creates Client Portal

```
1. Navigate to Portals section
2. Click "Create New Portal"
3. Enter client name and email
4. (Optional) Set PIN for added security
5. (Optional) Set expiration date
6. Add document requests (use template or custom)
7. Review and create portal
8. System sends invitation email to client
9. Track client progress on portal dashboard
```

### Flow 2: Client Submits Documents

```
1. Receive invitation email
2. Click secure link to access portal
3. Enter PIN (if required)
4. View requested documents list
5. Upload documents for each request
6. See real-time progress indicator
7. Submit completed portal
8. Receive confirmation
```

### Flow 3: Personal User Organizes Tax Documents

```
1. Create "2025 Tax Prep" folder
2. Upload W-2s, 1099s, receipts via drag-and-drop
3. System auto-OCRs documents for searchability
4. Apply "Tax" label to all documents
5. Search for specific deduction receipts
6. Generate share link for accountant
7. Set 30-day expiration and PIN
8. Monitor accountant's access via logs
```

### Flow 4: User Monitors Usage

```
1. View dashboard usage meters
2. Receive toast notification at 80% threshold
3. Review usage breakdown by category
4. Purchase storage add-on if needed
5. Set custom alert thresholds
6. Download usage report for records
```

---

## Technical Architecture

### Technology Stack

| Layer      | Technology               | Purpose                              |
| ---------- | ------------------------ | ------------------------------------ |
| Frontend   | Next.js 16, React 18.3.1 | App framework with server components |
| Language   | TypeScript 5.6 (strict)  | Type-safe development                |
| Styling    | Tailwind CSS 3.4         | Utility-first CSS with dark mode     |
| Validation | Zod 4.1.12               | Runtime schema validation            |
| Icons      | Lucide React 0.553       | Consistent iconography               |
| Runtime    | Node.js 20.11+           | Server environment                   |

### External Services

| Service       | Provider     | Purpose                              |
| ------------- | ------------ | ------------------------------------ |
| Database      | PostgreSQL   | Primary data storage                 |
| File Storage  | AWS S3       | Document storage with presigned URLs |
| OCR           | AWS Textract | Text extraction from documents       |
| Billing       | Stripe       | Subscription and payment processing  |
| Email         | SendGrid     | Transactional email delivery         |
| Automation    | n8n          | Workflow orchestration               |
| Notifications | AWS SNS      | Push notifications                   |

### API Architecture

RESTful API with the following route structure:

```
/api/org/[orgId]/
├── portals/ (CRUD)
├── shares/ (CRUD)
├── requests/ (CRUD)
├── upload/presign/ (POST)
├── ocr/preview/ (POST)
└── overview/ (GET)

/api/portal/[portalId]/
├── requests/ (GET)
├── submissions/ (CRUD)
├── presign/ (POST)
└── submit/ (POST)

/api/personal/
├── portals/ (CRUD)
├── upload/presign/ (POST)
└── documents/ (CRUD)

/api/billing/
└── checkout/ (POST)
```

---

## Data Models

### Core Entities

```typescript
// Organization
interface Org {
  id: string;
  name: string;
  plan: "starter" | "professional" | "enterprise";
  seats: number;
  createdAt: string;
}

// User
interface User {
  id: string;
  orgId?: string;
  email: string;
  role: "owner" | "admin" | "member";
  createdAt: string;
}

// Document
interface Document {
  id: string;
  orgId?: string;
  personalId?: string;
  fileName: string;
  fileKey: string;
  bytes: number;
  mimeType: string;
  labels: string[];
  folderId?: string;
  ocrStatus: "pending" | "processing" | "done" | "failed";
  ocrText?: string;
  versions: DocumentVersion[];
  createdAt: string;
  updatedAt: string;
}

// Portal
interface Portal {
  id: string;
  orgId?: string;
  personalId?: string;
  externalName: string;
  email?: string;
  pinHash?: string;
  expiresAt?: string;
  status: "active" | "paused" | "closed";
  createdAt: string;
}

// Portal Request
interface PortalRequest {
  id: string;
  portalId: string;
  label: string;
  required: boolean;
  notes?: string;
  createdAt: string;
}

// Portal Submission
interface PortalSubmission {
  id: string;
  portalId: string;
  requestId?: string;
  fileKey: string;
  fileName: string;
  bytes: number;
  ocrStatus: "pending" | "done" | "failed";
  createdAt: string;
}

// Share Link
interface ShareLink {
  id: string;
  documentId: string;
  token: string;
  pinHash?: string;
  expiresAt: string;
  watermark: boolean;
  copyBlock: boolean;
  views: number;
  createdAt: string;
}
```

---

## Pricing Structure

### Business Plans

| Feature         | Starter  | Professional | Enterprise   |
| --------------- | -------- | ------------ | ------------ |
| Seats           | 1-5      | 6-25         | 26-100       |
| Storage         | 50 GB    | 250 GB       | 1 TB         |
| OCR Pages       | 500/mo   | 2,500/mo     | 10,000/mo    |
| Egress          | 10 GB/mo | 50 GB/mo     | 200 GB/mo    |
| Client Portals  | 10       | 50           | Unlimited    |
| Templates       | Basic    | All          | All + Custom |
| Support         | Email    | Priority     | Dedicated    |
| Price (Monthly) | $29/mo   | $79/mo       | $199/mo      |
| Price (Yearly)  | $290/yr  | $790/yr      | $1,990/yr    |

### Personal Plans

| Feature     | Free  | Pro             |
| ----------- | ----- | --------------- |
| Storage     | 5 GB  | 100 GB          |
| OCR Pages   | 50/mo | 500/mo          |
| Share Links | 5     | Unlimited       |
| Price       | $0    | $9/mo or $90/yr |

### Add-Ons

| Add-On          | Price |
| --------------- | ----- |
| OCR Pages (500) | $10   |
| Storage (50 GB) | $5/mo |
| Egress (25 GB)  | $5    |

---

## Security & Compliance

### Security Requirements

| Requirement           | Implementation                              |
| --------------------- | ------------------------------------------- |
| Encryption at Rest    | AES-256 for all stored documents            |
| Encryption in Transit | TLS 1.3 for all connections                 |
| Authentication        | OAuth 2.0 (Google, Microsoft) + Magic Links |
| Authorization         | Role-based access control (RBAC)            |
| Session Management    | Secure, HTTP-only cookies with rotation     |
| PIN Protection        | bcrypt hashing with salt                    |
| Audit Logging         | Immutable logs for all document access      |

### Compliance

- SOC 2 Type II (planned)
- GDPR data subject rights
- CCPA consumer rights
- HIPAA BAA available (Enterprise)

---

## Performance Requirements

| Metric          | Target  | Measurement                |
| --------------- | ------- | -------------------------- |
| Page Load       | < 2s    | Core Web Vitals LCP        |
| Search Response | < 500ms | API response time          |
| Upload Speed    | 10 MB/s | Chunked upload throughput  |
| OCR Processing  | < 60s   | Time to searchable text    |
| Availability    | 99.9%   | Monthly uptime percentage  |
| Error Rate      | < 0.1%  | Failed requests percentage |

---

## Analytics & Metrics

### Product Metrics

| Metric                 | Description                            | Target   |
| ---------------------- | -------------------------------------- | -------- |
| Portal Completion Rate | % of portals with all docs submitted   | > 90%    |
| Time to First Document | Hours from signup to first upload      | < 1 hour |
| Search Usage           | Searches per user per week             | > 5      |
| Share Link Usage       | Share links created per user per month | > 3      |
| DAU/MAU                | Daily to monthly active ratio          | > 30%    |

### Business Metrics

| Metric           | Description                        | Target |
| ---------------- | ---------------------------------- | ------ |
| Trial Conversion | % of trials converting to paid     | > 15%  |
| Monthly Churn    | % of customers canceling           | < 5%   |
| NPS              | Net Promoter Score                 | > 50   |
| ARPU             | Average revenue per user           | > $50  |
| CAC Payback      | Months to recover acquisition cost | < 6    |

---

## Launch Phases

### Phase 1: Foundation (Current)

- [x] Next.js application structure
- [x] Core UI components
- [x] Mock database layer
- [x] Client portal system
- [x] Demo mode (Business + Personal)
- [x] Pricing page
- [x] PWA support

### Phase 2: Authentication & Database

- [ ] Real authentication (Google, Microsoft, Magic Links)
- [ ] PostgreSQL database setup
- [ ] User and organization management
- [ ] Session handling
- [ ] Password reset flow

### Phase 3: Storage & Processing

- [ ] AWS S3 integration
- [ ] Presigned URL generation
- [ ] Chunked file uploads
- [ ] AWS Textract OCR integration
- [ ] File type validation
- [ ] Virus scanning

### Phase 4: Billing & Payments

- [ ] Stripe subscription integration
- [ ] Usage metering and tracking
- [ ] Threshold alerts
- [ ] Add-on purchases
- [ ] Invoice generation

### Phase 5: Advanced Features

- [ ] Drive connectors (Google, OneDrive, Dropbox)
- [ ] Email-to-Vault
- [ ] Advanced search filters
- [ ] Bulk operations
- [ ] API access for integrations

### Phase 6: Scale & Optimize

- [ ] Performance optimization
- [ ] Advanced analytics
- [ ] White-label options
- [ ] Enterprise SSO
- [ ] Custom integrations

---

## Success Criteria

### MVP Success (Phase 1-3)

- 100 beta users onboarded
- 1,000 documents uploaded
- 50 client portals created
- < 5 critical bugs
- 80% positive feedback score

### Growth Success (Phase 4-5)

- 1,000 paying customers
- $50K MRR
- < 5% monthly churn
- NPS > 40
- 95% uptime

### Scale Success (Phase 6+)

- 10,000 paying customers
- $500K MRR
- Enterprise customers > 10%
- SOC 2 certification
- 99.9% uptime

---

## Risks & Mitigations

| Risk                      | Impact | Probability | Mitigation                                |
| ------------------------- | ------ | ----------- | ----------------------------------------- |
| Security breach           | High   | Low         | Encryption, audits, penetration testing   |
| AWS cost overrun          | Medium | Medium      | Usage caps, alerts, efficient processing  |
| Low portal completion     | High   | Medium      | UX optimization, reminder emails, support |
| Stripe integration issues | Medium | Low         | Thorough testing, sandbox environment     |
| OCR accuracy problems     | Medium | Medium      | Quality thresholds, manual review option  |
| Competitive pressure      | Medium | High        | Differentiation on UX, pricing, support   |

---

## Open Questions

1. **Authentication Priority**: Google OAuth first or Magic Links first?
2. **Database Choice**: Managed PostgreSQL (RDS) vs. Supabase?
3. **File Size Limits**: 500MB sufficient or need larger for video?
4. **OCR Languages**: English-only MVP or multi-language?
5. **Mobile Apps**: PWA-only or native apps in roadmap?
6. **Enterprise Features**: SSO and audit logs in Phase 5 or earlier?

---

## Appendix

### A. Competitive Landscape

| Competitor   | Strengths               | Weaknesses            | Our Differentiation         |
| ------------ | ----------------------- | --------------------- | --------------------------- |
| Dropbox      | Brand recognition, sync | Complex, expensive    | Simpler, purpose-built      |
| Google Drive | Ecosystem, free tier    | No client portals     | Client collaboration        |
| DocuSign     | eSign workflow          | Document-focused only | Broader document management |
| Box          | Enterprise features     | Expensive, complex    | SMB-friendly pricing        |
| FileRequest  | Request workflow        | Limited features      | Full platform solution      |

### B. n8n Workflow Inventory

20+ production-ready workflows including:

- Email invitation sending
- Submission notifications
- OCR processing triggers
- Usage threshold alerts
- Billing event handling
- Drive sync operations
- Webhook integrations

### C. Documentation Index

- [README.md](README.md) - Quick start guide
- [SETUP.md](SETUP.md) - Development setup
- [API_ROUTES_SUMMARY.md](API_ROUTES_SUMMARY.md) - API documentation
- [ENGINEERING_NOTES_PORTAL_PACK.md](ENGINEERING_NOTES_PORTAL_PACK.md) - Portal architecture
- [ops/training/](ops/training/) - Training modules (16 documents)
- [ops/marketing/](ops/marketing/) - Marketing assets (17 documents)
- [ops/n8n/](ops/n8n/) - Workflow definitions

---

## Document History

| Version | Date       | Author      | Changes              |
| ------- | ---------- | ----------- | -------------------- |
| 1.0     | 2025-11-19 | Claude Code | Initial PRD creation |

---

_This PRD is a living document and should be updated as requirements evolve and new information becomes available._
