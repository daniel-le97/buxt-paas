interface CaproverOneClickAppVariable {
  id: string
  label: string
  defaultValue?: string
  description?: string
  validRegex?: RegExp
}

interface CaproverOneClickAppInstructions {
  start?: string
  end?: string
}

interface CaproverOneClickAppConfig {
  caproverOneClickApp: {
    variables: CaproverOneClickAppVariable[]
    instructions: CaproverOneClickAppInstructions
    displayName: string
    isOfficial: boolean
    description: string
    documentation: string
  }
}

interface CaproverDockerComposeConfig {
  captainVersion: number
  services: {
    [serviceName: string]: {
      depends_on?: string[]
      image: string
      restart: string
      environment: {
        WAIT_HOSTS: string
        Caprover_MONGODB: string
        Caprover_USERNAME: string
        Caprover_PASSWORD: string
        Caprover_ALLOW_ORIGIN: string
      }
      caproverExtra: {
        containerHttpPort: string
      }
    }
  }
  caproverOneClickApp?: {
    variables: {
      [variableId: string]: string
    }
    instructions: {
      start: string
      end: string
    }
    displayName: string
    isOfficial: boolean
    description: string
    documentation: string
  }
}

// Example Usage:
//   const exampleCaproverConfig: CaproverOneClickAppConfig = {
//     caproverOneClickApp: {
//       variables: [
//         {
//           id: 'cap_Caprover_version',
//           label: 'Caprover Version',
//           defaultValue: '3.4.1',
//           description: 'Check out their docker page for the valid tags https://hub.docker.com/r/electerious/Caprover/tags',
//           validRegex: /^([^\s^\/])+$/,
//         },
//         // Add more variables as needed
//       ],
//       instructions: {
//         start: 'Caprover is a self-hosted analytics tool...',
//         end: "Aaaand you're done! 😄 Your service is available at http://${cap_appname}.${cap_root_domain}",
//       },
//       displayName: 'Caprover',
//       isOfficial: true,
//       description: 'Self-hosted, Node.js based analytics tool for those who care about privacy.',
//       documentation: 'https://hub.docker.com/r/electerious/Caprover',
//     },
//   };

//   // Example Usage with Docker Compose Config:
//   const exampleDockerComposeConfig: CaproverDockerComposeConfig = {
//     captainVersion: 4,
//     services: {
//       myapp: {
//         depends_on: ['myapp-mongodb'],
//         image: 'electerious/Caprover:3.4.1',
//         restart: 'always',
//         environment: {
//           WAIT_HOSTS: 'srv-captain--myapp-mongodb:27017',
//           Caprover_MONGODB: 'mongodb://srv-captain--myapp-mongodb/Caprover',
//           Caprover_USERNAME: 'username',
//           Caprover_PASSWORD: 'password',
//           Caprover_ALLOW_ORIGIN: 'https://example.com,https://example2.com',
//         },
//         caproverExtra: {
//           containerHttpPort: '3000',
//         },
//       },
//       'myapp-mongodb': {
//         image: 'mongo:4.0.20',
//         volumes: ['myapp-db-data:/data/db'],
//         restart: 'always',
//         caproverExtra: {
//           notExposeAsWebApp: 'true',
//         },
//       },
//     },
//     caproverOneClickApp: {
//       variables: {
//         cap_Caprover_version: '3.4.1',
//         cap_Caprover_username: 'admin',
//         cap_Caprover_passwd: 'secret',
//         cap_Caprover_access_origin: 'https://example.com,https://example2.com',
//         cap_mongo_version: '4.0.20',
//       },
//       instructions: {
//         start: 'Caprover is a self-hosted analytics tool...',
//         end: "Aaaand you're done! 😄 Your service is available at http://${cap_appname}.${cap_root_domain}",
//       },
//       displayName: 'Caprover',
//       isOfficial: true,
//       description: 'Self-hosted, Node.js based analytics tool for those who care about privacy.',
//       documentation: 'https://hub.docker.com/r/electerious/Caprover',
//     },
//   };
