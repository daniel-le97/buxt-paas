import type { H3Event } from 'h3'
import { randomUUID } from 'uncrypto'
import { createHooks } from 'hookable'


export interface EventStreamMessage {
  id?: string
  event?: string
  retry?: number
  data: string
}


// helper to easily set sseHeaders
export function setEventStreamHeaders(event: H3Event) {
  setHeaders(event, {
    'Content-Type': 'text/event-stream',
    'Connection': 'keep-alive',
    'Cache-Control': 'no-cache',
  })
}

export const sseHooks = createHooks()


export function formatEventStreamMessage(message: EventStreamMessage): string {
  let result = ''
  if (message.id)
    result += `id: ${message.id}\n`

  if (message.event)
    result += `event: ${message.event}\n`

  if (typeof message.retry === 'number' && Number.isInteger(message.retry))
    result += `retry: ${message.retry}\n`

  result += `data: ${message.data}\n\n`
  return result
}
const clients = new Map<string, () => void>()
const _channel = new Map<string, () => void>()
export function sendEventStreamMessage(event: H3Event, message: EventStreamMessage) {
  const clientId = resolveIp(event)
  sseHooks.callHook(clientId, message)
}
export function addEventStreamClient(event: H3Event) {
  const ip = resolveIp(event)
  const hasClient = clients.get(ip)
  hasClient?.()
  clients.delete(ip)
  const leaveChannel = sseHooks.hook(ip, (data: EventStreamMessage) => {
    event.node.res.write(formatEventStreamMessage(data))
    event.node.res.flushHeaders()
  })
  clients.set(ip, leaveChannel)
  const close = () => {
    event.node.res.end()
  }
  event.node.req.on('close', close)

  return leaveChannel
}


export function removeEventStreamClient(clientId: string) {
  const leave = clients.get(clientId)
  leave?.()
  clients.delete(clientId)
}

export async function joinChannel(event: H3Event, channel: string) {
  const id = resolveIp(event)
  const join = sseHooks.hook(channel, (data: EventStreamMessage) => {
    data.event = data.event || channel
    console.log('sending', data);
    
    event.node.res.write(formatEventStreamMessage(data))
    event.node.res.flushHeaders()
  })

  _channel.set(`${channel}:${id}`, join)

  const leaveChannel = () => join()

  return leaveChannel
}

export async function leaveChannel(event: H3Event, channel: string) {
  const id = resolveIp(event)
  const key = `${channel}:${id}`
  const leave = _channel.get(key)
  leave?.()
  _channel.delete(key)
}

export async function sendChannel(channel: string, message: EventStreamMessage) {
  sseHooks.callHook(channel, message)
}

function resolveIp(event: H3Event) {
  let ip = getRequestIP(event)
  if (process.env.NODE_ENV === 'development' || !ip)
    ip = getRequestIP(event, { xForwardedFor: true })

  if (!ip)
    throw createError('No IP found')

  return ip
}
