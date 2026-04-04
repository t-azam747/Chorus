// ── AST-Aware Code Chunker ───────────────────────

import type { CodeChunk, ChunkMetadata } from '@chorus/shared-types';

export interface ChunkOptions {
  maxTokens?: number;
  minTokens?: number;
  overlap?: number;
}

const DEFAULT_OPTIONS: Required<ChunkOptions> = {
  maxTokens: 512,
  minTokens: 50,
  overlap: 50,
};

/**
 * Chunks source code at AST boundaries (functions, classes, methods).
 * Falls back to line-based splitting if AST parsing fails.
 */
export function chunkByAST(
  _rootNode: unknown,
  source: string,
  filePath: string,
  language: string,
  options?: ChunkOptions,
): Omit<CodeChunk, 'id' | 'repoId' | 'embedding'>[] {
  const opts = { ...DEFAULT_OPTIONS, ...options };
  const lines = source.split('\n');

  // Placeholder: actual AST-based chunking would walk the tree
  // and split at function/class/method boundaries
  const chunks: Omit<CodeChunk, 'id' | 'repoId' | 'embedding'>[] = [];

  // Fallback: line-based chunking
  for (let i = 0; i < lines.length; i += opts.maxTokens - opts.overlap) {
    const startLine = i + 1;
    const endLine = Math.min(i + opts.maxTokens, lines.length);
    const content = lines.slice(i, endLine).join('\n');

    if (content.trim().length < opts.minTokens) continue;

    const metadata: ChunkMetadata = {
      imports: [],
      exports: [],
      dependencies: [],
      complexity: 1,
      tokenCount: content.split(/\s+/).length,
    };

    chunks.push({
      filePath,
      startLine,
      endLine,
      content,
      language,
      chunkType: 'block',
      metadata,
    });
  }

  return chunks;
}

/**
 * High-level function to chunk a file given its path and contents.
 */
export async function chunkFile(
  filePath: string,
  source: string,
  language: string,
  options?: ChunkOptions,
): Promise<Omit<CodeChunk, 'id' | 'repoId' | 'embedding'>[]> {
  // In production: parse with tree-sitter, then chunk by AST
  return chunkByAST(null, source, filePath, language, options);
}
