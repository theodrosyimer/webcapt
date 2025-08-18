import { type PDFOptions } from 'puppeteer'

import { getChromeBrowser } from '../utils/find-chrome.js'

const defaultPdfOptions = {
  format: 'A4',
  printBackground: true,
} satisfies PDFOptions

export type GeneratePdfOptions = {
  url: string
  pdfOptions?: PDFOptions
}

export async function generatePDF({
  url,
  pdfOptions = {},
}: GeneratePdfOptions): Promise<string | undefined> {
  const browser = await getChromeBrowser()
  const page = await browser.newPage()

  try {
    await page.goto(url, { waitUntil: 'networkidle0' })
    await page.emulateMediaType('screen')

    pdfOptions.path = pdfOptions.path ? `${pdfOptions.path}.pdf` : undefined
    await page.pdf({
      ...defaultPdfOptions,
      ...pdfOptions,
    })

    return pdfOptions.path
  } finally {
    await page.close()
  }
}
