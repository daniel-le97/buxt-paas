export default defineEventHandler(async (event: any) => {
  try {
    const session = await requireAuthSession(event)

    const id = getRouterParam(event, 'id')
 
    
    if (!id || !session.id)
      throw createError('unable to find id')

    const key = `${session.id}:${id}`

    const db = useDbStorage('projects')
    const isProject = await db.hasItem(key)

    if (!isProject)
      throw createError('unable to find project for user')

    const project = await db.getItem<Project>(key)

    const logsPath = `${process.cwd()}/data/logs/${id}/`

    if (!project?.application.repoUrl)
      throw createError('please update your configuration to include a repoURL')

    const isActiveProject = queue.activeProject?.id === id
    const isInQueue = queue.queue?.find(queue => queue.id === id)
    const isListening = queue._listeners.find(listener => listener.userId === session.id)


// if we dont already have a listener proceed
    if (!isListening) {
      const { send, close } = useSSE(event, `sse:event:${id}`)
      const newListener: Listener = {
        projectId: project.id,
        send,
        close,
        userId: session.id,
      }

      if (isActiveProject || isInQueue) {

        if (isActiveProject) {
          const fileContents = queue.fileContents
          send(id => ({id, data:fileContents}) )
        }
        queue.addProjectListener(newListener)
      }
      else {
        const newProject = {
          ...project,
          logsPath,
          key,
        } as ProcessProject
        queue.addProjectListener(newListener)
        await queue.addProject(newProject)
      }
    }
  }
  catch (error) {
    console.log(error);
    
    throw createError({ statusMessage: `failed to build app` })
  }
})
