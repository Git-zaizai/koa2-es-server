/***
 * 注意事项：
 * 自动重启：
 * 如果你的配置文件" 在项目根目录 "就可以直接这样配置
 * 如果你的配置文件" -不在-项目根目录 " 所有关于 " 目录\文件 " 的配置项要 " 绝对路径 "
 * 才能监听到 “目录\文件” 的变化  不然没有用的
 * 
 * 
 */
module.exports = {
	apps: [
		{
			name: 'KOA2-ES6',
			script: './main.js',
			watch: ['src', 'main.js'],
			/** 例如这样用 " 绝对路径 "  */
			// script: '/www/wwwroot/Gadgets/main.js',
			// cwd: '/www/wwwroot/Gadgets/', // 如果配置文件不是在项目目录下就是要加 cwd 工作目录
			// watch: ['/www/wwwroot/Gadgets/src/', '/www/wwwroot/Gadgets/main.js'],
			// ignore_watch: [
			// 	// 忽视这些目录的变化
			// 	'/www/wwwroot/Gadgets/node_modules',
			// 	'/www/wwwroot/Gadgets/public',
			// ],
			ignore_watch: [
				// 忽视这些目录的变化
				'node_modules',
				'public',
			],
			max_restarts: 30, //最大重启次数
			autorestart: true, //自动重启
			env_development: {
				ENV: '开发环境',
				NODE_ENV: 'development',
			},
			env_production: {
				ENV: '生成环境',
				NODE_ENV: 'production',
			},
		},
	],
}
