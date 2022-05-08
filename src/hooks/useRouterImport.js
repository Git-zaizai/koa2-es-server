import { readdirSync, statSync } from "fs";
import { join, resolve } from "path";
import { pathToFileURL } from "url";

/**
 * @function 解析导入的模块
 * @param module  module = {
 *     routerModule:string,  //请求方式
 *     url:string,           //路由的url
 *     init:function         //回调函数
 * }
 * */
export function extractModule(module) {
    let init = null;
    for (const key in module) {
        if (typeof module[key] === 'function') {
            init = module[key];
        }
    }
    return {
        routerModule: module?.routerModule,
        url: module?.url,
        init
    }
}

/**
 * @function 注册路由
 * @param route koa-router的实例
 * @param module  module = {
 *     routerModule:string,  //请求方式
 *     url:string,           //路由的url
 *     init:function         //回调函数
 * }
 * */
export function routersPush(route, defaultmodule) {
    const { routerModule, url, init } = extractModule(defaultmodule)
    route[routerModule](url, init)
}

/**
 * @function 自动添加路由
 * @param route koa-router的实例
 * @param path 要导入的目录
 * */
export const useRouterImport = async (route, path) => {
    const pathresolve = resolve('src', path)
    for (const fileitem of readdirSync(pathresolve)) {
        const fileItemPaht = join(pathresolve, fileitem)
        if (statSync(fileItemPaht).isDirectory()) {
            useRouters(fileItemPaht)
        } else {
            // pathToFileURL(fileItemPaht) 把绝对路径转换为 file:///c:/***** 路径
            const itemModule = await import(pathToFileURL(fileItemPaht).href)
            if (Array.isArray(itemModule.default)) {
                itemModule.default.forEach(itemDefault => {
                    routersPush(route, itemDefault)
                })
            } else {
                routersPush(route, itemModule.default)
            }
        }
    }
}