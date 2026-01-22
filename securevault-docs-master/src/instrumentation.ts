// Next.js instrumentation - runs on server startup
// Loads secrets from AWS Secrets Manager and sets them as environment variables

export async function register() {
  // Only run on server (Node.js runtime)
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    // Skip if OPENAI_API_KEY is already set (local dev)
    if (process.env.OPENAI_API_KEY) {
      console.log('[INSTRUMENTATION] OPENAI_API_KEY already set, skipping Secrets Manager');
      return;
    }

    try {
      // Use dynamic import string concatenation to prevent build-time resolution
      // This prevents "Module not found" errors if the SDK isn't installed in this environment
      const { SecretsManagerClient, GetSecretValueCommand } = await import('@aws-sdk/client-secrets-manager' + '');

      const client = new SecretsManagerClient({ region: 'ca-central-1' });
      const secretId = process.env.NODE_ENV === 'production'
        ? 'svd/production/openai'
        : 'svd/dev/openai';

      console.log(`[INSTRUMENTATION] Fetching OpenAI key from Secrets Manager: ${secretId}`);

      const response = await client.send(
        new GetSecretValueCommand({ SecretId: secretId })
      );

      console.log('[INSTRUMENTATION] Got response, SecretString exists:', !!response.SecretString);

      if (response.SecretString) {
        // Parse if JSON
        try {
          const parsed = JSON.parse(response.SecretString);
          console.log('[INSTRUMENTATION] Parsed as JSON, keys:', Object.keys(parsed));
          const key = parsed.OPENAI_API_KEY || Object.values(parsed)[0];
          if (key) {
            process.env.OPENAI_API_KEY = key as string;
            console.log('[INSTRUMENTATION] OpenAI key loaded from Secrets Manager (length:', key.length, ')');
          } else {
            console.error('[INSTRUMENTATION] No key found in parsed secret');
          }
        } catch {
          // Not JSON, use raw string
          process.env.OPENAI_API_KEY = response.SecretString;
          console.log('[INSTRUMENTATION] OpenAI key loaded as raw string (length:', response.SecretString.length, ')');
        }
      } else {
        console.error('[INSTRUMENTATION] SecretString is empty');
      }
    } catch (error) {
      console.error('[INSTRUMENTATION] Failed to load secrets:', error);
    }
  }
}
