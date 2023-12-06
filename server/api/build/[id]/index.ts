export default defineEventHandler(async (event: any) => {
  try {
    // const body = await readBody(event)
    const user = 'me'

    const id = getRouterParam(event, 'id')
    if (!id)
      throw createError('unable to find id')

    const key = `${user}:${id}`

    const db = useDbStorage('projects')
    const isProject = await db.hasItem(key)

    if (!isProject)
      throw createError('unable to find project for user')

    const project = await db.getItem<Project>(key)

    const logsPath = `${process.cwd()}/data/logs/${id}/`

    const generatedName = generateName()
    const { send, close } = useSSE(event, `sse:event:${generatedName}`)

    if (!project?.application.repoUrl)
      throw createError('please update your configuration to include a repoURL')

    const newProject = {
      ...project,
      logsPath,
      key,
      send,
      close,
    } as ProcessProject

    await queue.addProject(newProject)
  }
  catch (error) {
    // console.log(error)

    throw createError({ statusMessage: `failed to build app` })
  }
})
