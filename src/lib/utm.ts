/**
 * UTM Parameter Handling and Campaign Landing Pages
 * Handles UTM tracking and creates campaign-specific landing experiences
 */

export interface UTMParams {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  gclid?: string; // Google Ads click ID
  fbclid?: string; // Facebook click ID
}

export interface CampaignData {
  source: string;
  medium: string;
  campaign: string;
  term?: string;
  content?: string;
  gclid?: string;
  fbclid?: string;
}

export function parseUTMParams(searchParams: URLSearchParams): UTMParams {
  return {
    utm_source: searchParams.get('utm_source') || undefined,
    utm_medium: searchParams.get('utm_medium') || undefined,
    utm_campaign: searchParams.get('utm_campaign') || undefined,
    utm_term: searchParams.get('utm_term') || undefined,
    utm_content: searchParams.get('utm_content') || undefined,
    gclid: searchParams.get('gclid') || undefined,
    fbclid: searchParams.get('fbclid') || undefined,
  };
}

export function createCampaignData(utmParams: UTMParams): CampaignData {
  return {
    source: utmParams.utm_source || 'direct',
    medium: utmParams.utm_medium || 'none',
    campaign: utmParams.utm_campaign || 'organic',
    term: utmParams.utm_term,
    content: utmParams.utm_content,
    gclid: utmParams.gclid,
    fbclid: utmParams.fbclid,
  };
}

export function generateLeadSource(campaignData: CampaignData): string {
  const { source, medium, campaign } = campaignData;
  
  if (source === 'google' && medium === 'cpc') {
    return `Google Ads - ${campaign}`;
  }
  
  if (source === 'facebook' && medium === 'social') {
    return `Facebook - ${campaign}`;
  }
  
  if (source === 'linkedin' && medium === 'social') {
    return `LinkedIn - ${campaign}`;
  }
  
  if (medium === 'email') {
    return `Email - ${campaign}`;
  }
  
  if (medium === 'social') {
    return `${source} - ${campaign}`;
  }
  
  return `${source} - ${medium} - ${campaign}`;
}

export function generateLeadNotes(campaignData: CampaignData): string {
  const notes = [];
  
  if (campaignData.term) {
    notes.push(`Search term: ${campaignData.term}`);
  }
  
  if (campaignData.content) {
    notes.push(`Ad content: ${campaignData.content}`);
  }
  
  if (campaignData.gclid) {
    notes.push(`Google Ads ID: ${campaignData.gclid}`);
  }
  
  if (campaignData.fbclid) {
    notes.push(`Facebook ID: ${campaignData.fbclid}`);
  }
  
  return notes.join(' | ');
}

// Campaign landing page configurations
export const CAMPAIGN_CONFIGS = {
  'property-management-ads': {
    headline: 'Stop Losing Money on Vacant Properties',
    subheadline: 'Property managers using OMGsystems reduce vacancy time by 60% and increase tenant satisfaction by 40%.',
    painPoints: [
      'Properties sitting vacant for months',
      'Tenant screening taking weeks',
      'Maintenance requests piling up',
      'Owner reports delayed and inaccurate',
    ],
    solution: 'Automated property management that fills vacancies faster and keeps tenants happy.',
    ctaText: 'See How It Works',
    ctaHref: '/demo/crm?industry=property-management',
  },
  'real-estate-leads': {
    headline: 'Turn More Leads Into Closed Deals',
    subheadline: 'Real estate professionals using OMGsystems close 3x more deals with automated follow-up and lead nurturing.',
    painPoints: [
      'Leads going cold after first contact',
      'Manual follow-up taking hours',
      'Missing the best time to contact prospects',
      'Losing deals to competitors',
    ],
    solution: 'Intelligent lead management that never lets a hot prospect go cold.',
    ctaText: 'Get Your Lead System',
    ctaHref: '/demo/crm?industry=real-estate',
  },
  'contractor-automation': {
    headline: 'Stop Chasing Payments and Start Growing',
    subheadline: 'Contractors using OMGsystems get paid 50% faster and reduce admin time by 70%.',
    painPoints: [
      'Invoices sitting unpaid for months',
      'Spending hours on paperwork',
      'Missing project deadlines',
      'Losing money on change orders',
    ],
    solution: 'Project management automation that keeps you on time and on budget.',
    ctaText: 'Automate Your Business',
    ctaHref: '/demo/crm?industry=contractors',
  },
} as const;

export type CampaignKey = keyof typeof CAMPAIGN_CONFIGS;

export function getCampaignConfig(campaignKey: CampaignKey) {
  return CAMPAIGN_CONFIGS[campaignKey];
}

// Auto-detect campaign from UTM parameters
export function detectCampaign(campaignData: CampaignData): CampaignKey | null {
  const { source, medium, campaign } = campaignData;
  
  // Property management campaigns
  if (campaign?.toLowerCase().includes('property') || 
      campaign?.toLowerCase().includes('landlord') ||
      campaign?.toLowerCase().includes('rental')) {
    return 'property-management-ads';
  }
  
  // Real estate campaigns
  if (campaign?.toLowerCase().includes('real-estate') ||
      campaign?.toLowerCase().includes('realtor') ||
      campaign?.toLowerCase().includes('broker')) {
    return 'real-estate-leads';
  }
  
  // Contractor campaigns
  if (campaign?.toLowerCase().includes('contractor') ||
      campaign?.toLowerCase().includes('construction') ||
      campaign?.toLowerCase().includes('trades')) {
    return 'contractor-automation';
  }
  
  return null;
}
