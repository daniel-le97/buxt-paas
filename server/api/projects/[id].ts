export default defineEventHandler(async (event) => {
  try {
    // TODO change with auth
    const user = 'me'
    const id = getRouterParam(event, 'id')

    if (!id)
      throw createError({ message: 'please provide an id' })

    const db = useDbStorage('projects')

    return await db.getItem<Project>(`${user}:${id}`)
  }
  catch (error) {
    console.log('invalid id or user')
  }
})
