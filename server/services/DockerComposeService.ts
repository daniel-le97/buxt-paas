import yaml from 'js-yaml'
import { DockerComposeConfig, DockerComposeService, PortainerTemplate } from '../types/Service';


  export function convertPortainerTemplatesToDockerCompose(templates: PortainerTemplate[]): string {
    const dockerComposeConfig: DockerComposeConfig = {
      version: '3',
      services: {},
    };
    const defaultTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    templates.forEach((template, index) => {
      template.type ? dockerComposeConfig.version = template.type.toString() : ''

      const serviceName = `service${index + 1}`;
      const service: DockerComposeService = {
        [serviceName]: {
          image: template.image,
          ports: template.ports ? [template.ports.join(':')] : undefined,
          environment: template.env
            ? template.env.map((envItem) => {
              const createEnv = (env: typeof envItem) => {
                let setDefault = env.default ? env.default : env.name.toLowerCase().includes('tz') ? defaultTimeZone : ''
               return `${env.name}=${setDefault}`
              }
              return createEnv(envItem)
            })
            : undefined,
          volumes: template.volumes
            ? template.volumes.map((volume) => `${volume.bind}:${volume.container}`)
            : undefined,
          restart: template.restart_policy,
        },
      };
  
      Object.assign(dockerComposeConfig.services, service);
    });
  
    return yaml.dump(dockerComposeConfig);
  }
  
