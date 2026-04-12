# Implementation Plan: Tree-Sitter Universal Language Evaluation

**Target Location**: `@chorus/tree-sitter-utils`
**Goal**: Expand our AST extraction pipeline to evaluate and support all required programming languages beyond the initial TS/JS, Python, Rust, C/C++, and Java rollout.

This plan outlines the steps required to seamlessly map diverse programming languages to a unified manifest structure (identifying imports/exports, function declarations, and structural metadata) to power the openquest-graph-reliability engine.

## 1. Abstraction Layer Architecture
Currently, extracting syntax nodes varies widely between languages (e.g., Python's `import_from` vs JavaScript's `import_statement`).
We need a unified interface to abstract the differing tree-sitter grammars.

**Proposed Interface**:
```typescript
interface LanguageStrategy {
  languageName: string;
  fileExtensions: string[];
  queries: {
    imports: string; // Tree-sitter query string for imports
    exports: string; // Tree-sitter query string for exports
    functions?: string; // Optional metadata queries
  }
}
```

## 2. Evaluation Phase
To determine which tree-sitter packages to install next and ensure grammar availability, we must evaluate the required languages:

### Core Web & Systems
- **Go**: High priority (Microservices). Needs `tree-sitter-go`. Imports: `import_spec`, Exports: Capitalized identifiers.
- **Ruby**: Medium priority (Rails monoliths). Needs `tree-sitter-ruby`. Imports: `call` with `require`/`require_relative`.
- **PHP**: Medium priority (Laravel/Symfony). Needs `tree-sitter-php`. Imports: `use_declaration`.
- **C# (.NET)**: High priority (Enterprise). Needs `tree-sitter-c-sharp`. Imports: `using_directive`.

### Specialized
- **Solidity / Rust (Smart Contracts)**: Needs `tree-sitter-solidity`. Imports: `import_directive`. 
- **Kotlin / Swift (Mobile)**: Needs `tree-sitter-kotlin`, `tree-sitter-swift`.

## 3. Implementation Steps

1. **Install Grammars**:
   Add the required node grammars to `@chorus/tree-sitter-utils` dependencies via `npm install tree-sitter-[language]`.

2. **Develop Language Strategies**:
   Create a `strategies/` directory inside `tree-sitter-utils`. Implement the `LanguageStrategy` for each new language.
   - Example (`strategies/go.ts`): Write specific `(import_spec (package_identifier) @import)` queries.

3. **Registry Pattern Manager**:
   Build a `ParserFactory` that checks the file extension of the incoming `filePath` from GitHub, selects the appropriate `LanguageStrategy`, instantiates the corresponding `tree-sitter` parser instance, and computes the query.

4. **Integration Tests**:
   Create a test suite running standard sample files (e.g. `test/samples/app.go`, `test/samples/main.rb`) against the extractor to ensure the structural boundaries (import/exports) are correctly serialized into our unified `Manifest` model.

## 4. Risks & Considerations
- **Bundle Size**: Tree-sitter binaries can be heavy. Consider dynamic imports or lazy-loading grammars in the worker.
- **Grammar Stability**: Some experimental grammars (like Swift) might lack complete pre-built binaries for certain OS architectures, requiring local compilation in Docker workflows.
