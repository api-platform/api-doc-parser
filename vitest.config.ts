// @ts-check
import { coverageConfigDefaults, defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["src/**/*.test.ts"],
    setupFiles: ["vitest.setup.ts"],
    coverage: {
      provider: "v8",
      reporter: ["text", "json-summary", "json"],
      include: ["src/**/*.ts"],
      exclude: ["src/**/{index,types}.ts", ...coverageConfigDefaults.exclude],
      experimentalAstAwareRemapping: true,
      ignoreEmptyLines: true,
      all: true,
      thresholds: {
        statements: 70,
        branches: 58,
        functions: 70,
        lines: 70,
      },
    },
  },
});
