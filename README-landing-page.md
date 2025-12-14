# Landing Page Structure / Wireframe

This document outlines the skeleton structure of the homepage/landing page. Use this as a template for creating similar landing pages in other applications.

## Page Structure Overview

```
┌─────────────────────────────────────────────────┐
│ 1. Hero Section                                 │
├─────────────────────────────────────────────────┤
│ 2. Metrics/Trust Bar                            │
├─────────────────────────────────────────────────┤
│ 3. Benefits Section                             │
├─────────────────────────────────────────────────┤
│ 4. Process/How It Works Section                  │
├─────────────────────────────────────────────────┤
│ 5. Product/Feature Showcase Section              │
├─────────────────────────────────────────────────┤
│ 6. Case Studies / Social Proof Section          │
├─────────────────────────────────────────────────┤
│ 7. Automation/Workflows Grid Section            │
├─────────────────────────────────────────────────┤
│ 8. Quote Form / Lead Capture Section            │
├─────────────────────────────────────────────────┤
│ 9. FAQ Section                                  │
├─────────────────────────────────────────────────┤
│ 10. Founder Offer / Special Offer Section       │
├─────────────────────────────────────────────────┤
│ 11. Final CTA Section                           │
└─────────────────────────────────────────────────┘
│ (Overlay) Exit Intent Popup                     │
└─────────────────────────────────────────────────┘
```

## Section Breakdown

### 1. Hero Section
**Component:** `HeroSection`
**Purpose:** Main value proposition and primary call-to-action
**Structure:**
- Headline (H1)
- Subheadline/Description
- Primary CTA Button
- Secondary CTA Button (optional)
- Background (can be gradient, image, or animated)

**Props:**
```typescript
{
  headline: string;
  subhead: string;
  primaryCTA: { label: string; href: string };
  secondaryCTA?: { label: string; href: string };
}
```

---

### 2. Metrics/Trust Bar
**Component:** `MetricsBar`
**Purpose:** Display key metrics, stats, or trust indicators
**Structure:**
- Horizontal bar with multiple metric items
- Each metric: Number + Label
- Usually 3-4 metrics displayed side-by-side

**Props:**
```typescript
{
  metrics: Array<{
    value: string | number;
    label: string;
  }>;
}
```

---

### 3. Benefits Section
**Component:** `HomepageBenefitsSection`
**Purpose:** Highlight key benefits or value propositions
**Structure:**
- Section heading
- Subheading/description
- Grid of benefit cards (typically 3-4 columns)
- Each card: Icon + Title + Description

**Layout:**
- Responsive grid (1 col mobile, 2-3 cols tablet, 3-4 cols desktop)
- Cards with hover effects

---

### 4. Process/How It Works Section
**Component:** `HomepageProcessSection`
**Purpose:** Explain the process or workflow
**Structure:**
- Section heading
- Step-by-step process (typically 3-6 steps)
- Each step: Number/Icon + Title + Description
- Visual flow (horizontal or vertical)

**Layout:**
- Numbered steps with connecting lines/arrows
- Can be horizontal timeline or vertical list

---

### 5. Product/Feature Showcase Section
**Component:** `SecureVaultDocsSection` (or similar)
**Purpose:** Showcase a specific product or key feature
**Structure:**
- Section heading
- Product description
- Key features list
- Visual (screenshot, mockup, or illustration)
- CTA button

**Layout:**
- Split layout: Text on one side, visual on the other
- Alternates left/right on desktop

---

### 6. Case Studies / Social Proof Section
**Component:** `HomepageCaseStudiesSection`
**Purpose:** Display customer success stories or testimonials
**Structure:**
- Section heading
- Grid of case study cards
- Each card: Company logo, testimonial, results/metrics
- Optional: "View all case studies" link

**Layout:**
- Responsive grid (1-2 cols mobile, 2-3 cols desktop)
- Cards with company branding

---

### 7. Automation/Workflows Grid Section
**Component:** `AutomationGrid`
**Purpose:** Display available automations, workflows, or solutions
**Structure:**
- Section heading
- Description
- Grid of automation/workflow cards
- Each card: Icon, Title, Description, Category badge
- "View all" link (optional)

**Props:**
```typescript
{
  title: string;
  description: string;
  showAll?: boolean;
  limit?: number;
}
```

---

### 8. Quote Form / Lead Capture Section
**Component:** `HomepageQuoteFormSection`
**Purpose:** Capture leads with a form
**Structure:**
- Section heading
- Form description
- Contact form fields:
  - Name
  - Email
  - Company (optional)
  - Message/Requirements
  - Submit button
- Privacy notice

**Layout:**
- Centered form with max-width
- Background color different from main page

---

### 9. FAQ Section
**Component:** `HomepageFAQSection`
**Purpose:** Answer common questions
**Structure:**
- Section heading
- Accordion list of FAQs
- Each FAQ: Question (clickable) + Answer (expandable)

**Layout:**
- Accordion component
- Max 2 columns on desktop
- Single column on mobile

---

### 10. Founder Offer / Special Offer Section
**Component:** `HomepageFounderOfferSection`
**Purpose:** Highlight special offer, discount, or founder message
**Structure:**
- Eye-catching heading
- Offer description
- Key benefits list
- CTA button
- Optional: Countdown timer or urgency indicator

