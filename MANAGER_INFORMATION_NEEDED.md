# Information Needed from Manager - SVD & OMG Integration

**Date:** January 17, 2026 (Updated)
**Purpose:** Complete integration between OMG System and SecureVault Docs (SVD)
**Priority:** HIGH - Required for production launch

---

## 🎯 Overview

We need specific information from your manager to properly integrate SecureVault Docs (SVD) with the OMG System. This integration will enable:
- **Single Sign-On (SSO)**: Users login once to OMG, automatically authenticated in SVD
- **Unified Billing**: All payments through OMG System, no duplicate charges
- **Account Linking**: Prevent duplicate accounts if user has both OMG and SVD accounts
- **Upgrade Flow**: Seamless upgrades from any product to any tier
- **Shared Database**: One account across all products

---

## 🚨 PRIORITY #1: SSO_SECRET (Most Critical)

### **Without this, we cannot proceed with ANY integration**

- [ ] **Does SVD already have an `SSO_SECRET` configured?** YES / NO
- [ ] **If YES**: Please send it (32+ character string) - SEND SECURELY!
- [ ] **If NO**: We'll generate one, you add it to SVD's `.env` file

**What it is:** A shared secret key that both OMG and SVD use to encrypt/decrypt JWT tokens for automatic login

**Generate if needed:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

---

## 📋 CRITICAL INFORMATION NEEDED

### **1. SecureVault Docs (SVD) Access Information**

#### **A. SVD Application Details**
- [ ] **Production URL**: Where is SVD deployed? (e.g., `https://docs.omgsystem.com` or `https://securevault.omgsystem.com`)
- [ ] **Development/Staging URL**: For testing before production
- [ ] **Repository Access**: Where is the SVD codebase hosted? (GitHub, GitLab, etc.)
- [ ] **Current Version**: Which version of SVD is deployed?

#### **B. SVD Admin/Login Credentials**
- [ ] **Admin Username/Email**: To access SVD admin panel
- [ ] **Admin Password**: (Manager should send this securely, not via plain text)
- [ ] **Admin Dashboard URL**: Where to manage SVD settings (e.g., `https://svd.com/admin`)

#### **C. SVD Technical Details**
- [ ] **Database Type**: PostgreSQL? MySQL? Other?
- [ ] **Database Location**: Same server as OMG? Separate server?
- [ ] **Authentication Method**: How does SVD currently handle auth? (NextAuth, custom, etc.)
- [ ] **API Endpoints**: Does SVD have an API we can call? If so, what's the base URL?

---

### **2. Database Connection Information**

According to the architecture plan, OMG System and SVD share a multi-schema PostgreSQL database:

#### **Shared Database Structure:**
```
PostgreSQL Database: omg_hub
├── core schema     (Shared user accounts)
├── hub schema      (Shared subscriptions/billing)
└── securevault schema (SVD-specific data)
```

#### **What We Need:**
- [ ] **Database Host**: Server address (e.g., `db.omgsystem.com` or `localhost`)
- [ ] **Database Port**: Usually 5432 for PostgreSQL
- [ ] **Database Name**: Is it `omg_hub` or something else?
- [ ] **Database Username**: Credentials for OMG System to connect
- [ ] **Database Password**: (Send securely)
- [ ] **SSL Required?**: Yes/No
- [ ] **Connection String Format**: Full connection string would be helpful

**Example Connection String:**
```
HUB_DATABASE_URL="postgresql://username:password@host:5432/omg_hub?sslmode=require"
```

#### **Database Schema Questions:**
- [ ] **Does the shared database already exist?** If not, we need to create it
- [ ] **Do the `core` and `hub` schemas exist?** If not, we need to create them
- [ ] **Are there existing users in `core.User` table?** If yes, we need to sync with OMG System
- [ ] **Are there existing subscriptions in `hub.Subscription` table?** If yes, we need to check for conflicts

---

### **3. Stripe (Payment Processing) Information**

#### **A. Stripe Account Details**
- [ ] **Do OMG System and SVD use the SAME Stripe account?** (Recommended: Yes)
- [ ] **Or do they use DIFFERENT Stripe accounts?** (If yes, integration is more complex)

#### **B. Stripe API Keys** (if same account)
We need these for OMG System to process payments:

- [ ] **Stripe Secret Key (Live)**: `sk_live_...` (Send securely!)
- [ ] **Stripe Publishable Key (Live)**: `pk_live_...`
- [ ] **Stripe Webhook Secret**: `whsec_...` (for verifying webhook events)
- [ ] **Stripe Secret Key (Test)**: `sk_test_...` (for development)
- [ ] **Stripe Publishable Key (Test)**: `pk_test_...`

#### **C. Stripe Product/Price IDs**
If SVD already has products set up in Stripe:

