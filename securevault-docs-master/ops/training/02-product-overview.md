# Product Overview

## What SecureVault Docs Does

SecureVault Docs is a document management platform with OCR, secure sharing, and client collaboration features. It serves both **Business** and **Personal** use cases.

## Core Features

### Capture

* **Upload from device**: Chunked upload with progress bar, AV scan (mocked in test mode)
* **Email-to-Vault**: Unique email address per user/org; attachments land in vault
* **Drive connectors**: Google Drive, OneDrive, Dropbox, Box (mock picker in test)
* **Future**: API uploads, mobile apps (PWA only for now)

### Organize

* **Labels**: Quick tags (ID, Bills, Receipts, Tax, etc.) for search and automation
* **Folders**: Hierarchical organization (e.g., Taxes/2025/January)
* **Versions**: Document versioning with history
* **Search**: Full-text search with filters (owner, date, type, label)
* **OCR**: Automatic text extraction from PDFs and images (mocked in test)

### Share

* **Secure links**: PIN-protected share links with expiry dates
* **Watermark viewer**: Documents displayed with watermark; copy-block option
* **Revoke**: Share links can be revoked at any time
* **Activity tracking**: All share access recorded in audit logs

### Client Portals (Business Only)

* **Create portal**: Dedicated space for each client
* **Invite client**: Email invitation with secure token login
* **Request documents**: Send document requests with templates
* **Client upload**: Clients upload directly into their portal

### Caps & Alerts

* **Usage bars**: Visual indicators in Billing page
* **Alert thresholds**: 70% → 80% → 90% → 95% → hard stop at 100%
* **Grace period**: Small grace to 103% in enforcement (mocked in test UI)
* **Upgrade path**: Clear upgrade buttons when approaching limits

### Install

* **PWA**: Progressive Web App (Add to Home Screen)
* **Desktop**: Windows/Mac/Linux installers
* **No mobile binaries**: iOS/Android apps not available (PWA only)

## Business vs Personal

**Business:**
- Team collaboration (admins, members)
- Client portals and requests
- Advanced analytics
- Connector integrations
- Per-seat pricing

**Personal:**
- Individual vault
- Personal document organization
- Simple sharing
- Basic analytics
- Per-plan pricing

## Test Mode Safety

All features work in **mock/stub mode**:
- No real Stripe charges
- No AWS S3 writes
- No real email sends
- OCR/AV scans are simulated
- Connectors show "Connected" state but don't sync real data

Use `/demo/business` and `/demo/personal` routes for testing.

