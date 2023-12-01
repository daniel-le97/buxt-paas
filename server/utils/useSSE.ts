import type { H3Event } from 'h3'
import { createHooks } from 'hookable'

export interface ServerSentEvent {
  [key: string]: <T, R>(data: T) => R | void
}

const sseHooks = createHooks<ServerSentEvent>()

export function useSSE(event: H3Event, hookName: string) {
  setHeader(event, 'content-type', 'text/event-stream')
  setHeader(event, 'cache-control', 'no-cache')
  setHeader(event, 'connection', 'keep-alive')
  setResponseStatus(event, 200)

  let id = 0

  const unregister = sseHooks.hook(hookName, (data: any) => {
    event.node.res.write(`id: ${id += 1}\n`)
    event.node.res.write(`data: ${JSON.stringify(data)}\n\n`)
    event.node.res.flushHeaders()
  })

  const send = (callback: (id: number) => any) => {
    console.log(callback(id));
    
    sseHooks.callHook(hookName, callback(id))
  }

  const close = () => {
    event.node.res.end()
    unregister()
  }

  event._handled = true
  event.node.req.on('close', close)

  return { send, close }
}
