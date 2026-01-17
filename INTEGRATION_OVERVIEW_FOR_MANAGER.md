# OMG System + SecureVault Docs Integration - Manager Overview

**Date:** January 17, 2026

---

## 🎯 What We're Building

**Goal**: Connect OMG System and SecureVault Docs (SVD) so users have a seamless experience across both platforms.

---

## 📊 Current State (BEFORE Integration)

```
┌─────────────────────┐         ┌─────────────────────┐
│   OMG System        │         │  SecureVault Docs   │
│   localhost:3000    │         │   localhost:3001    │
├─────────────────────┤         ├─────────────────────┤
│ ✅ Has users         │         │ ✅ Has users         │
│ ✅ Has login         │         │ ✅ Has login         │
│ ✅ Client portal     │         │ ✅ Document storage  │
│ ⚠️ No billing yet    │         │ ⚠️ Has billing       │
│ ⚠️ Can't launch SVD  │         │ ⚠️ Separate login    │
└─────────────────────┘         └─────────────────────┘
         ❌ NOT CONNECTED ❌

Problems:
1. Users must login twice (once to OMG, again to SVD)
2. Users might pay for SVD twice (once direct, once via OMG)
3. User data is separate (no sync between systems)
4. Cannot launch SVD from OMG portal automatically
```

---

## 🎉 Future State (AFTER Integration)

```
┌────────────────────────────────────────────────────┐
│            OMG SYSTEM (Central Hub)                │
│            localhost:3000 / omgsystem.com          │
├────────────────────────────────────────────────────┤
│                                                    │
│  ✅ Single Login (users login once)                │
│  ✅ Unified Billing (all payments here)            │
│  ✅ Client Portal Dashboard                        │
│                                                    │
│  ┌──────────────────────────────────────┐         │
│  │  Product Launch Buttons:             │         │
│  │                                      │         │
│  │  [Launch SecureVault Docs] ──────────┼─────┐  │
│  │  [Launch OMG-CRM]                    │     │  │
│  │  [Launch OMG-IQ]                     │     │  │
│  │  [Launch OMG-Leads]                  │     │  │
│  └──────────────────────────────────────┘     │  │
│                                                │  │
└────────────────────────────────────────────────┼──┘
                                                 │
                      SSO Token (Automatic Login)│
                                                 ↓
                    ┌─────────────────────────────┐
                    │   SecureVault Docs (SVD)    │
                    │   localhost:3001            │
                    ├─────────────────────────────┤
                    │ ✅ Auto-logged in           │
                    │ ✅ User data synced         │
                    │ ✅ Billing via OMG          │
                    │ ✅ Seamless experience      │
                    └─────────────────────────────┘
```

**Benefits:**
1. ✅ **User logs in ONCE** to OMG, automatically logged into SVD
2. ✅ **Users pay ONCE** through OMG, get access to SVD
3. ✅ **User data in ONE place** (shared database)
4. ✅ **Professional experience** - looks like one cohesive platform

---

## 🔧 What Needs to Happen

### **Step 1: Single Sign-On (SSO)**
**Time: 6-8 hours**

**What it does**: User clicks "Launch SVD" in OMG portal → Opens SVD in new tab, already logged in

**Technical details**:
- OMG generates secure token (JWT) with user info
- SVD validates token and creates session
- User seamlessly moves between OMG and SVD

**Requirements from Manager**:
- `SSO_SECRET` key (shared between OMG and SVD)
- Access to SVD codebase to add SSO endpoint
- SVD production URL

---

### **Step 2: Unified Billing**
**Time: 4-6 hours**

**What it does**: All SVD subscriptions managed through OMG System (no duplicate payments)

**Technical details**:
- OMG connects to Stripe
- User subscribes to "Growth" tier in OMG
- OMG writes to `hub.Subscription` table
- SVD reads from `hub.Subscription` to check user's plan
- SVD's own checkout removed (or redirects to OMG)

**Requirements from Manager**:
- Stripe API keys (Secret Key + Webhook Secret)
- Decision: Remove SVD checkout? Or keep both?
- Database connection string for shared `hub.Subscription` table

