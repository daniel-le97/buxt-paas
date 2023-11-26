// Base type for both types of services
type BaseService = {
    id: string;
    name: string;
    type: 'docker-compose' | 'nixpacks';
    description: string;
    created_at: Date;
    updated_at: Date;
    hasRepo?: string
  };
  
  // Type for Docker Compose services
  type ComposeService = BaseService & {
    type: 'docker-compose';
    compose_file: string; // You might want to use a more specific type
    compose_version: string;
  };
  
  // Type for Dockerfile-based services
  type DockerfileService = BaseService & {
    type: 'dockerfile';
    dockerfile_content: string;
    build_context: string;
  };
  
  // Example usage:
  const composeService: ComposeService = {
    id: '1',
    name: 'MyComposeApp',
    type: 'docker-compose',
    description: 'A Docker Compose application',
    created_at: new Date(),
    updated_at: new Date(),
    compose_file: 'path/to/docker-compose.yml',
    compose_version: '3.8',
  };
  
  const dockerfileService: DockerfileService = {
    id: '2',
    name: 'MyDockerfileApp',
    type: 'dockerfile',
    description: 'A Dockerfile-based application',
    created_at: new Date(),
    updated_at: new Date(),
    dockerfile_content: 'FROM node:14\nCOPY . /app\nWORKDIR /app\n...',
    build_context: 'path/to/build/context',
  };
  