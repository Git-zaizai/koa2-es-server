import createApp from './src/app.js'

async function main() {
    const { app, port } = await createApp()
    app.listen(port, () => {
        console.log('服务启动成功！')
        console.log('Server is running at http://localhost:' + port)
    })
}

main()
