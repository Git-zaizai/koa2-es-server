import koa from 'koa'
import koacors from 'koa2-cors'
import serve from 'koa-static'
import koabody from 'koa-body'
import koalogger from 'koa-logger'
import {resolve} from 'path'

import {uploads} from './src/config/path-upload.js'
import query from './src/db/config.js'
import crud from "./src/db/crud.js"
import router from './src/router/index.js'
import useToken from "./src/hooks/useToken.js";
import urlToken from './src/config/url-token.js'

// import currentpath from './src/types/currentpath.js'

const app = new koa()
const port = 4370
// const {__dirname} = currentpath(import.meta.url)

app.context.$query = query
app.context.$crud = crud


app
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
    .use(useToken(urlToken))
    .use(router.routes(), router.allowedMethods())

// 启动
app.listen(port, () => {
    console.log('服务启动成功！')
    console.log('Server is running at http://localhost:' + port)
})



