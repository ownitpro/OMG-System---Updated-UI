export interface ChatContext {
  page: string;
  section: 'industry' | 'app' | 'campaign' | 'home' | 'other';
  industry?: string;
  app?: string;
  campaign?: string;
}

interface ChatResponse {
  content: string;
  shouldShowLeadCapture: boolean;
}

interface AnalyticsEvent {
  event: string;
  properties: Record<string, any>;
}

export class ChatBrain {
  private context: ChatContext;
  private publicKnowledge: Record<string, any> = {};

  constructor(pathname: string) {
    this.context = this.parseContext(pathname);
    this.loadPublicKnowledge();
  }

  private parseContext(pathname: string): ChatContext {
    if (pathname === '/') {
      return { page: pathname, section: 'home' };
    }
    
    if (pathname.startsWith('/industries/')) {
      const industry = pathname.split('/')[2];
      return { page: pathname, section: 'industry', industry };
    }
    
    if (pathname.startsWith('/apps/')) {
      const app = pathname.split('/')[2];
      return { page: pathname, section: 'app', app };
    }
    
    if (pathname.startsWith('/campaign/')) {
      const campaign = pathname.split('/')[2];
      return { page: pathname, section: 'campaign', campaign };
    }
    
    return { page: pathname, section: 'other' };
  }

  private loadPublicKnowledge() {
    // Load public content objects (this would be imported from actual content files)
    this.publicKnowledge = {
      industries: {
        'property-management': {
          name: 'Property Management',
          painPoints: ['Manual owner statements', 'Tenant onboarding delays', 'Maintenance coordination'],
          features: ['Automated owner statements', 'Tenant portal', 'Maintenance scheduling'],
          faqs: [
            { q: 'How does automated owner statement generation work?', a: 'We integrate with your accounting system to automatically generate and distribute owner statements monthly.' },
            { q: 'Can tenants upload documents through the portal?', a: 'Yes, tenants can upload lease documents, insurance certificates, and other required paperwork.' }
          ]
        },
        'real-estate': {
          name: 'Real Estate',
          painPoints: ['Lead follow-up delays', 'Showing coordination', 'Contract management'],
          features: ['Lead capture automation', 'Showing scheduler', 'E-signature contracts'],
          faqs: [
            { q: 'How quickly can I respond to new leads?', a: 'Our system can respond to new leads within minutes of form submission.' },
            { q: 'Can clients book showings directly?', a: 'Yes, clients can view your availability and book showings that sync with your calendar.' }
          ]
        },
        'contractors': {
          name: 'Contractors',
          painPoints: ['Project timeline delays', 'Client communication gaps', 'Invoice collection'],
          features: ['Project management', 'Client updates', 'Automated invoicing'],
          faqs: [
            { q: 'How do you handle project updates?', a: 'We automatically send progress updates to clients and track milestone completion.' },
            { q: 'Can I customize invoice templates?', a: 'Yes, you can create branded invoice templates with your logo and terms.' }
          ]
        },
        'healthcare': {
          name: 'Healthcare',
          painPoints: ['Patient intake delays', 'Document management', 'Compliance tracking'],
          features: ['Patient portals', 'Document automation', 'Compliance monitoring'],
          faqs: [
            { q: 'Is the system PHIPA compliant?', a: 'Yes, we maintain PHIPA compliance with encryption, audit logs, and Canadian data residency.' },
            { q: 'Can patients upload insurance documents?', a: 'Yes, patients can securely upload insurance cards and other documents through the portal.' }
          ]
        },
        'accounting': {
          name: 'Accounting',
          painPoints: ['Client document collection', 'Engagement letter delays', 'Tax season bottlenecks'],
          features: ['Client portals', 'Document collection', 'Engagement workflows'],
          faqs: [
            { q: 'How do you handle tax document collection?', a: 'We provide secure client portals where clients can upload tax documents and track their status.' },
            { q: 'Can I automate engagement letters?', a: 'Yes, you can create templates and automatically send engagement letters for signature.' }
          ]
        },
        'cleaning': {
          name: 'Cleaning Services',
          painPoints: ['Scheduling conflicts', 'Quality control', 'Client feedback'],
          features: ['Route optimization', 'Quality checklists', 'Review automation'],
          faqs: [
            { q: 'How does route optimization work?', a: 'Our system analyzes your client locations and creates optimized routes to minimize travel time.' },
            { q: 'Can clients provide feedback after service?', a: 'Yes, we automatically request feedback and can help manage online reviews.' }
          ]
        }
      },
      apps: {
        'securevault-docs': {
          name: 'SecureVault Docs',
          description: 'Document automation and secure storage',
          features: ['Auto-filing', 'OCR processing', 'Secure sharing', 'Compliance tracking'],
          faqs: [
            { q: 'How does auto-filing work?', a: 'Our OCR technology reads documents and automatically files them in the correct folders based on content.' },
            { q: 'Are documents stored in Canada?', a: 'Yes, all documents are stored in Canadian data centers with encryption at rest and in transit.' }
          ]
        },
        'crm': {
          name: 'CRM',
          description: 'Customer relationship management',
          features: ['Lead tracking', 'Pipeline management', 'Automated follow-ups', 'Reporting'],
          faqs: [
            { q: 'Can I import existing contacts?', a: 'Yes, you can import contacts from CSV files or integrate with existing systems.' },
            { q: 'How do automated follow-ups work?', a: 'You can set up email and SMS sequences that trigger based on lead behavior and timeline.' }
          ]
        },
        'leadflow': {
          name: 'LeadFlow Engine',
          description: 'Lead generation and nurturing',
          features: ['Form capture', 'Lead scoring', 'Nurture sequences', 'ROI tracking'],
          faqs: [
            { q: 'What lead sources can I track?', a: 'We track leads from forms, ads, referrals, and can integrate with Google Ads and Facebook.' },
            { q: 'How do you score leads?', a: 'Our system scores leads based on behavior, demographics, and engagement to prioritize follow-up.' }
          ]
        }
      },
      general: {
        security: 'All data is stored in Canada with encryption at rest and in transit. We maintain PHIPA and PIPEDA compliance.',
        pricing: 'Pricing varies by industry and team size. We provide tailored proposals based on your specific needs.',
        onboarding: 'Most onboarding completes in 1-3 weeks depending on complexity and integrations required.',
        support: 'We provide email and phone support during business hours, with priority support for enterprise clients.'
      }
    };
  }

