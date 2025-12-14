// Simple test to verify navigation is working
const puppeteer = require('puppeteer');

async function testNavigation() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  
  try {
    console.log('🚀 Testing navigation functionality...');
    
    // Navigate to the homepage
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
    console.log('✅ Homepage loaded successfully');
    
    // Wait for navigation to be ready
    await page.waitForSelector('nav', { timeout: 5000 });
    console.log('✅ Navigation element found');
    
    // Test if Industries dropdown button exists
    const industriesButton = await page.$('button:has-text("Industries")');
    if (industriesButton) {
      console.log('✅ Industries dropdown button found');
      
      // Click the Industries button
      await industriesButton.click();
      console.log('✅ Industries button clicked');
      
      // Wait a moment for dropdown to appear
      await page.waitForTimeout(1000);
      
      // Check if dropdown content is visible
      const dropdownContent = await page.$('div:has-text("Property Management")');
      if (dropdownContent) {
        console.log('✅ Industries dropdown content is visible');
      } else {
        console.log('❌ Industries dropdown content not visible');
      }
    } else {
      console.log('❌ Industries dropdown button not found');
    }
    
    // Test if Apps dropdown button exists
    const appsButton = await page.$('button:has-text("Apps")');
    if (appsButton) {
      console.log('✅ Apps dropdown button found');
    } else {
      console.log('❌ Apps dropdown button not found');
    }
    
    // Test if Demos dropdown button exists
    const demosButton = await page.$('button:has-text("Demos")');
    if (demosButton) {
      console.log('✅ Demos dropdown button found');
    } else {
      console.log('❌ Demos dropdown button not found');
    }
    
    // Test if Solutions dropdown button exists
    const solutionsButton = await page.$('button:has-text("Solutions")');
    if (solutionsButton) {
      console.log('✅ Solutions dropdown button found');
    } else {
      console.log('❌ Solutions dropdown button not found');
    }
    
    console.log('🎉 Navigation test completed!');
    
  } catch (error) {
    console.error('❌ Error during navigation test:', error);
  } finally {
    await browser.close();
  }
}

testNavigation();
