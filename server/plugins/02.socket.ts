

export default defineNitroPlugin((nitroApp) => {
  // if (!socketServer) {
  //   socketServer = new Server(
  //     useRuntimeConfig().public.socketUrl,
  //     {
  //       serveClient: false,
  //       cors: {
  //         origin: '*',
  //       },
  //     },
  //   )
  // }
  // nitroApp.hooks.hook('close', () => {
  //   socketServer?.close()
  //   socketServer = null
  // })

  // nitroApp.hooks.hook('error', () => {
  //   socketServer?.close()
  //   socketServer = null
  // })

  // // const yaml = `services:
  // // web:
  // //   build:
  // //     context: vuejs
  // //     target: development
  // //   ports:
  // //     - 8080:8080
  // //   volumes:
  // //     - ./vuejs:/project
  // //     - /project/node_modules`

  // //     useDbStorage().setItem('compose:vue-compose.yml', yaml)

  // socketServer.on('connection', (socket) => {
  //   // eventHooks.callHook('connected', () => {

  //   // })

  //   socket.emit('connected', 'connected')
  // })
  // // setInterval(() => {
  // //     socketServer ? console.log('ws listening') : ''
  // //     // socket.emit('new-count',count)
  // //     // count++
  // // }, 1000)

  // return {
  //   socketServer,
  // }
})
