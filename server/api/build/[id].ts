import * as fs from 'node:fs'
import { z } from 'zod'
import consola from 'consola'
import type { FileSink } from 'bun'

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

let running = false

export default defineEventHandler(async (event) => {
  try {
    if (running)
      return 'please wait till the last build is finished'

    running = true
    // const body = await readBody(event)
    const id = getRouterParam(event, 'id')
    if (!id)
      throw createError('unable to find id')

    // console.log('running')

    const generateId = crypto.randomUUID()

    const logsPath = `${process.cwd()}/data/logs/${id}/${generateId}.txt`

    if (!fs.existsSync(`${process.cwd()}/data/logs/${id}/`))
      fs.mkdirSync(`${process.cwd()}/data/logs/${id}/`, { recursive: true })
      // console.log('making dir')

    const repo = await useDbStorage('logs').setItem(`${id}:${generateId}`, `created at: ${new Date()}\n`)
    // console.log(repo)

    const generatedName = generateName()
    const { send, close } = useSSE(event, `sse:event:${generatedName}`)

    const logFile = Bun.file(logsPath)

    const writer = logFile.writer()

    const repoURL = 'https://github.com/daniel-le97/astro-portfolio'

    // console.log('running command')

    await runCommandAndSendStream(['git', 'clone', '--depth=1', repoURL, `./temp/${generatedName}`], writer, send)
    // console.log('running next command')

    await runCommandAndSendStream(['nixpacks', 'build', `./temp/${generatedName}`, '--name', generatedName], writer, send)

    writer.flush()
    writer.end()

    // console.log('ending stream')

    close()
    running = false
  }
  catch (error) {
    // console.log(error)

    throw createError({ statusMessage: `failed to build app` })
  }
})
