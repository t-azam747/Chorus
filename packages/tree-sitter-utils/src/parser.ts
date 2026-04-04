// ── Tree-sitter Parser Setup ─────────────────────

import type { LanguageConfig } from './languages/typescript';

export type SupportedLanguage = 'typescript' | 'python' | 'go' | 'java' | 'rust';

const languageConfigs = new Map<SupportedLanguage, LanguageConfig>();

/**
 * Detects the programming language from a file path.
 */
export function detectLanguage(filePath: string): SupportedLanguage | null {
  const ext = filePath.split('.').pop()?.toLowerCase();
  const extensionMap: Record<string, SupportedLanguage> = {
    ts: 'typescript',
    tsx: 'typescript',
    js: 'typescript',
    jsx: 'typescript',
    py: 'python',
    go: 'go',
    java: 'java',
    rs: 'rust',
  };
  return extensionMap[ext ?? ''] ?? null;
}

/**
 * Creates a parser instance for the given language.
 */
export async function createParser(language: SupportedLanguage) {
  // Tree-sitter parser initialization would happen here
  // This is a placeholder for the actual tree-sitter setup
  const config = languageConfigs.get(language);
  return {
    language,
    config,
    parse: (source: string) => {
      // Placeholder: actual tree-sitter parsing
      return { rootNode: null, source };
    },
  };
}

/**
 * Returns the list of supported languages.
 */
export function getSupportedLanguages(): SupportedLanguage[] {
  return ['typescript', 'python', 'go', 'java', 'rust'];
}
