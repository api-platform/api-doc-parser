module.exports = {
  env: {
    'browser': true,
    'commonjs': true,
    'es6': true,
    'jest': true,
    'node': true,
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 7,
    sourceType: 'module'
  },
  plugins: ['import', 'flowtype', 'prettier'],

  extends: [
      "prettier",
      "prettier/flowtype",
      "prettier/react"
  ],

};
