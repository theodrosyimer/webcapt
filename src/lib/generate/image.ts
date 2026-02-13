import type { ScreenshotOptions } from 'puppeteer'

import { getChromeBrowser } from '../utils/find-chrome.js'

const defaultScreenshotOptions = {
  fullPage: true,
} satisfies ScreenshotOptions

export type GenerateImageOptions = {
  url: string
  options?: ScreenshotOptions
}

export async function generateImage({
  url,
  options = {},
}: GenerateImageOptions): Promise<string | undefined> {
  const browser = await getChromeBrowser()
  const page = await browser.newPage()
  options.type ??= 'png'

  try {
    await page.setViewport({
      width: 1280,
      height: 800,
    })

    await page.goto(url, { waitUntil: 'networkidle0' })

    options.path = options.path
      ? (`${options.path}.${options.type}` satisfies ScreenshotOptions['path'])
      : undefined

    await page.screenshot({
      ...defaultScreenshotOptions,
      ...options,
    })

    return options.path
  } finally {
    await page.close()
  }
}
