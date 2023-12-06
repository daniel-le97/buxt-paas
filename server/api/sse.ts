export default defineEventHandler(async (event) => {
  const { send } = useSSE(event, 'sse:events')
  let count = 1
  setInterval(() => {
    send(id => ({ id, message: count++ }))
  }, 1000)
})
