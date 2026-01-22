# Roles & Access

## Overview

SecureVault Docs uses role-based access control. Each role has specific permissions and responsibilities.

## Business Roles

### Org Owner / Admin

**Permissions:**
- Manage plan, billing, and upgrades
- Invite and manage team members
- Configure connectors (QBO, Drive suites, Email-to-Vault, eSign, Slack/Teams)
- Create and manage client portals
- Send document requests
- Create and manage share links
- View analytics and audit logs
- Access organization settings

**Key Pages:**
- Settings → Organization (name, logo, region)
- Settings → Team & Roles (invite members)
- Settings → Connectors
- Client Portals
- Requests
- Billing

### Member

**Permissions:**
- Upload documents (as allowed by admin)
- Apply labels and organize files
- Create share links (if permitted)
- Complete requests assigned to them
- View documents and analytics (org-scoped)

**Key Pages:**
- Documents
- Shares
- Analytics

## Personal User

**Permissions:**
- Manage personal vault (folders, labels)
- Upload and organize documents
- Create share links with PIN/expiry
- Install PWA/Desktop app
- Configure Email-to-Vault address
- View personal analytics
- Manage billing (upgrade/downgrade)

**Key Pages:**
- Vault
- Shares
- Analytics
- Billing
- Settings

## Support Role

**Permissions:**
- View audit logs (shared table)
- Assist with account recovery
- Resend invites
- Troubleshoot share links and portals
- Explain billing caps and limits

**Key Tools:**
- Audit view (filter by user/action)
- Account recovery flows
- Invite re-send functionality

## Sales Role

**Permissions:**
- Run demos from Try Demo page
- Route leads to Contact Sales form
- Access demo orgs (`/demo/business`, `/demo/personal`)

**Key Tools:**
- Demo scripts (see `13-demo-scripts.md`)
- Contact Sales form
- Demo orgs with seeded data

## Access Rules

* Admin pages are under **Settings** in org scope
* Personal users have simplified settings (no team management)
* Support can view audit but cannot modify org settings
* Demo orgs are public (no login required) for testing

