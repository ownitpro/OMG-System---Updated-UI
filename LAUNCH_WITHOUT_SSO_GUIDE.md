# Launch Without SSO - Configuration Guide

**Date:** January 17, 2026
**Purpose:** Configure OMG System to launch external products (SecureVault Docs, OMG-CRM, etc.) via direct URL links without SSO for initial Monday launch.

---

## ✅ Changes Made

### 1. **Disabled SSO in Product Cards**
- **File:** `src/components/portal/PortalCard.tsx`
- **Change:** Updated default `useSSO` from `true` to `false` (line 339)
- **Effect:** "Launch" buttons now open product URLs directly in new tabs instead of trying to use SSO authentication

### 2. **Removed SSO Prop from Client Portal**
- **File:** `src/app/portal/client/page.tsx`
- **Change:** Removed `useSSO={true}` prop from ProductCardV2 components (line 207)
- **Effect:** Uses the default (false) behavior - simple URL navigation

### 3. **Added Environment Variable Support**
- **File:** `src/config/appLinks.ts`
- **Change:** Updated to use environment variables for production URLs
- **Effect:** Easy configuration for production vs development environments

---

## 🚀 How It Works Now

### **User Flow (Without SSO):**
```
User logs into OMG System
   ↓
User navigates to Client Portal Dashboard
   ↓
User clicks "Launch" on SecureVault Docs card
   ↓
New tab opens to SecureVault Docs URL
   ↓
⚠️ User sees SVD login page (must login again)
```

**Note:** User will need to login separately to each product. This is temporary until SSO is implemented.

---

## ⚙️ Production Configuration

### **Step 1: Add Environment Variables**

Create or update your `.env.local` file (for local testing) or `.env.production` (for production deployment):

```bash
# SecureVault Docs Production URL
NEXT_PUBLIC_SECUREVAULT_DOCS_URL=https://your-actual-svd-domain.com

# Other products (optional - only if deployed)
NEXT_PUBLIC_OMG_CRM_URL=https://crm.omgsystem.com
NEXT_PUBLIC_OMG_LEADS_URL=https://leads.omgsystem.com
NEXT_PUBLIC_OMG_AI_MASTERY_URL=https://ai-mastery.omgsystem.com
NEXT_PUBLIC_OMG_IQ_URL=https://iq.omgsystem.com
```

**Important:**
- Use `NEXT_PUBLIC_` prefix so these variables are available in the browser
- Replace `https://your-actual-svd-domain.com` with the real SVD website URL

### **Step 2: Restart Development Server**

If testing locally:
```bash
npm run dev
```

The app will now use the production URLs from your environment variables.

### **Step 3: Verify Configuration**

1. Login to OMG System portal
2. Navigate to Client Portal Dashboard
3. Click "Launch" on SecureVault Docs
4. New tab should open to your production SVD URL
5. User will see SVD login page (expected behavior without SSO)

---

## 📋 Example Configuration

### **For Development (Local Testing):**
No environment variables needed - uses localhost:
- SecureVault Docs: `http://localhost:3001`
- OMG-CRM: `http://localhost:3002`
- OMG-Leads: `http://localhost:3003`
- OMG-AI-Mastery: `http://localhost:3004`
- OMG-IQ: `http://localhost:3005`

### **For Production:**
Add to `.env.production` or Vercel/deployment platform:
```bash
NEXT_PUBLIC_SECUREVAULT_DOCS_URL=https://securevault.omgsystem.com
NEXT_PUBLIC_OMG_CRM_URL=https://crm.omgsystem.com
NEXT_PUBLIC_OMG_LEADS_URL=https://leads.omgsystem.com
NEXT_PUBLIC_OMG_AI_MASTERY_URL=https://ai-mastery.omgsystem.com
NEXT_PUBLIC_OMG_IQ_URL=https://iq.omgsystem.com
```

---

## 🔄 Re-enabling SSO Later

When you're ready to implement SSO (after receiving SSO_SECRET from manager):

### **Step 1: Update Default in PortalCard.tsx**
```typescript
// Change from:
useSSO = false, // SSO disabled for initial launch

// To:
useSSO = true, // SSO enabled - ready for production
```

### **Step 2: Implement SSO API**
Follow the implementation guide in:
- `ACCOUNT_LINKING_SOLUTION.md`
- `UPGRADE_FLOW_SOLUTION.md`
- `MANAGER_INFORMATION_NEEDED.md`

