// @ts-nocheck
// Quick test to verify Supabase connection
import * as dotenv from 'dotenv'
import { createClient } from '@supabase/supabase-js'

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

async function testConnection() {
  console.log('🔍 Testing Supabase connection...\n')

  // Test 1: Check if we can query the User table
  const { data, error } = await supabase
    .from('User')
    .select('*')
    .limit(1)

  if (error) {
    console.error('❌ Connection failed:', error.message)
    return
  }

  console.log('✅ Connection successful!')
  console.log('📊 User table exists and is accessible')
  console.log(`   Found ${data?.length || 0} users\n`)

  // Test 2: List all tables by checking a few key ones
  const tables = ['Organization', 'Document', 'Portal', 'Folder']
  console.log('📋 Checking key tables...')

  for (const table of tables) {
    const { error } = await supabase.from(table).select('id').limit(1)
    if (error) {
      console.log(`   ❌ ${table}: Not accessible`)
    } else {
      console.log(`   ✅ ${table}: Ready`)
    }
  }

  console.log('\n🎉 Database setup complete!')
}

testConnection()
