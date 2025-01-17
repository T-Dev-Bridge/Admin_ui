import path from "node:path";
import { fileURLToPath } from "node:url";
import { fixupPluginRules, fixupConfigRules } from "@eslint/compat";
import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import eslintConfigPrettier from "eslint-config-prettier";
import _import from "eslint-plugin-import";
import jsxA11y from "eslint-plugin-jsx-a11y";
import react from "eslint-plugin-react";
import reactCompiler from "eslint-plugin-react-compiler";
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
    compat.extends("plugin:prettier/recommended", "prettier"),
  ),
  {
    plugins: {
      "@typescript-eslint": typescriptEslint,
      react: react,
      "react-refresh": reactRefresh,
      import: fixupPluginRules(_import),
      "react-compiler": reactCompiler,
      "jsx-a11y": jsxA11y,
    },

    languageOptions: {
      globals: {
        ...globals.browser,
      },
      ecmaVersion: "latest",
      sourceType: "module",
    },

    rules: {
      // HTML 사용 중 특수문자 허용
      "react/no-unescaped-entities": "off",
      // 기본 React import 비활성화
      "react/react-in-jsx-scope": "off",
      // 스프레드 연산자 통제 비활성화
      "react/jsx-props-no-spreading": "off",
      // 함수형 컴포넌트 스타일 강제 비활성화
      "react/function-component-definition": "off",
      // export 한개만 있을 때 default export 강제하는거 비활성화
      "import/prefer-default-export": "off",
      // this 사용 강제 비활성화
      "class-methods-use-this": "off",
      // 한 파일에 여러 클래스 정의 불가 비활성화
      "max-classes-per-file": "off",
      // 식별자에 _ 사용 금지 비활성화
      "no-underscore-dangle": "off",
      // 구조 분해 할당 강제하는거 비활성화
      "react/destructuring-assignment": ["off"],
      // throw 키워드 리터럴 값 던지는거 허용
      "no-throw-literal": "off",
      // 함수 내에서 반환 여부 일관되지 않아도 허용
      "consistent-return": "off",

      // React compiler 규칙
      "react-compiler/react-compiler": "error",

      // React 관련 규칙 강화
      "react/no-danger": "error",
      "react/jsx-no-target-blank": ["error", { enforceDynamicLinks: "always" }],
      "react/jsx-no-script-url": "error",
      "react/jsx-no-constructed-context-values": "warn",

      // Accessibility 관련 규칙
      "jsx-a11y/alt-text": "error",
      "jsx-a11y/anchor-is-valid": [
        "error",
        {
          aspects: ["invalidHref", "preferButton"],
        },
      ],

      // TypeScript 관련 규칙 강화
      // "@typescript-eslint/explicit-function-return-type": "warn",
      // "@typescript-eslint/no-explicit-any": "warn",

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
      parserOptions: {
        project: "./tsconfig.json",
        ecmaFeatures: {
          jsx: true,
        },
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
