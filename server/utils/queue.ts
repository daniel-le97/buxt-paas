import * as fs from 'node:fs'
import { execa } from 'execa'
import { createHooks } from 'hookable'
import consola from 'consola'

class Queue {
  hooks = createHooks()
  queue: ProcessProject[] | null
  isProcessing: boolean
  fileContents: string

  constructor() {
    this.queue = []
    this.isProcessing = false
    this.fileContents = ''
  }

  async addProject(Project: ProcessProject) {
    this.queue?.push(Project)
    if (!this.isProcessing)
      await this.processQueue()
  }

  async processQueue() {
    if (this.queue?.length === 0) {
      this.isProcessing = false
      return
    }

    console.log(this.queue?.length)

    const Project = this.queue?.shift()
    if (!Project)
      return

    this.isProcessing = true

    // Trigger 'processProject' hook
    await this.hooks.callHook('processProject', Project)

    // Simulate Project processing
    console.log(`Processing Project: ${Project.id} at ${new Date(Date.now())}`)
    await this.doProject(Project)

    // Trigger 'afterProcessProject' hook
    await this.hooks.callHook('afterProcessProject', Project)

    await this.processQueue() // Process the next Project
  }

  private async doProject(project: ProcessProject) {
    const start = performance.now()
    const { id, name, buildsLogs, application, createdAt, configured, deployed } = project
    const { repoUrl, buildPack, buildCommand, installCommand, startCommand } = application
    const generateId = crypto.randomUUID()
    const generatedName = generateName()
    const date = new Date()
    this.fileContents = ''
    await this.runCommandAndSendStream('git', ['clone', '--depth=1', application.repoUrl, `./temp/${generatedName}`], project.send)

    await this.runCommandAndSendStream('nixpacks', ['build', `./temp/${generatedName}`, '--name', generatedName], project.send)
    const end = performance.now()

    if (!fs.existsSync(project.logsPath))
      fs.mkdirSync(project.logsPath, { recursive: true })

    await fs.promises.writeFile(`${project.logsPath + generateId}.txt`, this.fileContents)

    // writer.flush()
    // writer.end()
    const newBuildLog = {
      id: generateId,
      buildTime: (end - start),
      date,
    }
    const db = useDbStorage('projects')
    buildsLogs.push(newBuildLog)
    await db.setItem(project.key, { ...project, buildsLogs })
    project.close()
    // Simulate some asynchronous Project
  }

  private async runCommandAndSendStream(first: string, command: string[], send: (callback: (id: number) => any) => void) {
    try {
      const decoder = new TextDecoder()
      const toDecode = (chunk: Uint8Array | any) => {
        if (chunk instanceof Uint8Array || Buffer.isBuffer(chunk))
          return decoder.decode(chunk)

        return chunk as string
      }

      const _command = execa(first, command)

      _command.stderr?.on('data', (data) => {
        const message = toDecode(data)
        send(id => ({ id, data: message }))
        this.fileContents += `\n${message}`
      })
      _command.stdout?.on('data', (data) => {
        const message = toDecode(data)
        send(id => ({ id, data: message }))
        this.fileContents += `\n${message}`
      })

      await _command
      _command.kill()
    }
    catch (error) {
      consola.withTag('command:failed').error(`${command}`)
    }
  }
}

export const queue = new Queue()
