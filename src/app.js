import Koa from 'koa'
import KoaCors from '@koa/cors'
import serve from 'koa-static'
import { koaBody } from 'koa-body'
import koalogger from 'koa-logger'
import { uploads, staticPath } from './config/config.js'
import query, { mysqlTest } from './db/mysql.js'
import mongodb, { mongodbTest } from './db/mongodb.js'
import crud from './db/mysql-crud.js'
import routerSetup from './router/index.js'
import useToken from './use/useJwt.js'
import routerUrlToken from './config/url-jwt.js'
import corsConfig from './config/cors-conifg.js'

export default async function createApp() {
    const createApp = new Koa()

    createApp.context.$query = query
    createApp.context.$crud = crud
    createApp.context.$mongodb = mongodb

    createApp
        .use(KoaCors(corsConfig))
        .use(serve(staticPath))
        .use(
            koaBody({
                formidable: {
                    maxFieldsSize: 1024 * 1024 * 200,
                    uploadDir: uploads,
                },
                multipart: true,
            })
        )
        .use(koalogger())
        .use(useToken(routerUrlToken, false))

    const router = await routerSetup()
    createApp.use(router.routes(), router.allowedMethods())

    await mysqlTest()
    await mongodbTest()

    return { app: createApp, port: 4370 }
}