---

### **Step 3: Shared Database**
**Time: 1-2 hours**

**What it does**: One user account across all products

**Technical details**:
```
PostgreSQL Database
├── core.User (all users across OMG + SVD + other products)
├── hub.Subscription (all subscriptions)
└── securevault.* (SVD-specific data: documents, folders, etc.)
```

**Requirements from Manager**:
- Database connection string
- Confirmation that `core.User` and `hub.Subscription` tables exist
- Or: permission to create them if they don't exist

---

### **Step 4: Upgrade/Downgrade Flow**
**Time: 2-3 hours**

**How Upgrades Work:**
```
User in OMG Portal:
- Clicks "Upgrade to Growth"
- OMG shows pricing options
- User confirms upgrade
- Stripe processes payment
- OMG updates hub.Subscription
- User can immediately launch SVD with new limits

User in SVD:
- Clicks "Upgrade" button in SVD
- Redirects to OMG upgrade page
- User upgrades in OMG
- Redirects back to SVD
- New storage limits active immediately
```

**Downgrade Handling:**
- User exceeding new limits sees warning
- Can delete files or upgrade back
- Uploads disabled until under new limit

---

### **Step 5: Testing & Deployment**
**Time: 6-8 hours**

**What we'll test**:
1. User creates OMG account
2. User subscribes to Growth tier
3. User clicks "Launch SVD"
4. User is auto-logged into SVD
5. SVD shows correct subscription tier
6. User uploads document in SVD
7. User closes SVD, goes back to OMG
8. User clicks Launch SVD again → still logged in
9. User upgrades to Pro → New limits active in SVD
10. User downgrades to Starter → Warning if over limit

---

## 💳 Billing Integration (Detailed)

### **Current State**:
```
Customer → SVD Website → SVD Stripe Checkout → SVD Database
(User pays $14.99/mo directly to SVD)
```

### **Future State** (Recommended):
```
Customer → OMG System → OMG Stripe Checkout → hub.Subscription table
                                                       ↓
                                        SVD reads subscription status
                                                       ↓
                              SVD grants/restricts features based on tier
```

### **Migration Plan for Existing SVD Customers**:

**Option A: Automatic Migration** (Recommended)
1. Export existing SVD customers (email, subscription tier, start date)
2. Import into OMG System's `hub.Subscription` table
3. Mark as "migrated" with original subscription price
4. Existing customers keep their pricing (grandfathered)
5. Future renewals happen through OMG System

**Option B: Manual Migration**
1. Keep existing SVD customers on SVD billing
2. Only new customers go through OMG System
3. Eventually migrate everyone when renewals happen

**Manager's Decision Needed**: [ ] Option A  [ ] Option B

---

## 🔐 Security & Data Privacy

### **What Data is Shared?**
- ✅ User email, name, role
- ✅ Subscription status (active, canceled, etc.)
- ✅ Subscription tier (Starter, Growth, Pro)
- ❌ NOT passwords (each system manages its own sessions)
- ❌ NOT payment details (Stripe manages this)
- ❌ NOT SVD documents (stays in SVD database)

