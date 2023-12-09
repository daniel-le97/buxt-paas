// https://nuxt.com/docs/api/configuration/nuxt-config
const cwd = process.cwd()
// if (!process.env.NUXT_AUTH_PASSWORD || !process.env.NUXT_NEXTAUTH_SECRET) {
//   console.warn('Security warning: NUXT_AUTH_PASSWORD is not set. Using an example value. Please set it otherwise your session is unsecure!')
//   process.env.NUXT_AUTH_PASSWORD = 'secretsecretsecretsecretsecretsecretsecret'
//   process.env.NUXT_NEXTAUTH_SECRET = 'secretsecretsecretsecretsecretsecretsecret'
// }

export default defineNuxtConfig({
  devtools: {
    enabled: true,

    timeline: {
      enabled: true,
    },
  },
  alias: {
    // if not using pnpm
    // cookie: resolve(__dirname, 'node_modules/cookie'),
    cookie: 'cookie',
  },
  // extends: [
  //   './auth',
  // ],

  modules: ['@hebilicious/authjs-nuxt', '@nuxt/ui', '@nuxtjs/tailwindcss', '@vueuse/nuxt', '@nuxt/image', 'nuxt-monaco-editor'],

  ignore: ['/temp', '/data'],

  // security: {
  //   headers: {
  //     crossOriginEmbedderPolicy: process.env.NODE_ENV === 'development' ? 'unsafe-none' : 'require-corp',
  //   },
  // },

  tailwindcss: {
    quiet: true,
  },

  // security: {
  //   headers: {
  //     crossOriginEmbedderPolicy: process.env.NODE_ENV === 'development' ? 'unsafe-none' : 'require-corp',
  //   },
  // },

  imports: {
    dirs: ['./types'],
  },
  runtimeConfig: {
    authJs: {
      secret: process.env.NUXT_AUTH_JS_SECRET, // You can generate one with `openssl rand -base64 32`
    },
    github: {
      clientId: process.env.NUXT_GITHUB_CLIENT_ID,
      clientSecret: process.env.NUXT_GITHUB_CLIENT_SECRET,
    },
    public: {
      authJs: {
        baseUrl: process.env.NUXT_PUBLIC_AUTH_JS_BASE_URL, // The URL of your deployed app (used for origin Check in production)
        verifyClientOnEveryRequest: true, // whether to hit the /auth/session endpoint on every client request
      },
    },
  },
  experimental: {
    
    typedPages: true,
    viewTransition: true,
    componentIslands: true,
  },
  nitro: {
    // preset: 'bun',
    imports: {
      dirs: ['./types'],
      // 'imports':[{name: '*', as:'Bun', from: 'bun', type: true, 'typeFrom': 'bun-types'}]
    },
    typescript: {
      tsConfig: {
        // compilerOptions: {
        //   types: ['bun-types'],
        // },
        exclude: [`${cwd}/eslint.config.js`, `${cwd}/temp`, `${cwd}/data`],
      },
    },
    experimental: {
      asyncContext: true,
      openAPI: true,

    },
  },

})
