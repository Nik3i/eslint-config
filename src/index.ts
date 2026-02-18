import type { ConfigWithExtends } from "typescript-eslint";
import globals from "globals";
import { javascriptConfig } from "./configs/javascript";
import { typescriptConfig } from "./configs/typescript";
import { unicornConfig } from "./configs/unicorn";
import { prettierConfig } from "./configs/prettier";

type Platform = "web" | "node";

interface Params {
  platform: Platform;
  configs?: {
    typescript?: boolean | { tsconfigRootDir?: string };
    unicorn?: boolean;
  };
  extends?: ConfigWithExtends[];
}

export function createConfig(params: Params): ConfigWithExtends[] {
  const configs: Required<Params["configs"]> = {
    typescript: true,
    unicorn: true,
    ...params.configs,
  };

  const final: ConfigWithExtends[] = [...javascriptConfig()];

  // Typescript
  if (configs.typescript !== false) {
    final.push(
      ...typescriptConfig(typeof configs.typescript !== "boolean" ? configs.typescript : {}),
    );
  }

  // Unicorn
  if (configs.unicorn) {
    final.push(...unicornConfig());
  }

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
