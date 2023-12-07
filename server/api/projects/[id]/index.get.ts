export default defineEventHandler(async (event) => {
  try {
    // TODO change with auth
    
    const session = await requireAuthSession(event)
    const id = getRouterParam(event, 'id')

    if (!id)
      throw createError({ message: 'please provide an id' })

    const db = useDbStorage('projects')

    const project = await db.getItem<Project>(`${session.user?.id}:${id}`)

    return project
  }
  catch (error) {
    console.log('invalid id or user')
  }
})
