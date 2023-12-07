import GithubProvider from '@auth/core/providers/github'
import CredentialsProvider from '@auth/core/providers/credentials'
import type { AuthConfig } from '@auth/core/types'
import { randomUUID } from 'uncrypto'
import { findUserByEmail } from '../../utils/authDB'
import { NuxtAuthHandler } from '#auth'

// The #auth virtual import comes from this module. You can use it on the client
// and server side, however not every export is universal. For example do not
// use sign-in and sign-out on the server side.

const runtimeConfig = useRuntimeConfig()

// Refer to Auth.js docs for more details
export const authOptions: AuthConfig = {
  secret: runtimeConfig.authJs.secret,
  // adapter: MyAdapter(useDbStorage('auth')),
  // debug: process.env.NODE_ENV !== 'production',
  // this is required for credentials provider
  // session: {
  //   strategy: 'jwt',
  // },
//  theme:{

//  },
  providers: [
    CredentialsProvider({
      type: 'credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          // value:''
        },
        password: { label: 'Password', type: 'password' },
        register: {
          label: 'register',
          type: 'checkbox',
        },
      },
      async authorize(credentials) {
        // console.log([credentials])

        if (credentials.register) {
          if (!credentials.email || !credentials.password) {
            throw createError({
              message: 'Email or Password not found in input! Please try again.',
              statusCode: 401,
            })
          }
          const id = randomUUID()
          const newUser = {
            id,
            email: credentials.email as string,
            name: (credentials.email as string).split('@')[0],
            image: `https://i.pravatar.cc/150?u=${id}`,
            password: await hash(credentials.password as string),
          }
          await createUser(newUser)
          const user = await findUserByEmail(newUser.email)
          return user
        }
        const user = await findUserByEmail(credentials.email as string)
        if (!user) {
          throw createError({
            message: 'Email not found! Please register.',
            statusCode: 401,
          })
        }
        if (!user.password || user.password !== (await hash(credentials.password as string))) {
          throw createError({
            message: 'Incorrect password!',
            statusCode: 401,
          })
        }
        return user
      },
    }),
    GithubProvider({
      clientId: runtimeConfig.github.clientId,
      clientSecret: runtimeConfig.github.clientSecret,
    }),
  ],
  callbacks: {
    async jwt({ token, user, session, account, profile }) {
      return token
    },
    
    async session({ session, user, token, trigger }) {
      if (session.user && token.sub)
        session.user.id = token.sub

      return session
    },
  },
}

// @ts-expect-error runtime config is correct
export default NuxtAuthHandler(authOptions, runtimeConfig)
// If you don't want to pass the full runtime config,
//  you can pass something like this: { public: { authJs: { baseUrl: "" } } }
