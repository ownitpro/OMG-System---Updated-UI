# SecureVault Brand Assets

This folder contains the complete brand identity package for SecureVault, including logos, color specifications, and usage guidelines.

## Contents

### Logo Files

All logos are provided in SVG format for scalability and professional use.

#### Primary Logos
- **securevault-logo-primary.svg** - Full horizontal logo with icon and text (default)
- **securevault-logo-horizontal-light.svg** - Optimized for light backgrounds
- **securevault-logo-horizontal-dark.svg** - Optimized for dark backgrounds

#### Alternative Formats
- **securevault-logo-icon-only.svg** - Icon/symbol only (square format)
- **securevault-logo-wordmark.svg** - Text only, no icon
- **securevault-logo-stacked.svg** - Vertical layout with icon above text

#### Monochrome Versions
- **securevault-logo-monochrome-black.svg** - Single color black version
- **securevault-logo-monochrome-white.svg** - Single color white version (for dark backgrounds)

#### Special Use
- **securevault-favicon.svg** - Simplified icon for favicon and app icons (32x32)

### Documentation
- **COLOR-SPECIFICATIONS.md** - Complete color palette with hex, RGB, HSL, and CMYK values
- **FONT-SPECIFICATIONS.md** - Typography guidelines, font families, sizes, and weights

## Logo Usage Guidelines

### Minimum Size
- Horizontal logos: 120px wide minimum (digital) / 0.75 inches (print)
- Icon only: 32px minimum (digital) / 0.25 inches (print)
- Stacked logo: 150px wide minimum

### Clear Space
Maintain clear space around all logos equal to the height of the vault icon. Do not place other elements within this clear space.

### Backgrounds
- Use **horizontal-light.svg** on white or light backgrounds
- Use **horizontal-dark.svg** on dark backgrounds or photos
- Use **monochrome** versions when color reproduction is limited

### When to Use Each Logo

| Logo Type | Use Case |
|-----------|----------|
| Primary | Website headers, presentations, marketing materials |
| Icon Only | App icons, favicons, social media avatars, small spaces |
| Wordmark | Secondary placements, footer, watermarks |
| Stacked | Print materials, square formats, badges |
| Monochrome | Single-color printing, embossing, etching |
| Favicon | Browser tabs, bookmarks, mobile home screens |

## Color Palette Quick Reference

### Primary Brand Color
- **Indigo 600:** `#4F46E5` - Primary buttons, links, brand accent

### Neutral Colors
- **Slate 900:** `#0F172A` - Primary text, dark backgrounds
- **Slate 500:** `#64748B` - Secondary text
- **Slate 50:** `#F8FAFC` - Light backgrounds

### Semantic Colors
- **Success:** `#16A34A` (Green 600)
- **Warning:** `#D97706` (Amber 600)
- **Error:** `#DC2626` (Red 600)
- **Info:** `#2563EB` (Blue 600)

See [COLOR-SPECIFICATIONS.md](./COLOR-SPECIFICATIONS.md) for complete color palette and usage guidelines.

## Typography Quick Reference

### Primary Font
- **Inter** - Used for all UI text, headings, and body copy
- Weights: Regular (400), Medium (500), Semi Bold (600), Bold (700)

### Secondary Font
- **JetBrains Mono** - Used for code snippets and technical content

See [FONT-SPECIFICATIONS.md](./FONT-SPECIFICATIONS.md) for complete typography guidelines.

## File Formats

### Current Format: SVG
All logos are provided as SVG (Scalable Vector Graphics) for the following benefits:
- Infinite scalability without quality loss
- Small file sizes
- Easy to edit in vector software
- Web-ready and accessible

### Converting to Other Formats

#### To PNG (Raster)
Use vector graphics software or online converters:
- **Small:** 256px - 512px (web, social media)
- **Medium:** 1024px - 2048px (presentations, documents)
- **Large:** 4096px+ (print, large format)
- Export with transparent background for versatility

#### To PDF
Import SVG into Adobe Illustrator or Inkscape and save as PDF for print.

#### To ICO (Favicon)
Use favicon generators with the favicon.svg file to create multi-resolution .ico files.

## Brand Guidelines

### Do's
- Use approved logo files without modification
- Maintain proper clear space
- Use appropriate logo variant for background
- Ensure minimum size requirements are met
- Use colors from the approved palette

### Don'ts
- Do not stretch, skew, or distort logos
- Do not change logo colors outside approved variants
- Do not add effects (shadows, glows, outlines)
- Do not rotate logos
- Do not place logos on busy backgrounds without sufficient contrast
- Do not recreate or redraw logos

## Technical Specifications

### SVG Properties
- Color space: RGB (sRGB)
- Viewbox: Optimized for each logo variant
- Fonts: System fonts referenced (Inter, system-ui fallbacks)
- Stroke widths: Preserved for consistency
- Export settings: Optimized, minified

### Web Implementation

```html
<!-- Inline SVG -->
<img src="brand-assets/logos/securevault-logo-primary.svg" alt="SecureVault" width="200">

<!-- Favicon -->
<link rel="icon" type="image/svg+xml" href="brand-assets/logos/securevault-favicon.svg">
```

```css
/* CSS Background */
.logo {
  background-image: url('brand-assets/logos/securevault-logo-primary.svg');
  background-size: contain;
  background-repeat: no-repeat;
}
```

## Support

For questions about brand assets or to request additional formats:
- Review the complete color specifications in COLOR-SPECIFICATIONS.md
- Check usage guidelines above
- Contact the design team for special requests

---

**Version:** 1.0
**Last Updated:** 2025-11-20
**Format:** SVG (Scalable Vector Graphics)
