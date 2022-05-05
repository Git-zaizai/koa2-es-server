import mysql from 'mysql2'

const db = mysql.createPool({
    //创建连接池
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '123456',
    database: 'gitconfigzaizai', //数据库名称
    connectionLimit: 10, //连接池大小
});

export default function query(sql, setup = []) {
    return new Promise((resolve, reject) => {
        db.getConnection(function (Connectionerr, conn) {
            conn.query(sql, setup, function (err, result) {
                if (err) {
                    console.log('query错误', err);
                    conn.release(); //数据查询失败后归还连接
                    reject(err);
                    return;
                }
                resolve(result);
                setTimeout(() => {
                    conn.release(); //数据查询成功后归还连接
                }, 500);
            });
        });
    });
}
