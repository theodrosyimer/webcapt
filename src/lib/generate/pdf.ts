import { type PDFOptions } from 'puppeteer'

import { getChromeBrowser } from '../utils/find-chrome.js'

const defaultPdfOptions = {
  format: 'A4',
  printBackground: true,
} satisfies PDFOptions

export type GeneratePdfOptions = {
  url: string
  options?: PDFOptions
}

export async function generatePDF({
  url,
  options = {},
}: GeneratePdfOptions): Promise<string | undefined> {
  const browser = await getChromeBrowser()
  const page = await browser.newPage()

  try {
    await page.goto(url, { waitUntil: 'networkidle0' })
    await page.emulateMediaType('screen')

    options.path = options.path ? `${options.path}.pdf` : undefined
    await page.pdf({
      ...defaultPdfOptions,
      ...options,
    })

    return options.path
  } finally {
    await page.close()
  }
}
