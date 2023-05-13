module.exports = {
	apps: [
		{
			name: 'KOA2-ES6',
			script: './main.js',
			watch: ['src', 'main.js'],
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
