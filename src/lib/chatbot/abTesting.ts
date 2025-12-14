/**
 * A/B Testing System for Chatbot Responses
 * 
 * This system manages different variants of fallback and escalation messages
 * to optimize user engagement and conversion rates.
 */

export interface ABTestVariant {
  id: string;
  name: string;
  weight: number; // 0-1, determines how often this variant is shown
  content: {
    fallbackMessage: string;
    escalationMessage: string;
    ctaText: string;
    ctaStyle: 'primary' | 'secondary' | 'outline';
  };
  metrics: {
    impressions: number;
    clicks: number;
    conversions: number;
    engagement: number;
  };
}

export interface ABTest {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'paused' | 'completed';
  variants: ABTestVariant[];
  startDate: string;
  endDate?: string;
  targetMetric: 'conversion' | 'engagement' | 'click-through';
}

// A/B Test configurations
export const AB_TESTS: ABTest[] = [
  {
    id: 'fallback-messaging-v1',
    name: 'Fallback Message Optimization',
    description: 'Testing different approaches to fallback messaging for better user engagement',
    status: 'active',
    startDate: '2025-01-15',
    targetMetric: 'engagement',
    variants: [
      {
        id: 'variant-a',
        name: 'Friendly & Helpful',
        weight: 0.5,
        content: {
          fallbackMessage: "I'm not sure I understand exactly what you're looking for. Could you provide a bit more detail so I can help you better?",
          escalationMessage: "I'd be happy to connect you with one of our team members who can provide more specific assistance. Would you like me to share their contact information?",
          ctaText: "Connect with Team",
          ctaStyle: 'primary'
        },
        metrics: { impressions: 0, clicks: 0, conversions: 0, engagement: 0 }
      },
      {
        id: 'variant-b',
        name: 'Direct & Actionable',
        weight: 0.5,
        content: {
          fallbackMessage: "I don't have specific information about that. Let me connect you with our sales team who can provide detailed answers.",
          escalationMessage: "Our sales team can give you the exact information you need. Would you like me to schedule a call or send you their contact details?",
          ctaText: "Get Help Now",
          ctaStyle: 'secondary'
        },
        metrics: { impressions: 0, clicks: 0, conversions: 0, engagement: 0 }
      }
    ]
  },
  {
    id: 'escalation-cta-v1',
    name: 'Escalation CTA Optimization',
    description: 'Testing different call-to-action styles for escalation scenarios',
    status: 'active',
    startDate: '2025-01-15',
    targetMetric: 'conversion',
    variants: [
      {
        id: 'variant-a',
        name: 'Soft Approach',
        weight: 0.33,
        content: {
          fallbackMessage: "I'd be happy to help you get the information you need.",
          escalationMessage: "Would you like me to connect you with someone who can provide more detailed assistance?",
          ctaText: "Yes, Please Help",
          ctaStyle: 'outline'
        },
        metrics: { impressions: 0, clicks: 0, conversions: 0, engagement: 0 }
      },
      {
        id: 'variant-b',
        name: 'Value-Focused',
        weight: 0.33,
        content: {
          fallbackMessage: "I can connect you with our team for personalized assistance.",
          escalationMessage: "Our team can provide you with a custom solution tailored to your needs. Would you like to schedule a consultation?",
          ctaText: "Schedule Consultation",
          ctaStyle: 'primary'
        },
        metrics: { impressions: 0, clicks: 0, conversions: 0, engagement: 0 }
      },
      {
        id: 'variant-c',
        name: 'Urgency-Driven',
        weight: 0.34,
        content: {
          fallbackMessage: "Let me get you connected with our team right away.",
          escalationMessage: "Our team is standing by to help you immediately. Would you like to speak with someone now?",
          ctaText: "Speak Now",
          ctaStyle: 'secondary'
        },
        metrics: { impressions: 0, clicks: 0, conversions: 0, engagement: 0 }
      }
    ]
  }
];

// User assignment tracking
const userAssignments = new Map<string, Map<string, string>>();

