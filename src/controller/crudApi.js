/**
 * @function crud 增删改查接口
 * @var url  /curd/执行方法/表名
 * 执行方法: select, selectWhere, insert, update, del
 * 表名: 数据库表名
 * */
import { stringToType } from '../utils/index.js'

export default {
    routerModule: 'all',
    url: '/crud/:action/:tableName',
    async init(ctx) {
        let data = null
        if (ctx.request.method === 'GET' || ctx.request.method === 'DELETE') {
            data = stringToType(ctx.request.query)
        } else if (ctx.request.method === 'POST') {
            data = ctx.request.body
        } else {
            ctx.response.status = 400
            ctx.body = '获取不到参数，请使用 GET、POST、DELETE 方式请求！'
            return ctx
        }
        let result = null

        try {
            switch (ctx.params.action) {
                case 'select':
                    result = await ctx.$crud.select(ctx.params.tableName)
                    break
                case 'selectWhere':
                    result = await ctx.$crud.selectWhere(ctx.params.tableName, data.where ?? data)
                    break
                case 'insert':
                    result = await ctx.$crud.insert(ctx.params.tableName, data)
                    break
                case 'update':
                    if (!data.where) {
                        ctx.body = 'where参数错误'
                        ctx.response.status = 401
                        return ctx
                    }
                    const where = data.where
                    delete data.where
                    result = await ctx.$crud.update(ctx.params.tableName, data, where)
                    break
                case 'del':
                    result = await ctx.$crud.del(ctx.params.tableName, data.where ?? data)
                    break
                default:
                    ctx.response.status = 400
                    result = 'CRUD操作方式错误，请使用 select, selectWhere, insert, update, del 方法'
            }
            ctx.body = result
        } catch (e) {
            ctx.response.status = 500
            ctx.body = `未知错误 错误信息：${ e }`
        }
    },
}
