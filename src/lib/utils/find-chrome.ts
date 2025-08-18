import puppeteer, { type Browser } from 'puppeteer'

import { type FsPort, nodeFs } from './fs.js'

let chromeBrowser: Browser | null = null
export async function getChromeBrowser() {
  chromeBrowser ??= await puppeteer.launch({
    executablePath: findChrome(),
  })
  return chromeBrowser
}

export async function closeBrowser() {
  await chromeBrowser?.close()
  chromeBrowser = null
}

export function findChrome(fs: FsPort = nodeFs) {
  const paths = [
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/usr/bin/google-chrome',
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  ]

  for (const path of paths) {
    if (fs.exists(path)) return path
  }

  throw new Error('Chrome not found. Please install Google Chrome.')
}
