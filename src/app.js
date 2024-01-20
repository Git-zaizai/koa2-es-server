import './env.js'
import Koa from 'koa'
import KoaCors from '@koa/cors'
import serve from 'koa-static'
import { koaBody } from 'koa-body'
import keylogger from 'koa-logger'
import { uploads, staticPath } from './config/config.js'
import query, { mysqlTest } from './db/mysql.js'
import mongodb, { mongodbText } from './db/mongodb.js'
import crud from './db/mysql-crud.js'
import createRouter from './router/index.js'
import useToken from './use/useJwt.js'
import routerUrlToken from './config/url-jwt.js'
import corsConifg from './config/cors-conifg.js'

export default async function createApp() {
  const createApp = new Koa()

  createApp.context.$query = query
  createApp.context.$crud = crud
  createApp.context.$mongodb = mongodb

  createApp
    .use(KoaCors(corsConifg))
    .use(serve(staticPath))
    .use(
      koaBody({
        formidable: {
          maxFieldsSize: 1024 * 1024 * 150,
          uploadDir: uploads
        },
        multipart: true
      })
    )
    .use(keylogger())
    .use(useToken(routerUrlToken, false))
    .use(await createRouter())

  // 暂时关闭数据库测试
  // await mysqlTest()
  // await mongodbText()

  return { app: createApp, port: 4399 }
}
