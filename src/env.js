import { fileURLToPath } from 'node:url'
import path, { dirname } from 'node:path'
import glob from './utils/glob.js'

/**
 * @function currentPath __filename  __dirname
 * @param {string} currentpath
 * @returns
 */
export function currentPath(currentpath) {
  const __filename = fileURLToPath(currentpath)
  const __dirname = dirname(__filename)
  return { __filename, __dirname }
}

/**
 * @function join 就是join
 * @param {string[]} props
 * @returns
 */
export function join(...props) {
  // console.log('process.json', props)
  if (props.at(0).includes('file:/')) {
    props[0] = currentPath(props[0]).__dirname
  }
  return path.join(...props)
}

/**
 * @function 创建目录
 * @param {string} ph
 */
export const mkDirectory = (ph) => {
  if (!existsSync(ph)) {
    mkdirSync(ph, { recursive: true })
  }
}

// 声明全局变量
process.env.ACTIVE_DATABASE = 'MONGODB'

process.join = join
process.currentPath = currentPath
process.glob = glob
process.mkDirectory = mkDirectory
