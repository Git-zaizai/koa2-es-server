import { typeOf } from '../utils/index.js'

export default () => async (ctx, next) => {
    const result = await next()
    const status = ctx.response.status
    if (status === 404 || status === 200) {
        const body = result ?? ctx.body
        if (!body) {
            ctx.body = '接口未定义或没有返回值'
            return
        }

        if (body === '') {
            return ctx.body = { code: 200, data: [], msg: '请求成功' }
        }

        if (typeOf(body) === 'String' || typeOf(body) === 'Number' || typeOf(body) === 'Boolean') {
            ctx.body = { code: 200, data: body, msg: '请求成功' }
            return
        }
        if (Array.isArray(body)) {
            ctx.body = { code: 200, data: body, msg: '请求成功' }
            return
        }
        console.log('useBody')
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
