import mysql from 'mysql2'
import { MYSQL_CONFIG } from '../config/db-config.js'
//创建连接池
export const MYSQL_NODE = mysql.createPool(MYSQL_CONFIG)

export default function query(sql, setup = []) {
	return new Promise((resolve, reject) => {
		MYSQL_NODE.getConnection(function (Connectionerr, conn) {
			conn.query(sql, setup, function (err, result) {
				if (err) {
					console.log('query错误', err)
					conn.release() //数据查询失败后归还连接
					reject(err)
					return
				}
				resolve(result)
				setTimeout(() => {
					conn.release() //数据查询成功后归还连接
				}, 500)
			})
		})
	})
}
