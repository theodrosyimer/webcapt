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
  .option('-u, --url <url>', 'URL to download') // https://www.udemy.com/
  .option('-o, --output <output>', 'Output file name')
  .option('-f, --format <type>', 'Type of file to download, default: A4', 'A4')
  .action(
    (options: { url: string; output: string; format: 'A4' | 'letter' }) => {
      downloadPDF(options.url, options.output, options.format)
    },
  )

webcapt
  .command('img')
  .option('-u, --url <url>', 'URL to download') // https://www.udemy.com/
  .option('-o, --output <output>', 'Output file name')
  .option(
    '-f, --format <type>',
    'Type of file to download could be png or jpeg, default: png',
    'png',
  )
  .action(
    (options: { url: string; output: string; format: 'png' | 'jpeg' }) => {
      downloadImg(options.url, options.output, options.format)
    },
  )
