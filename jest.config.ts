import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  extensionsToTreatAsEsm: ['.ts'],
  setupFilesAfterEnv: ['./jest.setup.ts'],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  transform: {
    '^.+\\.ts$': [
      'ts-jest',
      {
        useESM: true
      },
    ],
  },
};

export default config;
