# SecureVault Font Specifications

## Primary Typeface

### Inter

Inter is the primary typeface for SecureVault, chosen for its exceptional legibility across all screen sizes and its professional, modern appearance that conveys trust and security.

| Property | Value |
|----------|-------|
| **Font Family** | Inter |
| **Classification** | Sans-serif, Grotesque |
| **Designer** | Rasmus Andersson |
| **License** | SIL Open Font License 1.1 (Free for commercial use) |
| **Download** | [Google Fonts](https://fonts.google.com/specimen/Inter) |

---

## Font Weights

### Available Weights

| Weight | CSS Value | Usage |
|--------|-----------|-------|
| Thin | `100` | Decorative only (use sparingly) |
| Extra Light | `200` | Large display text |
| Light | `300` | Large headings, hero text |
| Regular | `400` | Body text, paragraphs |
| Medium | `500` | Subheadings, labels, UI elements |
| Semi Bold | `600` | Emphasis, buttons, navigation |
| Bold | `700` | Headings, important text, logo |
| Extra Bold | `800` | Display headings, hero sections |
| Black | `900` | Maximum impact headlines |

### Recommended Weights by Context

| Context | Weight | Example |
|---------|--------|---------|
| Body text | Regular (400) | Paragraph content, descriptions |
| UI labels | Medium (500) | Form labels, captions, metadata |
| Buttons | Semi Bold (600) | Primary and secondary buttons |
| Subheadings | Semi Bold (600) | Section titles, card headers |
| Headings | Bold (700) | Page titles, H1-H3 |
| Logo text | Bold (700) | "SecureVault" wordmark |
| Hero text | Extra Bold (800) | Landing page headlines |

---

## Typography Scale

### Heading Sizes

| Element | Size (Desktop) | Size (Mobile) | Weight | Line Height |
|---------|----------------|---------------|--------|-------------|
| H1 | 48px / 3rem | 36px / 2.25rem | 700 | 1.2 |
| H2 | 36px / 2.25rem | 28px / 1.75rem | 700 | 1.25 |
| H3 | 28px / 1.75rem | 24px / 1.5rem | 600 | 1.3 |
| H4 | 24px / 1.5rem | 20px / 1.25rem | 600 | 1.35 |
| H5 | 20px / 1.25rem | 18px / 1.125rem | 600 | 1.4 |
| H6 | 18px / 1.125rem | 16px / 1rem | 600 | 1.4 |

### Body Text Sizes

| Type | Size | Weight | Line Height | Letter Spacing |
|------|------|--------|-------------|----------------|
| Body Large | 18px / 1.125rem | 400 | 1.75 | 0 |
| Body Default | 16px / 1rem | 400 | 1.6 | 0 |
| Body Small | 14px / 0.875rem | 400 | 1.5 | 0 |
| Caption | 12px / 0.75rem | 500 | 1.4 | 0.02em |
| Overline | 11px / 0.6875rem | 500 | 1.4 | 0.1em |

---

## Font Stack

### CSS Implementation

```css
/* Primary font stack */
--font-family-primary: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;

/* Monospace font stack (for code) */
--font-family-mono: 'JetBrains Mono', 'Fira Code', 'SF Mono', Monaco, 'Cascadia Code', Consolas, 'Liberation Mono', 'Courier New', monospace;
```

### System Font Fallbacks

When Inter is not available, the following system fonts provide similar appearance:

| Platform | System Font |
|----------|-------------|
| macOS/iOS | SF Pro Text, -apple-system |
| Windows | Segoe UI |
| Android | Roboto |
| Linux | Liberation Sans, DejaVu Sans |

---

## Loading Inter

### Google Fonts (Recommended)

```html
<!-- Preconnect for performance -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

<!-- Load Inter with required weights -->
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
```

### Self-Hosted

Download Inter from [Google Fonts](https://fonts.google.com/specimen/Inter) or [rsms.me/inter](https://rsms.me/inter/) and host locally:

```css
@font-face {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url('/fonts/Inter-Regular.woff2') format('woff2'),
       url('/fonts/Inter-Regular.woff') format('woff');
}

@font-face {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  font-display: swap;
  src: url('/fonts/Inter-Medium.woff2') format('woff2'),
       url('/fonts/Inter-Medium.woff') format('woff');
}

@font-face {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 600;
  font-display: swap;
  src: url('/fonts/Inter-SemiBold.woff2') format('woff2'),
       url('/fonts/Inter-SemiBold.woff') format('woff');
}

@font-face {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url('/fonts/Inter-Bold.woff2') format('woff2'),
       url('/fonts/Inter-Bold.woff') format('woff');
}

@font-face {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 800;
  font-display: swap;
  src: url('/fonts/Inter-ExtraBold.woff2') format('woff2'),
       url('/fonts/Inter-ExtraBold.woff') format('woff');
}
```

### Variable Font (Advanced)

For optimal flexibility and smaller file size, use the variable font:

```css
@font-face {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 100 900;
  font-display: swap;
  src: url('/fonts/Inter-VariableFont.woff2') format('woff2-variations');
}
```

---

## Secondary Typeface (Code/Monospace)

### JetBrains Mono

Used for code snippets, technical documentation, and terminal output.

| Property | Value |
|----------|-------|
| **Font Family** | JetBrains Mono |
| **Classification** | Monospace |
| **License** | SIL Open Font License 1.1 |
| **Download** | [JetBrains](https://www.jetbrains.com/lp/mono/) |

### Monospace Typography

| Context | Size | Weight | Line Height |
|---------|------|--------|-------------|
| Code blocks | 14px | 400 | 1.6 |
| Inline code | 14px | 400 | inherit |
| Terminal | 13px | 400 | 1.5 |

---

## Paragraph Styles

### Maximum Line Length

For optimal readability:
- **Body text:** 65-75 characters per line (approximately 600-700px)
- **Wide layouts:** Maximum 85 characters
- **Narrow columns:** Minimum 45 characters

### Paragraph Spacing

| Element | Margin Bottom |
|---------|---------------|
| Paragraph | 1.5em (24px at 16px base) |
| Heading followed by paragraph | 0.75em |
| List item | 0.5em |

---

## Logo Typography

### "SecureVault" Wordmark

| Property | Value |
|----------|-------|
| Font | Inter Bold (700) |
| Size | 32px (primary logo) |
| Color (Light) | "Secure" in Slate 900, "Vault" in Indigo 600 |
| Color (Dark) | "Secure" in Slate 50, "Vault" in Indigo 400 |
| Letter Spacing | 0 (normal) |

### Tagline "DOCUMENT SECURITY"

| Property | Value |
|----------|-------|
| Font | Inter Medium (500) |
| Size | 12px |
| Color | Slate 500 (`#64748B`) |
| Letter Spacing | 0.1em (2px) |
| Text Transform | Uppercase |

---

## Accessibility Guidelines

### Minimum Font Sizes

| Context | Minimum Size |
|---------|--------------|
| Body text | 16px |
| Small text / captions | 12px |
| Interactive elements | 14px |
| Mobile body text | 16px (prevent zoom on iOS) |

### Contrast Requirements

All text must meet WCAG 2.1 AA standards:
- Normal text: 4.5:1 contrast ratio minimum
- Large text (18px+ bold, 24px+ regular): 3:1 contrast ratio minimum

### Line Height

- Body text: Minimum 1.5 line height
- Headings: Minimum 1.2 line height
- Never use `line-height: 1` for multi-line text

---

## CSS Custom Properties

```css
:root {
  /* Font Families */
  --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --font-mono: 'JetBrains Mono', 'Fira Code', Consolas, monospace;

  /* Font Sizes */
  --text-xs: 0.75rem;     /* 12px */
  --text-sm: 0.875rem;    /* 14px */
  --text-base: 1rem;      /* 16px */
  --text-lg: 1.125rem;    /* 18px */
  --text-xl: 1.25rem;     /* 20px */
  --text-2xl: 1.5rem;     /* 24px */
  --text-3xl: 1.75rem;    /* 28px */
  --text-4xl: 2.25rem;    /* 36px */
  --text-5xl: 3rem;       /* 48px */

  /* Font Weights */
  --font-normal: 400;
  --font-medium: 500;
  --font-semibold: 600;
  --font-bold: 700;
  --font-extrabold: 800;

  /* Line Heights */
  --leading-none: 1;
  --leading-tight: 1.25;
  --leading-snug: 1.375;
  --leading-normal: 1.5;
  --leading-relaxed: 1.625;
  --leading-loose: 2;

  /* Letter Spacing */
  --tracking-tighter: -0.05em;
  --tracking-tight: -0.025em;
  --tracking-normal: 0;
  --tracking-wide: 0.025em;
  --tracking-wider: 0.05em;
  --tracking-widest: 0.1em;
}
```

---

## Typography Don'ts

- **Don't** use font weights below 400 for body text
- **Don't** use all caps for paragraphs or long text
- **Don't** use more than 2-3 font weights on a single page
- **Don't** set line height below 1.4 for body text
- **Don't** use justified text alignment (causes uneven spacing)
- **Don't** use condensed or extended versions of Inter
- **Don't** mix Inter with other sans-serif fonts
- **Don't** use font sizes below 12px for any readable text

---

## Print Typography

For print materials, use the following specifications:

| Element | Size (pt) | Weight | Leading |
|---------|-----------|--------|---------|
| Body | 10-11pt | Regular | 14pt |
| Captions | 8-9pt | Medium | 11pt |
| Headings | 14-24pt | Bold | 1.2× size |
| Logo | Minimum 9pt for tagline | | |

### Print Font Files

For print production, use OpenType (.otf) or TrueType (.ttf) font files:
- Download from [rsms.me/inter](https://rsms.me/inter/)
- Install fonts locally for use in design software

---

## File Information

**Created:** 2025
**Version:** 1.0
**Last Updated:** 2025-11-22
**Primary Typeface:** Inter
**Secondary Typeface:** JetBrains Mono

For questions about typography, consult the design team or refer to the brand guidelines.
