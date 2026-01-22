# SecureVault Docs - Navigation Guide

This document shows how to access all features in the application.

## Main Navigation (Top Bar)

The top navigation bar is available on all pages and provides access to main sections:

- **Dashboard** - `/dashboard` - Main overview
- **Documents** - `/documents` - Document management
- **Portals** - `/portals` - Portal management (⭐ Primary feature hub)
- **Settings** - `/settings` - Account and organization settings

## Portal Features (All Accessible from `/portals`)

### Quick Access Cards (On Main Portals Page)

When you visit `/portals`, you'll see three prominent quick action cards at the top:

1. **📊 Analytics Dashboard**
   - **Path:** `/portals/analytics`
   - **Access:** Click the blue "Analytics" card
   - **Features:**
     - Total portals, uploads, completion rates
     - Uploads over time chart
     - Top document types chart
     - Portal performance table
     - Date range filtering (7d, 30d, 90d, all)
     - CSV export

2. **📤 Bulk Create Portals**
   - **Path:** `/portals/bulk-create`
   - **Access:** Click the green "Bulk Create" card
   - **Features:**
     - Download CSV template
     - Upload CSV file
     - Batch portal creation
     - Real-time progress tracking
     - Error reporting per row
     - Success statistics

3. **🛡️ Audit Logs**
   - **Path:** `/portals/audit-logs`
   - **Access:** Click the purple "Audit Logs" card
   - **Features:**
     - View all security events
     - Filter by action type and resource
     - Search functionality
     - Date range selector
     - Export to CSV
     - Statistics dashboard

### Portal List and Management

**Portal Actions (From `/portals` list):**
- **Create New Portal** - Click "New Portal" button → `/portals/new`
- **View Portal Details** - Click on any portal card → `/portals/[portalId]`
- **Portal Settings** - Click "Settings" on a portal OR visit `/portals/[portalId]/settings`

### Individual Portal Pages

**Portal Settings Page** (`/portals/[portalId]/settings`):
- Edit client information (name, email, description)
- Change PIN
- Set/update expiration date
- View and manage requests
- Delete individual requests
- **🔽 Download All Documents** - Click "Download All" button (creates ZIP file)
- **🗑️ Delete Portal** - Click "Delete Portal" button

## Complete Feature Map

### Core Portal Features
```
/portals
├── Main Portal List
│   ├── Quick Action Cards (Analytics, Bulk Create, Audit Logs)
│   ├── Portal Statistics
│   └── Portal Cards
│
├── /new - Create New Portal
│
├── /analytics - Analytics Dashboard ✨ NEW
│   ├── Metrics Overview
│   ├── Charts & Visualizations
│   └── Export Data
│
├── /bulk-create - Bulk Portal Creation ✨ NEW
│   ├── Download Template
│   ├── Upload CSV
│   └── Track Progress
│
├── /audit-logs - Security Audit Logs ✨ NEW
│   ├── Event List
│   ├── Filters & Search
│   └── Export Logs
│
└── /[portalId] - Individual Portal
    ├── Overview
    ├── Documents
    ├── Requests
    └── /settings - Portal Settings
        ├── Edit Information
        ├── Manage Requests
        ├── Download All Documents ✨ NEW
        └── Delete Portal
```

### Client Portal Access

**Public Portal URL:** `/portal/[portalId]`
- PIN authentication
- View requests
- Upload documents (request-based)
- Upload general files
- View uploaded files
- File preview ✨ NEW
- Upload progress tracking ✨ NEW
- Success animations ✨ NEW

## UI Components & Features

### Recently Added Features (All Accessible)

1. **File Preview** - Available when viewing uploaded documents
   - Supports images, PDFs, videos, audio
   - Modal overlay with download option

2. **Upload Progress** - Shows during file uploads
   - Real-time progress bar
   - Status indicators
   - Cancel/retry options

3. **Success Animations** - Displays after successful uploads
   - Animated checkmark
   - Confetti effects
   - Auto-dismisses

4. **Loading Skeletons** - Shows while data is loading
   - Portal lists
   - Detail views
   - Tables

5. **Download All Documents** - On portal settings page
   - Creates ZIP archive
   - Organized by folders
   - One-click download

## How to Navigate

### For Administrators

1. **Start at Dashboard** → Click "Portals" in top nav
2. **From Portals Page:**
   - Create single portal: Click "New Portal"
   - Create multiple portals: Click "Bulk Create" card
   - View analytics: Click "Analytics" card
   - View audit logs: Click "Audit Logs" card
   - Manage existing portal: Click on portal card → Click "Settings"

### For Clients

1. **Receive email** with portal URL and PIN
2. **Visit portal URL** → `/portal/[portalId]`
3. **Enter PIN** to authenticate
4. **Upload documents** via requests or general upload
5. **View progress** and uploaded files

## Navigation Best Practices

1. **Quick Access:** Use the portal list page quick action cards for common tasks
2. **Portal Management:** Each portal has a dedicated settings page accessible from the portal detail view
3. **Bulk Operations:** Use bulk create for multiple portals, analytics for insights, audit logs for security
4. **Return Navigation:** All pages have "Back to portals" links to return to the main list

## Feature Availability Matrix

| Feature | Admin Access | Client Access | Location |
|---------|-------------|---------------|----------|
| Portal List | ✅ | ❌ | /portals |
| Create Portal | ✅ | ❌ | /portals/new |
| Bulk Create | ✅ | ❌ | /portals/bulk-create |
| Analytics | ✅ | ❌ | /portals/analytics |
| Audit Logs | ✅ | ❌ | /portals/audit-logs |
| Portal Settings | ✅ | ❌ | /portals/[id]/settings |
| Download All | ✅ | ❌ | Settings page button |
| Upload Documents | ✅ | ✅ | /portal/[id] |
| File Preview | ✅ | ✅ | Click on file |
| Upload Progress | ✅ | ✅ | During upload |

## Keyboard Shortcuts (Future Enhancement)

Currently, all navigation is click-based. Keyboard shortcuts could be added:
- `Ctrl/Cmd + K` - Quick command palette
- `N` - New portal (when on portals page)
- `A` - Analytics
- `L` - Audit logs

---

**Last Updated:** 2025-12-07
**Version:** 1.0

All features are fully accessible and functional. No hidden or orphaned pages exist.
