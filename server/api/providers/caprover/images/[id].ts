const cwd = process.cwd()

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  if (!id) {
    throw createError({
      statusCode: 404,
      statusMessage: 'image not found',
    })
  }
  const db = useDbStorage('templates:caprover:logos')
  const hasItem = await db.hasItem(id)
  if (!hasItem) {
    throw createError({
      statusCode: 404,
      statusMessage: 'image not found',
    })
  }

  const file = Bun.file(`${cwd}/data/templates/caprover/logos/${id}`)

  // setResponseHeaders(event, { 'Content-type': 'image/png', 'Content-Length': file.size })


  // // createReadSteam()
  // const arrayBuffer = await file.arrayBuffer()
  // const buffer = Buffer.from(arrayBuffer)
  // return await sendWebResponse(event, new Response(file))
  return sendStream(event, await file.stream())
})
