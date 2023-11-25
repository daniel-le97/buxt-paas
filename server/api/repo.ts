export default defineEventHandler(async (event) => {
  const id = crypto.randomUUID()
  let body = await readBody(event)

  await useStorage('db').setItem(id, body)
  return id
})
