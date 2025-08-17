#!/usr/bin/env node

import { chromium } from 'playwright'

const defaultPdfFormat = 'A4'

export function downloadPDF(
  url: string,
  output?: string,
  format = defaultPdfFormat,
) {
  ;void (async () => {
    const browser = await chromium.launch()
    const context = await browser.newContext()
    try {
      const page = await context.newPage()

      // await page.setViewportSize({ width: 1280, height: 800 })
      await page.goto(url)
      await page.waitForLoadState('networkidle')

      if (!output) {
        const [pageTitle] = url.split('/').slice(-1)
        output = pageTitle
        console.log(output)
      }

      // await page.emulateMedia({ media: 'print' })
      await page.emulateMedia({ media: 'screen' })

      await page.pdf({
        path: `${output}.pdf`,
        format,
        printBackground: true,
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
