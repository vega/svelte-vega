module.exports = {
  parser: "@typescript-eslint/parser",
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  env: {
    es6: true,
    browser: true,
    node: true,
  },
  parserOptions: {
    sourceType: "module",
  },
  plugins: ["svelte3", "@typescript-eslint"],
  overrides: [
    {
      files: ["*.svelte"],
      processor: "svelte3/svelte3",
    },
  ],
  rules: {},
  settings: {
    "svelte3/typescript": require("typescript"),
  },
};
