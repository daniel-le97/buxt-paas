// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {
    enabled: true,

    timeline: {
      enabled: true,
    },
  },
  
  modules: [
    '@nuxt/ui',
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt',
    "@nuxt/image",
    'nuxt-monaco-editor',
  ],

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
     experimental:{
       asyncContext: true,
       openAPI: true,
     }
   },
  
})