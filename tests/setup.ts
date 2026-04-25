import { existsSync, mkdirSync, unlinkSync } from 'fs'

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
        arrange: ({
          filename,
          type,
          extension,
        }: {
          filename?: string
          type: 'image' | 'pdf'
          extension: string
        }) => {
          if (!filename) {
            return { userInput: '', output: '' }
          }
          if (type === 'image') {
            testFiles.push(`${modifiedBaseDir}/${filename}.${extension}`)
            const userInput = `${modifiedBaseDir}/${filename}`
            return {
              userInput,
              output: `${userInput}.${extension}`,
            }
          }
          testFiles.push(`${modifiedBaseDir}/${filename}.${extension}`)
          const userInput = `${modifiedBaseDir}/${filename}`
          return { userInput, output: `${userInput}.${extension}` }
        },
        clean: (deleteFiles: boolean) => {
          testFiles.forEach((file) => {
            if (deleteFiles && existsSync(file)) {
              unlinkSync(file)
            }
          })
          testFiles.length = 0
        },
      }
    },
  }
}
