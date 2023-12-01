export default defineEventHandler(async (event) => {
  // TODO change when auth is implemented
  const user = 'me'

  const db = useDbStorage('projects')
  const keys = await db.getKeys(user)
  const projects: Project[] = []
  for await (const key of keys) {
    const project = await db.getItem<Project>(key)
    if (project)
      projects.push(project)
  }
  return projects
  // projects.push(await db.getItem(key) as unknown as Project)

  // console.log(projects);
})
