// ── Rust Language Config ─────────────────────────

import type { LanguageConfig } from './typescript';

export const rustConfig: LanguageConfig = {
  name: 'rust',
  extensions: ['.rs'],
  nodeTypes: {
    function: ['function_item'],
    class: ['struct_item', 'enum_item', 'trait_item'],
    method: ['function_item'], // Methods are functions inside impl blocks
    import: ['use_declaration'],
    export: [], // Rust uses pub for exports
  },
};

export default rustConfig;
