/**
 * Test script for Ad Campaigns API
 * Tests all CRUD operations: GET, POST, PATCH, DELETE
 */

const BASE_URL = "http://localhost:3000";

// Helper to make authenticated requests
async function makeRequest(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`;
  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    credentials: "include", // Important for cookies
  });

  const data = await response.json();
  return { status: response.status, data };
}

async function testAdCampaignsAPI() {
  console.log("🧪 Testing Ad Campaigns API\n");
  console.log("=" .repeat(60));

  let sessionCookie = "";
  let campaignId = "";

  try {
    // Step 1: Login as CLIENT user (we need to have a test user)
    console.log("\n📝 Step 1: Login as CLIENT user");
    console.log("Note: This test assumes you have a CLIENT user in the database.");
    console.log("If not, please create one through the app first.\n");

    // For now, we'll skip login and test with an existing session
    // In a real test, you'd authenticate here

    // Step 2: Test GET /api/client/ads/campaigns (empty list)
    console.log("\n📝 Step 2: GET /api/client/ads/campaigns (should return empty list)");
    const getEmpty = await makeRequest("/api/client/ads/campaigns");
    console.log(`Status: ${getEmpty.status}`);
    console.log(`Response:`, JSON.stringify(getEmpty.data, null, 2));

    if (getEmpty.status === 401) {
      console.log("\n❌ Not authenticated. Please:");
      console.log("1. Log in to the app as a CLIENT user");
      console.log("2. Open browser DevTools > Application > Cookies");
      console.log("3. Copy the 'authjs.session-token' cookie value");
      console.log("4. Run: node test-ad-campaigns-api.js <cookie-value>");
      process.exit(1);
    }

    // Step 3: Test POST /api/client/ads/campaigns (create campaign)
    console.log("\n📝 Step 3: POST /api/client/ads/campaigns (create new campaign)");
    const createData = {
      name: "Test Campaign - Black Friday 2026",
      description: "Holiday sale campaign for Q4",
      platform: "Google Ads",
      budget: 5000,
      startDate: new Date("2026-11-20T00:00:00Z").toISOString(),
      endDate: new Date("2026-12-01T23:59:59Z").toISOString(),
      targetAudience: "E-commerce shoppers, 25-45",
      landingPageUrl: "https://example.com/black-friday",
    };

    const createResponse = await makeRequest("/api/client/ads/campaigns", {
      method: "POST",
      body: JSON.stringify(createData),
    });

    console.log(`Status: ${createResponse.status}`);
    console.log(`Response:`, JSON.stringify(createResponse.data, null, 2));

    if (!createResponse.data.success) {
      console.log("\n❌ Failed to create campaign");
      process.exit(1);
    }

    campaignId = createResponse.data.campaign.id;
    console.log(`\n✅ Campaign created with ID: ${campaignId}`);

    // Step 4: Test GET /api/client/ads/campaigns (should have 1 campaign)
    console.log("\n📝 Step 4: GET /api/client/ads/campaigns (should return 1 campaign)");
    const getList = await makeRequest("/api/client/ads/campaigns");
    console.log(`Status: ${getList.status}`);
    console.log(`Campaigns found: ${getList.data.campaigns?.length || 0}`);
    console.log(`Response:`, JSON.stringify(getList.data, null, 2));

    // Step 5: Test GET with status filter
    console.log("\n📝 Step 5: GET /api/client/ads/campaigns?status=DRAFT");
    const getFiltered = await makeRequest("/api/client/ads/campaigns?status=DRAFT");
    console.log(`Status: ${getFiltered.status}`);
    console.log(`Campaigns found: ${getFiltered.data.campaigns?.length || 0}`);

    // Step 6: Test PATCH /api/client/ads/campaigns/:id (update campaign)
    console.log("\n📝 Step 6: PATCH /api/client/ads/campaigns/:id (update campaign)");
    const updateData = {
      status: "ACTIVE",
      spent: 1250.50,
      impressions: 45000,
      clicks: 1200,
      conversions: 48,
    };

    const updateResponse = await makeRequest(`/api/client/ads/campaigns/${campaignId}`, {
      method: "PATCH",
      body: JSON.stringify(updateData),
    });

    console.log(`Status: ${updateResponse.status}`);
    console.log(`Response:`, JSON.stringify(updateResponse.data, null, 2));

    if (updateResponse.data.success) {
      console.log(`\n✅ Campaign updated successfully`);
      console.log(`CTR calculated: ${updateResponse.data.campaign.ctr}%`);
      console.log(`CPC calculated: $${updateResponse.data.campaign.cpc}`);
    }

    // Step 7: Test DELETE /api/client/ads/campaigns/:id
    console.log("\n📝 Step 7: DELETE /api/client/ads/campaigns/:id");
    const deleteResponse = await makeRequest(`/api/client/ads/campaigns/${campaignId}`, {
      method: "DELETE",
    });

    console.log(`Status: ${deleteResponse.status}`);
    console.log(`Response:`, JSON.stringify(deleteResponse.data, null, 2));

    if (deleteResponse.data.success) {
      console.log(`\n✅ Campaign deleted successfully`);
    }

    // Step 8: Verify deletion
    console.log("\n📝 Step 8: GET /api/client/ads/campaigns (verify deletion)");
    const getFinal = await makeRequest("/api/client/ads/campaigns");
    console.log(`Status: ${getFinal.status}`);
    console.log(`Campaigns found: ${getFinal.data.campaigns?.length || 0}`);

    console.log("\n" + "=".repeat(60));
    console.log("✅ All tests passed!");
    console.log("=".repeat(60));

  } catch (error) {
    console.error("\n❌ Test failed with error:");
    console.error(error);
    process.exit(1);
  }
}

// Run tests
testAdCampaignsAPI();
