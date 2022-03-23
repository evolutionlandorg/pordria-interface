module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ['airbnb', 'airbnb/hooks', 'airbnb-typescript', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.eslint.json'
  },
  plugins: ['@typescript-eslint', 'prettier', 'jest', 'import'],
  rules: {
    'import/no-unresolved': 'error',
    'prettier/prettier': 'error',
    'react/function-component-definition': [
      'error',
      {
        namedComponents: [
          'function-declaration',
          'function-expression',
          'arrow-function'
        ],
        unnamedComponents: ['function-expression', 'arrow-function']
      }
    ],
    'no-restricted-syntax': ['off', 'ForOfStatement']
  },
  overrides: [
    {
      files: ['./craco.config.js'],
      rules: {
        'import/no-extraneous-dependencies': 'off'
      }
    }
  ],
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx']
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      },
      typescript: {
        alwaysTryTypes: true,
        project: '.'
      }
    },
    react: {
      version: 'detect'
    }
  }
}
