// Analytics tracking utilities for AI Agents page

export interface AnalyticsEvent {
  event: string;
  properties?: Record<string, any>;
}

export const trackEvent = (event: string, properties?: Record<string, any>) => {
  // In a real implementation, you would send this to your analytics service
  // For now, we'll just log to console for development
  console.log('Analytics Event:', { event, properties, timestamp: new Date().toISOString() });
  
  // Example integrations:
  // - Google Analytics: gtag('event', event, properties)
  // - Mixpanel: mixpanel.track(event, properties)
  // - Amplitude: amplitude.track(event, properties)
  // - Custom API: fetch('/api/analytics', { method: 'POST', body: JSON.stringify({ event, properties }) })
};

export const trackPageView = (page: string, properties?: Record<string, any>) => {
  trackEvent('page_view', { page, ...properties });
};

export const trackFormSubmission = (formName: string, properties?: Record<string, any>) => {
  trackEvent('form_submission', { 
    form_name: formName,
    ...properties 
  });
};

export const trackButtonClick = (buttonName: string, location: string) => {
  trackEvent('button_click', { 
    button_name: buttonName,
    location 
  });
};

export const trackCTAClick = (ctaName: string, section: string) => {
  trackEvent('cta_click', { 
    cta_name: ctaName,
    section 
  });
};

// AI Agents specific tracking
export const trackAIAgentInterest = (industry: string, agentRole: string) => {
  trackEvent('ai_agent_interest', { 
    industry,
    agent_role: agentRole,
    timestamp: new Date().toISOString()
  });
};

export const trackAIAgentQuoteRequest = (data: {
  industry: string;
  agentRole: string;
  timeline: string;
  companyName: string;
}) => {
  trackEvent('ai_agent_quote_request', {
    industry: data.industry,
    agent_role: data.agentRole,
    timeline: data.timeline,
    company_size: data.companyName.length > 50 ? 'large' : 'small',
    timestamp: new Date().toISOString()
  });
};