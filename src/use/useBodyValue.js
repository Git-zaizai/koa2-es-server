import { typeOf } from '../utils/index.js'

export default () => async (ctx, next) => {
	const result = await next()
	if (ctx.response.status === 200) {
		const body = result ?? ctx.body
		if (!body || body === '') {
			ctx.body = { code: 200, data: [], msg: '请求成功' }
			return await next()
		}
		if (typeOf(body) === 'String' || typeOf(body) === 'Number' || typeOf(body) === 'Boolean') {
			ctx.body = { code: 200, data: body, msg: '请求成功' }
			return await next()
		}
		if (Array.isArray(body)) {
			ctx.body = { code: 200, data: body, msg: '请求成功' }
			return await next()
		}

		if (typeOf(body) === 'Object') {
			const { code, data, msg } = body
			let resultData = data
			if (!data || data === '') {
				resultData = []
			}
			ctx.body = {
				code: code ?? 200,
				data: resultData,
				msg: msg ?? '请求成功',
			}
		}
	}
}
