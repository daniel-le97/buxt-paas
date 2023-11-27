export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  if(!id) return
  const db = useDbStorage('templates:caprover:logos')
  const hasItem = await db.hasItem(id)
  if (!hasItem) {
    throw createError({
        statusCode: 404,
        statusMessage: 'image not found',
      })
  }
  return db.getItem(id)
  
})