// Get or assign variant for a user
export function getVariantForUser(userId: string, testId: string): ABTestVariant | null {
  const test = AB_TESTS.find(t => t.id === testId && t.status === 'active');
  if (!test) return null;

  // Check if user already has an assignment
  if (!userAssignments.has(userId)) {
    userAssignments.set(userId, new Map());
  }
  
  const userTests = userAssignments.get(userId)!;
  
  if (userTests.has(testId)) {
    const variantId = userTests.get(testId)!;
    return test.variants.find(v => v.id === variantId) || null;
  }

  // Assign variant based on weights
  const random = Math.random();
  let cumulativeWeight = 0;
  
  for (const variant of test.variants) {
    cumulativeWeight += variant.weight;
    if (random <= cumulativeWeight) {
      userTests.set(testId, variant.id);
      return variant;
    }
  }

  // Fallback to first variant
  const firstVariant = test.variants[0];
  userTests.set(testId, firstVariant.id);
  return firstVariant;
}

// Track impression
export function trackImpression(userId: string, testId: string, variantId: string): void {
  const test = AB_TESTS.find(t => t.id === testId);
  if (!test) return;

  const variant = test.variants.find(v => v.id === variantId);
  if (!variant) return;

  variant.metrics.impressions++;
  
  // Log for analytics
  console.log('📊 A/B Test Impression:', {
    testId,
    variantId,
    userId,
    timestamp: new Date().toISOString()
  });
}

// Track click/interaction
export function trackClick(userId: string, testId: string, variantId: string): void {
  const test = AB_TESTS.find(t => t.id === testId);
  if (!test) return;

  const variant = test.variants.find(v => v.id === variantId);
  if (!variant) return;

  variant.metrics.clicks++;
  
  // Log for analytics
  console.log('📊 A/B Test Click:', {
    testId,
    variantId,
    userId,
    timestamp: new Date().toISOString()
  });
}

// Track conversion
export function trackConversion(userId: string, testId: string, variantId: string): void {
  const test = AB_TESTS.find(t => t.id === testId);
  if (!test) return;

  const variant = test.variants.find(v => v.id === variantId);
  if (!variant) return;

  variant.metrics.conversions++;
  
  // Log for analytics
  console.log('📊 A/B Test Conversion:', {
    testId,
    variantId,
    userId,
    timestamp: new Date().toISOString()
  });
}

// Get test results
export function getTestResults(testId: string): ABTest | null {
  return AB_TESTS.find(t => t.id === testId) || null;
}

// Get all test results
export function getAllTestResults(): ABTest[] {
  return AB_TESTS;
}

// Calculate variant performance
export function calculateVariantPerformance(variant: ABTestVariant): {
  clickThroughRate: number;
  conversionRate: number;
  engagementRate: number;
} {
  const ctr = variant.metrics.impressions > 0 ? 
    (variant.metrics.clicks / variant.metrics.impressions) * 100 : 0;
  
  const conversionRate = variant.metrics.clicks > 0 ? 
    (variant.metrics.conversions / variant.metrics.clicks) * 100 : 0;
  
  const engagementRate = variant.metrics.impressions > 0 ? 
    ((variant.metrics.clicks + variant.metrics.conversions) / variant.metrics.impressions) * 100 : 0;

  return {
    clickThroughRate: Math.round(ctr * 100) / 100,
    conversionRate: Math.round(conversionRate * 100) / 100,
    engagementRate: Math.round(engagementRate * 100) / 100
  };
}

// Get winning variant for a test
export function getWinningVariant(testId: string): ABTestVariant | null {
  const test = AB_TESTS.find(t => t.id === testId);
  if (!test) return null;

  let winningVariant = test.variants[0];
  let bestScore = 0;

  for (const variant of test.variants) {
    const performance = calculateVariantPerformance(variant);
    let score = 0;

    switch (test.targetMetric) {
      case 'conversion':
        score = performance.conversionRate;
        break;
      case 'engagement':
        score = performance.engagementRate;
        break;
      case 'click-through':
        score = performance.clickThroughRate;
        break;
    }

    if (score > bestScore) {
      bestScore = score;
      winningVariant = variant;
    }
  }

  return winningVariant;
}

// Export variant content for use in chatbot
export function getVariantContent(userId: string, testId: string): ABTestVariant['content'] | null {
  const variant = getVariantForUser(userId, testId);
  if (!variant) return null;

  // Track impression
  trackImpression(userId, testId, variant.id);

  return variant.content;
}
