import { describe, expect, it } from 'vitest'

import {
  chromeBrowser,
  closeBrowser,
  findChrome,
  getChromeBrowser,
} from '../src/lib/utils/find-chrome.js'
import { inMemoryFs } from '../src/lib/utils/fs.js'

describe('Chrome Finding', () => {
  it('should find Chrome on macOS', () => {
    const macOSPath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
    const fileChecker = inMemoryFs([macOSPath])

    const chromePath = findChrome(fileChecker)
    expect(chromePath).toBe(macOSPath)
  })

  it('should find Chrome on Linux', () => {
    const linuxPath = '/usr/bin/google-chrome'
    const fileChecker = inMemoryFs([linuxPath])

    const chromePath = findChrome(fileChecker)
    expect(chromePath).toBe(linuxPath)
  })

  it('should find Chrome on Windows', () => {
    const windowsPath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
    const fileChecker = inMemoryFs([windowsPath])

    const chromePath = findChrome(fileChecker)
    expect(chromePath).toBe(windowsPath)
  })

  it('should throw error when Chrome is not found', () => {
    const fileChecker = inMemoryFs([]) // No Chrome found

    expect(() => findChrome(fileChecker)).toThrow('Chrome not found. Please install Google Chrome.')
  })

  it('should prioritize paths in correct order', () => {
    const macOSPath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
    const linuxPath = '/usr/bin/google-chrome'

    // Both exist, should return first one (macOS)
    const fileChecker = inMemoryFs([macOSPath, linuxPath])

    const chromePath = findChrome(fileChecker)
    expect(chromePath).toBe(macOSPath)
  })

  it('should work with real file system (integration test)', () => {
    // This test runs against the actual file system
    // It will pass if Chrome is installed, skip if not
    try {
      const chromePath = findChrome() // Uses real file checker
      expect(typeof chromePath).toBe('string')
      expect(chromePath.length).toBeGreaterThan(0)
    } catch (error) {
      // Chrome not installed - that's okay for CI environments
      expect(error).toBeInstanceOf(Error)
      expect((error as Error).message).toContain('Chrome not found')
    }
  })

  describe('Manage Chrome Browser', () => {
    it('should launch Chrome', async () => {
      await getChromeBrowser()
      expect(chromeBrowser).toBeDefined()
    })

    it('should close Chrome', async () => {
      expect(chromeBrowser).toBeDefined()
      await closeBrowser()
      expect(chromeBrowser).toBeNull()
    })
  })
})
