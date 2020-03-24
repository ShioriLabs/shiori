module.exports = {
    env: {
      es6: true,
      node: true
    },
    extends: [
      'standard',
      'plugin:@typescript-eslint/eslint-recommended',
      'plugin:@typescript-eslint/recommended'
    ],
    globals: {
      Atomics: 'readonly',
      SharedArrayBuffer: 'readonly'
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaVersion: 2018,
      sourceType: 'module'
    },
    plugins: [
      '@typescript-eslint'
    ],
    rules: {
    }
  }
  