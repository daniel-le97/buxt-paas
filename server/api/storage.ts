export default defineEventHandler(async (event) => {
  const storage = useDbStorage('db')
  const keys = await storage.getKeys()
  const data: { name: string, data: any }[] = []

  for await (const name of keys)
    data.push({ name, data: await storage.getItem(name) })

  console.log(data)

  return data
})
