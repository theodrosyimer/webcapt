import { existsSync } from 'fs'

export interface FsPort {
  exists(path: string): boolean
}

export const nodeFs: FsPort = {
  exists: (path: string) => existsSync(path),
}

export const inMemoryFs = (existingPaths: string[]): FsPort => ({
  exists: (path: string) => existingPaths.includes(path),
})
