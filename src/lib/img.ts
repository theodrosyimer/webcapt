#!/usr/bin/env node

import { chromium } from 'playwright'

export function downloadImg(
  url: string,
  output?: string,
  format: 'png' | 'jpeg' = 'png',
) {
  ;(async () => {
    const browser = await chromium.launch()
    const context = await browser.newContext()
    try {
      const page = await context.newPage()

      await page.setViewportSize({
        width: 1280,
        height: 800,
      })
      await page.goto(url)
      await page.waitForLoadState('networkidle')

      if (!output) {
        const [pageTitle] = url.split('/').slice(-1)
        // eslint-disable-next-line no-param-reassign
        output = pageTitle
        console.log(output)
      }

      await page.screenshot({
        path: `${output}.${format}`,
        fullPage: true,
      })
      console.log('Done!')
      process.exit(0)
    } catch (e) {
      if (e instanceof Error) {
        console.error(e.message)
      }
      process.exit(1)
    } finally {
      await browser.close()
    }
  })()
}
