import { resolve } from 'path'

/**
 * @var uploads 设置文件的默认保存目录，不设置则保存在系统临时目录下
 * 这里存放的是上传二进制文件
 * */
export const uploads = resolve('./public/uploads_file')

/**
 * @var pathUpload 默认文件上传写入路径
 * */
export const pathUpload = resolve('./public/uploads')
/**
 * @var fileImg 要单独往 img 文件夹里放的文件格式
 * */
export const imgType = ['png', 'jpg', 'jpeg', 'gif', 'svg']

/**
 * @var imgpath 图片存放路径  后面会拼接每天的日期
 * */
export const imgpath = resolve('./public/img')

/**
 * @var staticPath 开放静态资源文件夹
 * */
export const staticPath = resolve('./public')
/**
 * @var cert 秘钥
 * */
export const cert = `mi_yao`
