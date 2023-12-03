import * as fs from 'node:fs'
import { z } from 'zod'
import consola from 'consola'
import type { FileSink } from 'bun'

// import type { FileSink } from 'bun'

// import type { FileSink } from 'bun'
import { file, nanoseconds } from 'bun'

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

async function runCommandAndSendStream(command: string[], writer: FileSink, send: (callback: (id: number) => any) => void) {
  try {
    const decoder = new TextDecoder()
    const toDecode = (chunk: Uint8Array | any) => {
      if (chunk instanceof Uint8Array || Buffer.isBuffer(chunk))
        return decoder.decode(chunk)

      return chunk as string
    }
    const _command = Bun.spawn(command, { stdio: ['ignore', 'pipe', 'pipe'] })
    const streams = [_command.stderr, _command.stdout]
    for await (const stream of streams) {
      for await (const chunk of stream) {
        const message = toDecode(chunk)
        send(id => ({ id, message }))
        writer.write(message)
      }
    }
    _command.kill(0)
    await _command.exited
  }
  catch (error) {
    consola.withTag('command:failed').error(`${command}`)
  }
}

export default defineEventHandler(async (event) => {
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

    const logFile = file(`${logsPath + generateId}.txt`)

    const buildsLogs = project?.buildsLogs ?? []
    // buildsLogs.push(generateId)
    const date = new Date()
    const writer = logFile.writer()
    writer.write(`project built at: ${date}\n\n`)

    if (!project?.application.repoUrl)
      throw createError('please update your configuration to include a repoURL')

    const start = nanoseconds()
    await runCommandAndSendStream(['git', 'clone', '--depth=1', project?.application.repoUrl, `./temp/${generatedName}`], writer, send)

    await runCommandAndSendStream(['nixpacks', 'build', `./temp/${generatedName}`, '--name', generatedName], writer, send)
    const end = nanoseconds()
    writer.flush()
    writer.end()
    const newBuildLog = {
      id: generateId,
      buildTime: (end - start),
      date
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
