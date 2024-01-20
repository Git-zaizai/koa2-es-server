import { typeOf } from '../utils/index.js'

export default () => async (ctx, next) => {
  try {
    const result = await next()
    const status = ctx.response.status
    if (status === 404 || status === 200) {
      const body = result ?? ctx.body
      if (!body) {
        return ctx.throw(404, '接口未定义或没有返回值')
      }
      if (
        typeOf(body) === 'String' ||
        typeOf(body) === 'Number' ||
        typeOf(body) === 'Boolean'
      ) {
        ctx.body = { code: 200, data: body, msg: '请求成功' }
        return
      }
      if (Array.isArray(body)) {
        ctx.body = { code: 200, data: body, msg: '请求成功' }
        return
      }

      if (typeOf(body) === 'Object') {
        const { code = 200, msg = '请求成功', ...data } = body
        ctx.body = { code, msg, data: data }
      }
    }
  } catch (error) {
    console.log('\n useResponse log', '\n', error, '\n')
    return Promise.reject(error)
  }
}
