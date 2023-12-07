
import { authOptions } from './auth/[...]'
import { getServerSession, getServerToken } from '#auth'

export default defineEventHandler(async (event) => {
  const runtimeConfig = useRuntimeConfig()
  const session = await requireAuthSession(event)
  // const jwt = await getServerToken(event, authOptions)
  console.log({ session, runtimeConfig })
})
