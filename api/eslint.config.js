import js from '@eslint/js';
import globals from 'globals';
import { defineConfig } from 'eslint/config';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginPrettier from 'eslint-plugin-prettier';

export default defineConfig([
  js.configs.recommended,

  eslintConfigPrettier,
  {
    files: ['**/*.{js,ts}'],
    ignores: ['node_modules', 'dist', 'build'],
    languageOptions: {
      globals: globals.node,
      ecmaVersion: 'latest',
      sourceType: 'module',
    },

    plugins: {
      prettier: eslintPluginPrettier,
    },
    rules: {
      'prettier/prettier': [
        'error',
        {
          semi: true,
          singleQuote: true,
          trailingComma: 'es5',
          tabWidth: 2,
          printWidth: 100,
        },
      ],

      'no-console': 'off',
      'no-unused-vars': ['warn', { argsIgnorePattern: 'next' }],
    },
  },
]);
