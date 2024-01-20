import createApp from './src/app.js'

async function main() {
  const { app, port } = await createApp()
  app.listen(port, () => {
    console.log(
      `当前环境：${
        process?.env?.NODE_ENV === 'development' ? '开发环境' : '线上环境'
      }`
    )
    console.log('服务启动成功 ： http://localhost:' + port)
  })
}

main().catch((err) => {
  console.log('服务启动失败...')
  console.log(err)
})