### **How is Data Protected?**
- All communication uses JWT tokens (industry standard)
- Tokens expire after 5 minutes (can't be reused)
- HTTPS required in production (encrypted traffic)
- Shared secret (`SSO_SECRET`) never exposed to users
- Database connection uses SSL encryption

---

## 📈 Business Benefits

### **For Customers**:
1. ✅ **Easier onboarding** - one account, access all products
2. ✅ **Simpler billing** - one subscription, one invoice
3. ✅ **Better UX** - no re-login when switching products
4. ✅ **Clear pricing** - see all products in one place

### **For OMG Systems**:
1. ✅ **Higher conversion** - users can try multiple products easily
2. ✅ **Better retention** - unified platform harder to leave
3. ✅ **Cross-selling** - "Also try OMG-CRM!" in same portal
4. ✅ **Professional image** - looks like enterprise software
5. ✅ **Easier support** - one admin panel, one user database
6. ✅ **Better analytics** - track users across all products

---

## 💰 Cost Analysis

### **Option A: Full Integration** (Recommended)
**Upfront Cost**: 17-25 hours of development (~2-3 days)
**Ongoing Cost**: Zero additional cost
**Benefits**: Full unified platform, best user experience

### **Option B: Minimal Integration**
**Upfront Cost**: 8-10 hours (SSO only, no billing integration)
**Ongoing Cost**: Must maintain two billing systems
**Benefits**: Faster to implement
**Drawbacks**: Users might still pay twice, billing confusion

### **Option C: No Integration**
**Upfront Cost**: Zero
**Ongoing Cost**: Lost sales due to poor UX, duplicate payment issues
**Benefits**: None
**Drawbacks**: Everything stays separate, poor user experience

**Recommended: Option A** - Best long-term ROI

---

## ⏱️ Timeline

**After receiving all required information from manager:**

| Phase | What Gets Built | Requirements | Time | Status |
|-------|----------------|--------------|------|--------|
| **Phase 1** | SSO (Auto-login) | SSO_SECRET + SVD access | 6-8 hours | 🟡 Waiting |
| **Phase 2** | Account Linking | + Database connection | 4-5 hours | 🟡 Waiting |
| **Phase 3** | Billing + Upgrades | + Stripe API keys | 6-9 hours | 🟡 Waiting |
| **Phase 4** | Deployment + Testing | All above | 4-6 hours | 🟡 Waiting |

**Total Time: 20-28 hours** (2.5-3.5 days of focused work)

**Phased Approach:** We can start with just SSO, then add billing later

**Blocker**: Cannot start until we receive at minimum:
- [ ] SSO_SECRET (highest priority)
- [ ] SVD access credentials (repository + admin login)
- [ ] Decision on billing strategy (if doing billing integration)

---

## 🆘 What Manager Needs to Do

### **Immediate Actions** (Can do today):
1. ✅ **Fill out the Quick Checklist** ([MANAGER_QUICK_CHECKLIST.md](MANAGER_QUICK_CHECKLIST.md))
2. ✅ **Make 3 key decisions**:
   - Billing: Hub-only or dual?
   - Database: Shared or separate?
   - SVD checkout: Remove or keep?
3. ✅ **Gather credentials**:
   - SVD admin login
   - Database connection string
   - Stripe API keys
4. ✅ **Send securely** (encrypted email or password manager)

### **Optional Actions** (Can wait):
- Schedule 30-min call to discuss integration architecture
- Review existing SVD customers for migration plan
- Coordinate deployment timeline with SVD hosting provider

---

## 📞 Questions for Manager

**Before we start, please confirm:**

1. **Is SVD currently live with paying customers?**
   - If YES → We need migration plan
   - If NO → We can start fresh

2. **Do you have access to all the required credentials?**
   - If YES → Send them securely and we start immediately
   - If NO → Who should we contact for access?

3. **What's the priority level for this integration?**
   - HIGH → Start within 1-2 days
   - MEDIUM → Start within 1-2 weeks
   - LOW → Plan for future sprint

4. **Are there existing contracts/agreements** with SVD customers that we need to honor?
   - Annual subscriptions at specific prices?
   - Grandfathered pricing?
   - Special enterprise deals?

---

## ✅ Success Metrics

**When integration is complete, we'll have:**

- [x] User creates account on OMG System
- [x] User subscribes to Growth tier ($14.99/mo)
- [x] User clicks "Launch SecureVault Docs"
- [x] New tab opens, user is already logged in
- [x] User uploads document to SVD
- [x] User returns to OMG portal
- [x] User clicks "Launch SVD" again → still logged in (no re-auth)
- [x] User's subscription shows "Growth - Active" in both OMG and SVD
- [x] User can manage subscription from OMG billing page
- [x] If user cancels → SVD access is revoked immediately
- [x] Existing SVD customers migrated with no disruption

---

**Ready to proceed?** → Send completed checklist with credentials (securely)

**Have questions?** → Reply with specific concerns or schedule a call
