import { checkDirectory } from '@universal-packages/fs-utils'
import fs from 'fs'
import path from 'path'

import { DirectoryMap, DirectoryTraversalOptions } from './traverse.types'

/**
 *
 * Universal directory traversal, it will go recursively from a root
 * directory until it maps the whole tree, you can execute a callback
 * for every visited directory after being mapped
 *
 */
export async function traverse(location: string, options: DirectoryTraversalOptions = {}): Promise<DirectoryMap> {
  const finalLocation = checkDirectory(location)
  const root: DirectoryMap = { path: finalLocation, basename: path.basename(finalLocation), files: [], directories: [] }

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
      const subFile = path.resolve(root.path, rawFiles[i])
      const subFileStats = fs.statSync(subFile)

      // Splitting
      if (subFileStats.isDirectory()) {
        directories.push(subFile)
      } else {
        if (options.fileFilter) {
          if (Array.isArray(options.fileFilter)) {
            const extname = path.extname(subFile)
            const extnameNoDot = path.extname(subFile).substring(1)

            if (options.fileFilter.includes(extname) || options.fileFilter.includes(extnameNoDot)) {
              root.files.push(subFile)
            }
          } else {
            const fileName = path.basename(subFile)

            if (new RegExp(options.fileFilter).exec(fileName) !== null) {
              root.files.push(subFile)
            }
          }
        } else {
          root.files.push(subFile)
        }
      }
    } catch {
      // Only include files we can access, so nothing to do here
    }
  }

  // We feed the current root with its directory so the call back can access and deside
  // depending of these entries
  for (let i = 0; i < directories.length; i++) {
    root.directories.push({ path: directories[i], basename: path.basename(directories[i]), files: [], directories: [] })
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
    const nextDirectory = root.directories[i]

    await recursiveTraverse(nextDirectory, level + 1, options)
  }
}
