// ── Secret Rotation Helper ──────────────────────
// Usage: npx tsx infra/scripts/rotate-secrets.ts

async function rotateSecrets() {
  console.log('Secret rotation helper');
  console.log('1. Generate new JWT_SECRET');
  console.log('2. Update Railway environment variables');
  console.log('3. Restart services');
}

rotateSecrets().catch(console.error);
