# Page Map (Routes)

## Marketing Pages

### Homepage
**Route:** `/`

**Sections:**
- Hero (H1, subcopy, CTAs)
- Sub-pillars (Client Portals, Secure Sharing, OCR & Search, Cost Guardrails)
- Social proof row (logos/testimonials placeholder)
- Pricing teaser (Starter/Growth/Pro + Enterprise link)
- Footer

**CTAs:**
- Primary: Get started free
- Secondary: Try the demo

### Pricing
**Route:** `/pricing`

**Sections:**
- Toggle: Business / Personal
- Toggle: Monthly / Annual (10% off)
- Plan cards (Starter, Growth, Pro, Enterprise)
- Usage meters note
- Secondary CTAs (Contact Sales, See FAQs)

**Note:** Do not mention AWS caps on this page

### Features
**Route:** `/features`

**Sections:**
- Uploads & Portals
- Sharing & Watermarks
- OCR & Labels
- Search & Versions
- Meters & Alerts
- Integrations

**Each section:**
- Headline
- Description
- 1-click demo deep link

### Try a Live Demo
**Route:** `/demo`

**Sections:**
- Tabs: Interactive Walkthrough | Business Demo | Personal Demo
- Demo content
- Form (gated in production, ungated in test)

**CTAs:**
- Get started free (after demo)
- Contact Sales

### Contact Sales
**Route:** `/sales` or `/contact-sales`

**Sections:**
- H1: "Talk to a human who can actually help"
- Bullets (3)
- Form fields:
  - Full name
  - Email
  - Company
  - Phone (optional)
  - Use case
  - Plan interest
  - Region
  - "What problem are you solving today?" (multi-select)

### Support
**Route:** `/support`

**Sections:**
- H1: "Get help fast"
- Subcopy
- Grid: Docs & Guides | Community | Contact Support
- Ticket form
- Footer note

### Community
**Route:** `/community`

**Sections:**
- H1: "Learn faster together"
- Subcopy
- Sections: Where to join | What to share | Code of conduct | Get involved
- Link to Marketplace

### Docs
**Route:** `/docs`

**Sections:**
- Quick starts
- API documentation (future)
- Guides
- Examples

## Legal Pages

### Privacy Policy
**Route:** `/privacy`

**Content:** Full privacy policy
**Footer:** Links from all pages

### Terms of Use
**Route:** `/terms`

**Content:** Full terms of use
**Footer:** Links from all pages

## Demo Pages

### Business Demo
**Route:** `/demo/business`

**Sections:**
- Overview
- Documents
- Client Portals
- Requests
- Shares
- Analytics
- Billing
- Templates
- Settings

### Personal Demo
**Route:** `/demo/personal`

**Sections:**
- Overview
- Vault
- Upload
- Shares
- Analytics
- Billing
- Templates
- Settings

## App Pages (Post-Login)

### Business App
**Routes:**
- `/app/business/overview`
- `/app/business/documents`
- `/app/business/portals`
- `/app/business/requests`
- `/app/business/shares`
- `/app/business/analytics`
- `/app/business/billing`
- `/app/business/templates`
- `/app/business/settings`

### Personal App
**Routes:**
- `/app/personal`
- `/app/personal/vault`
- `/app/personal/upload`
- `/app/personal/shares`
- `/app/personal/analytics`
- `/app/personal/billing`
- `/app/personal/templates`
- `/app/personal/settings`

## Auth Pages

### Login
**Route:** `/login`

**Options:**
- Email/password
- Google OAuth
- Microsoft OAuth
- Optional Beta checkbox (staging only)

### Signup
**Route:** `/signup`

**Options:**
- Email/password
- Google OAuth
- Microsoft OAuth
- Optional Beta checkbox (staging only)

## Marketplace

### Marketplace
**Route:** `/marketplace`

**Sections:**
- Template cards
- Preview modal
- Install actions (Dry Run, Install to Business, Install to Personal)

## Page Status

### Live
- [x] Homepage
- [x] Pricing
- [x] Features
- [x] Demo
- [x] Contact Sales
- [x] Support
- [x] Community
- [x] Privacy
- [x] Terms
- [x] Marketplace

### In Progress
- [ ] Docs (quick starts ready, API future)

### Planned
- [ ] Blog
- [ ] Case Studies page
- [ ] Press page

## Navigation Structure

### Marketing Header
- Logo (links to `/`)
- Try Demo
- Pricing
- Marketplace
- Docs
- Contact Sales
- Login
- Get Started Free

### In-App Header
- Logo (links to overview)
- Navigation links (context-specific)
- User menu

### Footer
- Product links
- Company links
- Resources links
- Legal links
- Social links
- "Powered by OMGsystems — © 2025"

## Deep Links

### Feature → Demo
- `/features#portals` → `/demo?tab=business&feature=portals`
- `/features#sharing` → `/demo?tab=business&feature=sharing`
- `/features#ocr` → `/demo?tab=business&feature=ocr`

### Pricing → Checkout
- `/pricing?plan=starter&cycle=monthly` → `/checkout?plan=starter&cycle=monthly`
- `/pricing?plan=growth&cycle=annual` → `/checkout?plan=growth&cycle=annual`

### Demo → Signup
- `/demo?source=demo` → `/signup?source=demo`

## Notes

- Keep this file updated as we ship
- Marketing owns the words; PM owns accuracy
- All routes should be tested before launch
- Deep links should be documented and tested

