import query from './mysql.js'

function testingTltieName(tltiename) {
    if (typeof tltiename !== "string") {
        throw new Error('Error: CRUD错误 tltiename 必须是字符串类型')
    }
    if (tltiename === '' || tltiename === undefined || tltiename === null) {
        throw new Error('Error: CRUD错误 请传入 tltiename 表名')
    }
}

function testingData(data) {
    if (typeof data !== 'object' || Array.isArray(data)) {
        throw new Error('Error: CRUD错误 实参必须是object类型')
    }
    return data
}

/**
 * @function select 查整个表
 * @param tltiename:string 表名
 * */
export const select = async (tltiename) => {
    testingTltieName(tltiename)
    return await query(`select * from ${tltiename}`)
}

/**
 * @function 查询单挑数据或多条数据
 * @param where:Object 条件
 * */
export const selectWhere = async (tltiename, where = {}) => {
    const setWhere = testingData(where)
    return await query(`select * from ${tltiename} where ?`, [setWhere])
}

/**
 * @function 添加
 * @param data:object 数据
 * */
export const insert = async (tltiename, data = {}) => {
    const setdata = testingData(data);
    return await query(`insert into ${tltiename} set ?`, [setdata])
}

/**
 * @function 修改
 * @param data:object 数据
 * @param where:Object 条件
 * */
export const update = async (tltiename, data, where) => {
    const setdata = testingData(data);
    const setWhere = testingData(where)
    return await query(`update ${tltiename} set ? where ?`, [setdata, setWhere])
}

/**
 * @function 删除
 * @param where:Object 条件
 * */
export const del = async (tltiename, where = {}) => {
    const setWhere = testingData(where)
    return await query(`delete from ${tltiename} where ?`, [setWhere])
}
/**
 * @export {select:查整个表,selectWhere:查询单挑数据,insert:添加,update:修改,del:删除}
 * */
export default {select, selectWhere, insert, update, del}
