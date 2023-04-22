const corsConifg = {
    // 跨域处理
    // 允许携带cookies
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE'],
    origin: function (ctx) {

        return '*'
    },
}

if (process.env.NODE_ENV === 'development') {
    corsConifg.origin = '*'
}

export default corsConifg
