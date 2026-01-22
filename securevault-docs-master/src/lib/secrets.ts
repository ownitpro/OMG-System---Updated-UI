// AWS Secrets Manager helper for fetching secrets
import { SecretsManagerClient, GetSecretValueCommand } from "@aws-sdk/client-secrets-manager";

const client = new SecretsManagerClient({ region: "ca-central-1" });

// Cache secrets in memory to avoid repeated API calls
const secretsCache: Map<string, string> = new Map();

export async function getSecret(secretId: string): Promise<string | null> {
  // Check cache first
  if (secretsCache.has(secretId)) {
    return secretsCache.get(secretId)!;
  }

  try {
    const response = await client.send(
      new GetSecretValueCommand({ SecretId: secretId })
    );

    if (response.SecretString) {
      // Parse if JSON, otherwise return raw string
      try {
        const parsed = JSON.parse(response.SecretString);
        // If it's a key-value pair, get the first value
        const value = typeof parsed === 'object' ? Object.values(parsed)[0] as string : response.SecretString;
        secretsCache.set(secretId, value);
        return value;
      } catch {
        secretsCache.set(secretId, response.SecretString);
        return response.SecretString;
      }
    }
    return null;
  } catch (error) {
    console.error(`[SECRETS] Failed to fetch secret ${secretId}:`, error);
    return null;
  }
}

export async function getOpenAIKey(): Promise<string | null> {
  // Try environment variable first (for local dev)
  if (process.env.OPENAI_API_KEY) {
    return process.env.OPENAI_API_KEY;
  }

  // Fetch from Secrets Manager
  const secretId = process.env.NODE_ENV === "production"
    ? "svd/production/openai"
    : "svd/dev/openai";

  return getSecret(secretId);
}
