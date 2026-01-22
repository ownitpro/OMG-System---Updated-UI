# Business Admin Guide

## How to Run an Organization

This guide covers all features available to Business admins.

## Overview Page

**Location:** `/demo/business/overview`

**Key Components:**

### KPI Strip
- Workspace usage (documents, storage)
- Client portals count
- Open requests
- Approvals pending

### Quick Actions
- Upload
- New Share
- Request Files
- Install App
- Try OCR Review
- Create Client Portal
- Send Request for Docs
- Connect QBO

### Getting Started Checklist
- Brand firm logo
- Enable object lock (info)
- Create intake link
- Enable receipt OCR
- Invite bookkeepers

### Recent Activity
- Uploads
- Labels applied
- Shares created
- Requests sent

## Documents

**Location:** `/demo/business/documents`

**Features:**
- **Upload files**: Chunked upload with progress bar
- **AV scan**: Mocked in test mode; shows status changes
- **OCR**: Automatic text extraction (mocked in test)
- **Labels**: Apply tags for organization
- **Folders**: Hierarchical structure
- **Versioning**: Document history
- **Search**: Full-text search with filters (owner/date/type/label)

## Client Portals

**Location:** `/demo/business/portals`

**Workflow:**
1. Click "Create Portal"
2. Enter portal name, client name, and email
3. Send invite (mock email in test)
4. Client receives secure token login
5. Client uploads directly into their portal

**Management:**
- View all portals
- Resend invites
- View portal activity
- Archive/delete portals

## Requests

**Location:** `/demo/business/requests`

**Creating a Request:**
1. Click "New Request"
2. Choose template (Business templates or marketplace imports)
3. Select target portal
4. Set due date
5. Add instruction text
6. Send request

**Templates:**
- KYC Document Request
- Year-end Package Request
- Invoice Request Template
- Custom templates from marketplace

## Shares

**Location:** `/demo/business/shares`

**Creating a Share:**
1. Click "New Share"
2. Select document(s)
3. Set PIN (optional but recommended)
4. Set expiry date (optional)
5. Generate link
6. Copy and share

**Management:**
- View all active shares
- Revoke shares
- View access history
- Delete expired shares

**Security:**
- Watermark viewer
- Copy-block option
- PIN protection
- Expiry enforcement

## Analytics

**Location:** `/demo/business/analytics`

**Charts:**
- Uploads per day
- OCR pages processed
- Egress GB (mock data)
- Trends and totals

**Filters:**
- Date range
- User/team member
- Document type
- Label

## Billing

**Location:** `/demo/business/billing`

**Information Displayed:**
- Current plan (Starter/Growth/Pro)
- Seat count
- Usage bars (storage, OCR pages, etc.)
- Alert thresholds (70/80/90/95%)
- Upgrade button (routes to checkout)

**Note:** Caps shown as bars only; no AWS pricing displayed. Mock values in test mode.

## Settings

**Location:** `/demo/business/settings`

### Organization
- Name
- Logo URL
- Region

### Team & Roles
- Invite members by email
- Assign roles (Admin/Member)
- Remove members
- View member activity

### Connectors
- **QBO** (QuickBooks Online): Mock connect/disconnect
- **Drive suites** (Google Drive, OneDrive, Dropbox, Box): Mock picker
- **Email-to-Vault**: Unique address per org
- **eSign handoff**: Mock integration
- **Slack/Teams**: Mock channel selection

### Install App
- PWA instructions
- Desktop installer links (Windows/Mac/Linux)

### API Keys
- Future feature (not available in test)

### Marketplace
- Browse and install templates
- View installed templates
- Link to marketplace

## Best Practices

1. **Organization Setup**
   - Set logo and region immediately
   - Use consistent naming conventions

2. **Team Management**
   - Invite members with clear roles
   - Review member activity regularly

3. **Client Portals**
   - Create portals before sending requests
   - Use descriptive portal names

4. **Requests**
   - Use templates for common requests
   - Set realistic due dates
   - Include clear instructions

5. **Shares**
   - Always use PIN for sensitive documents
   - Set expiry dates
   - Monitor access history

6. **Billing**
   - Monitor usage bars regularly
   - Upgrade before hitting limits
   - Understand alert thresholds

