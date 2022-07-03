import fs from 'fs'
import path from 'path'
import { checkDirectory } from '@universal-packages/fs-utils'
import { DirectoryTraversalOptions, DirectoryMap } from './traverse.types'

/**
 *
 * Universal directory traversal, it will go recursively from a root
 * directory until it maps the whole tree, you can execute a callback
 * for every visited directory after being mapped
 *
 */
export async function traverse(location: string, options: DirectoryTraversalOptions = {}): Promise<DirectoryMap> {
  const finalLocation = checkDirectory(location)
  const root: DirectoryMap = { path: finalLocation, files: [], directories: [] }

  await recursiveTraverse(root, 0, options)

  return root
}

/** Recursively go through directory trees */
async function recursiveTraverse(root: DirectoryMap, level: number, options: DirectoryTraversalOptions): Promise<void> {
  let rawFiles: string[]
  const directories: string[] = []

  // We flag the directory map as not accessible if well we can not access it
  try {
    rawFiles = fs.readdirSync(root.path)
  } catch {
    root.notAccessible = true
    return
  }

  // Split files and directories and filter files if requested
  for (let i = 0; i < rawFiles.length; i++) {
    try {
      const subfile = path.resolve(root.path, rawFiles[i])
      const subfileStats = fs.statSync(subfile)
      const fileOrDirectoryName = subfile.substring(subfile.lastIndexOf('/') + 1)

      // Spliting
      if (subfileStats.isDirectory()) {
        if (options.directoryFilter) {
          if (Array.isArray(options.directoryFilter)) {
            if (options.directoryFilter.includes(fileOrDirectoryName)) {
              directories.push(subfile)
            }
          } else {
            if (new RegExp(options.directoryFilter).exec(fileOrDirectoryName) !== null) {
              directories.push(subfile)
            }
          }
        } else {
          directories.push(subfile)
        }
      } else {
        if (options.fileFilter) {
          if (Array.isArray(options.fileFilter)) {
            const extname = path.extname(subfile)
            const extnameNoDot = path.extname(subfile).substring(1)

            if (options.fileFilter.includes(extname) || options.fileFilter.includes(extnameNoDot)) {
              root.files.push(subfile)
            }
          } else {
            if (new RegExp(options.fileFilter).exec(fileOrDirectoryName) !== null) {
              root.files.push(subfile)
            }
          }
        } else {
          root.files.push(subfile)
        }
      }
    } catch {
      // Only include files we can access, so nothing to do here
    }
  }

  // Now is time to call the callback if provided
  if (options.callback) {
    // We only go deeper if the callback is true
    const shouldContinue = await options.callback(root)

    if (!shouldContinue) return
  }

  // If the depth is limited and we have reached that level we do not continue
  if (options.maxDepth !== undefined) {
    if (options.maxDepth <= level) return
  }

  // We go through the directories recursively
  for (let i = 0; i < directories.length; i++) {
    const nextDirectory = { path: directories[i], files: [], directories: [] }

    root.directories.push(nextDirectory)

    await recursiveTraverse(nextDirectory, level + 1, options)
  }
}
