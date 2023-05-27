/**
 * @function crud 增删改查接口
 * @var url  /curd/执行方法/表名
 * 执行方法: select, selectWhere, insert, update, del
 * 表名: 数据库表名
 * */
import { stringToType } from '../utils/index.js'
import { ObjectId } from 'mongodb'

export default [
    {
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
    },
    {
        routerModule: 'all',
        url: '/curd-mongo/:action/:tableName',
        async init(ctx, next) {
            try {
                let body = null
                if (ctx.request.method === 'GET' || ctx.request.method === 'DELETE') {
                    body = stringToType(ctx.request.query)
                } else if (ctx.request.method === 'POST') {
                    body = ctx.request.body
                } else {
                    ctx.response.status = 400
                    ctx.body = '获取不到参数，请使用 GET、POST、DELETE 方式请求！'
                    return
                }

                const { data, where, ops } = body
                const { db } = await ctx.$mongodb()
                const tableDB = db.collection(ctx.params.tableName)
                let result = null

                switch (ctx.params.action) {
                    case 'add':
                        if (Array.from(data)) {
                            result = await tableDB.insertMany(data)
                        } else {
                            result = await tableDB.insertOne(data)
                        }
                        break
                    case 'del':
                        if (ops?.many) {
                            result = await tableDB.deleteMany(data)
                        } else {
                            result = await tableDB.deleteOne(data)
                        }
                        break
                    case 'update':
                        if (ops?.many) {
                            result = await tableDB.updateMany(where, data)
                        } else {
                            result = await tableDB.updateOne(where, data)
                        }
                        break
                    case 'find':
                        if (where['_id']){
                            where['_id'] = new ObjectId(where['_id'])
                        }
                        if (ops?.many){
                            result = await tableDB.find(where).toArray()
                        }else {
                            result = await tableDB.findOne(where)
                            console.log(result)
                        }
                        break
                    default:
                        ctx.response.status = 400
                        result = 'CRUD操作方式错误，请使用 add, del, update, find方法'
                        break
                }

                return ctx.body = result
            } catch (e) {
                ctx.response.status = 500
                ctx.body = `未知错误 错误信息：${ e }`
            }
        }
    },
]
