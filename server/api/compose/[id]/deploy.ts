export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  if (!id)
    NotFound()

  const path = `${process.cwd()}/.data/compose/${id}`

  const clone = Bun.spawn(['docker', 'compose', '-f', path, 'up'], {
    stdio: ['ignore', 'pipe', 'pipe'],
  })
  const streams = [clone.stderr, clone.stdout]

  // const file = await useCompose().
})

function NotFound(id?: string) { throw createError({ statusCode: 404, statusMessage: id ? `${id} not found` : 'not found' }) }
