# Billing & Guardrails

## Pricing Model

### Business Plans

**Per-seat pricing:**
- **Starter**: $X per seat/month
- **Growth**: $Y per seat/month
- **Pro**: $Z per seat/month

**Features:**
- Team collaboration
- Client portals
- Advanced analytics
- Connector integrations
- Higher usage limits

### Personal Plans

**Per-plan pricing:**
- **Starter**: $X/month
- **Growth**: $Y/month
- **Pro**: $Z/month

**Features:**
- Personal vault
- Basic sharing
- Simple analytics
- Lower usage limits

## Currency Display

**Customer-Facing:**
- All prices shown in **USD**
- Clear pricing on `/pricing` page
- Transparent per-seat or per-plan costs

**Internal Calculations:**
- Usage caps calculated in **CAD** (25% of same numeric price)
- **Never shown** publicly
- Used for internal cost tracking only

## Usage Caps & Alerts

### Alert Thresholds

**Visual Indicators:**
- 70% - First warning (yellow)
- 80% - Second warning (orange)
- 90% - Third warning (red)
- 95% - Final warning (red, urgent)
- 100% - Hard stop (blocking)

### Grace Period

- Small grace to **103%** in enforcement
- Allows brief overage
- Automatic upgrade prompt
- No service interruption during grace

### Usage Bars

**Displayed in Billing Page:**
- Storage (GB/MB)
- OCR pages per month
- Share links
- API calls (if applicable)

**Visual Design:**
- Progress bars with color coding
- Percentage indicators
- Alert badges at thresholds

## Test Mode

**Mock Values:**
- All usage bars show mock numbers
- No real charges occur
- Alerts trigger at mock thresholds
- Upgrade buttons route to checkout (mock)

**Safe Testing:**
- Can test all alert levels
- No Stripe charges
- No AWS billing impact
- Full UI/UX testing

## Upgrade Flow

**Process:**
1. User sees usage approaching limit
2. Alert appears in Billing page
3. Click "Upgrade" button
4. Routes to checkout page
5. Select new plan
6. Complete payment (Stripe in prod, mock in test)
7. Plan upgrade applied immediately

**Upgrade Options:**
- Starter → Growth
- Growth → Pro
- Add seats (Business only)

## Billing Page Features

**Business:**
- Current plan display
- Seat count
- Usage bars for all metrics
- Alert indicators
- Upgrade button
- Billing history (future)

**Personal:**
- Current plan display
- Usage bars
- Alert indicators
- Upgrade button
- Billing history (future)

## Best Practices

1. **Monitor Usage**
   - Check Billing page regularly
   - Set up alerts (future feature)
   - Plan upgrades before hitting limits

2. **Understand Caps**
   - Know your plan limits
   - Understand alert thresholds
   - Plan for growth

3. **Upgrade Timing**
   - Upgrade before 95% threshold
   - Avoid service interruption
   - Consider team growth

4. **Cost Management**
   - Review usage patterns
   - Optimize storage usage
   - Archive old documents

## Internal Notes

**For Support:**
- Explain caps visually in Billing
- Show upgrade path clearly
- Help users understand thresholds
- Suggest top-up or upgrade when needed

**For Sales:**
- Highlight plan benefits
- Explain per-seat vs per-plan pricing
- Show upgrade value proposition
- Address usage concerns

