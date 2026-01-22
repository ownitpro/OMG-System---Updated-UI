# SecureVault Docs — Training Pack

> Purpose: A single training source for onboarding, support, QA, and customer-facing demos. Covers both **Business** and **Personal** sides (no verticals). Safe for testing (no live Stripe/AWS).

## How to Use This Pack

* Place the `ops/training` folder at repo root beside `app`, `packages`, `ops/n8n`.
* Share with new teammates on Day 1. Each role has a checklist.
* Demo scripts here map to **/demo/business** and **/demo/personal** routes.
* Use the **Mock Mode** flows until prod wiring is approved.

## Folder Map

```
ops/
  training/
    00-readme.md
    01-roles-and-access.md
    02-product-overview.md
    03-ux-map.md
    04-onboarding-checklists.md
    05-biz-admin-guide.md
    06-personal-user-guide.md
    07-connectors-guide.md
    08-marketplace-guide.md
    09-billing-and-guards.md
    10-security-and-privacy.md
    11-support-runbooks.md
    12-qa-playbook.md
    13-demo-scripts.md
    14-faq.md
    15-troubleshooting.md
    16-glossary.md
```

## Quick Navigation

- **New to SVD?** Start with `02-product-overview.md` → `03-ux-map.md` → `04-onboarding-checklists.md`
- **Support role?** Read `11-support-runbooks.md` and `15-troubleshooting.md`
- **QA role?** Follow `12-qa-playbook.md`
- **Sales/Demo?** Use `13-demo-scripts.md` and `14-faq.md`
- **Admin training?** See `05-biz-admin-guide.md` and `06-personal-user-guide.md`

## Testing Safety

All flows documented here are **mock/stub-safe**. No real Stripe charges, AWS writes, or email sends occur in test mode. Use `/demo/business` and `/demo/personal` routes for practice.

