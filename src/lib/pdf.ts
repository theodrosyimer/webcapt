#!/usr/bin/env node

import { chromium } from 'playwright'
import { cwd } from 'process'
// import { z } from 'zod'

const url = process.argv[3]
const output = process.argv[4]
const pdfFormat = 'A4'
const currentDir = cwd()

if (!url || !output) {
  console.error('You must enter the type of file, url, and output!\n')
  console.error('Example:\n')
  console.error('  dpdf https://www.udemy.com/ udemy.png')
  process.exit(1)
}
// const result = z.string(url).url('Not valid url was provided!').safeParse()

// if (!result.success) {
//   console.error(result.error)
//   process.exit(1)
// }

export function downloadPDF(url: string, output: string) {
  ;(async () => {
    const browser = await chromium.launch()
    const context = await browser.newContext()
    try {
      const page = await context.newPage()

      // await page.setViewport({ width: 1280, height: 800 })
      await page.goto(url)
      await page.waitForLoadState('networkidle')
      await page.emulateMedia({ media: 'print' })

      await page.pdf({
        path: `${output}.pdf`,
        format: pdfFormat,
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
