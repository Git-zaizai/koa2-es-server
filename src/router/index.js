/**
 * 路由
 * */
import Router from 'koa-router'
import useResponse from '../use/useResponse.js'
import routeGlob from './routeGlob.js'

const router = new Router()

router.use(useResponse())

export default async () => {
  //自动注册路由
  // await useRouterImport(router, { path: 'controller' })
  const routes = await routeGlob()
  for (const item of routes) {
    router[item.method](item.url, item.fn)
  }
  return router.routes()
}
