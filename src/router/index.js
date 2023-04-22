/**
 * 路由
 * */
import Router from 'koa-router'
import { useRouterImport } from "../use/useRouterImport.js"
import useBodyValue from '../use/useBodyValue.js'

const router = new Router()

router.use(useBodyValue())

router.get('/get', ctx => {
    return '测试路由'
})

export default async () => {
    //自动注册路由
    await useRouterImport(router, { path: 'controller' })
    return router
}
