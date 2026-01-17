import { NextResponse } from 'next/server';

/**
 * DEV ONLY: Reset entitlements endpoint
 * This removes the entitlements from localStorage by returning a script
 * that the browser will execute
 */
export async function GET() {
  // Only allow in development
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Not available in production' }, { status: 403 });
  }

  return new Response(
    `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Reset Entitlements</title>
      <style>
        body {
          font-family: system-ui, -apple-system, sans-serif;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          margin: 0;
          background: #0f172a;
          color: white;
        }
        .container {
          text-align: center;
          padding: 2rem;
          max-width: 500px;
        }
        h1 {
          color: #47BD79;
          margin-bottom: 1rem;
        }
        .status {
          padding: 1rem;
          border-radius: 8px;
          background: #1e293b;
          margin: 2rem 0;
        }
        .success {
          color: #47BD79;
          font-size: 1.2rem;
          margin: 1rem 0;
        }
        button {
          background: #47BD79;
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          font-size: 1rem;
          cursor: pointer;
          margin: 0.5rem;
        }
        button:hover {
          background: #3da86a;
        }
        .info {
          color: #94a3b8;
          font-size: 0.9rem;
          margin-top: 2rem;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>🔒 Reset Entitlements</h1>
        <div class="status">
          <div class="success">✅ All entitlements have been reset!</div>
          <p>All products are now locked and showing "Unlock" buttons.</p>
        </div>
        <button onclick="window.location.href='/portal/client'">
          Go to Client Portal
        </button>
        <button onclick="window.location.href='/'">
          Go to Home
        </button>
        <div class="info">
          This is a development-only feature for testing the complete user journey:<br>
          Locked → Unlock → Pricing → Purchase → Launch
        </div>
      </div>
      <script>
        // Reset entitlements in localStorage
        localStorage.removeItem('omg_entitlements_v1');
        console.log('✅ Entitlements reset successfully!');
      </script>
    </body>
    </html>
    `,
    {
      headers: {
        'Content-Type': 'text/html',
      },
    }
  );
}
