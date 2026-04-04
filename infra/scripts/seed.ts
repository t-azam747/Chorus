// ── Seed Script ─────────────────────────────────
// Usage: npx tsx infra/scripts/seed.ts

async function seed() {
  console.log('Seeding database...');
  // Connect to MongoDB
  // Insert test repos, users, and sample data
  console.log('Seeding complete.');
}

seed().catch(console.error);
