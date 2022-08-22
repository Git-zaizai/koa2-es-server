/**
 * 路由
 * */
import koarouter from 'koa-router'
import { useRouterImport } from "../hooks/useRouterImport.js"

const router = new koarouter()

router.get('/get', ctx => {
    ctx.body = { code: 1, msg: '请求成功', data: '这个是测试路由' }
})

export default async () => {
    // const routeImport = new koarouter()
    //自动注册路由
    await useRouterImport(router, { path: 'controller' })
    // router.use(routeImport.routes(), routeImport.allowedMethods())
    return router
}
