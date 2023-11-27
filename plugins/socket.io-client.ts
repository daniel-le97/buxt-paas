import io from 'socket.io-client'

// // @ts-expect-error
// import VueMasonry from 'vue-masonry-css'

export default defineNuxtPlugin((nuxtApp) => {

  // nuxtApp.hook('')
  // nuxtApp.vueApp.use(VueMasonry)

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
    },
  }
})
