/**
 * Enhanced Knowledge Ingestion System
 * 
 * This system provides comprehensive knowledge base building with:
 * - Multi-turn conversation context
 * - Content metadata management
 * - Micro-content snippets
 * - Enhanced retrieval and ranking
 */

import fs from 'fs';
import path from 'path';
import { CONTENT_SOURCES, getAllIngestibleContent, ContentMetadata } from '@/lib/content-metadata';

// Mock embedding function (replace with real embedding service)
async function getEmbedding(text: string): Promise<number[]> {
  // Simple hash-based embedding for demonstration
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    const char = text.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0;
  }
  return Array.from({ length: 128 }, (_, i) => (hash % (i + 10)) / 100);
}

interface Document {
  id: string;
  content: string;
  metadata: {
    title: string;
    url: string;
    type: string;
    priority: string;
    tags: string[];
    lastUpdated: string;
    source: string;
  };
}

interface KnowledgeChunk {
  id: string;
  embedding: number[];
  text: string;
  metadata: {
    docId: string;
    title: string;
    url: string;
    type: string;
    priority: string;
    tags: string[];
    chunkIndex: number;
    source: string;
    isSnippet: boolean;
  };
}

interface ConversationContext {
  sessionId: string;
  messages: Array<{
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
  }>;
  lastActivity: Date;
  topicContext?: string;
  industryContext?: string;
}

let knowledgeIndex: KnowledgeChunk[] = [];
let conversationContexts: Map<string, ConversationContext> = new Map();
const KNOWLEDGE_BASE_PATH = path.join(process.cwd(), 'data', 'enhanced-chatbot-index.json');
const CONTEXT_PATH = path.join(process.cwd(), 'data', 'conversation-contexts.json');

// Content loading functions
async function loadIndustryContent(): Promise<Document[]> {
  const docs: Document[] = [];
  
  try {
    // Use static imports instead of dynamic file path imports
    const industryModules = [
      { module: () => import('@/content/propertymanagement'), id: 'propertymanagement', slug: 'property-management' },
      { module: () => import('@/content/realestate'), id: 'realestate', slug: 'real-estate' },
      { module: () => import('@/content/contractors'), id: 'contractors', slug: 'contractors' },
      { module: () => import('@/content/accounting'), id: 'accounting', slug: 'accounting' },
      { module: () => import('@/content/cleaning'), id: 'cleaning', slug: 'cleaning' },
      { module: () => import('@/content/healthcare'), id: 'healthcare', slug: 'healthcare' }
    ];

    for (const { module, id, slug } of industryModules) {
      try {
        const content = await module();
        const industryData = content.default || content;
        
        if (industryData) {
          docs.push({
            id: `industry-${id}`,
            content: JSON.stringify(industryData, null, 2),
            metadata: {
              title: `${industryData.title || id} Industry Solutions`,
              url: `/industries/${slug}`,
              type: 'industry',
              priority: 'high',
              tags: ['industry', id, 'solutions'],
              lastUpdated: new Date().toISOString(),
              source: 'content-files'
            }
          });
        }
      } catch (error) {
        console.warn(`Failed to load industry content from ${id}:`, error);
      }
    }
  } catch (error) {
    console.warn('Failed to load industry content:', error);
  }

  return docs;
}

async function loadAppContent(): Promise<Document[]> {
  const docs: Document[] = [];
  
  try {
    // Use static imports instead of dynamic file path imports
    const appModules = [
      { module: () => import('@/content/crm'), id: 'crm', slug: 'crm' },
      { module: () => import('@/content/securevaultdocs'), id: 'securevaultdocs', slug: 'securevault-docs' },
      { module: () => import('@/content/leadflow'), id: 'leadflow', slug: 'leadflow' }
    ];

    for (const { module, id, slug } of appModules) {
      try {
        const content = await module();
        const appData = content.default || content;
        
        if (appData) {
          docs.push({
            id: `app-${id}`,
            content: JSON.stringify(appData, null, 2),
            metadata: {
              title: `${appData.title || id} Application`,
              url: `/apps/${slug}`,
              type: 'app',
              priority: 'high',
              tags: ['app', id, 'features'],
              lastUpdated: new Date().toISOString(),
              source: 'content-files'
            }
          });
        }
      } catch (error) {
        console.warn(`Failed to load app content from ${id}:`, error);
      }
    }
  } catch (error) {
    console.warn('Failed to load app content:', error);
  }

  return docs;
}

