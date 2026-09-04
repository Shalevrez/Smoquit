// ─────────────────────────────────────────────────────────────────────────
//  A deliberately small lint: two rules that catch real bugs.
//
//  no-undef is the one that earns its keep. Rename a variable and miss a
//  reference and the bundler will not complain — it happily emits code that
//  throws ReferenceError the first time that branch runs, which may be on a
//  screen nobody opens during testing. Everything else here is taste, and
//  Prettier already handles taste.
// ─────────────────────────────────────────────────────────────────────────
import globals from "globals";

export default [
  {
    files: ["src/**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      parserOptions: { ecmaFeatures: { jsx: true } },
      globals: { ...globals.browser, SMOQUIT_CONFIG: "readonly" },
    },
    linterOptions: { reportUnusedDisableDirectives: true },
    rules: {
      "no-undef": "error",
      // JSX makes components look unused to the base rule, so allow
      // capitalised names to be "unused"; everything else must be real.
      "no-unused-vars": ["error", { varsIgnorePattern: "^[A-Z]", args: "none" }],
    },
  },
  {
    // The sender. Runs on Deno in Supabase rather than in a browser, and is
    // bundled into supabase-send-alerts.js by scripts/build-edge.mjs.
    files: ["edge/**/*.js"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: { ...globals.node, Deno: "readonly" },
    },
    rules: {
      "no-undef": "error",
      "no-unused-vars": ["error", { args: "none" }],
    },
  },
  {
    files: ["scripts/**/*.mjs", "tests/**/*.mjs", "*.config.js"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: { ...globals.node, ...globals.browser },
    },
    rules: { "no-undef": "error", "no-unused-vars": ["error", { args: "none" }] },
  },
];
