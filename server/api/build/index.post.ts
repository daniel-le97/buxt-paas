import { queue } from '../../utils/queue'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  console.log(body)
  queue.addTask(body)

})
