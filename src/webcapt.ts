import { Command } from 'commander'

import { downloadPDF } from './lib/pdf.js'
import { downloadImg } from './lib/img.js'

export const webcapt = new Command()

webcapt
  .name('webcapt')
  .version('0.0.1')
  .description('Download webpages as images or pdfs')

webcapt
  .option('-u, --url <url>', 'URL to download') // https://www.udemy.com/
  .option('-o, --output <output>', 'Output file name')
  .option('-t, --type <type>', 'Type of file to download, default: pdf', 'pdf')
  .action((options: { url: string; output: string; type: 'pdf' | 'img' }) => {
    if (options.type === 'pdf') {
      downloadPDF(options.url, options.output)
    }

    if (options.type === 'img') {
      downloadImg(options.url, options.output)
    }
  })