async function loadAutomationContent(): Promise<Document[]> {
  const docs: Document[] = [];
  
  try {
    const { automations } = await import('@/content/automations');
    if (automations) {
      automations.forEach((automation: any) => {
        docs.push({
          id: `automation-${automation.id}`,
          content: `${automation.title}: ${automation.painPoint} ${automation.solution}`,
          metadata: {
            title: automation.title,
            url: `/automations#${automation.id}`,
            type: 'automation',
            priority: 'high',
            tags: ['automation', 'workflow', 'productivity'],
            lastUpdated: new Date().toISOString(),
            source: 'automations-content'
          }
        });
      });
    }
  } catch (error) {
    console.warn('Failed to load automation content:', error);
  }

  return docs;
}

async function loadBlogContent(): Promise<Document[]> {
  const docs: Document[] = [];
  
  try {
    // Mock blog data for now (in production, this would read actual blog files)
    const blogPosts = [
      {
        id: 'property-management-owner-statements',
        title: 'How Ontario Property Managers Cut Owner Statement Time',
        summary: 'Case study on property management automation showing 75% reduction in owner statement processing time.',
        content: 'Property managers in Ontario have successfully implemented automation solutions to streamline their owner statement processes.'
      },
      {
        id: 'contractor-fast-quote',
        title: 'The 45-Minute Quote: How Ontario Builders Win Jobs Faster',
        summary: 'Contractor automation case study showing how builders reduced quote time from hours to 45 minutes.',
        content: 'Ontario contractors have revolutionized their quoting process using automated tools and templates.'
      },
      {
        id: 'healthcare-careflow',
        title: 'From Paper Charts to CareFlow: How Ontario Clinics Reduced Admin Time',
        summary: 'Healthcare automation case study showing 60% reduction in administrative time.',
        content: 'Healthcare clinics in Ontario have digitized their workflows and reduced administrative overhead significantly.'
      }
    ];

    blogPosts.forEach((post) => {
      docs.push({
        id: `blog-${post.id}`,
        content: `${post.title}: ${post.summary} ${post.content}`,
        metadata: {
          title: post.title,
          url: `/blog/${post.id}`,
          type: 'blog',
          priority: 'medium',
          tags: ['blog', 'case-study', 'automation'],
          lastUpdated: new Date().toISOString(),
          source: 'blog-content'
        }
      });
    });
  } catch (error) {
    console.warn('Failed to load blog content:', error);
  }

  return docs;
}

async function loadCaseStudyContent(): Promise<Document[]> {
  const docs: Document[] = [];
  
  try {
    const { snapshots } = await import('@/content/case-snapshots');
    if (snapshots) {
      snapshots.forEach((snapshot: any) => {
        docs.push({
          id: `case-study-${snapshot.slug}`,
          content: `${snapshot.title}: ${snapshot.description} ${snapshot.challenge} ${snapshot.solution}`,
          metadata: {
            title: snapshot.title,
            url: `/case-snapshots/${snapshot.slug}`,
            type: 'case-study',
            priority: 'high',
            tags: ['case-study', 'success-story', 'automation'],
            lastUpdated: new Date().toISOString(),
            source: 'case-snapshots'
          }
        });
      });
    }
  } catch (error) {
    console.warn('Failed to load case study content:', error);
  }

  return docs;
}

async function loadMicroSnippets(): Promise<Document[]> {
  const docs: Document[] = [];
  const allContent = getAllIngestibleContent();
  
  allContent.forEach(content => {
    if (content.contentSnippets) {
      content.contentSnippets.forEach((snippet, index) => {
        docs.push({
          id: `snippet-${content.id}-${index}`,
          content: snippet,
          metadata: {
            title: `${content.title} - ${snippet.substring(0, 50)}...`,
            url: content.url,
            type: content.type,
            priority: content.priority,
            tags: content.tags,
            lastUpdated: content.lastUpdated,
            source: 'micro-snippets'
          }
        });
      });
    }
  });

  return docs;
}

