// ── TypeScript Language Config ───────────────────

export interface LanguageConfig {
  name: string;
  extensions: string[];
  nodeTypes: {
    function: string[];
    class: string[];
    method: string[];
    import: string[];
    export: string[];
  };
}

export const typescriptConfig: LanguageConfig = {
  name: 'typescript',
  extensions: ['.ts', '.tsx', '.js', '.jsx'],
  nodeTypes: {
    function: ['function_declaration', 'arrow_function', 'function_expression'],
    class: ['class_declaration'],
    method: ['method_definition'],
    import: ['import_statement'],
    export: ['export_statement'],
  },
};

export default typescriptConfig;
