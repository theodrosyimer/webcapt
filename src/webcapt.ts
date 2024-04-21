import { Command } from 'commander'

import { downloadPDF } from './lib/pdf.js'
import { downloadImg } from './lib/img.js'

export const webcapt = new Command()

webcapt
  .name('webcapt')
  .version('0.0.1')
  .description(
    'A simple cli to screen capture web pages and save them to disk as images or pdfs.',
  )

webcapt
  .command('pdf')
  .description('Screenshot the provided url and download as a pdf')
  .option('-u, --url <url>', 'URL to download') // https://www.udemy.com/
  .option('-o, --output <output>', 'Output file name')
  .option(
    '-f, --format <format>',
    'Format of the file to download, options: A4 or letter, default: A4',
    'A4',
  )
  .action(
    (options: { url: string; output: string; format: 'A4' | 'letter' }) => {
      downloadPDF(options.url, options.output, options.format)
    },
  )

webcapt
  .command('img')
  .description('Screenshot the provided url and download as an image')
  .option('-u, --url <url>', 'URL to download') // https://www.udemy.com/
  .option('-o, --output <output>', 'Output file name')
  .option(
    '-f, --format <format>',
    'Format of the file to download, options: png or jpeg, default: png',
    'png',
  )
  .action(
    (options: { url: string; output: string; format: 'png' | 'jpeg' }) => {
      downloadImg(options.url, options.output, options.format)
    },
  )
