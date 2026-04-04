// ── Java Language Config ─────────────────────────

import type { LanguageConfig } from './typescript';

export const javaConfig: LanguageConfig = {
  name: 'java',
  extensions: ['.java'],
  nodeTypes: {
    function: [], // Java only has methods
    class: ['class_declaration', 'interface_declaration', 'enum_declaration'],
    method: ['method_declaration', 'constructor_declaration'],
    import: ['import_declaration'],
    export: [], // Java uses access modifiers
  },
};

export default javaConfig;
