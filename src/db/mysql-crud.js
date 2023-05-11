import query from './mysql.js'

function testingtitleName(titleName) {
    if (typeof titleName !== "string") {
        throw new Error('Error: CRUD错误 titleName 必须是字符串类型')
    }
    if (titleName === '' || titleName === undefined || titleName === null) {
        throw new Error('Error: CRUD错误 请传入 titleName 表名')
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
 * @param titleName{string} 表名
 * */
export const select = async (titleName) => {
    testingtitleName(titleName)
    return await query(`select * from ${titleName}`)
}

/**
 * @function 查询单挑数据或多条数据
 * @param titleName{string} 表名
 * @param where{Object} 条件
 * */
export const selectWhere = async (titleName, where = {}) => {
    const setWhere = testingData(where)
    return await query(`select * from ${titleName} where ?`, [setWhere])
}

/**
 * @function insert 添加
 * @param titleName{string} 表名
 * @param data{object} 数据
 * */
export const insert = async (titleName, data = {}) => {
    const setdata = testingData(data);
    return await query(`insert into ${titleName} set ?`, [setdata])
}

/**
 * @function update 修改
 * @param titleName{string} 表名
 * @param data{object} 数据
 * @param where{Object} 条件
 * */
export const update = async (titleName, data, where) => {
    const setdata = testingData(data);
    const setWhere = testingData(where)
    return await query(`update ${titleName} set ? where ?`, [setdata, setWhere])
}

/**
 * @function del 删除
 * @param titleName{string} 表名
 * @param where{Object} 条件
 * */
export const del = async (titleName, where = {}) => {
    const setWhere = testingData(where)
    return await query(`delete from ${titleName} where ?`, [setWhere])
}
/**
 * @export {select:查整个表,selectWhere:查询单挑数据,insert:添加,update:修改,del:删除}
 * */
export default {select, selectWhere, insert, update, del}
