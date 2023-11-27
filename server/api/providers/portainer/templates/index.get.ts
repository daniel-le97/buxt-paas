import { template, templateFile } from "../../../../types/Service";

export default defineEventHandler(async (event) => {
  const templates = await useDbStorage('templates').getItem('template.json') as unknown as templateFile
  let apps:template[] = []

  for await (const [number, template] of templates.templates.entries()){
    const logo = (logo:any) => {
      const fallback = 'https://i0.wp.com/codeblog.dotsandbrackets.com/wp-content/uploads/2016/10/compose-logo.jpg?fit=622%2C678&ssl=1'
      if (`${logo}`.includes('data:')) {
        return fallback
      }
      if (!logo) {
        return fallback
      }
      return logo
    }
    const portainerTemplate: template = {
      name: template.name ?? template.title ?? template.image,
      description:template.description,
      logo:logo(template.logo),
      index:number,
      showFullDescription:false
      
    }
    console.log({logo:portainerTemplate.logo ?? 'https://i0.wp.com/codeblog.dotsandbrackets.com/wp-content/uploads/2016/10/compose-logo.jpg?fit=622%2C678&ssl=1'});
    
    apps.push(portainerTemplate)
  }
  
 
  return apps
})
