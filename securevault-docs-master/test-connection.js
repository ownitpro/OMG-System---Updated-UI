const { Pool } = require('pg');

const pool = new Pool({
  connectionString: 'postgresql://postgres:postgres@localhost:5434/securevault?schema=public',
  // Standard postgres image doesn't support SSL by default, so we disable it
  ssl: false 
});

async function test() {
  console.log('Testing connection to local Postgres...');
  try {
    const res = await pool.query('SELECT 1 as connected');
    console.log('✅ Connection successful:', res.rows[0]);
    
    // Check schemas
    const schemaRes = await pool.query(`SELECT schema_name FROM information_schema.schemata WHERE schema_name IN ('core', 'hub', 'securevault')`);
    console.log('✅ Schemas found:', schemaRes.rows.map(r => r.schema_name));
    
    // Check tables
    const tableRes = await pool.query(`SELECT table_schema, table_name FROM information_schema.tables WHERE table_schema IN ('core', 'securevault', 'hub') ORDER BY table_schema, table_name`);
    console.log('✅ Tables found:');
    tableRes.rows.forEach(r => console.log(`   - ${r.table_schema}.${r.table_name}`));

    // Check if test user exists
    const userRes = await pool.query(`SELECT id, email FROM core."User" LIMIT 1`);
    console.log('✅ Users found:', userRes.rows);

  } catch (err) {
    console.error('❌ Connection failed:', err);
  } finally {
    await pool.end();
  }
}

test();
