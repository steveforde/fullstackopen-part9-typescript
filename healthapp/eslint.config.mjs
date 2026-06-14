import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import stylistic from "@stylistic/eslint-plugin";

/**
 * HealthApp Exercise Project ESLint Configuration
 * Coordinates type-aware linting parameters across independent algorithmic scripts.
 */
export default tseslint.config({
  // Target Scope: Apply this configuration ruleset exclusively to standard TypeScript files
  files: ["**/*.ts"],

  // Extension Sets
  extends: [
    eslint.configs.recommended, // Baseline JavaScript syntax checking guidelines
    ...tseslint.configs.recommendedTypeChecked, // Deep, type-aware rules leveraging the compiler for strict type-checking
  ],

  // Advanced Compiler Context Options
  languageOptions: {
    parserOptions: {
      // Tells the parser to find the closest tsconfig.json file for each file being linted
      project: true,
      // Points ESLint directly to the root directory location containing the target tsconfig files
      tsconfigRootDir: import.meta.dirname,
    },
  },

  // Visual Code Formatting Plugin Injection
  plugins: {
    "@stylistic": stylistic,
  },

  // Custom Validation Override Rules Ruleset
  rules: {
    // Formatting: Mandate clean semicolons everywhere; breaks build on missing terminations
    "@stylistic/semi": "error",

    // Type Safety: Flags an error if a variable is assigned a value typed as an implicit 'any'
    "@typescript-eslint/no-unsafe-assignment": "error",

    // Type Safety: Strictly block developer declarations from declaring or falling back to 'any' signatures
    "@typescript-eslint/no-explicit-any": "error",

    // Flexibility: Suppress mandatory explicit return signatures for lightweight internal functions
    "@typescript-eslint/explicit-function-return-type": "off",

    // Flexibility: Permit implicit module export boundaries to speed up early prototyping workflows
    "@typescript-eslint/explicit-module-boundary-types": "off",

    // Flexibility: Turn off restrictions regarding printing diverse composite items inside template literals
    "@typescript-eslint/restrict-template-expressions": "off",

    // Flexibility: Allow standard addition operators to process variable values without explicit parsing
    "@typescript-eslint/restrict-plus-operands": "off",

    // Code Hygiene: Flag errors on dead variables, but permit arguments explicitly prefix-masked with underscores
    "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
  },
});
