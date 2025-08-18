# Tests

This directory contains comprehensive tests for the webcapt CLI tool.

## Prerequisites

- **Chrome/Chromium** must be installed on your system for browser tests to work
- Run `pnpm install` to install dependencies
- Run `pnpm build` to build the CLI before running integration tests

## Test Structure

- **`pdf.int.test.ts`** - Tests PDF generation functionality
- **`img.int.test.ts`** - Tests image/screenshot generation functionality
- **`find-chrome.test.ts`** - Tests Chrome browser detection (unit tests with mocks)
- **`cli.int.test.ts`** - Integration tests for the CLI commands

## Running Tests

```bash
# Run unit tests (excludes integration tests)
pnpm test

# Run all tests including integration tests
pnpm test:all

# Run integration tests only
pnpm test:int

# Run e2e tests only
pnpm test:e2e

# Run tests with coverage report
pnpm test:coverage

# Run tests with UI
pnpm test:ui

# Run specific test file
vitest pdf.int.test.ts
```

## Notes

- Tests will skip browser functionality if Chrome is not available
- Browser tests have a 15-second timeout for network operations
- Integration tests require the CLI to be built (`pnpm build`)
- Generated test files auto-cleanup on completion
- `generatePDF()` and `generateImage()` are testable versions that return promises instead of calling `process.exit()`
