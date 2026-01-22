const https = require('https');

const SUPABASE_URL = 'https://tbutdoenrynwfqaqhttz.supabase.co';
const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRidXRkb2Vucnlud2ZxYXFodHR6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NDI5NjIwNiwiZXhwIjoyMDc5ODcyMjA2fQ.vIVy--OmcFZcjV2jfEinKyvEYtqrm8Y9K3qojjtulhg';

// First, check what columns the User table has
async function fetchWithSupabase(endpoint, options = {}) {
  return new Promise((resolve, reject) => {
    const url = new URL(endpoint, SUPABASE_URL);
    const reqOptions = {
      hostname: url.hostname,
      path: url.pathname + url.search,
      method: options.method || 'GET',
      headers: {
        'apikey': SERVICE_ROLE_KEY,
        'Authorization': `Bearer ${SERVICE_ROLE_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation',
        ...options.headers
      }
    };

    const req = https.request(reqOptions, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(data || '{}'), headers: res.headers });
        } catch (e) {
          resolve({ status: res.statusCode, data: data, headers: res.headers });
        }
      });
    });

    req.on('error', reject);
    if (options.body) req.write(JSON.stringify(options.body));
    req.end();
  });
}

async function main() {
  console.log('Checking User table columns via Supabase REST API...\n');

  // Try to select from User table with all expected columns
  const result = await fetchWithSupabase('/rest/v1/User?select=*&limit=1');

  console.log('Status:', result.status);

  if (result.status === 200) {
    console.log('\nREST API accessible. Checking column structure...');

    // Get the headers which contain column info
    const contentRange = result.headers['content-range'];
    console.log('Content-Range:', contentRange);

    if (result.data && result.data.length > 0) {
      console.log('\nExisting columns in User table:');
      Object.keys(result.data[0]).forEach(col => {
        console.log(`  - ${col}`);
      });

      // Check which columns are missing
      const requiredColumns = ['accountType', 'stripeCustomerId', 'stripeSubscriptionId',
        'stripeSubscriptionStatus', 'stripePriceId', 'subscriptionPeriodEnd',
        'trialStartedAt', 'trialExpiresAt'];

      const existingColumns = Object.keys(result.data[0]);
      const missingColumns = requiredColumns.filter(c => !existingColumns.includes(c));

      if (missingColumns.length === 0) {
        console.log('\n✅ All required columns already exist!');
      } else {
        console.log('\n❌ Missing columns:', missingColumns.join(', '));
        console.log('\nTo add these columns, run this SQL in the Supabase SQL Editor:');
        console.log('https://supabase.com/dashboard/project/tbutdoenrynwfqaqhttz/sql/new\n');
        missingColumns.forEach(col => {
          if (col === 'accountType') {
            console.log(`ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "${col}" TEXT DEFAULT 'personal';`);
          } else {
            console.log(`ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "${col}" TEXT;`);
          }
        });
      }
    } else {
      console.log('\nNo users in database yet.');
      console.log('\nThe signup should work now that we removed the extra columns from AuthContext.');
      console.log('Try signing up again at http://localhost:3000');
    }
  } else {
    console.log('\nResponse:', JSON.stringify(result.data, null, 2));
  }
}

main().catch(console.error);
