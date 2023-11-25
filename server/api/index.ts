/* eslint-disable node/prefer-global/buffer */
import { useSSE } from "../utils/useSSE";


export default defineEventHandler(async (event) => {
  // const body = await readBody(event)
  const sse = useSSE(event, 'sse:event')
  const path = '/Users/daniel/homelab/GitHub/nuxt-elysia/nuxt-elysia/daniel-le97-astro-portfolio'
  const decoder = new TextDecoder();
  
  const clone = Bun.spawn(["nixpacks", 'build', path, '--name', generateName()], {
      stdio: ['ignore', 'pipe', 'pipe']
  })
  const streams = [clone.stderr, clone.stdout]
 
  for await (const stream of streams) {
    for await (const chunk of stream) {
      
      let message: any;
      if (chunk instanceof Uint8Array || Buffer.isBuffer(chunk)) {
        message = decoder.decode(chunk);
      } else if (typeof chunk === 'string') {
        message = chunk;
      } else {
        console.error('Invalid chunk type:', typeof chunk);
        // Handle or skip the chunk based on your requirements
        continue;
      }
      sse.send(() =>  ({id: sse.id, data: message}))
    }
  }
  clone.kill(0)
  await clone.exited
  // for await (const chunk of clone.stderr) {
  //   const message = decoder.decode(chunk)
  //   sse.send(() =>  (message))
  // }
  // for await (const chunk of clone.stdout) {
  //   const message = decoder.decode(chunk)
  //   sse.send(() => (message) )
  // }

  sse.close()
})
