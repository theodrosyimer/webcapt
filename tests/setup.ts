import { mkdirSync } from 'fs'

import type { ScreenshotOptions } from 'puppeteer'

const TEST_BASE_DIR = 'generated-test-files'

export const setup = () => {
  const baseDir = TEST_BASE_DIR
  const testFiles: string[] = []

  return {
    testFiles,
    setBaseDirectory: (name: string) => {
      const modifiedBaseDir = `${baseDir}/${name}`
      mkdirSync(modifiedBaseDir, { recursive: true })
      return {
        baseDir: modifiedBaseDir,
        getPath: ({
          filename,
          type,
          extension,
        }: {
          filename?: string
          type: 'image' | 'pdf'
          extension: string
        }) => {
          if (!filename) {
            return { userInput: undefined, output: '' }
          }
          if (type === 'image') {
            const userInput = `${modifiedBaseDir}/${filename}`
            return {
              userInput: userInput as ScreenshotOptions['path'],
              output: `${userInput}.${extension}`,
            }
          }
          const userInput = `${modifiedBaseDir}/${filename}`
          return { userInput, output: `${userInput}.${extension}` }
        },
        testFiles,
      }
    },
  }
}
