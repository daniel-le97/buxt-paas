import { z } from 'zod'

const schema = z.object({
  repoURL: z.string().min(1),
  installCommand: z.string().nullable(),
  buildCommand: z.string().nullable(),
  startCommand: z.string().nullable(),
  buildPack: z.string().min(1, 'Must be at least 8 characters'),
})

type Schema = z.output<typeof schema>

export default defineEventHandler(async (event) => {
  // const body = await readBody(event)
  const id = getRouterParam(event, 'id')
  // if (!id)
  //   throw createError('unable to find id')

  // console.log(id)

  // const repo = await useStorage('db').getItem(id) as Schema
  // console.log(repo)

  const sse = useSSE(event, 'sse:event')

  const decoder = new TextDecoder()

  const generatedName = generateName()

  const logFile = Bun.file(`./data/logs/${generatedName}`)

  const repoURL = 'https://github.com/daniel-le97/astro-portfolio'

  const clone = Bun.spawn(['git', 'clone', '--depth=1', repoURL, `./temp/${generatedName}`], {
    stdio: ['ignore', logFile, logFile],
  })
  
  const toDecode = (chunk: Uint8Array | any) => {
    let message: string
        if (chunk instanceof Uint8Array || Buffer.isBuffer(chunk)) {
          message = decoder.decode(chunk)
        }
        else{
          message = chunk
        }
        return message
  }
  for await (const chunk of logFile.stream())
    // console.log(decoder.decode(chunk))
    sse.send(() => )

  const builder = Bun.spawn(['nixpacks', 'build', `./temp/${generatedName}`, '--name', generatedName], {
    stdio: ['ignore', 'pipe', 'pipe'],
  })

  // const stream = await Bun.readableStreamToArray(logFile.stream())
  // console.log(await logFile.text());

  // return await sendStream(event, logFile.stream())

  // const cloneStream = [clone.stderr, clone.stdout]
  // for await (const stream of cloneStream) {
  //   for await (const chunk of stream) {
  //     let message: any
  //     if (chunk instanceof Uint8Array || Buffer.isBuffer(chunk)) {
  //       message = decoder.decode(chunk)
  //     }
  //     else if (typeof chunk === 'string') {
  //       message = chunk
  //     }
  //     else {
  //       console.error('Invalid chunk type:', typeof chunk)
  //       // Handle or skip the chunk based on your requirements
  //       continue
  //     }
  //     sse.send(() => ({ id: sse.id, data: message }))
  //   }
  // }

  // const builder = Bun.spawn(['nixpacks', 'build', `./temp/${id}`, '--name', generateName()], {
  //   stdio: ['ignore', 'pipe', 'pipe'],
  // })
  // const streams = [builder.stderr, builder.stdout]

  // for await (const stream of streams) {
  //   for await (const chunk of stream) {
  //     let message: any
  //     if (chunk instanceof Uint8Array || Buffer.isBuffer(chunk)) {
  //       message = decoder.decode(chunk)
  //     }
  //     else if (typeof chunk === 'string') {
  //       message = chunk
  //     }
  //     else {
  //       console.error('Invalid chunk type:', typeof chunk)
  //       // Handle or skip the chunk based on your requirements
  //       continue
  //     }
  //     sse.send(() => ({ id: sse.id, data: message }))
  //   }
  // }
  // builder.kill(0)
  // await builder.exited
  // for await (const chunk of builder.stderr) {
  //   const message = decoder.decode(chunk)
  //   sse.send(() => (message))
  // }
  // for await (const chunk of builder.stdout) {
  //   const message = decoder.decode(chunk)
  //   sse.send(() => (message))
  // }

  // sse.close()
})
