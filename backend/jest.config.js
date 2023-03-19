module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['./**/__tests__/**/*.test.ts'],
  collectCoverageFrom: ['./**/*.ts'],
  coverageDirectory: 'coverage',
  moduleNameMapper: {
    '^@/(.*)': './$1',
  },
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  globals: {},
};
