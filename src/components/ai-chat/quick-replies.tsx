"use client";

import React from "react";
import { ChatContext } from "./chat-brain";

interface QuickRepliesProps {
  onReply: (reply: string) => void;
  context: ChatContext;
}

export function QuickReplies({ onReply, context }: QuickRepliesProps) {
  const getContextualReplies = () => {
    const { section, industry, app, campaign } = context;
    
    switch (section) {
      case 'industry':
        return getIndustryReplies(industry!);
      case 'app':
        return getAppReplies(app!);
      case 'campaign':
        return getCampaignReplies(campaign!);
      default:
        return getGeneralReplies();
    }
  };

  const getIndustryReplies = (industry: string) => {
    const industryReplies: Record<string, string[]> = {
      'property-management': [
        'How do owner statements work?',
        'What about tenant onboarding?',
        'How does maintenance scheduling work?'
      ],
      'real-estate': [
        'How quickly can I respond to leads?',
        'Can clients book showings?',
        'How do contracts work?'
      ],
      'contractors': [
        'How do project updates work?',
        'Can I customize invoices?',
        'How do you handle timelines?'
      ],
      'healthcare': [
        'Is this PHIPA compliant?',
        'How do patient portals work?',
        'Can patients upload documents?'
      ],
      'accounting': [
        'How do you collect tax documents?',
        'Can I automate engagement letters?',
        'How does client onboarding work?'
      ],
      'cleaning': [
        'How does route optimization work?',
        'Can clients provide feedback?',
        'How do quality checklists work?'
      ]
    };
    
    return industryReplies[industry] || getGeneralReplies();
  };

  const getAppReplies = (app: string) => {
    const appReplies: Record<string, string[]> = {
      'securevault-docs': [
        'How does auto-filing work?',
        'Are documents stored in Canada?',
        'How do secure links work?'
      ],
      'crm': [
        'Can I import existing contacts?',
        'How do automated follow-ups work?',
        'What reporting is available?'
      ],
      'leadflow': [
        'What lead sources can I track?',
        'How do you score leads?',
        'What ROI can I expect?'
      ]
    };
    
    return appReplies[app] || getGeneralReplies();
  };

  const getCampaignReplies = (campaign: string) => {
    const campaignReplies: Record<string, string[]> = {
      'leadflow': [
        'What\'s included in LeadFlow?',
        'What ROI can I expect?',
        'How fast can we launch?'
      ],
      'property-automation': [
        'How does property automation work?',
        'What processes can be automated?',
        'How long does setup take?'
      ]
    };
    
    return campaignReplies[campaign] || getGeneralReplies();
  };

  const getGeneralReplies = () => [
    'How does security work?',
    'What about data residency?',
    'How long does onboarding take?'
  ];

  const contextualReplies = getContextualReplies();
  const universalReplies = ['See a demo', 'Book a call'];

  return (
    <div className="space-y-2">
      <p className="text-xs text-gray-600 font-medium">Quick questions:</p>
      <div className="flex flex-wrap gap-2">
        {contextualReplies.map((reply, index) => (
          <button
            key={index}
            onClick={() => onReply(reply)}
            className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs rounded-full transition-colors"
          >
            {reply}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap gap-2 mt-2">
        {universalReplies.map((reply, index) => (
          <button
            key={index}
            onClick={() => onReply(reply)}
            className="px-3 py-1 bg-blue-100 hover:bg-blue-200 text-blue-700 text-xs rounded-full transition-colors font-medium"
          >
            {reply}
          </button>
        ))}
      </div>
    </div>
  );
}
