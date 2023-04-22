# koa 2x text-cli

## 前言

一个基于koa.js 2x的简单后端api脚手架 O(∩_∩)
O。这个小工具可以用来学习交流或者简单的搞一下后端，不推荐使用正式的项目，问题有很多请注意哦 ！

由于是使用ES模块规范，没有使用CommonJS 规范，也没有使用babel进行兼容有些地方请去官网了解（大部分都可以使用）

麻雀虽小，但是能用，是非常适合新手学习，在其中也写了几个示例可以借用玩一玩，也可以在修改玩玩

**变通**，乃开发者应具备的不二神器。

## 本地启动

```
git clone https://github.com/Git-zaizai/koa-cli-test.git
cd koa-cli-test
yarn
yran mon 热重启服务 | node app.js
```

然后使用浏览器打开 http://localhost:4370 即可

## 目录结构说明

```bash
|-- public
|   |-- img # 图片上传保存路径
|   |-- index.html
|   |-- uploads # 文件上传保存保存路径
|    `-- uploads_file # 文件上传二进制文件
|-- src
|   |               
|   |-- config
|   |   |-- config.js # 各种配置
|   |   |-- cors-conifg.js # 跨域配置
|   |   |-- db-config.js # 数据库配置
|   |    `-- url-jwt.js # Jwt路由认证管理
|   |-- controller
|   |   |-- crudApi.js # MySQL CRUD接口
|   |   |-- exportFun.js # 一些示例
|   |   |-- index.js # 一些示例
|   |    `-- sql.js # 数据库操作示例
|   |-- db
|   |   |-- mongodb.js # mongodb连接
|   |   |-- mysql-crud.js # 简单的对mysql crud的封装
|   |   `-- mysql.js # 连接mysql
|   |-- router
|   |   `-- index.js # 路由
|   |-- types
|   |   `-- currentpath.js # 声明 __filename | __dirname
|   |-- use # 中间件
|   |   |-- useBodyValue.js # 统一返回值
|   |   |-- useJwt.js # 路由Jwt认证中间件
|   |   |-- useRouterImport.js # 自动导入注册路由函数
|   |   `-- useUpload.js # 文件上传hooks函数
|   `-- utils
|   |   |-- axios
|   |   |   `-- axios.js
|   |   |-- index.js # 一下utils函数
|   |   `-- jwt.js  # jwt解密与解密函数
|   `-- app.js
|-- koa2.sql
|-- main.js # 入口文件
|-- nodemon.json # nodemon热启动配置文件
|-- package.json
|-- pnpm-lock.yaml
|-- README.md
```

## 引入的插件

```json
"dependencies": {
    "@koa/cors": "^4.0.0",
    "axios": "^0.26.1",
    "jsonwebtoken": "9.0.0",
    "koa": "^2.13.4",
    "koa-body": "^6.0.1",
    "koa-logger": "^3.2.1",
    "koa-router": "^12.0.0",
    "koa-static": "^5.0.0",
    "mongodb": "^4.11.0",
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
    //path 要自动导入的目录名 scr目录下
    await useRouterImport(router, { path: 'controller' })
    return router
}

// app.js
const router = await routerSetup()
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

当导出函数时，
**url路径为文件名**,**method默认为post**，
导出对象时**不写url或者url开头不是 "/"，
url默认为文件名**，以数组的方式导出
**url是必须的**，暂不支持添加url ,当然你也可以自行注册路由api

```javascript
export default function () {}

export default {
    url: '', // 可选
    method: '', // 可选
    fun() {} // 必须
}

export default [{
    url: '', //必须
    method: '', // 可选
    fun() {} // 必须
}, {
    url: '', // 必须
    method: '', // 可选
    fun() {} // 必须
}]
```

#### 统一返回值 useBodyValue.js

在router/index.js文件中，它注册在router中
注意事项：**默认只有在返回正常（ctx.response.stuts === 200）才会进行处理**，其他问题不进行处理
额，你想处理也可以重写或者改了它，反正很简单

``` javascript
// 默认的统一返回值
{ code: 200, data: body, msg: '请求成功' }
/** 用法： **/
// 可以 return 回去 任意类型
router.get('/get', ctx => {
    return '测试路由'
})

// 也可以正常的使用ctx.body的方式
router.get('/get', ctx => {
    ctx.body = 'null O(∩_∩)O 哦'
})

// 返回值是基础类型时（不包括 null、undefined、''） 自动放在data中
return String | Number | Boolean | Array

// 当然如果返回的对象，会经过下面的处理方式，
if (typeOf(body) === 'Object') {
    const { code, data, msg } = body
    let resultData = null
    if (!data || data === '') {
        resultData = []
    }
    ctx.body = {
        code: code ?? 200,
        data: resultData,
        msg: msg ?? '请求成功'
    }
}
```

## 版本

#### 1.5 正在更新 （⊙ꇴ⊙）

目前就是慢慢加的东西，主要还是学习这个目的为主，并不是正式的东西，所以慢慢加。

文档也一样边做边写

## 最后

在这个过程中，会遇到各种各样的问题。但是正是这些问题，会让我们成长，也认识到自己的微不足道，同时也鞭策着我们不断前行，愈战愈勇。

这个是我第一次写一个后端应用脚手架，所以难免程序中，会存在一些瑕疵，望包含。同时如果有一些疑惑点或者是建议，可以提`issue`。

如果这个东西，给你启示或是成长，请为我点亮一颗小星星
