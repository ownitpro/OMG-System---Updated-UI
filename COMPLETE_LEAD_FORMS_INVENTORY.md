# COMPLETE LEAD FORMS INVENTORY FOR N8N WEBHOOK INTEGRATION

**Date:** January 16, 2026
**Author:** AI Assistant
**Purpose:** Documenting ALL lead forms for n8n workflow automation

---

## TABLE OF CONTENTS

1. [Apps Waiting List Form](#1-apps-waiting-list-form)
2. [Contact Form (Main)](#2-contact-form-main)
3. [Solutions Lead Form](#3-solutions-lead-form)
4. [Marketing/Services Lead Form](#4-marketingservices-lead-form)
5. [Industries Lead Form](#5-industries-lead-form)
6. [AI Agents Form](#6-ai-agents-form-todo)
7. [Content Engine Form](#7-content-engine-form-todo)
8. [Custom Apps Form](#8-custom-apps-form-todo)
9. [Smart Automations Form](#9-smart-automations-form-todo)
10. [Webhook Integration Guide](#webhook-integration-guide)
11. [N8N Workflow Structure](#n8n-workflow-structure)

---

## 1. APPS WAITING LIST FORM

**Location:** `/apps` page (scroll to `#waiting-list-form`)
**File:** `src/app/apps/page.tsx` (WaitingListForm component, line 129)
**Current Submission:** Console log only (simulated)
**Source Tag:** `apps-waiting-list`

### BASE FIELDS (Always Present)

```typescript
{
  fullName: string,        // Required, text input
  email: string,           // Required, email input
  company: string,         // Required, text input
  phone: string,           // Optional, tel input
  currentChallenges: string, // Required, textarea (4 rows)
  interestedApps: string[]   // Required, min 1 checkbox
}
```

### CHECKBOX FIELD: "Which apps are you interested in?"

**Checkbox Options** (multi-select, min 1 required):
- ✅ `crm` - "OMG-CRM"
- ✅ `leads` - "OMG-Leads"
- ✅ `ai-mastery` - "OMG AI Mastery"
- ✅ `omg-iq` - "OMG IQ"

### CONDITIONAL FIELDS (Dynamic - Appear Based on Checkboxes)

#### IF `crm` IS CHECKED:
```typescript
{
  crmSystem: string  // Required dropdown
}
```
**Question:** "Which industry template fits your business?"
**Options:**
- `real-estate` - "Real Estate"
- `property-management` - "Property Management"
- `accounting` - "Accounting & Tax"
- `contractors` - "Contractors"
- `consulting` - "Consulting"
- `creative-agency` - "Creative Agency"
- `other` - "Other"

---

#### IF `leads` IS CHECKED:
```typescript
{
  leadVolume: string  // Required dropdown
}
```
**Question:** "Target Monthly Lead Volume"
**Options:**
- `small` - "Under 50 leads / month"
- `medium` - "50 - 200 leads / month"
- `large` - "200 - 500 leads / month"
- `enterprise` - "500+ leads / month"

---

#### IF `ai-mastery` IS CHECKED:
```typescript
{
  aiGoal: string  // Required dropdown
}
```
**Question:** "Primary AI Education Goal"
**Options:**
- `individual` - "Personal Productivity (Solopreneur)"
- `team` - "Team Scaling (Agency/Business)"
- `build` - "Building Custom AI Tools"

---

#### IF `omg-iq` IS CHECKED:
```typescript
{
  industryFocus: string  // Required dropdown
}
```
**Question:** "Primary Focus Industry"
**Options:**
- `real-estate` - "Real Estate"
- `accounting` - "Accounting"
- `property-management` - "Property Management"
- `contractors` - "Contractors / Home Services"
- `other` - "Other"

---

### COMPLETE FORM DATA STRUCTURE (When All Checked)

```typescript
{
  // Base fields
  fullName: "John Doe",
  email: "john@company.com",
  company: "Company Inc.",
  phone: "+1 (555) 123-4567",
  currentChallenges: "Our main challenge is...",

  // Checkbox selections
  interestedApps: ["crm", "leads", "ai-mastery", "omg-iq"],

  // Conditional fields (only present if checkboxes checked)
  crmSystem: "real-estate",
  leadVolume: "medium",
  aiGoal: "team",
  industryFocus: "contractors",

  // Metadata
  source: "apps-waiting-list",
  timestamp: "2026-01-16T10:30:00Z"
}
```

### WEBHOOK ENDPOINT TO ADD

```typescript
// In handleSubmit function (line 161), replace:
console.log('Waiting list submission:', formData);

// With:
await fetch('ZAPIER_OR_N8N_WEBHOOK_URL', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    ...formData,
    source: 'apps-waiting-list',
    timestamp: new Date().toISOString()
  })
});
```

---

## 2. CONTACT FORM (MAIN)

**Location:** `/contact` page
**File:** `src/app/contact/page.tsx` (ContactForm component, line 463)
**Current Submission:** `/api/contact` endpoint
**Source Tag:** `contact-page`

### BASE FIELDS (Always Present)

```typescript
{
  name: string,           // Required, text input (autocomplete: name)
  email: string,          // Required, email input (autocomplete: email)
  company: string,        // Optional, text input (autocomplete: organization)
  phone: string,          // Optional, tel input (autocomplete: tel)
  industry: string,       // Required, dropdown with "Other" modal option
  budget: string,         // Required, dropdown with "Flexible" modal option
  timeline_start: Date,   // Required, date picker (hidden field)
  timeline_end: Date,     // Required, date picker (hidden field)
  timeline: string,       // Required, formatted date range string
  problem: string,        // Required, textarea (4 rows)
  casl_consent: boolean   // Required, checkbox
}
```

### SPECIAL FIELDS WITH MODALS

#### INDUSTRY FIELD (Dropdown + "Other" Modal)
**Standard Options:**
- "Real Estate"
- "Property Management"
- "Accounting / Tax"
- "Contractors / Trades"
- "Cleaning Services"
- "Healthcare"
- "Consulting"
- "Creative Agency"
- "E-commerce / Retail"
- "Technology / SaaS"
- **"Other"** ← Triggers modal for custom input

**If "Other" selected:**
- Modal opens with text input
- User enters custom industry
- On confirm, custom value stored in `industry` field

---

#### BUDGET FIELD (Dropdown + "Flexible" Modal)
**Standard Options:**
- "Under $5,000"
- "$5,000 - $15,000"
- "$15,000 - $30,000"
- "$30,000 - $50,000"
- "$50,000+"
- **"Flexible"** ← Triggers modal for custom amount

**If "Flexible" selected:**
- Modal opens with numeric input (supports $ formatting and commas)
- User enters custom budget amount
- On confirm, custom value stored in `budget` field

---

#### TIMELINE FIELD (Custom Date Range Picker)
**Interactive Calendar Component:**
- Click input → Opens calendar dropdown
- Select start date → Prompts for end date
- Calendar navigation: Previous/Next month buttons
- "Today" button - Selects current date
- "Clear" button - Resets selection

**Hidden Fields Generated:**
- `timeline_start` - ISO date string
- `timeline_end` - ISO date string
- `timeline` - Formatted string: "Jan 15, 2026 - Feb 28, 2026"

---

### COMPLETE FORM DATA STRUCTURE

```typescript
{
  // Contact info
  name: "John Doe",
  email: "john@company.com",
  company: "Company Inc.",
  phone: "+1 (555) 123-4567",

  // Project details
  industry: "Real Estate", // or custom value if "Other" was selected
  budget: "$15,000 - $30,000", // or custom value if "Flexible" was selected

  // Timeline
  timeline_start: "2026-01-15",
  timeline_end: "2026-02-28",
  timeline: "Jan 15, 2026 - Feb 28, 2026",

  // Problem description
  problem: "We need help automating our lead follow-up process...",

  // Legal consent
  casl_consent: true,

  // Metadata
  source: "contact-page",
  timestamp: "2026-01-16T10:30:00Z"
}
```

### WEBHOOK ENDPOINT TO ADD

```typescript
// Add to onSubmit function (line 684), after successful API call:
await fetch('ZAPIER_OR_N8N_WEBHOOK_URL', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    ...data,
    source: 'contact-page',
    timestamp: new Date().toISOString()
  })
});
```

---

## 3. SOLUTIONS LEAD FORM

**Location:** Multiple solution pages
**Files:** Configurable component used across:
- `/solutions` page
- `/solutions/timeguard-ai`
- `/solutions/automations`
- `/solutions/custom-apps`
- `/solutions/strategy-session`
- `/solutions/custom-solutions`
- `/solutions/analytics`
- `/solutions/ai-agents`
- `/solutions/content-engine`

**Component:** `src/components/forms/SolutionsLeadForm.tsx` (if it exists) OR embedded in pages
**Current Submission:** Console log only (simulated)
**Source Tag:** `solutions-lead`

### BASE FIELDS (Always Present)

```typescript
{
  fullName: string,    // Required, text input
  email: string,       // Required, email input
  company: string,     // Required, text input
  phone: string,       // Optional, tel input
  solutions: string[], // Required, min 1 checkbox
  message: string      // Optional, textarea (4 rows)
}
```

### CHECKBOX FIELD: "Solutions Interested In"

**Checkbox Options** (multi-select, min 1 required):
- ✅ `timeguard-ai` - "TimeGuard AI"
- ✅ `automations` - "Automations"
- ✅ `strategy-session` - "Strategy Session"
- ✅ `custom-solutions` - "Custom Solutions"

### CONDITIONAL FIELDS (Dynamic - Appear Based on Checkboxes)

#### IF `timeguard-ai` IS CHECKED:
```typescript
{
  schedulingHeadaches: string[], // Multi-select buttons
  weeklyAppointments: string     // Dropdown
}
```

**Question 1:** "What are your biggest scheduling headaches?"
**Options** (multi-select buttons):
- `no-shows` - "No-shows"
- `manual-scheduling` - "Manual scheduling"
- `double-bookings` - "Double bookings"
- `after-hours-calls` - "After-hours calls"

**Question 2:** "Approx. weekly appointments?"
**Dropdown Options:**
- `0-20` - "0-20 per week"
- `20-50` - "20-50 per week"
- `50-100` - "50-100 per week"
- `100+` - "100+ per week"

---

#### IF `automations` IS CHECKED:
```typescript
{
  currentTools: string,          // Text input
  timewastingTask: string        // Text input
}
```

**Question 1:** "What tools do you use now?"
**Input:** Free text (e.g., "Excel, Zapier, Monday.com")

**Question 2:** "Which task wastes the most time today?"
**Input:** Free text (e.g., "Manual data entry into CRM")

---

#### IF `strategy-session` IS CHECKED:
```typescript
{
  primaryGoal: string  // Single select buttons
}
```

**Question:** "What is your primary goal for this call?"
**Options** (single select buttons):
- `scale-revenue` - "Scale revenue with better systems"
- `cut-costs` - "Cut operational costs with AI"
- `automate` - "Move from manual to automated"
- `fix-lead-flow` - "Fix broken lead flow"

---

#### IF `custom-solutions` IS CHECKED:
```typescript
{
  customVision: string  // Textarea (3 rows)
}
```

**Question:** "Describe your vision or the specific gap you need to fill"
**Input:** Textarea for detailed description

---

### COMPLETE FORM DATA STRUCTURE (When All Checked)

```typescript
{
  // Base fields
  fullName: "Jane Smith",
  email: "jane@business.com",
  company: "Business Corp",
  phone: "+1 (555) 987-6543",
  message: "Looking forward to learning more",

  // Checkbox selections
  solutions: ["timeguard-ai", "automations", "strategy-session", "custom-solutions"],

  // Conditional: TimeGuard AI
  schedulingHeadaches: ["no-shows", "double-bookings"],
  weeklyAppointments: "50-100",

  // Conditional: Automations
  currentTools: "Excel, Zapier, Monday.com",
  timewastingTask: "Manual data entry into CRM",

  // Conditional: Strategy Session
  primaryGoal: "scale-revenue",

  // Conditional: Custom Solutions
  customVision: "We need a custom dashboard that integrates with our existing tools...",

  // Metadata
  source: "solutions-lead",
  page: "/solutions/timeguard-ai", // or whichever page they submitted from
  timestamp: "2026-01-16T10:30:00Z"
}
```

---

## 4. MARKETING/SERVICES LEAD FORM

**Location:** Marketing service pages
**Files:**
- `/marketing/services`
- `/marketing/ads-management`
- `/marketing/branding-creative`
- `/marketing/content-development`

**Component:** `src/components/forms/MarketingLeadForm.tsx`
**Current Submission:** Console log only (simulated)
**Source Tag:** `marketing-services`

### BASE FIELDS (Always Present)

```typescript
{
  fullName: string,       // Required, text input
  email: string,          // Required, email input
  company: string,        // Required, text input
  phone: string,          // Optional, tel input
  services: string[],     // Required, min 1 checkbox
  marketingBudget: string, // Required, dropdown
  marketingGoals: string   // Optional, textarea (4 rows)
}
```

### CHECKBOX FIELD: "Services Interested In"

**Checkbox Options** (multi-select, min 1 required):
- ✅ `ads-management` - "Ads Management"
- ✅ `branding-creative` - "Branding & Creative"
- ✅ `content-development` - "Content Development"

### CONDITIONAL FIELDS (Dynamic)

#### IF `ads-management` IS CHECKED:
```typescript
{
  adsPlatforms: string[], // Multi-select buttons
  targetRoas: string      // Text input
}
```

**Question 1:** "Which platforms are you interested in?"
**Options** (multi-select buttons):
- `meta` - "Meta"
- `google` - "Google"
- `linkedin` - "LinkedIn"
- `tiktok` - "TikTok"

**Question 2:** "Target Monthly ROAS Goal?"
**Input:** Free text (e.g., "3x", "5x", "10x")

---

#### IF `branding-creative` IS CHECKED:
```typescript
{
  brandingNeeds: string[], // Multi-select buttons
  brandVibe: string        // Text input
}
```

**Question 1:** "What do you need help with?"
**Options** (multi-select buttons):
- `new-brand` - "New Brand Identity"
- `rebrand` - "Rebrand"
- `style-guide` - "Style Guide"
- `visual-assets` - "Visual Assets"

**Question 2:** "Brand vibe?"
**Input:** Free text (e.g., "Minimalist", "Bold", "Corporate", "Playful")

---

#### IF `content-development` IS CHECKED:
```typescript
{
  contentTypes: string[],  // Multi-select buttons
  postingFrequency: string // Text input
}
```

**Question 1:** "Content types required?"
**Options** (multi-select buttons):
- `social-media` - "Social Media"
- `blog-posts` - "Blog Posts"
- `email-newsletters` - "Email Newsletters"
- `video-scripts` - "Video Scripts"

**Question 2:** "Desired posting frequency?"
**Input:** Free text (e.g., "3x/week", "Daily", "Bi-weekly")

---

### MARKETING BUDGET FIELD (Required Dropdown)

**Options:**
- `under-1k` - "Under $1,000/month"
- `1k-5k` - "$1,000-$5,000/month"
- `5k-10k` - "$5,000-$10,000/month"
- `10k+` - "$10,000+/month"

---

### COMPLETE FORM DATA STRUCTURE (When All Checked)

```typescript
{
  // Base fields
  fullName: "Mike Johnson",
  email: "mike@agency.com",
  company: "Agency LLC",
  phone: "+1 (555) 111-2222",
  marketingGoals: "Increase brand awareness and generate qualified leads",

  // Checkbox selections
  services: ["ads-management", "branding-creative", "content-development"],

  // Required dropdown
  marketingBudget: "5k-10k",

  // Conditional: Ads Management
  adsPlatforms: ["meta", "google", "linkedin"],
  targetRoas: "5x",

  // Conditional: Branding & Creative
  brandingNeeds: ["rebrand", "style-guide"],
  brandVibe: "Bold and modern",

  // Conditional: Content Development
  contentTypes: ["social-media", "blog-posts"],
  postingFrequency: "3x/week",

  // Metadata
  source: "marketing-services",
  page: "/marketing/services",
  timestamp: "2026-01-16T10:30:00Z"
}
```

---

## 5. INDUSTRIES LEAD FORM

**Location:** Industry-specific pages
**Files:**
- `/industries` overview
- `/industries/real-estate`
- `/industries/accounting`
- `/industries/property-management`
- `/industries/contractors`
- `/industries/cleaning`
- `/industries/healthcare`

**Component:** `src/components/forms/IndustriesLeadForm.tsx`
**Current Submission:** Console log only (simulated)
**Source Tag:** `industries`

### BASE FIELDS (Always Present)

```typescript
{
  fullName: string,    // Required, text input
  email: string,       // Required, email input
  company: string,     // Required, text input
  phone: string,       // Optional, tel input
  industries: string[], // Required, min 1 checkbox
  details: string      // Optional, textarea (4 rows) - "All Other Details"
}
```

### CHECKBOX FIELD: "Which industries are you in?"

**Checkbox Options** (multi-select, min 1 required):
- ✅ `real-estate` - "Real Estate"
- ✅ `accounting` - "Accounting"
- ✅ `property-management` - "Property Management"
- ✅ `contractors` - "Contractors"

### CONDITIONAL FIELDS (Dynamic - Industry-Specific)

#### IF `real-estate` IS CHECKED:
```typescript
{
  realestate_transactionVolume: string,  // Dropdown
  realestate_painPoints: string[]        // Multi-select buttons
}
```

**Question 1:** "Annual Transaction Volume"
**Dropdown Options:**
- `0-10` - "0-10 Deals/Year"
- `10-25` - "10-25 Deals/Year"
- `25-50` - "25-50 Deals/Year"
- `50+` - "50+ Deals/Year"

**Question 2:** "Biggest Operational Pain Point"
**Options** (multi-select buttons):
- `manual-followups` - "Manual Follow-ups"
- `lost-leads` - "Lost Leads"
- `document-chaos` - "Document Chaos"
- `pipeline-visibility` - "Pipeline Visibility"

---

#### IF `accounting` IS CHECKED:
```typescript
{
  accounting_practiceSize: string,  // Dropdown
  accounting_challenge: string[]    // Multi-select buttons
}
```

**Question 1:** "Practice Size"
**Dropdown Options:**
- `solo` - "Solo Practitioner"
- `2-5` - "2-5 Staff"
- `5-10` - "5-10 Staff"
- `10+` - "10+ Staff"

**Question 2:** "Primary Challenge"
**Options** (multi-select buttons):
- `document-collection` - "Document Collection"
- `client-onboarding` - "Client Onboarding"
- `tax-season` - "Tax Season Workflow"
- `billing-ar` - "Billing/AR"

---

#### IF `property-management` IS CHECKED:
```typescript
{
  propmgmt_portfolioSize: string,  // Dropdown
  propmgmt_focusAreas: string[]    // Multi-select buttons
}
```

**Question 1:** "Portfolio Size (Units)"
**Dropdown Options:**
- `1-50` - "1-50 Units"
- `50-200` - "50-200 Units"
- `200-500` - "200-500 Units"
- `500+` - "500+ Units"

**Question 2:** "Key Focus Areas"
**Options** (multi-select buttons):
- `tenant-screening` - "Tenant Screening"
- `maintenance-coord` - "Maintenance Coord"
- `owner-reporting` - "Owner Reporting"
- `rent-collection` - "Rent Collection"

---

#### IF `contractors` IS CHECKED:
```typescript
{
  contractors_primaryTrade: string,    // Dropdown
  contractors_projectVolume: string    // Dropdown
}
```

**Question 1:** "Primary Trade"
**Dropdown Options:**
- `general` - "General Contractor"
- `hvac-plumbing` - "HVAC/Plumbing"
- `electrical` - "Electrical"
- `landscaping` - "Landscaping"
- `other` - "Other"

**Question 2:** "Monthly Project Volume"
**Dropdown Options:**
- `1-5` - "1-5 Projects"
- `5-15` - "5-15 Projects"
- `15-30` - "15-30 Projects"
- `30+` - "30+ Projects"

---

### COMPLETE FORM DATA STRUCTURE (When Multiple Industries Checked)

```typescript
{
  // Base fields
  fullName: "Sarah Williams",
  email: "sarah@realtyfirm.com",
  company: "Realty Firm Inc.",
  phone: "+1 (555) 333-4444",
  details: "We also do commercial real estate",

  // Checkbox selections
  industries: ["real-estate", "property-management"],

  // Conditional: Real Estate
  realestate_transactionVolume: "25-50",
  realestate_painPoints: ["lost-leads", "document-chaos"],

  // Conditional: Property Management
  propmgmt_portfolioSize: "50-200",
  propmgmt_focusAreas: ["tenant-screening", "owner-reporting"],

  // Metadata
  source: "industries",
  page: "/industries/real-estate",
  timestamp: "2026-01-16T10:30:00Z"
}
```

---

## 6. AI AGENTS FORM (TODO)

**Status:** ⚠️ NOT YET CREATED
**Expected Location:** `/solutions/ai-agents` page
**Expected Source Tag:** `ai-agents`

**Note:** Based on the existing pattern, this form should include:
- Base fields: Full Name, Email, Company, Phone
- AI Agent use case selection (checkboxes)
- Conditional fields based on use case type
- Budget/timeline fields

**Action Required:** Create this form component or confirm it uses the Solutions Lead Form

---

## 7. CONTENT ENGINE FORM (TODO)

**Status:** ⚠️ PARTIALLY CREATED
**Location:** `/solutions/content-engine` page
**Component:** Likely embedded or uses Solutions Lead Form
**Expected Source Tag:** `content-engine`

**Note:** Based on mentions in codebase:
- Content type selection (Blog Posts, Social Media, Email, etc.)
- Content volume (pieces per month)
- Industry/niche selection
- Challenge description

**Action Required:** Verify if this uses a dedicated form or Solutions Lead Form

---

## 8. CUSTOM APPS FORM (TODO)

**Status:** ⚠️ NOT YET CREATED
**Expected Location:** `/solutions/custom-apps` or `/solutions/custom-apps/request`
**Expected Source Tag:** `custom-apps`

**Note:** Based on navigation, this should include:
- Base contact fields
- App type/category selection
- Technical requirements
- Budget/timeline fields

**Action Required:** Create this form component or confirm it uses the Solutions Lead Form

---

## 9. SMART AUTOMATIONS FORM (TODO)

**Status:** ⚠️ NOT YET CREATED
**Expected Location:** `/automation/smart-automations` page
**Expected Source Tag:** `smart-automations`

**Note:** Based on automation templates in codebase:
- Base contact fields
- Automation template selection (checkboxes)
- Current tools/process description
- Desired outcome

**Action Required:** Create this form component or confirm it uses the Solutions Lead Form

---

---

# WEBHOOK INTEGRATION GUIDE

## Step 1: Choose Webhook Platform

**Options:**
1. **Zapier** (Easiest, recommended for tomorrow's launch)
   - Free tier: 100 tasks/month
   - Webhook URL: `https://hooks.zapier.com/hooks/catch/12345/abcdef/`

2. **n8n** (More powerful, for future)
   - Self-hosted or cloud
   - Webhook URL: `https://your-n8n-instance.com/webhook/lead-form`

3. **Make (Integromat)** (Alternative)
   - Similar to Zapier
   - Webhook URL: `https://hook.integromat.com/...`

---

## Step 2: Add Webhook to Each Form

### Pattern for All Forms:

```typescript
// In handleSubmit function, replace console.log with:

async function handleSubmit(e: React.FormEvent) {
  e.preventDefault();
  setIsSubmitting(true);

  try {
    // Prepare data
    const submissionData = {
      ...formData,
      source: 'FORM_SOURCE_TAG', // e.g., 'apps-waiting-list', 'contact-page', etc.
      page: window.location.pathname,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent
    };

    // Send to webhook (Zapier/n8n)
    const webhookResponse = await fetch('YOUR_WEBHOOK_URL', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(submissionData)
    });

    if (!webhookResponse.ok) {
      throw new Error('Webhook failed');
    }

    // Show success message
    setSubmitStatus('success');

    // Reset form after 3 seconds
    setTimeout(() => {
      setFormData(INITIAL_STATE);
      setSubmitStatus('idle');
    }, 3000);

  } catch (error) {
    console.error('Submission error:', error);
    setSubmitStatus('error');
  } finally {
    setIsSubmitting(false);
  }
}
```

---

## Step 3: Environment Variables

**Create `.env.local` file:**

```bash
# Webhook URLs
NEXT_PUBLIC_WEBHOOK_APPS="https://hooks.zapier.com/hooks/catch/12345/apps/"
NEXT_PUBLIC_WEBHOOK_CONTACT="https://hooks.zapier.com/hooks/catch/12345/contact/"
NEXT_PUBLIC_WEBHOOK_SOLUTIONS="https://hooks.zapier.com/hooks/catch/12345/solutions/"
NEXT_PUBLIC_WEBHOOK_MARKETING="https://hooks.zapier.com/hooks/catch/12345/marketing/"
NEXT_PUBLIC_WEBHOOK_INDUSTRIES="https://hooks.zapier.com/hooks/catch/12345/industries/"

# Or single webhook URL for all forms
NEXT_PUBLIC_WEBHOOK_LEADS="https://hooks.zapier.com/hooks/catch/12345/all-leads/"
```

**Usage in code:**

```typescript
const webhookUrl = process.env.NEXT_PUBLIC_WEBHOOK_APPS;
```

---

---

# N8N WORKFLOW STRUCTURE

## Workflow 1: Apps Waiting List Handler

**Trigger:** Webhook receives data from Apps form
**Webhook URL:** `/webhook/apps-waiting-list`

### Workflow Steps:

```
1. [Webhook Trigger]
   ↓
2. [Function: Parse & Validate Data]
   - Extract all fields
   - Validate required fields
   - Format conditional fields based on interestedApps array
   ↓
3. [Conditional: Check Multiple Apps]
   IF interestedApps.length > 1:
     Set priority = "High"
   ELSE:
     Set priority = "Normal"
   ↓
4. [Slack Notification]
   Channel: #sales-apps
   Message:
   ```
   🎯 NEW APPS WAITING LIST LEAD

   👤 Contact:
   • Name: {{fullName}}
   • Email: {{email}}
   • Company: {{company}}
   • Phone: {{phone}}

   📱 Interested Apps:
   {{#each interestedApps}}
   • {{this}}
   {{/each}}

   {{#if interestedApps includes 'crm'}}
   🏢 CRM Details:
   • Industry Template: {{crmSystem}}
   {{/if}}

   {{#if interestedApps includes 'leads'}}
   📊 Leads Details:
   • Target Volume: {{leadVolume}}
   {{/if}}

   {{#if interestedApps includes 'ai-mastery'}}
   🤖 AI Mastery Details:
   • Goal: {{aiGoal}}
   {{/if}}

   {{#if interestedApps includes 'omg-iq'}}
   💡 OMG IQ Details:
   • Focus Industry: {{industryFocus}}
   {{/if}}

   💬 Challenge:
   {{currentChallenges}}

   🔗 View in Admin: https://omgsystems.com/portal/admin/leads
   ⏰ Received: {{timestamp}}
   ```
   ↓
5. [Email: Send to Sales Team]
   To: apps-sales@omgsystems.ca
   Subject: New Apps Waiting List Lead - {{company}}
   Body: [Same structure as Slack, formatted for email]
   ↓
6. [PostgreSQL: Save to Database]
   Table: leads
   INSERT:
     name: {{fullName}}
     email: {{email}}
     company: {{company}}
     phone: {{phone}}
     source: 'apps-waiting-list'
     interestedApps: {{JSON.stringify(interestedApps)}}
     crmSystem: {{crmSystem}}
     leadVolume: {{leadVolume}}
     aiGoal: {{aiGoal}}
     industryFocus: {{industryFocus}}
     currentChallenges: {{currentChallenges}}
     status: 'NEW'
     createdAt: {{timestamp}}
   ↓
7. [PostgreSQL: Update Smart Automations]
   UPDATE leads
   SET smartAutomations = smartAutomations || '[{
     "workflow": "apps-waiting-list-handler",
     "executedAt": "{{timestamp}}",
     "status": "success",
     "actions": ["slack_notification", "email_sent", "db_saved"]
   }]'
   WHERE email = {{email}}
   ↓
8. [HTTP: Auto-respond to Lead]
   Send welcome email to {{email}}:

   Subject: Thanks for joining the Apps waiting list!
   Body:
   ```
   Hi {{fullName}},

   Thanks for your interest in OMGsystems Apps! We're excited to help
   transform your business.

   Based on your selections:
   {{#each interestedApps}}
   • {{this}}
   {{/each}}

   A member of our team will reach out within 24 hours to discuss your needs.

   In the meantime, check out:
   • Case Studies: https://omgsystems.com/case-studies
   • Book a Strategy Call: https://omgsystems.com/solutions/strategy-session

   Best,
   The OMGsystems Team
   ```
```

---

## Workflow 2: Contact Form Handler

**Trigger:** Webhook receives data from Contact form
**Webhook URL:** `/webhook/contact-form`

### Workflow Steps:

```
1. [Webhook Trigger]
   ↓
2. [Function: Parse Contact Data]
   - Extract all fields including custom industry/budget if present
   - Parse date range (timeline_start, timeline_end)
   ↓
3. [Conditional: Check Budget]
   IF budget contains "$50,000+" OR budget > 50000:
     Set priority = "High"
     Assign to = "Senior Sales Rep"
   ELSE IF budget contains "$30,000" OR budget >= 30000:
     Set priority = "Medium"
   ELSE:
     Set priority = "Normal"
   ↓
4. [Slack Notification]
   Channel: #sales-contact
   Message:
   ```
   📨 NEW CONTACT FORM SUBMISSION
   Priority: {{priority}}

   👤 Contact:
   • Name: {{name}}
   • Email: {{email}}
   • Company: {{company}}
   • Phone: {{phone}}

   💼 Project Details:
   • Industry: {{industry}}
   • Budget: {{budget}}
   • Timeline: {{timeline}}

   🎯 Problem:
   {{problem}}

   ✅ CASL Consent: {{casl_consent}}

   🔗 View in Admin: https://omgsystems.com/portal/admin/leads
   ```
   ↓
5. [Email: Sales Team]
   To: contact-sales@omgsystems.ca
   CC: {{#if priority == 'High'}}senior-sales@omgsystems.ca{{/if}}
   Subject: [{{priority}}] Contact Form - {{company}} ({{budget}})
   ↓
6. [PostgreSQL: Save Lead]
   INSERT into leads with all fields
   ↓
7. [Auto-respond Email]
   Send confirmation to {{email}}
```

---

## Workflow 3: Solutions Lead Handler

**Trigger:** Webhook receives data from Solutions form
**Webhook URL:** `/webhook/solutions-lead`

### Workflow Steps:

```
1. [Webhook Trigger]
   ↓
2. [Function: Parse Solutions Data]
   - Extract solutions array
   - Parse conditional fields for each selected solution
   ↓
3. [Conditional Routing]
   IF solutions includes "strategy-session":
     → Route to "Strategy Session Handler" (separate workflow)

   IF solutions includes "custom-solutions":
     Priority = "High"
     Assign to = "Custom Development Team"
   ↓
4. [Slack Notification]
   Channel: #sales-solutions
   Message: [Dynamic based on selected solutions]
   ↓
5. [Email: Appropriate Team]
   IF "timeguard-ai" selected → timeguard-team@omgsystems.ca
   IF "automations" selected → automations-team@omgsystems.ca
   IF "strategy-session" selected → strategy@omgsystems.ca
   IF "custom-solutions" selected → custom-dev@omgsystems.ca
   ↓
6. [PostgreSQL: Save with Solutions-Specific Fields]
   ↓
7. [Auto-respond with Solution-Specific Resources]
```

---

## Workflow 4: Marketing Services Handler

**Trigger:** Webhook receives data from Marketing form
**Webhook URL:** `/webhook/marketing-services`

### Workflow Steps:

```
1. [Webhook Trigger]
   ↓
2. [Function: Parse Marketing Data]
   - Extract services array
   - Parse conditional fields (platforms, needs, content types)
   - Extract marketingBudget
   ↓
3. [Team Assignment Logic]
   IF "ads-management" selected:
     Assign to = "Ads Team"
     Include platforms info in notification

   IF "branding-creative" selected:
     Assign to = "Creative Team"
     Include branding needs

   IF "content-development" selected:
     Assign to = "Content Team"
     Include content types + posting frequency
   ↓
4. [Slack Notification]
   Channel: #sales-marketing
   Include budget prominently
   ↓
5. [Email: Marketing Team(s)]
   Route to appropriate team(s) based on services
   ↓
6. [PostgreSQL: Save]
   ↓
7. [Auto-respond with Marketing Resources]
```

---

## Workflow 5: Industries Lead Handler

**Trigger:** Webhook receives data from Industries form
**Webhook URL:** `/webhook/industries-lead`

### Workflow Steps:

```
1. [Webhook Trigger]
   ↓
2. [Function: Parse Industry Data]
   - Extract industries array
   - Parse industry-specific conditional fields
   ↓
3. [Industry Expert Assignment]
   IF "real-estate" selected:
     Assign to = "Real Estate Specialist"
     Include transaction volume + pain points

   IF "accounting" selected:
     Assign to = "Accounting Specialist"
     Include practice size + challenges

   IF "property-management" selected:
     Assign to = "PropMgmt Specialist"
     Include portfolio size + focus areas

   IF "contractors" selected:
     Assign to = "Contractors Specialist"
     Include trade + project volume
   ↓
4. [Slack Notification]
   Channel: #sales-industries
   Mention: @{{assigned_specialist}}
   ↓
5. [Email: Industry Specialist(s)]
   ↓
6. [PostgreSQL: Save with Industry Fields]
   ↓
7. [Auto-respond with Industry-Specific Case Study]
   Example: If real-estate, send case study about real estate automation
```

---

---

# IMPLEMENTATION CHECKLIST

## Phase 1: Immediate (Tomorrow Launch)

- [ ] **Create Zapier account** (free tier)
- [ ] **Set up 5 Zaps** (one per form type):
  1. Apps Waiting List Zap
  2. Contact Form Zap
  3. Solutions Lead Zap
  4. Marketing Services Zap
  5. Industries Lead Zap

- [ ] **Get webhook URLs** from Zapier for each Zap
- [ ] **Add webhook URLs** to `.env.local` file
- [ ] **Update form submission handlers** in these files:
  1. `src/app/apps/page.tsx` (Apps form, line 161)
  2. `src/app/contact/page.tsx` (Contact form, line 684)
  3. Solutions form component (find location)
  4. Marketing form component (find location)
  5. Industries form component (find location)

- [ ] **Test each form** with real submission
- [ ] **Verify Slack notifications** working
- [ ] **Verify emails** being sent
- [ ] **Verify Google Sheet** (or equivalent) updating

## Phase 2: Week 1 Improvements

- [ ] **Connect to database** (replace Google Sheets with PostgreSQL)
- [ ] **Add auto-responder** emails to all forms
- [ ] **Create Google Sheets backup** (Zapier action)
- [ ] **Set up email templates** for each form type
- [ ] **Add Calendly links** to auto-responder emails

## Phase 3: Week 2-3 (n8n Migration)

- [ ] **Set up n8n** (self-hosted or cloud)
- [ ] **Migrate Zaps to n8n workflows** (one by one)
- [ ] **Add PostgreSQL triggers** for real-time updates
- [ ] **Implement Smart Automations tracking**
- [ ] **Add advanced routing logic** (budget-based, volume-based)
- [ ] **Create admin notifications** for high-priority leads
- [ ] **Set up lead scoring** algorithm

## Phase 4: Future Enhancements

- [ ] **Add lead nurture sequences** (drip campaigns)
- [ ] **Implement lead assignment rules** (round-robin, territory-based)
- [ ] **Create dashboard** for lead metrics
- [ ] **Add webhook retry logic** for failed submissions
- [ ] **Implement duplicate detection**
- [ ] **Add lead enrichment** (Clearbit, Apollo, etc.)

---

---

# QUICK REFERENCE: FORM SOURCES

| Form Type | Source Tag | Current Endpoint | Webhook Needed? |
|-----------|-----------|------------------|-----------------|
| Apps Waiting List | `apps-waiting-list` | Console log | ✅ YES |
| Contact (Main) | `contact-page` | `/api/contact` | ✅ YES (add to existing) |
| Solutions | `solutions-lead` | Console log | ✅ YES |
| Marketing | `marketing-services` | Console log | ✅ YES |
| Industries | `industries` | Console log | ✅ YES |
| AI Agents | `ai-agents` | TBD | ⚠️ CREATE FORM FIRST |
| Content Engine | `content-engine` | TBD | ⚠️ VERIFY EXISTS |
| Custom Apps | `custom-apps` | TBD | ⚠️ CREATE FORM FIRST |
| Smart Automations | `smart-automations` | TBD | ⚠️ CREATE FORM FIRST |

---

# SUMMARY

**Forms Documented:** 5/9 complete
**Forms Needing Creation:** 4 (AI Agents, Content Engine, Custom Apps, Smart Automations)
**Webhook Integration Effort:** 4-6 hours
**n8n Workflow Creation:** 8-12 hours (after webhooks working)

**Recommended Approach:**
1. Start with Zapier for tomorrow's launch (fastest)
2. Get 5 main forms working with webhooks
3. Create missing 4 forms (use existing patterns)
4. Migrate to n8n in Week 2-3 for better control

---

**Document Last Updated:** January 16, 2026 11:00 PM
