// check-schema.js
const { Pool } = require('pg');

async function checkSchema() {
  const pool = new Pool({
    connectionString: 'postgresql://securevault_user:securevault_password123@localhost:5432/securevault'
  });

  try {
    const result = await pool.query(`
      SELECT column_name, data_type, is_nullable
      FROM information_schema.columns
      WHERE table_schema = 'core'
        AND table_name = 'User'
      ORDER BY ordinal_position
    `);

    console.log('\n📋 core.User table schema:\n');
    result.rows.forEach(row => {
      console.log(`  ${row.column_name.padEnd(20)} ${row.data_type.padEnd(25)} ${row.is_nullable === 'YES' ? 'NULL' : 'NOT NULL'}`);
    });
    console.log('');

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await pool.end();
  }
}

checkSchema();
