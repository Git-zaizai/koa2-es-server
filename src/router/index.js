/**
 * 路由
 * */
import koarouter from 'koa-router'
import { useRouters } from "../hooks/useRouterImport.js"

const router = new koarouter()

/**
 * @function 自动注册路由
 * */
useRouters(router, 'controller')

router.get('/get', ctx => {
    ctx.body = { code: 1, msg: '请求成功', data: '这个是测试路由' }
})
export default router
