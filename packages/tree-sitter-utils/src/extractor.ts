// ── AST Import/Export/Call Extractor ──────────────

export interface ImportInfo {
  source: string;
  specifiers: string[];
  isDefault: boolean;
  line: number;
}

export interface ExportInfo {
  name: string;
  isDefault: boolean;
  kind: 'function' | 'class' | 'variable' | 'type';
  line: number;
}

export interface FunctionCallInfo {
  name: string;
  module?: string;
  line: number;
  arguments: number;
}

/**
 * Extracts all import statements from an AST root node.
 */
export function extractImports(_rootNode: unknown, source: string): ImportInfo[] {
  // Placeholder: walk AST to find import declarations
  void source;
  return [];
}

/**
 * Extracts all export declarations from an AST root node.
 */
export function extractExports(_rootNode: unknown, source: string): ExportInfo[] {
  // Placeholder: walk AST to find export declarations
  void source;
  return [];
}

/**
 * Extracts function/method call sites from an AST root node.
 */
export function extractFunctionCalls(_rootNode: unknown, source: string): FunctionCallInfo[] {
  // Placeholder: walk AST to find call expressions
  void source;
  return [];
}