### **Step 3: Add SSO Endpoint to SVD**
Coordinate with manager to add SSO endpoint to SecureVault Docs codebase.

---

## ⚠️ Current Limitations (Without SSO)

### **What Users Will Experience:**

1. **No Automatic Login**
   - User must login to OMG System
   - User must also login to SecureVault Docs separately
   - Two separate login sessions

2. **No Account Linking Detection**
   - If user has different emails in OMG vs SVD, system won't detect it
   - Risk of duplicate accounts (user might subscribe twice)

3. **No Unified Session**
   - Logout from OMG doesn't logout from SVD
   - Separate session management

4. **Manual Subscription Management**
   - User manages OMG subscription in OMG
   - User manages SVD subscription in SVD
   - No automatic sync between systems

### **What Still Works:**

✅ User can launch products from OMG dashboard
✅ Products open in new tabs
✅ Clean user interface
✅ Product cards show correct status (active/locked/coming soon)
✅ All OMG System features work independently

---

## 🎯 Monday Launch Checklist

- [ ] Update `.env.local` with production SVD URL
- [ ] Test launch button in local development
- [ ] Verify new tab opens to correct SVD URL
- [ ] Confirm SVD login page displays correctly
- [ ] Deploy OMG System to production
- [ ] Add production environment variables to deployment platform (Vercel/Netlify/etc.)
- [ ] Test production deployment
- [ ] Verify all product launch URLs work
- [ ] Document that users need to login separately to each product

---

## 📞 Questions to Answer Before Launch

### **1. What is the production URL for SecureVault Docs?**
Example: `https://securevault.omgsystem.com` or `https://docs.securevault.com`

**Add to `.env.local`:**
```bash
NEXT_PUBLIC_SECUREVAULT_DOCS_URL=https://_______________
```

### **2. Are other products deployed yet?**
- [ ] OMG-CRM - URL: `_______________`
- [ ] OMG-Leads - URL: `_______________`
- [ ] OMG-AI-Mastery - URL: `_______________`
- [ ] OMG-IQ - URL: `_______________`

**If NO:** Leave as localhost URLs (users will see them as "Locked" or "Coming Soon")

### **3. Should users be able to purchase products yet?**
- [ ] YES - Stripe checkout ready
- [ ] NO - Show "Coming Soon" or "Contact Sales"

**If NO:** Products will show as locked, "Unlock" button goes to product detail page only.

---

## 🔧 Troubleshooting

### **Problem: Launch button does nothing**
**Solution:** Check browser console for errors. Ensure `launchUrl` is defined in `productCatalog.ts`

### **Problem: Opens to localhost in production**
**Solution:** Environment variables not configured. Add `NEXT_PUBLIC_SECUREVAULT_DOCS_URL` to deployment platform.

### **Problem: CORS error when opening SVD**
**Solution:** This is normal without SSO. User will see SVD login page. SVD must allow being opened in new tab (check if it has `X-Frame-Options` header blocking iframes).

### **Problem: User complains about double login**
**Expected:** Without SSO, users must login twice. Explain this is temporary and SSO is coming after launch.

---

## 📝 Communication to Users

### **Support Article: Accessing SecureVault Docs**

**Title:** How to Access SecureVault Docs from Your OMG Dashboard

**Content:**
```
After logging into your OMG System account:

1. Navigate to your Client Portal Dashboard
2. Find the "SecureVault Docs" card
3. Click the "Launch" button
4. A new tab will open to SecureVault Docs
5. Login to SecureVault Docs with your SVD credentials

Note: At this time, you need to login separately to SecureVault Docs.
We're working on single sign-on (SSO) to make this seamless in a future update.

If you don't have a SecureVault Docs account yet:
- Click "Unlock" on the SecureVault Docs card
- Follow the signup process
- Once activated, use the "Launch" button to access it
```

---

## ✅ Summary

**What's Ready for Monday Launch:**
- ✅ Users can click "Launch" to open products in new tabs
- ✅ Simple URL-based navigation (no complex SSO logic)
- ✅ Easy to configure production URLs via environment variables
- ✅ Fallback to localhost for development

**What's NOT Ready (Will be added later with SSO):**
- ❌ Automatic login to external products
- ❌ Account linking between OMG and SVD
- ❌ Unified session management
- ❌ Single logout across all products

**Timeline:**
- **Monday:** Launch without SSO (manual login required)
- **Later:** Implement SSO when manager provides SSO_SECRET and SVD access

---

**Last Updated:** January 17, 2026
**Status:** Ready for Monday production launch (without SSO)
