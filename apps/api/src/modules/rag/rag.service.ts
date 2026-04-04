// ── RAG Service ─────────────────────────────────
import type { QueryRequest, QueryResponse } from '@chorus/shared-types';
import { retrieve } from '../../rag/retriever';
import { generate } from '../../rag/generator';
import { getCachedLLMResponse, setCachedLLMResponse } from '../../cache/llmResponses';

export class RagService {
  async query(request: QueryRequest): Promise<QueryResponse> {
    const startTime = Date.now();

    // Check LLM cache
    const cached = await getCachedLLMResponse(request);
    if (cached) return cached;

    // Retrieve relevant chunks
    const chunks = await retrieve(request.repoId, request.question, {
      maxResults: request.maxCitations ?? 5,
      filters: request.filters,
    });

    // Generate grounded answer
    const response = await generate(request.question, chunks);

    const result: QueryResponse = {
      ...response,
      processingTimeMs: Date.now() - startTime,
    };

    // Cache the response
    await setCachedLLMResponse(request, result);
    return result;
  }
}
