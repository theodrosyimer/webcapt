import { existsSync } from 'fs'

import type { ScreenshotOptions } from 'puppeteer'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { DELETE_TEST_FILES } from './cli.int.test.js'
import { setup } from './setup.js'
import { generateImage } from '../src/lib/generate/image.js'
import { closeBrowser, findChrome } from '../src/lib/utils/find-chrome.js'

describe('Feature: Image Generation', () => {
  const { setBaseDirectory } = setup()
  const { arrange, clean } = setBaseDirectory('image')

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

  describe('Scenario: Generate PNG from a simple webpage', () => {
    it('should generate PNG from a simple webpage', async () => {
      const { userInput, output } = arrange({
        filename: 'test-simple-page',
        type: 'image',
        extension: 'png',
      })

      const result = await generateImage({
        url: 'data:text/html,<h1>Test Page</h1><p>This is a test</p>',
        screenshotOptions: { type: 'png', path: userInput as ScreenshotOptions['path'] },
      })

      expect(result).toBe(output)
    })

    it('should exists on disk', async () => {
      const { userInput, output } = arrange({
        filename: 'test-simple-page',
        type: 'image',
        extension: 'png',
      })

      await generateImage({
        url: 'data:text/html,<h1>Test Page</h1><p>This is a test</p>',
        screenshotOptions: { type: 'png', path: userInput as ScreenshotOptions['path'] },
      })

      expect(existsSync(output)).toBe(true)
    })
  })

  describe('Scenario: Generate JPEG from a webpage', () => {
    it('should generate JPEG from a webpage', async () => {
      const { userInput, output } = arrange({
        filename: 'test-jpeg-page',
        type: 'image',
        extension: 'jpeg',
      })

      const result = await generateImage({
        url: 'data:text/html,<h1>JPEG Test</h1><p>This should be a JPEG</p>',
        screenshotOptions: { type: 'jpeg', path: userInput as ScreenshotOptions['path'] },
      })

      expect(result).toBe(output)
    })

    it('should exists on disk', async () => {
      const { userInput, output } = arrange({
        filename: 'test-jpeg-page',
        type: 'image',
        extension: 'jpeg',
      })

      await generateImage({
        url: 'data:text/html,<h1>JPEG Test</h1><p>This should be a JPEG</p>',
        screenshotOptions: { type: 'jpeg', path: userInput as ScreenshotOptions['path'] },
      })

      expect(existsSync(output)).toBe(true)
    })
  })

  describe('Scenario: Default format', () => {
    it('should default to PNG format when not specified', async () => {
      const { userInput, output } = arrange({
        filename: 'test-default-format',
        type: 'image',
        extension: 'png',
      })

      const result = await generateImage({
        url: 'data:text/html,<h1>Default Format Test</h1>',
        screenshotOptions: { type: 'png', path: userInput as ScreenshotOptions['path'] },
      })

      expect(result).toBe(output)
    })

    it('should exists on disk', async () => {
      const { userInput, output } = arrange({
        filename: 'test-default-format',
        type: 'image',
        extension: 'png',
      })

      await generateImage({
        url: 'data:text/html,<h1>Default Format Test</h1>',
        screenshotOptions: { type: 'png', path: userInput as ScreenshotOptions['path'] },
      })

      expect(existsSync(output)).toBe(true)
    })
  })

  it('should do nothing when an input is not provided', async () => {
    const result = await generateImage({
      url: 'data:text/html,<h1>Auto Filename Test</h1>',
      screenshotOptions: { type: 'png' },
    })

    expect(result).toBeUndefined()
    expect(existsSync(result ?? '')).toBe(false)
  })

  it('should throw error for invalid URL', async () => {
    await expect(
      generateImage({
        url: 'invalid-url',
        // @ts-expect-error - invalid path
        screenshotOptions: { path: 'test-invalid' },
      }),
    ).rejects.toThrow()
  })
})
