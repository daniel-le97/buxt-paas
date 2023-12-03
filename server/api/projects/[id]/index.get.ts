export default defineEventHandler(async (event) => {
  try {
    // TODO change with auth
    const user = 'me'
    const id = getRouterParam(event, 'id')

    if (!id)
      throw createError({ message: 'please provide an id' })

    const db = useDbStorage('projects')

    const project = await db.getItem<Project>(`${user}:${id}`)

    return project
  }
  catch (error) {
    console.log('invalid id or user')
  }
})
