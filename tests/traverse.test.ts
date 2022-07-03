import { DirectoryMap, traverse } from '../src'

describe('traverse', (): void => {
  it('traverse a directory and returns and directory map object', async (): Promise<void> => {
    const directoryMap = await traverse('./tests/__fixtures__')

    expect(directoryMap).toMatchObject({
      path: expect.stringMatching(/__fixtures__/),
      files: [expect.stringMatching(/__fixtures__\/level1.html/), expect.stringMatching(/__fixtures__\/level1.pdf/)],
      directories: [
        {
          path: expect.stringMatching(/__fixtures__\/level1A/),
          files: [expect.stringMatching(/__fixtures__\/level1A\/level2.html/), expect.stringMatching(/__fixtures__\/level1A\/level2.pdf/)],
          directories: [
            {
              path: expect.stringMatching(/__fixtures__\/level1A\/level2A/),
              files: [expect.stringMatching(/__fixtures__\/level1A\/level2A\/level3.html/), expect.stringMatching(/__fixtures__\/level1A\/level2A\/level3.pdf/)],
              directories: []
            },
            {
              path: expect.stringMatching(/__fixtures__\/level1A\/level2B/),
              files: [expect.stringMatching(/__fixtures__\/level1A\/level2B\/level3.html/), expect.stringMatching(/__fixtures__\/level1A\/level2B\/level3.pdf/)],
              directories: []
            }
          ]
        },
        {
          path: expect.stringMatching(/__fixtures__\/level1B/),
          files: [expect.stringMatching(/__fixtures__\/level1B\/level2.html/), expect.stringMatching(/__fixtures__\/level1B\/level2.pdf/)],
          directories: [
            {
              path: expect.stringMatching(/__fixtures__\/level1B\/level2A/),
              files: [expect.stringMatching(/__fixtures__\/level1B\/level2A\/level3.html/), expect.stringMatching(/__fixtures__\/level1B\/level2A\/level3.pdf/)],
              directories: []
            },
            {
              path: expect.stringMatching(/__fixtures__\/level1B\/level2B/),
              files: [expect.stringMatching(/__fixtures__\/level1B\/level2B\/level3.html/), expect.stringMatching(/__fixtures__\/level1B\/level2B\/level3.pdf/)],
              directories: []
            }
          ]
        }
      ]
    })
  })

  describe('options', (): void => {
    describe('directoryFilter', (): void => {
      it('filter files with an array of extesions to include', async (): Promise<void> => {
        const directoryMap = await traverse('./tests/__fixtures__', { directoryFilter: ['level1A'] })

        expect(directoryMap).toMatchObject({
          path: expect.stringMatching(/__fixtures__/),
          files: [expect.stringMatching(/__fixtures__\/level1.html/), expect.stringMatching(/__fixtures__\/level1.pdf/)],
          directories: [
            {
              path: expect.stringMatching(/__fixtures__\/level1A/),
              files: [expect.stringMatching(/__fixtures__\/level1A\/level2.html/), expect.stringMatching(/__fixtures__\/level1A\/level2.pdf/)],
              directories: []
            }
          ]
        })
      })

      it('filter files with an regex expression', async (): Promise<void> => {
        const directoryMap = await traverse('./tests/__fixtures__', { directoryFilter: /level.B$/ })

        expect(directoryMap).toMatchObject({
          path: expect.stringMatching(/__fixtures__/),
          files: [expect.stringMatching(/__fixtures__\/level1.html/), expect.stringMatching(/__fixtures__\/level1.pdf/)],
          directories: [
            {
              path: expect.stringMatching(/__fixtures__\/level1B/),
              files: [expect.stringMatching(/__fixtures__\/level1B\/level2.html/), expect.stringMatching(/__fixtures__\/level1B\/level2.pdf/)],
              directories: [
                {
                  path: expect.stringMatching(/__fixtures__\/level1B\/level2B/),
                  files: [expect.stringMatching(/__fixtures__\/level1B\/level2B\/level3.html/), expect.stringMatching(/__fixtures__\/level1B\/level2B\/level3.pdf/)],
                  directories: []
                }
              ]
            }
          ]
        })
      })
    })

    describe('fileFilter', (): void => {
      it('filter files with an array of extesions to include', async (): Promise<void> => {
        const directoryMap = await traverse('./tests/__fixtures__', { fileFilter: ['html'] })

        expect(directoryMap).toMatchObject({
          path: expect.stringMatching(/__fixtures__/),
          files: [expect.stringMatching(/__fixtures__\/level1.html/)],
          directories: [
            {
              path: expect.stringMatching(/__fixtures__\/level1A/),
              files: [expect.stringMatching(/__fixtures__\/level1A\/level2.html/)],
              directories: [
                {
                  path: expect.stringMatching(/__fixtures__\/level1A\/level2A/),
                  files: [expect.stringMatching(/__fixtures__\/level1A\/level2A\/level3.html/)],
                  directories: []
                },
                {
                  path: expect.stringMatching(/__fixtures__\/level1A\/level2B/),
                  files: [expect.stringMatching(/__fixtures__\/level1A\/level2B\/level3.html/)],
                  directories: []
                }
              ]
            },
            {
              path: expect.stringMatching(/__fixtures__\/level1B/),
              files: [expect.stringMatching(/__fixtures__\/level1B\/level2.html/)],
              directories: [
                {
                  path: expect.stringMatching(/__fixtures__\/level1B\/level2A/),
                  files: [expect.stringMatching(/__fixtures__\/level1B\/level2A\/level3.html/)],
                  directories: []
                },
                {
                  path: expect.stringMatching(/__fixtures__\/level1B\/level2B/),
                  files: [expect.stringMatching(/__fixtures__\/level1B\/level2B\/level3.html/)],
                  directories: []
                }
              ]
            }
          ]
        })
      })

      it('filter files with an regex expression', async (): Promise<void> => {
        const directoryMap = await traverse('./tests/__fixtures__', { fileFilter: /.*pdf$/ })

        expect(directoryMap).toMatchObject({
          path: expect.stringMatching(/__fixtures__/),
          files: [expect.stringMatching(/__fixtures__\/level1.pdf/)],
          directories: [
            {
              path: expect.stringMatching(/__fixtures__\/level1A/),
              files: [expect.stringMatching(/__fixtures__\/level1A\/level2.pdf/)],
              directories: [
                {
                  path: expect.stringMatching(/__fixtures__\/level1A\/level2A/),
                  files: [expect.stringMatching(/__fixtures__\/level1A\/level2A\/level3.pdf/)],
                  directories: []
                },
                {
                  path: expect.stringMatching(/__fixtures__\/level1A\/level2B/),
                  files: [expect.stringMatching(/__fixtures__\/level1A\/level2B\/level3.pdf/)],
                  directories: []
                }
              ]
            },
            {
              path: expect.stringMatching(/__fixtures__\/level1B/),
              files: [expect.stringMatching(/__fixtures__\/level1B\/level2.pdf/)],
              directories: [
                {
                  path: expect.stringMatching(/__fixtures__\/level1B\/level2A/),
                  files: [expect.stringMatching(/__fixtures__\/level1B\/level2A\/level3.pdf/)],
                  directories: []
                },
                {
                  path: expect.stringMatching(/__fixtures__\/level1B\/level2B/),
                  files: [expect.stringMatching(/__fixtures__\/level1B\/level2B\/level3.pdf/)],
                  directories: []
                }
              ]
            }
          ]
        })
      })
    })

    describe('maxDepth', (): void => {
      it('limits how dept the traverse go', async (): Promise<void> => {
        const directoryMap = await traverse('./tests/__fixtures__', { maxDepth: 1 })

        expect(directoryMap).toMatchObject({
          path: expect.stringMatching(/__fixtures__/),
          files: [expect.stringMatching(/__fixtures__\/level1.html/), expect.stringMatching(/__fixtures__\/level1.pdf/)],
          directories: [
            {
              path: expect.stringMatching(/__fixtures__\/level1A/),
              files: [expect.stringMatching(/__fixtures__\/level1A\/level2.html/), expect.stringMatching(/__fixtures__\/level1A\/level2.pdf/)],
              directories: []
            },
            {
              path: expect.stringMatching(/__fixtures__\/level1B/),
              files: [expect.stringMatching(/__fixtures__\/level1B\/level2.html/), expect.stringMatching(/__fixtures__\/level1B\/level2.pdf/)],
              directories: []
            }
          ]
        })
      })
    })

    describe('callback', (): void => {
      it('let the user do something to every directory maped and limit if it should continue', async (): Promise<void> => {
        const directoryMap = await traverse('./tests/__fixtures__', {
          callback: (directoryMap: DirectoryMap): boolean => {
            return !directoryMap.path.includes('B')
          }
        })

        expect(directoryMap).toMatchObject({
          path: expect.stringMatching(/__fixtures__/),
          files: [expect.stringMatching(/__fixtures__\/level1.html/), expect.stringMatching(/__fixtures__\/level1.pdf/)],
          directories: [
            {
              path: expect.stringMatching(/__fixtures__\/level1A/),
              files: [expect.stringMatching(/__fixtures__\/level1A\/level2.html/), expect.stringMatching(/__fixtures__\/level1A\/level2.pdf/)],
              directories: [
                {
                  path: expect.stringMatching(/__fixtures__\/level1A\/level2A/),
                  files: [expect.stringMatching(/__fixtures__\/level1A\/level2A\/level3.html/), expect.stringMatching(/__fixtures__\/level1A\/level2A\/level3.pdf/)],
                  directories: []
                },
                {
                  path: expect.stringMatching(/__fixtures__\/level1A\/level2B/),
                  files: [expect.stringMatching(/__fixtures__\/level1A\/level2B\/level3.html/), expect.stringMatching(/__fixtures__\/level1A\/level2B\/level3.pdf/)],
                  directories: []
                }
              ]
            },
            {
              path: expect.stringMatching(/__fixtures__\/level1B/),
              files: [expect.stringMatching(/__fixtures__\/level1B\/level2.html/), expect.stringMatching(/__fixtures__\/level1B\/level2.pdf/)],
              directories: []
            }
          ]
        })
      })
    })
  })
})