- [ ] **SecureVault Starter Plan**: Stripe Price ID (e.g., `price_1ABC123`)
- [ ] **SecureVault Growth Plan**: Stripe Price ID
- [ ] **SecureVault Pro Plan**: Stripe Price ID
- [ ] **Current SVD Customers**: How many? Need to migrate them to OMG System billing?

#### **D. Webhook Configuration**
- [ ] **Current Webhook URL**: Where does Stripe currently send webhooks for SVD? (e.g., `https://svd.com/api/webhooks/stripe`)
- [ ] **Webhook Events**: Which events is SVD listening for? (e.g., `invoice.paid`, `customer.subscription.deleted`)

**IMPORTANT**: Once we integrate, webhooks should point to OMG System, not SVD directly.

---

### **4. Single Sign-On (SSO) Configuration**

For users to seamlessly move between OMG System and SVD:

#### **A. SSO Secret Key**
- [ ] **SSO_SECRET**: A secure shared secret (minimum 32 characters) that both OMG and SVD will use to sign/verify JWT tokens

**If manager doesn't have one yet, we can generate:**
```bash
# Generate a secure random secret
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

**Example Output:**
```
SSO_SECRET="xK8mN9pQ2rS5tU7vW0yZ3aB6cD9eF2gH5jK8mN1pQ4rS=="
```

#### **B. SSO Configuration Questions**
- [ ] **Does SVD already have SSO implemented?** If yes, what method? (JWT, OAuth, SAML)
- [ ] **Can SVD accept SSO login via URL parameter?** (e.g., `https://svd.com/sso/login?token=...`)
- [ ] **Does SVD have an endpoint to validate external tokens?** If yes, what's the URL?

---

### **5. Current SVD Subscription/Billing Setup**

#### **A. Existing Customers**
- [ ] **How many active SVD customers exist?** (Need to migrate to OMG System)
- [ ] **Are they paying directly to SVD?** Or through another platform?
- [ ] **What are the current pricing tiers?** (Starter/Growth/Pro?)
- [ ] **Current monthly/annual pricing?** (e.g., $9.99/mo, $14.99/mo, $24.99/mo)

#### **B. SVD Checkout Flow**
- [ ] **Does SVD have its own checkout page?** If yes, URL?
- [ ] **Will SVD checkout be REMOVED** and redirect to OMG System? (Recommended: Yes)
- [ ] **Or will SVD keep its own checkout** and we integrate both? (Not recommended - duplicate payment risk)

---

### **6. Deployment & Infrastructure**

#### **A. Hosting Information**
- [ ] **Where is SVD hosted?** (Vercel, AWS, DigitalOcean, other?)
- [ ] **Where is OMG System hosted?** (Same or different provider?)
- [ ] **Do both use the same domain?** (e.g., `omgsystem.com` vs `securevault.com`)

#### **B. Environment Variables Access**
- [ ] **Can manager provide access to SVD's environment variables?** (We need to add `SSO_SECRET`)
- [ ] **Can manager provide access to OMG System's production environment?** (If not already accessible)

#### **C. Deployment Access**
- [ ] **Who deploys SVD?** Manager? Automated CI/CD?
- [ ] **Can we coordinate a deployment** after integration is complete?

---

### **7. User Data Migration**

If SVD has existing users that need to be merged with OMG System:

#### **Questions:**
- [ ] **How many existing SVD users?** (Need to migrate to `core.User` table)
- [ ] **User data format**: Can manager export CSV/JSON of existing users?
- [ ] **Fields needed**: email, name, subscription status, subscription tier, subscription start date

**Example User Export:**
```csv
email,name,subscription_tier,status,created_at
john@example.com,John Doe,pro,active,2024-01-15
jane@example.com,Jane Smith,growth,active,2024-03-20
```

---

## 🔐 Security Best Practices

**IMPORTANT**: Manager should send sensitive information (passwords, API keys, database credentials) via:
- ✅ Encrypted email (PGP/GPG)
- ✅ Secure password manager share (1Password, LastPass, Bitwarden)
- ✅ Encrypted messaging (Signal, Wire)
- ❌ NOT via plain text email
- ❌ NOT via Slack/Teams (unless encrypted DM)

---

## 📊 Decision Matrix

Some questions require manager's decision:

### **Decision 1: Billing Strategy**
**Question**: Should all payments go through OMG System, or should SVD keep its own checkout?

**Option A: Hub-Only Billing** ⭐ RECOMMENDED
- ✅ All payments through OMG System
- ✅ SVD redirects to OMG for checkout
- ✅ Single source of truth for subscriptions
- ✅ No duplicate payment risk

**Option B: Dual Billing**
- ⚠️ Both OMG and SVD can accept payments
- ⚠️ Risk of users paying twice
- ⚠️ More complex synchronization

**Manager's Decision**: [ ] Option A  [ ] Option B

---

### **Decision 2: Database Strategy**
**Question**: Should we use a shared database or keep separate databases?

