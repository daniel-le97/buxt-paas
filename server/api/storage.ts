



export default defineEventHandler(async (event) => {
  const storage = useStorage('db')
  const keys = await storage.getKeys()
  let data: {name:string, data: any}[] = []

  for await (const name of keys) {
    data.push({name, data: await storage.getItem(`db:${name}`)})
  }
  console.log(data);
  
  return data
})
