// Test script for Design Requests API
// Run with: node test-design-requests.js

async function testDesignRequestsAPI() {
  const baseUrl = 'http://localhost:3000';

  console.log('🧪 Testing Design Requests API\n');

  // Test 1: Create a design request
  console.log('Test 1: Creating a design request...');
  try {
    const createResponse = await fetch(`${baseUrl}/api/client/design-requests`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        projectName: 'Test Project',
        designType: 'logo',
        description: 'Need a modern logo for our startup',
        deadline: '2026-02-01',
        budget: '1k_5k',
        assets: 'Current logo sketch attached',
      }),
    });

    const createData = await createResponse.json();

    if (createResponse.ok) {
      console.log('✅ Create successful!');
      console.log('Response:', JSON.stringify(createData, null, 2));
    } else {
      console.log('❌ Create failed:', createData);
    }

    console.log('\n---\n');
  } catch (error) {
    console.log('❌ Error creating design request:', error.message);
  }

  // Test 2: Get all design requests
  console.log('Test 2: Fetching all design requests...');
  try {
    const getResponse = await fetch(`${baseUrl}/api/client/design-requests`);
    const getData = await getResponse.json();

    if (getResponse.ok) {
      console.log('✅ Fetch successful!');
      console.log(`Found ${getData.data?.designRequests?.length || 0} design request(s)`);
      console.log('Response:', JSON.stringify(getData, null, 2));
    } else {
      console.log('❌ Fetch failed:', getData);
    }

    console.log('\n---\n');
  } catch (error) {
    console.log('❌ Error fetching design requests:', error.message);
  }

  console.log('🎉 Testing complete!');
}

testDesignRequestsAPI().catch(console.error);
