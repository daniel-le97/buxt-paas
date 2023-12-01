export interface Project {
  id: string
  user: string // Assuming body.user is a string, adjust the type accordingly
  createdAt: string
  name: string
  deployed: boolean
  configured: boolean
  application?: Application// Adjust the type based on the actual structure of the project property
  buildsLogs?: string[] // Adjust the type based on the actual structure of the buildsLogs property
}


interface Application {
    repoUrl:string,
    buildCommand?:string
    installCommand?:string
    startCommand?:string
}