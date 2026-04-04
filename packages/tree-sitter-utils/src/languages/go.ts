// ── Go Language Config ───────────────────────────

import type { LanguageConfig } from './typescript';

export const goConfig: LanguageConfig = {
  name: 'go',
  extensions: ['.go'],
  nodeTypes: {
    function: ['function_declaration'],
    class: [], // Go doesn't have classes
    method: ['method_declaration'],
    import: ['import_declaration'],
    export: [], // Go uses capitalization for exports
  },
};

export default goConfig;