**Layout:**
- Highlighted section with distinct background
- Centered content

---

### 11. Final CTA Section
**Component:** `FinalCTASection`
**Purpose:** Final conversion opportunity before footer
**Structure:**
- Compelling headline
- Subheading
- Primary CTA button
- Secondary CTA link (optional)
- Background: Gradient or solid color

**Props:**
```typescript
{
  heading: string;
  subheading: string;
  primaryCTA: { label: string; href: string };
  secondaryCTA?: { label: string; href: string };
}
```

---

### Overlay: Exit Intent Popup
**Component:** `GracefulExitPopup`
**Purpose:** Capture users leaving the page
**Structure:**
- Modal/popup overlay
- Heading
- Offer or message
- Email capture form
- Close button
- Triggers on mouse exit intent

---

## Implementation Notes

### Page Wrapper
```tsx
<div className="min-h-screen bg-white">
  {/* All sections go here */}
</div>
```

### Section Spacing
- Sections typically have consistent vertical padding
- Use Tailwind classes: `py-16`, `py-20`, or `py-24`
- Max-width container: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`

### Responsive Design
- Mobile-first approach
- Breakpoints: `sm:`, `md:`, `lg:`, `xl:`
- Grid layouts adapt: 1 col → 2 cols → 3-4 cols

### SEO Considerations
- Include structured data (JSON-LD) for:
  - Organization
  - Website
  - FAQ (if applicable)
- Meta tags in page metadata
- Semantic HTML (proper heading hierarchy)

---

## Component File Structure

```
src/
├── app/
│   └── page.tsx                    # Main landing page
└── components/
    └── homepage/
        ├── hero-section.tsx
        ├── metrics-bar.tsx
        ├── BenefitsSection.tsx
        ├── ProcessSection.tsx
        ├── securevault-docs-section.tsx
        ├── CaseStudiesSection.tsx
        ├── QuoteFormSection.tsx
        ├── FAQSection.tsx
        ├── FounderOfferSection.tsx
        └── final-cta-section.tsx
```

---

## Quick Start Template

```tsx
import { Metadata } from 'next';
import { HeroSection } from '@/components/homepage/hero-section';
import { MetricsBar } from '@/components/homepage/metrics-bar';
// ... import other sections

export const metadata: Metadata = {
  title: 'Your Landing Page Title',
  description: 'Your landing page description',
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* 1. Hero Section */}
      <HeroSection
        headline="Your Main Headline"
        subhead="Your subheadline description"
        primaryCTA={{ label: "Get Started", href: "/signup" }}
        secondaryCTA={{ label: "Learn More", href: "#benefits" }}
      />

      {/* 2. Metrics Bar */}
      <MetricsBar metrics={yourMetrics} />

      {/* 3. Benefits Section */}
      <HomepageBenefitsSection />

      {/* 4. Process Section */}
      <HomepageProcessSection />

      {/* 5. Product Showcase */}
      <YourProductSection />

      {/* 6. Case Studies */}
      <HomepageCaseStudiesSection />

      {/* 7. Features/Automations Grid */}
      <YourFeaturesGrid />

      {/* 8. Lead Capture Form */}
      <HomepageQuoteFormSection />

      {/* 9. FAQ */}
      <HomepageFAQSection />

      {/* 10. Special Offer */}
      <HomepageFounderOfferSection />

      {/* 11. Final CTA */}
      <FinalCTASection {...yourCTAData} />
    </div>
  );
}
```

---

## Design Patterns

### Color Scheme
- Primary background: `bg-white` or `bg-gray-50`
- Section backgrounds alternate for visual separation
- CTA buttons: Primary brand color
- Text: Dark gray (`text-gray-900`) for headings, lighter for body

### Typography
- Hero headline: `text-4xl md:text-5xl lg:text-6xl font-bold`
- Section headings: `text-3xl md:text-4xl font-bold`
- Body text: `text-base md:text-lg text-gray-600`

### Spacing
- Section padding: `py-16 md:py-20 lg:py-24`
- Container padding: `px-4 sm:px-6 lg:px-8`
- Max width: `max-w-7xl mx-auto`

### Buttons
- Primary: `bg-[brand-color] text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90`
- Secondary: `border-2 border-[brand-color] text-[brand-color] px-6 py-3 rounded-lg font-semibold hover:bg-[brand-color] hover:text-white`

---

## Notes for Implementation

1. **Content First**: Replace placeholder content with your actual messaging
2. **Images**: Add appropriate images, screenshots, or illustrations
3. **Links**: Update all hrefs to point to correct routes
4. **Forms**: Connect forms to your backend/API
5. **Analytics**: Add tracking events for CTAs and form submissions
6. **Testing**: Test on mobile, tablet, and desktop viewports
7. **Performance**: Optimize images and lazy-load below-the-fold content

---

## Customization Tips

- **Reorder sections** based on your conversion funnel
- **Remove sections** that don't apply to your use case
- **Add sections** specific to your product (pricing, integrations, etc.)
- **Modify styling** to match your brand guidelines
- **Adjust spacing** based on content density

---

This wireframe provides the structural foundation. Customize the content, styling, and components to fit your specific application needs.












