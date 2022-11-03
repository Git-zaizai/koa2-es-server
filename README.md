# koa 2x text-cli

## 前言

一个基于koa.js 2x的简单后端api脚手架 O(∩_∩)O。这个小工具可以用来学习交流或者简单的搞一下后端，不推荐使用正式的项目，问题有很多请注意哦 ！

由于是使用ES模块规范，没有使用CommonJS 规范，也没有使用babel进行兼容有些地方请去官网了解（大部分都可以使用）

麻雀虽小，但是能用，是非常适合新手学习，在其中也写了几个示例可以借用玩一玩，也可以在修改玩玩

**变通**，乃开发者应具备的不二神器。

## 本地启动

```
git clone https://github.com/Git-zaizai/koa-cli-test.git
git clone https://github.91chi.fun/https://github.com/Git-zaizai/koa-cli-test.git  加速通道
cd koa-cli-test
yarn
yran mon  自动热重启服务 | node app.js
```

然后使用浏览器打开 http://localhost:4370 即可

## 目录结构说明

```bash
.
├──public # 资源文件夹
	├──img # 都懂
    ├──uploads # 文件上传保存路径
    ├──uploads_file # 上传二进制文件
    ├──index.html # 用例页面
├──src
	├──config
		├──Cert-jwt.js # jwt秘配置
		├──mysql-config.js # mysql配置
		├──path-upload.js # 对于文件上传的配置
		├──url-jwt.js # Jwt路由认证配置
	├──controller # api编写目录 可以自动导入自动注册路由 *有一定的规范*
		├──index.js # 一些示例
		├──sql.js # 数据库操作示例
	├──db
		├──db.js # 链接数据库
		├──crud.js # 简单的对crud的封装
	├──hooks # 中间件或hooks函数
		├──useJwt.js # 路由Jwt认证中间件
		├──useUpload.js # 文件上传hooks函数
		├──useRouterImport.js # 自动导入注册路由函数
	├──router # 路由
		├──index.js
	├──types
		├──currentpath.js # 声明 __filename | __dirname
	├──utils
		├──axios # axios
			├──axios.js 
		├──jwt.js # jwt解密与解密函数
├──.gitignore 
├──app.js 入口文件
├──package.json
├──package-lock.json
├──README.md
```

## 引入的插件

```json
"dependencies": {
  "axios": "^0.26.1",
  "jsonwebtoken": "^8.5.1",
  "koa": "^2.13.4",
  "koa-body": "^4.2.0",
  "koa-logger": "^3.2.1",
  "koa-router": "^12.0.0",
  "koa-static": "^5.0.0",
  "koa2-cors": "^2.0.6",
  "mysql2": "^2.3.3",
  "nodemon": "^2.0.15"
}
```

## 自动注册路由

#### 使用

```javascript
// router.js
import koarouter from 'koa-router'
import { useRouterImport } from "../hooks/useRouterImport.js"
const router = new koarouter()
export default async () => {
    //自动注册路由
    //path 要自动导入的目录名
    await useRouterImport(router, { path: 'controller' })
    return router
}

// app.js
const router = routerSetup()
app.use(router.routes(), router.allowedMethods())
```

#### useRouterImport 参数

``` javascript
(
    router: koarouter的实例
    opts：{  可选参数
    	path：自动导入的目录名
    	defaultRequestmethod: 'post' 默认接口的请求方式
	}
)
```

#### 可以导出的格式

```javascript
export default function(){}

export default {
    url:'', // 可选
    method:'', // 可选
    fun(){} // 必须
}

export default[{
    url:'', //必须
    method:'', // 可选
    fun(){} // 必须
},{
    url:'', // 必须
    method:'', // 可选
    fun(){} // 必须
}]
```

当导出函数时，**url路径为文件名**,**method默认为post**，导出对象时**不写url或者url开头不是 "/"，url默认为文件名**，以数组的方式导出**url是必须的**，暂不支持添加url ,当然你也可以自行注册路由api



## 版本

#### 1.0 正在更新 （⊙ꇴ⊙）

目前就是慢慢加的东西，主要还是学习这个目的为主，并不是正式的东西，所以慢慢加。

文档也一样边做边写

## 最后

在这个过程中，会遇到各种各样的问题。但是正是这些问题，会让我们成长，也认识到自己的微不足道，同时也鞭策着我们不断前行，愈战愈勇。

这个是我第一次写一个后端应用脚手架，所以难免程序中，会存在一些瑕疵，望包含。同时如果有一些疑惑点或者是建议，可以提`issue`。

如果这个东西，给你启示或是成长，请为我点亮一颗小星星
