import { typeOf } from '../utils/index.js'

export default () => async (ctx, next) => {
    const result = await next()
    if (ctx.response.status === 404) {
        const body = result ?? ctx.body
        if (!body || body === '') {
            // ctx.body = { code: 200, data: [], msg: '请求成功' }
            ctx.response.status = 404
            ctx.body = '接口未定义或没有返回值'
            return
        }
        if (typeOf(body) === 'String' || typeOf(body) === 'Number' || typeOf(body) === 'Boolean') {
            ctx.body = { code: 200, data: body, msg: '请求成功' }
            return
        }
        if (Array.isArray(body)) {
            ctx.body = { code: 200, data: body, msg: '请求成功' }
            return
        }

        if (typeOf(body) === 'Object') {
            const { code, data, msg } = body
            ctx.body = {
                code: code ?? 200,
                data: data ?? body,
                msg: msg ?? '请求成功',
            }
        }
    }
}
