export default [
    {
        routerModule: 'post',
        url: '/sql/crud',
        async selectinit(ctx) {
            try {
                let result = null
                let body = {
                    code: '200',
                    msg: '查询成功',
                    data: null
                }
                const { crudtyle } = ctx.request.body

                if (crudtyle === 0) {
                    result = await ctx.$crud.select('user')
                    body.data = result
                }

                if (crudtyle === 1) {
                    const { selectWhere } = ctx.request.body
                    result = await ctx.$crud.selectWhere('user', selectWhere)
                    body.data = result
                }

                if (crudtyle === 2) {
                    const { update } = ctx.request.body
                    const where = { id: update.id }
                    const data = {
                        zh: update.zh,
                        mm: update.mm,
                        name: update.name
                    }
                    result = await ctx.$crud.update('user', data, where)
                    body.data = result
                    body.msg = '修改成功'
                }

                if (crudtyle === 3) {
                    const { add } = ctx.request.body
                    await ctx.$crud.insert('user', add)
                    //自定义sql语句
                    result = await ctx.$query(`select * from user order by id desc limit 1`)
                    body.data = result
                    body.msg = '添加成功'
                }

                if (crudtyle === 4) {
                    result = await ctx.$crud.del('user', { id: ctx.request.body.del })
                    body.data = result
                    body.msg = '删除成功'
                }

                ctx.body = body
            } catch (e) {
                console.log(e)
            }
        }
    }
]