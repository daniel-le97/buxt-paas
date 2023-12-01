import * as fs from 'node:fs'

export default defineEventHandler(async (event) => {
  try {
    const ip = getRequestIP(event)
    const body = await readBody(event)
    // TODO replace user with a real user when authetication is added
    const project: Project = {
      id: crypto.randomUUID(),
      user: body.user,
      createdAt: new Date().toLocaleString(),
      name: generateName(),
      deployed: false,
      configured: false,
      buildsLogs: [],
    }
    const path = `${process.cwd()}/data/projects/${project.user}`
    if (!fs.existsSync(path))
      fs.mkdirSync(path, { recursive: true })

    const db = await useDbStorage('projects').setItem(`${project.user}:${project.id}`, project)
    return project
  }
  catch (error) {
    console.log(error)
  }
})