// Enhanced content loading
export async function getAllPublicDocs(): Promise<Document[]> {
  console.log('🔍 Loading all public content...');
  
  const [
    industryDocs,
    appDocs,
    automationDocs,
    blogDocs,
    caseStudyDocs,
    snippetDocs
  ] = await Promise.all([
    loadIndustryContent(),
    loadAppContent(),
    loadAutomationContent(),
    loadBlogContent(),
    loadCaseStudyContent(),
    loadMicroSnippets()
  ]);

  // Add static content
  const staticDocs: Document[] = [
    {
      id: 'homepage',
      content: 'OMGsystems unifies CRM, document management & automation across industries — helping teams launch in 1–3 weeks, cut admin time, and scale faster. We offer solutions for property management, real estate, contractors, accounting, cleaning, and healthcare.',
      metadata: {
        title: 'Homepage',
        url: '/',
        type: 'page',
        priority: 'high',
        tags: ['homepage', 'overview', 'solutions'],
        lastUpdated: new Date().toISOString(),
        source: 'static-content'
      }
    },
    {
      id: 'about-us',
      content: 'OMGsystems is a leading provider of business automation solutions. Our mission is to empower businesses to automate busywork and scale what matters. We are a Canadian company committed to innovation and customer success.',
      metadata: {
        title: 'About Us',
        url: '/about',
        type: 'page',
        priority: 'medium',
        tags: ['about', 'company', 'mission'],
        lastUpdated: new Date().toISOString(),
        source: 'static-content'
      }
    },
    {
      id: 'contact-us',
      content: 'Contact OMGsystems for sales inquiries, support, or partnership opportunities. You can reach us via our contact form, email, or phone. Our team is available Monday to Friday, 9 AM to 5 PM EST.',
      metadata: {
        title: 'Contact Us',
        url: '/contact',
        type: 'page',
        priority: 'medium',
        tags: ['contact', 'support', 'sales'],
        lastUpdated: new Date().toISOString(),
        source: 'static-content'
      }
    }
  ];

  const allDocs = [
    ...staticDocs,
    ...industryDocs,
    ...appDocs,
    ...automationDocs,
    ...blogDocs,
    ...caseStudyDocs,
    ...snippetDocs
  ];

  console.log(`📊 Loaded ${allDocs.length} documents:`);
  console.log(`  - Static content: ${staticDocs.length}`);
  console.log(`  - Industry pages: ${industryDocs.length}`);
  console.log(`  - App pages: ${appDocs.length}`);
  console.log(`  - Automations: ${automationDocs.length}`);
  console.log(`  - Blog posts: ${blogDocs.length}`);
  console.log(`  - Case studies: ${caseStudyDocs.length}`);
  console.log(`  - Micro snippets: ${snippetDocs.length}`);

  return allDocs;
}

// Enhanced chunking with context awareness
function splitIntoChunks(text: string, chunkSize: number = 500, overlap: number = 50): string[] {
  const words = text.split(/\s+/);
  const chunks: string[] = [];
  let currentChunk: string[] = [];
  let currentLength = 0;

  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    
    if (currentLength + word.length + 1 > chunkSize && currentChunk.length > 0) {
      chunks.push(currentChunk.join(' '));
      
      // Add overlap for context
      const overlapWords = currentChunk.slice(-Math.floor(overlap / 10));
      currentChunk = [...overlapWords, word];
      currentLength = currentChunk.join(' ').length;
    } else {
      currentChunk.push(word);
      currentLength += word.length + 1;
    }
  }
  
  if (currentChunk.length > 0) {
    chunks.push(currentChunk.join(' '));
  }
  
  return chunks;
}

// Build enhanced knowledge index
export async function buildEnhancedKnowledgeIndex() {
  console.log('🚀 Building enhanced knowledge base...');
  
  const docs = await getAllPublicDocs();
  const newKnowledgeIndex: KnowledgeChunk[] = [];
  let chunkCount = 0;

  for (const doc of docs) {
    const chunks = splitIntoChunks(doc.content);
    
    for (let i = 0; i < chunks.length; i++) {
      const chunkText = chunks[i];
      const embedding = await getEmbedding(chunkText);
      
      newKnowledgeIndex.push({
        id: `${doc.id}-chunk-${i}`,
        embedding,
        text: chunkText,
        metadata: {
          docId: doc.id,
          title: doc.metadata.title,
          url: doc.metadata.url,
          type: doc.metadata.type,
          priority: doc.metadata.priority,
          tags: doc.metadata.tags,
          chunkIndex: i,
          source: doc.metadata.source,
          isSnippet: doc.metadata.source === 'micro-snippets'
        }
      });
      chunkCount++;
    }
  }

  knowledgeIndex = newKnowledgeIndex;
  
  console.log(`✅ Enhanced knowledge base built successfully!`);
  console.log(`📊 Processed ${docs.length} documents into ${chunkCount} chunks`);

  // Save to file
  const dataDir = path.dirname(KNOWLEDGE_BASE_PATH);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  
  fs.writeFileSync(KNOWLEDGE_BASE_PATH, JSON.stringify(knowledgeIndex, null, 2));
  console.log(`💾 Saved to: ${KNOWLEDGE_BASE_PATH}`);
  
  return knowledgeIndex;
}

