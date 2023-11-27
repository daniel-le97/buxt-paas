import io from 'socket.io-client'
// @ts-ignore
import VueMasonry from 'vue-masonry-css'
export default defineNuxtPlugin((nuxtApp)=>{

    nuxtApp.vueApp.use(VueMasonry)

    const config = useRuntimeConfig().public
    const socket = io(`${config.host}:${config.socketUrl}`, {
        autoConnect: false,
    })

    // socket.on('connected', (data) => {
    //     console.log({data});
        
    // })

    return {
        provide: {
            io: socket
        }
    }
})