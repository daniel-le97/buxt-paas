export default defineEventHandler(async (event) => {
  const id = crypto.randomUUID()
  const body = await readBody(event)

  await useDbStorage('db').setItem(id, body)
  return id
})
