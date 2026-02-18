import type { Config } from "eslint/config";
import { defineConfig } from "eslint/config";
import eslintConfigPrettier from "eslint-config-prettier/flat";

export function prettierConfig(): Config[] {
  return defineConfig(eslintConfigPrettier);
}
