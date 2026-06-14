import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import { defineConfig, globalIgnores } from "eslint/config";

/**
 * Modern Flat ESLint Configuration
 * Orchestrates code linting, syntax verification, and framework-specific rule enforcement.
 */
export default defineConfig([
  // Global Exclusion Pattern: Tells ESLint to completely ignore compiled production build outputs
  globalIgnores(["dist"]),

  {
    // Scoping Rule: Apply the following configurations strictly to TypeScript and TSX files
    files: ["**/*.{ts,tsx}"],

    // Core Ruleset Extensions
    extends: [
      js.configs.recommended, // Standard JavaScript best-practice rules
      tseslint.configs.recommended, // Recommended rules specific to TypeScript static typing
      reactHooks.configs.flat.recommended, // Enforces valid React Hooks usage rules (e.g., dependency arrays)
      reactRefresh.configs.vite, // Validates state-preserving Hot Module Replacement (HMR) components
    ],

    // Environment Context Definition
    languageOptions: {
      // Registers browser-specific global objects (like window, document, localStorage) so they don't trigger errors
      globals: globals.browser,
    },
  },
]);
