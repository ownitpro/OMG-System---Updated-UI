
const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '..', '.env.production');

try {
  const envContent = fs.readFileSync(envPath, 'utf8');
  const missingKeys = [];
  
  const requiredKeys = [
    'NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY',
    'STRIPE_SECRET_KEY',
    'NEXT_PUBLIC_STRIPE_PRICE_PERSONAL_STARTER_MONTHLY',
    'NEXT_PUBLIC_STRIPE_PRICE_BUSINESS_STARTER_MONTHLY',
    'NEXT_PUBLIC_STRIPE_PRICE_PU_SMALL'
  ];

  requiredKeys.forEach(key => {
    if (!envContent.includes(key)) {
      missingKeys.push(key);
    }
  });

  if (missingKeys.length > 0) {
    console.error('❌ Missing keys in .env.production:', missingKeys);
    process.exit(1);
  } else {
    console.log('✅ All required Stripe keys found in .env.production');
  }

} catch (err) {
  console.error('❌ Could not read .env.production:', err.message);
  process.exit(1);
}
