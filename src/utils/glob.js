import { readdirSync, statSync } from 'node:fs'
import { basename } from 'node:path'
import { pathToFileURL } from 'url'

function directory(ph) {
  return statSync(ph).isDirectory()
}

/**
 * @function deepPath 递归获取文件路径
 * @param {*} ph
 * @returns
 */
function deepPath(ph) {
  let result = []
  const files = readdirSync(ph)
  for (const iterator of files) {
    const iterPath = process.join(ph, iterator)
    if (directory(iterPath)) {
      result = result.concat(deepPath(iterPath))
    } else {
      result.push({
        fileName: iterator,
        filePath: iterPath
      })
    }
  }
  return result
}

/**
 * @function glob 动态导入
 * @param  {...string} ph 路径
 * @returns
 */
async function glob(...ph) {
  let options = {
    isFile: false
  }
  if (ph.at(-1)?.isFile) {
    options = { ...options, ...ph.at(-1) }
    ph.pop()
  }

  const dirPh = process.join(...ph)
  const isDirectory = directory(dirPh)
  if (!isDirectory) {
    return await globImport({ fileName: basename(dirPh), filePath: dirPh })
  }

  const files = deepPath(dirPh)
  const result = []
  for (const fileItem of files) {
    const model = await import(pathToFileURL(fileItem.filePath).href)
    if (options.isFile) {
      result.push({
        file: fileItem,
        module: model
      })
    } else {
      result.push(model)
    }
  }
  return result
}

export default glob