// Load enhanced knowledge index
export async function loadEnhancedKnowledgeIndex(): Promise<KnowledgeChunk[]> {
  if (knowledgeIndex.length > 0) {
    return knowledgeIndex;
  }
  
  if (fs.existsSync(KNOWLEDGE_BASE_PATH)) {
    const data = fs.readFileSync(KNOWLEDGE_BASE_PATH, 'utf-8');
    knowledgeIndex = JSON.parse(data);
    console.log('📚 Enhanced knowledge index loaded successfully');
    return knowledgeIndex;
  }
  
  console.warn('⚠️ Enhanced knowledge index not found. Building it now...');
  await buildEnhancedKnowledgeIndex();
  return knowledgeIndex;
}

// Enhanced similarity search with context awareness
function cosineSimilarity(vec1: number[], vec2: number[]): number {
  const dotProduct = vec1.reduce((sum, val, i) => sum + val * vec2[i], 0);
  const magnitude1 = Math.sqrt(vec1.reduce((sum, val) => sum + val * val, 0));
  const magnitude2 = Math.sqrt(vec2.reduce((sum, val) => sum + val * val, 0));
  if (magnitude1 === 0 || magnitude2 === 0) return 0;
  return dotProduct / (magnitude1 * magnitude2);
}

// Enhanced search with context and priority weighting
export async function searchEnhancedKnowledge(
  query: string, 
  topK: number = 5,
  context?: ConversationContext,
  industryFilter?: string,
  typeFilter?: string
): Promise<KnowledgeChunk[]> {
  const queryEmbedding = await getEmbedding(query);
  const index = await loadEnhancedKnowledgeIndex();

  // Score chunks with context awareness
  const scoredChunks = index.map(chunk => {
    let score = cosineSimilarity(queryEmbedding, chunk.embedding);
    
    // Boost priority chunks
    if (chunk.metadata.priority === 'high') score *= 1.2;
    if (chunk.metadata.priority === 'medium') score *= 1.1;
    
    // Boost snippets for quick answers
    if (chunk.metadata.isSnippet) score *= 1.3;
    
    // Apply filters
    if (industryFilter && !chunk.metadata.tags.includes(industryFilter)) {
      score *= 0.5;
    }
    
    if (typeFilter && chunk.metadata.type !== typeFilter) {
      score *= 0.5;
    }
    
    // Context awareness
    if (context) {
      // Boost chunks related to conversation context
      if (context.industryContext && chunk.metadata.tags.includes(context.industryContext)) {
        score *= 1.4;
      }
      
      if (context.topicContext && chunk.text.toLowerCase().includes(context.topicContext.toLowerCase())) {
        score *= 1.2;
      }
    }
    
    return { chunk, score };
  });

  scoredChunks.sort((a, b) => b.score - a.score);

  // Filter out low-scoring chunks and return top K
  const relevantChunks = scoredChunks
    .filter(item => item.score > 0.1)
    .slice(0, topK)
    .map(item => item.chunk);

  return relevantChunks;
}

// Conversation context management
export function getConversationContext(sessionId: string): ConversationContext | undefined {
  return conversationContexts.get(sessionId);
}

export function updateConversationContext(
  sessionId: string, 
  message: { role: 'user' | 'assistant'; content: string }
): ConversationContext {
  const existing = conversationContexts.get(sessionId) || {
    sessionId,
    messages: [],
    lastActivity: new Date()
  };
  
  const updated: ConversationContext = {
    ...existing,
    messages: [...existing.messages, { ...message, timestamp: new Date() }].slice(-10), // Keep last 10 messages
    lastActivity: new Date()
  };
  
  // Extract context from recent messages
  const recentMessages = updated.messages.slice(-3);
  const allText = recentMessages.map(m => m.content).join(' ').toLowerCase();
  
  // Detect industry context
  const industries = ['property', 'real-estate', 'contractor', 'accounting', 'cleaning', 'healthcare'];
  const detectedIndustry = industries.find(industry => allText.includes(industry));
  if (detectedIndustry) {
    updated.industryContext = detectedIndustry;
  }
  
  // Detect topic context
  const topics = ['automation', 'crm', 'documents', 'leads', 'billing', 'scheduling'];
  const detectedTopic = topics.find(topic => allText.includes(topic));
  if (detectedTopic) {
    updated.topicContext = detectedTopic;
  }
  
  conversationContexts.set(sessionId, updated);
  return updated;
}

export function clearConversationContext(sessionId: string): void {
  conversationContexts.delete(sessionId);
}

// Context expiration (clean up old contexts)
export function cleanupExpiredContexts(maxAgeMinutes: number = 30): void {
  const now = new Date();
  const maxAge = maxAgeMinutes * 60 * 1000;
  
  for (const [sessionId, context] of conversationContexts.entries()) {
    if (now.getTime() - context.lastActivity.getTime() > maxAge) {
      conversationContexts.delete(sessionId);
    }
  }
}
