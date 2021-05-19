module.exports = {
  parser: "@typescript-eslint/parser",
  plugins: ["svelte3", "@typescript-eslint", "prettier"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ],
  env: {
    es6: true,
    browser: true,
    node: true,
  },
  parserOptions: {
    project: "tsconfig.json",
    ecmaVersion: 2020,
    sourceType: "module",
  },
  overrides: [
    {
      files: ["*.svelte"],
      processor: "svelte3/svelte3",
    },
  ],
  rules: {
    'prettier/prettier': 'warn',
  },
  settings: {
    "svelte3/typescript": require("typescript"),
  },
};
