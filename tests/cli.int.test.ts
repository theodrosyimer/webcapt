import { existsSync, unlinkSync } from 'fs'

import type { ScreenshotOptions } from 'puppeteer'
import { afterEach, describe, expect, it } from 'vitest'

import { setup } from './setup.js'
import { closeBrowser } from '../src/lib/utils/find-chrome.js'
import { webcapt } from '../src/webcapt.js'

describe('Webcapt CLI', () => {
  const { testFiles, setBaseDirectory } = setup()
  const { getPath } = setBaseDirectory('cli')

  afterEach(async () => {
    testFiles.forEach((file) => {
      if (existsSync(file)) {
        unlinkSync(file)
      }
    })
    testFiles.length = 0
    await closeBrowser()
  })

  describe('PDF Generation', () => {
    it('should generate PDF with default format', async () => {
      const dataUrl = 'data:text/html,<h1>Default PDF Format</h1>'
      const { userInput, output } = getPath({
        filename: 'test-default-pdf',
        type: 'pdf',
        extension: 'pdf',
      })

      await webcapt.pdf({
        url: dataUrl,
        pdfOptions: {
          path: userInput,
        },
      })

      testFiles.push(output)
      expect(existsSync(output)).toBe(true)
      expect(output).toContain('test-default-pdf.pdf')
    })
  })

  describe('Image Generation', () => {
    it('should generate image with default extension', async () => {
      const dataUrl = 'data:text/html,<h1>Default Image Format</h1>'
      const { userInput, output } = getPath({
        filename: 'test-default-img',
        type: 'image',
        extension: 'png',
      })

      await webcapt.img({
        url: dataUrl,
        screenshotOptions: { path: userInput as ScreenshotOptions['path'] },
      })

      testFiles.push(output)
      expect(existsSync(output)).toBe(true)
      expect(output).toContain('test-default-img.png')
    })
  })
})
