
interface AckeeOneClickAppVariable {
    id: string;
    label: string;
    defaultValue?: string;
    description?: string;
    validRegex?: RegExp;
  }
  
  interface AckeeOneClickAppInstructions {
    start?: string;
    end?: string;
  }
  
  interface AckeeOneClickAppConfig {
    caproverOneClickApp: {
      variables: AckeeOneClickAppVariable[];
      instructions: AckeeOneClickAppInstructions;
      displayName: string;
      isOfficial: boolean;
      description: string;
      documentation: string;
    };
  }
  
  interface AckeeDockerComposeConfig {
    captainVersion: number;
    services: {
      [serviceName: string]: {
        depends_on?: string[];
        image: string;
        restart: string;
        environment: {
          WAIT_HOSTS: string;
          ACKEE_MONGODB: string;
          ACKEE_USERNAME: string;
          ACKEE_PASSWORD: string;
          ACKEE_ALLOW_ORIGIN: string;
        };
        caproverExtra: {
          containerHttpPort: string;
        };
      };
    };
    caproverOneClickApp?: {
      variables: {
        [variableId: string]: string;
      };
      instructions: {
        start: string;
        end: string;
      };
      displayName: string;
      isOfficial: boolean;
      description: string;
      documentation: string;
    };
  }
  
  // Example Usage:
  const exampleAckeeConfig: AckeeOneClickAppConfig = {
    caproverOneClickApp: {
      variables: [
        {
          id: 'cap_ackee_version',
          label: 'Ackee Version',
          defaultValue: '3.4.1',
          description: 'Check out their docker page for the valid tags https://hub.docker.com/r/electerious/ackee/tags',
          validRegex: /^([^\s^\/])+$/,
        },
        // Add more variables as needed
      ],
      instructions: {
        start: 'Ackee is a self-hosted analytics tool...',
        end: "Aaaand you're done! 😄 Your service is available at http://${cap_appname}.${cap_root_domain}",
      },
      displayName: 'Ackee',
      isOfficial: true,
      description: 'Self-hosted, Node.js based analytics tool for those who care about privacy.',
      documentation: 'https://hub.docker.com/r/electerious/ackee',
    },
  };
  
  // Example Usage with Docker Compose Config:
  const exampleDockerComposeConfig: AckeeDockerComposeConfig = {
    captainVersion: 4,
    services: {
      myapp: {
        depends_on: ['myapp-mongodb'],
        image: 'electerious/ackee:3.4.1',
        restart: 'always',
        environment: {
          WAIT_HOSTS: 'srv-captain--myapp-mongodb:27017',
          ACKEE_MONGODB: 'mongodb://srv-captain--myapp-mongodb/ackee',
          ACKEE_USERNAME: 'username',
          ACKEE_PASSWORD: 'password',
          ACKEE_ALLOW_ORIGIN: 'https://example.com,https://example2.com',
        },
        caproverExtra: {
          containerHttpPort: '3000',
        },
      },
      'myapp-mongodb': {
        image: 'mongo:4.0.20',
        volumes: ['myapp-db-data:/data/db'],
        restart: 'always',
        caproverExtra: {
          notExposeAsWebApp: 'true',
        },
      },
    },
    caproverOneClickApp: {
      variables: {
        cap_ackee_version: '3.4.1',
        cap_ackee_username: 'admin',
        cap_ackee_passwd: 'secret',
        cap_ackee_access_origin: 'https://example.com,https://example2.com',
        cap_mongo_version: '4.0.20',
      },
      instructions: {
        start: 'Ackee is a self-hosted analytics tool...',
        end: "Aaaand you're done! 😄 Your service is available at http://${cap_appname}.${cap_root_domain}",
      },
      displayName: 'Ackee',
      isOfficial: true,
      description: 'Self-hosted, Node.js based analytics tool for those who care about privacy.',
      documentation: 'https://hub.docker.com/r/electerious/ackee',
    },
  };
  