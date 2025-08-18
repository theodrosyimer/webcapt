import { existsSync, unlinkSync } from 'fs'

export interface FsPort {
  exists(path: string): boolean
  unlink(path: string): void
}

export const nodeFs: FsPort = {
  exists: (path: string) => existsSync(path),
  unlink: (path: string) => unlinkSync(path),
}

export const inMemoryFs = (existingPaths: string[]): FsPort => ({
  exists: (path: string) => existingPaths.includes(path),
  unlink: (path: string) => {
    const index = existingPaths.indexOf(path)
    if (index !== -1) {
      existingPaths.splice(index, 1)
    }
  },
})
