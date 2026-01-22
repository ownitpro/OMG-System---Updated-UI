const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://tbutdoenrynwfqaqhttz.supabase.co';
const serviceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRidXRkb2Vucnlud2ZxYXFodHR6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NDI5NjIwNiwiZXhwIjoyMDc5ODcyMjA2fQ.vIVy--OmcFZcjV2jfEinKyvEYtqrm8Y9K3qojjtulhg';

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function setupDatabase() {
  console.log('Setting up database schema...');

  // Check if User table exists and add missing columns
  const { data: userCheck, error: userError } = await supabase
    .from('User')
    .select('id')
    .limit(1);

  if (userError && userError.code === '42P01') {
    console.log('User table does not exist. Please run the full schema SQL first.');
    console.log('Go to: https://supabase.com/dashboard/project/tbutdoenrynwfqaqhttz/sql/new');
    console.log('And run the contents of supabase-schema.sql');
    return;
  }

  // Try to add the accountType column
  console.log('Adding accountType column if not exists...');

  // We'll use a workaround - try to insert a test record with the column
  // If it fails, the column doesn't exist
  const testId = 'test-setup-' + Date.now();

  const { error: insertError } = await supabase
    .from('User')
    .insert({
      id: testId,
      email: 'test-setup@example.com',
      accountType: 'personal'
    });

  if (insertError) {
    if (insertError.message.includes('accountType')) {
      console.log('accountType column does not exist.');
      console.log('\nPlease run this SQL in Supabase Dashboard SQL Editor:');
      console.log('https://supabase.com/dashboard/project/tbutdoenrynwfqaqhttz/sql/new\n');
      console.log(`
-- Add missing columns to User table
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "accountType" TEXT DEFAULT 'personal';
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "stripeCustomerId" TEXT;
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "stripeSubscriptionId" TEXT;
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "stripeSubscriptionStatus" TEXT;
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "stripePriceId" TEXT;
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "subscriptionPeriodEnd" TEXT;
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "trialStartedAt" TEXT;
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "trialExpiresAt" TEXT;
      `);
    } else {
      console.log('Insert error:', insertError.message);
    }
  } else {
    // Clean up test record
    await supabase.from('User').delete().eq('id', testId);
    console.log('accountType column exists! Database is ready.');
  }
}

setupDatabase().catch(console.error);
