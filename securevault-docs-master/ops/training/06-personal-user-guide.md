# Personal User Guide

## How to Use Personal Vault

This guide covers all features available to Personal users.

## Overview

**Location:** `/demo/personal`

**Key Components:**
- Welcome strip with plan info
- KPI tiles (My Vault, Shares, Uploads, OCR pages)
- Quick actions (Upload, New Share, Install App)
- Recent activity feed
- Metrics grid

## Vault

**Location:** `/demo/personal/vault`

**Organization:**
- **Folders**: ID, Taxes, Bills, Insurance, Health, Receipts
- **Monthly subfolders**: Optional (e.g., 2025/January)
- **Labels**: Drive search and automation (ID, Bills, Receipts, Tax, Medical, etc.)

**Features:**
- Upload files (drag & drop or file picker)
- Apply labels
- Move to folders
- Search with filters
- View document details
- Delete files

**Best Practices:**
- Use consistent folder structure
- Apply labels immediately after upload
- Use monthly subfolders for receipts/bills

## Upload

**Location:** `/demo/personal/upload`

**Process:**
1. Click "Upload" or drag files
2. Select files from device
3. Files automatically processed (OCR mocked in test)
4. Apply labels and organize

**Supported Formats:**
- PDF
- Images (JPG, PNG)
- Documents (DOCX, etc.)

## Shares

**Location:** `/demo/personal/shares`

**Creating a Share:**
1. Go to Shares
2. Click "New Share"
3. Select document(s)
4. Set PIN (optional)
5. Set expiry date (optional)
6. Generate link
7. Copy and share

**Management:**
- View all active shares
- Revoke shares
- View access history
- Delete expired shares

**Security:**
- Watermark viewer
- PIN protection
- Expiry enforcement
- Copy-block option

## Analytics

**Location:** `/demo/personal/analytics`

**Charts:**
- Uploads per month
- Top labels used
- Storage usage
- OCR pages processed

**Simple Metrics:**
- Uploads (7d, 30d)
- OCR pages (7d, 30d)
- Share links created
- Storage used

## Billing

**Location:** `/demo/personal/billing`

**Information Displayed:**
- Current plan (Starter/Growth/Pro)
- Usage bars (storage, OCR pages, share links)
- Alert thresholds (70/80/90/95%)
- Upgrade button

**Plans:**
- **Starter**: Basic features, limited storage
- **Growth**: More storage, advanced features
- **Pro**: Maximum storage, all features

**Note:** Mock values in test mode; no real charges.

## Settings

**Location:** `/demo/personal/settings`

### Profile
- Full name
- Email
- Timezone

### Security
- Two-factor authentication (mock)
- Login alerts
- Session timeout
- Email notifications

### Integrations
- Email-to-Vault address (unique per user)
- Google Drive (mock)
- OneDrive (mock)
- Dropbox (mock)
- Box (mock)

### Limits & Alerts
- Storage cap (MB)
- OCR pages per month
- Share links limit
- Alert thresholds

### Install App
- PWA instructions
- Desktop installer links

### Marketplace
- Browse and install templates
- View installed templates
- Link to marketplace

## Best Practices

1. **Organization**
   - Use consistent folder structure
   - Apply labels immediately
   - Use monthly subfolders for time-based docs

2. **Sharing**
   - Always use PIN for sensitive documents
   - Set expiry dates
   - Monitor access history

3. **Email-to-Vault**
   - Use unique address for receipts
   - Forward bills and invoices
   - Files auto-labeled (mocked in test)

4. **Billing**
   - Monitor usage bars
   - Upgrade before hitting limits
   - Understand plan features

