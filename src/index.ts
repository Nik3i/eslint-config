import globals from "globals";
import { javascriptConfig } from "./configs/javaScript";
import { prettierConfig } from "./configs/prettier";
import type { Config } from "eslint/config";

type Platform = "web" | "node";

interface Params {
  platform: Platform;
  extends?: Config[];
}

export function createConfig(params: Params): Config[] {
  const final: Config[] = [...javascriptConfig()];

  // Prettier
  final.push(...prettierConfig());

  if (params.extends !== undefined) {
    final.push(...params.extends);
  }

  final.push({
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    languageOptions: {
      ecmaVersion: params.platform === "web" ? 2022 : 2024,
      globals:
        params.platform === "web"
          ? {
              ...globals.serviceworker,
              ...globals.browser,
            }
          : globals.node,
    },
  });

  return final;
}
