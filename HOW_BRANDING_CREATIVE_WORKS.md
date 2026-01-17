# How Branding & Creative Works - User Guide

**Last Updated:** January 16, 2026
**For:** Client Portal Users
**Page:** `/portal/client/branding-creative`

---

## 🎨 What is Branding & Creative?

The Branding & Creative page is your **central hub for all design work**. Think of it like having a design team on-demand.

### Two Main Purposes:

1. **📂 Access Your Brand Assets** - View and download existing designs (logos, colors, fonts, templates)
2. **✨ Request New Design Work** - Ask the OMG team to create something new for you

---

## 📋 Page Layout

When you visit `/portal/client/branding-creative`, you see:

### Top Section - Stats
- **Total Assets** - How many design files you have
- **Active Projects** - Design work currently in progress
- **Completed This Month** - Recently finished projects

### Middle Section - Recent Projects
Cards showing:
- **Q1 Campaign Graphics** - In Progress (65% done)
- **Website Refresh** - Review stage (90% done)
- **Product Launch Assets** - Pending (20% done)

Each shows:
- Project name
- Current status
- Due date
- Progress bar with percentage

### Bottom Section - Brand Assets Library
Grid of your existing assets:
- **Logos** (Primary logo, Secondary logo)
- **Color Palettes** (Brand colors with hex codes)
- **Typography** (Font guidelines)
- **Templates** (Business cards, letterheads)
- **Brand Guidelines** (Full brand guide PDF)

Each asset card shows:
- Asset name and type
- File format (PNG, SVG, PDF, AI)
- File size
- Version number
- Download count
- **Download button** - Get the file
- **View button** - Preview it

### Top Right - Action Button
**"Request Design"** button - Opens the modal to request new work

---

## 🔵 How the "Request Design" Modal Works

Click the purple **"Request Design"** button → Modal pops up with a form.

### The Modal Form - Field by Field

#### 1. **Project Name** *(Required)*
**What it is:** A short title for this design project

**Examples:**
- "Q2 Marketing Campaign"
- "New Logo Redesign"
- "Social Media Graphics Pack"
- "Product Launch Banner"

**Why we need it:** So everyone knows what to call this project

---

#### 2. **Design Type** *(Required - Dropdown)*
**What it is:** What category of design you need

**Options:**
- **Logo Design** - New logo or logo refresh
- **Brand Identity** - Complete brand package (logo, colors, fonts, guidelines)
- **Marketing Materials** - Brochures, flyers, ads, banners
- **Social Media Graphics** - Instagram posts, Facebook banners, profile images
- **Web Design** - Website mockups, landing pages, UI elements
- **Print Design** - Business cards, letterheads, posters, menus
- **Packaging Design** - Product boxes, labels, packaging
- **Other** - Something else (explain in description)

**Why we need it:** Helps assign the right designer and estimate timeline/cost

---

#### 3. **Project Description** *(Required - Large text area)*
**What it is:** Detailed explanation of what you need

**What to include:**
- What you want designed
- Style preferences (modern, classic, minimalist, bold, etc.)
- Color scheme preferences
- Target audience
- Where it will be used
- Any specific requirements

**Good Example:**
```
Need 5 Instagram posts for our product launch on March 1st.
Modern, clean style with bright colors. Target audience is
25-40 year old professionals. Posts should highlight key
features of our new app. Include call-to-action to download
the app.
```

**Bad Example:**
```
Need social media posts
```

**Pro Tip:** The more details you provide, the better the first draft will be! 🎯

---

#### 4. **Deadline** *(Optional - Date Picker)*
**What it is:** When you need it finished

**Examples:**
- Product launch date
- Campaign start date
- Event date
- Website go-live date

**Leave blank if:** No specific deadline, flexible timing

**Pro Tip:** Give at least 1-2 weeks for complex projects

---

#### 5. **Budget** *(Optional - Dropdown)*
**What it is:** How much you want to spend

**Options:**
- **Under $1,000** - Small projects (social posts, simple graphics)
- **$1,000 - $5,000** - Medium projects (logo design, multi-page website mockups)
- **$5,000 - $10,000** - Large projects (full brand identity, complex campaigns)
- **$10,000+** - Major projects (complete rebrands, large campaigns)
- **Flexible** - Open to recommendations

**Why we ask:** Helps scope the project appropriately

**Note:** Final price discussed after reviewing requirements

---

#### 6. **Existing Brand Assets** *(Optional - Text area)*
**What it is:** Tell us what brand materials you already have that we should follow

