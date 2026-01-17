# Quick Checklist for Manager - SVD Integration

**Purpose**: Connect SecureVault Docs (SVD) with OMG System for unified login & billing
**Date Updated:** January 17, 2026

---

## 🔑 CRITICAL INFORMATION NEEDED (Send Securely!)

### 1. SSO_SECRET (HIGHEST PRIORITY)
- [ ] Does SVD already have an `SSO_SECRET` configured? YES / NO
- [ ] If YES: Please send it: `_______________` (SEND SECURELY!)
- [ ] If NO: I'll generate one for you to add to SVD

**Why Critical:** Without this, users cannot auto-login from OMG to SVD

---

### 2. SecureVault Docs Access
- [ ] Production URL: `https://_______________`
- [ ] Development/Staging URL: `https://_______________`
- [ ] Repository access: `https://_______________`
- [ ] Admin login email: `_______________`
- [ ] Admin password: `_______________` (SEND SECURELY!)

**Why Critical:** Need to add SSO endpoint to SVD code

---

### 3. Database Connection
- [ ] Connection string: `postgresql://user:pass@host:5432/database`
- [ ] Does shared database exist? YES / NO
- [ ] Does `hub.Subscription` table exist? YES / NO
- [ ] Does `core.User` table exist? YES / NO

**Why Critical:** Need to sync subscription data

---

### 4. Stripe API Keys (for payments - can wait if needed)
- [ ] Stripe Secret Key (Live): `sk_live_...` (SEND SECURELY!)
- [ ] Stripe Secret Key (Test): `sk_test_...` (SEND SECURELY!)
- [ ] Stripe Webhook Secret: `whsec_...` (SEND SECURELY!)
- [ ] Stripe Publishable Key (Live): `pk_live_...`
- [ ] Stripe Publishable Key (Test): `pk_test_...`
- [ ] Do OMG & SVD use SAME Stripe account? YES / NO
- [ ] Stripe Price IDs:
  - Starter: `price_____________`
  - Growth: `price_____________`
  - Pro: `price_____________`

**Can Skip:** If billing integration can wait, we can do SSO first

---

## ⚙️ KEY DECISIONS NEEDED

**Decision 1: Billing**
Where should customers pay for SVD?
- [ ] **Option A**: All payments through OMG System (recommended)
- [ ] **Option B**: SVD keeps its own checkout

**Decision 2: Database**
How should we store user data?
- [ ] **Option A**: Shared database (recommended)
- [ ] **Option B**: Separate databases with sync

**Decision 3: SVD Checkout**
What happens to SVD's current checkout page?
- [ ] **Option A**: Remove it, redirect to OMG (recommended)
- [ ] **Option B**: Keep it active

---

## 👥 EXISTING CUSTOMERS

- [ ] How many active SVD customers? `_______`
- [ ] Are they currently paying SVD directly? YES / NO
- [ ] Current pricing: Starter $____ / Growth $____ / Pro $____
- [ ] Need to migrate to OMG System? YES / NO

---

## 🚀 WHAT HAPPENS AFTER YOU PROVIDE THIS

### **With SSO_SECRET + SVD Access Only:**
**Time:** 6-8 hours

✅ Users login to OMG System once
✅ Click "Launch SVD" → automatically logged into SVD
✅ No second login required
✅ Seamless experience between platforms

### **+ Database Connection:**
**Time:** 10-13 hours (total)

✅ Above features, PLUS:
✅ Account linking (prevent duplicate accounts)
✅ Detect existing SVD accounts during OMG signup
✅ Manual account linking in settings
✅ Prevent double payments

### **+ Stripe Keys:**
**Time:** 16-20 hours (total)

✅ Above features, PLUS:
✅ Unified billing (all payments via OMG)
✅ Upgrades/downgrades working
✅ No duplicate charges
✅ Single invoice for all products

**Total Time: 2-3 days after receiving all info**

---

## 📧 HOW TO SEND SECURE INFORMATION

**✅ SECURE METHODS:**
- Encrypted email (PGP/GPG)
- Password manager share (1Password, Bitwarden)
- Encrypted chat (Signal)

**❌ DO NOT USE:**
- Plain text email
- Slack/Teams (unless encrypted DM)
- SMS/text message

---

## 🆘 QUESTIONS?

Reply with:
- "Need clarification on [specific item]"
- "Can we schedule a 30-min call to discuss?"
- "I don't have access to [X], who should I contact?"

---

**Estimated completion after receiving info: 2-3 business days**
