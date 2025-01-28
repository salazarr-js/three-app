import { readFileSync } from 'node:fs'

/** */
function getFolderFilename(path: string) {
  const parts = path.split('/')
  const filename = parts.pop() || ''
  const folder = parts.pop() || ''

  return { folder, filename }
}

/** */
export default {
  watch: ['../../examples/**/*.ts'],
  load(watchedFiles) {
    console.warn('watched works')

    return watchedFiles.reduce((acc, filePath) => {
      const { folder, filename } = getFolderFilename(filePath)
      const scriptContent = readFileSync(filePath, 'utf-8')

      return {
        ...acc,
        [`${folder}`]: { ...acc[folder], [filename]: scriptContent },
      }
    }, {})
  },
}
