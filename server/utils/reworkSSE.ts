import type { H3Event } from 'h3'

export interface Message {
  data: string
  event?: string
  id?: string | number
}

export const SSEEvents = {
  connections: new Map<string, { send: (data: Message) => void }>(),
  rooms: new Map<string, Set<string>>(),
}

export async function useSendRoomMessage(room: string, data: Message) {
  const usersInRoom = SSEEvents.rooms.get(room) || new Set()

  for (const userId of usersInRoom) {
    const connection = SSEEvents.connections.get(userId)

    if (connection) {
      data.event = data.event || room
      connection.send(data)
    }
  }
}

export async function useLeaveRoom(room: string, id: string) {
  const usersInRoom = SSEEvents.rooms.get(room) || new Set()
  usersInRoom.delete(id)
  SSEEvents.rooms.set(room, usersInRoom)
}

export async function useJoinRoom(event: H3Event, room: string) {
  const userid = (await requireAuthSession(event)).user?.id

  if (!userid)
    return

  if (SSEEvents.connections.has(userid)) {
    const usersInRoom = SSEEvents.rooms.get(room) || new Set()
    usersInRoom.add(userid)

    console.log('Adding user to room', Array.from(usersInRoom))

    SSEEvents.rooms.set(room, usersInRoom)
  }
}

export async function useSSEManager(event: H3Event) {
  const userid = (await requireAuthSession(event)).user?.id

  if (!userid)
    return

  // Handle connections being closed
  event.node.req.on('close', () => {
    event.node.res.end()
    SSEEvents.connections.delete(userid)

    // Remove user from all rooms
    for (const [room, usersInRoom] of SSEEvents.rooms.entries())
      usersInRoom.delete(userid)
  })

  // Check if we have the connection already
  const hasConnection = SSEEvents.connections.has(userid)

  if (hasConnection)
    return

  const send = (data: Message) => {
    console.log('Sending:', data)

    event.node.res.write(`data: ${JSON.stringify(data)}\n\n`)
    event.node.res.flushHeaders()
  }

  console.log('Adding client to connections')

  SSEEvents.connections.set(userid, { send })
}
