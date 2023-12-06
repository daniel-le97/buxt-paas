<script lang="ts" setup>
import type { WatchStopHandle } from 'vue'

async function handleDeploy() {
  const { data, pending, error, refresh } = await useFetch('/api/build', {
    method: 'POST',
    body: useActiveProject().value,
  })
}

interface EventWatch {
  [key: string]: WatchStopHandle | null
}
const defaults: EventWatch = {}

async function handleClick() {
  console.log('building project')

  const id = useRoute('projects-id').params.id
  const watchEvents = useState<EventWatch>('event-source', () => defaults)
  // const data = useState('event-data', () => '')

  const { data, status, error, close } = useEventSource(`http://localhost:3000/api/build/${id}`)

  if (data.value)
    useBuildSSE().value += JSON.parse(data.value).data

  const end = () => Object.values(watchEvents.value).forEach((fn) => {
    if (fn) {
      fn()
      close()
    }
  })

  watchEvents.value.data = watch(data, (value) => {
    console.log(value)

    if (data.value)
      useBuildSSE().value += JSON.parse(data.value).data
  })

  watchEvents.value.status = watch(status, () => {
    const sending = status.value === 'CONNECTING' || status.value === 'OPEN'
    if (!sending)
      end()
  })

  watchEvents.value.error = watch(error, () => {
    end()
  })
}
</script>

<template>
  <div>
    <RippleBtn class="rounded-md bg-blue-700 flex gap-2 justify-center text-center align-middle" @click="handleClick">
      <Icon name="material-symbols:deployed-code-update-outline-rounded" class="text-xl text-center align-middle text" />
      <span class="">Deploy</span>
    </RippleBtn>
    <RippleBtn class="rounded-md bg-orange-400 flex gap-2 justify-center text-center align-middle">
      <Icon name="i-heroicons-arrow-path-solid" class="text-xl text-center align-middle text" />
      <span class="">force redeploy</span>
    </RippleBtn>
    <RippleBtn class="rounded-md bg-red-500 flex gap-2 justify-center text-center align-middle">
      <Icon name="heroicons:stop-circle" class="text-xl text-center align-middle text" />
      <span class="">stop</span>
    </RippleBtn>
    <RippleBtn class="rounded-md bg-green-500 flex gap-2 justify-center text-center align-middle">
      <Icon name="i-heroicons-arrow-up-right" class="text-xl text-center align-middle text" />
      <span class="">open</span>
    </RippleBtn>
  </div>
</template>

<style>

</style>
