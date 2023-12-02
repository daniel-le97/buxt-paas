export default defineEventHandler(async (event) => {
  try {
    // TODO change with auth
    const user = 'me'
    const id = getRouterParam(event, 'id')
    const body = await readBody(event)

    if (!id)
      throw createError({ message: 'please provide an id' })

    const db = useDbStorage('projects')

    const key = `${user}:${id}`

    if (!db.hasItem(key))
      throw createError({ message: 'unable to find project' })

    await db.setItem<Project>(key, body)
    return 'success'
  }
  catch (error) {
    console.log('invalid id or user')
  }
})