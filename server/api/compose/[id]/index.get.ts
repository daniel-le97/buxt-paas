


export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  if(!id) return 'not found'
  const db = useDbStorage('compose')
  if(await db.hasItem(id)){
    return await db.getItem(id)
  }
})
