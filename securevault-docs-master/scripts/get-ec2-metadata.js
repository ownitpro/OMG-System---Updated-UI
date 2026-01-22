const http = require('http');

function getMetadata(path) {
  return new Promise((resolve, reject) => {
    // 1. Get IMDSv2 Token
    const tokenReq = http.request({
      hostname: '169.254.169.254',
      path: '/latest/api/token',
      method: 'PUT',
      headers: {
        'X-aws-ec2-metadata-token-ttl-seconds': '21600'
      },
      timeout: 1000
    }, (res) => {
      let token = '';
      res.on('data', (chunk) => token += chunk);
      res.on('end', () => {
        if (res.statusCode !== 200) {
          // Fallback to IMDSv1 if v2 fails (rare but possible in some setups)
          fetchMetadataV1(path).then(resolve).catch(reject);
          return;
        }
        
        // 2. Use Token to fetch Metadata
        const req = http.request({
          hostname: '169.254.169.254',
          path: '/latest/meta-data/' + path,
          method: 'GET',
          headers: {
            'X-aws-ec2-metadata-token': token
          },
          timeout: 1000
        }, (metaRes) => {
          let data = '';
          metaRes.on('data', (chunk) => data += chunk);
          metaRes.on('end', () => resolve(data));
        });
        
        req.on('error', reject);
        req.end();
      });
    });

    tokenReq.on('error', (err) => {
       // Try IMDSv1 fallback immediately if token request fails (e.g. not on AWS)
       fetchMetadataV1(path).then(resolve).catch(() => reject(err));
    });
    tokenReq.end();
  });
}

function fetchMetadataV1(path) {
   return new Promise((resolve, reject) => {
    const req = http.request({
      hostname: '169.254.169.254',
      path: '/latest/meta-data/' + path,
      method: 'GET',
      timeout: 1000
    }, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        if (res.statusCode === 200) resolve(data);
        else reject(new Error('Not on EC2 or Metadata inaccessible'));
      });
    });
    req.on('error', reject);
    req.end();
   });
}

async function main() {
  console.log('🔍 Fetching EC2 instance metadata...');
  try {
    const instanceId = await getMetadata('instance-id');
    const privateIp = await getMetadata('local-ipv4');
    const securityGroups = await getMetadata('security-groups');
    // Note: 'security-groups' returns names, getting IDs requires network interface introspection or describe-instances permission
    // But usually 'mac' -> 'network/interfaces/macs/{mac}/security-group-ids' works
    
    const mac = await getMetadata('mac');
    const sgIds = await getMetadata(`network/interfaces/macs/${mac}/security-group-ids`);
    const vpcId = await getMetadata(`network/interfaces/macs/${mac}/vpc-id`);

    console.log('\n✅ **Instance Details:**');
    console.log(`   - Instance ID: ${instanceId}`);
    console.log(`   - VPC ID:      ${vpcId}`);
    console.log(`   - Private IP:  ${privateIp}`);
    console.log(`   - SG IDs:      ${sgIds.replace(/\n/g, ', ')}`);
    console.log(`   - SG Names:    ${securityGroups.replace(/\n/g, ', ')}`);
    
    console.log('\n👉 ACTION REQUIRED:');
    console.log('   1. Check if the VPC ID above matches your RDS VPC ID.');
    console.log(`   2. Ensure one of these SG IDs (${sgIds.replace(/\n/g, ', ')}) is listed in your RDS Security Group Inbound Rules.`);
    
  } catch (err) {
    console.error('❌ Could not fetch metadata. Are you running this on an EC2 instance?');
    console.error('   Error:', err.message);
  }
}

main();
