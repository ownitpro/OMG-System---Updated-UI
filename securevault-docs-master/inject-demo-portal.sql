-- Inject Demo Portal for Testing
BEGIN;

-- Insert a demo portal
INSERT INTO securevault."Portal" (
  id,
  name,
  description,
  "organizationId",
  "createdById",
  "clientName",
  "clientEmail",
  pin,
  status,
  "createdAt",
  "updatedAt"
) VALUES (
  'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  'John Smith Portal',
  'Demo portal for testing glassmorphism design',
  '27bf5a34-833b-496b-b81f-f6adba91dc30',
  '70a44906-2efe-4481-b3f7-d2765391c525',
  'John Smith',
  'john.smith@example.com',
  '123456',
  'active',
  NOW() - INTERVAL '5 days',
  NOW()
) ON CONFLICT (id) DO UPDATE SET
  "clientName" = EXCLUDED."clientName",
  "clientEmail" = EXCLUDED."clientEmail",
  "updatedAt" = NOW();

COMMIT;

-- Verify the portal was created
SELECT
  id,
  name,
  "clientName",
  "clientEmail",
  status,
  "createdAt"
FROM securevault."Portal"
WHERE id = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890';
