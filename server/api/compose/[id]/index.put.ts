


export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  console.log(id);
  
  if(!id) return 'not found'
  const body = await readBody(event)
  // console.log(body);
  // console.log(event);

  const db = useStorage('db')
  
  if(await db.hasItem('compose:' + id)){
    await db.setItem('compose:' + id, body)
  }
})
