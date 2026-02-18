import type { Config } from "eslint/config";
import { defineConfig } from "eslint/config";
import js from "@eslint/js";

export function javascriptConfig(): Config[] {
  return defineConfig(
    {
      files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
      plugins: { js },
      extends: ["js/recommended"],
    },

    // Rules
    {
      files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
      rules: {
        "array-callback-return": ["error"],
        curly: ["warn", "all"],
        eqeqeq: ["warn"],
        "no-unused-vars": [
          "error",
          {
            vars: "all",
            args: "all",
            argsIgnorePattern: "^_",
            caughtErrors: "all",
            caughtErrorsIgnorePattern: "^ignore",
            destructuredArrayIgnorePattern: "^_",
            ignoreRestSiblings: false,
            ignoreClassWithStaticInitBlock: false,
            ignoreUsingDeclarations: false,
            reportUsedIgnorePattern: false,
          },
        ],
      },
    },
  );
}
