const corsConifg = {
		// 跨域处理
		// 允许携带cookies
		credentials: true,
		allowMethods: ['GET', 'POST', 'DELETE'],
		// origin:"*", // 允许来所有请求
		// origin: "http://localhost:4370",
		origin: function (ctx) {
				const whiteList = ['http://localhost:1399']; //可跨域白名单
				let { host, referer } = ctx.header
				if (typeof referer !== 'undefined') {
						const urllist = referer.split('/').splice(0, 3)
						urllist[1] = '//'
						const url = urllist.join('')
						if (whiteList.includes(url)) {
								return url //注意，这里域名末尾不能带/，否则不成功，所以在之前我把/通过substr干掉了
						}
				} else {
						if (whiteList.includes(host)) {
								return host //注意，这里域名末尾不能带/，否则不成功，所以在之前我把/通过substr干掉了
						}
				}
				return true
		},
}

if (process.env.NODE_ENV === 'development') {
		corsConifg.origin = '*'
}

export default corsConifg
