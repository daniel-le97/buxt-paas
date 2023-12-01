import type { WatchStopHandle } from 'vue'

interface EventWatch {
  [key: string]: WatchStopHandle | null
}

const defaults: EventWatch = {

}

export function createEventSource(url: string) {
  const watchEvents = useState<EventWatch>('event-source', () => defaults)
  const data = useState('event-data', () => '')

  const { data: value, status, error, close } = useEventSource(`http://localhost:3000/api/build/${6}`)

  const end = () => Object.values(watchEvents.value).forEach((fn) => {
    if (fn) {
      fn()
      close()
    }
  })

  watchEvents.value.data = watch(value, () => {
    if (value.value)
      data.value += JSON.parse(value.value)
  })

  watchEvents.value.status = watch(status, () => {
    const sending = status.value === 'CONNECTING' || status.value === 'OPEN'
    if (!sending)
      end()
  })

  watchEvents.value.error = watch(error, () => {
    end()
  })

  return { data }
}
