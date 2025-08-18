import { existsSync } from 'fs'

import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { DELETE_TEST_FILES } from './cli.int.test.js'
import { setup } from './setup.js'
import { generatePDF } from '../src/lib/generate/pdf.js'
import { closeBrowser, findChrome } from '../src/lib/utils/find-chrome.js'

describe('Feature: PDF Generation', () => {
  const { setBaseDirectory } = setup()
  const { arrange, clean } = setBaseDirectory('pdf')

  beforeAll(async () => {
    try {
      findChrome()
    } catch (error: unknown) {
      console.warn('Chrome not found - skipping browser tests', error)
      return
    }
  })

  afterAll(async () => {
    clean(DELETE_TEST_FILES)
    await closeBrowser()
  })

  describe('Scenario: Create a simple page', () => {
    it('should generate PDF from a simple webpage', async () => {
      const { userInput, output } = arrange({
        filename: 'test-simple-page',
        type: 'pdf',
        extension: 'pdf',
      })

      const result = await generatePDF({
        url: 'data:text/html,<h1>Test Page</h1><p>This is a test</p>',
        pdfOptions: {
          path: userInput,
        },
      })

      expect(result).toBe(output)
    })

    it('should exists on disk', async () => {
      const { userInput, output } = arrange({
        filename: 'test-simple-page',
        type: 'pdf',
        extension: 'pdf',
      })

      await generatePDF({
        url: 'data:text/html,<h1>Test Page</h1><p>This is a test</p>',
        pdfOptions: {
          path: userInput,
        },
      })

      expect(existsSync(output)).toBe(true)
    })
  })

  describe('Scenario: Create a page with custom format', () => {
    it('should generate PDF with custom format', async () => {
      const { userInput, output } = arrange({
        filename: 'test-letter-format',
        type: 'pdf',
        extension: 'pdf',
      })

      const result = await generatePDF({
        url: 'data:text/html,<h1>Letter Format Test</h1>',
        pdfOptions: {
          path: userInput,
          format: 'letter',
        },
      })

      expect(result).toBe(output)
    })

    it('should exists on disk', async () => {
      const { userInput, output } = arrange({
        filename: 'test-letter-format',
        type: 'pdf',
        extension: 'pdf',
      })

      await generatePDF({
        url: 'data:text/html,<h1>Letter Format Test</h1>',
        pdfOptions: {
          path: userInput,
          format: 'letter',
        },
      })

      expect(existsSync(output)).toBe(true)
    })
  })

  describe('Scenario: Handle complex HTML content', () => {
    it('should handle complex HTML content', async () => {
      const { userInput, output } = arrange({
        filename: 'test-complex-html',
        type: 'pdf',
        extension: 'pdf',
      })

      const complexHtml = `
      <!DOCTYPE html>
      <html>
        <head><title>Complex Test</title></head>
        <body>
          <h1>Complex HTML Test</h1>
          <table border="1">
            <tr><th>Name</th><th>Age</th></tr>
            <tr><td>John</td><td>30</td></tr>
            <tr><td>Jane</td><td>25</td></tr>
          </table>
          <style>
            body { font-family: Arial; margin: 20px; }
            table { width: 100%; margin-top: 20px; }
          </style>
        </body>
      </html>
    `

      const result = await generatePDF({
        url: `data:text/html,${encodeURIComponent(complexHtml)}`,
        pdfOptions: {
          path: userInput,
        },
      })

      expect(result).toBe(output)
    })

    it('should exists on disk', async () => {
      const { userInput, output } = arrange({
        filename: 'test-complex-html',
        type: 'pdf',
        extension: 'pdf',
      })

      const complexHtml = `
      <!DOCTYPE html>
      <html>
        <head><title>Complex Test</title></head>
        <body>
          <h1>Complex HTML Test</h1>
          <table border="1">
            <tr><th>Name</th><th>Age</th></tr>
            <tr><td>John</td><td>30</td></tr>
            <tr><td>Jane</td><td>25</td></tr>
          </table>
          <style>
            body { font-family: Arial; margin: 20px; }
            table { width: 100%; margin-top: 20px; }
          </style>
        </body>
      </html>
    `

      await generatePDF({
        url: `data:text/html,${encodeURIComponent(complexHtml)}`,
        pdfOptions: {
          path: userInput,
        },
      })

      expect(existsSync(output)).toBe(true)
    })
  })

  it('should do nothing when an input is not provided', async () => {
    const { userInput } = arrange({
      filename: undefined,
      type: 'pdf',
      extension: 'pdf',
    })

    const result = await generatePDF({
      url: 'data:text/html,<h1>Auto Filename Test</h1>',
      pdfOptions: {
        path: userInput,
      },
    })

    expect(result).toBeUndefined()
    expect(existsSync(result ?? '')).toBe(false)
  })

  it('should throw error for invalid URL', async () => {
    await expect(
      generatePDF({
        url: 'invalid-url',
        pdfOptions: {
          path: 'test-invalid',
        },
      }),
    ).rejects.toThrow()
  })
})
