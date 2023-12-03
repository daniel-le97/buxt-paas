// https://nuxt.com/docs/api/configuration/nuxt-config
const cwd = process.cwd()
export default defineNuxtConfig({
  devtools: {
    enabled: true,

    timeline: {
      enabled: true,
    },
  },

  modules: ['@nuxt/ui',
  '@nuxtjs/tailwindcss',
  '@vueuse/nuxt', // these are currently unusable with bun
  // 'nuxt-monaco-editor',
  // 'nuxt-security',
  // '@nuxt/image',
],

  ignore: ['temp'],

  // security: {
  //   headers: {
  //     crossOriginEmbedderPolicy: process.env.NODE_ENV === 'development' ? 'unsafe-none' : 'require-corp',
  //   },
  // },

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
    preset: 'bun',
    imports: {
      dirs: ['./types'],
      // 'imports':[{name: '*', as:'Bun', from: 'bun', type: true, 'typeFrom': 'bun-types'}]
    },
    typescript: {
      tsConfig: {
        // compilerOptions: {
        //   types: ['bun-types'],
        // },
        exclude: [`${cwd}/eslint.config.js`, `${cwd}/temp`],
      },
    },
    experimental: {
      asyncContext: true,
      openAPI: true,
    
    },
  },

})