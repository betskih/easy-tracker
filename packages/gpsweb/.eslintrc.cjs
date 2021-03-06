module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
    jest: true,
  },
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module',
  },
  root: true,
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.d.ts'],
      },
    },
    'import/external-module-folders': ['node_modules'],
    'import/extensions': ['.js', '.jsx', '.ts', '.tsx', '.d.ts'],
  },
  rules: {
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 2,
    '@typescript-eslint/no-unused-vars': [2, { args: 'none' }],
    'jest/no-disabled-tests': 0,
    'prefer-const': 'error',
    'no-console': 'error',
    quotes: ['error', 'single', 'avoid-escape'],
    eqeqeq: 'error',
    'no-shadow': 'error',
    'react-native/no-inline-styles': 0,
    'no-array-constructor': 'error',
    'import/order': 'error',
    'import/newline-after-import': 'error',
    'import/no-unresolved': 'error',
    'import/no-useless-path-segments': 'error',
    'import/no-duplicates': 'error',
    'react/jsx-no-bind': 'error',
    'react/jsx-pascal-case': 'error',
    'vars-on-top': 'error',
    'react/prop-types': 'off',
    'no-case-declarations': 'off',
  },
  plugins: ['import', '@typescript-eslint', 'react-hooks'],
};
