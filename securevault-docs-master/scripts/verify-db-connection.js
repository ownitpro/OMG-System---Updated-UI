const { Pool } = require('pg');
require('dotenv').config({ path: '.env' }); // Explicitly load .env file


async function testConnection() {
  console.log('🔍 Testing Database Connectivity...');
  
  if (!process.env.DATABASE_URL) {
    console.error('❌ Error: DATABASE_URL environment variable is not set.');
    process.exit(1);
  }

  // Mask password for logging
  const maskedUrl = process.env.DATABASE_URL.replace(/:([^:@]+)@/, ':****@');
  console.log(`📡 Connecting to: ${maskedUrl}`);

  const isLocal = process.env.DATABASE_URL.includes('localhost') || process.env.DATABASE_URL.includes('127.0.0.1');

  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: isLocal ? false : { rejectUnauthorized: false }, // Match src/lib/db.ts logic
    connectionTimeoutMillis: 5000, // Fail fast
  });

  try {
    const start = Date.now();
    const client = await pool.connect();
    const duration = Date.now() - start;
    
    console.log(`✅ Successfully connected in ${duration}ms`);

    const res = await client.query('SELECT version()');
    console.log(`📊 Database Version: ${res.rows[0].version}`);

    client.release();
    process.exit(0);
  } catch (err) {
    console.error('❌ Connection Failed!');
    console.error('---------------------------------------------------');
    console.error(`Error Name: ${err.name}`);
    console.error(`Error Message: ${err.message}`);
    if (err.code) console.error(`Error Code: ${err.code}`);
    if (err.address) console.error(`Address: ${err.address}`);
    if (err.port) console.error(`Port: ${err.port}`);
    console.error('---------------------------------------------------');
    
    if (err.message.includes('timeout')) {
      console.error('💡 TIP: "Connection terminated due to connection timeout" usually means a Firewall / Security Group issue.');
      console.error('   Ensure the AWS RDS Security Group allows inbound traffic on port 5432 from this EC2 instance.');
    }
    
    process.exit(1);
  } finally {
    await pool.end();
  }
}

testConnection();
