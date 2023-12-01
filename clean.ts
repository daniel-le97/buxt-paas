import { Hookable } from 'hookable'

// class TaskQueue {
//   hooks: Hookable<Record<string, any>, string>
//   queue: never[]
//   isProcessing: boolean
//   constructor() {
//     this.hooks = createHooks()
//     this.queue = []
//     this.isProcessing = false

//     // Registering hooks for better control
//     this.hooks.beforeEach((event) => {
//       console.log(`Before hook ${event.name} is being called with ${event.args}`)
//     })

//     this.hooks.afterEach((event) => {
//       console.log(`After hook ${event.name} is being called with ${event.args}`)
//     })
//   }

//   addTask(task) {
//     this.queue.push(task)

//     if (!this.isProcessing)
//       this.processQueue()
//   }

//   async processQueue() {
//     if (this.queue.length === 0) {
//       this.isProcessing = false
//       return
//     }

//     const task = this.queue.shift()
//     this.isProcessing = true

//     // Trigger 'processTask' hook
//     await this.hooks.callHook('processTask', task)

//     // Simulate task processing
//     console.log(`Processing task: ${task}`)
//     await this.doTask(task)

//     // Trigger 'afterProcessTask' hook
//     await this.hooks.callHook('afterProcessTask', task)

//     this.processQueue() // Process the next task
//   }

//   async doTask(task) {
//     // Simulate some asynchronous task
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         resolve()
//       }, 3000) // Simulating 3 seconds of task processing
//     })
//   }
// }

// Example usage:
// const taskQueue = new TaskQueue()

// // Register hooks
// taskQueue.hooks.hook('processTask', async (task) => {
//   console.log(`Processing task hook: ${task}`)
//   // You can perform additional actions before the task is processed
// })

// taskQueue.hooks.hook('afterProcessTask', async (task) => {
//   console.log(`After processing task hook: ${task}`)
//   // You can perform additional actions after the task is processed
// })

// // Add tasks to the queue
// taskQueue.addTask('Task 1')
// taskQueue.addTask('Task 2')

interface Task {
  repo: string
}

class Hooker extends Hookable {
  queue: Task[]
  isProcessing: boolean

  constructor() {
    super()
    this.queue = []
    this.isProcessing = false
    this.beforeEach((event) => {
      console.log(event)
    })
  }

  addTask(task: Task) {
    this.queue.push(task)
    if (!this.isProcessing)
      this.processQueue()
  }

  async processQueue() {
    if (this.queue.length === 0) {
      this.isProcessing = false
      return
    }

    const task = this.queue.shift()
    if (!task)
      return

    this.isProcessing = true

    // Trigger 'processTask' hook
    await this.callHook('processTask', task)

    // Simulate task processing
    console.log(`Processing task: ${task}`)
    await this.doTask(task)

    // Trigger 'afterProcessTask' hook
    await this.callHook('afterProcessTask', task)

    this.processQueue() // Process the next task
  }

  async doTask(task: Task) {
    // Simulate some asynchronous task
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(task)
      }, 3000) // Simulating 3 seconds of task processing
    })
  }
}

const queue = new Hooker()

queue.addTask({ repo: 'bleep bloop' })
queue.addTask({ repo: 'bleep dfkjhlksdjf' })
