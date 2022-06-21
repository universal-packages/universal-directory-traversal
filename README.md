# Directory Traversal

[![npm version](https://badge.fury.io/js/@universal-packages%2Fdirectory-traversal.svg)](https://www.npmjs.com/package/@universal-packages/directory-traversal)
[![Testing](https://github.com/universal-packages/universal-directory-traversal/actions/workflows/testing.yml/badge.svg)](https://github.com/universal-packages/universal-directory-traversal/actions/workflows/testing.yml)
[![codecov](https://codecov.io/gh/universal-packages/universal-directory-traversal/branch/main/graph/badge.svg?token=CXPJSN8IGL)](https://codecov.io/gh/universal-packages/universal-directory-traversal)

Sometimes you just need a way to map a directory to either load modules in real time or just get the available files to run a task, directory traversal will map a directory for you and deliver a convenient `DirectoryMap` object for you.

## Install

```shell
npm install @universal-packages/directory-traversal
```

## traverse()

The traverse function will go recursively from a root directory until it maps the whole tree, you can execute a callback for every visited directory after being mapped, limit the depth and filter for files you want or you not want to be mapped, returning a `DirectoryMap` object

```js
import { traverse } from '@universal-packages/directory-traversal'

async function test() {
  const directoryMap = await traverse('~/projects')

  console.log(directoryMap)
}

test()
```

### DirectoryMap

From the traverse example you will get something like this:

```json
{
  "path": "home/projects",
  "files": [],
  "directories": [
    {
      "path": "home/projects/universal-directory-traversal",
      "files": [
        "home/projects/universal-directory-traversal/.editorconfig",
        "home/projects/universal-directory-traversal/.gitignore",
        "home/projects/universal-directory-traversal/CODE-OF-CONDUCT.md",
        "home/projects/universal-directory-traversal/CONTRIBUTING.md",
        "home/projects/universal-directory-traversal/LICENSE.md",
        "home/projects/universal-directory-traversal/README.md",
        "home/projects/universal-directory-traversal/package-lock.json",
        "home/projects/universal-directory-traversal/package.json",
        "home/projects/universal-directory-traversal/tsconfig.dis.json",
        "home/projects/universal-directory-traversal/tsconfig.json"
      ],
      "directories": [...]
    }
  ]
}
```

## Options

You can modify the behavior of the traverse function by providing options.

```ts
interface DirectoryTraversalOptions {
  callback?: (directoryMap: DirectoryMap) => boolean | Promise<boolean>
  fileFilter?: RegExp | string[]
  maxDepth?: number
}
```

where:

- `callback` A function to call for every mapped directory for you to analyze in place, return false if you want to stop going deeper into that directory.

```js
const directoryMap = await traverse('~/projects', {
  callback: (directoryMap) => {
    if (directoryMap.path.include('homework')) {
      return false
    }
  }
})
```

- `fileFilter` To only include files that satifice this contition

```js
{
  // An array of file extensions to only include those in the mapping
  fileFilter: ['yml', 'ymal', 'js', 'json'],

  // Or a regex expresions to only include file names that matche
  fileFilter: /.*\.especial.[js|ts]/
}
```

- `maxDepth` To only map files going this level deep

```js
{
  maxDepth: 3
}
```

## Typescript

This library is developed in TypeScript and shipped fully typed.

## Contributing

The development of this library in the open on GitHub, and we are grateful to the community for contributing bugfixes and improvements. Read below to learn how you can take part in improving this library.

- [Code of Conduct](./CODE_OF_CONDUCT.md)
- [Contributing Guide](./CONTRIBUTING.md)

### License

[MIT licensed](./LICENSE).
