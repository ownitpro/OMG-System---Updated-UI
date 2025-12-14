// Mock Stripe Checkout URLs (Week 1 testing)
// 
// ⚠️ IMPORTANT: These are PLACEHOLDER URLs for testing only.
// They will return 403 errors - this is EXPECTED behavior.
// 
// When ready for production:
// 1. Create real Stripe Checkout Sessions via Stripe API
// 2. Replace these URLs with actual checkout.stripe.com links
// 3. Or use Stripe Payment Links (simpler option)
//
// Example real URL format:
// https://checkout.stripe.com/pay/cs_test_...
//
// Swap these with real Stripe Checkout URLs later

export const STRIPE_LINKS = {
  securevault_docs: "https://checkout.stripe.com/mock/securevault-docs",
  omg_crm: "https://checkout.stripe.com/mock/omg-crm",
  omg_leads: "https://checkout.stripe.com/mock/omg-leads",
  omg_iq: "https://checkout.stripe.com/mock/omg-iq",
  omg_ai_mastery: "https://checkout.stripe.com/mock/omg-ai-mastery",
};

