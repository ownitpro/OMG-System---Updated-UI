# SecureVault Docs Page Layout Template

This document outlines the layout structure of the SecureVault Docs page (`/apps/securevault-docs/page.tsx`) so you can use it as a template for building new app pages.

## Page Structure Overview

The page follows this section order:

1. **Hero Section** - Large, centered hero with CTA buttons
2. **Problem Section** - Grid of pain points
3. **Solution Section** - Problem/Solution pairs
4. **Business Features Section** - Features grid + outcomes + CTAs
5. **Personal Features Section** - Features grid + outcomes + CTAs
6. **How It Works** - 3-step process
7. **Security Section** - Security features grid
8. **Connectors & Automations** - Expandable details sections
9. **Pricing Overview** - Two-column pricing cards
10. **Proof & Outcomes** - Testimonials/metrics grid
11. **FAQs** - Expandable FAQ accordion
12. **Final CTA** - Large gradient CTA section
13. **Footer Note** - Simple footer

---

## Detailed Section Breakdown

### 1. Hero Section
```tsx
<section className="relative py-20 bg-gradient-to-br from-emerald-50 via-lime-50 to-green-50 overflow-hidden">
  {/* Animated Background */}
  <div className="absolute inset-0 opacity-10">
    {/* Gradient blob animation */}
  </div>
  
  <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    {/* Icon */}
    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-emerald-500 to-lime-500 rounded-2xl mb-6 shadow-lg">
      <Icon className="w-10 h-10 text-white" />
    </div>
    
    {/* Title */}
    <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-4">
      App Name
    </h1>
    
    {/* Tagline */}
    <p className="text-3xl md:text-4xl text-emerald-600 font-semibold mb-6">
      Tagline here
    </p>
    
    {/* Description */}
    <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
      Description text
    </p>
    
    {/* CTA Buttons */}
    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-4">
      <Link href="..." className="...">Primary CTA</Link>
      <Link href="..." className="...">Secondary CTA</Link>
    </Link>
    
    {/* Tertiary Link */}
    <Link href="..." className="...">Tertiary Link</Link>
  </div>
</section>
```

**Key Classes:**
- `relative py-20` - Section padding
- `bg-gradient-to-br from-emerald-50 via-lime-50 to-green-50` - Gradient background
- `max-w-6xl mx-auto` - Centered container
- `text-center` - Centered text

---

### 2. Problem Section
```tsx
<section className="py-16 bg-gray-50">
  <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
      Why People Struggle Today
    </h2>
    
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {problems.map((problem, index) => (
        <div key={index} className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
          <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
            <Icon className="w-6 h-6 text-gray-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{problem.title}</h3>
          <p className="text-gray-600">{problem.description}</p>
        </div>
      ))}
    </div>
  </div>
</section>
```

**Key Classes:**
- `bg-gray-50` - Light gray background
- `grid md:grid-cols-2 lg:grid-cols-3 gap-6` - Responsive grid
- `bg-white rounded-xl p-6 shadow-md` - Card styling

---

### 3. Solution Section
```tsx
<section className="py-16 bg-white">
  <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
      What App Solves
    </h2>
    
    <div className="space-y-4">
      {solutions.map((item, index) => (
        <div key={index} className="grid md:grid-cols-2 gap-6 bg-gradient-to-r from-gray-50 to-emerald-50 rounded-xl p-6 border border-emerald-100">
          <div className="flex items-start">
            <XMarkIcon className="w-6 h-6 text-red-500 mr-3 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Problem</h3>
              <p className="text-gray-600">{item.problem}</p>
            </div>
          </div>
          <div className="flex items-start">
            <CheckCircleIcon className="w-6 h-6 text-emerald-500 mr-3 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Solution</h3>
              <p className="text-gray-600">{item.solution}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
```

**Key Classes:**
- `bg-gradient-to-r from-gray-50 to-emerald-50` - Subtle gradient
- `grid md:grid-cols-2 gap-6` - Two-column layout

---

### 4. Business Features Section
```tsx
<section className="py-16 bg-blue-50">
  <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4">
      Built for [Target Audience]
    </h2>
    <p className="text-center text-gray-600 mb-12">
      Description text
    </p>
    
    {/* Features Grid */}
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
      {features.map((feature, index) => (
        <div key={index} className="bg-white rounded-xl p-6 shadow-md">
          <Icon className="w-8 h-8 text-blue-600 mb-3" />
          <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
          <p className="text-sm text-gray-600">{feature.description}</p>
        </div>
      ))}
    </div>
    
    {/* Outcomes Metrics */}
    <div className="grid md:grid-cols-4 gap-6 mb-8">
      {outcomes.map((outcome, index) => (
        <div key={index} className="text-center">
          <div className="text-3xl font-bold text-blue-600 mb-2">{outcome.metric}</div>
          <div className="text-gray-700">{outcome.label}</div>
        </div>
      ))}
    </div>
    
    {/* CTAs */}
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <Link href="..." className="...">Primary CTA</Link>
      <Link href="..." className="...">Secondary CTA</Link>
    </div>
  </div>
</section>
```

---

### 5. How It Works Section
```tsx
<section className="py-16 bg-white">
  <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
      How It Works
    </h2>
    
    <div className="grid md:grid-cols-3 gap-8">
      {steps.map((step, index) => (
        <div key={index} className="text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-lime-500 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl font-bold text-white shadow-lg">
            {step.step}
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
          <p className="text-gray-600">{step.description}</p>
        </div>
      ))}
    </div>
  </div>
</section>
```

---

