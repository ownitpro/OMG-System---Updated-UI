// Script to update trial dates for testing
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

const supabase = createClient(supabaseUrl, supabaseKey)

async function setTrial(daysRemaining: number) {
  const now = new Date()
  const trialExpires = new Date(now.getTime() + daysRemaining * 24 * 60 * 60 * 1000)
  const trialStarted = new Date(now.getTime() - (14 - daysRemaining) * 24 * 60 * 60 * 1000)

  console.log(`Setting trial to ${daysRemaining} days remaining...`)
  console.log(`Trial started: ${trialStarted.toISOString()}`)
  console.log(`Trial expires: ${trialExpires.toISOString()}`)

  // Get all users
  const { data: users, error: selectError } = await supabase
    .from('User')
    .select('id, email, plan')
    .limit(10)

  if (selectError) {
    console.error('Error fetching users:', selectError)
    return
  }

  if (!users || users.length === 0) {
    console.log('No users found')
    return
  }

  console.log(`\nFound ${users.length} user(s):`)
  users.forEach(u => console.log(`  - ${u.email} (${u.plan})`))

  // Update ALL users (for testing)
  const { error: updateError } = await supabase
    .from('User')
    .update({
      plan: 'free', // Set to free plan for testing
      trialStartedAt: trialStarted.toISOString(),
      trialExpiresAt: trialExpires.toISOString(),
    })

  if (updateError) {
    console.error('Error updating trial:', updateError)
    return
  }

  console.log('\n✅ Trial dates updated successfully!')
  console.log('\n📝 Next steps:')
  console.log('   1. Hard refresh your browser (Ctrl+Shift+R)')
  console.log('   2. Navigate to /settings/billing to see trial status')
  console.log('   3. Try uploading a file at /dashboard')
}

const daysArg = process.argv[2]
const days = daysArg ? parseInt(daysArg) : 1

if (isNaN(days)) {
  console.error('Usage: npm run set-trial <days>')
  console.error('Example: npm run set-trial 1')
  process.exit(1)
}

setTrial(days).then(() => process.exit(0))
