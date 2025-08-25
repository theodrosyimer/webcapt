import { execFile } from 'child_process'
import { existsSync } from 'fs'
import { promisify } from 'util'

import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { setup } from './setup.js'
import { findChrome } from '../src/lib/utils/find-chrome.js'

const execFileAsync = promisify(execFile)

const DELETE_TEST_FILES = true

describe('Webcapt CLI E2E', () => {
  const { setBaseDirectory } = setup()
  const { arrange, clean } = setBaseDirectory('e2e')

  beforeAll(async () => {
    try {
      findChrome()
    } catch (error: unknown) {
      console.warn('Chrome not found - skipping e2e tests', error)
      return
    }
  })

  afterAll(async () => {
    clean(DELETE_TEST_FILES)
  })

  describe('PDF Generation via CLI', () => {
    it('should generate PDF via command line', async () => {
      const { userInput, output } = arrange({
        filename: 'e2e-pdf-test',
        type: 'pdf',
        extension: 'pdf',
      })

      const { stdout } = await execFileAsync('npx', [
        'tsx',
        'src/index.ts',
        'pdf',
        '--url',
        'data:text/html,<h1>E2E PDF Test</h1><p>Generated via CLI</p>',
        '--output',
        userInput!,
      ])

      expect(stdout).toContain('Generated:')
      expect(existsSync(output)).toBe(true)
    })

    it('should generate PDF with A4 format via CLI', async () => {
      const { userInput, output } = arrange({
        filename: 'e2e-pdf-a4',
        type: 'pdf',
        extension: 'pdf',
      })

      const { stdout } = await execFileAsync('npx', [
        'tsx',
        'src/index.ts',
        'pdf',
        '--url',
        'data:text/html,<h1>A4 Format Test</h1>',
        '--output',
        userInput!,
        '--format',
        'A4',
      ])

      expect(stdout).toContain('Generated:')
      expect(existsSync(output)).toBe(true)
    })
  })

  describe('Image Generation via CLI', () => {
    it('should generate PNG image via command line', async () => {
      const { userInput, output } = arrange({
        filename: 'e2e-png-test',
        type: 'image',
        extension: 'png',
      })

      const { stdout } = await execFileAsync('npx', [
        'tsx',
        'src/index.ts',
        'img',
        '--url',
        'data:text/html,<h1>E2E PNG Test</h1><p>Generated via CLI</p>',
        '--output',
        userInput!,
      ])

      expect(stdout).toContain('Generated:')
      expect(existsSync(output)).toBe(true)
    })

    it('should generate JPEG image via command line', async () => {
      const { userInput, output } = arrange({
        filename: 'e2e-jpeg-test',
        type: 'image',
        extension: 'jpeg',
      })

      const { stdout } = await execFileAsync('npx', [
        'tsx',
        'src/index.ts',
        'img',
        '--url',
        'data:text/html,<h1>E2E JPEG Test</h1>',
        '--output',
        userInput!,
        '--format',
        'jpeg',
      ])

      expect(stdout).toContain('Generated:')
      expect(existsSync(output)).toBe(true)
    })
  })

  describe('CLI Error Handling', () => {
    it('should show error for invalid URL', async () => {
      const result = await execFileAsync('npx', [
        'tsx',
        'src/index.ts',
        'pdf',
        '--url',
        'invalid-url',
        '--output',
        'test-error',
      ])

      expect(result.stderr).toContain(
        'Protocol error (Page.navigate): Cannot navigate to invalid URL',
      )
    })
  })
})
