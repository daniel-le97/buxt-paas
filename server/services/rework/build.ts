import { z } from 'zod'
import { execa } from 'execa'

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
  if (!id)
    throw createError('unable to find id')

  console.log(id)

  const repo = await useStorage('db').getItem(id) as Schema
  console.log(repo)

  const sse = useSSE(event, 'sse:event')

  const decoder = new TextDecoder()

  const clone = execa('git',['clone', '--depth=1', repo.repoURL, `./temp/${id}`])
  clone.stderr?.on('data', (data) => {
    sse.send(id => ({id,data}))
  })
  clone.stdout?.on('data', (data) => {
    sse.send(id => ({id,data}))
  })
  await clone
  clone.kill()
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
  //     sse.send(id => ({ id, data: message }))
  //   }
  // }

  const builder = execa('nixpacks',['build', `./temp/${id}`, '--name', generateName()])
  builder.stderr?.on('data', (data) => {
    sse.send(id => ({id,data}))
  })
  builder.stdout?.on('data', (data) => {
    sse.send(id => ({id,data}))
  })

  await builder
  builder.kill()
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
  //     sse.send(id => ({ id, data: message }))
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
  //   sse.send(id => (message))
  // }

  sse.close()
})