**Examples:**
- "Use our primary logo (purple version) and brand colors: #A855F7, #3B82F6"
- "Follow the brand guidelines in our Brand Kit (uploaded previously)"
- "Match the style of our website at omgsystem.com"
- "Use Montserrat font for headers, Open Sans for body text"

**Leave blank if:**
- This is a brand new company with no existing materials
- You want completely fresh ideas
- Starting from scratch

**Why we ask:** So the new design matches your existing brand identity

---

## ✅ What Happens When You Submit?

### Step-by-Step Flow:

**1. You Click "Submit Request"**
- Button shows "Submitting..." (grey out, shows loading)
- Form data gets validated
- Sent to the database via API

**2. Request Saves to Database**
- Creates a new `DesignRequest` record
- Status: `PENDING`
- Linked to your user account
- Includes all the info you provided

**3. Success Message Appears**
- Green checkmark ✓
- "Design request submitted successfully!"
- "Our team will review your request and get back to you shortly."
- Modal closes automatically after 2 seconds

**4. OMG Team Gets Notified** *(Coming Soon)*
- Team receives email notification
- Request appears in admin dashboard
- Designer reviews your requirements

**5. Designer Starts Working**
- Status changes to `IN_PROGRESS`
- You get notification: "Your design project has started!"
- Updates appear in your Recent Projects section

**6. Review & Feedback** *(Coming Soon)*
- Designer shares draft for your review
- You can comment and request revisions
- Back-and-forth until you're happy

**7. Project Completed**
- Status changes to `COMPLETED`
- Final files delivered
- Added to your Brand Assets Library
- You can download and use them

---

## 🔄 Current State vs Future Features

### ✅ What Works Right Now (v1.0)

**Page Features:**
- ✅ View all your brand assets
- ✅ Download asset files
- ✅ See recent projects (mock data currently)
- ✅ Click "Request Design" button

