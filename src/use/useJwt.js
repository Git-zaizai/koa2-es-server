import { jwtVerify } from '../utils/jwt.js'

/**
 * @param urlList{Array<string>} 转入不需要检测的路由
 * @param isOpen{boolean} 判断是否开启JWT中间件
 * */
export default (urlList = [], isOpen = true) => async (ctx, next) => {
    if (!isOpen) {
        return await next()
    }
    if (urlList.length <= 0) {
        ctx.response.status = 401
        ctx.body = '请登录，获取令牌'
        return
    }
    let isurl = false
    for (let i = 0, len = urlList.length; i < len; i++) {
        const reg = new RegExp(urlList[i])
        if (reg.test(ctx.request.url)) {
            isurl = true
            break
        }
    }
    // 判断为true就是在不需要检测的路由里面
    if (isurl) return await next()
    // 判断token 存在
    if (
        ctx.request.headers.token === undefined ||
        ctx.request.headers.token === '' ||
        ctx.request.headers.token === 'null'
    ) {
        ctx.response.status = 401
        ctx.body = '请登录，获取令牌'
        return
    }
    try {
        ctx.token = jwtVerify(ctx.request.headers.token)
        return await next()
    } catch (e) {
        console.log('useJwt 错误: ================>', e)
        if (e.message.includes('jwt expired')) {
            ctx.body = '令牌已过期，请重新登录'
        } else {
            ctx.body = '解析token失败，请合法使用互联网，请重新登录'
        }
        ctx.response.status = 401
    }
}
