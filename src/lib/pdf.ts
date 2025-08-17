#!/usr/bin/env node

import puppeteer, { type PaperFormat } from 'puppeteer'

const defaultPdfFormat: PaperFormat = 'A4'

export function downloadPDF(
  url: string,
  output?: string,
  format = defaultPdfFormat,
) {
  ;void (async () => {
    const browser = await puppeteer.launch()
    try {
      const page = await browser.newPage()

      await page.goto(url, { waitUntil: 'networkidle0' })

      if (!output) {
        const [pageTitle] = url.split('/').slice(-1)
        output = pageTitle
        console.log(output)
      }

      await page.emulateMediaType('screen')

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
