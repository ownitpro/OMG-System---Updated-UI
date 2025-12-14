#!/usr/bin/env node

/**
 * Simple Knowledge Base Builder
 * 
 * This script creates a basic knowledge base for the chatbot
 * without complex dependencies.
 */

const fs = require('fs');
const path = require('path');

// Simple knowledge base data
const knowledgeBase = {
  automations: [
    {
      id: "client-upsert",
      title: "Client Upsert + Chatbot Summarize & Approval",
      content: "Teams waste time identifying if a client is new or existing and drafting repetitive replies. Automation checks client DB, summarizes message, routes for approval, and sends pre-approved response automatically.",
      type: "automation",
      url: "/automations#client-upsert"
    },
    {
      id: "spreadsheet-sync",
      title: "Spreadsheet Sync Lead Capture",
      content: "Leads get lost because manual copy/paste from forms to sheets is slow. Webhooks push each submission straight into your Google Sheet or Airtable instantly.",
      type: "automation",
      url: "/automations#spreadsheet-sync"
    },
    {
      id: "overdue-invoice-reminder",
      title: "Overdue Invoice Notification",
      content: "Businesses lose track of unpaid invoices and miss reminders. Scheduled automation finds overdue invoices and sends branded email reminders automatically.",
      type: "automation",
      url: "/automations#overdue-invoice-reminder"
    },
    {
      id: "meeting-followup",
      title: "Meeting Follow-Up Summary",
      content: "Staff spend hours typing up notes after every meeting. Automation creates and sends a summary and action list right after each call.",
      type: "automation",
      url: "/automations#meeting-followup"
    },
    {
      id: "auto-filing",
      title: "Document Auto-Filing & Tagging",
      content: "Files pile up in random folders, and teams lose critical documents. Automation reads uploads, classifies files by type, and moves them to correct folders automatically.",
      type: "automation",
      url: "/automations#auto-filing"
    },
    {
      id: "contract-renewal",
      title: "Contract Expiry & Renewal Alerts",
      content: "Missed renewals cause lost revenue and rushed last-minute deals. Automation sends reminders at 30/60/90 days before contract expiration.",
      type: "automation",
      url: "/automations#contract-renewal"
    },
    {
      id: "feedback-request",
      title: "Customer Feedback Request",
      content: "Businesses forget to ask for reviews, missing valuable testimonials. Automation triggers personalized review requests after job completion.",
      type: "automation",
      url: "/automations#feedback-request"
    },
    {
      id: "team-alerts",
      title: "Slack / Teams Event Alerts",
      content: "Important updates (like new leads or payments) go unnoticed. Automation sends real-time notifications into Slack or Teams.",
      type: "automation",
      url: "/automations#team-alerts"
    },
    {
      id: "auto-approval",
      title: "Auto-Approval & Escalation Path",
      content: "Internal requests stall because no one approves on time. Workflow routes to approver A, then escalates to B if no response in X hours.",
      type: "automation",
      url: "/automations#auto-approval"
    },
    {
      id: "client-status-email",
      title: "Client Status Snapshot Email",
      content: "Clients keep asking for updates or progress reports. Automation emails each client their status summary weekly with open items and progress metrics.",
      type: "automation",
      url: "/automations#client-status-email"
    },
    {
      id: "lead-enrichment",
      title: "Lead Enrichment on Entry",
      content: "Sales waste time researching leads. Automation enriches leads with company data (industry, size, location) automatically on capture.",
      type: "automation",
      url: "/automations#lead-enrichment"
    },
    {
      id: "subscription-renewal",
      title: "Subscription Renewal Prompt",
      content: "Clients forget to renew subscriptions, causing churn. Automation sends renewal / upgrade prompts before plan expiration.",
      type: "automation",
      url: "/automations#subscription-renewal"
    },
    {
      id: "ticket-triage",
      title: "Support Ticket Triage & Auto-Assignment",
      content: "Support tickets pile up or get assigned incorrectly. Automation classifies and routes tickets by topic, priority, and workload.",
      type: "automation",
      url: "/automations#ticket-triage"
    }
  ],
  industries: [
    {
      id: "property-management",
      title: "Property Management Solutions",
      content: "OMGsystems provides comprehensive automation solutions for property management companies. Our SmartRent Flow helps property managers streamline operations, automate tenant communications, and manage maintenance requests efficiently.",
      type: "industry",
      url: "/industries/property-management"
    },
    {
      id: "real-estate",
      title: "Real Estate Solutions",
      content: "Our Agent Growth Engine helps real estate professionals automate lead generation, client follow-ups, and transaction management. Streamline your real estate business with intelligent automation.",
      type: "industry",
      url: "/industries/real-estate"
    },
    {
      id: "accounting",
      title: "Accounting Solutions",
      content: "OMGsystems Financial Workflow Engine automates accounting processes, document management, and client communications. Perfect for accounting firms looking to streamline operations.",
      type: "industry",
      url: "/industries/accounting"
    },
    {
      id: "contractors",
      title: "Contractor Solutions",
      content: "Our Project Growth Engine helps contractors manage projects, automate quotes, and streamline client communications. Built specifically for construction and contracting businesses.",
      type: "industry",
      url: "/industries/contractors"
    },
    {
      id: "healthcare",
      title: "Healthcare Solutions",
      content: "CareFlow Automation helps healthcare providers manage patient communications, automate appointment scheduling, and streamline administrative tasks while maintaining HIPAA compliance.",
      type: "industry",
      url: "/industries/healthcare"
    },
    {
      id: "cleaning",
      title: "Cleaning Services Solutions",
      content: "CleanFlow Engine automates scheduling, client communications, and service management for cleaning companies. Streamline your cleaning business operations.",
      type: "industry",
      url: "/industries/cleaning"
    }
  ],
  apps: [
    {
      id: "crm",
      title: "CRM System",
      content: "OMGsystems CRM helps businesses manage customer relationships, track leads, and automate sales processes. Built for service industries with industry-specific features.",
      type: "app",
      url: "/apps/crm"
    },
    {
      id: "securevault",
      title: "SecureVault Docs",
      content: "SecureVault Docs provides secure document management with encryption, access controls, and automated filing. Perfect for businesses handling sensitive documents.",
      type: "app",
      url: "/apps/securevault-docs"
    },
    {
      id: "leadflow",
      title: "LeadFlow Engine",
      content: "LeadFlow Engine automates lead generation, qualification, and nurturing. Capture leads from multiple sources and convert them into customers with intelligent automation.",
      type: "app",
      url: "/apps/leadflow-engine"
    },
    {
      id: "industry-iq",
      title: "IndustryIQ",
      content: "IndustryIQ provides industry-specific insights and automation templates. Get tailored solutions for your specific industry needs.",
      type: "app",
      url: "/apps/industry-iq"
    }
  ],
  pages: [
    {
      id: "homepage",
      title: "OMGsystems - Business Automation Platform",
      content: "OMGsystems provides intelligent automation, secure document management, and industry-specific solutions for property management, real estate, accounting, contractors, healthcare, and cleaning businesses. Our platform helps businesses build once and profit forever with comprehensive automation tools.",
      type: "page",
      url: "/"
    },
    {
      id: "about",
      title: "About OMGsystems",
      content: "OMGsystems is a leading provider of business automation solutions. We empower businesses with intelligent automation, secure document management, and industry-specific solutions that drive growth and efficiency. Trusted by 10,000+ businesses worldwide.",
      type: "page",
      url: "/about"
    },
    {
      id: "contact",
      title: "Contact OMGsystems",
      content: "Get in touch with OMGsystems for business automation solutions. Contact us for demos, pricing, and support. We help businesses across property management, real estate, accounting, contractors, healthcare, and cleaning industries.",
      type: "page",
      url: "/contact"
    }
  ],
  faqs: [
    {
      id: "security",
      title: "Data Security and Privacy",
      content: "OMGsystems takes data security seriously. We use enterprise-grade encryption, secure data centers, and comply with industry standards. Your data is protected with 256-bit SSL encryption and stored in secure, SOC 2 compliant facilities.",
      type: "faq",
      url: "/trust"
    },
    {
      id: "pricing",
      title: "Pricing Information",
      content: "OMGsystems offers flexible pricing plans to fit businesses of all sizes. Contact us for a custom quote based on your specific needs. We offer transparent pricing with no hidden fees.",
      type: "faq",
      url: "/pricing"
    },
    {
      id: "integration",
      title: "System Integration",
      content: "OMGsystems integrates with popular business tools including Google Workspace, Microsoft 365, Slack, and many others. Our API allows custom integrations with your existing systems.",
      type: "faq",
      url: "/docs"
    }
  ]
};

