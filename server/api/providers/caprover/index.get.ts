import * as yaml from 'js-yaml'
export default defineEventHandler(async (event) => {
  
  const db = useDbStorage('templates')
  const caproverRaw = await db.getItem('caprover:list') as CaproverDockerComposeConfig
  console.log(caproverRaw)
  
return caproverRaw
})
