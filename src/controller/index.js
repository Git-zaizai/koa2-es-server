import { jwtSign, jwtVerify } from '../utils/jwt.js'

export default [
  {
    routerModule: 'post',
    url: '/web/jwt',
    init(ctx) {
      let token = {
        zh: ctx.request.body.zh,
        mm: ctx.request.body.mm
      }
      token = jwtSign(token)

      ctx.body = {
        zh: ctx.request.body.zh,
        mm: ctx.request.body.mm,
        token
      }
    }
  },
  {
    routerModule: 'post',
    url: '/web/jwt/Verify',
    init(ct) {
      const tokenObject = jwtVerify(ctx.request.body.token)
      ctx.body = {
        code: 200,
        data: tokenObject
      }
    }
  },
  {
    routerModule: 'get',
    url: '/token',
    init(ctx) {
      return (ctx.body = {
        code: 200,
        msg: '访问成功'
      })
    }
  }
]
