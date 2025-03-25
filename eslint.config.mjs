import { defineFlatConfig } from 'eslint-define-config';
import globals from 'globals';
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import prettier from 'eslint-config-prettier';

export default defineFlatConfig([
  js.configs.recommended,

  ...tseslint.configs.recommended,

  {
    files: ['**/*.{js,ts,jsx,tsx}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      react,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      'no-trailing-spaces': 'warn',
      'eol-last': ['warn', 'always'],
      quotes: ['warn', 'single'],
      semi: ['warn', 'always'],
      indent: ['warn', 2],
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-debugger': 'warn',

      ...react.configs.recommended.rules,
    },
  },

  prettier,
]);
