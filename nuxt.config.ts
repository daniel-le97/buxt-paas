// https://nuxt.com/docs/api/configuration/nuxt-config
const cwd = process.cwd()
if (!process.env.NUXT_AUTH_PASSWORD) {
  console.warn('Security warning: NUXT_AUTH_PASSWORD is not set. Using an example value. Please set it otherwise your session is unsecure!')
  process.env.NUXT_AUTH_PASSWORD = 'secretsecretsecretsecretsecretsecretsecret'
}

export default defineNuxtConfig({
  devtools: {
    enabled: true,

    timeline: {
      enabled: true,
    },
  },
  extends: [
    './auth',
  ],

  modules: [
    '@nuxt/ui',
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt',
    // 'nuxt-security',
    '@nuxt/image',
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
  security: {
    headers: {
      crossOriginEmbedderPolicy: process.env.NODE_ENV === 'development' ? 'unsafe-none' : 'require-corp',
    },
  },

  imports: {
    dirs: ['./types'],
  },
  runtimeConfig: {
    // redis: {
    //   url: process.env.NUXT_REDIS_URL,
    // },
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
