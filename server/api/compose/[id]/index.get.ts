


export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  if(!id) return 'not found'
  const db = useStorage('db')
  if(await db.hasItem('compose:' + id)){
    return await db.getItem('compose:' + id)
  }
})
