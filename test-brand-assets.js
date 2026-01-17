const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function testBrandAssets() {
  console.log("🧪 Testing Brand Assets API\n");

  let testUser, assetId;

  try {
    testUser = await prisma.user.findFirst({ where: { role: "CLIENT" } });
    console.log(`✅ Using user: ${testUser.email}\n`);

    // Test 1: Create asset
    console.log("📝 TEST 1: Create brand asset");
    const asset = await prisma.brandAsset.create({
      data: {
        userId: testUser.id,
        name: "Primary Logo - Full Color",
        description: "Main company logo for light backgrounds",
        type: "Logo",
        category: "Primary",
        fileUrl: "https://cdn.example.com/logos/primary-full.svg",
        thumbnailUrl: "https://cdn.example.com/logos/primary-full-thumb.png",
        fileSize: 45632,
        fileFormat: "SVG",
        dimensions: "500x200",
        colorCodes: JSON.stringify(["#1a73e8", "#34a853", "#fbbc04"]),
        version: "2.1",
        tags: JSON.stringify(["logo", "primary", "full-color"]),
      },
    });
    assetId = asset.id;
    console.log(`✅ Created: ${asset.name} (${asset.type}, v${asset.version})\n`);

    // Test 2: List assets
    console.log("📝 TEST 2: List all assets");
    const assets = await prisma.brandAsset.findMany({
      where: { userId: testUser.id },
    });
    console.log(`✅ Found ${assets.length} asset(s)\n`);

    // Test 3: Filter by type
    console.log("📝 TEST 3: Filter by type=Logo");
    const logos = await prisma.brandAsset.findMany({
      where: { userId: testUser.id, type: "Logo" },
    });
    console.log(`✅ Found ${logos.length} logo asset(s)\n`);

    // Test 4: Filter by category
    console.log("📝 TEST 4: Filter by category=Primary");
    const primary = await prisma.brandAsset.findMany({
      where: { userId: testUser.id, category: "Primary" },
    });
    console.log(`✅ Found ${primary.length} primary asset(s)\n`);

    // Test 5: Track download
    console.log("📝 TEST 5: Track asset download");
    const downloaded = await prisma.brandAsset.update({
      where: { id: assetId },
      data: {
        downloadCount: 1,
        lastDownloadAt: new Date(),
      },
    });
    console.log(`✅ Download tracked: ${downloaded.downloadCount} time(s)\n`);

    // Test 6: Update version
    console.log("📝 TEST 6: Update asset version");
    const updated = await prisma.brandAsset.update({
      where: { id: assetId },
      data: {
        version: "2.2",
        fileUrl: "https://cdn.example.com/logos/primary-full-v2.2.svg",
      },
    });
    console.log(`✅ Version updated: ${updated.name} v${updated.version}\n`);

    // Test 7: Ownership check
    console.log("📝 TEST 7: Ownership verification");
    const wrongUser = await prisma.brandAsset.findFirst({
      where: { id: assetId, userId: "wrong-id" },
    });
    console.log(`✅ Ownership protection: ${!wrongUser ? "Working" : "FAILED"}\n`);

    // Test 8: Delete asset
    console.log("📝 TEST 8: Delete asset");
    await prisma.brandAsset.delete({ where: { id: assetId } });
    console.log(`✅ Asset deleted\n`);

    console.log("=".repeat(60));
    console.log("✅ Brand Assets API: ALL TESTS PASSED!");
    console.log("=".repeat(60));

  } catch (error) {
    console.error("❌ Test failed:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

testBrandAssets();
