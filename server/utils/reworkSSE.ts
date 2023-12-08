import type { H3Event } from 'h3'


export interface Message {
  data: string
  event?: string
  id?: string | number
}

export const SSEEvents = {
  connections: new Map<string, { send: (data: Message) => void }>(),
  rooms: new Map<string, string[]>(),
}

export async function useSendRoomMessage(room: string, data: Message) {
  const _room = SSEEvents.rooms.get(room)
  if (_room) {
    for await (const user of room) {
      const connection = SSEEvents.connections.get(user)
      if (connection) {
        data.event = data.event ?? room
        connection.send(data)
      }
    }
  }
}
export async function useLeaveRoom(room: string, id: string) {
  const _room = SSEEvents.rooms.get(room)
  if (_room) {
    const filtered = _room?.filter(userId => userId === id)
    SSEEvents.rooms.set(room, filtered)
  }
}

export async function useJoinRoom(event: H3Event, room: string) {
  const userid = (await requireAuthSession(event)).user?.id
  if (!userid)
    return

  if (SSEEvents.connections.has(userid)) {
    const getRoom = SSEEvents.rooms.get(room) ?? []
    const foundUser = getRoom.find(id => id === userid)
    if (foundUser)
      return

    getRoom.push(userid)
    SSEEvents.rooms.set(room, getRoom)
  }
}

export async function useSSEManager(event: H3Event) {
  const userid = (await requireAuthSession(event)).user?.id

  if (!userid)
    return

  // handle the connections being closed
  event.node.req.on('close', () => {
    event.node.res.end()
    SSEEvents.connections.delete(userid)
    const rooms = SSEEvents.rooms.entries()
    for (const iterator of rooms)
      iterator[1].filter(id => id === userid)
  })

  // check if we have the connection already
  const hasConnection = SSEEvents.connections.has(userid)

  if (hasConnection)
    return

  // let id = 0

  const send = (data: Message) => {
    event.node.res.write(`data: ${JSON.stringify(data)}\n\n`)
    event.node.res.flushHeaders()
  }

  SSEEvents.connections.set(userid, { send })
}
