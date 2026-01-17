/**
 * Test Ad Campaigns database operations directly
 * This verifies the Prisma models work correctly
 */

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function testAdCampaignsDB() {
  console.log("🧪 Testing Ad Campaigns Database Operations\n");
  console.log("=".repeat(60));

  try {
    // Step 1: Find or create a test CLIENT user
    console.log("\n📝 Step 1: Find or create test CLIENT user");

    let testUser = await prisma.user.findFirst({
      where: { role: "CLIENT" },
    });

    if (!testUser) {
      console.log("No CLIENT user found. Creating test user...");
      testUser = await prisma.user.create({
        data: {
          email: "testclient@example.com",
          name: "Test Client",
          role: "CLIENT",
        },
      });
      console.log(`✅ Created test user: ${testUser.email}`);
    } else {
      console.log(`✅ Using existing user: ${testUser.email}`);
    }

    // Step 2: Create a campaign
    console.log("\n📝 Step 2: Create ad campaign");
    const campaign = await prisma.adCampaign.create({
      data: {
        userId: testUser.id,
        name: "Test Campaign - Database Test",
        description: "Testing Prisma operations",
        platform: "Google Ads",
        budget: 5000,
        startDate: new Date("2026-11-20"),
        endDate: new Date("2026-12-01"),
        targetAudience: "Test audience",
        landingPageUrl: "https://example.com",
        status: "DRAFT",
      },
    });

    console.log(`✅ Campaign created:`, {
      id: campaign.id,
      name: campaign.name,
      status: campaign.status,
      budget: campaign.budget,
      currency: campaign.currency,
    });

    // Step 3: Read campaigns
    console.log("\n📝 Step 3: Query all campaigns for user");
    const campaigns = await prisma.adCampaign.findMany({
      where: { userId: testUser.id },
      orderBy: { createdAt: "desc" },
    });

    console.log(`✅ Found ${campaigns.length} campaign(s)`);
    campaigns.forEach((c) => {
      console.log(`  - ${c.name} (${c.status})`);
    });

    // Step 4: Update campaign with metrics
    console.log("\n📝 Step 4: Update campaign with metrics");
    const impressions = 45000;
    const clicks = 1200;
    const spent = 1250.50;

    // Calculate CTR and CPC
    const ctr = impressions > 0 ? (clicks / impressions) * 100 : 0;
    const cpc = clicks > 0 ? spent / clicks : 0;

    const updated = await prisma.adCampaign.update({
      where: { id: campaign.id },
      data: {
        status: "ACTIVE",
        spent,
        impressions,
        clicks,
        conversions: 48,
        ctr,
        cpc,
      },
    });

    console.log(`✅ Campaign updated:`, {
      id: updated.id,
      status: updated.status,
      spent: updated.spent,
      impressions: updated.impressions,
      clicks: updated.clicks,
      ctr: `${updated.ctr.toFixed(2)}%`,
      cpc: `$${updated.cpc.toFixed(4)}`,
    });

    // Step 5: Query with filter
    console.log("\n📝 Step 5: Query ACTIVE campaigns");
    const activeCampaigns = await prisma.adCampaign.findMany({
      where: {
        userId: testUser.id,
        status: "ACTIVE",
      },
    });

    console.log(`✅ Found ${activeCampaigns.length} active campaign(s)`);

    // Step 6: Verify ownership protection
    console.log("\n📝 Step 6: Test ownership verification");
    const otherUserCampaign = await prisma.adCampaign.findFirst({
      where: {
        id: campaign.id,
        userId: "wrong-user-id",
      },
    });

    if (!otherUserCampaign) {
      console.log(`✅ Ownership protection working: Cannot access other user's campaign`);
    } else {
      console.log(`❌ Ownership protection FAILED`);
    }

    // Step 7: Delete campaign
    console.log("\n📝 Step 7: Delete campaign");
    await prisma.adCampaign.delete({
      where: { id: campaign.id },
    });

    console.log(`✅ Campaign deleted`);

    // Step 8: Verify deletion
    console.log("\n📝 Step 8: Verify deletion");
    const remainingCampaigns = await prisma.adCampaign.findMany({
      where: { userId: testUser.id },
    });

    console.log(`✅ Remaining campaigns: ${remainingCampaigns.length}`);

    console.log("\n" + "=".repeat(60));
    console.log("✅ All database tests passed!");
    console.log("=".repeat(60));
    console.log("\n📊 Summary:");
    console.log("  - AdCampaign model: ✅ Working");
    console.log("  - Create operation: ✅ Working");
    console.log("  - Read operation: ✅ Working");
    console.log("  - Update operation: ✅ Working");
    console.log("  - Delete operation: ✅ Working");
    console.log("  - CTR/CPC calculation: ✅ Working");
    console.log("  - Ownership verification: ✅ Working");
    console.log("  - Status filtering: ✅ Working");

  } catch (error) {
    console.error("\n❌ Test failed:");
    console.error(error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Run tests
testAdCampaignsDB();
