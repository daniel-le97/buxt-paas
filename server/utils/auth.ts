import type { Adapter, AdapterAccount, AdapterSession, AdapterUser } from '@auth/core/adapters'
import type { createStorage } from 'unstorage'
import { randomUUID } from 'uncrypto'
import { defu } from 'defu'
import consola from 'consola'

interface Keys<T> {
  key: string
  value: T
}
export function MyAdapter(client: ReturnType<typeof createStorage>, options = {}): Adapter {
  const db = client
  return {
    async createUser(user) {
      const newUser: AdapterUser = {
        ...user,
        id: randomUUID(),
      }
      await db.setItem(`users:${newUser.id}`, newUser)
      return newUser
    },
    async getUser(id) {
      const user = await db.getItem<AdapterUser>(`users:${id}`)
      return user
    },
    async getUserByEmail(email) {
      const keys = await db.getKeys('users')
      const allUsers = await db.getItems(keys) as Keys<AdapterUser>[]
      const found = allUsers.find(user => user.value.email === email)
      const user = found?.value ? found.value : null
      return user
    },
    async getUserByAccount({ providerAccountId, provider }) {
      try {
        const keys = await db.getKeys('accounts')
        const accounts = async () => {
          const accounts = []
          for await (const key of keys)
            accounts.push(await db.getItem(key))

          return accounts as AdapterAccount[]
        }
        // consola.box({ accounts: await accounts(), providerAccountId, provider })

        const account = (await accounts()).find(_account => _account.providerAccountId === providerAccountId && _account.provider === provider)
        const user = await db.getItem<AdapterUser>(`users:${account?.userId}`)
        return user
      }
      catch (error) {
        console.log(error)

        return null
      }
    },
    async updateUser(user) {
      const foundUser = await db.getItem<AdapterUser>(`users:${user.id}`)

      const merged: AdapterUser = {
        email: user.email ?? foundUser?.email ?? '',
        emailVerified: user.emailVerified ?? foundUser?.emailVerified ?? null,
        id: user.id ?? foundUser?.id,
        image: user.image ?? foundUser?.image,
        name: user.name ?? foundUser?.name,
      }
      await db.setItem(`users:${user.id}`, merged)
      return merged
    },
    // async deleteUser(userId) {

    // },
    async linkAccount(account) {
      await db.setItem(`accounts:${account.userId}`, account)
      return account
    },
    // async unlinkAccount({ providerAccountId, provider }) {

    // },
    async createSession({ sessionToken, userId, expires }) {

      const session: AdapterSession = {
        expires,
        userId,
        sessionToken,
      }
      // console.log('create session',{session});

      await db.setItem(`sessions:${sessionToken}`, session)
      return session
    },
    async getSessionAndUser(sessionToken) {
      // console.log('get session and user', sessionToken);

      try {
        const session = (await db.getItem<AdapterSession>(`sessions:${sessionToken}`))
        const user = (await db.getItem<AdapterUser>(`users:${session?.userId}`))
        if (!session || !user)
          return null

        return { session, user }
      }
      catch (error) {
        console.log(error)

        return null
      }
    },
    async updateSession({ sessionToken: token, userId: id, expires: time }) {
      try {
        // console.log({token, id, time});

        const session = (await db.getItem<AdapterSession>(`sessions:${token}`))
        const newSession: AdapterSession = {
          sessionToken: token ?? session?.sessionToken,
          userId: id ?? session?.userId ?? '',
          expires: time ?? session?.expires ?? new Date(),
        }
        await db.setItem<AdapterSession>(`sessions:${token}`, newSession)
        return newSession
      }
      catch (error) {
        consola.box(error)
        return null
      }
    },
    async deleteSession(sessionToken) {
      const session = (await db.getItem<AdapterSession>(`sessions:${sessionToken}`))
      await db.removeItem(`sessions:${sessionToken}`)
      return session
    },
    // async createVerificationToken({ identifier, expires, token }) {

    // },
    // async useVerificationToken({ identifier, token }) {

    // },
  }
}
