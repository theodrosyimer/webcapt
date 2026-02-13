import type { ScreenshotOptions } from 'puppeteer'

import { getChromeBrowser } from '../utils/find-chrome.js'

const defaultScreenshotOptions = {
  fullPage: true,
} satisfies ScreenshotOptions

export type GenerateImageOptions = {
  url: string
  screenshotOptions?: ScreenshotOptions
}

export async function generateImage({
  url,
  screenshotOptions = {},
}: GenerateImageOptions): Promise<string | undefined> {
  const browser = await getChromeBrowser()
  const page = await browser.newPage()
  screenshotOptions.type ??= 'png'

  try {
    await page.setViewport({
      width: 1280,
      height: 800,
    })

    await page.goto(url, { waitUntil: 'networkidle0' })

    screenshotOptions.path = screenshotOptions.path
      ? (`${screenshotOptions.path}.${screenshotOptions.type}` satisfies ScreenshotOptions['path'])
      : undefined

    await page.screenshot({
      ...defaultScreenshotOptions,
      ...screenshotOptions,
    })

    return screenshotOptions.path
  } finally {
    await page.close()
  }
}
