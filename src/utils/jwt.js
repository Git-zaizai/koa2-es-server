/**
 * 有些包是使用 CommonJS，没有进行 ES 的兼容，只能是默认导入
 * 因为nodejs会自动兼容模块化，所以只能默认导入，
 * 当某个包兼容 ES 的时候可以使用 ES 模块的全部功能,
 * 反之只能默认导入，要解构只能在后面解构
 *
 * import jsonwebtoken from 'jsonwebtoken'
 * const {sign,verify} = jsonwebtoken
 * */
import jsonwebtoken from 'jsonwebtoken'
import { cert } from '../config/config.js'

/*
 *
 * algorithm:加密算法 默认同步签名 （HMAC SHA256）
 * expiresIn：过期时间
 * notBefore:在什么时候签发的(UNIX时间)，是否使用是可选的；
 * audience: 观众 接收该JWT的一方，是否使用是可选的；
 * issuer:该JWT的签发者，是否使用是可选的；
 * jwtid: 给jwt一个id
 * subject:主题
 * noTimestamp :没有时间戳
 * header: 自定义头部
 * keyid: 自行理解
 * */
export function jwtSign(data = '', opts) {
    const options = opts || {
        algorithm: 'HS384',
        expiresIn: '72h',
        issuer: 'zaizai'
    }
    return jsonwebtoken.sign(data, cert, options)
}

export function jwtVerify(token) {
    try {
        return jsonwebtoken.verify(token, cert, {
            issuer: 'zaizai',
            algorithms: ['HS384'],
        })
    } catch (e) {
        return {
            code: 500,
            message: error.message,
        };
    }
}
