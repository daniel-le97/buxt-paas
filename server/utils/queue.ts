import { Hookable } from 'hookable'

// import { Project } from '../../types/project';

// interface Project {
//   repo: string
// }

class Hooker extends Hookable {
  queue: Project[]
  isProcessing: boolean

  constructor() {
    super()
    this.queue = []
    this.isProcessing = false
  }

  addProject(Project: Project) {
    this.queue.push(Project)
    if (!this.isProcessing)
      this.processQueue()
  }

  async processQueue() {
    if (this.queue.length === 0) {
      this.isProcessing = false
      return
    }

    console.log(this.queue.length);
    

    const Project = this.queue.shift()
    if (!Project)
      return

    this.isProcessing = true

    // Trigger 'processProject' hook
    await this.callHook('processProject', Project)

    // Simulate Project processing
    console.log(`Processing Project: ${Project.id} at ${new Date(Date.now())}`)
    await this.doProject(Project)

    // Trigger 'afterProcessProject' hook
    await this.callHook('afterProcessProject', Project)

    this.processQueue() // Process the next Project
  }

  async doProject(Project: Project) {
    // Simulate some asynchronous Project
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(Project)
      }, 5000) // Simulating 3 seconds of Project processing
    })
  }
}

export const queue = new Hooker()
