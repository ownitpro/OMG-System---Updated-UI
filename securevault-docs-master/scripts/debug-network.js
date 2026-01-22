const net = require('net');
const dns = require('dns');
const { promisify } = require('util');
require('dotenv').config({ path: '.env' });

const resolveDn = promisify(dns.resolve4);

async function checkHost(host, port, label) {
  console.log(`\n🔍 Checking connection to [${label}] ${host}:${port}...`);
  return new Promise((resolve) => {
    const start = Date.now();
    const socket = new net.Socket();
    let status = 'pending';

    socket.setTimeout(30000); // 30s timeout (High for Serverless Wakeup)

    socket.on('connect', () => {
      const time = Date.now() - start;
      console.log(`   ✅ [TCP] Connection established in ${time}ms.`);
      status = 'success';
      socket.end();
    });

    socket.on('timeout', () => {
      console.log(`   ❌ [TCP] Connection timed out after 5000ms.`);
      console.log(`      (This strongly suggests a Firewall/Security Group DROP)`);
      status = 'timeout';
      socket.destroy();
    });

    socket.on('error', (err) => {
      console.log(`   ❌ [TCP] Connection Error: ${err.message}`);
      status = 'error';
    });
    
    socket.on('close', () => resolve(status));
    
    socket.connect(port, host);
  });
}

const os = require('os');

async function main() {
  console.log('🛡️  Secure Vault Network Diagnostic 🛡️');
  console.log('-------------------------------------------');

  // Step 0: Check Local Network (VPC/Subnet Detection)
  console.log('\n👉 Step 0: Local Network Interfaces');
  const interfaces = os.networkInterfaces();
  Object.keys(interfaces).forEach((iface) => {
    interfaces[iface].forEach((details) => {
      // Skip internal (127.0.0.1) and non-IPv4
      if (!details.internal && details.family === 'IPv4') {
        console.log(`   - Interface: ${iface}`);
        console.log(`     IP Address: ${details.address}`);
        console.log(`     Netmask:    ${details.netmask}`);
      }
    });
  });

  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) {
    console.error('❌ DATABASE_URL missing.');
    return;
  }

  // Parse DB URL
  const match = dbUrl.match(/@([^:/]+):(\d+)/);
  if (!match) {
    console.log('❌ Could not parse DB Host from URL.');
    return;
  }
  const dbHost = match[1];
  const dbPort = parseInt(match[2] || '5432');

  console.log(`🎯 Target Database: ${dbHost}`);
  console.log(`   Port: ${dbPort}`);

  // 1. DNS Resolution
  console.log('\n📡 Step 1: DNS Resolution');
  try {
    const ips = await resolveDn(dbHost);
    console.log(`   ✅ Resolved to IP(s): ${ips.join(', ')}`);
    
    const isPrivate = ips.some(ip => ip.startsWith('10.') || ip.startsWith('172.') || ip.startsWith('192.168.'));
    console.log(`   ℹ️  IP Type: ${isPrivate ? 'PRIVATE (Inside VPC)' : 'PUBLIC (Internet)'}`);
    
    if (!isPrivate) {
      console.warn('   ⚠️  WARNING: Resolving to Public IP. Ensure "Publicly Accessible" is set correctly or NAT Gateway is working.');
    }
  } catch (err) {
    console.error(`   ❌ DNS Lookup Failed: ${err.message}`);
  }

  // 2. TCP Connectivity
  console.log('\n🔌 Step 2: Protocol Connectivity');
  await checkHost(dbHost, dbPort, 'RDS Instance');

  // 3. Outbound Check
  console.log('\n🌍 Step 3: General Internet Access');
  await checkHost('google.com', 80, 'Google DNS');

}

main();
