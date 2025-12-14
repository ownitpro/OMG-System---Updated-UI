import fs from 'fs';
import path from 'path';
import { automations } from '@/content/automations';

// Types for our knowledge base
export interface KnowledgeDocument {
  id: string;
  title: string;
  content: string;
  type: 'page' | 'automation' | 'faq' | 'industry' | 'app';
  url: string;
  metadata?: Record<string, any>;
}

export interface KnowledgeChunk {
  id: string;
  documentId: string;
  content: string;
  embedding?: number[];
  metadata: Record<string, any>;
}

// Simple in-memory vector store for development
class SimpleVectorStore {
  private chunks: KnowledgeChunk[] = [];
  private embeddings: Map<string, number[]> = new Map();

  async addChunk(chunk: KnowledgeChunk, embedding: number[]) {
    this.chunks.push(chunk);
    this.embeddings.set(chunk.id, embedding);
  }

  async search(queryEmbedding: number[], topK: number = 5): Promise<KnowledgeChunk[]> {
    // Simple cosine similarity search
    const similarities = this.chunks.map(chunk => {
      const chunkEmbedding = this.embeddings.get(chunk.id);
      if (!chunkEmbedding) return { chunk, similarity: 0 };
      
      const similarity = this.cosineSimilarity(queryEmbedding, chunkEmbedding);
      return { chunk, similarity };
    });

    return similarities
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, topK)
      .map(item => item.chunk);
  }

  private cosineSimilarity(a: number[], b: number[]): number {
    if (a.length !== b.length) return 0;
    
    let dotProduct = 0;
    let normA = 0;
    let normB = 0;
    
    for (let i = 0; i < a.length; i++) {
      dotProduct += a[i] * b[i];
      normA += a[i] * a[i];
      normB += b[i] * b[i];
    }
    
    return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
  }

  async save(filePath: string) {
    const data = {
      chunks: this.chunks,
      embeddings: Object.fromEntries(this.embeddings)
    };
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  }

  async load(filePath: string) {
    if (!fs.existsSync(filePath)) return;
    
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    this.chunks = data.chunks || [];
    this.embeddings = new Map(Object.entries(data.embeddings || {}));
  }
}

