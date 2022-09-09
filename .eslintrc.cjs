"use strict";

module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    jest: true,
    node: true
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 7,
    sourceType: "module",
    project: ["./tsconfig.eslint.json"]
  },
  plugins: ["@typescript-eslint"],

  extends: [
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "prettier",
    "plugin:prettier/recommended"
  ],

  rules: {
    "prettier/prettier": "error",
    "@typescript-eslint/consistent-type-imports": "error",
    "@typescript-eslint/no-empty-interface": [
      "error",
      { allowSingleExtends: true }
    ],
    "@typescript-eslint/no-use-before-define": ["error", { functions: false }],
    "@typescript-eslint/no-explicit-any": [0],
    "import/no-named-as-default-member": [0],
    // Waiting for https://github.com/import-js/eslint-plugin-import/issues/2111
    //"import/extensions": ["error", "ignorePackages"]
  },

  settings: {
    "import/resolver": {
      typescript: true,
      node: true
    }
  }
};
