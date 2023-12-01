export default defineEventHandler(async (event) => {
  return sendProxy(event, '/' ,{'sendStream': true})
})
