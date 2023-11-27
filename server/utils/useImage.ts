import { H3Event } from "h3"

export const useImage = (event: H3Event, hookName: string, number:number) => {
  setHeader(event, 'content-type', 'image/png')
  setHeader(event, 'Content-Length', number)
  setHeader(event, 'connection', 'keep-alive')
  setResponseStatus(event, 200)

  hooks.hook(hookName, (data: any) => {
      // event.node.res.write(`id: ${id}\n`)
      event.node.res.write(data);

      event.node.res.flushHeaders()
  })
  
  
  const send = (callback: () => any) => {
      hooks.callHook(hookName, callback())
  }
  
  const close = () => {
      event.node.res.end()
  }
  
  event._handled = true
  event.node.req.on("close", close)


  
  return { send, close, }
}