module.exports = {
  root: true,
  extends: 'airbnb-base',
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'babel', 'import', 'jest', 'typescript'],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.d.ts'],
      },
    },
    'import/external-module-folders': ['node_modules'],
    'import/extensions': ['.js', '.jsx', '.ts', '.tsx', '.d.ts'],
  },
  env: {
    browser: true,
    node: true,
    jest: true,
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
    '@typescript-eslint/no-unused-vars': [2, { args: 'none' }],
    'jest/no-disabled-tests': 0,
    'jest/no-identical-title': 'error',
    'prefer-const': 'error',
    quotes: [2, 'single', 'avoid-escape'],
    eqeqeq: 'error',
    'no-shadow': 'error',
    'no-array-constructor': 'error',
    'import/order': 'error',
    'import/newline-after-import': 'error',
    'import/no-unresolved': 'error',
    'import/no-useless-path-segments': 'error',
    'import/no-duplicates': 'error',
    'vars-on-top': 'error',
  },
};
