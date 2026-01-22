# Analytics & Events

## Event Naming Convention

### Format
`[action]_[object]` or `[view]_[page]`

### Examples
- `view_home`
- `click_cta_get_started`
- `submit_contact_sales`

## Core Events

### Homepage Events

**view_home**
- Trigger: Page load
- Properties: None

**click_cta_get_started**
- Trigger: Click on "Get started free" button
- Properties: `cta_location` (hero, footer, etc.)

**click_cta_try_demo**
- Trigger: Click on "Try the demo" button
- Properties: `cta_location`

**click_cta_see_pricing**
- Trigger: Click on "See pricing" link
- Properties: `cta_location`

### Pricing Page Events

**view_pricing**
- Trigger: Page load
- Properties: `plan_type` (business, personal)

**toggle_pricing_plan**
- Trigger: Toggle between Business/Personal
- Properties: `plan_type` (business, personal)

**toggle_pricing_cycle**
- Trigger: Toggle between Monthly/Annual
- Properties: `cycle` (monthly, annual)

**click_cta_start_trial**
- Trigger: Click on "Start free trial" button
- Properties: `plan_selected` (starter, growth, pro)

**click_cta_contact_sales**
- Trigger: Click on "Contact Sales" button
- Properties: `plan_type`

### Demo Page Events

**view_demo**
- Trigger: Page load
- Properties: `demo_type` (interactive, business, personal)

**view_demo_business**
- Trigger: View Business demo tab
- Properties: None

**view_demo_personal**
- Trigger: View Personal demo tab
- Properties: None

**submit_demo_form**
- Trigger: Submit demo request form
- Properties: `industry`, `role`, `team_size`

**click_cta_get_started_from_demo**
- Trigger: Click "Get started free" after demo
- Properties: `demo_type`

### Signup Events

**start_signup**
- Trigger: Click "Get started free" or begin signup
- Properties: `source` (homepage, pricing, demo, etc.)

**complete_signup**
- Trigger: Complete signup form
- Properties: `plan_selected`, `signup_method` (email, google, microsoft)

**abandon_signup**
- Trigger: Leave signup page without completing
- Properties: `step_abandoned` (email, password, etc.)

### Contact Sales Events

**view_contact_sales**
- Trigger: Page load
- Properties: None

**submit_contact_sales**
- Trigger: Submit contact sales form
- Properties: `industry`, `use_case`, `plan_interest`

### Features Page Events

**view_features**
- Trigger: Page load
- Properties: None

**click_feature_demo**
- Trigger: Click on feature demo link
- Properties: `feature_name` (portals, sharing, ocr, etc.)

### Marketplace Events

**view_marketplace**
- Trigger: Page load
- Properties: None

**click_template_preview**
- Trigger: Click "Preview" on template
- Properties: `template_id`

**click_template_dry_run**
- Trigger: Click "Dry Run" on template
- Properties: `template_id`

**click_template_install**
- Trigger: Click "Install" on template
- Properties: `template_id`, `target` (business, personal)

## UTM Standards

### Parameters

**utm_source**
- Required
- Examples: `google`, `linkedin`, `email`, `direct`

**utm_medium**
- Required
- Examples: `cpc`, `email`, `social`, `organic`

**utm_campaign**
- Required
- Examples: `launch`, `webinar`, `case_study`

**utm_content**
- Optional
- Examples: `hero_cta`, `footer_link`, `sidebar_ad`

**utm_term**
- Optional (for paid search)
- Examples: `client_portal_software`, `secure_document_sharing`

### UTM Examples

**Paid Search:**
```
?utm_source=google&utm_medium=cpc&utm_campaign=client_portal&utm_term=client_portal_software
```

**Email:**
```
?utm_source=email&utm_medium=email&utm_campaign=welcome&utm_content=cta_button
```

**Social Media:**
```
?utm_source=linkedin&utm_medium=social&utm_campaign=launch&utm_content=post_link
```

## Event Properties

### Common Properties

**user_id**
- User identifier (if logged in)
- Type: String

**session_id**
- Session identifier
- Type: String

**page_url**
- Current page URL
- Type: String

**referrer**
- Referrer URL
- Type: String

**device_type**
- Device type (mobile, tablet, desktop)
- Type: String

**browser**
- Browser name
- Type: String

### Custom Properties

**plan_type**
- Business or Personal
- Type: String
- Values: `business`, `personal`

**plan_selected**
- Selected plan
- Type: String
- Values: `starter`, `growth`, `pro`, `enterprise`

**industry**
- User industry
- Type: String
- Values: `accounting`, `real_estate`, `construction`, `legal`, `other`

**team_size**
- Team size
- Type: Number
- Values: 1-100+

## Implementation Notes

### Tracking Library
- Use analytics library (e.g., Google Analytics, Mixpanel, Segment)
- Implement on all marketing pages
- Test events in development

### Privacy
- Respect user privacy
- Anonymize where required
- Comply with GDPR/CCPA
- Provide opt-out options

### Testing
- Test all events in development
- Verify event properties
- Check UTM parameter parsing
- Validate event firing