**Modal Features:**
- ✅ Fill out design request form
- ✅ All fields work correctly
- ✅ Form validation (required fields)
- ✅ Submit to database
- ✅ Success/error messages
- ✅ Form resets after submit
- ✅ Dark theme styling (#0f172a modal, #1b2335 inputs)

**Backend:**
- ✅ API endpoint `/api/client/design-requests`
- ✅ Data saved to PostgreSQL
- ✅ Linked to your user account
- ✅ Status tracking ready (PENDING/IN_PROGRESS/COMPLETED/CANCELLED)

---

### 🚧 Coming Soon (v2.0 - Future Enhancements)

**Admin Dashboard:**
- 📋 Admin page to view all design requests
- 👤 Assign requests to specific designers
- 📊 Track workload and timelines
- 💰 Generate quotes/invoices from requests

**Client Notifications:**
- 📧 Email when you submit a request
- 📧 Email when designer starts work
- 📧 Email when draft is ready for review
- 📧 Email when project is completed
- 🔔 In-app notifications for all updates

**Collaboration Features:**
- 💬 Comments/messages on requests
- 📎 Attach reference images/files when requesting
- 👀 View in-progress drafts
- ✏️ Request revisions directly on the design
- ⭐ Rate completed projects

**File Management:**
- 📁 Upload files with your request (reference images, sketches, etc.)
- 📁 Download completed files (high-res, multiple formats)
- 🗂️ Organize assets into folders
- 🔍 Search and filter assets
- 📊 Version history (see all versions of a design)

**Advanced Features:**
- 📅 Calendar view of project deadlines
- 📈 Analytics (most downloaded assets, project completion time)
- 🔄 Recurring design requests (monthly social posts, etc.)
- 🎨 Brand guidelines editor
- 👥 Team collaboration (multiple team members can view/comment)

---

## 💡 Example Use Cases

### Scenario 1: Need Social Media Graphics

**You:**
1. Navigate to Branding & Creative page
2. See your existing assets (logo, brand colors)
3. Click "Request Design"
4. Fill the form:
   - **Project Name:** "Instagram Posts - Product Launch"
   - **Design Type:** Social Media Graphics
   - **Description:** "Need 5 Instagram posts announcing our new product. Modern style with purple brand colors. Target 25-45 year olds. Include call-to-action buttons."
   - **Deadline:** February 15, 2026
   - **Budget:** $1,000 - $5,000
   - **Existing Assets:** "Use our purple logo (#A855F7) from the brand kit"
5. Click Submit
6. Get success message

**What Happens:**
- Request saved with status PENDING
- OMG design team sees your request *(when admin dashboard is built)*
- Designer picks it up → status IN_PROGRESS
- Designer creates drafts using your brand colors
- You review and approve
- Final files delivered → status COMPLETED
- Files added to your Brand Assets library
- You download and post to Instagram ✨

---

### Scenario 2: Complete Logo Redesign

**You:**
1. Click "Request Design"
2. Fill the form:
   - **Project Name:** "Company Logo Redesign"
   - **Design Type:** Logo Design
   - **Description:** "Our current logo feels outdated. Want modern, minimalist logo that works in color and black & white. Tech company vibe. Should work on light and dark backgrounds."
   - **Deadline:** March 1, 2026
   - **Budget:** $1,000 - $5,000
   - **Existing Assets:** "Current logo attached (see brand kit). Keep similar color scheme but freshen up."
3. Submit

**What Happens:**
- Designer creates 3-5 logo concepts
- You review concepts *(when messaging is built)*
- Pick your favorite + request tweaks
- Designer refines chosen concept
- Delivers final logo in multiple formats:
  - Full color (PNG, SVG)
  - Black version
  - White version
  - Icon-only version
  - Different sizes
- New logo added to Brand Assets
- You can download anytime

---

### Scenario 3: Monthly Social Media Graphics

**You:**
1. Request Design for January social posts
2. Designer creates them
3. You love the style!
4. Request similar designs each month:
   - Fill form again for February
   - Reference: "Same style as January posts"
   - Provide new content/messaging

**Future:** Will add "Recurring Request" option so you don't have to fill the form each time!

---

## 🤔 Common Questions

### Q: What's the difference between Brand Assets and Design Requests?

**Brand Assets:**
- ✅ Files you **already have**
- ✅ Completed designs
- ✅ Download anytime
- ✅ Use in your marketing

**Design Requests:**
- 📝 Projects you **want created**
- 📝 New designs needed
- 📝 Submit requirements
- 📝 Wait for designer to make them

**Example:**
- You have a logo → That's a **Brand Asset**
- You want business cards made → That's a **Design Request**

---

### Q: How long does a design project take?

**Typical Timelines:**
- **Simple graphics** (social posts, banners): 3-5 business days
- **Logo design**: 1-2 weeks (includes revisions)
- **Full brand identity**: 2-4 weeks
- **Complex projects** (websites, campaigns): 4-8 weeks

**Factors that affect timeline:**
- Complexity of project
- Number of revisions needed
- Your feedback speed
- Designer workload

**Pro Tip:** Provide clear requirements upfront = faster turnaround! 🚀

---

### Q: Can I request changes to the design?

**Yes!** The process includes revisions:

1. Designer creates first draft
2. You review and provide feedback
3. Designer makes changes
4. Repeat until you're happy
5. Final approval → project complete

**Typical revision rounds included:**
- Small projects: 2 revisions
- Medium projects: 3 revisions
- Large projects: 4+ revisions

*(Exact details discussed when project starts)*

---

### Q: What if I need something urgent?

**Options:**

1. **Fill deadline field:** Set your needed date
2. **Explain urgency in description:** "URGENT - needed by [date] for event"
3. **Choose higher budget:** Rush jobs may cost more
4. **Contact support:** For same-day needs, contact team directly

**Note:** Rush fees may apply for 24-48 hour turnaround

---

### Q: How much will my project cost?

**Budget field is just an estimate!**

**Actual pricing depends on:**
- Project complexity
- Number of deliverables
- Revision rounds
- Timeline (rush = higher cost)
- Usage rights needed

**Process:**
1. You submit request with budget range
2. Designer reviews requirements
3. Provides detailed quote
4. You approve before work starts
5. No surprises! 💰

---

### Q: What file formats will I receive?

**Typical deliverables:**

**For Logos:**
- PNG (transparent background)
- SVG (vector, scalable)
- AI or EPS (editable source files)
- Multiple sizes
- Color variations

**For Social Media:**
- PNG or JPG (optimized for platform)
- Correct dimensions (1080x1080 for Instagram, etc.)
- Sometimes editable templates (Canva, Figma)

**For Print:**
- High-resolution PDF
- CMYK color mode
- Print-ready with bleed
- Source files (PSD, AI)

**All files saved to your Brand Assets library!**

---

### Q: Can I upload reference images?

**Currently:** Describe in words what you're looking for

**Coming Soon:**
- ✅ Upload reference images
- ✅ Attach sketches
- ✅ Share inspiration links
- ✅ Provide brand guidelines PDF

**Workaround for now:**
- Provide links in the "Existing Assets" field
- Email references to your account manager
- Share via your preferred communication channel

---

### Q: Who owns the design files?

**You do!** Once paid:

- ✅ Full ownership of designs
- ✅ Use them however you want
- ✅ Edit them if needed
- ✅ No additional licensing fees

**We retain:**
- ❌ No rights to use your designs
- ✅ Right to show in our portfolio (unless you request otherwise)

---

### Q: What if I don't like the design?

**Process:**

1. **Give specific feedback:** What exactly don't you like?
2. **Request revisions:** Designer makes changes
3. **Review again:** Repeat until satisfied

**If still not happy:**
- Discuss concerns with account manager
- May assign different designer
- Work together to find solution

**Goal:** You should LOVE your final design! ❤️

---

## 🎯 Tips for Great Design Requests

### ✅ DO:

**Be Specific:**
- ❌ "Make a logo"
- ✅ "Modern tech logo with purple and blue, should work on dark backgrounds"

**Provide Context:**
- ❌ "Need social posts"
- ✅ "Need 5 Instagram posts for product launch targeting young professionals"

**Share Examples:**
- ❌ "Something cool"
- ✅ "Similar style to [competitor website], but with our brand colors"

**Set Realistic Deadlines:**
- ❌ "Need in 2 hours"
- ✅ "Need by Feb 15 for campaign launch"

**Include Brand Guidelines:**
- ❌ No mention of existing brand
- ✅ "Follow our brand colors: #A855F7 and #3B82F6, use Montserrat font"

---

### ❌ DON'T:

**Be Vague:**
- "Make it pop" - What does that mean?
- "Something professional" - What industry? What style?

**Forget Dimensions:**
- "Need banner" - For web? Print? What size?

**Skip the Audience:**
- Who is this for? Age? Industry? Preferences?

**Rush Without Reason:**
- "Urgent!" but no actual deadline explained

**Contradict Yourself:**
- "Modern but classic, bold but subtle, colorful but minimal"

---

## 🔧 Technical Details (For Developers)

### Architecture

**Frontend:**
- Page: `src/app/portal/client/branding-creative/page.tsx`
- Modal: `src/components/portal/DesignRequestModal.tsx`
- Hook: `src/hooks/useDesignRequests.ts`
- Hook: `src/hooks/useBrandAssets.ts`

**Backend:**
- API: `src/app/api/client/design-requests/route.ts`
- API: `src/app/api/client/brand-assets/route.ts`
- Database: `design_requests` table in PostgreSQL
- Database: `brand_assets` table in PostgreSQL

**Submission Flow:**
```
User fills modal form
        ↓
Modal calls onSubmit prop
        ↓
Parent component's createDesignRequest()
        ↓
POST /api/client/design-requests
        ↓
API validates with Zod schema
        ↓
Saves to PostgreSQL
        ↓
Returns success response
        ↓
Modal shows success message
        ↓
Form resets, modal closes
```

**Database Schema:**
```sql
design_requests (
  id UUID PRIMARY KEY,
  userId UUID REFERENCES users(id),
  projectName TEXT NOT NULL,
  designType TEXT NOT NULL,
  description TEXT NOT NULL,
  deadline TIMESTAMP,
  budget TEXT,
  existingAssets TEXT,
  status ENUM(PENDING, IN_PROGRESS, COMPLETED, CANCELLED),
  createdAt TIMESTAMP,
  updatedAt TIMESTAMP
)
```

---

## 📞 Need Help?

**Questions about:**
- What to include in your request
- Pricing estimates
- Project timelines
- File formats
- Revisions

**Contact:**
- Visit the **Support** section in client portal
- Email your account manager
- Click the chat icon (bottom right)
- Submit a support ticket

---

## 📚 Related Documentation

- **[Complete Implementation Guide](DESIGN_REQUESTS_IMPLEMENTATION.md)** - Technical details
- **[API Documentation](API_DOCUMENTATION.md)** - API endpoints *(coming soon)*
- **[Brand Guidelines Template](BRAND_GUIDELINES_TEMPLATE.md)** - How to create brand guidelines *(coming soon)*
- **[Design Process Workflow](DESIGN_WORKFLOW.md)** - Full design process *(coming soon)*

---

**Last Updated:** January 16, 2026
**Version:** 1.0
**Feedback:** If this guide is confusing or missing something, let us know!
