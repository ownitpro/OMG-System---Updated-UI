// Quick script to check email templates in database
const { Pool } = require('pg');
require('dotenv').config({ path: '.env.local' });

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL?.includes('rds.amazonaws.com') ? { rejectUnauthorized: false } : false
});

async function checkTemplates() {
  const client = await pool.connect();
  try {
    // Check if table exists
    const tableCheck = await client.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables
        WHERE table_schema = 'securevault'
        AND table_name = 'EmailTemplate'
      );
    `);

    if (!tableCheck.rows[0].exists) {
      console.log('❌ EmailTemplate table does not exist');
      console.log('   Run migration: node scripts/run-email-template-migration.js');
      return;
    }

    console.log('✅ EmailTemplate table exists\n');

    // Get all templates
    const result = await client.query(`
      SELECT id, "organizationId", name, slug, type, "isActive", "createdAt"
      FROM securevault."EmailTemplate"
      ORDER BY "organizationId", slug
    `);

    if (result.rows.length === 0) {
      console.log('⚠️  No templates found in database');
      console.log('   Use the admin UI to migrate templates from code');
      return;
    }

    console.log(`Found ${result.rows.length} templates:\n`);

    // Group by org
    const byOrg = {};
    result.rows.forEach(t => {
      if (!byOrg[t.organizationId]) byOrg[t.organizationId] = [];
      byOrg[t.organizationId].push(t);
    });

    Object.entries(byOrg).forEach(([orgId, templates]) => {
      console.log(`Organization: ${orgId}`);
      templates.forEach(t => {
        const status = t.isActive ? '✅' : '❌';
        console.log(`  ${status} ${t.slug} - ${t.name}`);
      });
      console.log('');
    });

  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    client.release();
    await pool.end();
  }
}

checkTemplates();
