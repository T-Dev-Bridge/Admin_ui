import path from "node:path";
import { fileURLToPath } from "node:url";
import { fixupPluginRules, fixupConfigRules } from "@eslint/compat";
import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import eslintConfigPrettier from "eslint-config-prettier";
import _import from "eslint-plugin-import";
import reactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  {
    ignores: [
      "**/node_modules",
      "**/dist",
      "**/.eslintrc.cjs",
      "**/vite-env.d.ts",
      "**/vite.config.ts",
      "**/*.d.ts",
      "**/*.json",
    ],
  },
  ...fixupConfigRules(
    compat.extends(
      "plugin:react-hooks/recommended",
      "plugin:prettier/recommended",
      "prettier",
    ),
  ),
  {
    plugins: {
      "react-refresh": reactRefresh,
      import: fixupPluginRules(_import),
    },

    languageOptions: {
      globals: {
        ...globals.browser,
      },
      ecmaVersion: "latest",
      sourceType: "module",
    },

    rules: {
      "react/no-unescaped-entities": "off",
      "react/react-in-jsx-scope": "off",
      "react/jsx-props-no-spreading": "off",
      "react/function-component-definition": "off",
      "import/prefer-default-export": "off",
      "class-methods-use-this": "off",
      "max-classes-per-file": "off",
      "no-underscore-dangle": "off",
      "react/destructuring-assignment": ["off"],
      "no-throw-literal": "off",
      "consistent-return": "off",

      "import/extensions": [
        "error",
        "ignorePackages",
        {
          "": "never",
          tsx: "never",
          ts: "never",
        },
      ],

      "import/order": [
        "error",
        {
          pathGroups: [
            {
              pattern: "react",
              group: "builtin",
            },
            {
              pattern: "vite",
              group: "builtin",
            },
            {
              pattern: "@/app/**",
              group: "internal",
              position: "before",
            },
            {
              pattern: "@/shared/**",
              group: "internal",
              position: "before",
            },
            {
              pattern: "@/entities/**",
              group: "internal",
              position: "before",
            },
            {
              pattern: "@/features/**",
              group: "internal",
              position: "before",
            },
            {
              pattern: "@/widgets/**",
              group: "internal",
              position: "before",
            },
            {
              pattern: "@/pages/**",
              group: "internal",
              position: "before",
            },
          ],

          pathGroupsExcludedImportTypes: ["builtin"],
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
          ],
          "newlines-between": "never",

          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
        },
      ],
    },
  },
  ...fixupConfigRules(
    compat.extends("plugin:eslint-plugin-import/typescript", "prettier"),
  ).map((config) => ({
    ...config,

    files: [
      "**/*.ts",
      "**/.*.ts",
      "./**/*.ts",
      "./**/.*.ts",
      "**/*.tsx",
      "**/.*.tsx",
      "./**/*.tsx",
      "./**/.*.tsx",
    ],
  })),
  {
    files: [
      "**/*.ts",
      "**/.*.ts",
      "./**/*.ts",
      "./**/.*.ts",
      "**/*.tsx",
      "**/.*.tsx",
      "./**/*.tsx",
      "./**/.*.tsx",
    ],

    plugins: {
      "@typescript-eslint": typescriptEslint,
    },

    languageOptions: {
      parser: tsParser,
      ecmaVersion: "latest",
      sourceType: "module",

      parserOptions: {
        project: true,
      },
    },

    rules: {
      "react/no-array-index-key": "off",
      "no-nested-ternary": "off",
      "react/require-default-props": "off",
      "@typescript-eslint/no-use-before-define": "off",
      "@typescript-eslint/no-throw-literal": "off",

      "react/jsx-max-props-per-line": [
        "error",
        {
          maximum: 1,
          when: "always",
        },
      ],

      "@typescript-eslint/naming-convention": [
        "error",
        {
          selector: "variable",
          format: ["camelCase", "PascalCase", "UPPER_CASE"],
          leadingUnderscore: "allow",
          trailingUnderscore: "allow",
        },
        {
          selector: "variable",
          modifiers: ["destructured"],
          format: ["camelCase", "PascalCase", "snake_case", "UPPER_CASE"],
          leadingUnderscore: "allow",
        },
      ],

      "import/extensions": [
        "error",
        "ignorePackages",
        {
          "": "never",
          tsx: "never",
          ts: "never",
        },
      ],

      "import/no-extraneous-dependencies": [
        "error",
        {
          devDependencies: [
            "**/__tests__/**",
            "**/__mocks__/**",
            "**/*.test.ts",
            "**/*.test.tsx",
            "**/*.spec.ts",
            "src/shared/lib/test/setup.ts",
            "src/shared/lib/test/test.lib.tsx",
          ],
        },
      ],
    },
  },
  eslintConfigPrettier,
];
