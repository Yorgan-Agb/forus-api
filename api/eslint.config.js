import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";
import prettier from "eslint-config-prettier";

export default defineConfig([
  js.configs.recommended,
  prettier,
  {
    languageOptions: {
      globals: globals.node,
      ecmaVersion: "latest",
    },
    rules: {
      // Active Prettier comme règle ESLint
      "prettier/prettier": [
        "error",
        {
          singleQuote: true,
          semi: true,
          trailingComma: "es5",
          tabWidth: 2,
          printWidth: 100,
        },
      ],

      // Bonnes pratiques Express
      "no-console": "off",
      "no-unused-vars": ["warn", { argsIgnorePattern: "next" }],
    },
  },
]);
