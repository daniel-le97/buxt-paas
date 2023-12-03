// import { queue } from '../../utils/queue'

export default defineEventHandler(async (event) => {
  const body = await readBody<Project>(event)
  queue.addProject(body)
  // const {result} = await runNitroTask('build', body)
  // console.log(result);
  
  return body
})


