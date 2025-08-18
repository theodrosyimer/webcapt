import { Command } from 'commander'
import type { ImageFormat, PaperFormat, ScreenshotOptions } from 'puppeteer'

import { type GenerateImageOptions, generateImage } from './lib/generate/image.js'
import { type GeneratePdfOptions, generatePDF } from './lib/generate/pdf.js'
import { closeBrowser } from './lib/utils/find-chrome.js'

class Webcapt {
  constructor(readonly command: Command) {
    this.command
      .name('webcapt')
      .version('0.0.1')
      .description(
        'A simple cli to screen capture web pages and save them to disk as images or pdfs.',
      )

    this.command
      .command('pdf')
      .description('Screenshot the provided url and download as a pdf')
      .option('-u, --url <url>', 'URL to download') // https://www.udemy.com/
      .option('-o, --output <output>', 'Output file name')
      .option(
        '-f, --format <format>',
        'Format of the file to download, options: A4 or letter, default: A4',
        'A4',
      )
      .action((options: { url: string; output: string; format: string }) => {
        void this.pdf({
          url: options.url,
          pdfOptions: { path: options.output, format: options.format as PaperFormat },
        })
      })

    this.command
      .command('img')
      .description('Screenshot the provided url and download as an image')
      .option('-u, --url <url>', 'URL to download') // https://www.udemy.com/
      .option('-o, --output <output>', 'Output file name')
      .option(
        '-f, --format <format>',
        'Format of the file to download, options: png or jpeg, default: png',
        'png',
      )
      .action((options: { url: string; output: string; format: string }) => {
        void this.img({
          url: options.url,
          screenshotOptions: {
            path: options.output as ScreenshotOptions['path'],
            type: options.format as ImageFormat,
          },
        })
      })
  }

  async pdf(options: GeneratePdfOptions): Promise<void> {
    try {
      const outputPath = await generatePDF({
        url: options.url,
        pdfOptions: options.pdfOptions,
      })
      console.log(`Generated: ${outputPath}`)
      console.log('Done!')
    } catch (e) {
      if (e instanceof Error) {
        console.error(e.message)
      }
    } finally {
      await closeBrowser()
    }
  }

  async img(options: GenerateImageOptions): Promise<void> {
    try {
      const outputPath = await generateImage({
        url: options.url,
        screenshotOptions: options.screenshotOptions,
      })
      console.log(`Generated: ${outputPath}`)
      console.log('Done!')
    } catch (e) {
      if (e instanceof Error) {
        console.error(e.message)
      }
    } finally {
      await closeBrowser()
    }
  }
}

export const webcapt = new Webcapt(new Command())
