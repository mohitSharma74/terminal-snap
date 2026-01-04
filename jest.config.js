const nextJest = require('next/jest')

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})

// Custom Jest configuration
const customJestConfig = {
  // Setup files to run after Jest is initialized
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],

  // Test environment
  testEnvironment: 'jest-environment-jsdom',

  // Module name mapping for path aliases
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },

  // Coverage collection
  collectCoverageFrom: [
    'src/lib/**/*.{ts,tsx}',
    'src/components/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.stories.{ts,tsx}',
    '!src/app/**/*', // Exclude Next.js app directory
  ],

  // Test match patterns
  testMatch: [
    '**/__tests__/**/*.[jt]s?(x)',
    '**/?(*.)+(spec|test).[jt]s?(x)',
  ],

  // Coverage thresholds (adjusted for "essential only" scope)
  coverageThreshold: {
    global: {
      statements: 45,
      branches: 40,
      functions: 40,
      lines: 45,
    },
  },

  // Ignore patterns
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],

  // Module file extensions
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig)
