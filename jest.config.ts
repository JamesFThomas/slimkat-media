import nextJest from 'next/jest';

const createJestConfig = nextJest({ dir: './' });

const customJestConfig = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.tsx'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }] as [
      string,
      unknown
    ],
  },
  moduleNameMapper: {
    '^next-intl$': '<rootDir>/test/__mocks__/next-intl.ts',
  },
  transformIgnorePatterns: ['/node_modules/(?!(next-intl|use-intl)/)'],
};

export default createJestConfig(customJestConfig);
