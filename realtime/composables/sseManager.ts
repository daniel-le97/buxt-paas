// sseManager.ts

interface Message {
  data: string
  event?: string
  id?: string | number
}

export class SSEManager {
  private eventSource: EventSource
  private listeners: Map<string, ((message: Message) => void)[]>

  constructor(url: string) {
    this.eventSource = new EventSource(url)
    this.listeners = new Map()
    this.init()
  }

  private init() {
    this.eventSource.addEventListener('message', (event) => {
      const parsed = JSON.parse(event.data) as Message
      const eventType = parsed.event

      if (eventType && this.listeners.has(eventType)) {
        this.listeners.get(eventType)!.forEach((callback) => {
          callback(parsed)
        })
      }
    })

    this.eventSource.addEventListener('error', (error) => {
      console.error('EventSource failed:', error)
      this.eventSource.close()
    })
  }

  on(eventType: string, callback: (message: Message) => void): () => void {
    if (!this.listeners.has(eventType))
      this.listeners.set(eventType, [])

    this.listeners.get(eventType)!.push(callback)

    // Return a function to unsubscribe
    return () => {
      const index = this.listeners.get(eventType)!.indexOf(callback)
      if (index !== -1)
        this.listeners.get(eventType)!.splice(index, 1)
    }
  }

  close() {
    this.eventSource.close()
  }
}
