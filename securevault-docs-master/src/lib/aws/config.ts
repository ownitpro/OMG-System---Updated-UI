// AWS SDK configuration with proper SSL certificate handling
// This ensures AWS SDK clients use the system CA bundle for SSL verification

import { NodeHttpHandler } from '@smithy/node-http-handler';
import https from 'https';
import fs from 'fs';

// Path to system CA bundle (Amazon Linux 2023)
const CA_BUNDLE_PATH = '/etc/pki/tls/certs/ca-bundle.crt';

// Create a custom HTTPS agent with the CA bundle
function createHttpsAgent(): https.Agent | undefined {
  // Only use custom CA in production on Linux (EC2)
  if (process.platform !== 'linux') {
    return undefined;
  }

  try {
    if (fs.existsSync(CA_BUNDLE_PATH)) {
      const ca = fs.readFileSync(CA_BUNDLE_PATH);
      return new https.Agent({
        ca: ca,
        keepAlive: true,
      });
    }
  } catch (error) {
    console.warn('[AWS Config] Could not load CA bundle:', error);
  }

  return undefined;
}

// Create request handler for AWS SDK clients
export function getAwsRequestHandler(): NodeHttpHandler | undefined {
  const agent = createHttpsAgent();

  if (agent) {
    return new NodeHttpHandler({
      httpsAgent: agent,
    });
  }

  return undefined;
}

// Get common AWS SDK configuration
export function getAwsConfig(region?: string) {
  const requestHandler = getAwsRequestHandler();

  return {
    region: region || process.env.AWS_REGION || 'ca-central-1',
    ...(requestHandler && { requestHandler }),
  };
}
