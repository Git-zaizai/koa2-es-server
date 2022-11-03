import { readdirSync, statSync } from "fs";
import { join, resolve } from "path";
import { pathToFileURL } from "url";

/**
 * @function 获取函数
 * @param module Object import()导入的对象
 * */
export function getFunction (module) {
		for (const key in module) {
				if (typeof module[key] === 'function') {
						return module[key];
				}
		}
		throw new Error('Error: 路由函数未定义！')
}

/**
 * @function 判断url是否规范
 * @param url 路由url
 * */
export function isurl (url) {
		return url && url !== '' && /^([/])/.test(url);

}

/**
 * @function 获取文件名
 * @param filepath 文件路径
 * */
function geturl (filepath) {
		return '/' + filepath.split('\\').pop().split('.').shift()
}

/**
 * @function 判断路由请求方法是否正确
 * @param method 请求方法
 * */
export function ismethod (method) {
		if (method && method !== '') {
				const methodfun = ['HEAD', 'OPTIONS', 'GET', 'PUT', 'PATCH', 'POST', 'DELETE','ALL','VERB']
				if (methodfun.includes(method.toUpperCase())) return true
		}
		return false
}

/**
 * @function 对导入的模块进行处理
 * @param defaultmodule import()导入的模块
 * @param defaultmethod 请求方法
 * @param filepath 文件路径
 * */
export function routersPush (defaultmodule, defaultmethod, filepath) {
		const routeList = []
		// 导出的是函数的话，使用默认请求配置，文件名为url路径
		if (typeof defaultmodule === 'function') {
				routeList.push({
						method: defaultmethod,
						url: geturl(filepath),
						fun: defaultmodule
				})
		} else if (Array.isArray(defaultmodule)) {
				defaultmodule.forEach(item => {
						if (isurl(item.url)) {
								routeList.push({
										url: item.url,
										method: ismethod(item.routerModule) ? item.routerModule : defaultmethod,
										fun: getFunction(item)
								})
						} else {
								throw new Error('Error: 路由 method 属性错误！')
						}
				})
		} else {
				//导出格式为Object 判断url有问题，就是使用文件路径做url
				if (!isurl(defaultmodule.url)) {
						defaultmodule.url = geturl(filepath)
				}
				routeList.push({
						url: defaultmodule.url,
						method: ismethod(defaultmodule.routerModule) ? defaultmodule.routerModule : defaultmethod,
						fun: getFunction(defaultmodule)
				})
		}
		return routeList
}

/**
 * @function 自动添加路由
 * @param route koa-router的实例
 * @param opts Object {
 *     path:默认自动导入路径
 *     defaultRequestmethod:默认请求方式
 * }
 * */
export const useRouterImport = async (route, opts) => {
		const middleware = Object.assign({
				path: 'controller',
				defaultRequestmethod: 'post'
		}, opts)
		const pathresolve = resolve('src', middleware.path)
		for (const fileitem of readdirSync(pathresolve)) {
				const fileItemPaht = join(pathresolve, fileitem)
				if (statSync(fileItemPaht).isDirectory()) {
						useRouterImport(fileItemPaht)
				} else {
						// pathToFileURL(fileItemPaht) 把绝对路径转换为 file:///c:/***** 路径
						const itemModule = await import(
							pathToFileURL(fileItemPaht).href)
						if (itemModule.default) { // 判断有没有默认导出
								const routelist = routersPush(
									itemModule.default,
									middleware.defaultRequestmethod,
									fileItemPaht)
								routelist.forEach(item => {
										route[item.method](item.url, item.fun)
								})
						}
				}
		}
}
