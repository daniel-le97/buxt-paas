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
    // 'nuxt-monaco-editor',
    '@nuxt/image',
    // 'nuxt-monaco-editor',
  ],

  tailwindcss: {
    quiet: true,
  },

  imports: {
    dirs: ['./types'],
  },
  runtimeConfig: {
    redis: {
      url: process.env.NUXT_REDIS_URL,
    },
    public: {
      socketUrl: 3001,
      host: 'localhost',
    },
  },
  experimental: {
    typedPages: true,
    viewTransition: true,
    componentIslands: true,
  },
  nitro: {
    preset: './server/runtime/bun',
    imports: {
      dirs: ['./types'],
    },
    experimental: {
      asyncContext: true,
      openAPI: true,
    },
  },

})
