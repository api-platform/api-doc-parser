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
    "prettier/@typescript-eslint",
    "plugin:prettier/recommended"
  ],

  rules: {
    "prettier/prettier": "error",
    "@typescript-eslint/no-empty-interface": [
      "error",
      { allowSingleExtends: true }
    ],
    "@typescript-eslint/no-use-before-define": ["error", { functions: false }],
    '@typescript-eslint/no-explicit-any': [0]
  }
};
