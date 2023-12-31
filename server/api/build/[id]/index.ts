import { SSEEvents, useJoinRoom, useSendRoomMessage } from '../../../utils/reworkSSE'

export default defineEventHandler(async (event: any) => {
  try {
    const session = await requireAuthSession(event)

    const id = getRouterParam(event, 'id')

    if (!id || !session.user?.id)
      throw createError('unable to find id')

    const key = `${session.user.id}:${id}`

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


    if (isActiveProject || isInQueue) {
      const connection = SSEEvents.connections.get(session.user.id)
      connection?.send({ data: queue.fileContents, event: `build:${id}` })
      await useJoinRoom(event, `build:${id}`)
      return
    }

    await useJoinRoom(event, `build:${id}`)
    const newProject = {
      ...project,
      logsPath,
      key,
    } as ProcessProject

    await queue.addProject(newProject)
  }

  catch (error) {
    console.log(error)

    throw createError({ statusMessage: `failed to build app` })
  }
})