  getContext(): ChatContext {
    return this.context;
  }

  getWelcomeMessage(): string {
    const { section, industry, app, campaign } = this.context;
    
    switch (section) {
      case 'industry':
        return `Hi! I'm here to help with questions about ${this.publicKnowledge.industries[industry!]?.name || industry} automation. What would you like to know?`;
      case 'app':
        return `Hi! I can help you understand ${this.publicKnowledge.apps[app!]?.name || app}. What questions do you have?`;
      case 'campaign':
        return `Hi! I'm here to help with ${campaign} questions. How can I assist you today?`;
      default:
        return "Hi! I'm OMGsystems AI. I can help you understand our platform, features, and how we can automate your business processes. What would you like to know?";
    }
  }

  async getResponse(userInput: string, messageHistory: any[]): Promise<ChatResponse> {
    const input = userInput.toLowerCase();
    
    // Check for blocked topics
    if (this.isBlockedTopic(input)) {
      return {
        content: "I can share an overview from our public information. For pricing or private details, please book a call and we'll tailor it to you.",
        shouldShowLeadCapture: true
      };
    }

    // Generate contextual response
    const response = this.generateContextualResponse(input);
    
    return {
      content: response,
      shouldShowLeadCapture: this.shouldShowLeadCapture(response)
    };
  }

  private isBlockedTopic(input: string): boolean {
    const blockedKeywords = [
      'pricing', 'cost', 'price', 'how much', 'budget',
      'admin', 'back office', 'internal', 'client data',
      'exact', 'specific pricing', 'contract', 'agreement'
    ];
    
    return blockedKeywords.some(keyword => input.includes(keyword));
  }

  private generateContextualResponse(input: string): string {
    const { section, industry, app } = this.context;
    
    // Industry-specific responses
    if (section === 'industry' && industry) {
      const industryData = this.publicKnowledge.industries[industry];
      if (industryData) {
        if (input.includes('pain') || input.includes('problem') || input.includes('challenge')) {
          return `Common challenges in ${industryData.name} include:\n\n• ${industryData.painPoints.join('\n• ')}\n\nOur platform addresses these with automated workflows and client portals. Would you like to see how we solve these specific issues?`;
        }
        
        if (input.includes('feature') || input.includes('capability') || input.includes('what can')) {
          return `${industryData.name} features include:\n\n• ${industryData.features.join('\n• ')}\n\nThese features are designed specifically for Ontario businesses. Would you like to see a demo?`;
        }
        
        if (input.includes('faq') || input.includes('question')) {
          const randomFaq = industryData.faqs[Math.floor(Math.random() * industryData.faqs.length)];
          return `Here's a common question about ${industryData.name}:\n\n**Q: ${randomFaq.q}**\n\nA: ${randomFaq.a}\n\nDo you have other questions about ${industryData.name} automation?`;
        }
      }
    }
    
    // App-specific responses
    if (section === 'app' && app) {
      const appData = this.publicKnowledge.apps[app];
      if (appData) {
        if (input.includes('how') || input.includes('work')) {
          return `${appData.name} works by ${appData.description.toLowerCase()}. Key features include:\n\n• ${appData.features.join('\n• ')}\n\nWould you like to see a live demo?`;
        }
      }
    }
    
    // General responses
    if (input.includes('security') || input.includes('safe') || input.includes('secure')) {
      return `Security is our top priority:\n\n• ${this.publicKnowledge.general.security}\n\n• Short-lived links for document sharing\n• Audit logs for all access\n• Break-glass logging for sensitive operations\n\nAll data stays in Canada. Would you like to see our Trust & Security page?`;
    }
    
    if (input.includes('onboard') || input.includes('setup') || input.includes('implement')) {
      return `Our onboarding process:\n\n• ${this.publicKnowledge.general.onboarding}\n\n• Initial setup and configuration\n• Data migration assistance\n• Team training sessions\n• Go-live support\n\nWe work with your timeline. Would you like to discuss your specific needs?`;
    }
    
    if (input.includes('support') || input.includes('help') || input.includes('assistance')) {
      return `We provide comprehensive support:\n\n• ${this.publicKnowledge.general.support}\n\n• Email support: support@omgsystems.com\n• Phone support during business hours\n• Priority support for enterprise clients\n• Knowledge base and documentation\n\nHow can I help you today?`;
    }
    
    // Default response
    return `I'd be happy to help! Based on your question, I can provide information about:\n\n• Industry-specific automation features\n• Security and compliance (PHIPA/PIPEDA)\n• Onboarding and implementation\n• Support and training\n\nWhat specific area would you like to learn more about?`;
  }

  private shouldShowLeadCapture(response: string): boolean {
    // Show lead capture after helpful responses
    return response.length > 100 && !response.includes('book a call');
  }

  trackEvent(event: string, properties: Record<string, any>) {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', event, {
        event_category: 'AI Chat',
        ...properties
      });
    }
  }
}
