import {jwtVerify} from '../utils/jwt.js'

/*
*@function token令牌检测中间件
*@param urlRoutrlist:Array  传入需要检测的路由数组
* **/
export default (urlRoutrlist = []) => async (ctx, next) => {
    if (urlRoutrlist.length === 0) return next();
    for (let i = 0, routeleng = urlRoutrlist.length; i < routeleng; i++) {
        const route = new RegExp(`^${urlRoutrlist[i]}`)
        if (route.test(ctx.request.url)) {
            if (ctx.request.headers.token === undefined || ctx.request.headers.token === '' || ctx.request.headers === null) {
                ctx.response.status = 401
                console.log('useToken中间件 ===> 该用户令牌为空');
                return await next()
            }
            try {
                ctx.token = jwtVerify(ctx.request.headers.token)
            } catch (e) {
                ctx.response.status = 401;
                console.log('useToken中间件 ===> 解析token错误', e);
                return await next();
            }
        }
    }
    return await next();
};