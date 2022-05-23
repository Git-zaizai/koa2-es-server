import koa from 'koa'
import koacors from 'koa2-cors'
import serve from 'koa-static'
import koabody from 'koa-body'
import koalogger from 'koa-logger'
import { resolve } from 'path'
import { uploads } from './config/path-upload.js'
import query from './db/db.js'
import crud from "./db/crud.js"
import routerSetup from './router'
import useToken from "./hooks/useJwt.js";
import routerUrlToken from './config/url-jwt.js'


export default async function createApp() {
    const create = new koa()

    create.context.$query = query
    create.context.$crud = crud

    create
        .use(
            koacors({
                // 跨域处理
                // 允许携带cookies
                credentials: true,
            }),
        )
        .use(serve(resolve('./public')))
        .use(
            koabody({
                formidable: {
                    //设置存放的是上传二进制文件
                    // uploadDir: path.join(__dirname + '/src/uploads'),
                    uploadDir: uploads,
                    multipart: true,
                },
                multipart: true, // 支持文件上传
            }),
        )
        .use(koalogger())
        .use(useToken(routerUrlToken))

    const router = await routerSetup()
    create.use(router.routes(), router.allowedMethods())

    return { app: create, port: 4370 }
}
