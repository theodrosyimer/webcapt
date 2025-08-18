import { existsSync } from 'fs'

import type { ScreenshotOptions } from 'puppeteer'
import { afterAll, describe, expect, it } from 'vitest'

import { setup } from './setup.js'
import { closeBrowser } from '../src/lib/utils/find-chrome.js'
import { webcapt } from '../src/webcapt.js'

export const DELETE_TEST_FILES = true

describe('Webcapt CLI', () => {
  const { setBaseDirectory } = setup()
  const { arrange, clean } = setBaseDirectory('cli')

  afterAll(async () => {
    clean(DELETE_TEST_FILES)
    await closeBrowser()
  })

  describe('PDF Generation', () => {
    it('should generate PDF with default format', async () => {
      const { userInput, output } = arrange({
        filename: 'test-default',
        type: 'pdf',
        extension: 'pdf',
      })

      await webcapt.pdf({
        url: 'data:text/html,<h1>Default PDF Format</h1>',
        pdfOptions: {
          path: userInput,
        },
      })

      expect(existsSync(output)).toBe(true)
      expect(output).toContain('test-default.pdf')
    })
  })

  describe('Image Generation', () => {
    it('should generate image with default extension', async () => {
      const { userInput, output } = arrange({
        filename: 'test-default-img',
        type: 'image',
        extension: 'png',
      })

      await webcapt.img({
        url: 'data:text/html,<h1>Default Image Format</h1>',
        screenshotOptions: { path: userInput as ScreenshotOptions['path'] },
      })

      expect(existsSync(output)).toBe(true)
      expect(output).toContain('test-default-img.png')
    })
  })
})
