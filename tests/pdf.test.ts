import { existsSync, unlinkSync } from 'fs'

import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { setup } from './setup.js'
import { generatePDF } from '../src/lib/generate/pdf.js'
import { closeBrowser, findChrome } from '../src/lib/utils/find-chrome.js'

describe('Feature: PDF Generation', () => {
  const { testFiles, setBaseDirectory } = setup()
  const { getPath } = setBaseDirectory('pdf')

  beforeAll(async () => {
    try {
      findChrome()
    } catch (error: unknown) {
      console.warn('Chrome not found - skipping browser tests', error)
      return
    }
  })

  afterAll(async () => {
    testFiles.forEach((file) => {
      console.log('file', file)
      if (existsSync(file)) {
        unlinkSync(file)
      }
    })
    testFiles.length = 0
    await closeBrowser()
  })

  describe('Scenario: Create a simple page', () => {
    it('should generate PDF from a simple webpage', async () => {
      const filename = 'test-simple-page'
      const { userInput, output } = getPath({ filename, type: 'pdf', extension: 'pdf' })

      const result = await generatePDF({
        url: 'data:text/html,<h1>Test Page</h1><p>This is a test</p>',
        pdfOptions: {
          path: userInput,
        },
      })

      expect(result).toBe(output)
    })
    it('should exists on disk', async () => {
      const testOutput = 'test-simple-page'
      const { userInput, output } = getPath({ filename: testOutput, type: 'pdf', extension: 'pdf' })

      /*  try { */
      await generatePDF({
        url: 'data:text/html,<h1>Test Page</h1><p>This is a test</p>',
        pdfOptions: {
          path: userInput,
        },
      })

      expect(existsSync(output)).toBe(true)
    } /* finally {
      if (existsSync(outputPath)) {
        unlinkSync(outputPath)
      }
    }
  } */)
  })

  describe('Scenario: Create a page with custom format', () => {
    it('should generate PDF with custom format', async () => {
      const filename = 'test-letter-format'
      const { userInput, output } = getPath({ filename, type: 'pdf', extension: 'pdf' })

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
      const testOutput = 'test-letter-format'
      const { userInput, output } = getPath({ filename: testOutput, type: 'pdf', extension: 'pdf' })

      /*     try { */
      await generatePDF({
        url: 'data:text/html,<h1>Letter Format Test</h1>',
        pdfOptions: {
          path: userInput,
          format: 'letter',
        },
      })

      expect(existsSync(output)).toBe(true)
    } /* finally {
        if (existsSync(output)) {
          unlinkSync(output)
        }
      }
    } */)
  })

  describe('Scenario: Handle complex HTML content', () => {
    it('should handle complex HTML content', async () => {
      const filename = 'test-complex-html'
      const { userInput, output } = getPath({ filename, type: 'pdf', extension: 'pdf' })

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
      const filename = 'test-complex-html'
      const { userInput, output } = getPath({ filename, type: 'pdf', extension: 'pdf' })

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

      /* try { */
      await generatePDF({
        url: `data:text/html,${encodeURIComponent(complexHtml)}`,
        pdfOptions: {
          path: userInput,
        },
      })

      expect(existsSync(output)).toBe(true)
    } /* finally {
        if (existsSync(userPath)) {
          unlinkSync(userPath)
        }
      }
    } */)
  })

  it('should do nothing when an input is not provided', async () => {
    const filename = undefined
    const { userInput } = getPath({ filename, type: 'pdf', extension: 'pdf' })

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