### 6. Security Section
```tsx
<section className="py-16 bg-gray-50">
  <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
      Security in Plain English
    </h2>
    
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {securityFeatures.map((feature, index) => (
        <div key={index} className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
          <Icon className="w-8 h-8 text-emerald-600 mb-3" />
          <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
          <p className="text-sm text-gray-600">{feature.description}</p>
        </div>
      ))}
    </div>
  </div>
</section>
```

---

### 7. Connectors & Automations Section
```tsx
<section className="py-16 bg-white">
  <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
      Connectors & Automations
    </h2>
    
    <div className="space-y-4">
      {connectors.map((connector, index) => (
        <details key={index} className="bg-gray-50 rounded-xl p-6 border border-gray-200">
          <summary className="cursor-pointer font-semibold text-gray-900 text-lg flex items-center justify-between">
            <span>{connector.category}</span>
            <ChevronDownIcon className="w-5 h-5 text-gray-500" />
          </summary>
          <div className="mt-4 flex flex-wrap gap-2">
            {connector.items.map((item, itemIndex) => (
              <span key={itemIndex} className="px-3 py-1 bg-white rounded-full text-sm text-gray-700 border border-gray-200">
                {item}
              </span>
            ))}
          </div>
        </details>
      ))}
    </div>
  </div>
</section>
```

---

### 8. Pricing Overview Section
```tsx
<section className="py-16 bg-gradient-to-br from-emerald-50 to-lime-50">
  <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
      Pricing Overview
    </h2>
    
    <div className="grid md:grid-cols-2 gap-8">
      {pricingPlans.map((plan, index) => (
        <div key={index} className="bg-white rounded-2xl p-8 shadow-lg">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">{plan.name}</h3>
          <p className="text-gray-600 mb-6">{plan.description}</p>
          <Link href="..." className="...">View Detailed Pricing</Link>
        </div>
      ))}
    </div>
  </div>
</section>
```

---

### 9. Proof & Outcomes Section
```tsx
<section className="py-16 bg-white">
  <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
      Real Results
    </h2>
    
    <div className="grid md:grid-cols-3 gap-8">
      {testimonials.map((testimonial, index) => (
        <div key={index} className="bg-gradient-to-br from-emerald-50 to-lime-50 rounded-xl p-8 text-center border border-emerald-100">
          <p className="text-lg text-gray-700 italic mb-4">"{testimonial.quote}"</p>
          <p className="text-sm font-semibold text-emerald-600">{testimonial.metric}</p>
        </div>
      ))}
    </div>
  </div>
</section>
```

---

### 10. FAQs Section
```tsx
<section className="py-16 bg-gray-50">
  <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
      Frequently Asked Questions
    </h2>
    
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <details
          key={index}
          className="bg-white rounded-xl p-6 border border-gray-200"
          open={openFAQ === index}
        >
          <summary className="cursor-pointer font-semibold text-gray-900 text-lg flex items-center justify-between">
            <span>{faq.question}</span>
            <ChevronDownIcon className="w-5 h-5 text-gray-500" />
          </summary>
          <p className="mt-4 text-gray-600">{faq.answer}</p>
        </details>
      ))}
    </div>
  </div>
</section>
```

---

### 11. Final CTA Section
```tsx
<section className="py-20 bg-gradient-to-r from-emerald-600 to-lime-600 text-white relative overflow-hidden">
  <div className="absolute inset-0 opacity-10">
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white rounded-full blur-3xl"></div>
  </div>
  
  <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <h2 className="text-4xl md:text-5xl font-bold mb-6">
      Ready to [Action]?
    </h2>
    
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <Link href="..." className="...">Primary CTA</Link>
      <Link href="..." className="...">Secondary CTA</Link>
      <Link href="..." className="...">Tertiary CTA</Link>
    </div>
  </div>
</section>
```

**Key Classes:**
- `bg-gradient-to-r from-emerald-600 to-lime-600` - Strong gradient background
- `text-white` - White text on gradient
- `relative overflow-hidden` - For background effects

---

### 12. Footer Note
```tsx
<div className="bg-gray-900 text-gray-400 py-4 text-center text-sm">
  <p>Powered by OMGSystems — 2025</p>
</div>
```

---

## Common Patterns

### Container Pattern
```tsx
<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
  {/* Content */}
</div>
```

### Section Spacing
- `py-16` - Standard section padding
- `py-20` - Hero/final CTA padding
- `mb-12` - Standard margin below headings

### Grid Patterns
- `grid md:grid-cols-2 lg:grid-cols-3 gap-6` - Responsive 3-column
- `grid md:grid-cols-2 gap-8` - Two-column layout
- `grid md:grid-cols-4 gap-6` - Four-column metrics

### Card Pattern
```tsx
<div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
  {/* Card content */}
</div>
```

### CTA Button Pattern
```tsx
<Link
  href="..."
  className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-emerald-500 to-lime-500 text-white font-bold rounded-xl hover:from-emerald-600 hover:to-lime-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
>
  Button Text
  <ArrowRightIcon className="w-5 h-5 ml-2" />
</Link>
```

---

## Color Scheme

- **Primary Gradient**: `from-emerald-500 to-lime-500` / `from-emerald-600 to-lime-600`
- **Light Background**: `bg-emerald-50`, `bg-lime-50`, `bg-green-50`
- **Text**: `text-gray-900` (headings), `text-gray-600` (body)
- **Accents**: `text-emerald-600` (taglines, links)
- **Backgrounds**: `bg-white`, `bg-gray-50`, `bg-blue-50`, `bg-purple-50`

---

## Responsive Breakpoints

- `sm:` - 640px+
- `md:` - 768px+
- `lg:` - 1024px+

---

## Notes

- The page uses `"use client"` because of the FAQ state management
- All sections use consistent max-width containers (`max-w-6xl`)
- Icons from `@heroicons/react/24/outline`
- Consistent spacing and typography scale throughout

