export type TraverseCallback = (directoryMap: DirectoryMap) => boolean | Promise<boolean>

export interface DirectoryTraversalOptions {
  callback?: TraverseCallback
  directoryFilter?: RegExp | string[]
  fileFilter?: RegExp | string[]
  maxDepth?: number
}

export interface DirectoryMap {
  path: string
  files: string[]
  directories: DirectoryMap[]
  notAccessible?: true
}
