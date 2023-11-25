// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxt/ui', '@nuxtjs/tailwindcss', '@vueuse/nuxt'],

  runtimeConfig:{
    redis:{
      url: process.env.NUXT_REDIS_URL
    },
    public:{
      socketUrl: 3001,
      host: 'localhost'
    }
   },
   experimental: {
    typedPages: true,
    viewTransition: true,
    componentIslands:true
   },
   nitro: {
    // preset: './runtime/bun',
     experimental:{
       asyncContext: true,
       openAPI: true,
     },
    //  storage: {
    //   db: {
    //     driver: 'fs',
    //     base: './.data/db'
    //   },
    //   compose: {
    //     driver: 'fs',
    //     base: './.data/compose'
    //   }
    // }
   },
  
})
