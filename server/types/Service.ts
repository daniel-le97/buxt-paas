// Base type for both types of services
export type BaseService = {
    id: string;
    name: string;
    type: 'docker-compose' | 'nixpacks';
    description: string;
    created_at: Date;
    updated_at: Date;
    hasRepo?: string
  };
  
  // Type for Docker Compose services
  export type ComposeService = BaseService & {
    type: 'docker-compose';
    compose_file: string; // You might want to use a more specific type
    compose_version: string;
  };
  
  // Type for Dockerfile-based services
  export type DockerfileService = BaseService & {
    type: 'dockerfile';
    dockerfile_content: string;
    build_context: string;
  };

    // ---------------------------------------------//

  export interface PortainerTemplate {
    name: string;
    image: string;
    env?: { default?: string; label: string; name: string; set?: string }[];
    ports?: string[];
    volumes?: { bind: string; container: string }[];
    restart_policy?: string;
    type:number
  }
  
  export interface DockerComposeService {
    [key: string]: {
      image: string;
      ports?: string[];
      environment?: string[];
      volumes?: string[];
      restart?: string;
    };
  }
  
  export interface DockerComposeConfig {
    version: string;
    services: DockerComposeService;
  }
  
  // ---------------------------------------------//


 export type template = {
    name:string
    description:string
    logo:string,
    index:number
    showFullDescription:boolean
  }
  export interface portainer extends PortainerTemplate {
    description:string,
    logo:string,
    name:string
    title:string
    repository:{
      stackfile:string,
      url:string
    }
  }
  export type templateFile = {version:string, templates: portainer[]}
  
  // Example usage:
  // const composeService: ComposeService = {
  //   id: '1',
  //   name: 'MyComposeApp',
  //   type: 'docker-compose',
  //   description: 'A Docker Compose application',
  //   created_at: new Date(),
  //   updated_at: new Date(),
  //   compose_file: 'path/to/docker-compose.yml',
  //   compose_version: '3.8',
  // };
  
  // const dockerfileService: DockerfileService = {
  //   id: '2',
  //   name: 'MyDockerfileApp',
  //   type: 'dockerfile',
  //   description: 'A Dockerfile-based application',
  //   created_at: new Date(),
  //   updated_at: new Date(),
  //   dockerfile_content: 'FROM node:14\nCOPY . /app\nWORKDIR /app\n...',
  //   build_context: 'path/to/build/context',
  // };
  