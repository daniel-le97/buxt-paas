// import { randomUUID } from 'uncrypto'
import * as crypto from 'uncrypto'
import type { H3Event } from 'h3'
import { authOptions } from '../api/auth/[...]'
import { getServerSession } from '#auth'

export interface User {
  id: string
  createdAt: string
  name: string
  email: string
  password: string
}

export async function requireAuthSession(event: H3Event) {
  const session = await getServerSession(event, authOptions)
  if (!session?.user?.id)
    throw createError('session does not have a user attached, please sign in')

  return session
}

export async function findUserByEmail(email: string) {
  const storage = useStorage()
  const key = getUserKey(email!)
  return await storage.getItem<User>(key)
}

export async function createUser(user: Partial<User>) {
  const storage = useStorage()
  const key = getUserKey(user.email!)
  if (await storage.hasItem(key))
    throw createError({ message: 'Email already exists!', statusCode: 409 })

  return await storage.setItem(key, user)
}

export async function updateUserByEmail(email: string, updates: Partial<User>) {
  const storage = useStorage()
  const user = await findUserByEmail(email)
  if (!user)
    throw createError('unable to find user')

  const key = getUserKey(user.email)
  return await storage.setItem(key, {
    ...user,
    ...updates,
  })
}

function getUserKey(email: string) {
  return `db:auth:users:${encodeURIComponent(email)}`
}

export async function hash(str: string) {
  const msgUint8 = new TextEncoder().encode(str)
  const hashBuffer = await crypto.subtle.digest('SHA-512', msgUint8)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hashHex = hashArray
    .map(b => b.toString(16).padStart(2, '0'))
    .join('')
  return hashHex
}
