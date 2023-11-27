import * as yaml from 'js-yaml'

interface OneClickAppsList {
  oneClickApps:{
    name:string
    displayName:string
    description:string
    isOfficial:boolean
    logoUrl: string
    showFullDescription:boolean
  }[]
}
export default defineEventHandler(async (event) => {
  const db = useDbStorage('templates')
  const caproverRaw = await db.getItem('caprover:list') as OneClickAppsList
  return caproverRaw.oneClickApps.map(app => ({...app, showFullDescription: false}))
})
