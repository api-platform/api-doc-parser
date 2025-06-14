import type { JestConfigWithTsJest } from "ts-jest";

const config = {
  preset: "ts-jest/presets/default-esm",
  moduleFileExtensions: ["ts", "js"],
  setupFilesAfterEnv: ["./jest.setup.ts"],
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
} satisfies JestConfigWithTsJest;

module.exports = config;