// Simple text chunking function
function splitIntoChunks(text: string, maxChunkSize: number = 500): string[] {
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const chunks: string[] = [];
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

// Simple embedding function (mock for development - replace with real OpenAI embeddings)
async function generateEmbedding(text: string): Promise<number[]> {
  // This is a mock embedding function
  // In production, replace with OpenAI embeddings API
  const words = text.toLowerCase().split(/\s+/);
  const embedding = new Array(384).fill(0); // Mock 384-dimensional embedding
  
  // Simple hash-based embedding for demo
  words.forEach(word => {
    const hash = word.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
    const index = Math.abs(hash) % 384;
    embedding[index] += 1;
  });
  
  // Normalize
  const norm = Math.sqrt(embedding.reduce((sum, val) => sum + val * val, 0));
  return embedding.map(val => val / norm);
}

// Content extraction functions
async function getAllPublicDocs(): Promise<KnowledgeDocument[]> {
  const docs: KnowledgeDocument[] = [];

  // Add automations content
  automations.forEach(automation => {
    docs.push({
      id: `automation-${automation.id}`,
      title: automation.title,
      content: `${automation.title}. ${automation.painPoint} ${automation.solution}`,
      type: 'automation',
      url: `/automations#${automation.id}`,
      metadata: {
        painPoint: automation.painPoint,
        solution: automation.solution
      }
    });
  });

  // Add static content pages
  const staticPages = [
    {
      id: 'homepage',
      title: 'OMGsystems - Business Automation Platform',
      content: 'OMGsystems provides intelligent automation, secure document management, and industry-specific solutions for property management, real estate, accounting, contractors, healthcare, and cleaning businesses. Our platform helps businesses build once and profit forever with comprehensive automation tools.',
      type: 'page' as const,
      url: '/'
    },
    {
      id: 'about',
      title: 'About OMGsystems',
      content: 'OMGsystems is a leading provider of business automation solutions. We empower businesses with intelligent automation, secure document management, and industry-specific solutions that drive growth and efficiency. Trusted by 10,000+ businesses worldwide.',
      type: 'page' as const,
      url: '/about'
    },
    {
      id: 'contact',
      title: 'Contact OMGsystems',
      content: 'Get in touch with OMGsystems for business automation solutions. Contact us for demos, pricing, and support. We help businesses across property management, real estate, accounting, contractors, healthcare, and cleaning industries.',
      type: 'page' as const,
      url: '/contact'
    }
  ];

  docs.push(...staticPages);

  // Add industry information
  const industries = [
    {
      id: 'property-management',
      title: 'Property Management Solutions',
      content: 'OMGsystems provides comprehensive automation solutions for property management companies. Our SmartRent Flow helps property managers streamline operations, automate tenant communications, and manage maintenance requests efficiently.',
      type: 'industry' as const,
      url: '/industries/property-management'
    },
    {
      id: 'real-estate',
      title: 'Real Estate Solutions',
      content: 'Our Agent Growth Engine helps real estate professionals automate lead generation, client follow-ups, and transaction management. Streamline your real estate business with intelligent automation.',
      type: 'industry' as const,
      url: '/industries/real-estate'
    },
    {
      id: 'accounting',
      title: 'Accounting Solutions',
      content: 'OMGsystems Financial Workflow Engine automates accounting processes, document management, and client communications. Perfect for accounting firms looking to streamline operations.',
      type: 'industry' as const,
      url: '/industries/accounting'
    },
    {
      id: 'contractors',
      title: 'Contractor Solutions',
      content: 'Our Project Growth Engine helps contractors manage projects, automate quotes, and streamline client communications. Built specifically for construction and contracting businesses.',
      type: 'industry' as const,
      url: '/industries/contractors'
    },
    {
      id: 'healthcare',
      title: 'Healthcare Solutions',
      content: 'CareFlow Automation helps healthcare providers manage patient communications, automate appointment scheduling, and streamline administrative tasks while maintaining HIPAA compliance.',
      type: 'industry' as const,
      url: '/industries/healthcare'
    },
    {
      id: 'cleaning',
      title: 'Cleaning Services Solutions',
      content: 'CleanFlow Engine automates scheduling, client communications, and service management for cleaning companies. Streamline your cleaning business operations.',
      type: 'industry' as const,
      url: '/industries/cleaning'
    }
  ];

  docs.push(...industries);

  // Add app information
  const apps = [
    {
      id: 'crm',
      title: 'CRM System',
      content: 'OMGsystems CRM helps businesses manage customer relationships, track leads, and automate sales processes. Built for service industries with industry-specific features.',
      type: 'app' as const,
      url: '/apps/crm'
    },
    {
      id: 'securevault',
      title: 'SecureVault Docs',
      content: 'SecureVault Docs provides secure document management with encryption, access controls, and automated filing. Perfect for businesses handling sensitive documents.',
      type: 'app' as const,
      url: '/apps/securevault-docs'
    },
    {
      id: 'leadflow',
      title: 'LeadFlow Engine',
      content: 'LeadFlow Engine automates lead generation, qualification, and nurturing. Capture leads from multiple sources and convert them into customers with intelligent automation.',
      type: 'app' as const,
      url: '/apps/leadflow-engine'
    },
    {
      id: 'industry-iq',
      title: 'IndustryIQ',
      content: 'IndustryIQ provides industry-specific insights and automation templates. Get tailored solutions for your specific industry needs.',
      type: 'app' as const,
      url: '/apps/industry-iq'
    }
  ];

  docs.push(...apps);

  // Add FAQ content
  const faqs = [
    {
      id: 'security',
      title: 'Data Security and Privacy',
      content: 'OMGsystems takes data security seriously. We use enterprise-grade encryption, secure data centers, and comply with industry standards. Your data is protected with 256-bit SSL encryption and stored in secure, SOC 2 compliant facilities.',
      type: 'faq' as const,
      url: '/trust'
    },
    {
      id: 'pricing',
      title: 'Pricing Information',
      content: 'OMGsystems offers flexible pricing plans to fit businesses of all sizes. Contact us for a custom quote based on your specific needs. We offer transparent pricing with no hidden fees.',
      type: 'faq' as const,
      url: '/pricing'
    },
    {
      id: 'integration',
      title: 'System Integration',
      content: 'OMGsystems integrates with popular business tools including Google Workspace, Microsoft 365, Slack, and many others. Our API allows custom integrations with your existing systems.',
      type: 'faq' as const,
      url: '/docs'
    }
  ];

  docs.push(...faqs);

  return docs;
}

// Main knowledge base building function
export async function buildKnowledgeIndex(): Promise<void> {
  console.log('🔍 Building knowledge index...');
  
  const vectorStore = new SimpleVectorStore();
  const docs = await getAllPublicDocs();
  
  console.log(`📚 Found ${docs.length} documents to process`);
  
  let chunkCount = 0;
  
  for (const doc of docs) {
    const chunks = splitIntoChunks(doc.content, 500);
    
    for (let i = 0; i < chunks.length; i++) {
      const chunk: KnowledgeChunk = {
        id: `${doc.id}-chunk-${i}`,
        documentId: doc.id,
        content: chunks[i],
        metadata: {
          title: doc.title,
          type: doc.type,
          url: doc.url,
          ...doc.metadata
        }
      };
      
      const embedding = await generateEmbedding(chunks[i]);
      await vectorStore.addChunk(chunk, embedding);
      chunkCount++;
    }
  }
  
  // Save the vector store
  const indexPath = path.join(process.cwd(), 'data', 'chatbot-index.json');
  await fs.promises.mkdir(path.dirname(indexPath), { recursive: true });
  await vectorStore.save(indexPath);
  
  console.log(`✅ Knowledge index built successfully!`);
  console.log(`📊 Processed ${docs.length} documents into ${chunkCount} chunks`);
}

// Load existing knowledge index
export async function loadKnowledgeIndex(): Promise<SimpleVectorStore> {
  const vectorStore = new SimpleVectorStore();
  const indexPath = path.join(process.cwd(), 'data', 'chatbot-index.json');
  
  try {
    await vectorStore.load(indexPath);
    console.log('📚 Knowledge index loaded successfully');
  } catch (error) {
    console.log('⚠️ No existing knowledge index found, building new one...');
    await buildKnowledgeIndex();
    await vectorStore.load(indexPath);
  }
  
  return vectorStore;
}

// Search function for the chatbot
export async function searchKnowledge(query: string, topK: number = 5): Promise<KnowledgeChunk[]> {
  const vectorStore = await loadKnowledgeIndex();
  const queryEmbedding = await generateEmbedding(query);
  return await vectorStore.search(queryEmbedding, topK);
}
