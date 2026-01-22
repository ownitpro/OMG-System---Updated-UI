# Marketplace Guide

## Overview

The Marketplace allows users to install ready-made vault structures, request templates, and workflows. Available at `/marketplace`.

## Features

### Dry Run

**Purpose:** Simulate installing a template without making changes.

**Process:**
1. Browse templates in marketplace
2. Click "Dry Run" on a template
3. Preview what would be installed
4. Review folders, labels, quick actions, etc.
5. No actual changes are made

**Use Cases:**
- Preview template structure
- Check for conflicts
- Understand what will be installed

### Install to Business

**Purpose:** Apply template structure to Business org.

**Process:**
1. Browse templates
2. Click "Preview" to see details
3. Click "Install to Business"
4. Redirects to `/demo/business/templates?template=...`
5. Template appears in Templates page
6. Folders, labels, and quick actions are applied

**What Gets Installed:**
- Folder structures
- Labels
- Quick actions
- Request templates
- Share link templates
- Analytics dashboards
- Intake links
- Checklists

### Install to Personal

**Purpose:** Apply template structure to Personal vault.

**Process:**
1. Browse templates
2. Click "Preview" to see details
3. Click "Install to Personal"
4. Redirects to `/demo/personal/templates?template=...`
5. Template appears in Templates page
6. Folders, labels, and quick actions are applied

**What Gets Installed:**
- Folder structures (e.g., IDs, Bills, Receipts, Tax, month-by-month)
- Labels
- Quick actions
- Checklists

## Available Templates

### Personal – Life Admin

**Includes:**
- Folders: IDs, Bills, Receipts, Tax, 2025/January-December
- Labels: Important, Tax Document, Bill, Receipt, ID, Medical
- Quick Actions: Upload Bill, Scan Receipt, Add Tax Document, Organize by Month
- Checklists: Monthly reminders, receipt organization, tax prep

### Business – Essentials

**Includes:**
- Folders: Requests, Share Links, Analytics
- Request Templates: KYC Document Request, Year-end Package, Invoice Request
- Share Link Templates: Client Portal Share, Document Share, Secure Link
- Analytics: Upload Activity, Client Engagement, Document Processing Stats
- Quick Actions: Create Request, Generate Share Link, View Analytics

### Accounting – Starter Vault

**Includes:**
- Folders: Clients, Tax Returns, Financial Statements, Receipts, Invoices, Bank Statements, Payroll
- Labels: Client labels, Tax Year labels, Status labels
- Intake Links: Client Onboarding, Tax Document Intake, Receipt Upload Portal, Invoice Submission
- Quick Actions: Add New Client, Create Tax Return Folder, Generate Intake Link, Label Documents
- Checklists: Client folder setup, intake link configuration, tax year folders

## Accessing Marketplace

**From Marketing:**
- Header link: "Marketplace"
- Homepage hero: "Browse Marketplace" button

**From Business Demo:**
- Settings → Marketplace section
- Templates page → "Browse Marketplace" button

**From Personal Demo:**
- Settings → Marketplace section
- Templates page → "Browse Marketplace" button

## Managing Installed Templates

**Business:**
- Go to `/demo/business/templates`
- View all installed templates
- See template content (folders, labels, actions)
- Install more templates

**Personal:**
- Go to `/demo/personal/templates`
- View all installed templates
- See template content
- Install more templates

## Best Practices

1. **Always Preview First**
   - Use "Preview" or "Dry Run" before installing
   - Understand what will be created
   - Check for conflicts

2. **Start with Dry Run**
   - Test template structure
   - Verify it meets your needs
   - Then install for real

3. **Review Installed Templates**
   - Check Templates page regularly
   - Understand what was installed
   - Customize as needed

4. **Test Mode Safety**
   - All installs are in-memory only
   - No real database writes
   - Safe to test multiple templates

