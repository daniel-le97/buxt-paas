import io from 'socket.io-client'
import consola from 'consola'

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig().public
  const socket = io(`${config.host}:${config.socketUrl}`, {
    autoConnect: false,
  })
  // socket.on('connected', (data) => {
  //     console.log({data});

  // })
  return {
    provide: {
      io: socket,
      logger: consola,
    },
  }
})
