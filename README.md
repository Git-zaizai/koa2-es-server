# koa 2x text-cli

前言：一个基于koa.js 2x的简单后端api脚手架 O(∩_∩)O。这个小工具可以用来学习交流或者简单的搞一下后端，不推荐使用正式的项目，问题有很多请注意哦 ！

由于是使用ES模块规范，没有使用CommonJS 规范，也没有使用babel进行兼容有些地方请去官网了解（大部分都可以使用）



## Getting Start

```
git clone https://github.com/17koa/koa2-startkit.git
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
	├──controller # api编写目录 会自动导入自动注册路由 *有一定的规范*
		├──index.js # 一些示例
		├──sql.js # 数据库操作示例
	├──db
		├──db.js # 链接数据库
		├──crud.js # 简单的对crud的封装
	├──hooks # 中间件或hooks函数
		├──useJwt.js # 路由Jwt认证中间件
		├──useUpload.js # 文件上传hooks函数
	├──router # 路由
		├──index.js
	├──types # 一些声明
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
   "koa-router": "^10.1.1",
   "koa-static": "^5.0.0",
   "koa2-cors": "^2.0.6",
   "mysql2": "^2.3.3",
   "nodemon": "^2.0.15"
}
```