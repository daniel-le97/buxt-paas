export default defineEventHandler(async (event) => {
  const { send } = useSSE(event, 'skrrt', true)
  let count = 1
  const interval = setInterval(() => {
    send(id => ({ id, message: count++ }))
  }, 1000)
  if (count === 100)
    clearInterval(interval)
})
