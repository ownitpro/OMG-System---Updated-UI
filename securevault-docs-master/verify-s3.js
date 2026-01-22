// Verify S3 Upload Script
// Run this with: node verify-s3.js

const { S3Client, ListObjectsV2Command, HeadObjectCommand } = require('@aws-sdk/client-s3');

async function verifyS3() {
  console.log('🔍 Verifying S3 uploads...\n');

  const s3Client = new S3Client({
    region: process.env.AWS_REGION || 'ca-central-1',
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  });

  const bucket = process.env.S3_BUCKET || 'svd-prod-data-ca';

  try {
    // List all objects in the personal/ prefix
    console.log(`📦 Bucket: ${bucket}`);
    console.log('📂 Listing files in personal/ prefix...\n');

    const listCommand = new ListObjectsV2Command({
      Bucket: bucket,
      Prefix: 'personal/',
    });

    const listResponse = await s3Client.send(listCommand);

    if (!listResponse.Contents || listResponse.Contents.length === 0) {
      console.log('❌ No files found in personal/ prefix');
      return;
    }

    console.log(`✅ Found ${listResponse.Contents.length} file(s):\n`);

    // Get details for each file
    for (const obj of listResponse.Contents) {
      console.log(`📄 File: ${obj.Key}`);
      console.log(`   Size: ${(obj.Size / 1024).toFixed(2)} KB`);
      console.log(`   Last Modified: ${obj.LastModified}`);

      // Get encryption details
      try {
        const headCommand = new HeadObjectCommand({
          Bucket: bucket,
          Key: obj.Key,
        });
        const headResponse = await s3Client.send(headCommand);

        if (headResponse.ServerSideEncryption) {
          console.log(`   🔒 Encryption: ${headResponse.ServerSideEncryption}`);
          if (headResponse.SSEKMSKeyId) {
            console.log(`   🔑 KMS Key: ${headResponse.SSEKMSKeyId}`);
          }
        }
      } catch (err) {
        console.log(`   ⚠️  Could not get encryption details: ${err.message}`);
      }

      console.log('');
    }

    console.log('✅ Verification complete!');
  } catch (error) {
    console.error('❌ Error verifying S3:', error.message);
    if (error.Code) {
      console.error(`   Error Code: ${error.Code}`);
    }
  }
}

// Load environment variables
require('dotenv').config({ path: '.env.local' });

verifyS3();
