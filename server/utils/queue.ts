/* eslint-disable no-console */
import { Hookable, createHooks } from 'hookable'

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
    console.log(`Processing task: ${task.repo}`)
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
      }, 5000) // Simulating 3 seconds of task processing
    })
  }
}


export const queue = new Hooker()
