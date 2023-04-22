/**
 * @export {
 *     user: 数据库用户
 *     password:密码
 *     database:数据库名称
 *     connectionLimit:连接池大小
 * }
 * */
export const MYSQL_CONFIG = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '123456',
    database: 'koa2',
    connectionLimit: 10
}
/**
 * @export MONGDB_CONFIG MongoDB链接URL
 * */
export const MONGDB_CONFIG = {
    url: 'mongodb://localhost:27017/test'
}
