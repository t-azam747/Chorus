# OpenQuest — Architecture Graph Reliability: Problem & Solutions

**Project:** OpenQuest  
**Prepared for:** Antigravity  
**Issue:** Architecture graph generation fails silently when repos exceed Gemini context limits, timeout, or hit GitHub API rate limits.

---

## Root Cause Summary

The current architecture graph generation has three independent failure modes that all produce the same result — a silent failure with no output returned to the user:

| Failure Mode | Trigger | Current Behaviour |
|---|---|---|
| GitHub API Rate Limit | Large repos with many files | Fetch fails mid-way, returns nothing |
| Gemini Context Limit | Repos with large file contents | LLM call fails, returns nothing |
| Request Timeout | Slow repos or network issues | Process killed, returns nothing |

All three are all-or-nothing failures. The fix for each is different.

---

## Solution 1 — GitHub API Rate Limits: Tiered Fetching

**Problem:** Fetching an entire repo tree at once exhausts the GitHub API rate limit quickly, especially during testing or with large repos.

**Wrong approach:** Switching to a full git clone (slow, expensive, still hits limits).

**Right approach:** Fetch in priority tiers and stop when a threshold is reached. Analyze what you have — don't wait for everything.

```
Tier 1: Root files + package.json / requirements.txt   ← always fetch, minimal API calls
Tier 2: src/ or app/ directory only                    ← core logic lives here in 90% of repos
Tier 3: Everything else                                ← only if under file cap
```

Additionally, cache the GitHub file tree response in Redis with a 6-hour TTL. The repo tree doesn't change on every request. This alone cuts GitHub API calls by ~80% for repeat visits to the same repo.

**Key principle:** Return a partial graph from Tier 1 + 2 rather than nothing from a failed Tier 3 fetch.

---

## Solution 2 — Gemini Context Limits: Send a Manifest, Not File Contents

**Problem:** Sending full file contents of large repositories to Gemini overflows the context window.

**Wrong approach:** Requesting a larger context window or chunking file contents.

**Right approach:** Gemini doesn't need to read the code to generate an architecture graph. It only needs structural signals — imports and exports. Extract these first, then send a lightweight manifest:

```typescript
// Instead of sending file contents (~10MB for a large repo):
{
  filePath: "src/auth/login.ts",
  imports: ["../db/user", "../utils/jwt", "express"],
  exports: ["handleLogin", "validateToken"],
  language: "typescript",
  linesOfCode: 145
}
```

A repository with 2,000 files becomes a ~50KB JSON manifest instead of 10MB of raw code. Context limits become irrelevant. Import/export relationships are already extractable using tree-sitter utilities already present in the codebase (`@chorus/tree-sitter-utils`).

Gemini is then called once at the end — only to label domain clusters from the manifest — not to read all the code.

---

## Solution 3 — Timeouts: Partial Results with Streaming Status

**Problem:** Long-running graph generation gets killed mid-process, returning nothing.

**Wrong approach:** Increasing the timeout value.

**Right approach:** Return immediately and stream progress. The user should never stare at a loading spinner that ends in an error.

```
Step 1: API responds immediately → { status: "processing", graphId: "abc123" }
Step 2: Client polls or listens via WebSocket for progress updates
Step 3: Partial graph returned as each tier completes
Step 4: Final graph returned when all tiers are done
```

Even if the process never completes Tier 3, the user already has a useful Tier 1 + 2 graph. This is exactly what the existing BullMQ worker infrastructure is designed for — graph generation should be added as a background job alongside the existing RAG indexing job.

---

## Solution 4 — Architectural Fix: Separate Graph Generation from RAG Indexing

**Problem:** Graph generation and RAG indexing currently compete for the same GitHub API quota and Gemini context window.

**Fix:** Treat them as completely independent worker queue jobs with different resource profiles:

```
indexRepoQueue  →  RAG chunking + embedding     (reads file contents, heavy)
graphQueue      →  Import/export extraction     (reads only structure, lightweight)
```

The graph job never reads file contents. It only needs:
- File paths
- Import statements
- Export statements
- Line counts

This means the graph job never touches the Gemini context limit at all during the structural pass. Gemini is only called once per repo at the very end, to semantically label the domain clusters (e.g. "Auth", "API Layer", "Database").

---

## Summary: Progressive Degradation over All-or-Nothing

The core principle across all three solutions is **progressive degradation** — always return something useful rather than nothing.

| Problem | Current Behaviour | After Fix |
|---|---|---|
| GitHub rate limit hit | Returns nothing | Returns Tier 1 + 2 graph |
| Gemini context exceeded | Returns nothing | Never hits limit (manifest approach) |
| Request timeout | Returns nothing | Returns partial graph built so far |
| Repeat requests for same repo | Re-fetches everything | Served from Redis cache instantly |

---

## Implementation Priority

1. **Manifest-based graph generation** — eliminates context limit failures entirely, highest impact
2. **Redis caching of GitHub file tree** — eliminates most rate limit failures, low effort
3. **BullMQ graph job + partial results** — eliminates timeout failures, requires frontend changes
4. **Tiered fetching** — adds resilience for very large repos, builds on top of the above

---

*OpenQuest — "Your first PR, finally."*
