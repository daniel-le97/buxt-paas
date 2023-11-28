import type { ITemplate } from '../../../../utils/types'

function removeSpecialCharacters(inputString: string): string {
  // Use a regular expression to match all non-alphanumeric characters
  const regex = /[^a-zA-Z0-9]/g

  // Replace matched characters with an empty string
  const resultString = inputString.replace(regex, '')

  return resultString.toLowerCase()
}
// const logos = read
export default defineEventHandler(async (event) => {
  const logos = (await useDbStorage('templates').getItem('logos.json') as { logos: { name: string, path: string, formatted: string }[] }).logos
  const templates = await useDbStorage('templates:portainer').getItem('template.json') as unknown as ITemplateFile
  const apps: ITemplate[] = []

  // prefer caprover stacks over portainer
  // const caproverApps = await $fetch('/api/providers/caprover') as ITemplate[]

  for await (const [number, template] of templates.templates.entries()) {
    const normalizeTemplateName = [template.name, template.title].filter(Boolean).map(item => removeSpecialCharacters(item))
    const foundLogos = []
    for (const name of normalizeTemplateName) {
      const found = logos.find(logo => logo.formatted.includes(name))
      if (found)
        foundLogos.push(found)
    }
    const useLogo = foundLogos[0]

    const logo = (logo: any) => {
      const fallback = '/docker-compose.png'

      if (useLogo)
        return `/logos/${useLogo.name}`

      if (`${logo}`.includes('data:'))
        return fallback

      if (!logo)
        return fallback

      return logo
    }
    const portainerTemplate: ITemplate = {
      name: template.name ?? template.title ?? template.image,
      description: template.description,
      logo: logo(template.logo),
      index: number,
      showFullDescription: false,

    }
    // console.log({ logo: portainerTemplate.logo ?? 'https://i0.wp.com/codeblog.dotsandbrackets.com/wp-content/uploads/2016/10/compose-logo.jpg?fit=622%2C678&ssl=1' })

    apps.push(portainerTemplate)
  }
  // console.log(apps);

  return apps
})
