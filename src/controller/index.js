import { upload } from '../utils/upload.js'
import { jwtSign, jwtVerify } from '../utils/jwt.js'

export default [
    {
        routerModule: 'post',
        url: '/web/upload',
        async init(ctx) {
            try {
                const file = ctx.request.files.files
                console.log(file.originalFilename)
                let useuploadret = []
                if (Array.isArray(file)) {
                    for (const fileElement of file) {
                        let useupload = await upload(file)
                        useuploadret.push(useupload)
                    }
                } else {
                    let useupload = await upload(file)
                    useuploadret.push(useupload)
                }

                ctx.body = {
                    code: 1,
                    msg: '上传成功',
                    data: useuploadret,
                }
            } catch (e) {
                console.log('上传错误', e)
            }
        },
    },
    {
        routerModule: 'post',
        url: '/web/jwt',
        init(ctx) {
            let token = {
                zh: ctx.request.body.zh,
                mm: ctx.request.body.mm,
            }
            token = jwtSign(token)

            ctx.body = {
                zh: ctx.request.body.zh,
                mm: ctx.request.body.mm,
                token,
            }
        },
    },
    {
        routerModule: 'post',
        url: '/web/jwt/Verify',
        init(ct) {
            const tokenObject = jwtVerify(ctx.request.body.token)
            ctx.body = {
                code: 200,
                data: tokenObject,
            }
        },
    },
    {
        routerModule: 'get',
        url: '/token',
        init(ctx) {
            ctx.body = {
                code: 200,
                msg: '访问成功',
            }
        },
    },
    {
        routerModule: 'get',
        url: '/usevalue',
        init() {
            return '测试 useBodyValue 中间件'
        }
    }
]
