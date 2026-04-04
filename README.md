# Chorus

> The codebase your whole team understands — not just the person who wrote it.

Chorus is an AI-powered code intelligence platform that provides architecture diagrams, data flow diagrams, RAG-powered code Q&A, cross-branch context awareness, and security scanning for any GitHub repository.

## Architecture

| Service | Port | Description |
|---------|------|-------------|
| `apps/web` | 3000 | Next.js 14+ frontend |
| `apps/api` | 3001 | Express/Fastify backend |
| `apps/mcp` | 3002 | MCP server (AI agent interface) |
| `apps/worker` | — | BullMQ background worker |

## Quick Start

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Start all services (requires Docker)
docker-compose up -d

# Start development
npm run dev
```

## Project Structure

```
chorus/
├── apps/           # Deployable services
│   ├── web/        # Next.js frontend
│   ├── api/        # Express/Fastify backend
│   ├── mcp/        # MCP server
│   └── worker/     # BullMQ worker
├── packages/       # Shared code
│   ├── shared-types/     # Cross-service type contracts
│   ├── tree-sitter-utils/ # AST parsing
│   ├── graph-utils/      # Graph algorithms
│   └── ui/               # Shared React components
├── infra/          # Deployment & operations
└── .github/        # CI/CD workflows
```

## Architecture Principles

1. **Separation by concern, not technology** — directories are drawn around responsibilities, not file types.
2. **MongoDB is the system of record, Redis is the system of speed** — if data can't be reconstructed from Mongo, it doesn't live only in Redis.
3. **`shared-types` is the contract enforcer** — any shape that crosses a service boundary is defined there and only there.
