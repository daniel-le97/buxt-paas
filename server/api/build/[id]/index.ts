import * as fs from 'node:fs'
import { z } from 'zod'
import consola from 'consola'
import { execa } from 'execa'

// import { Bun } from '#imports'

const schema = z.object({
  repoURL: z.string().min(1),
  installCommand: z.string().nullable(),
  buildCommand: z.string().nullable(),
  startCommand: z.string().nullable(),
  buildPack: z.string().min(1, 'Must be at least 8 characters'),
})

type Schema = z.output<typeof schema>

// TODO we need to grab the users project to fill out these placeholders

let fileContents = ''

async function runCommandAndSendStream(first: string, command: string[], send: (callback: (id: number) => any) => void) {
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
      send(id => ({ id, data:message }))
      fileContents += `\n${message}`
    })
    _command.stdout?.on('data', (data) => {
      const message = toDecode(data)
      send(id => ({ id, data:message }))
      fileContents += `\n${message}`
    })

    await _command
    _command.kill()

    // for await (const stream of streams) {
    //   for await (const chunk of stream) {
    //     const message = toDecode(chunk)
    //     send(id => ({ id, message }))
    //     writer.write(message)
    //   }
    // }
    // _command.kill(0)
    // await _command.exited
  }
  catch (error) {
    consola.withTag('command:failed').error(`${command}`)
  }
}

export default defineEventHandler(async (event: any) => {
  try {
    // const body = await readBody(event)
    const user = 'me'

    const id = getRouterParam(event, 'id')
    if (!id)
      throw createError('unable to find id')

    const key = `${user}:${id}`
    const generateId = crypto.randomUUID()

    const db = useDbStorage('projects')
    const isProject = await db.hasItem(key)

    if (!isProject)
      throw createError('unable to find project for user')

    const project = await db.getItem<Project>(key)

    const logsPath = `${process.cwd()}/data/logs/${id}/`

    if (!fs.existsSync(logsPath))
      fs.mkdirSync(logsPath, { recursive: true })

    const generatedName = generateName()
    const { send, close } = useSSE(event, `sse:event:${generatedName}`)

    // const logFile = await fs.promises.readFile(`${logsPath + generateId}.txt`)

    const buildsLogs = project?.buildsLogs ?? []
    // buildsLogs.push(generateId)
    const date = new Date()
    // const writer = logFile.writer()
    // writer.write(`project built at: ${date}\n\n`)

    if (!project?.application.repoUrl)
      throw createError('please update your configuration to include a repoURL')

    const start = performance.now()
    await runCommandAndSendStream('git', ['clone', '--depth=1', project?.application.repoUrl, `./temp/${generatedName}`], send)

    await runCommandAndSendStream('nixpacks', ['build', `./temp/${generatedName}`, '--name', generatedName], send)
    const end = performance.now()
    await fs.promises.writeFile(`${logsPath + generateId}.txt`, fileContents)
    fileContents = ''
    // writer.flush()
    // writer.end()
    const newBuildLog = {
      id: generateId,
      buildTime: (end - start),
      date,
    }
    buildsLogs.push(newBuildLog)
    await db.setItem(key, { ...project, buildsLogs })
    close()
  }
  catch (error) {
    // console.log(error)

    throw createError({ statusMessage: `failed to build app` })
  }
})
