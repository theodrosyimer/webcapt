#!/usr/bin/env node

import puppeteer from 'puppeteer'

export function downloadImg(
  url: string,
  output?: string,
  format: 'png' | 'jpeg' = 'png',
) {
  ;void (async () => {
    const browser = await puppeteer.launch()
    try {
      const page = await browser.newPage()

      await page.setViewport({
        width: 1280,
        height: 800,
      })

      await page.goto(url, { waitUntil: 'networkidle0' })

      if (!output) {
        const [pageTitle] = url.split('/').slice(-1)
        output = pageTitle
        console.log(output)
      }

      await page.screenshot({
        path: `${output}.${format}`,
        fullPage: true,
        type: format,
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
