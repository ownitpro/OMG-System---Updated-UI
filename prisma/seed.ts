import { config } from 'dotenv';
config({ path: '.env.local' });

import { PrismaClient, UserRole } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // 1. Create internal organization
  const internalOrg = await prisma.organization.upsert({
    where: { slug: 'omg-systems' },
    update: {},
    create: {
      name: 'OMG Systems',
      slug: 'omg-systems',
      email: 'admin@omgsystems.ca',
      phone: '+1-555-0100',
    },
  });
  console.log('✓ Created internal organization');

  // 2. Create test client organization
  const clientOrg = await prisma.organization.upsert({
    where: { slug: 'test-client-org' },
    update: {},
    create: {
      name: 'Test Client Organization',
      slug: 'test-client-org',
      email: 'contact@testorg.com',
      phone: '+1-555-0200',
    },
  });
  console.log('✓ Created test client organization');

  // 3. Create admin user
  const adminPassword = await hash('Admin123!', 12);
  await prisma.user.upsert({
    where: { email: 'admin@omgsystems.ca' },
    update: {},
    create: {
      email: 'admin@omgsystems.ca',
      name: 'System Admin',
      role: UserRole.ADMIN,
      password: adminPassword,
      organizationId: internalOrg.id,
    },
  });
  console.log('✓ Created admin user');

  // 4. Create test client user (MVP mode - no password)
  const clientUser = await prisma.user.upsert({
    where: { email: 'client@testorg.com' },
    update: {},
    create: {
      email: 'client@testorg.com',
      name: 'Test Client',
      role: UserRole.CLIENT,
      password: null,
      organizationId: clientOrg.id,
      phone: '+1-555-0201',
      company: 'Test Client Organization',
      position: 'Owner',
    },
  });
  console.log('✓ Created test client user');

  // 5. Seed client data for testing

  // Subscriptions
  await prisma.subscription.createMany({
    data: [
      {
        userId: clientUser.id,
        plan: 'OMG-CRM Pro',
        status: 'ACTIVE',
        currentPeriodStart: new Date(),
        currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      },
      {
        userId: clientUser.id,
        plan: 'SecureVault Docs',
        status: 'ACTIVE',
        currentPeriodStart: new Date(),
        currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      },
    ],
    skipDuplicates: true,
  });
  console.log('✓ Created subscriptions');

  // Invoices
  await prisma.invoice.createMany({
    data: [
      {
        userId: clientUser.id,
        invoiceNumber: 'INV-2024-001',
        amount: 299.99,
        status: 'PAID',
        dueDate: new Date('2024-01-15'),
        paidAt: new Date('2024-01-10'),
        description: 'OMG-CRM Pro - January 2024',
      },
      {
        userId: clientUser.id,
        invoiceNumber: 'INV-2024-002',
        amount: 149.99,
        status: 'PAID',
        dueDate: new Date('2024-02-15'),
        paidAt: new Date('2024-02-12'),
        description: 'SecureVault Docs - February 2024',
      },
      {
        userId: clientUser.id,
        invoiceNumber: 'INV-2024-003',
        amount: 449.98,
        status: 'PENDING',
        dueDate: new Date('2024-03-15'),
        description: 'All Services - March 2024',
      },
    ],
    skipDuplicates: true,
  });
  console.log('✓ Created invoices');

  // Payment Methods
  await prisma.paymentMethod.createMany({
    data: [
      {
        userId: clientUser.id,
        type: 'card',
        last4: '4242',
        brand: 'visa',
        expiryMonth: 12,
        expiryYear: 2025,
        isDefault: true,
      },
      {
        userId: clientUser.id,
        type: 'card',
        last4: '5555',
        brand: 'mastercard',
        expiryMonth: 6,
        expiryYear: 2026,
        isDefault: false,
      },
    ],
    skipDuplicates: true,
  });
  console.log('✓ Created payment methods');

  // Strategy Sessions
  await prisma.strategySession.createMany({
    data: [
      {
        userId: clientUser.id,
        title: 'Q1 Marketing Strategy Review',
        description: 'Review marketing performance and plan Q2 initiatives',
        scheduledAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        durationMinutes: 60,
        status: 'SCHEDULED',
        meetingLink: 'https://meet.google.com/abc-defg-hij',
      },
      {
        userId: clientUser.id,
        title: 'Website Redesign Kickoff',
        scheduledAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
        durationMinutes: 90,
        status: 'COMPLETED',
        notes: 'Discussed new brand guidelines and timeline',
      },
    ],
    skipDuplicates: true,
  });
  console.log('✓ Created strategy sessions');

  // Time Entries
  await prisma.timeEntry.createMany({
    data: [
      {
        userId: clientUser.id,
        project: 'Website Redesign',
        description: 'Homepage wireframes',
        startTime: new Date('2024-01-15T09:00:00'),
        endTime: new Date('2024-01-15T12:30:00'),
        duration: 210,
        billable: true,
        tags: ['design', 'wireframes'],
      },
      {
        userId: clientUser.id,
        project: 'Marketing Campaign',
        description: 'Social media content creation',
        startTime: new Date('2024-01-15T14:00:00'),
        endTime: new Date('2024-01-15T17:00:00'),
        duration: 180,
        billable: true,
        tags: ['marketing', 'social'],
      },
      {
        userId: clientUser.id,
        project: 'Client Meetings',
        description: 'Strategy session preparation',
        startTime: new Date('2024-01-16T10:00:00'),
        endTime: new Date('2024-01-16T11:30:00'),
        duration: 90,
        billable: false,
        tags: ['meetings'],
      },
    ],
    skipDuplicates: true,
  });
  console.log('✓ Created time entries');

  // Support Tickets
  const ticket1 = await prisma.supportTicket.create({
    data: {
      userId: clientUser.id,
      subject: 'Login Issues on Mobile App',
      description: 'Having trouble logging into the mobile app. Getting "Invalid credentials" error even with correct password.',
      status: 'OPEN',
      priority: 'HIGH',
      category: 'Technical',
    },
  });

  const ticket2 = await prisma.supportTicket.create({
    data: {
      userId: clientUser.id,
      subject: 'Question about Billing Cycle',
      description: 'When does my billing cycle reset? I want to upgrade but want to time it right.',
      status: 'IN_PROGRESS',
      priority: 'MEDIUM',
      category: 'Billing',
    },
  });

  await prisma.supportTicket.create({
    data: {
      userId: clientUser.id,
      subject: 'Feature Request: Dark Mode',
      description: 'Would love to see a dark mode option for the dashboard.',
      status: 'CLOSED',
      priority: 'LOW',
      category: 'Feature Request',
    },
  });
  console.log('✓ Created support tickets');

  // Ticket Messages
  await prisma.ticketMessage.createMany({
    data: [
      {
        ticketId: ticket1.id,
        authorId: clientUser.id,
        content: 'I tried resetting my password but the issue persists. Can you help?',
        isStaff: false,
      },
      {
        ticketId: ticket2.id,
        authorId: clientUser.id,
        content: 'Also, can I get a detailed invoice breakdown?',
        isStaff: false,
      },
    ],
    skipDuplicates: true,
  });
  console.log('✓ Created ticket messages');

  // ================================================================
  // NEW CLIENT PORTAL FEATURES (Added Jan 2026)
  // ================================================================

  // Ad Campaigns
  await prisma.adCampaign.createMany({
    data: [
      {
        userId: clientUser.id,
        name: 'Summer Sale Campaign',
        description: 'Q4 promotional campaign targeting holiday shoppers',
        platform: 'Facebook',
        status: 'ACTIVE',
        budget: 1000.00,
        spent: 450.00,
        currency: 'CAD',
        startDate: new Date('2024-12-01'),
        endDate: new Date('2024-12-31'),
        impressions: 12500,
        clicks: 342,
        conversions: 28,
        ctr: 2.74,
        cpc: 1.32,
        targetAudience: 'Age 25-45, interested in tech',
      },
      {
        userId: clientUser.id,
        name: 'Brand Awareness',
        description: 'Building brand recognition in North American market',
        platform: 'Google Ads',
        status: 'ACTIVE',
        budget: 800.00,
        spent: 280.00,
        currency: 'CAD',
        startDate: new Date('2024-11-15'),
        endDate: new Date('2025-01-15'),
        impressions: 8200,
        clicks: 198,
        conversions: 15,
        ctr: 2.41,
        cpc: 1.41,
        targetAudience: 'Business professionals',
      },
      {
        userId: clientUser.id,
        name: 'Lead Generation',
        description: 'B2B lead generation campaign',
        platform: 'LinkedIn',
        status: 'PAUSED',
        budget: 600.00,
        spent: 320.00,
        currency: 'CAD',
        startDate: new Date('2024-12-10'),
        impressions: 4100,
        clicks: 156,
        conversions: 12,
        ctr: 3.80,
        cpc: 2.05,
        targetAudience: 'Decision makers, C-level',
      },
    ],
    skipDuplicates: true,
  });
  console.log('✓ Created ad campaigns');

  // Content Projects
  await prisma.contentProject.createMany({
    data: [
      {
        userId: clientUser.id,
        title: 'Complete Guide to Digital Marketing',
        description: 'Comprehensive 5000-word guide covering all aspects',
        type: 'Blog Post',
        status: 'PUBLISHED',
        dueDate: new Date('2024-11-30'),
        publishedAt: new Date('2024-12-01'),
        assignedTo: 'Sarah Johnson',
        wordCount: 5200,
        targetKeywords: JSON.stringify(['digital marketing', 'strategy']),
      },
      {
        userId: clientUser.id,
        title: 'Product Demo Video',
        description: '3-minute product walkthrough video',
        type: 'Video',
        status: 'IN_PROGRESS',
        dueDate: new Date('2025-01-20'),
        assignedTo: 'Video Team',
        targetKeywords: JSON.stringify(['product demo', 'tutorial']),
      },
    ],
    skipDuplicates: true,
  });
  console.log('✓ Created content projects');

  // Automations
  await prisma.automation.createMany({
    data: [
      {
        userId: clientUser.id,
        name: 'Lead Follow-up Sequence',
        description: 'Auto send follow-up emails after 24, 48, 72 hours',
        type: 'Email Sequence',
        status: 'ACTIVE',
        trigger: JSON.stringify({ event: 'new_lead' }),
        actions: JSON.stringify([{ type: 'send_email', delay: 24 }]),
        totalRuns: 45,
        successfulRuns: 42,
        failedRuns: 3,
        lastRunAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
        lastRunStatus: 'SUCCESS',
      },
      {
        userId: clientUser.id,
        name: 'Client Onboarding',
        description: 'Trigger welcome email and create task list',
        type: 'Workflow',
        status: 'ACTIVE',
        trigger: JSON.stringify({ event: 'new_client' }),
        actions: JSON.stringify([{ type: 'send_email' }]),
        totalRuns: 8,
        successfulRuns: 7,
        failedRuns: 1,
        lastRunAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
        lastRunStatus: 'SUCCESS',
      },
    ],
    skipDuplicates: true,
  });
  console.log('✓ Created automations');

  // Brand Assets
  await prisma.brandAsset.createMany({
    data: [
      {
        userId: clientUser.id,
        name: 'Primary Logo - Full Color',
        description: 'Main company logo with full color',
        type: 'Logo',
        category: 'Primary',
        fileSize: 245000,
        fileFormat: 'SVG',
        dimensions: '1920x1080',
        colorCodes: JSON.stringify(['#47BD79', '#3B82F6']),
        version: '2.0',
        tags: JSON.stringify(['logo', 'primary']),
        downloadCount: 45,
        lastDownloadAt: new Date('2024-12-28'),
      },
      {
        userId: clientUser.id,
        name: 'Brand Color Palette',
        description: 'Official brand colors with hex codes',
        type: 'Color Palette',
        category: 'Primary',
        fileSize: 150000,
        fileFormat: 'PDF',
        colorCodes: JSON.stringify(['#47BD79', '#3B82F6', '#A855F7']),
        version: '1.0',
        tags: JSON.stringify(['colors', 'palette']),
        downloadCount: 67,
        lastDownloadAt: new Date('2025-01-05'),
      },
    ],
    skipDuplicates: true,
  });
  console.log('✓ Created brand assets');

  // Custom Projects
  await prisma.customProject.createMany({
    data: [
      {
        userId: clientUser.id,
        name: 'CRM Integration',
        description: 'Custom API integration with existing CRM system',
        type: 'Integration',
        status: 'IN_PROGRESS',
        startDate: new Date('2024-12-01'),
        targetEndDate: new Date('2025-01-30'),
        progress: 65,
        milestones: JSON.stringify([
          { name: 'Discovery', completed: true },
          { name: 'Development', completed: false },
        ]),
        deliverables: JSON.stringify(['API Docs', 'Integration Code']),
        nextDeliverable: 'API Documentation',
        assignedTeam: JSON.stringify(['Backend Dev', 'QA Engineer']),
        estimatedHours: 120,
        actualHours: 78,
        budget: 15000,
        spent: 9750,
        currency: 'CAD',
      },
      {
        userId: clientUser.id,
        name: 'Custom Dashboard',
        description: 'Executive reporting dashboard with real-time analytics',
        type: 'Development',
        status: 'REVIEW',
        startDate: new Date('2024-11-15'),
        targetEndDate: new Date('2025-01-10'),
        progress: 90,
        milestones: JSON.stringify([
          { name: 'Development', completed: true },
          { name: 'Testing', completed: false },
        ]),
        deliverables: JSON.stringify(['Dashboard UI', 'API']),
        nextDeliverable: 'User Manual',
        assignedTeam: JSON.stringify(['Frontend Dev', 'Backend Dev']),
        estimatedHours: 200,
        actualHours: 185,
        budget: 25000,
        spent: 23125,
        currency: 'CAD',
      },
    ],
    skipDuplicates: true,
  });
  console.log('✓ Created custom projects');

  console.log('\n✅ Seeding complete!');
  console.log('\n📊 Summary:');
  console.log('  - Organizations: 2 (OMG Systems, Test Client Org)');
  console.log('  - Users: 2 (Admin, Test Client)');
  console.log('  - Subscriptions: 2');
  console.log('  - Invoices: 3');
  console.log('  - Payment Methods: 2');
  console.log('  - Strategy Sessions: 2');
  console.log('  - Time Entries: 3');
  console.log('  - Support Tickets: 3');
  console.log('  - Ticket Messages: 2');
  console.log('  - Ad Campaigns: 3 🆕');
  console.log('  - Content Projects: 2 🆕');
  console.log('  - Automations: 2 🆕');
  console.log('  - Brand Assets: 2 🆕');
  console.log('  - Custom Projects: 2 🆕');
  console.log('\n🔐 Test Credentials:');
  console.log('  Admin: admin@omgsystems.ca / Admin123!');
  console.log('  Client: client@testorg.com (MVP mode - no password)');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
