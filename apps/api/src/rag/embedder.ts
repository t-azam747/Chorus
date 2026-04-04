// ── Embedding Generator ─────────────────────────
import { config } from '../config';

export async function generateEmbedding(text: string): Promise<number[]> {
  // Placeholder: call Gemini or OpenAI embedding API
  // In production: use text-embedding-3-small or Gemini embedding model
  const dimensions = 1536;
  return Array.from({ length: dimensions }, () => Math.random() * 2 - 1);
}

export async function generateEmbeddings(texts: string[]): Promise<number[][]> {
  // Batch embedding generation
  return Promise.all(texts.map(generateEmbedding));
}
