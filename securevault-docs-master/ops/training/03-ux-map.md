# UX Map

## Top-Level Routes

### Marketing Routes

* `/` - Homepage
* `/features` - Features page
* `/pricing` - Pricing plans
* `/docs` - Documentation
* `/community` - Community page
* `/support` - Support page
* `/contact-sales` - Contact Sales form
* `/demo` - Try Demo hub
* `/marketplace` - Template marketplace

### Auth Routes

* `/login` - Login page (Email/Google/Microsoft)
* `/signup` - Signup page (optional Beta checkbox)

### Business App Routes

* `/demo/business/overview` - Overview dashboard
* `/demo/business/documents` - Documents management
* `/demo/business/portals` - Client portals
* `/demo/business/requests` - Document requests
* `/demo/business/shares` - Share links
* `/demo/business/analytics` - Analytics dashboard
* `/demo/business/billing` - Billing and usage
* `/demo/business/templates` - Installed templates
* `/demo/business/settings` - Organization settings

### Personal App Routes

* `/demo/personal` - Personal overview
* `/demo/personal/vault` - Personal vault
* `/demo/personal/upload` - Upload page
* `/demo/personal/shares` - Share links
* `/demo/personal/analytics` - Analytics
* `/demo/personal/billing` - Billing
* `/demo/personal/templates` - Installed templates
* `/demo/personal/settings` - Personal settings

## Header Rules

### Marketing Header

Shows on marketing pages (homepage, pricing, features, etc.):
- **Left**: SecureVault Docs logo (links to homepage)
- **Right**: Try Demo, Pricing, Marketplace, Docs, Contact Sales, Login, Get Started Free

### In-App Header

Shows in Business/Personal apps:
- **Left**: SVD logo (click → Overview)
- **Right**: Navigation links (Overview, Documents, Portals, etc.) + org/account menu

### Demo Header

Shows in demo pages:
- **Left**: SecureVault Docs logo (links to homepage)
- **Right**: Demo-specific navigation (Overview, Vault, Upload, Shares, etc.)

## Navigation Patterns

**Business Demo:**
- Overview → Documents → Client Portals → Requests → Shares → Analytics → Billing → Templates → Settings

**Personal Demo:**
- Overview → Vault → Upload → Shares → Analytics → Billing → Templates → Settings

## Page Layouts

All app pages use:
- Sticky header with navigation
- Main content area (max-width container)
- Footer (Powered by OMGsystems)

Demo pages use mock data and don't require authentication.

