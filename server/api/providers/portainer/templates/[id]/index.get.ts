import { convertPortainerTemplatesToDockerCompose } from "../../../../../services/DockerComposeService";
import { templateFile } from "../../../../../types/Service";


export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  if (!id) return
  
  const parsedId = parseInt(id)
  const db = useDbStorage('templates')
  const templatesFile = await db.getItem('template.json') as templateFile
  const foundTemplate = templatesFile.templates[parsedId]
  let stackfile = foundTemplate?.repository?.stackfile
  stackfile = stackfile ? stackfile.split('/').slice(1).join(':') : `Stack:${foundTemplate.name}.yml`
  // console.log(stackfile);
  
  let response:string | null

    // console.log(formatted);
    if (await db.hasItem(stackfile)) {
      response = await db.getItem(stackfile)
    }else{
      response = convertPortainerTemplatesToDockerCompose([templatesFile.templates[parsedId]])
      
    }
console.log(response);

 return response

})
