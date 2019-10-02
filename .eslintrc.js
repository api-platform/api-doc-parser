module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    jest: true,
    node: true
  },
  parser: "babel-eslint",
  parserOptions: {
    ecmaVersion: 7,
    sourceType: "module"
  },
  plugins: ["import", "prettier"],

  extends: ["plugin:prettier/recommended"],

  rules: {
    "prettier/prettier": "error"
  }
};
