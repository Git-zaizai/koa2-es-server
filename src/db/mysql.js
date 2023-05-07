import mysql from 'mysql2'
import { MYSQL_CONFIG } from '../config/db-config.js'
//创建连接池
export const MYSQL_NODE = mysql.createPool(MYSQL_CONFIG)

/**
 * @function mysqlTest 测试mysql连接
 * 有问题请在下方输出错误问题
 * */
export async function mysqlTest() {
    const testMySQL = () =>
        new Promise((resolve, reject) => {
            MYSQL_NODE.getConnection(err => {
                if (err) {
                    reject('MySql 连接 ===> 失败')
                    return
                }
                resolve('MySql 连接 ===> 成功')
            })
        })
    try {
        const result = await testMySQL()
        console.log(result)
    } catch (e) {
        console.log('MySql 连接 ===> 失败')
    }
}

export default function query(sql, setup = []) {
    return new Promise((resolve, reject) => {
        MYSQL_NODE.getConnection(function (err, conn) {
            conn.query(sql, setup, function (err, result) {
                if (err) {
                    console.log('query错误', err)
                    conn.destroy() //数据查询失败后归还连接
                    reject(err)
                    return
                }
                resolve(result)
                setTimeout(() => {
                    conn.destroy() //数据查询成功后归还连接
                }, 500)
            })
        })
    })
}