// Simple text chunking function
function splitIntoChunks(text, maxChunkSize = 500) {
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const chunks = [];
  let currentChunk = '';

  for (const sentence of sentences) {
    if (currentChunk.length + sentence.length > maxChunkSize && currentChunk.length > 0) {
      chunks.push(currentChunk.trim());
      currentChunk = sentence.trim();
    } else {
      currentChunk += (currentChunk ? '. ' : '') + sentence.trim();
    }
  }

  if (currentChunk.length > 0) {
    chunks.push(currentChunk.trim());
  }

  return chunks;
}

// Simple embedding function (mock for development)
function generateEmbedding(text) {
  const words = text.toLowerCase().split(/\s+/);
  const embedding = new Array(384).fill(0);
  
  words.forEach(word => {
    const hash = word.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
    const index = Math.abs(hash) % 384;
    embedding[index] += 1;
  });
  
  const norm = Math.sqrt(embedding.reduce((sum, val) => sum + val * val, 0));
  return embedding.map(val => val / norm);
}

// Build the knowledge base
async function buildKnowledgeBase() {
  console.log('🔍 Building knowledge base...');
  
  const chunks = [];
  let chunkCount = 0;
  
  // Process all content types
  Object.values(knowledgeBase).flat().forEach(doc => {
    const docChunks = splitIntoChunks(doc.content, 500);
    
    docChunks.forEach((chunkText, index) => {
      const chunk = {
        id: `${doc.id}-chunk-${index}`,
        documentId: doc.id,
        content: chunkText,
        embedding: generateEmbedding(chunkText),
        metadata: {
          title: doc.title,
          type: doc.type,
          url: doc.url
        }
      };
      
      chunks.push(chunk);
      chunkCount++;
    });
  });
  
  // Create the knowledge base structure
  const knowledgeBaseData = {
    chunks,
    metadata: {
      totalChunks: chunkCount,
      totalDocuments: Object.values(knowledgeBase).flat().length,
      createdAt: new Date().toISOString(),
      version: "1.0.0"
    }
  };
  
  // Ensure data directory exists
  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  
  // Save the knowledge base
  const indexPath = path.join(dataDir, 'chatbot-index.json');
  fs.writeFileSync(indexPath, JSON.stringify(knowledgeBaseData, null, 2));
  
  console.log(`✅ Knowledge base built successfully!`);
  console.log(`📊 Processed ${Object.values(knowledgeBase).flat().length} documents into ${chunkCount} chunks`);
  console.log(`💾 Saved to: ${indexPath}`);
}

// Run the build
buildKnowledgeBase().catch(error => {
  console.error('❌ Knowledge base build failed:', error);
  process.exit(1);
});
