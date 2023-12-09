import type H3Event from 'h3'
import { useJoinRoom, useSSEManager, useSendRoomMessage } from '../utils/reworkSSE'

// export const sseConnections = new Map<string, H3Event.H3Event<H3Event.EventHandlerRequest>>()

export default defineEventHandler(async (event) => {
  const session = (await requireAuthSession(event))

  setHeader(event, 'content-type', 'text/event-stream')
  setHeader(event, 'cache-control', 'no-cache')
  setHeader(event, 'connection', 'keep-alive')
  setResponseStatus(event, 200)
  event._handled = true
  await useSSEManager(event)


  console.log('connecting client')
})
