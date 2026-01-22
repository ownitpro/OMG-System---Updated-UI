# Marketing Site Structure

This directory `src/app/(marketing)` contains the public-facing marketing pages for SecureVault Docs.
All pages in this route group share the `layout.tsx` which provides the:

- Sticky Navigation (Header)
- Global Footer
- Seamless Dark Theme Background

## Page Map

| Path             | Component                | Description                                   |
| ---------------- | ------------------------ | --------------------------------------------- |
| `/features`      | `features/page.tsx`      | Feature grid and integrations showcase.       |
| `/pricing`       | `pricing/page.tsx`       | Plans and pricing tables (Business/Personal). |
| `/about`         | `about/page.tsx`         | Company story and stats.                      |
| `/download`      | `download/page.tsx`      | App download links (iOS/Android/Desktop).     |
| `/contact-sales` | `contact-sales/page.tsx` | Enterprise contact form.                      |
| `/docs`          | `docs/page.tsx`          | Documentation hub entry point.                |
| `/support`       | `support/page.tsx`       | Support center navigation.                    |
| `/community`     | `community/page.tsx`     | Community links (Discord/GitHub).             |

## Legal Pages

| Path        | Component           |
| ----------- | ------------------- |
| `/privacy`  | `privacy/page.tsx`  |
| `/terms`    | `terms/page.tsx`    |
| `/security` | `security/page.tsx` |

## Components

Shared components are located in `@/components/marketing/`.
