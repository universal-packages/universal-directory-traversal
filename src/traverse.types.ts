export type TraverseCallback = (directoryMap: DirectoryMap) => boolean

export interface DirectoryTraversalOptions {
  callback?: TraverseCallback
  fileFilter?: RegExp | string[]
  maxDepth?: number
}

export interface DirectoryMap {
  path: string
  basename: string
  files: string[]
  directories: DirectoryMap[]
  notAccessible?: true
}
