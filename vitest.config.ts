import { configDefaults, coverageConfigDefaults, defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    testTimeout: 30000,
    hookTimeout: 30000,
    reporters: ['default', 'html'],
    coverage: {
      provider: 'v8',
      reportsDirectory: './coverage',
      exclude: [...coverageConfigDefaults.exclude, 'html'],
    },
    include: ['**/*.test.ts'],
    exclude: [...configDefaults.exclude, 'coverage'],
  },
})