**Option A: Shared Multi-Schema Database** ⭐ RECOMMENDED
- ✅ One `core.User` table (all users)
- ✅ One `hub.Subscription` table (all subscriptions)
- ✅ Easier SSO implementation
- ✅ No data sync issues

**Option B: Separate Databases + API Sync**
- ⚠️ OMG System has its own database
- ⚠️ SVD has its own database
- ⚠️ Need to sync data via API calls
- ⚠️ More complex, potential sync issues

**Manager's Decision**: [ ] Option A  [ ] Option B

---

### **Decision 3: SVD Checkout Removal**
**Question**: Should SVD's own checkout page be removed?

**Option A: Remove SVD Checkout** ⭐ RECOMMENDED
- ✅ All purchases go through OMG System
- ✅ Redirect SVD "Upgrade" buttons to OMG
- ✅ Cleaner user experience

**Option B: Keep SVD Checkout**
- ⚠️ SVD can still accept direct payments
- ⚠️ Need to sync with OMG System
- ⚠️ More complex integration

**Manager's Decision**: [ ] Option A  [ ] Option B

---

## 📝 Information Collection Template

**Please have your manager fill out this form:**

```
=== SECUREVAULT DOCS (SVD) ACCESS ===
Production URL: ________________________________
Admin Email: ___________________________________
Admin Password: ________________________________ (send securely)
Repository URL: ________________________________

=== DATABASE CONNECTION ===
Database Host: _________________________________
Database Port: _________________________________
Database Name: _________________________________
Database Username: _____________________________
Database Password: _____________________________ (send securely)
Connection String: _____________________________ (full string)

Shared database exists? [ ] Yes  [ ] No
core.User table exists? [ ] Yes  [ ] No
hub.Subscription table exists? [ ] Yes  [ ] No

=== STRIPE CONFIGURATION ===
Same Stripe account for OMG & SVD? [ ] Yes  [ ] No

Stripe Secret Key (Live): ______________________ (send securely)
Stripe Publishable Key (Live): _________________
Stripe Webhook Secret: _________________________ (send securely)
Stripe Secret Key (Test): ______________________ (send securely)
Stripe Publishable Key (Test): _________________

Current webhook URL: ___________________________

=== SSO CONFIGURATION ===
SSO_SECRET: ____________________________________ (send securely)
(If none exists, we can generate one)

SVD has existing SSO? [ ] Yes  [ ] No
SSO method: [ ] JWT  [ ] OAuth  [ ] Other: ____________

=== EXISTING CUSTOMERS ===
Number of active SVD customers: ________________
Paying directly to SVD? [ ] Yes  [ ] No
Current pricing tiers: _________________________

=== DECISIONS ===
Billing Strategy: [ ] Option A (Hub-Only)  [ ] Option B (Dual)
Database Strategy: [ ] Option A (Shared DB)  [ ] Option B (Separate)
SVD Checkout: [ ] Option A (Remove)  [ ] Option B (Keep)

=== ADDITIONAL NOTES ===
(Any other relevant information, concerns, or questions)
_______________________________________________
_______________________________________________
_______________________________________________
```

---

## ⏱️ Timeline

**After receiving this information:**

### **Phase 1: SSO Only** (With SSO_SECRET + SVD access)
- SSO implementation: 6-8 hours
- Basic testing: 1-2 hours
- **Subtotal: 7-10 hours** (1 day)

### **Phase 2: + Account Linking** (With database connection)
- Account linking system: 4-5 hours
- Duplicate detection: 2-3 hours
- Testing: 1-2 hours
- **Subtotal: 14-18 hours** (2 days total)

### **Phase 3: + Billing Integration** (With Stripe keys)
- Stripe integration: 4-6 hours
- Upgrade/downgrade flow: 2-3 hours
- Testing: 2-3 hours
- **Subtotal: 22-30 hours** (3-4 days total)

### **Phase 4: Deployment**
- Production deployment: 2-3 hours
- Final testing: 2 hours
- **Total: 26-35 hours** (3-5 days of focused work)

**Phased Approach:** We can implement incrementally (SSO first, then billing later)

---

## 🚨 Blockers Without This Information

**Cannot proceed with:**
- ❌ SSO integration (need SSO_SECRET + SVD access)
- ❌ Billing integration (need Stripe keys + database connection)
- ❌ User data migration (need existing user data)
- ❌ Testing end-to-end flow (need production/staging URLs)
- ❌ Production deployment (need deployment access)

---

## ✅ Next Steps

1. **Send this document to manager** via email or Slack
2. **Manager fills out the template** with all required information
3. **Manager sends sensitive data securely** (encrypted)
4. **We verify the information** by testing connections
5. **Begin implementation** of SSO + billing integration

---

## 📞 Contact

If manager has questions about any of these requirements, they can:
- Reply with specific questions about each section
- Schedule a call to walk through the integration architecture
- Request clarification on any technical terms

**Estimated response time after receiving info**: 2-3 business days for complete integration
