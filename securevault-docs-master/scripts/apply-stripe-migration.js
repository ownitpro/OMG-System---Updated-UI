
const { Client } = require('pg');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

// Load environment variables
const envPath = path.resolve(__dirname, '../.env.production');
if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath });
} else {
  dotenv.config(); // fallback to .env
}

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function migrate() {
  try {
    await client.connect();
    console.log('Connected to database.');

    const schemaMap = {
      'User': 'core',
      'Organization': 'core',
    };

    // Helper to add column
    const addColumn = async (table, column, type) => {
      // Try with core schema first (as per db-utils)
      let tableName = `${schemaMap[table]}."${table}"`;
      
      console.log(`Adding ${column} to ${tableName}...`);
      
      try {
        await client.query(`ALTER TABLE ${tableName} ADD COLUMN IF NOT EXISTS "${column}" ${type}`);
        console.log(`✅ Added ${column} to ${tableName}`);
      } catch (e) {
        // If core schema fails, try public or just table name
        console.log(`Map schema failed: ${e.message}. Trying public."${table}"...`);
        try {
            tableName = `public."${table}"`;
            await client.query(`ALTER TABLE ${tableName} ADD COLUMN IF NOT EXISTS "${column}" ${type}`);
            console.log(`✅ Added ${column} to ${tableName}`);
        } catch (e2) {
             console.log(`Public schema failed: ${e2.message}. Trying just "${table}"...`);
             tableName = `"${table}"`;
             await client.query(`ALTER TABLE ${tableName} ADD COLUMN IF NOT EXISTS "${column}" ${type}`);
             console.log(`✅ Added ${column} to ${tableName}`);
        }
      }
    };

    // User Columns
    await addColumn('User', 'stripeCustomerId', 'TEXT');
    await addColumn('User', 'stripeSubscriptionId', 'TEXT');
    await addColumn('User', 'stripeSubscriptionStatus', 'TEXT');
    await addColumn('User', 'stripePriceId', 'TEXT');
    await addColumn('User', 'subscriptionPeriodEnd', 'TIMESTAMP WITH TIME ZONE');
    await addColumn('User', 'trialExpiresAt', 'TIMESTAMP WITH TIME ZONE');
    await addColumn('User', 'accountType', "TEXT DEFAULT 'personal'");

    // Organization Columns (Just in case)
    await addColumn('Organization', 'stripeCustomerId', 'TEXT');
    await addColumn('Organization', 'stripeSubscriptionId', 'TEXT');
    await addColumn('Organization', 'stripeSubscriptionStatus', 'TEXT');
    await addColumn('Organization', 'stripePriceId', 'TEXT');
    await addColumn('Organization', 'subscriptionPeriodEnd', 'TIMESTAMP WITH TIME ZONE');

    console.log('Migration complete!');
    process.exit(0);
  } catch (err) {
    console.error('Migration failed:', err);
    process.exit(1);
  } finally {
    await client.end();
  }
}

migrate();
