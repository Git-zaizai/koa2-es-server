/**
 * @function 获取函数
 * @param module Object import()导入的对象
 * */
export function getFunction(module) {
  for (const key in module) {
    if (typeof module[key] === 'function') {
      return module[key]
    }
  }

  throw new Error('Error: 路由函数未定义！')
}

/**
 * @function 判断url是否规范
 * */
export function isUrl(model) {
  const { url } = model.module
  if (!url) {
    return model.file.fileName
  }
  if (/^([/])/.test(url)) {
    return url
  }
  throw Error(`Error: ${url} 不符合规范`)
}

/**
 * @function 判断路由请求方法是否正确
 * @param {['HEAD', 'OPTIONS', 'GET', 'PUT', 'PATCH', 'POST', 'DELETE', 'ALL', 'VERB']} method 请求方法
 * */
export function isMethod(method, defaultMethod) {
  if (!method) {
    return defaultMethod
  }
  const methodfun = ['HEAD', 'OPTIONS', 'GET', 'PUT', 'PATCH', 'POST', 'DELETE', 'ALL', 'VERB']
  if (methodfun.includes(method.toUpperCase())) return method
  throw Error(`Error: ${method} 请方法有问题`)
}

/**
 * @function 对导入的模块进行处理
 * @param model import()导入的模块
 * @param method 默认请求方式
 * */
export function createRoute(model, method) {
  if (typeof model.module === 'function') {
    return {
      url: '/' + model.file.fileName.split('.').shift(),
      method,
      fn: model.module
    }
  }
  const { routerModule } = model.module
  return {
    url: isUrl(model),
    method: isMethod(routerModule, method),
    fn: getFunction(model.module)
  }
}

/**
 * @function 自动导入路由
 *
 */
export default async options => {
  const Options = {
    method: 'post',
    globPath: '../controller',
    ...options
  }

  const modules = await process.glob(import.meta.url, '../controller', {
    isFile: true
  })
  // 处理数据格式
  const routers = []
  for (const iterator of modules) {
    if (Array.isArray(iterator.module.default)) {
      iterator.module.default.forEach(item => {
        routers.push({
          file: { ...iterator.file },
          module: item
        })
      })
    } else {
      iterator.module = iterator.module.default
      routers.push(iterator)
    }
  }
  return routers.map(item => createRoute(item, Options.method))
}
