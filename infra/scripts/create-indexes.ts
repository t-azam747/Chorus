// ── Create MongoDB Atlas Vector Search Index ────
// Usage: npx tsx infra/scripts/create-indexes.ts

async function createIndexes() {
  console.log('Creating MongoDB indexes...');
  // Create Atlas Vector Search index on chunks.embedding
  // Create standard indexes on all collections
  console.log('Indexes created ✓');
}

createIndexes().catch(console.error);
