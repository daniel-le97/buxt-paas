export default defineEventHandler(async (event) => {
  const yamls = (await useStorage('db').getKeys('compose'))
  return yamls
})
