// ── Python Language Config ───────────────────────

import type { LanguageConfig } from './typescript';

export const pythonConfig: LanguageConfig = {
  name: 'python',
  extensions: ['.py', '.pyi'],
  nodeTypes: {
    function: ['function_definition'],
    class: ['class_definition'],
    method: ['function_definition'], // Methods are functions inside classes
    import: ['import_statement', 'import_from_statement'],
    export: [], // Python doesn't have explicit exports
  },
};

export default pythonConfig;
