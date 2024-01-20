import dayjs from 'dayjs'
import { rename } from 'fs/promises'
import { pathUpload } from '../config/config.js'

export default [
  {
    url: '/createDirectory',
    init(ctx) {
      try {
        let { pathList, rootName } = ctx.request.body
        //创建 日期为今天的目录
        const preservePath = process.join(
          pathUpload,
          dayjs().format('YYYY-MM-DD')
        )
        process.mkDirectory(preservePath)
        //头目录路径
        let rootDirectoryPath = process.join(preservePath, rootName)
        let rootDirectoryName = rootName
        //判断在文件夹里面有没有同名的文件夹，有就改名字创建
        if (existsSync(rootDirectoryPath)) {
          rootDirectoryName = rootName + '.' + Date.now().toString()
          rootDirectoryPath = process.join(preservePath, rootDirectoryName)
          mkDirectory(rootDirectoryPath)
        } else {
          mkDirectory(rootDirectoryPath)
        }
        //创建各个目录

        if (pathList.length > 0) {
          for (const iterator of pathList) {
            iterator.replace(rootName, rootDirectoryPath)
            mkDirectory(iterator)
          }
        }

        ctx.body = {
          code: 200,
          rootDirectoryName
        }
      } catch (e) {
        ctx.response.status = 500
        console.log('url:/web/createDirectory ===>', e)
      }
    }
  },
  {
    url: '/upload',
    async init(ctx) {
      /**
       * @var path 上传了文件夹需要同路径还是并不需要
       */
      const { path = '0', dbInsert = '1' } = ctx.request.body
      const file = ctx.request.files.file
      try {
        const fileType = file.originalFilename.split('.').pop()

        let newFileName = file.originalFilename
        let destinationFilePath
        //创建 日期为今天的目录
        const preservePath = process.join(
          pathUpload,
          dayjs().format('YYYY-MM-DD')
        )
        mkDirectory(preservePath)

        if (path === '0') {
          newFileName =
            file.newFilename + '.' + Date.now().toString() + '.' + fileType
          destinationFilePath = process.join(preservePath, newFileName)
        } else {
          destinationFilePath = process.join(preservePath, path)
        }

        await rename(file.filepath, destinationFilePath)

        if (dbInsert === '1') {
          if (process.env.ACTIVE_DATABASE === 'MYSQL') {
            await ctx.$crud.insert('files', {
              name: file.originalFilename, // 原文件名
              size: file.size, // 文件大小
              type: fileType, // 文件类型
              //   bytepath: file.filepath, // 初始保存地点
              lastModifiedDate: file.lastModifiedDate, // 文件上传时间
              renamefile: newFileName, // 重命名后的文件
              savepath: destinationFilePath // 保存路径
            })
          } else {
            const { db: mongo, client } = await ctx.$mongodb()
            const tableDB = await mongo.collection('files')
            await tableDB.insertOne({
              name: file.originalFilename,
              size: file.size,
              type: fileType,
              //   bytepath: file.filepath,
              lastModifiedDate: file.lastModifiedDate,
              renamefile: newFileName,
              savepath: destinationFilePath
            })
            client.close()
          }
        }

        let url = destinationFilePath.replaceAll(/\\/g, '/')
        url = url.slice(url.indexOf('/uploads') + 8)
        return {
          url,
          name: file.originalFilename
        }
      } catch (error) {
        console.log('url:/upload  ===>', error)
        return (ctx.body = {
          code: 500,
          url: '',
          name: file.originalFilename,
          msg: error.toString()
        })
      }
    }
  }
]
